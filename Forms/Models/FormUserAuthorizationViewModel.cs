using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forms.Models
{
    public class FormUserAuthorizationViewModel
    {
        public System.Guid Id { get; set; }
        public System.Guid FormId { get; set; }
        public string UserId { get; set; }
        public bool IsCreate { get; set; }
        public bool IsRead { get; set; }
        public bool IsUpdate { get; set; }
        public bool IsDelete { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public System.DateTime CreatedDateTime { get; set; }
    }
}