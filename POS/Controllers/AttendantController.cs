using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace POS.Controllers
{
    public class AttendantController : Controller
    {

        public ActionResult LoginAttendantEn()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookieAttendant"];
            var lang = "";
            if(Request.Cookies["languagePOS"] !=null) lang = Request.Cookies["languagePOS"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "pos")
                {
                    if (lang == "ar")
                    {
                        return Redirect("/Attendant/IndexAttendantAr");
                    }
                    else
                    {
                        return Redirect("/Attendant/IndexAttendantEn");
                    }
                }
                else
                {
                    if (lang == "ar")
                    {
                        return Redirect("/Attendant/LoginAttendantAr");
                    }
                    else
                    {
                        return View();
                    }
                }
            }

            if (lang == "ar")
            {
                return Redirect("/Attendant/LoginAttendantAr");
            }
            else
            {
                return View();
            }
        }
        public ActionResult LoginAttendantAr()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookieAttendant"];
            var lang = "";
            if (Request.Cookies["languagePOS"] != null) lang = Request.Cookies["languagePOS"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "pos")
                {

                    if (lang == "en")
                    {
                        return Redirect("/Attendant/IndexAttendantEn");
                    }
                    else
                    {
                        return Redirect("/Attendant/IndexAttendantAr");
                    }
                }
                else
                {
                    if (lang == "en")
                    {
                        return Redirect("/Attendant/LoginAttendantEn");
                    }
                    else
                    {
                        return View();
                    }
                }
            }

            if (lang == "en")
            {
                return Redirect("/Attendant/LoginAttendantEn");
            }
            else
            {
                return View();
            }
        }
        public ActionResult IndexAttendantEn()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookieAttendant"];
            var lang = "";
            if (Request.Cookies["languagePOS"] != null) lang = Request.Cookies["languagePOS"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "pos") //loggedIn
                {

                    if (lang == "ar") {
                        return Redirect("/Attendant/IndexAttendantAr");
                    }
                    else
                    {
                        Request.Cookies["languagePOS"].Value = "en";
                        //System.Web.HttpContext.Current.Response.SetCookie(cookie);
                        return View();
                    }
                    
                }
                else
                {
                    if (lang == "ar")
                    {
                        return Redirect("/Attendant/LoginAttendantAr");
                    }
                    else
                    {
                        return Redirect("/Attendant/LoginAttendantEn");

                    }
                }
            }


            if (lang == "ar")
            {
                return Redirect("/Attendant/LoginAttendantAr");
            }
            else
            {
                return Redirect("/Attendant/LoginAttendantEn");

            }

        }
        public ActionResult IndexAttendantAr()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookieAttendant"];
            var lang = "";
            if (Request.Cookies["languagePOS"] != null) lang = Request.Cookies["languagePOS"].Value;

            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "pos") //loggedIn
                {

                    if (lang == "en")
                    {
                        return Redirect("/Attendant/IndexAttendantEn");
                    }
                    else
                    {
                        Request.Cookies["languagePOS"].Value = "ar";
                        //System.Web.HttpContext.Current.Response.SetCookie(cookie);
                        return View();
                    }

                }
                else
                {
                    if (lang == "ar")
                    {
                        return Redirect("/Attendant/LoginAttendantEn");
                    }
                    else
                    {
                        return Redirect("/Attendant/LoginAttendantAr");

                    }
                }
            }

            if (lang == "en")
            {
                return Redirect("/Attendant/LoginAttendantEn");
            }
            else
            {
                return Redirect("/Attendant/LoginAttendantAr");

            }
        }
    }
}