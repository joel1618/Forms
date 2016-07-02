using Breeze.WebApi2;
using Forms.Models;
using Forms.Models.Extensions;
using Forms.Repositories;
using Forms.Services;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using FormDetailsOptionEntity = Forms.FormDetailsOption;
namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class FormDetailsOptionsApiController : ApiController
    {

        FormDetailsOptionsRepository repository;
        AspNetUsersRepository userRepository;
        AuthorizationService authorizationService;
        FormUserAuthorizationRepository formUserAuthorizationRepository;
        private AspNetUser user;
        public FormDetailsOptionsApiController()
        {
            this.repository = new FormDetailsOptionsRepository();
            this.userRepository = new AspNetUsersRepository();
            this.authorizationService = new AuthorizationService();
            this.formUserAuthorizationRepository = new FormUserAuthorizationRepository();
            var currentUserId = User.Identity.GetUserId();
            user = userRepository.Search().Where(e => e.Id == currentUserId).FirstOrDefault();
        }
        [HttpGet]
        public IQueryable<FormDetailOptionViewModel> Search()
        {
            return repository.Search().Select(x => new FormDetailOptionViewModel()
            {
                Id = x.Id,
                FormDetailsId = x.FormDetailsId,
                Name = x.Name
            });
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            FormDetailOptionViewModel model = null;
            try
            {
                var record = await repository.Get(id);
                if (!authorizationService.IsAuthorized(record.Id, user.Email, AuthorizationService.AuthorizationType.IsRead, AuthorizationService.EndpointType.Form))
                {
                    return Content(HttpStatusCode.Unauthorized, "You are not authorized to perform this action.");
                }
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
        public async Task<IHttpActionResult> Create(FormDetailOptionViewModel item)
        {
            FormDetailOptionViewModel model = null;
            try
            {
                if (!authorizationService.IsAuthorized(item.Id, user.Email, AuthorizationService.AuthorizationType.IsCreate, AuthorizationService.EndpointType.Form))
                {
                    return Content(HttpStatusCode.Unauthorized, "You are not authorized to perform this action.");
                }
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
        public async Task<IHttpActionResult> Update(Guid id, FormDetailOptionViewModel item)
        {
            if (!authorizationService.IsAuthorized(item.Id, user.Email, AuthorizationService.AuthorizationType.IsUpdate, AuthorizationService.EndpointType.Form))
            {
                return Content(HttpStatusCode.Unauthorized, "You are not authorized to perform this action.");
            }
            var record = await repository.Update(id, item.ToEntity());
            var model = record.ToViewModel();
            return Content(HttpStatusCode.OK, model);
        }

        [HttpDelete]
        public async Task<IHttpActionResult> Delete(Guid id)
        {
            var item = await repository.Get(id);
            if (!authorizationService.IsAuthorized(item.Id, user.Email, AuthorizationService.AuthorizationType.IsDelete, AuthorizationService.EndpointType.Form))
            {
                return Content(HttpStatusCode.Unauthorized, "You are not authorized to perform this action.");
            }
            else
            {
                repository.Delete(id);
                return Content(HttpStatusCode.OK, "");
            }
        }
    }
}