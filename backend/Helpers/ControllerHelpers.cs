using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace backend.Helpers
{
    public static class ControllerHelpers
    {
        public static int? ResolveUserId(HttpRequest request)
        {
            // 1. Nouvelle méthode avec JWT
            var userIdClaim =
                request.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? request.HttpContext.User.FindFirst("sub")?.Value
                ?? request.HttpContext.User.FindFirst("userId")?.Value;

            if (!string.IsNullOrWhiteSpace(userIdClaim) &&
                int.TryParse(userIdClaim, out int jwtUserId))
            {
                return jwtUserId;
            }

            // 2. Ancienne méthode temporaire avec X-User-Id
            if (request.Headers.TryGetValue("X-User-Id", out var headerUserId) &&
                int.TryParse(headerUserId.ToString(), out int oldUserId))
            {
                return oldUserId;
            }

            return null;
        }
    }
}