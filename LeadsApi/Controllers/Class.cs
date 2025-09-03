using LeadsApi.Data;
using LeadsApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LeadsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeadsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeadsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("invited")]
        public async Task<ActionResult<IEnumerable<Lead>>> GetInvitedLeads()
        {
            return await _context.Leads
                .Where(l => l.Status == "Invited")
                .ToListAsync();
        }

        [HttpGet("accepted")]
        public async Task<ActionResult<IEnumerable<Lead>>> GetAcceptedLeads()
        {
            return await _context.Leads
                .Where(l => l.Status == "Accepted")
                .ToListAsync();
        }

        [HttpPost("{id}/accept")]
        public async Task<IActionResult> AcceptLead(int id)
        {
            var lead = await _context.Leads.FindAsync(id);
            if (lead == null) return NotFound();

            if (lead.Price > 500)
            {
                lead.Price = lead.Price * 0.9m;
            }

            lead.Status = "Accepted";

            System.IO.File.AppendAllText("emails.txt",
                $"Lead {lead.Id} aceito - Email enviado para vendas@test.com{Environment.NewLine}");

            await _context.SaveChangesAsync();
            return Ok(lead);
        }

        [HttpPost("{id}/decline")]
        public async Task<IActionResult> DeclineLead(int id)
        {
            var lead = await _context.Leads.FindAsync(id);
            if (lead == null) return NotFound();

            lead.Status = "Declined";
            await _context.SaveChangesAsync();
            return Ok(lead);
        }
    }
}
