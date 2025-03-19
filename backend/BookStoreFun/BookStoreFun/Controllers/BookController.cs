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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1)
        {
            var booklist = _bookcontext.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalBooks = _bookcontext.Books.Count();

            var someObject = new
            {
                TotalBooks = totalBooks,
                Books = booklist
            };

            return Ok(someObject);

        }
    }
}
