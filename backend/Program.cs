using PhishingDetector.API.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddScoped<PythonPredictionService>();

// environment requirements
var allowedOrigins =
    Environment.GetEnvironmentVariable("ALLOWED_ORIGINS")
    ?.Split(',', StringSplitOptions.RemoveEmptyEntries)
    ?? [];

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins(allowedOrigins)
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("PORT")))
{
    var port = Environment.GetEnvironmentVariable("PORT");
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.MapControllers();

// Health endpoint
app.MapGet("/health", () => Results.Ok(new
{
    status = "Healthy",
    service = "AI Scam Detector API",
    timestamp = DateTime.UtcNow
}));

app.Run();