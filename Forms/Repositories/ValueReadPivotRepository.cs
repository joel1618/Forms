using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Common;
using System.Dynamic;
using System.Linq;
using System.Web;

namespace Forms.Repositories
{
    public class ValueReadPivotRepository
    {
        FormsEntities context;
        public ValueReadPivotRepository()
        {
            this.context = new FormsEntities();
        }
        public List<Dictionary<string, object>> Search(string formId, int page, int pageSize)
        {
            using (var cmd = context.Database.Connection.CreateCommand())
            {
                context.Database.Connection.Open();
                cmd.CommandText = "DECLARE @cols NVARCHAR(MAX), @sql NVARCHAR(MAX)" +

                    "SET @cols = STUFF((SELECT DISTINCT ',' + QUOTENAME(FormDetails.Name)" +
                           "     from Value" +
                   " left join ValueDetails" +
                   " on Value.Id = ValueDetails.ValueId" +
                   " left" +
                    "   join FormDetails" +


                    "  on ValueDetails.FormDetailsId = FormDetails.Id" +
                    " where Value.FormId = '" + formId + "' " +
                    "         ORDER BY 1" +
                    "  FOR XML PATH(''), TYPE" +
                    "   ).value('.', 'NVARCHAR(MAX)'), 1, 1, '')" +

                    " SET @sql = 'SELECT Id, FormName, FormId, ' + @cols + ', CreatedDateTime as ''Created Date''" +
                    "     FROM" +
                    "   (" +
                    " select Value.Id, Form.Name as ''FormName'', Value.FormId, ''Value '' =" +
                        "  case when ValueDetails.ValuePicture is not null then ValueDetails.ValuePicture" +
                        "  else ValueDetails.Value" +
                            " end," +
                            "FormDetails.Name, Value.CreatedDateTime" +
                    "      from Value" +
                    " left join Form"+
                    " on Form.Id = Value.FormId" +
                    "      left join ValueDetails" +
                    "     on Value.Id = ValueDetails.ValueId" +
                    "    left" +
                    "      join FormDetails" +

                    "  on ValueDetails.FormDetailsId = FormDetails.Id" +
                    "  where Value.FormId =     ''" + formId + "'' " +
                    "  ) s" +
                    "   PIVOT" +
                    "(" +
                        "MAX(Value) FOR Name IN(' + @cols + ')" +
                    ") p order by CreatedDateTime desc OFFSET " + page * pageSize + " ROWS FETCH NEXT " + pageSize + " ROWS ONLY;'" +

                   " EXECUTE(@sql)";
                using (var reader = cmd.ExecuteReader())
                {
                    var model = Read(reader).ToList();
                    return model;
                }
            }

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
					    SET @sql = 'SELECT Id, FormId, ' + @cols + ', CreatedDateTime as ''Created Date'' 
                                     FROM
								     (
								      select Value.Id, Value.FormId, ''Value '' =
									  case when ValueDetails.ValuePicture is not null then ValueDetails.ValuePicture 
									  else ValueDetails.Value 
									  end,									  
									  FormDetails.Name, Value.CreatedDateTime
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

        public List<Dictionary<string, object>> Read(DbDataReader reader)
        {
            List<Dictionary<string, object>> expandolist = new List<Dictionary<string, object>>();
            foreach (var item in reader)
            {
                IDictionary<string, object> expando = new ExpandoObject();
                foreach (PropertyDescriptor propertyDescriptor in TypeDescriptor.GetProperties(item))
                {
                    var obj = propertyDescriptor.GetValue(item);
                    expando.Add(propertyDescriptor.Name, obj);
                }
                expandolist.Add(new Dictionary<string, object>(expando));
            }
            return expandolist;
        }
    }
}