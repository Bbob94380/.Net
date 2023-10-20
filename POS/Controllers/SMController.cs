using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;
using System.Web.Mvc;
using System.Web.Security;

namespace POS.Controllers
{
    public class SMController : Controller
    {
        public ActionResult LoginSMEn()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookie"];
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "sm")
                {
                    return Redirect("/SM/IndexEn");
                }
                else
                {
                    return View();
                }
            }

            return View();
        }
        public ActionResult LoginSMAr()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookie"];
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "sm")
                {
                    return Redirect("/SM/IndexAr");
                }
                else
                {
                    return View();
                }
            }

            return View();
        }
        public ActionResult IndexEn()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookie"];
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "sm")
                {
                    return View();
                }
                else
                {
                    return Redirect("/SM/LoginSMEn");
                }
            }
            return Redirect("/SM/LoginSMEn");
        }
        public ActionResult IndexAr()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookie"];
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "sm")
                {
                    return View();
                }
                else
                {
                    return Redirect("/SM/LoginSMAr");
                }
            }
            return Redirect("/SM/LoginSMAr");

        }
    }
}