export type Article = {
  title: string;
  description: string;
  url: string;
};

export async function fetchArticles(categories: string[]): Promise<Article[]> {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const promises = categories.map(async (category) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          category
        )}&from=${since}&sortBy=published&apiKey=${process.env.NEWS_API_KEY}`
      );

      if (!response.ok) {
        console.error("Failed fetching for this category", category);
        return [];
      }

      const data = await response.json();
      return data.articles.slice(0, 5).map((article: any) => ({
        title: article.title || "No title",
        url: article.url || "#",
        description: article.description || "No description",
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  const results = await Promise.all(promises);
  return results.flat();
}
