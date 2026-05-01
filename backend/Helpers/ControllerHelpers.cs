namespace backend.Helpers
{
    public static class ControllerHelpers
    {
        public static int? ResolveUserId(HttpRequest request, int? fallback = null)
        {
            if (request.Headers.TryGetValue("X-User-Id", out var headerValue)
                && int.TryParse(headerValue.FirstOrDefault(), out var idFromHeader)
                && idFromHeader > 0)
            {
                return idFromHeader;
            }

            if (request.Query.TryGetValue("userId", out var queryValue)
                && int.TryParse(queryValue.FirstOrDefault(), out var idFromQuery)
                && idFromQuery > 0)
            {
                return idFromQuery;
            }

            return fallback.HasValue && fallback.Value > 0 ? fallback : null;
        }
    }
}
