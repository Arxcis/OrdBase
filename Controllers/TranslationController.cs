using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using OrdBaseCore.Models;

namespace OrdBaseCore.Controllers 
{
    [Route("api/[controller]")]
    public class TranslationController : Controller
    {
        private readonly TranslationDb _db;

        public TranslationController(TranslationDb db) 
        {
            _db = db;
        }

        // api/translation
        [HttpGet]
        public IEnumerable<Translation> GetAll()
        {
            return _db.Translation.ToList();
        }

        // api/translation/{id}
        [HttpGet("{id}", Name = "GetTranslation")]
        public IActionResult GetById(string accessKey)
        {
            var item = _db.Translation.FirstOrDefault(t => t.AccessKey == accessKey);
            if (item == null) 
            { return NotFound(); }

            return new ObjectResult(item);
        }
    }
}