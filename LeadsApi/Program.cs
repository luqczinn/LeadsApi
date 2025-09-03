using LeadsApi.Data;
using Microsoft.EntityFrameworkCore;
using LeadsApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!context.Leads.Any())
    {
        context.Leads.AddRange(
            new Lead { FirstName = "Lucas", LastName = "Silva", Suburb = "Belo Horizonte", Category = "TI", Description = "Site institucional", Price = 450, Email = "lucas@email.com", PhoneNumber = "31999999999" },
            new Lead { FirstName = "Ana", LastName = "Souza", Suburb = "São Paulo", Category = "Marketing", Description = "Campanha digital", Price = 1200, Email = "ana@email.com", PhoneNumber = "11988888888" },
            new Lead { FirstName = "Carlos", LastName = "Oliveira", Suburb = "Rio de Janeiro", Category = "Consultoria", Description = "Treinamento corporativo", Price = 600, Email = "carlos@email.com", PhoneNumber = "21977777777" }
        );

        context.SaveChanges();
    }
}

app.Run();
