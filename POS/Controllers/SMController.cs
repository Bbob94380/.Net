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
            var cookie = Request.Cookies["loginCookie"];
            var lang = "";
            if (Request.Cookies["languageSM"] != null) lang = Request.Cookies["languageSM"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "sm")
                {
                    if (lang == "ar")
                    {
                        return Redirect("/SM/IndexAr");
                    }
                    else
                    {
                        return Redirect("/SM/IndexEn");
                    }
                }
                else
                {
                    if (lang == "ar")
                    {
                        return Redirect("/SM/LoginSMAr");
                    }
                    else
                    {
                        return View();
                    }
                }
            }

            if (lang == "ar")
            {
                return Redirect("/SM/LoginSMAr");
            }
            else
            {
                return View();
            }
        }
        public ActionResult LoginSMAr()
        {
            var cookie = Request.Cookies["loginCookie"];
            var lang = "";
            if (Request.Cookies["languageSM"] != null) lang = Request.Cookies["languageSM"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "sm")
                {

                    if (lang == "en")
                    {
                        return Redirect("/SM/IndexEn");
                    }
                    else
                    {
                        return Redirect("/SM/IndexAr");
                    }
                }
                else
                {
                    if (lang == "en")
                    {
                        return Redirect("/SM/LoginSMEn");
                    }
                    else
                    {
                        return View();
                    }
                }
            }

            if (lang == "en")
            {
                return Redirect("/SM/LoginSMEn");
            }
            else
            {
                return View();
            }
        }
        public ActionResult IndexEn()
        {
            var cookie = Request.Cookies["loginCookie"];
            var lang = "";
            if (Request.Cookies["languageSM"] != null) lang = Request.Cookies["languageSM"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "sm") //loggedIn
                {

                    if (lang == "ar")
                    {
                        return Redirect("/SM/IndexAr");
                    }
                    else
                    {
                        if (Request.Cookies["languageSM"] != null)  Request.Cookies["languageSM"].Value = "en";
                        //System.Web.HttpContext.Current.Response.SetCookie(cookie);
                        return View();
                    }

                }
                else
                {
                    if (lang == "ar")
                    {
                        return Redirect("/SM/LoginSMAr");
                    }
                    else
                    {
                        return Redirect("/SM/LoginSMEn");

                    }
                }
            }


            if (lang == "ar")
            {
                return Redirect("/SM/LoginSMAr");
            }
            else
            {
                return Redirect("/SM/LoginSMEn");

            }
        }
        public ActionResult IndexAr()
        {
            var cookie = Request.Cookies["loginCookie"];
            var lang = "";
            if (Request.Cookies["languageSM"] != null) lang = Request.Cookies["languageSM"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "sm") //loggedIn
                {

                    if (lang == "en")
                    {
                        return Redirect("/SM/IndexEn");
                    }
                    else
                    {
                        if (Request.Cookies["languageSM"] != null)  Request.Cookies["languageSM"].Value = "ar";
                        //System.Web.HttpContext.Current.Response.SetCookie(cookie);
                        return View();
                    }

                }
                else
                {
                    if (lang == "ar")
                    {
                        return Redirect("/SM/LoginSMEn");
                    }
                    else
                    {
                        return Redirect("/SM/LoginSMAr");

                    }
                }
            }

            if (lang == "en")
            {
                return Redirect("/SM/LoginSMEn");
            }
            else
            {
                return Redirect("/SM/LoginSMAr");

            }

        }
    }
}