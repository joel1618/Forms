using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forms.Models
{
    public class ValueViewModel
    {
        public System.Guid Id { get; set; }
        public System.Guid FormId { get; set; }
        public string UserId { get; set; }
        public System.DateTime CreatedDateTime { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public Nullable<decimal> Latitude { get; set; }
        public Nullable<decimal> Longitude { get; set; }
        public bool IsSent { get; set; }
        public Nullable<System.DateTime> SyncDateTime { get; set; }
        public IEnumerable<ValueDetailViewModel> ValueDetails { get; set; }
        public FormViewModel Form { get; set; }
    }
}