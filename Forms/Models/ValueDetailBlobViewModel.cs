using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forms.Models
{
    public class ValueDetailBlobViewModel
    {
        public System.Guid Id { get; set; }
        public System.Guid ValueDetailsId { get; set; }
        public byte[] Blob { get; set; }
        public string UserId { get; set; }
        public bool IsSent { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public System.DateTime CreatedDateTime { get; set; }
        public Nullable<System.DateTime> SyncDateTime { get; set; }
    }
}