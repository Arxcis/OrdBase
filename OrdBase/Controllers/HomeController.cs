using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using OrdBase.Models;
using OrdBase.ViewModels;

namespace OrdBase.Controllers
{
    public class HomeController : Controller
    {
        private TranslationDb db = new TranslationDb();

        public ActionResult Index()
        {   
            ViewBag.Title = "Home";
            //
            // @brief Building IndexViewModel
            // @doc stackoverflow - https://stackoverflow.com/questions/9881790/how-to-design-viewmodel
            //
            var indexModels =  db.Language
                .Select(o => new IndexViewModel { Name = o.Name }) as IEnumerable<IndexViewModel>;

            return View(indexModels);
        }


        public ActionResult App(string client="Javazoneer")
        {
            ViewBag.Title = "App - Translation";
            //
            // @brief Building IndexViewModel
            // Building ViewModel
            // 
            var appViewModel = new AppViewModel
            {
                ClientName = client,
                Translations = db.Translation
                    .Where(o => o.RegisteredClient.Name.Equals(client)) as IEnumerable<Translation>,
                Categories = db.StringCategory
                    .Where(o => o.RegisteredClient.Name.Equals(client)) as IEnumerable<StringCategory>
            };

            return View(appViewModel);
        }
    }
}
