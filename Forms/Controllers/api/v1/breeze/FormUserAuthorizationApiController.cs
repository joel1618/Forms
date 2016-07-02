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
using FormUserAuthorizationEntity = Forms.FormUserAuthorization;
using FormUserAuthorizationViewModel = Forms.Models.FormUserAuthorizationViewModel;

namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class FormUserAuthorizationApiController : ApiController
    {
        FormUserAuthorizationRepository repository;
        AspNetUsersRepository userRepository;
        AuthorizationService authorizationService;
        FormUserAuthorizationRepository formUserAuthorizationRepository;
        private AspNetUser user;
        public FormUserAuthorizationApiController()
        {
            this.repository = new FormUserAuthorizationRepository();
            this.userRepository = new AspNetUsersRepository();
            this.authorizationService = new AuthorizationService();
            this.formUserAuthorizationRepository = new FormUserAuthorizationRepository();
            var currentUserId = User.Identity.GetUserId();
            user = userRepository.Search().Where(e => e.Id == currentUserId).FirstOrDefault();
        }
        [HttpGet]
        public IQueryable<FormUserAuthorizationViewModel> Search()
        {
            var formIds = formUserAuthorizationRepository.Search().Where(e => e.UserId == user.Id && e.IsReadForm == true).Select(x => x.FormId).ToList();
            return repository.Search().Where(e => e.UserId == user.Id || formIds.Contains(e.Id)).Select(item => new FormUserAuthorizationViewModel()
            {
                Id = item.Id,
                FormId = item.FormId,
                IsCreateData = item.IsCreateData,
                IsReadData = item.IsReadData,
                IsUpdateData = item.IsUpdateData,
                IsDeleteData = item.IsDeleteData,
                IsCreateForm = item.IsCreateForm,
                IsDeleteForm = item.IsDeleteForm,
                IsReadForm = item.IsReadForm,
                IsUpdateForm = item.IsUpdateForm,
                UserId = item.UserId,
                CreatedDateTime = item.CreatedDateTime,
                ModifiedDateTime = item.ModifiedDateTime,
                AspNetUser = new AspNetUserViewModel()
                {
                    Id = item.AspNetUser.Id,
                    Email = item.AspNetUser.Email
                },
                Form = new FormViewModel()
                {
                    Description = item.Form.Description,
                    Id = item.Form.Id,
                    CreatedDateTime = item.Form.CreatedDateTime,
                    ModifiedDateTime = item.Form.ModifiedDateTime,
                    Name = item.Form.Name,
                    UserId = item.Form.UserId,
                    PublishUrl = item.Form.PublishUrl
                }
            });
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            FormUserAuthorizationViewModel model = null;
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
        public async Task<IHttpActionResult> Create(FormUserAuthorizationViewModel item)
        {
            FormUserAuthorizationViewModel model = null;
            try
            {
                if (!authorizationService.IsAuthorized(item.Id, user.Email, AuthorizationService.AuthorizationType.IsCreate, AuthorizationService.EndpointType.Form))
                {
                    return Content(HttpStatusCode.Unauthorized, "You are not authorized to perform this action.");
                }
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
        public async Task<IHttpActionResult> Update(Guid id, FormUserAuthorizationViewModel item)
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