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
            
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "pos")
                {
                    return Redirect("/Attendant/IndexAttendantEn");
                }
                else
                {
                    return View();
                }
            }
            return View();
        }
        public ActionResult LoginAttendantAr()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookieAttendant"];
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "pos")
                {
                    return Redirect("/Attendant/IndexAttendantAr");
                }
                else
                {
                    return View();
                }
            }
            return View();
        }
        public ActionResult IndexAttendantEn()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookieAttendant"];
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "pos")
                {
                    return View();
                }
                else
                {
                    return Redirect("/Attendant/LoginAttendantEn");
                }
            }
            return Redirect("/Attendant/LoginAttendantEn");
        }
        public ActionResult IndexAttendantAr()
        {
            bool isLoggedIn = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            var cookie = Request.Cookies["loginCookieAttendant"];
            if (cookie != null)
            {
                var projectType = cookie.Values["projectType"].ToString();

                if (projectType == "pos")
                {
                    return View();
                }
                else
                {
                    return Redirect("/Attendant/LoginAttendantAr");
                }
            }
            return Redirect("/Attendant/LoginAttendantAr");
        }
    }
}