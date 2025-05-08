using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using server;
using server.Infrastructure;
using server.Services;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("PostgresConnection");

builder.Services.AddDbContext<CRMDbContext>(options =>
{
    options.UseNpgsql(connectionString);
});
var reddisConfig = builder.Configuration.GetSection("Reddis").Get<ReddisConfig>(); //���������� ������ �� appsettings.json

var muxer = ConnectionMultiplexer.Connect(new ConfigurationOptions
{
    EndPoints = {{ reddisConfig.EndPoint, reddisConfig.Port }},
    User = reddisConfig.User,
    Password = reddisConfig.Password
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowUmiDevServer",
        policy => policy
            .WithOrigins("http://localhost:8000") // ��������� UmiJS-������
            .AllowAnyMethod()                     // ��������� GET, POST � �.�.
            .AllowAnyHeader()                     // ��������� ����� ���������
            .AllowCredentials());                 // ��������� ����/�����������
});
builder.Services.AddSingleton<IConnectionMultiplexer>(muxer);
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<ClientService>();
builder.Services.AddTransient<DealService>();
builder.Services.AddTransient<NoteService>();
builder.Services.AddTransient<CacheService>();

var app = builder.Build();

app.UseCors("AllowUmiDevServer");// �������� CORS-��������

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
