﻿using Breeze.WebApi2;
using Forms.Models;
using Forms.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using ValueEntity = Forms.Value;

namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class ValueApiController : ApiController
    {
        ValueRepository repository;
        public ValueApiController()
        {
            this.repository = new ValueRepository();
        }
        [HttpGet]
        public IQueryable<ValueViewModel> Search()
        {
            return repository.Search().Select(x => new ValueViewModel()
            {
                Id = x.Id,
                FormId = x.FormId,
                CreatedDateTime = x.CreatedDateTime,
                ModifiedDateTime = x.ModifiedDateTime
            });
        }

        [HttpPost]
        public async Task<ValueEntity> Get(Guid id)
        {
            return await repository.Get(id);
        }

        [HttpPost]
        public async Task<ValueEntity> Create(ValueEntity item)
        {
            return await repository.Create(item);
        }

        [HttpPut]
        public async Task<ValueEntity> Update(Guid id, ValueEntity item)
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