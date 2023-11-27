using Newtonsoft.Json;
using POS.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace POS.Controllers
{
    [RoutePrefix("api/Request")]
    //[EnableCors(origins: "http://35.181.42.111:8080", headers: "*", methods: "*")]
    //[EnableCors(origins: "http://localhost:8080", headers: "*", methods: "*")]
    public class RequestController : ApiController
    {
        [HttpPost]
        public async Task<string> LoginAsync(Payload payload)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                LoginResponse loginResponse = new LoginResponse();
                ResponseData<LoginResponse> responseData = new ResponseData<LoginResponse>();

                var parameters = new Dictionary<string, string> { { "email", payload.email }, { "password", payload.password } };
                var encodedContent = new FormUrlEncodedContent(parameters);

                //var formContent = new FormUrlEncodedContent(new[]
                //    {
                //        new KeyValuePair<string, string>("email", payload.email),
                //        new KeyValuePair<string, string>("password", payload.password)
                //    });

                //string content = "email="+ payload.email + "&password="+ payload.password;
                //HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "FPOS/rest/user/login?email=" + payload.email + "&password=" + payload.password);

                //HttpResponseMessage response = await client.SendAsync(request);
                HttpResponseMessage response = await client.PostAsync("FPOS/rest/user/login", encodedContent);


                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Status is success");
                    var sessionId = response.Headers.GetValues("Set-Cookie").First(x => x.StartsWith("session_id"));
                    loginResponse.sessionId = sessionId.Substring(11);

                    loginResponse.roles = await response.Content.ReadAsAsync<List<string>>();
                    responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                    responseData.statusCode = response.StatusCode.ToString();
                    responseData.resultData = loginResponse;

                    HttpCookie cookie = new HttpCookie("loginCookieAttendant");
                    cookie.Values.Add("projectType", "pos");
                    cookie.Values.Add("sessionId", loginResponse.sessionId);
                    HttpContext.Current.Response.SetCookie(cookie);

                    HttpCookie sessionIdCookie = new HttpCookie("session_id", sessionId.Substring(11));
                    HttpContext.Current.Response.Cookies.Add(sessionIdCookie);

                    Console.WriteLine("Response Data: ");
                    Console.WriteLine(responseData);
                }
                else
                {
                    loginResponse.sessionId = null;
                    responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                    responseData.statusCode = response.StatusCode.ToString();
                    responseData.resultData = loginResponse;
                    Console.WriteLine("Response is failure. Response Data: ");
                    Console.WriteLine(responseData);
                }

                return JsonConvert.SerializeObject(responseData);
            }

        }

        [HttpPost]
        public async Task<string> CheckPinCodeAsync(Payload payload)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                LoginResponse loginResponse = new LoginResponse();
                ResponseData<LoginResponse> responseData = new ResponseData<LoginResponse>();
                var parameters = new Dictionary<string, string> { { "email", payload.email }, { "password", payload.password } };
                var encodedContent = new FormUrlEncodedContent(parameters);

                HttpResponseMessage response = await client.PostAsync("FPOS/rest/user/login", encodedContent);

                if (response.IsSuccessStatusCode)
                {
                    var sessionId = response.Headers.GetValues("Set-Cookie").First(x => x.StartsWith("session_id"));
                    loginResponse.sessionId = sessionId.Substring(11);

                    //HttpCookie sessionIdCookie = new HttpCookie("session_id", sessionId.Substring(11));
                    //HttpContext.Current.Response.Cookies.Add(sessionIdCookie);

                    loginResponse.roles = await response.Content.ReadAsAsync<List<string>>();
                    responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                    responseData.statusCode = response.StatusCode.ToString();
                    responseData.resultData = loginResponse;
                }
                else
                {
                    loginResponse.sessionId = null;
                    responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                    responseData.statusCode = response.StatusCode.ToString();
                    responseData.resultData = loginResponse;
                }

                return JsonConvert.SerializeObject(responseData);
            }

        }

        [HttpPost]
        public async Task<string> loginManagerPermission(Payload payload)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                LoginResponse loginResponse = new LoginResponse();
                ResponseData<LoginResponse> responseData = new ResponseData<LoginResponse>();
                var parameters = new Dictionary<string, string> { { "email", payload.email }, { "password", payload.password } };
                var encodedContent = new FormUrlEncodedContent(parameters);

                HttpResponseMessage response = await client.PostAsync("FPOS/rest/user/login", encodedContent);

                if (response.IsSuccessStatusCode)
                {
                    responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                    responseData.statusCode = response.StatusCode.ToString();
                }
                else
                {
                    loginResponse.sessionId = null;
                    responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                    responseData.statusCode = response.StatusCode.ToString();
                }

                return JsonConvert.SerializeObject(responseData);
            }

        }

        [HttpPost]
        public async Task<string> getCheckedInUsers()
        {
            //variables
            List<User> users = null;
            ResponseData<List<User>> responseData = new ResponseData<List<User>>();

            try
            {
                //http request
                using (HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/user/getCheckedInUsers");
                    if (response.IsSuccessStatusCode)
                    {
                        users = await response.Content.ReadAsAsync<List<User>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = users;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> GetDryProductsAsync(Payload payload)
        {
            //variables
            List<Category> categories = null;
            ResponseData<List<Category>> responseData = new ResponseData<List<Category>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);

           
                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));              
     
                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/dryProduct/findAll");
                    if (response.IsSuccessStatusCode)
                    {
                        categories = await response.Content.ReadAsAsync<List<Category>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = categories;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> FindByBarcodeAsync(Payload payload)
        {

            //variables
            Product product = null;
            ResponseData<Product> responseData = new ResponseData<Product>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/dryProduct/findbyBarcode/" + payload.barcode);
                    if (response.IsSuccessStatusCode)
                    {
                        product = await response.Content.ReadAsAsync<Product>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = product;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> createTransactionAsync(Payload payload)
        {
            //variables
            ResponseData<int> responseData = new ResponseData<int>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));


                    if (payload.createTransObj.saleInvoice.id == 0)
                    {
                        payload.createTransObj.saleInvoice = null;
                    }
                    else
                    {

                        if (payload.createTransObj.saleInvoice.saleDetails == null)
                        {
                            payload.createTransObj.saleInvoice.saleDetails = new List<CreateSaleDetail>();
                        }
                    }

                    if (payload.createTransObj.customerServiceTransaction.id == 0)
                    {
                        payload.createTransObj.customerServiceTransaction = null;
                    }

                    var objAsJson = JsonConvert.SerializeObject(payload.createTransObj);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/transaction/create", content);
                    if (response.IsSuccessStatusCode)
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.errorMsg = response.ReasonPhrase.ToString();
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                //responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> createRecipetForOneTransaction(Payload payload)
        {
            //variables
            ResponseData<int> responseData = new ResponseData<int>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));


                    if (payload.createTransObj.saleInvoice.id == 0)
                    {
                        payload.createTransObj.saleInvoice = null;
                    }
                    else
                    {

                        if (payload.createTransObj.saleInvoice.saleDetails == null)
                        {
                            payload.createTransObj.saleInvoice.saleDetails = new List<CreateSaleDetail>();
                        }
                    }

                    if (payload.createTransObj.customerServiceTransaction.id == 0)
                    {
                        payload.createTransObj.customerServiceTransaction = null;
                    }

                    var objAsJson = JsonConvert.SerializeObject(payload.createTransObj);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/receipt/createRecipetForOneTransaction", content);
                    if (response.IsSuccessStatusCode)
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.errorMsg = response.ReasonPhrase.ToString();
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                //responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public void attendantSignOut()
        {
            HttpContext.Current.Response.Cookies["loginCookieAttendant"].Values.Add("projectType", "");
            HttpContext.Current.Response.Cookies["loginCookieAttendant"].Values.Add("sessionId", "");
            //FormsAuthentication.SignOut();

        }

        [HttpPost]
        public async Task<string> getTransactionId(Payload payload)
        {

            //variables
            string transId = null;
            ResponseData<decimal> responseData = new ResponseData<decimal>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/transaction/getTransactionId/" + payload.transType);
                    if (response.IsSuccessStatusCode)
                    {
                        transId = await response.Content.ReadAsAsync<string>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = transId == null? 0: decimal.Parse(transId);
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = 0;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = 0;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> GetTransactionMainId(Payload payload)
        {

            //variables
            string transId = null;
            ResponseData<decimal> responseData = new ResponseData<decimal>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("/FPOS/rest/transaction/getTransactionId/TRANSACTION");
                    if (response.IsSuccessStatusCode)
                    {
                        transId = await response.Content.ReadAsAsync<string>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = transId == null ? 0 : decimal.Parse(transId);
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = 0;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = 0;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> GetCurrencyRatio(Payload payload)
        {

            //variables
            string currency = null;
            ResponseData<decimal> responseData = new ResponseData<decimal>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/currency/find");
                    if (response.IsSuccessStatusCode)
                    {
                        currency = await response.Content.ReadAsAsync<string>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = currency == null ? 0 : decimal.Parse(currency);
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = 0;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = 0;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> checkIfPtsFound(Payload payload)
        {

            //variables
            bool isPts = false;
            ResponseData<bool> responseData = new ResponseData<bool>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear(); client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/generalConfiguration/checkIfPtsFound");
                    if (response.IsSuccessStatusCode)
                    {
                        isPts = await response.Content.ReadAsAsync<bool>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = isPts;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = false;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = false;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> findPreviousCurrencyRatio(Payload payload)
        {

            //variables
            string currency = null;
            ResponseData<decimal> responseData = new ResponseData<decimal>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/currency/findPreviousCurrencyRatio");
                    if (response.IsSuccessStatusCode)
                    {
                        currency = await response.Content.ReadAsAsync<string>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = currency == null ? 0 : decimal.Parse(currency);
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = 0;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = 0;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> GetCurrentUser(Payload payload)
        {

            //variables
            User user = null;
            ResponseData<User> responseData = new ResponseData<User>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/user/getCurrentUser");
                    if (response.IsSuccessStatusCode)
                    {
                        user = await response.Content.ReadAsAsync<User>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = user;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }


        [HttpPost]
        public async Task<string> getStationManagerName(Payload payload)
        {

            //variables
            string stationManagerName = "";
            ResponseData<string> responseData = new ResponseData<string>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/generalConfiguration/getStationManagerName");
                    if (response.IsSuccessStatusCode)
                    {
                        stationManagerName = await response.Content.ReadAsStringAsync();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = stationManagerName;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> getWetProductTypes(Payload payload)
        {
            //variables
            List<string> wetProductTypes = new List<string>();
            ResponseData<List<string>> responseData = new ResponseData<List<string>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/wetProduct/getWetProductTypes");
                    if (response.IsSuccessStatusCode)
                    {
                        wetProductTypes = await response.Content.ReadAsAsync<List<string>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = wetProductTypes;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> getAllWetProductTypes(Payload payload)
        {
            //variables
            List<WetProductType> wetProductTypes = new List<WetProductType>();
            ResponseData<List<WetProductType>> responseData = new ResponseData<List<WetProductType>>();

            try
            {
                //Add cookie
                HttpClientHandler handler = new HttpClientHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                //handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/wetProduct/findAll");
                    if (response.IsSuccessStatusCode)
                    {
                        wetProductTypes = await response.Content.ReadAsAsync<List<WetProductType>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = wetProductTypes;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message + "/" +e.StackTrace);
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> findNozzlesAccordingToEmployee(Payload payload)
        {

            //variables
            List<Nozzle> nozzles = null;
            ResponseData<List<Nozzle>> responseData = new ResponseData<List<Nozzle>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/nozzle/findNozzlesAccordingToEmployee/" + payload.employeeId);
                    if (response.IsSuccessStatusCode)
                    {
                        nozzles = await response.Content.ReadAsAsync<List<Nozzle>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = nozzles;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> findAvailableNozzles(Payload payload)
        {

            //variables
            List<NozzleAvailable> nozzles = null;
            ResponseData<List<NozzleAvailable>> responseData = new ResponseData<List<NozzleAvailable>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/nozzle/findAvailableNozzles");
                    if (response.IsSuccessStatusCode)
                    {
                        nozzles = await response.Content.ReadAsAsync<List<NozzleAvailable>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = nozzles;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> findNozzlesAccordingToEmployeeForClosingSession(Payload payload)
        {

            //variables
            List<Nozzle> nozzles = null;
            ResponseData<List<Nozzle>> responseData = new ResponseData<List<Nozzle>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/nozzle/findNozzlesAccordingToEmployeeForClosingSession/" + payload.employeeId);
                    if (response.IsSuccessStatusCode)
                    {
                        nozzles = await response.Content.ReadAsAsync<List<Nozzle>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = nozzles;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPut]
        public async Task<string> updateNozzleCounters(Payload payload)
        {
            //variables
            ResponseData<int> responseData = new ResponseData<int>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    var objAsJson = JsonConvert.SerializeObject(payload.nozzleCounters);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PutAsync("FPOS/rest/nozzle/updateNozzleCounters", content);
                    if (response.IsSuccessStatusCode)
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.errorMsg = response.ReasonPhrase.ToString();
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                //responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }


        [HttpPost]
        public async Task<string> openEmployeeShift(Payload payload)
        {
            //variables
            ResponseData<int> responseData = new ResponseData<int>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    var objAsJson = JsonConvert.SerializeObject(payload.shift);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/employeeShift/openEmployeeShift", content);
                    if (response.IsSuccessStatusCode)
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.errorMsg = response.ReasonPhrase.ToString();
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                //responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> getSalesSummary(Payload payload)
        {
            //variables
            SalesSummary summary = new SalesSummary();
            ResponseData<SalesSummary> responseData = new ResponseData<SalesSummary>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    var objAsJson = JsonConvert.SerializeObject(payload.nozzleCounters);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/employeeShift/getSalesSummary", content);
                    if (response.IsSuccessStatusCode)
                    {
                        summary = await response.Content.ReadAsAsync<SalesSummary>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = summary;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPut]
        public async Task<string> closeEmployeeShift(Payload payload)
        {
            //variables
            ResponseData<int> responseData = new ResponseData<int>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    var objAsJson = JsonConvert.SerializeObject(payload.closeShift);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PutAsync("FPOS/rest/employeeShift/closeEmployeeShift", content);
                    if (response.IsSuccessStatusCode)
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.errorMsg = response.ReasonPhrase.ToString();
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                //responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }


        [HttpPost]
        public async Task<string> closeSession(Payload payload)
        {
            //variables
            ResponseData<int> responseData = new ResponseData<int>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    var objAsJson = JsonConvert.SerializeObject(payload.closeSession);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/employeeShift/closeSession", content);
                    if (response.IsSuccessStatusCode)
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.errorMsg = response.ReasonPhrase.ToString();
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                //responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> getWashOptionCategories(Payload payload)
        {
            //variables
            List<CarOptionCategory> options = new List<CarOptionCategory>();
            ResponseData<List<CarOptionCategory>> responseData = new ResponseData<List<CarOptionCategory>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    var objAsJson = JsonConvert.SerializeObject(payload.nozzleCounters);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/washSubCategory/findActive");
                    if (response.IsSuccessStatusCode)
                    {
                        options = await response.Content.ReadAsAsync<List<CarOptionCategory>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = options;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> getActiveServices(Payload payload)
        {
            //variables
            List<Service> services = new List<Service>();
            ResponseData<List<Service>> responseData = new ResponseData<List<Service>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/stationService/findActive");
                    if (response.IsSuccessStatusCode)
                    {
                        services = await response.Content.ReadAsAsync<List<Service>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = services;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> getCustomersNames(Payload payload)
        {
            //variables
            List<Customer> customerNames = new List<Customer>();
            ResponseData<List<Customer>> responseData = new ResponseData<List<Customer>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/customer/findNames");
                    if (response.IsSuccessStatusCode)
                    {
                        customerNames = await response.Content.ReadAsAsync<List<Customer>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = customerNames;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> getAllCustomers(Payload payload)
        {
            //variables
            List<Customer> customers = new List<Customer>();
            ResponseData<List<Customer>> responseData = new ResponseData<List<Customer>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/customer/findAll");
                    if (response.IsSuccessStatusCode)
                    {
                        customers = await response.Content.ReadAsAsync<List<Customer>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = customers;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> FindCustomerAsync(Payload payload)
        {

            //variables
            Customer customer = null;
            ResponseData<Customer> responseData = new ResponseData<Customer>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/customer/find/" + payload.customerId);
                    if (response.IsSuccessStatusCode)
                    {
                        customer = await response.Content.ReadAsAsync<Customer>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = customer;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = null;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }

        [HttpPost]
        public async Task<string> createCustomer(Payload payload)
        {
            //variables
            Customer customer = null;
            ResponseData<Customer> responseData = new ResponseData<Customer>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));


                    var objAsJson = JsonConvert.SerializeObject(payload.createCustomer);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/customer/create", content);
                    if (response.IsSuccessStatusCode)
                    {
                        customer = await response.Content.ReadAsAsync<Customer>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = customer;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.errorMsg = response.ReasonPhrase.ToString();
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                //responseData.resultData = null;
            }

            return JsonConvert.SerializeObject(responseData);
        }


        [HttpPost]
        public async Task<string> checkIfEmployeeHasOpenSession(Payload payload)
        {

            //variables
            bool hasOpenShift = false;
            ResponseData<bool> responseData = new ResponseData<bool>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = false;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ipAddress"]);
                    client.DefaultRequestHeaders.Accept.Clear();client.DefaultRequestHeaders.Add("Cookie", "session_id=" + payload.sessionId);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/employeeShift/checkIfEmployeeHasOpenSession/" + payload.employeeId);
                    if (response.IsSuccessStatusCode)
                    {
                        hasOpenShift = await response.Content.ReadAsAsync<bool>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = hasOpenShift;
                    }
                    else
                    {
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = false;
                    }

                    return JsonConvert.SerializeObject(responseData);
                }

            }
            catch (Exception e)
            {
                responseData.isSuccessStatusCode = false;
                responseData.errorMsg = e.Message;
                responseData.resultData = false;
            }

            return JsonConvert.SerializeObject(responseData);
        }
    }


    public class Payload
    {
        public string employeeId { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string sessionId { get; set; }
        public string customerId { get; set; }
        public string barcode { get; set; }
        public string transType { get; set; }
        public string employeName { get; set; }
        public string saleId { get; set; }
        public string receptionId { get; set; }
        public string saleTransactionId { get; set; }
        public string supplierId { get; set; }
        public string poId { get; set; }
        public string doId { get; set; }
        public string stationId { get; set; }
        public string driverId { get; set; }
        public string truckId { get; set; }
        public string shiftId { get; set; }
        public List<decimal> transactionsIds { get; set; }
        public CreateTransaction createTransObj { get; set; }
        public CreateReception createReception { get; set; }
        public CreateService createServiceObj { get; set; }
        public CreateCustomer createCustomer { get; set; }
        public EodPaylod eodPaylod { get; set; }
        public EOD eodObj { get; set; }
        public Service service { get; set; }
        public Supplier supplier { get; set; }
        public CreateSupplier createSupplier { get; set; }
        public Driver driver { get; set; }
        public CreateDriver createDriver { get; set; }
        public Truck truck { get; set; }
        public CreateTruck createTruck { get; set; }
        public CreatePO createPO { get; set; }
        public CreateDO createDO { get; set; }
        public FuelAmount fuelAmount { get; set; }
        public StationToPO addStationToPO { get; set; }
        public Calibration calibration { get; set; }
        public CreateCalibration createCalibration { get; set; }
        public RefundDry refundDry { get; set; }
        public Shift shift { get; set; }
        public CloseShift closeShift { get; set; }
        public CloseSession closeSession { get; set; }
        public HistoryPayload historyPayload { get; set; }
        public List<NozzleCounter> nozzleCounters { get; set; }
        public List<AssignNozzle> assignNozzles { get; set; }
    }

    public class HistoryPayload
    {
        public string fromDate { get; set; }
        public string toDate { get; set; }
    }

    public class LoginResponse
    {
        public string sessionId { get; set; }
        public List<string> roles { get; set; }
    }

    class Category
    {
        public string cat_name { get; set; }
        public List<Product> products { get; set; }

    }

    class Product
    {
        public string id { get; set; }
        public string name { get; set; }
        public string category { get; set; }
        public float sale_price { get; set; }
        public string barcode { get; set; }
        public float quantity { get; set; }
        public string image { get; set; }
    }

    class ResponseData<T>
    {
        public string statusCode { get; set; }
        public string errorMsg { get; set; }
        public bool isSuccessStatusCode { get; set; }
        public T resultData { get; set; }
    }


}