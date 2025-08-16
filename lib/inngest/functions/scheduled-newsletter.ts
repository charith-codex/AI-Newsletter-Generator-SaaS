import { fetchArticles, Article } from "@/lib/news";
import { inngest } from "../client";
import { marked } from "marked";
import { sendEmail } from "@/lib/email";
import { createClient } from "@/lib/server";

export default inngest.createFunction(
  {
    id: "newsletter/scheduled",
    cancelOn: [
      {
        event: "newsletter.schedule.deleted",
        if: "async.data.userId == event.data.userId",
      },
    ],
  },
  { event: "newsletter.schedule" },
  async ({ event, step }) => {
    const isUserActive = await step.run("check-user-status", async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("user_preferences")
        .select("is_active")
        .eq("user_id", event.data.userId)
        .single();

      if (error) {
        return false;
      }

      return data.is_active || false;
    });

    if (!isUserActive) {
      return {};
    }

    const categories =
      Array.isArray(event.data?.categories) && event.data.categories.length
        ? event.data.categories
        : ["technology"];

    // fetch articles per category
    const allArticles = await step.run("fetch-news", async () => {
      return fetchArticles(categories);
    });

    // Helper to extract text without using `any`
    function extractSummaryText(resp: unknown): string | null {
      // case: Gemini response with response.text()
      if (
        resp &&
        typeof resp === "object" &&
        "response" in resp &&
        resp.response &&
        typeof (resp as { response: unknown }).response === "object" &&
        (resp as { response: { text?: unknown } }).response &&
        typeof (resp as { response: { text?: unknown } }).response.text ===
          "function"
      ) {
        // handled asynchronously by caller
        return null;
      }

      // case: candidates[].content.parts[].text
      if (
        resp &&
        typeof resp === "object" &&
        "candidates" in resp &&
        Array.isArray((resp as { candidates: unknown[] }).candidates)
      ) {
        const candidate = (
          resp as {
            candidates: Array<{
              content?: { parts?: Array<{ text?: string }> };
            }>;
          }
        ).candidates[0];
        const parts = candidate?.content?.parts ?? [];
        const text = parts.map((p) => p?.text ?? "").join("");
        if (text) return text;
      }

      // case: OpenAI-like shape: choices[0].message.content
      if (
        resp &&
        typeof resp === "object" &&
        "choices" in resp &&
        Array.isArray((resp as { choices: unknown[] }).choices)
      ) {
        const choice = (
          resp as { choices: Array<{ message?: { content?: string } }> }
        ).choices[0];
        const text = choice?.message?.content ?? "";
        if (text) return text;
      }

      // fallback
      if (typeof resp === "string") return resp;
      return null;
    }

    // generate ai summary
    try {
      const summary = await step.ai.infer("summarize-news", {
        model: step.ai.models.gemini({ model: "gemini-2.5-flash" }),
        body: {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are an expert newsletter editor creating a personalized newsletter. 
                  Write a concise, engaging summary(words limit to 200) that:
                  - Highlights the most important stories
                  - Provides context and insights
                  - Uses a friendly, conversational tone
                  - Is well-structured with clear sections
                  
                  Create a newsletter summary for these articles from the past week. 
                  Categories requested: ${categories.join(", ")}
                  
                  Articles:
                  ${allArticles
                    .map(
                      (article: Article, index: number) =>
                        `${index + 1}. ${article.title}\n   ${
                          article.description
                        }\n   Source: ${article.url}\n`
                    )
                    .join("\n")}`,
                },
              ],
            },
          ],
        },
      });

      // handle potential async response.text()
      let summaryText = extractSummaryText(summary);
      if (!summaryText) {
        const maybeResp = (
          summary as { response?: { text?: () => Promise<string> } } | null
        )?.response;
        if (maybeResp?.text) {
          summaryText = await maybeResp.text();
        }
      }

      if (!summaryText) {
        throw new Error("Failed to generate AI summary");
      }

      const htmlResult = await marked(summaryText);

      await step.run("send-email", async () => {
        await sendEmail(
          event.data.email,
          categories.join(", "),
          allArticles.length,
          htmlResult
        );
      });

      await step.run("schedule-next", async () => {
        const now = new Date();
        let nextScheduleTime: Date;

        switch (event.data.frequency) {
          case "daily":
            nextScheduleTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            break;
          case "weekly":
            nextScheduleTime = new Date(
              now.getTime() + 7 * 24 * 60 * 60 * 1000
            );
            break;
          case "biweekly":
            nextScheduleTime = new Date(
              now.getTime() + 3 * 24 * 60 * 60 * 1000
            );
            break;
          default:
            nextScheduleTime = new Date(
              now.getTime() + 7 * 24 * 60 * 60 * 1000
            );
            break;
        }

        nextScheduleTime.setHours(9, 0, 0, 0);

        await inngest.send({
          name: "newsletter.schedule",
          data: {
            categories,
            email: event.data.email,
            frequency: event.data.frequency,
            userId: event.data.userId,
          },
          ts: nextScheduleTime.getTime(),
        });
      });

      return {
        newsletter: htmlResult,
        articleCount: allArticles.length,
        nextScheduled: true,
      };
    } catch (err) {
      throw err;
    }
  }
);
