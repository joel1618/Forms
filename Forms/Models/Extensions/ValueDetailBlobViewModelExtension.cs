using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ValueDetailBlobEntity = Forms.ValueDetailsBlob;
using ValueDetailBlobViewModel = Forms.Models.ValueDetailBlobViewModel;

namespace Forms.Models.Extensions
{
    public static class ValueDetailBlobViewModelExtension
    {
        public static ValueDetailBlobEntity ToEntity(this ValueDetailBlobViewModel item)
        {
            var model = new ValueDetailBlobEntity();
            model.Id = item.Id;
            model.UserId = item.UserId;
            model.Blob = item.Blob;
            model.IsSent = item.IsSent;
            model.SyncDateTime = item.SyncDateTime.HasValue ? item.SyncDateTime.Value : new Nullable<DateTime>();

            model.CreatedDateTime = item.CreatedDateTime;
            model.ModifiedDateTime = item.ModifiedDateTime.HasValue ? item.ModifiedDateTime.Value : new Nullable<DateTime>();
            model.UserId = item.UserId;
            return model;
        }

        public static ValueDetailBlobViewModel ToViewModel(this ValueDetailBlobEntity item)
        {
            var model = new ValueDetailBlobViewModel();
            model.Id = item.Id;
            model.UserId = item.UserId;
            model.Blob = item.Blob;
            model.IsSent = item.IsSent;
            model.SyncDateTime = item.SyncDateTime.HasValue ? item.SyncDateTime.Value : new Nullable<DateTime>();

            model.CreatedDateTime = item.CreatedDateTime;
            model.ModifiedDateTime = item.ModifiedDateTime.HasValue ? item.ModifiedDateTime.Value : new Nullable<DateTime>();
            model.UserId = item.UserId;
            return model;
        }
    }
}