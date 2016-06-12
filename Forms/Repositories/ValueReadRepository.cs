using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ValueDetailEntity = Forms.ValueDetail;

namespace Forms.Repositories
{
    public class ValueReadRepository
    {
        FormsEntities context;
        public ValueReadRepository()
        {
            this.context = new FormsEntities();
        }
        public IQueryable<ValueDetailEntity> Search()
        {
            return context.ValueDetails;

            /*
            DECLARE @cols NVARCHAR(MAX), @sql NVARCHAR(MAX)

            SET @cols = STUFF((SELECT DISTINCT ',' + QUOTENAME(FormDetails.Name)
                        from Value
            left join ValueDetails
            on Value.Id = ValueDetails.ValueId
            left join FormDetails
            on ValueDetails.FormDetailsId = FormDetails.Id
                        ORDER BY 1
                        FOR XML PATH(''), TYPE
                        ).value('.', 'NVARCHAR(MAX)'),1,1,'')

            SET @sql = 'SELECT ' + @cols + '
                          FROM
                        (
                          select Value.Id, FormDetails.Name, ValueDetails.Value
				            from Value
				            left join ValueDetails
				            on Value.Id = ValueDetails.ValueId
				            left join FormDetails
				            on ValueDetails.FormDetailsId = FormDetails.Id
                        ) s
                        PIVOT
                        (
                          MAX(Value) FOR Name IN (' + @cols + ')
                        ) p'

            EXECUTE(@sql)
            */
        }
    }
}