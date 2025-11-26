export interface RelatedStory {
  title: string;
  category: string;
  id: string;
}

export interface ArticleData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  imageUrl: string;
  introduction: string;
  whatHappened: string;
  whyItMatters: string;
  theTech: string;
  expertReactions: string;
  futureOutlook: string;
  conclusion: string;
  pullQuote: string;
  relatedStories: RelatedStory[];
  editorsPicks: RelatedStory[];
}

export interface ArticleSummary {
  id: string;
  title: string;
  category: string;
  author: string;
  imageUrl: string;
  excerpt?: string;
}

export enum AppState {
  HOME = 'HOME',
  CATEGORY = 'CATEGORY',
  ARTICLE = 'ARTICLE',
  ADMIN = 'ADMIN',
  ERROR = 'ERROR'
}
