using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AspNetUserEntity = Forms.AspNetUser;
using AspNetUserViewModel = Forms.Models.AspNetUserViewModel;

namespace Forms.Models.Extensions
{
    public static class AspNetUserViewModelExtension
    {
        public static AspNetUserEntity ToEntity(this AspNetUserViewModel item)
        {
            var model = new AspNetUserEntity()
            {
                Id = item.Id,
                Email = item.Email
            };

            return model;
        }

        public static AspNetUserViewModel ToViewModel(this AspNetUserEntity item)
        {
            var model = new AspNetUserViewModel()
            {
                Id = item.Id,
                Email = item.Email
            };

            return model;
        }
    }
}