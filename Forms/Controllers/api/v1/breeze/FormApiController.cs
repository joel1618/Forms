using Breeze.WebApi2;
using Forms.Models;
using Forms.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using FormEntity = Forms.Form;

namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class FormApiController : ApiController
    {
        [HttpGet]
        public IQueryable<FormViewModel> Search()
        {
            FormRepository formRepository = new FormRepository();
            var userId = User.Identity.GetUserId();
            return formRepository.Search().Where(e => e.UserId == userId).Select(x => new FormViewModel()
            {
                Description = x.Description,
                Id = x.Id,
                CreatedDateTime = x.CreatedDateTime,
                ModifiedDateTime = x.ModifiedDateTime,
                Name = x.Name,
                UserId = x.UserId,
                PublishUrl = x.PublishUrl,
            });
        }

        [HttpPost]
        public async Task<FormEntity> Get(Guid id)
        {
            FormRepository formRepository = new FormRepository();
            return await formRepository.Get(id);
        }

        [HttpPost]
        public async Task<FormEntity> Create(FormEntity item)
        {
            FormRepository formRepository = new FormRepository();
            item.UserId = User.Identity.GetUserId();
            return await formRepository.Create(item);
        }

        [HttpPut]
        public async Task<FormEntity> Update(Guid id, FormEntity item)
        {
            FormRepository formRepository = new FormRepository();
            return await formRepository.Update(id, item);
        }

        [HttpDelete]
        public async void Delete(Guid id)
        {
            FormRepository formRepository = new FormRepository();
            formRepository.Delete(id);
        }
    }
}