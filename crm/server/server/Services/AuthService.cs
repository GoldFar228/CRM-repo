using Microsoft.IdentityModel.Tokens;
using server.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using server.Models.Enums;
using Microsoft.AspNetCore.Mvc;

namespace server.Services
{
    public class AuthService
    {
        private readonly CRMDbContext _context;
        private readonly TokenService _tokenService;

        public AuthService(CRMDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return new AuthResponse(null, "Неверная почта или пароль");
            }

            return new AuthResponse(_tokenService.GenerateToken(user));
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            var exists = await _context.Users
                .AnyAsync(u => u.Email == request.Email);

            if (exists) return new AuthResponse(null, "User exists");

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Phone = request.Phone,
                Role = UserRoleEnum.User
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return new AuthResponse(_tokenService.GenerateToken(user)); 
        }
    }
    public record class AuthResponse(string? Token, string? ErrorMessage = null);
}
