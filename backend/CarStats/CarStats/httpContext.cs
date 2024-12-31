using System.Net.NetworkInformation;

namespace CarStats
{
    public static class httpContextHelper
    {
        private static IHttpContextAccessor _httpContextAccesor;

        public static void Configure(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccesor = httpContextAccessor;
        }
 

        public static HttpContext Current => _httpContextAccesor?.HttpContext;
    }
}
