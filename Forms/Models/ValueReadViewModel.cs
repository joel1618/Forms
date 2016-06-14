using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forms.Models
{
    public class ValueReadViewModel
    {
        public Guid Id { get; set; }
        public Guid FormId { get; set; }
        public DateTime CreatedDateTime { get; set; }
    }
}