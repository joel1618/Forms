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
        public IEnumerable<dynamic> Search(int page, int pageSize)
        {
            var items = context.Database.SqlQuery<dynamic>(
                       "DECLARE @cols NVARCHAR(MAX), @sql NVARCHAR(MAX)" +

            "SET @cols = STUFF((SELECT DISTINCT ',' + QUOTENAME(FormDetails.Name)" +
                   "     from Value" +
           " left join ValueDetails" +
           " on Value.Id = ValueDetails.ValueId" +
           " left" +
                     "   join FormDetails" +


                     "  on ValueDetails.FormDetailsId = FormDetails.Id" +
                     "         ORDER BY 1" +
                     "  FOR XML PATH(''), TYPE" +
                     "   ).value('.', 'NVARCHAR(MAX)'), 1, 1, '')" +

                     " SET @sql = 'SELECT Id, FormId, CreatedDateTime, ' + @cols + '" +
                     "     FROM" +
                     "   (" +
                      "    select Value.Id, Value.FormId, FormDetails.Name, ValueDetails.Value, Value.CreatedDateTime" +

                      "      from Value" +
                      "      left join ValueDetails" +

                       "     on Value.Id = ValueDetails.ValueId" +

                        "    left" +
                      "      join FormDetails" +

                     "  on ValueDetails.FormDetailsId = FormDetails.Id" +
                      "  ) s" +
                     "   PIVOT" +
                        "(" +
                          "MAX(Value) FOR Name IN(' + @cols + ')" +
                        ") p order by CreatedDateTime desc OFFSET "+ page * pageSize + " ROWS FETCH NEXT " + pageSize + " ROWS ONLY;'" +

           " EXECUTE(@sql)").ToList();
            return items;

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

					SET @sql = 'SELECT Id, ForId, CreatedDateTime, ' + @cols + '
								  FROM
								(
								  select Value.Id, Value.FormId, FormDetails.Name, ValueDetails.Value, Value.CreatedDateTime
									from Value
									left join ValueDetails
									on Value.Id = ValueDetails.ValueId
									left join FormDetails
									on ValueDetails.FormDetailsId = FormDetails.Id
								) s
								PIVOT
								(							
								  MAX(Value) FOR Name IN (' + @cols + ')
								) p order by CreatedDateTime desc OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;'

					EXECUTE(@sql)
            */
        }
    }
}