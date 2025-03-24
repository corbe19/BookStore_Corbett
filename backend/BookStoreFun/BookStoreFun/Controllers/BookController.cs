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
    }
}
