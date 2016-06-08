using Breeze.WebApi2;
using Forms.Models;
using Forms.Models.Extensions;
using Forms.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<ValueDetailEntity> Get(Guid id)
        {
            return await repository.Get(id);
        }

        [HttpPost]
        public async Task<ValueDetailViewModel> Create(ValueDetailViewModel item)
        {
            item.UserId = User.Identity.GetUserId();
            var record = await repository.Create(item.ToEntity());
            var model = record.ToViewModel();
            return model;
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