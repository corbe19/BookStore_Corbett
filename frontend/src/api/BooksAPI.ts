import { book } from '../types/book';

interface FetchBooksResponse {
  books: book[];
  totalBooks: number;
}

const API_URL = 'https://bookstore-corbett-backend.azurewebsites.net/api/Book';

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
      `${API_URL}?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
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

export const addBook = async (newBook: book): Promise<book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding book:', error);
    throw new Error('Failed to add book');
  }
};

export const updateBook = async (
  bookId: number,
  updatedBook: book
): Promise<book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error('Failed to update book');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw new Error('Failed to update book');
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }

    return;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw new Error('Failed to delete book');
  }
};
