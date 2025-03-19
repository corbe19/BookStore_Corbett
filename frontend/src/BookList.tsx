import { useEffect, useState } from 'react';
import { book } from '../types/book';

function BookList() {
  const [books, setBooks] = useState<book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookResponse = await fetch('https://localhost:5000/api/Book');
      const bookData = await bookResponse.json();
      setBooks(bookData);
    };

    fetchData();
  }, []);

  return (
    <>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={styles.header}>Title</th>
            <th style={styles.header}>Author</th>
            <th style={styles.header}>Publisher</th>
            <th style={styles.header}>ISBN</th>
            <th style={styles.header}>Classification</th>
            <th style={styles.header}>Category</th>
            <th style={styles.header}>Number of Pages</th>
            <th style={styles.header}>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookId}>
              <td style={styles.cell}>{b.title}</td>
              <td style={styles.cell}>{b.author}</td>
              <td style={styles.cell}>{b.publisher}</td>
              <td style={styles.cell}>{b.isbn}</td>
              <td style={styles.cell}>{b.classification}</td>
              <td style={styles.cell}>{b.category}</td>
              <td style={styles.cell}>{b.pageCount}</td>
              <td style={styles.cell}>{b.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

import { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  header: {
    border: '1px solid #000',
    padding: '10px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  cell: {
    border: '1px solid #000',
    padding: '8px',
  },
};

export default BookList;
