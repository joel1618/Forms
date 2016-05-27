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
            using (var context = new FormsEntities())
            {
                var entity = context.ValueDetails.Find(id);
                return entity;
            }
        }

        public async Task<ValueDetailEntity> Create(ValueDetailEntity item)
        {
            using (var context = new FormsEntities())
            {
                item.Id = Guid.NewGuid();
                item.CreatedDateTime = DateTime.Now;
                var entity = context.ValueDetails.Add(item);
                context.SaveChanges();
                return entity;
            }
        }

        public async Task<ValueDetailEntity> Update(Guid id, ValueDetailEntity item)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.ValueDetails.Find(id);
                entity.ModifiedDateTime = DateTime.Now;
                entity.Value = item.Value;
                context.SaveChanges();
                return entity;
            }
        }

        public async void Delete(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.ValueDetails.Find(id);
                context.ValueDetails.Remove(entity);
                context.SaveChanges();
            }
        }
    }
}