using Breeze.WebApi2;
using Forms.Models;
using Forms.Repositories;
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
        public IQueryable<ValueDetailsViewModel> Search()
        {
            return repository.Search().Select(x => new ValueDetailsViewModel()
            {
                Id = x.Id,
                ValueId = x.ValueId,
                FormDetailsId = x.FormDetailsId,
                Value = x.Value
            });
        }

        [HttpPost]
        public async Task<ValueDetailEntity> Get(Guid id)
        {
            return await repository.Get(id);
        }

        [HttpPost]
        public async Task<ValueDetailEntity> Create(ValueDetailEntity item)
        {
            return await repository.Create(item);
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