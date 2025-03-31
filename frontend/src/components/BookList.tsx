import { useEffect, useState } from 'react';
import { book } from '../types/book';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const bookData = await fetchBooks(
          pageSize,
          pageNum,
          selectedCategories
        );

        setBooks(bookData.books);
        setTotalPages(Math.ceil(bookData.totalBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <div className="book-list-container">
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
              <div
                key={b.bookId}
                className="col-12 col-sm-8 col-md-6 col-lg-8 mb-4 fixed-card-width"
              >
                <div className="card bg-dark text-white shadow position-relative overflow-hidden">
                  <div className="card-body">
                    <span className="badge bg-info text-dark position-absolute top-0 end-0 m-2 rounded-pill animate-badge">
                      {b.category}
                    </span>
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
                    <button
                      style={{ padding: '5px 30px', margin: '5px' }}
                      className="btn btn-success"
                      onClick={() =>
                        navigate(
                          `/purchasequantity/${b.title}/${b.bookId}/${b.price}`
                        )
                      }
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <Pagination
              currentPage={pageNum}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={(newPage) => setPageNum(newPage)}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setPageNum(1);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BookList;
