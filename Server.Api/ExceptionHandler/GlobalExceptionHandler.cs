using System;
using Microsoft.AspNetCore.Diagnostics;

namespace Server.Api.ExceptionHandler;

public class GlobalExceptionHandler : IExceptionHandler
{
      public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        httpContext.Response.StatusCode = exception switch
            {
                KeyNotFoundException => StatusCodes.Status404NotFound,
                UnauthorizedAccessException => StatusCodes.Status401Unauthorized,
                _ => StatusCodes.Status500InternalServerError
            };
            httpContext.Response.ContentType = "application/json";

            await httpContext.Response.WriteAsJsonAsync(
                new
                {
                    status = httpContext.Response.StatusCode,
                    message = exception.Message
                }, cancellationToken
            );
            return true;
            }
}
