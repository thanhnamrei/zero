using OfficeOpenXml;
using System.Reflection;

namespace ProductAPI.Extensions
{
	public static class ExcelPackageExtensions
	{
		public static List<T> ToList<T>(this ExcelWorksheet excelWorksheet) where T : new()
		{
			var list = new List<T>();

			var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

			var rowCount = excelWorksheet.Dimension.End.Row;
			var columnCount = excelWorksheet.Dimension.End.Column;

			for (var row = 2; row <= rowCount; row++)
			{
				var obj = new T();
				for (int column = 1; column <= columnCount; column++)
				{
					var property = properties.FirstOrDefault(p => p.Name.Equals(excelWorksheet.Cells[1, column].Text, StringComparison.OrdinalIgnoreCase));

					if (property != null)
					{
						var cellValue = excelWorksheet.Cells[row, column].Value;
						if (cellValue != null)
						{
							var propertyType = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
							var safeValue = (cellValue == null) ? null : Convert.ChangeType(cellValue, propertyType);
							property.SetValue(obj, safeValue);
						}
						
					}
				}
				list.Add(obj);
			}
			return list;
		}
	}
}
