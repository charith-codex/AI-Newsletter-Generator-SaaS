import { fetchArticles } from "@/lib/news";
import { inngest } from "../client";
import { marked } from "marked";
import { sendEmail } from "@/lib/email";

export default inngest.createFunction(
  { id: "newsletter/scheduled" },
  { event: "newsletter.schedule" },
  async ({ event, step, runId }) => {
    const categories =
      Array.isArray(event.data?.categories) && event.data.categories.length
        ? event.data.categories
        : ["technology"];

    // fetch articles per category
    const allArticles = await step.run("fetch-news", async () => {
      return fetchArticles(categories);
    });

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
                      (article: any, index: number) =>
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

      const summaryText =
        typeof (summary as any)?.response?.text === "function"
          ? await (summary as any).response.text()
          : (summary as any)?.candidates?.[0]?.content?.parts
              ?.map((p: any) => p.text)
              .join("") ??
            (summary as any)?.choices?.[0]?.message?.content ??
            (typeof summary === "string" ? summary : JSON.stringify(summary));

      if (!summaryText) {
        throw new Error("Failed to generate AI summary");
      }

      const htmlResult = await marked(summaryText);
      console.log(htmlResult);

      await step.run("send-email", async () => {
        await sendEmail(
          event.data.email,
          categories.join(", "),
          allArticles.length,
          htmlResult
        );
      });
    } catch (err) {
      throw err;
    }

    return {};
  }
);
