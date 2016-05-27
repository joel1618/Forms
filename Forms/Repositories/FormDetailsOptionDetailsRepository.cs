using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using FormDetailsOptionDetailEntity = Forms.FormDetailsOptionDetail;

namespace Forms.Repositories
{
    public class FormDetailsOptionDetailsRepository
    {
        FormsEntities context;
        public FormDetailsOptionDetailsRepository()
        {
            this.context = new FormsEntities();
        }
        public IQueryable<FormDetailsOptionDetailEntity> Search()
        {
            return context.FormDetailsOptionDetails;
        }

        public async Task<FormDetailsOptionDetailEntity> Get(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormDetailsOptionDetails.Find(id);
                return entity;
            }
        }

        public async Task<FormDetailsOptionDetailEntity> Create(FormDetailsOptionDetailEntity item)
        {
            using (var context = new FormsEntities())
            {
                item.Id = Guid.NewGuid();
                var entity = context.FormDetailsOptionDetails.Add(item);
                context.SaveChanges();
                return entity;
            }
        }

        public async Task<FormDetailsOptionDetailEntity> Update(Guid id, FormDetailsOptionDetailEntity item)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormDetailsOptionDetails.Find(id);
                entity.Name = item.Name;
                context.SaveChanges();
                return entity;
            }
        }

        public async void Delete(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormDetailsOptionDetails.Find(id);
                context.FormDetailsOptionDetails.Remove(entity);
                context.SaveChanges();
            }
        }
    }
}