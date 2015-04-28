using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;

namespace Tour.Controllers
{
    public class TourController : Controller
    {
        //
        // GET: /Tour/

        public ActionResult Default()
        {
            Response.Redirect("Index");
            Response.End();
            return null;
        }

        public ActionResult Index()
        {
            var url = ConfigurationManager.AppSettings["WebresourceBaseUrl"];
            return View();
        }

        public ActionResult IndexIPad()
        {
            return View();
        }

        public ActionResult CityList()
        {
            return View();
        }
        public ActionResult CityListIPad()
        {
            return View();
        }

        public ActionResult CityData()
        {
            return View();
        }

        public ActionResult VacationList(string id1, string id2, string id3)
        {
            ViewData["id1"] = id1;
            ViewData["id2"] = id2;
            ViewData["id3"] = id3;

            return View();
        }

        public ActionResult VacationListIPad(string id1, string id2, string id3)
        {
            ViewData["id1"] = id1;
            ViewData["id2"] = id2;
            ViewData["id3"] = id3;

            return View();
        }

        public ActionResult Detail(string id1, string id2)
        {
            ViewData["id1"] = id1;
            ViewData["id2"] = id2;

            return View();
        }

        public ActionResult DetailIPad(string id1, string id2)
        {
            ViewData["id1"] = id1;
            ViewData["id2"] = id2;

            return View();
        }

    }
}
