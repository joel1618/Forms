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
using ValueDetailEntity = Forms.ValueDetail;

namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class ValueDetailsApiController : ApiController
    {
        ValueDetailsRepository repository;
        public ValueDetailsApiController()
        {
            this.repository = new ValueDetailsRepository();
        }
        [HttpGet]
        public IQueryable<ValueDetailViewModel> Search()
        {
            return repository.Search().Select(x => new ValueDetailViewModel()
            {
                Id = x.Id,
                ValueId = x.ValueId,
                FormDetailsId = x.FormDetailsId,
                Value = x.Value
            });
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            ValueDetailViewModel model = null;
            try
            {
                var record = await repository.Get(id);
                model = record.ToViewModel();
                return Content(HttpStatusCode.OK, model);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> Create(ValueDetailViewModel item)
        {
            ValueDetailViewModel model = null;
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
        public async Task<ValueDetailEntity> Update(Guid id, ValueDetailEntity item)
        {
            return await repository.Update(id, item);
        }

        [HttpDelete]
        public async void Delete(Guid id)
        {
            repository.Delete(id);
        }
    }
}