import { useEffect, useState } from 'react';
import { book } from '../types/book';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookList() {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    const fetchData = async () => {
      const bookResponse = await fetch(
        `https://localhost:5000/api/Book?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`
      );
      const bookData = await bookResponse.json();
      setBooks(bookData.books);
      setTotalItems(bookData.totalBooks);
      setTotalPages(Math.ceil(bookData.totalBooks / pageSize));
    };

    fetchData();
  }, [pageSize, pageNum, sortOrder]);

  return (
    <>
      <h1 className="text-center">Book List</h1>
      <label>
        Sort by Title:
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      <div className="container py-4">
        <div className="row justify-content-center">
          {books.map((b) => (
            <div key={b.bookId} className="col-md-6 col-lg-7 mb-4">
              <div className="card bg-dark text-white shadow">
                <div className="card-body">
                  <h5 className="card-title">{b.title}</h5>
                  <p className="card-text">
                    <strong>Author:</strong> {b.author}
                  </p>
                  <p className="card-text">
                    <strong>Publisher:</strong> {b.publisher}
                  </p>
                  <p className="card-text">
                    <strong>ISBN:</strong> {b.isbn}
                  </p>
                  <p className="card-text">
                    <strong>Classification:</strong> {b.classification}
                  </p>
                  <p className="card-text">
                    <strong>Category:</strong> {b.category}
                  </p>
                  <p className="card-text">
                    <strong>Number of Pages:</strong> {b.pageCount}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ${b.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
