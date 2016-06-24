using Breeze.WebApi2;
using Forms.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using UserEntity = Forms.AspNetUser;

namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class AspNetUsersApiController : ApiController
    {
        AspNetUsersRepository repository;
        public AspNetUsersApiController()
        {
            this.repository = new AspNetUsersRepository();
        }
        [HttpGet]
        public IQueryable<UserEntity> Search()
        {
            return repository.Search();
        }
    }
}