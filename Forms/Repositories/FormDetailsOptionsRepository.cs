using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using FormDetailsOptionEntity = Forms.FormDetailsOption;

namespace Forms.Repositories
{
    public class FormDetailsOptionsRepository
    {
        FormsEntities context;
        public FormDetailsOptionsRepository()
        {
            this.context = new FormsEntities();
        }
        public IQueryable<FormDetailsOptionEntity> Search()
        {
            return context.FormDetailsOptions;
        }

        public async Task<FormDetailsOptionEntity> Get(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormDetailsOptions.Find(id);
                return entity;
            }
        }

        public async Task<FormDetailsOptionEntity> Create(FormDetailsOptionEntity item)
        {
            using (var context = new FormsEntities())
            {
                item.Id = Guid.NewGuid();
                var entity = context.FormDetailsOptions.Add(item);
                context.SaveChanges();
                return entity;
            }
        }

        public async Task<FormDetailsOptionEntity> Update(Guid id, FormDetailsOptionEntity item)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormDetailsOptions.Find(id);
                entity.Name = item.Name;
                context.SaveChanges();
                return entity;
            }
        }

        public async void Delete(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormDetailsOptions.Find(id);
                context.FormDetailsOptions.Remove(entity);
                context.SaveChanges();
            }
        }
    }
}