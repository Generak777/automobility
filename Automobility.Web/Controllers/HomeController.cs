using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Automobility.Web.Controllers
{
    public class HomeController : Controller
    {
        [Route("~/")]
        public ActionResult Index()
        {
            return View();
        }

        [Route("~/oauth/smartcar")]
        public ActionResult OAuth()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [Route("~/Home/Signup")]
        public ActionResult SignUp()
        {
            ViewBag.Message = "Register a new account.";

            return View();
        }

        public ActionResult ParkingZone()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [Route("~/Home/AddSpot")]
        public ActionResult AddSpot()
        {
            ViewBag.Message = "Add a spot.";

            return View();
        }


    }
}
