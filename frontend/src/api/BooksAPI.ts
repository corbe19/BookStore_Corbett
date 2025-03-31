import { book } from '../types/book';

interface FetchBooksResponse {
  books: book[];
  totalBooks: number;
}

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((c) => `category=${encodeURIComponent(c)}`)
      .join('&');

    const response = await fetch(
      `https://localhost:5000/api/Book?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return {
      books: data.books,
      totalBooks: data.totalBooks,
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};
