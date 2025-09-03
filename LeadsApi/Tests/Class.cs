using LeadsApi.Controllers;
using LeadsApi.Data;
using LeadsApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using System.Linq;

namespace LeadsApi.Tests
{
    public class LeadsControllerTests
    {
        private AppDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "LeadsTestDb")
                .Options;

            var context = new AppDbContext(options);

            // Seed inicial
            context.Leads.AddRange(
                new Lead { Id = 1, Status = "Invited", Price = 600 },
                new Lead { Id = 2, Status = "Invited", Price = 400 },
                new Lead { Id = 3, Status = "Accepted", Price = 500 }
            );
            context.SaveChanges();

            return context;
        }

        [Fact]
        public async Task GetInvitedLeads_ReturnsOnlyInvited()
        {
            var context = GetDbContext();
            var controller = new LeadsController(context);

            var result = await controller.GetInvitedLeads();
            var leads = result.Value;

            Assert.All(leads, l => Assert.Equal("Invited", l.Status));
            Assert.Equal(2, leads.Count());
        }

        [Fact]
        public async Task GetAcceptedLeads_ReturnsOnlyAccepted()
        {
            var context = GetDbContext();
            var controller = new LeadsController(context);

            var result = await controller.GetAcceptedLeads();
            var leads = result.Value;

            Assert.All(leads, l => Assert.Equal("Accepted", l.Status));
            Assert.Single(leads);
        }

        [Fact]
        public async Task AcceptLead_LeadExists_UpdatesStatusAndPrice()
        {
            var context = GetDbContext();
            var controller = new LeadsController(context);

            var result = await controller.AcceptLead(2);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var lead = Assert.IsType<Lead>(okResult.Value);

            Assert.Equal("Accepted", lead.Status);
            Assert.Equal(400, lead.Price);

            result = await controller.AcceptLead(1);
            okResult = Assert.IsType<OkObjectResult>(result);
            lead = Assert.IsType<Lead>(okResult.Value);

            Assert.Equal("Accepted", lead.Status);
            Assert.Equal(540, lead.Price); 
        }

        [Fact]
        public async Task AcceptLead_LeadNotFound_ReturnsNotFound()
        {
            var context = GetDbContext();
            var controller = new LeadsController(context);

            var result = await controller.AcceptLead(999);
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeclineLead_LeadExists_UpdatesStatus()
        {
            var context = GetDbContext();
            var controller = new LeadsController(context);

            var result = await controller.DeclineLead(2);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var lead = Assert.IsType<Lead>(okResult.Value);

            Assert.Equal("Declined", lead.Status);
        }

        [Fact]
        public async Task DeclineLead_LeadNotFound_ReturnsNotFound()
        {
            var context = GetDbContext();
            var controller = new LeadsController(context);

            var result = await controller.DeclineLead(999);
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
