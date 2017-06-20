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

        private List<string> GetClientCategories(string client)
        {
            return (from c in db.Category
                    where c.ClientName == client
                    select c.Name)
                            .Distinct()
                            .ToList();
        }

        public ActionResult Index(string client = "FMSF")
        {
            ViewBag.Title = "OrdBase - Admin";
            return View(new AppViewModel
            {
                ClientName = client
            });
        }


        public ActionResult Editor(string client, string accessKey)
        {
            return PartialView(new EditorViewModel
            {
                TranslationSet = new TranslationSet
                {
                    AccessKey = accessKey,

                    Translations = (from t in db.Translation
                                    where t.ClientName == client
                                    group t by t.AccessKey into grp
                                    where grp.Key == accessKey
                                    select grp.First())
                                        .ToList(),

                    Categories = (from c in db.Category
                                  where c.ClientName == client
                                  group c by c.AccessKey into grp
                                  where grp.Key == accessKey
                                  select grp.First())
                                    .ToList()
                },
                ClientCategories = GetClientCategories(client)
            });
        }


        public ActionResult Selector(string client)
        {
            //
            // @doc Group by - https://stackoverflow.com/questions/7325278/group-by-in-linq
            // @doc More group by - https://stackoverflow.com/questions/2697253/using-linq-to-group-a-list-of-objects-into-a-new-grouped-list-of-list-of-objects
            // @doc MSDN Linq examples - https://msdn.microsoft.com/en-us/library/gg509017.aspx
            //
            return PartialView(new SelectorViewModel
            {
                TranslationSets = (from t in (from t in db.Translation
                                              where t.ClientName == client
                                              group t by t.AccessKey into grp
                                              select new
                                              {
                                                  AccessKey = grp.Key,
                                                  TranslationList = grp.ToList()
                                              })

                                   join c in (from c in db.Category
                                              where c.ClientName == client
                                              group c by c.AccessKey into grp
                                              select new
                                              {
                                                  AccessKey = grp.Key,
                                                  CategoryList = grp.ToList()
                                              })

                                   on t.AccessKey equals c.AccessKey
                                   select new TranslationSet
                                   {
                                       AccessKey = t.AccessKey,
                                       Translations = t.TranslationList,
                                       Categories = c.CategoryList
                                   })
                                   .ToList(),

                ClientCategories = GetClientCategories(client)
            });
            
        }
    }
}