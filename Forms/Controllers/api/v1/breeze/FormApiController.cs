using Breeze.WebApi2;
using Forms.Models;
using Forms.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using FormEntity = Forms.Form;

namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class FormApiController : ApiController
    {
        FormRepository repository;
        public FormApiController()
        {
            this.repository = new FormRepository();
        }
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

        [HttpGet]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            var item = await repository.Get(id);
            return Content(HttpStatusCode.OK, new FormViewModel()
            {
                Description = item.Description,
                Id = item.Id,
                CreatedDateTime = item.CreatedDateTime,
                ModifiedDateTime = item.ModifiedDateTime,   
                Name = item.Name,
                UserId = item.UserId,
                PublishUrl = item.PublishUrl,
            });
        }

        [HttpPost]
        public async Task<FormEntity> Create(FormEntity item)
        {
            FormRepository formRepository = new FormRepository();
            FormEntity response = null;
            try
            {
                item.UserId = User.Identity.GetUserId();
                response = await formRepository.Create(item);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }
            return response;
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