import { ArticleData, ArticleSummary } from "../types";
import { MOCK_ARTICLES } from "./mockData";

// Content Service
// Now loads directly from MOCK_ARTICLES to ensure instant availability without backend scripts.

export const fetchArticleById = async (id: string): Promise<ArticleData | null> => {
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const article = MOCK_ARTICLES.find(a => a.id === id);
  if (!article) {
    console.warn(`Article ${id} not found in mock data.`);
    return null;
  }
  return article;
};

export const fetchArticlesByCategory = async (category: string): Promise<ArticleSummary[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const allArticles: ArticleSummary[] = MOCK_ARTICLES.map(a => ({
    id: a.id,
    title: a.title,
    category: a.category,
    author: a.author,
    imageUrl: a.imageUrl,
    excerpt: a.subtitle || a.introduction.substring(0, 100) + "..."
  }));

  // Handle "Latest" or empty category as "All" (or sorted by date)
  if (!category || category === 'LATEST' || category === 'HOME') {
    // Return all, sorted by date logic if dates were real objects, here just reverse
    return [...allArticles].reverse(); 
  }
  
  // Case-insensitive filtering
  return allArticles.filter(a => 
    a.category && a.category.toLowerCase() === category.toLowerCase()
  );
};

export const fetchLatestArticles = async (): Promise<ArticleSummary[]> => {
  return fetchArticlesByCategory('LATEST');
};