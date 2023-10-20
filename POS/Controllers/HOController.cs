using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace POS.Controllers
{
    public class HOController : Controller
    {

        public ActionResult LoginHOEn()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookieHO"];
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "ho")
                {
                    return Redirect("/HO/IndexHOEn");
                }
                else
                {
                    return View();
                }
            }

            return View();
        }
        public ActionResult LoginHOAr()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookieHO"];
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "ho")
                {
                    return Redirect("/HO/IndexHOAr");
                }
                else
                {
                    return View();
                }
            }

            return View();
        }
        public ActionResult IndexHOEn()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookieHO"];
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "ho")
                {
                    return View();
                }
                else
                {
                    return Redirect("/HO/LoginHOEn");
                }
            }
            return Redirect("/HO/LoginHOEn");
        }
        public ActionResult IndexHOAr()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookieHO"];
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "ho")
                {
                    return View();
                }
                else
                {
                    return Redirect("/HO/LoginHOAr");
                }
            }
            return Redirect("/HO/LoginHOAr");

        }

        public ActionResult MainScreenHOEn()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookieHO"];
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "ho")
                {
                    return View();
                }
                else
                {
                    return Redirect("/HO/LoginHOEn");
                }
            }
            return Redirect("/HO/LoginHOEn");
        }

        public ActionResult MainScreenHOAr()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookieHO"];
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "ho")
                {
                    return View();
                }
                else
                {
                    return Redirect("/HO/LoginHOAr");
                }
            }
            return Redirect("/HO/LoginHOAr");
        }

    }
}