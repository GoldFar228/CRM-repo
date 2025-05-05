using DotNetOpenAuth.OpenId.Extensions.UI;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using server.Models;
using StackExchange.Redis;

namespace server.Services
{
    public class CacheService
    {
        private readonly IDatabase _db;
        private readonly DealService _dealService;

        public CacheService(IConnectionMultiplexer muxer, DealService dealService)
        {
            _db = muxer.GetDatabase();
            _dealService = dealService;
        }

        
    }
}
