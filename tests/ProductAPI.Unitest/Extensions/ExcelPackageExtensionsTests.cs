using OfficeOpenXml;
using ProductAPI.Extensions;

namespace ProductAPI.UnitTests.Extensions;

public class ExcelPackageExtensionsTests
{
    [Fact]
    public void ToList_ShouldConvertExcelWorksheetToListOfObjects()
    {
        // Arrange
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

        using ExcelPackage excelPackage = new ExcelPackage();
        ExcelWorksheet excelWorksheet = excelPackage.Workbook.Worksheets.Add("Sheet1");

        // Act
        List<TestClass> result = excelWorksheet.ToList<TestClass>();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count);
        // Add more assertions as needed
    }

    public class TestClass
    {
        public string Name { get; set; }
        public int Age { get; set; }
    }
}