using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ValueEntity = Forms.Value;
using ValueViewModel = Forms.Models.ValueViewModel;

namespace Forms.Models.Extensions
{
    public static class ValueViewModelExtension
    {
        public static ValueEntity ToEntity(this ValueViewModel item)
        {
            var model = new ValueEntity()
            {
                Id = item.Id,
                CreatedDateTime = item.CreatedDateTime,
                FormId = item.FormId,
                IsSent = item.IsSent, 
                Latitude = item.Latitude,
                Longitude = item.Longitude,
                ModifiedDateTime = item.ModifiedDateTime,
                SyncDateTime = item.SyncDateTime,
                UserId = item.UserId
            };

            return model;
        }

        public static ValueViewModel ToViewModel(this ValueEntity item)
        {
            var model = new ValueViewModel()
            {
                Id = item.Id,
                CreatedDateTime = item.CreatedDateTime,
                FormId = item.FormId,
                IsSent = item.IsSent,
                Latitude = item.Latitude,
                Longitude = item.Longitude,
                ModifiedDateTime = item.ModifiedDateTime,
                SyncDateTime = item.SyncDateTime,
                UserId = item.UserId
            };

            return model;
        }
    }
}