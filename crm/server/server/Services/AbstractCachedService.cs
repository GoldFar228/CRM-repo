using Newtonsoft.Json;
using StackExchange.Redis;

namespace server.Services
{
    public abstract class AbstractCachedService
    {
        private readonly IDatabase _db;
        protected record class ReddisKey(int Id, string Table);

        public AbstractCachedService(IConnectionMultiplexer muxer)
        {
             _db = muxer.GetDatabase();
        }

        protected async Task<TValue> GetCachedAsync<TKey, TValue>(TKey key, Func<TKey, Task<TValue>> extractor) where TValue : class
        {
            var jsonKey = JsonConvert.SerializeObject(key);
            var cacheResult = await _db.StringGetAsync(jsonKey);
            if (cacheResult.HasValue)
            {
                var json = cacheResult.ToString();
                return JsonConvert.DeserializeObject<TValue>(json);
            }
            var value = await extractor(key);
            if (value == null)
                return null;

            var cache = JsonConvert.SerializeObject(value);
            await _db.StringSetAsync(jsonKey, cache, expiry: TimeSpan.FromMinutes(5));

            return value;
        }
    }
}
