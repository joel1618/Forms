using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using ValueDetailEntity = Forms.ValueDetail;

namespace Forms.Repositories
{
    public class ValueDetailsRepository
    {
        FormsEntities context;
        public ValueDetailsRepository()
        {
            this.context = new FormsEntities();
        }
        public IQueryable<ValueDetailEntity> Search()
        {
            return context.ValueDetails;
        }

        public async Task<ValueDetailEntity> Get(Guid id)
        {
            var entity = context.ValueDetails.Find(id);
            return entity;
            
        }

        public async Task<ValueDetailEntity> Create(ValueDetailEntity item)
        {
                if (item.Id == null || item.Id == Guid.Empty)
                {
                    item.Id = Guid.NewGuid();
                }
                else
                {
                    item.Id = new Guid(item.Id.ToString());
                }
                if(item.Value == null)
                {
                    item.Value = "";
                }
                item.CreatedDateTime = DateTime.Now;
                context.ValueDetails.Add(item);
                context.SaveChanges();
                return item;
        }

        public async Task<ValueDetailEntity> Update(Guid id, ValueDetailEntity item)
        {
                var entity = context.ValueDetails.Find(id);
                entity.ModifiedDateTime = DateTime.Now;
                entity.Value = item.Value;
                context.SaveChanges();
                return entity;
         
        }

        public async void Delete(Guid id)
        {
                var entity = context.ValueDetails.Find(id);
                if (entity != null)
                {
                    context.ValueDetails.Remove(entity);
                    context.SaveChanges();
                }
        }
    }
}