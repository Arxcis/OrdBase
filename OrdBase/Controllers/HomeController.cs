using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using OrdBase.Models;
using OrdBase.ViewModels;

namespace OrdBase.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {   
            ViewBag.Title = "Home";
            //
            // @brief Building IndexViewModel
            // @doc stackoverflow - https://stackoverflow.com/questions/9881790/how-to-design-viewmodel
            //

            return View();
        }
    }
}
