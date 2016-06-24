using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserEntity = Forms.AspNetUser;

namespace Forms.Repositories
{
    public class AspNetUsersRepository
    {
        FormsEntities context;
        public AspNetUsersRepository()
        {
            this.context = new FormsEntities();
        }
        public IQueryable<UserEntity> Search()
        {
            return context.AspNetUsers;
        }
    }
}