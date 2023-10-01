using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Projects.Models;
using System.Text;
using WebApplication1.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//add cors 
builder.Services.AddCors();
//add authentication service

//declare connection string 
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//add dbcontext 
builder.Services.AddDbContext<ProjectContext>(
    options => options.UseSqlServer(connectionString)

    );

#region  Identity
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireDigit= false;
 
    options.User.RequireUniqueEmail = true;
}

)
    .AddEntityFrameworkStores<ProjectContext>();
#endregion

#region Authentication 
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "scheme";
    options.DefaultChallengeScheme = "scheme";
})
    .AddJwtBearer("scheme", options =>
    {
        string secretKeyString = builder.Configuration.GetValue<string>("secret_key")!;
        byte[] keyInBytes = Encoding.ASCII.GetBytes(secretKeyString);
        var key = new SymmetricSecurityKey(keyInBytes);

        options.TokenValidationParameters = new TokenValidationParameters
        {
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });

#endregion
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(c => c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();