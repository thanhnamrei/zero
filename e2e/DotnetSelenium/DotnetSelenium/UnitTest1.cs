using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace DotnetSelenium
{
	public class Tests
	{
		[SetUp]
		public void Setup()
		{
		}

		[Test]
		public void Test1()
		{
			IWebDriver driver = new ChromeDriver();

			driver.Navigate().GoToUrl("http://localhost:4200/create-product");

			var element = driver.FindElement(By.Id("name"));

			var value = element.GetAttribute("value");

			Assert.IsNotNull(value);

		}
	}
}