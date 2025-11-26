
import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection'; // Renamed to Admin Dashboard concept, but kept file name
import { ArticleDisplay } from './components/ArticleDisplay';
import { CategoryPage } from './components/CategoryPage';
import { HomePage } from './components/HomePage';
import { AppState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [currentArticleId, setCurrentArticleId] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<string>('');

  // Routing Handlers
  const goHome = () => {
    setAppState(AppState.HOME);
    window.scrollTo(0,0);
  };

  const goToCategory = (cat: string) => {
    if (cat === 'ADMIN') {
      setAppState(AppState.ADMIN);
    } else {
      setCurrentCategory(cat);
      setAppState(AppState.CATEGORY);
    }
    window.scrollTo(0,0);
  };

  const goToArticle = (id: string) => {
    setCurrentArticleId(id);
    setAppState(AppState.ARTICLE);
    window.scrollTo(0,0);
  };

  // Header needs to intercept 'Newsletter' or hidden triggers to go to Admin if needed, 
  // or we add a secret button. For now, adding 'ADMIN' to nav list in Header is easiest or URL param check.
  // We will assume "LATEST" goes to a category, and maybe the user can navigate to admin via a hidden way?
  // For this refactor, I'll allow the Header to trigger Admin if the category is "ADMIN".

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <Header onCategoryClick={goToCategory} onHomeClick={goHome} />
      
      <main>
        {appState === AppState.HOME && (
          <HomePage onArticleClick={goToArticle} />
        )}

        {appState === AppState.CATEGORY && (
          <CategoryPage category={currentCategory} onArticleClick={goToArticle} />
        )}

        {appState === AppState.ARTICLE && (
          <ArticleDisplay articleId={currentArticleId} onBack={goHome} onArticleClick={goToArticle} />
        )}

        {appState === AppState.ADMIN && (
          <InputSection />
        )}
      </main>
    </div>
  );
};

export default App;
