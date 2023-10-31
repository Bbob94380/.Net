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
    [RoutePrefix("api/HOApi")]
    [EnableCors(origins: "http://localhost:8080", headers: "*", methods: "*")]
    public class HOAPIController : ApiController
    {

        [HttpPost]
        public async Task<string> LoginAsyncHO(Payload payload)
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

                    HttpCookie cookie = new HttpCookie("loginCookieHO");
                    cookie.Values.Add("projectType", "ho");
                    cookie.Values.Add("sessionId", loginResponse.sessionId);
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
        public async Task<string> GetAllSuppliersAsync(Payload payload)
        {
            //variables
            List<Supplier> suppliers = null;
            ResponseData<List<Supplier>> responseData = new ResponseData<List<Supplier>>();

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

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/supplier/findAll");
                    if (response.IsSuccessStatusCode)
                    {
                        suppliers = await response.Content.ReadAsAsync<List<Supplier>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = suppliers;
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
        public async Task<string> createSupplierAsync(Payload payload)
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


                    var objAsJson = JsonConvert.SerializeObject(payload.createSupplier);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/supplier/create", content);
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
        public async Task<string> GetAllDriversAsync(Payload payload)
        {
            //variables
            List<Driver> drivers = null;
            ResponseData<List<Driver>> responseData = new ResponseData<List<Driver>>();

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

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/driver/findAll");
                    if (response.IsSuccessStatusCode)
                    {
                        drivers = await response.Content.ReadAsAsync<List<Driver>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = drivers;
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
        public async Task<string> createDriverAsync(Payload payload)
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


                    var objAsJson = JsonConvert.SerializeObject(payload.createDriver);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/driver/create", content);
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
        public async Task<string> GetAllTrucksAsync(Payload payload)
        {
            //variables
            List<Truck> trucks = null;
            ResponseData<List<Truck>> responseData = new ResponseData<List<Truck>>();

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

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/truck/findAll");
                    if (response.IsSuccessStatusCode)
                    {
                        trucks = await response.Content.ReadAsAsync<List<Truck>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = trucks;
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
        public async Task<string> getAllStations(Payload payload)
        {
            //variables
            List<Station> stations = null;
            ResponseData<List<Station>> responseData = new ResponseData<List<Station>>();

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

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/station/getAllStations");
                    if (response.IsSuccessStatusCode)
                    {
                        stations = await response.Content.ReadAsAsync<List<Station>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = stations;
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
        public async Task<string> getAllPOs(Payload payload)
        {
            //variables
            List<PO> listOfPO = null;
            ResponseData<List<PO>> responseData = new ResponseData<List<PO>>();

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

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/purOrder/findAll");
                    if (response.IsSuccessStatusCode)
                    {
                        listOfPO = await response.Content.ReadAsAsync<List<PO>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = listOfPO;
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
        public async Task<string> createTruckAsync(Payload payload)
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


                    var objAsJson = JsonConvert.SerializeObject(payload.createTruck);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/truck/create", content);
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
        public async Task<string> findbySupplierId(Payload payload)
        {
            //variables
            List<Truck> trucks = new List<Truck>();
            ResponseData<List<Truck>> responseData = new ResponseData<List<Truck>>();

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

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/truck/findBySupplierId/" + payload.supplierId);
                    if (response.IsSuccessStatusCode)
                    {
                        trucks = await response.Content.ReadAsAsync<List<Truck>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = trucks;
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
        public async Task<string> getFuelAmounts(Payload payload)
        {
            //variables
            List<FuelAmountDetail> details = new List<FuelAmountDetail>();
            ResponseData<List<FuelAmountDetail>> responseData = new ResponseData<List<FuelAmountDetail>>();

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


                    var objAsJson = JsonConvert.SerializeObject(payload.fuelAmount);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/reception/getFuelAmounts", content);
                    if (response.IsSuccessStatusCode)
                    {
                        details = await response.Content.ReadAsAsync<List<FuelAmountDetail>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = details;

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
        public async Task<string> getPObyId(Payload payload)
        {
            //variables
            PO po = new PO();
            ResponseData<PO> responseData = new ResponseData<PO>();

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

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/purOrder/find/" + payload.poId);
                    if (response.IsSuccessStatusCode)
                    {
                        po = await response.Content.ReadAsAsync<PO>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = po;
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
        public async Task<string> getDriverbyId(Payload payload)
        {
            //variables
            Driver driver = new Driver();
            ResponseData<Driver> responseData = new ResponseData<Driver>();

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

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/driver/find/" + payload.driverId);
                    if (response.IsSuccessStatusCode)
                    {
                        driver = await response.Content.ReadAsAsync<Driver>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = driver;
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
        public async Task<string> getTruckById(Payload payload)
        {
            //variables
            Truck truck = new Truck();
            ResponseData<Truck> responseData = new ResponseData<Truck>();

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

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/truck/find/" + payload.truckId);
                    if (response.IsSuccessStatusCode)
                    {
                        truck = await response.Content.ReadAsAsync<Truck>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = truck;
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
        public async Task<string> getDOById(Payload payload)
        {
            //variables
            DO doObj = new DO();
            ResponseData<DO> responseData = new ResponseData<DO>();

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

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/delivOrder/find/" + payload.doId);
                    if (response.IsSuccessStatusCode)
                    {
                        doObj = await response.Content.ReadAsAsync<DO>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = doObj;
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
        public async Task<string> getStationById(Payload payload)
        {
            //variables
            Station station = new Station();
            ResponseData<Station> responseData = new ResponseData<Station>();

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

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/station/find/" + payload.stationId);
                    if (response.IsSuccessStatusCode)
                    {
                        station = await response.Content.ReadAsAsync<Station>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = station;
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
        public async Task<string> getDOsById(Payload payload)
        {
            //variables
            List<DO> listOfDO = new List<DO>();
            ResponseData<List<DO>> responseData = new ResponseData<List<DO>>();

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

                    HttpResponseMessage response = await client.GetAsync("FPOS/rest/delivOrder/findByPOId/" + payload.poId);
                    if (response.IsSuccessStatusCode)
                    {
                        listOfDO = await response.Content.ReadAsAsync<List<DO>>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = listOfDO;
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
        public async Task<string> createPOAsync(Payload payload)
        {
            //variables
            PO po = new PO();
            ResponseData<PO> responseData = new ResponseData<PO>();

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


                    var objAsJson = JsonConvert.SerializeObject(payload.createPO);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/purOrder/create", content);
                    if (response.IsSuccessStatusCode)
                    {
                        po = await response.Content.ReadAsAsync<PO>();
                        responseData.isSuccessStatusCode = response.IsSuccessStatusCode;
                        responseData.statusCode = response.StatusCode.ToString();
                        responseData.resultData = po;
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

        [HttpPut]
        public async Task<string> addStationToPOAsync(Payload payload)
        {
            //variables
            ResponseData<string> responseData = new ResponseData<string>();

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

                    var objAsJson = JsonConvert.SerializeObject(payload.addStationToPO);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PutAsync("FPOS/rest/purOrder/addStationToPO", content);
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
        public async Task<string> createDOAsync(Payload payload)
        {
            //variables
            ResponseData<string> responseData = new ResponseData<string>();

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

                    var objAsJson = JsonConvert.SerializeObject(payload.createDO);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/delivOrder/create", content);
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
        public async Task<string> createServiceAsync(Payload payload)
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

                    var objAsJson = JsonConvert.SerializeObject(payload.createServiceObj);
                    var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync("FPOS/rest/stationService/create", content);
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
        public void SignOutHO()
        {
            HttpContext.Current.Response.Cookies["loginCookieHO"].Values.Add("projectType", "");
            HttpContext.Current.Response.Cookies["loginCookieHO"].Values.Add("sessionId", "");
            //FormsAuthentication.SignOut();
        }

    }

}