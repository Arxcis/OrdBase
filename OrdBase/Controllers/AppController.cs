using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

using OrdBase.Models;
using OrdBase.ViewModels;

namespace OrdBase.Controllers
{
    public class AppController : Controller
    {
        private TranslationDb db = new TranslationDb();

        public ActionResult Index(string client = "FMSF")
        {
            ViewBag.Title = "OrdBase - Admin";
            var appViewModel = new AppViewModel { ClientName = client, };
            return View(appViewModel);
        }


        public ActionResult Editor(string client)
        {

            return PartialView();
        }

        public ActionResult Selector(string client)
        {
            //
            // @doc Group by - https://stackoverflow.com/questions/7325278/group-by-in-linq
            // @doc More group by - https://stackoverflow.com/questions/2697253/using-linq-to-group-a-list-of-objects-into-a-new-grouped-list-of-list-of-objects
            // @doc MSDN Linq examples - https://msdn.microsoft.com/en-us/library/gg509017.aspx
            //

            var translationGroups = from t in db.Translation
                                    where t.ClientName == client
                                    group t by t.AccessKey into grp
                                    select new
                                    {
                                        AccessKey = grp.Key,
                                        TranslationList = grp.ToList()
                                    };

            var categoryGroups = from c in db.Category
                                 where c.ClientName == client
                                 group c by c.AccessKey into grp
                                 select new
                                 {
                                     AccessKey = grp.Key,
                                     CategoryList = grp.ToList()
                                 };

            var selectorViewModel = new SelectorViewModel {

                TranslationSets = (from t in translationGroups
                                   join c in categoryGroups
                                   on t.AccessKey equals c.AccessKey
                                   select new TranslationSet
                                   {
                                       AccessKey = t.AccessKey,
                                       Translations = t.TranslationList,
                                       Categories = c.CategoryList
                                   })
                                       .ToList(),

                ClientCategories = (from c in db.Category
                                    where c.ClientName == client
                                    select c.Name)
                                        .Distinct()
                                        .ToList()
            };

            return PartialView(selectorViewModel);
        }
    }
}