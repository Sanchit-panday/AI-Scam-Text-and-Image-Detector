using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Http.Features;
using Nager.PublicSuffix;
using Nager.PublicSuffix.RuleProviders;
using PhishingDetector.API.Services;

var builder = WebApplication.CreateBuilder(args);

var ruleProvider = new SimpleHttpRuleProvider();
await ruleProvider.BuildAsync();
builder.Services.AddSingleton(new DomainParser(ruleProvider));

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 5 * 1024 * 1024; // 5 MB
});

builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 20,
                Window = TimeSpan.FromMinutes(1),
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                QueueLimit = 2,
            }
        )
    );

    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.OnRejected = async (context, token) =>
    {
        context.HttpContext.Response.ContentType = "application/json";

        await context.HttpContext.Response.WriteAsync(
            """
            {
                "error": "Too many requests. Please try again later."
            }
            """,
            token
        );
    };
});

builder.Services.AddControllers();

builder.Services.AddScoped<PythonPredictionService>();
builder.Services.AddScoped<WebsiteAnalysisService>();

// environment requirements
var allowedOrigins =
    Environment
        .GetEnvironmentVariable("ALLOWED_ORIGINS")
        ?.Split(',', StringSplitOptions.RemoveEmptyEntries)
    ?? [];
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
        }
    );
});

if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("PORT")))
{
    var port = Environment.GetEnvironmentVariable("PORT");
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

var app = builder.Build();

app.UseRateLimiter();

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.MapControllers();

// Health endpoint
app.MapGet(
    "/health",
    () =>
        Results.Ok(
            new
            {
                status = "Healthy",
                service = "MildyAPI",
                timestamp = DateTime.UtcNow,
            }
        )
);

app.Run();
