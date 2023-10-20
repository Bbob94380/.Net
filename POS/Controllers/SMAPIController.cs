using Newtonsoft.Json;
using POS.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
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
    [RoutePrefix("api/SmApi")]
    [EnableCors(origins: "http://localhost:8080", headers: "*", methods: "*")]
    public class SMAPIController : ApiController
    {

        [HttpPost]
        public async Task<string> LoginAsyncSM(Payload payload)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:8080/");
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
                    responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                    responseData.statusCode = response.StatusCode.ToString();
                    responseData.resultData = loginResponse;

                    HttpCookie cookie = new HttpCookie("loginCookie");
                    cookie.Values.Add("projectType", "sm");
                    HttpContext.Current.Response.SetCookie(cookie);
                    //FormsAuthentication.SetAuthCookie(loginResponse.sessionId, false);
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
        public void SignOutSM()
        {
            HttpContext.Current.Response.Cookies["loginCookie"].Values.Add("projectType", "");
            //FormsAuthentication.SignOut();
        }

        [HttpPost]
        public async Task<string> GetAllReceiptsAsync(Payload payload)
        {
            //variables
            List<Receipt> receipts = null;
            ResponseData<List<Receipt>> responseData = new ResponseData<List<Receipt>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/receipt/findAll");
                    if (response.IsSuccessStatusCode)
                    {
                        receipts = await response.Content.ReadAsAsync<List<Receipt>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = receipts;
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
        public async Task<string> GetAllRefundsAsync(Payload payload)
        {
            //variables
            List<Refund> refunds = null;
            ResponseData<List<Refund>> responseData = new ResponseData<List<Refund>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/refund/findAllRefunds");
                    if (response.IsSuccessStatusCode)
                    {
                        refunds = await response.Content.ReadAsAsync<List<Refund>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = refunds;
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
        public async Task<string> GetAllTransactionsAsync(Payload payload)
        {
            //variables
            List<Transaction> transactions = null;
            ResponseData<List<Transaction>> responseData = new ResponseData<List<Transaction>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/transaction/findAll");
                    if (response.IsSuccessStatusCode)
                    {
                        transactions = await response.Content.ReadAsAsync<List<Transaction>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = transactions;
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
        public async Task<string> getTransactionsWithoutReceiptWithinTwoDays(Payload payload)
        {
            //variables
            List<Transaction> transactions = null;
            ResponseData<List<Transaction>> responseData = new ResponseData<List<Transaction>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/transaction/getTransactionsWithoutReceiptWithinTwoDays");
                    if (response.IsSuccessStatusCode)
                    {
                        transactions = await response.Content.ReadAsAsync<List<Transaction>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = transactions;
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
        public async Task<string> createReceiptAsync(Payload payload)
        {
            //variables
            ResponseData<int> responseData = new ResponseData<int>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));


                    if (payload.createTransObj.saleInvoice.saleDetails == null)
                    {
                        payload.createTransObj.saleInvoice.saleDetails = new List<CreateSaleDetail>();
                    }

                    var objAsJson = JsonConvert.SerializeObject(payload.createTransObj);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/receipt/create", content);
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
        public async Task<string> createRecipetForMoreThanTransaction(Payload payload)
        {
            //variables
            ResponseData<int> responseData = new ResponseData<int>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));


                    var objAsJson = JsonConvert.SerializeObject(payload.transactionsIds);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/receipt/createRecipetForMoreThanTransaction", content);
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
        public async Task<string> createCalibrationAsync(Payload payload)
        {
            //variables
            ResponseData<int> responseData = new ResponseData<int>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    var objAsJson = JsonConvert.SerializeObject(payload.calibration);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/calibration/create", content);
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
        public async Task<string> createRefundDryAsync(Payload payload)
        {
            //variables
            ResponseData<int> responseData = new ResponseData<int>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    var objAsJson = JsonConvert.SerializeObject(payload.refundDry);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/refund/createDryRefund", content);
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
        public async Task<string> findDryProductSaleById(Payload payload)
        {
            //variables
            SaleInvoice dryProduct = new SaleInvoice();
            ResponseData<SaleInvoice> responseData = new ResponseData<SaleInvoice>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/transaction/findDryProductSaleById/"+ payload.saleId);
                    if (response.IsSuccessStatusCode)
                    {
                        dryProduct = await response.Content.ReadAsAsync<SaleInvoice>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = dryProduct;
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
        public async Task<string> getDetailsToBeReturned(Payload payload)
        {
            //variables
            List<SaleDetail> saleDetails = new List<SaleDetail>() ;
            ResponseData<List<SaleDetail>> responseData = new ResponseData<List<SaleDetail>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/refund/getDetailsToBeReturned/" + payload.saleId);
                    if (response.IsSuccessStatusCode)
                    {
                        saleDetails = await response.Content.ReadAsAsync<List<SaleDetail>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = saleDetails;
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
        public async Task<string> getRecentTransaction(Payload payload)
        {
            //variables
            TransactionDetail wetProduct = new TransactionDetail();
            ResponseData<TransactionDetail> responseData = new ResponseData<TransactionDetail>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/calibration/findRecentTransaction");
                    if (response.IsSuccessStatusCode)
                    {
                        wetProduct = await response.Content.ReadAsAsync<TransactionDetail>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = wetProduct;
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
        public async Task<string> findWetProductSaleById(Payload payload)
        {
            //variables
            TransactionDetail wetProduct = new TransactionDetail();
            ResponseData<TransactionDetail> responseData = new ResponseData<TransactionDetail>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/transaction/findWetProductSaleById/" + payload.saleTransactionId);
                    if (response.IsSuccessStatusCode)
                    {
                        wetProduct = await response.Content.ReadAsAsync<TransactionDetail>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = wetProduct;
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
        public async Task<string> getAllReception(Payload payload)
        {
            //variables
            List<Reception> receptions = null;
            ResponseData<List<Reception>> responseData = new ResponseData<List<Reception>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/reception/findAll");
                    if (response.IsSuccessStatusCode)
                    {
                        receptions = await response.Content.ReadAsAsync<List<Reception>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = receptions;
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
        public async Task<string> getNConfTypes(Payload payload)
        {
            //variables
            List<string> types = null;
            ResponseData<List<string>> responseData = new ResponseData<List<string>>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/reception/getNConfTypes");
                    if (response.IsSuccessStatusCode)
                    {
                        types = await response.Content.ReadAsAsync<List<string>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = types;
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
        public async Task<string> getReceptionById(Payload payload)
        {
            //variables
            Reception reception = new Reception();
            ResponseData<Reception> responseData = new ResponseData<Reception>();

            try
            {
                //Add cookie
                WebRequestHandler handler = new WebRequestHandler();
                handler.CookieContainer = new System.Net.CookieContainer();
                handler.UseCookies = true;
                handler.UseDefaultCredentials = true;
                Cookie clientCookie = new Cookie("session_id", payload.sessionId);
                clientCookie.Domain = Request.RequestUri.Host;
                clientCookie.Path = "/";
                handler.CookieContainer.Add(clientCookie);


                //http request
                using (HttpClient client = new HttpClient(handler))
                {
                    client.BaseAddress = new Uri("http://localhost:8080/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/reception/find/" + payload.receptionId);
                    if (response.IsSuccessStatusCode)
                    {
                        reception = await response.Content.ReadAsAsync<Reception>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = reception;
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
    }

}