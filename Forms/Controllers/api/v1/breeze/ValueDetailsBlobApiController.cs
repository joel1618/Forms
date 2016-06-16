using Breeze.WebApi2;
using Forms.Models;
using Forms.Models.Extensions;
using Forms.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using ValueDetailBlobEntity = Forms.ValueDetailsBlob;

namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class ValueDetailsBlobApiController : ApiController
    {
        ValueDetailsBlobRepository repository;
        public ValueDetailsBlobApiController()
        {
            this.repository = new ValueDetailsBlobRepository();
        }
        [HttpGet]
        public IQueryable<ValueDetailBlobViewModel> Search()
        {
            return repository.Search().Select(x => x.ToViewModel());
        }

        [HttpGet]
        public async Task<ValueDetailBlobViewModel> Get(Guid id)
        {
            var item = await repository.Get(id);
            return item.ToViewModel();
        }

        [HttpPost]
        public async Task<IHttpActionResult> Create(ValueDetailBlobViewModel item)
        {
            ValueDetailBlobViewModel model = null;
            try
            {
                item.UserId = User.Identity.GetUserId();
                var record = await repository.Create(item.ToEntity());
                model = record.ToViewModel();
                return Content(HttpStatusCode.OK, model);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpPut]
        public async Task<ValueDetailBlobViewModel> Update(Guid id, ValueDetailBlobViewModel item)
        {
            var response = await repository.Update(id, item.ToEntity());
            return response.ToViewModel(); 
        }

        [HttpDelete]
        public async void Delete(Guid id)
        {
            repository.Delete(id);
        }
    }
}