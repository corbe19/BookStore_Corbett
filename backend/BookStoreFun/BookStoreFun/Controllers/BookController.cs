using BookStoreFun.Data;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreFun.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookstoreContext _bookcontext;

        public BookController(BookstoreContext temp) => _bookcontext = temp;
       
        [HttpGet(Name = "GetBook")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? category = null)
        {
            var booksQuery = _bookcontext.Books.AsQueryable();

            if (category != null && category.Any())
            {
                booksQuery = booksQuery.Where(b => category.Contains(b.Category));
            }

            var totalBooks = booksQuery.Count();

            // Apply sorting
            booksQuery = sortOrder.ToLower() == "desc"
                ? booksQuery.OrderByDescending(b => b.Title)
                : booksQuery.OrderBy(b => b.Title);

            // Apply pagination
            var booklist = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var response = new
            {
                TotalBooks = totalBooks,
                Books = booklist
            };

            return Ok(response);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var categories = _bookcontext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(categories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook) 
        {
            _bookcontext.Books.Add(newBook);
            _bookcontext.SaveChanges();
            return Ok(newBook);
        
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook) 
        {
            var existingBook = _bookcontext.Books.Find(bookId);       

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.Isbn = updatedBook.Isbn;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookcontext.Books.Update(existingBook);
            _bookcontext.SaveChanges();

            return Ok(existingBook);

        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookcontext.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }

            _bookcontext.Books.Remove(book);
            _bookcontext.SaveChanges();
            return NoContent();
        }
    }
}
