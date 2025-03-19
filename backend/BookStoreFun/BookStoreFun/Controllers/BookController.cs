using BookStoreFun.Data;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreFun.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookstoreContext _bookcontext;

        public BookController(BookstoreContext temp)
        {
            _bookcontext = temp;
        }
        [HttpGet(Name = "GetBowler")]
        public IEnumerable<Book> Get()
        {
            var booklist = _bookcontext.Books.ToList();

            return (booklist);
        }
    }
}
