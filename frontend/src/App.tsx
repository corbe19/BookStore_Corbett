import { useState } from 'react';
import './App.css';
import BookList from './BookList';
import CategoryFilter from './CategoryFilter';
import './Layout.css';

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="book-page-layout">
      <CategoryFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <BookList selectedCategories={selectedCategories} />
    </div>
  );
}

export default App;
