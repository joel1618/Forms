using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using ValueEntity = Forms.Value;

namespace Forms.Repositories
{
    public class ValueRepository
    {
        FormsEntities context;
        public ValueRepository()
        {
            this.context = new FormsEntities();
        }
        public IQueryable<ValueEntity> Search()
        {
            return context.Values;
        }

        public async Task<ValueEntity> Get(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.Values.Find(id);
                return entity;
            }
        }

        public async Task<ValueEntity> Create(ValueEntity item)
        {
            using (var context = new FormsEntities())
            {
                item.Id = Guid.NewGuid();
                item.CreatedDateTime = DateTime.Now;
                context.Values.Add(item);
                context.SaveChanges();
                return item;
            }
        }

        public async Task<ValueEntity> Update(Guid id, ValueEntity item)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.Values.Find(id);
                entity.ModifiedDateTime = DateTime.Now;
                context.SaveChanges();
                return entity;
            }
        }

        public async void Delete(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.Values.Find(id);
                context.Values.Remove(entity);
                context.SaveChanges();
            }
        }
    }
}