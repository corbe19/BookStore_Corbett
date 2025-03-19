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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc")
        {
            var booksQuery = _bookcontext.Books.AsQueryable();

            // Apply sorting
            if (sortOrder.ToLower() == "desc")
            {
                booksQuery = booksQuery.OrderByDescending(b => b.Title);
            }
            else
            {
                booksQuery = booksQuery.OrderBy(b => b.Title);
            }

            // Apply pagination
            var booklist = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalBooks = _bookcontext.Books.Count();

            var response = new
            {
                TotalBooks = totalBooks,
                Books = booklist
            };

            return Ok(response);
        }
    }
}
