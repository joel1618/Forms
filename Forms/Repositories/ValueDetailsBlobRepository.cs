using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using ValueDetailsBlobEntity = Forms.ValueDetailsBlob;

namespace Forms.Repositories
{
    public class ValueDetailsBlobRepository
    {
        FormsEntities context;
        public ValueDetailsBlobRepository()
        {
            this.context = new FormsEntities();
        }
        public IQueryable<ValueDetailsBlobEntity> Search()
        {
            return context.ValueDetailsBlobs;
        }

        public async Task<ValueDetailsBlobEntity> Get(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.ValueDetailsBlobs.Find(id);
                return entity;
            }
        }

        public async Task<ValueDetailsBlobEntity> Create(ValueDetailsBlobEntity item)
        {
            using (var context = new FormsEntities())
            {
                if (item.Id == null || item.Id == Guid.Empty)
                {
                    item.Id = Guid.NewGuid();
                }
                else
                {
                    item.Id = new Guid(item.Id.ToString());
                }
                item.CreatedDateTime = DateTime.Now;
                context.ValueDetailsBlobs.Add(item);
                context.SaveChanges();
                return item;
            }
        }

        public async Task<ValueDetailsBlobEntity> Update(Guid id, ValueDetailsBlobEntity item)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.ValueDetailsBlobs.Find(id);
                entity.ModifiedDateTime = DateTime.Now;
                entity.Blob = item.Blob;
                context.SaveChanges();
                return entity;
            }
        }

        public async void Delete(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.ValueDetailsBlobs.Find(id);
                context.ValueDetailsBlobs.Remove(entity);
                context.SaveChanges();
            }
        }
    }
}