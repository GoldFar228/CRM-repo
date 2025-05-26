using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using server;
using server.Infrastructure;
using server.Services;
using StackExchange.Redis;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("PostgresConnection");

builder.Services.AddDbContext<CRMDbContext>(options =>
{
    options.UseNpgsql(connectionString);
});
var reddisConfig = builder.Configuration.GetSection("Reddis").Get<ReddisConfig>(); //вытягиваем конфиг из appsettings.json

var muxer = ConnectionMultiplexer.Connect(new ConfigurationOptions
{
    EndPoints = {{ reddisConfig.EndPoint, reddisConfig.Port }},
    User = reddisConfig.User,
    Password = reddisConfig.Password
});
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<TokenService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
            ValidateLifetime = true
        };
    });
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowUmiDevServer",
        policy => policy
            .WithOrigins("http://localhost:8000") // Разрешить UmiJS-сервер
            .AllowAnyMethod()                     // Разрешить GET, POST и т.д.
            .AllowAnyHeader()                     // Разрешить любые заголовки
            .AllowCredentials());
});
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    // Добавление схемы безопасности
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Введите токен JWT в формате: Bearer {your token}"
    });

    // Требование безопасности для всех эндпоинтов (или можно настроить выборочно)
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});
builder.Services.AddSingleton<IConnectionMultiplexer>(muxer);
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();

builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<ClientService>();
builder.Services.AddTransient<DealService>();
builder.Services.AddTransient<NoteService>();
builder.Services.AddTransient<CacheService>();

var app = builder.Build();

app.UseCors("AllowUmiDevServer");// Включить CORS-политику

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
