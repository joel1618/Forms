using Forms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AspNetUsersInfoEntity = Forms.AspNetUsersInfo;

namespace Forms.Repositories
{
    public class AspNetUsersInfoRepository
    {
        public AspNetUsersInfoEntity Create(AspNetUsersInfoEntity item)
        {
            using(var context = new FormsEntities())
            {
                context.AspNetUsersInfoes.Add(item);
                context.SaveChanges();
                return item;
            }
        }
    }
}