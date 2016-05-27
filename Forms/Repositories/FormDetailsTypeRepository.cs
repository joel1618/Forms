using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using FormDetailsTypeEntity = Forms.FormDetailsType;

namespace Forms.Repositories
{
    public class FormDetailsTypeRepository
    {
        FormsEntities context;
        public FormDetailsTypeRepository()
        {
            this.context = new FormsEntities();
        }
        public IQueryable<FormDetailsTypeEntity> Search()
        {
            return context.FormDetailsTypes;
        }

        public async Task<FormDetailsTypeEntity> Get(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormDetailsTypes.Find(id);
                return entity;
            }
        }

        public async Task<FormDetailsTypeEntity> Create(FormDetailsTypeEntity item)
        {
            using (var context = new FormsEntities())
            {
                item.Id = Guid.NewGuid();
                var entity = context.FormDetailsTypes.Add(item);
                context.SaveChanges();
                return entity;
            }
        }

        public async Task<FormDetailsTypeEntity> Update(Guid id, FormDetailsTypeEntity item)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormDetailsTypes.Find(id);
                entity.Name = item.Name;
                context.SaveChanges();
                return entity;
            }
        }

        public async void Delete(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormDetailsTypes.Find(id);
                context.FormDetailsTypes.Remove(entity);
                context.SaveChanges();
            }
        }
    }
}