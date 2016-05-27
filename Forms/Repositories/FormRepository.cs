using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using FormEntity = Forms.Form;

namespace Forms.Repositories
{
    public class FormRepository
    {
        FormsEntities context;
        public FormRepository()
        {
            this.context = new FormsEntities();
        }
        public IQueryable<FormEntity> Search()
        {
            return context.Forms;
        }

        public async Task<FormEntity> Get(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.Forms.Find(id);
                return entity;
            }
        }

        public async Task<FormEntity> Create(FormEntity item)
        {
            item.Id = Guid.NewGuid();
            item.CreatedDateTime = DateTime.Now;
            var entity = context.Forms.Add(item);
            context.SaveChanges();
            return entity;
        }

        public async Task<FormEntity> Update(Guid id, FormEntity item)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.Forms.Find(id);
                entity.Name = item.Name;
                entity.Description = item.Description;
                entity.PublishUrl = item.PublishUrl;
                entity.ModifiedDateTime = DateTime.Now;
                context.SaveChanges();
                return entity;
            }
        }

        public async void Delete(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.Forms.Find(id);
                context.Forms.Remove(entity);
                context.SaveChanges();
            }
        }
    }
}