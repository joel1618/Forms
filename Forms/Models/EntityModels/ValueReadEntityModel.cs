using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forms.Models.EntityModels
{
    public class ValueReadEntityModel
    {
        public Guid Id { get; set; }
        public Guid FormId { get; set; }
        public DateTime ValueCreatedDateTime { get; set; }
        public Guid ValueDetailsId { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public DateTime ValueDetailsCreatedDateTime { get; set; }
    }
}