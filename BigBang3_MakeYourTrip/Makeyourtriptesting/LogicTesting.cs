using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Makeyourtriptesting
{
    [TestClass]
    internal class LogicTesting
    {
        
            private Mock<Ilogics> mockLogicRepository;
            private LogicController controller;

            [TestInitialize]
            public void Initialize()
            {
                mockLogicRepository = new Mock<Ilogics>();
                controller = new LogicController(mockLogicRepository.Object);
            }

            [TestMethod]
            public async Task GetHotels_ReturnsOkResult()
            {
                // Arrange
                mockLogicRepository.Setup(repo => repo.GetHotels(It.IsAny<int>()))
                    .ReturnsAsync(new List<Repository.Buffer.PackageHotelBuffer>());

                // Act
                var result = await controller.GetHotels(123); // Provide a sample packid

                // Assert
                Assert.IsInstanceOfType(result, typeof(OkObjectResult));
            }

            [TestMethod]
            public async Task GetHotels_ReturnsNotFoundResult()
            {
                // Arrange
                mockLogicRepository.Setup(repo => repo.GetHotels(It.IsAny<int>()))
                    .ThrowsAsync(new ArithmeticException("Some exception message"));

                // Act
                var result = await controller.GetHotels(123); // Provide a sample packid

                // Assert
                var notFoundResult = Assert.IsInstanceOfType(result, typeof(NotFoundObjectResult));
                Assert.AreEqual("Some exception message", notFoundResult.Value);
            }
        

    }
}
