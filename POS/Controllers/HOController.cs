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
            var cookie = Request.Cookies["loginCookieHO"];
            var lang = "";
            if (Request.Cookies["languageHO"] != null) lang = Request.Cookies["languageHO"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "ho")
                {
                    if (lang == "ar")
                    {
                        return Redirect("/HO/IndexHOAr");
                    }
                    else
                    {
                        return Redirect("/HO/IndexHOEn");
                    }
                }
                else
                {
                    if (lang == "ar")
                    {
                        return Redirect("/HO/LoginHOAr");
                    }
                    else
                    {
                        return View();
                    }
                }
            }

            if (lang == "ar")
            {
                return Redirect("/HO/LoginHOAr");
            }
            else
            {
                return View();
            }
        }
        public ActionResult LoginHOAr()
        {
            var cookie = Request.Cookies["loginCookieHO"];
            var lang = "";
            if (Request.Cookies["languageHO"] != null) lang = Request.Cookies["languageHO"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "ho")
                {

                    if (lang == "en")
                    {
                        return Redirect("/HO/IndexHOEn");
                    }
                    else
                    {
                        return Redirect("/HO/IndexHOAr");
                    }
                }
                else
                {
                    if (lang == "en")
                    {
                        return Redirect("/HO/LoginHOEn");
                    }
                    else
                    {
                        return View();
                    }
                }
            }

            if (lang == "en")
            {
                return Redirect("/HO/LoginHOEn");
            }
            else
            {
                return View();
            }
        }
        public ActionResult IndexHOEn()
        {
            var cookie = Request.Cookies["loginCookieHO"];
            var lang = "";
            if (Request.Cookies["languageHO"] != null) lang = Request.Cookies["languageHO"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "ho") //loggedIn
                {

                    if (lang == "ar")
                    {
                        return Redirect("/HO/IndexHOAr");
                    }
                    else
                    {
                        Request.Cookies["languageHO"].Value = "en";
                        //System.Web.HttpContext.Current.Response.SetCookie(cookie);
                        return View();
                    }

                }
                else
                {
                    if (lang == "ar")
                    {
                        return Redirect("/HO/LoginHOAr");
                    }
                    else
                    {
                        return Redirect("/HO/LoginHOEn");

                    }
                }
            }


            if (lang == "ar")
            {
                return Redirect("/HO/LoginHOAr");
            }
            else
            {
                return Redirect("/HO/LoginHOEn");

            }
        }
        public ActionResult IndexHOAr()
        {
            var cookie = Request.Cookies["loginCookieHO"];
            var lang = "";
            if (Request.Cookies["languageHO"] != null) lang = Request.Cookies["languageHO"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "ho") //loggedIn
                {

                    if (lang == "en")
                    {
                        return Redirect("/HO/IndexHOEn");
                    }
                    else
                    {
                        Request.Cookies["languageHO"].Value = "ar";
                        //System.Web.HttpContext.Current.Response.SetCookie(cookie);
                        return View();
                    }

                }
                else
                {
                    if (lang == "ar")
                    {
                        return Redirect("/HO/LoginHOEn");
                    }
                    else
                    {
                        return Redirect("/HO/LoginHOAr");

                    }
                }
            }

            if (lang == "en")
            {
                return Redirect("/HO/LoginHOEn");
            }
            else
            {
                return Redirect("/HO/LoginHOAr");

            }

        }

        public ActionResult MainScreenHOEn()
        {
            var cookie = Request.Cookies["loginCookieHO"];
            var lang = "";
            if (Request.Cookies["languageHO"] != null) lang = Request.Cookies["languageHO"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "ho") //loggedIn
                {

                    if (lang == "ar")
                    {
                        return Redirect("/HO/MainScreenHOAr");
                    }
                    else
                    {
                        Request.Cookies["languageHO"].Value = "en";
                        //System.Web.HttpContext.Current.Response.SetCookie(cookie);
                        return View();
                    }

                }
                else
                {
                    if (lang == "ar")
                    {
                        return Redirect("/HO/LoginHOAr");
                    }
                    else
                    {
                        return Redirect("/HO/LoginHOEn");

                    }
                }
            }


            if (lang == "ar")
            {
                return Redirect("/HO/LoginHOAr");
            }
            else
            {
                return Redirect("/HO/LoginHOEn");

            }
        }

        public ActionResult MainScreenHOAr()
        {
            var cookie = Request.Cookies["loginCookieHO"];
            var lang = "";
            if (Request.Cookies["languageHO"] != null) lang = Request.Cookies["languageHO"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "ho") //loggedIn
                {

                    if (lang == "en")
                    {
                        return Redirect("/HO/MainScreenHOEn");
                    }
                    else
                    {
                        Request.Cookies["languageHO"].Value = "ar";
                        //System.Web.HttpContext.Current.Response.SetCookie(cookie);
                        return View();
                    }

                }
                else
                {
                    if (lang == "ar")
                    {
                        return Redirect("/HO/LoginHOEn");
                    }
                    else
                    {
                        return Redirect("/HO/LoginHOAr");

                    }
                }
            }

            if (lang == "en")
            {
                return Redirect("/HO/LoginHOEn");
            }
            else
            {
                return Redirect("/HO/LoginHOAr");

            }
        }

    }
}