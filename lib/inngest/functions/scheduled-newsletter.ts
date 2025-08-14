import { fetchArticles } from "@/lib/news";
import { inngest } from "../client";

export default inngest.createFunction(
  { id: "newsletter/scheduled" },
  { event: "newsletter.scheduled" },
  async ({ event, step, runId }) => {
    //fetch articles per category
    const categories = ["technology", "business", "politics"];
    const allArticles = await step.run("fetch-news", async () => {
      return fetchArticles(categories);
    });

    // generate ai summary
    const summary = await step.ai.infer("summarize-news", {
      model: step.ai.models.gemini({ model: "gemini-2.5-flash" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are an expert newsletter editor creating a personalized newsletter. 
                  Write a concise, engaging summary that:
                  - Highlights the most important stories
                  - Provides context and insights
                  - Uses a friendly, conversational tone
                  - Is well-structured with clear sections
                  - Keeps the reader informed and engaged
                  Format the response as a proper newsletter with a title and organized content.
                  Make it email-friendly with clear sections and engaging subject lines.
                  
                  Create a newsletter summary for these articles from the past week. 
                  Categories requested: ${event.data.categories.join(", ")}
                  
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
    console.log(summary.promptFeedback);
  }
);
