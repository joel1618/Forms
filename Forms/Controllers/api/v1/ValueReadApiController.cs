using Forms.Models;
using Forms.Repositories;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Forms.Controllers.api.v1
{
    [RoutePrefix("api/v1/ValueReadApi")]
    public class ValueReadApiController : ApiController
    {
        ValueReadPivotRepository repository;
        FormDetailsRepository formDetailsRepository;
        public ValueReadApiController()
        {
            this.repository = new ValueReadPivotRepository();
            this.formDetailsRepository = new FormDetailsRepository();
        }
        [Route("Search/formId={formid}/page={page}/pagesize={pagesize}")]
        [HttpGet]
        public async Task<IHttpActionResult> Search(string formId, int page, int pageSize)
        {
            try
            {
                var response = repository.Search(formId, page, pageSize);
                var items = response.ToList();
                return Content(HttpStatusCode.OK, items);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Internal server error.");
            }
            //var formDetails = formDetailsRepository.Search().Where(e => e.FormId == formId);
            //dynamic expand = new ExpandoObject();
            //expand.Add("Id", "");
            //expand.Add("FormId", "");
            //expand.Add("CreatedDateTime", "");
            //foreach (var formDetail in formDetails)
            //{
            //    var columnName = formDetail.Name.ToString();
            //    expand.Add(columnName, "");
            //}
            //List<ExpandoObject> items = new List<ExpandoObject>();
            //var item = response.FirstOrDefault();
            //var s = item.GetType().FullName;
            //var properties = item.GetType().GetProperties(BindingFlags.Public);
            //foreach (var property in properties)
            //{
            //    var PropertyName = property.Name;
            //    var PropertyValue = item.GetType().GetProperty(property.Name).GetValue(item, null);
            //    //model.Add(PropertyName, PropertyValue);
            //}
            //return items;
        }
    }
}