using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using PhishingDetector.API.Models;
using PhishingDetector.API.Services;

namespace PhishingDetector.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PhishingController : ControllerBase
{
    private readonly PythonPredictionService _pythonService;

    public PhishingController(PythonPredictionService pythonService)
    {
        _pythonService = pythonService;
    }

    [HttpPost("check")]
    public async Task<IActionResult> Check([FromBody] MessageRequest request)
    {
        if (request.Message.Length > 5000)
        {
            return BadRequest(new { error = "Message exceeds 5000 characters." });
        }
        try
        {
            var result = await _pythonService.PredictAsync(request.Message);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("analyze-image")]
    public async Task<IActionResult> AnalyzeImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { error = "No file uploaded." });
        }

        var allowedTypes = new[] { "image/png", "image/jpeg", "image/jpg", "image/webp" };

        if (!allowedTypes.Contains(file.ContentType))
        {
            return BadRequest(new { error = "Only image files are allowed." });
        }

        const long MaxFileSize = 5 * 1024 * 1024; // 5 MB
        if (file.Length > MaxFileSize)
        {
            return BadRequest(new { error = "Image size cannot exceed 5 MB." });
        }

        string tempPath = "";
        try
        {
            var tempFileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

            tempPath = Path.Combine(Path.GetTempPath(), tempFileName);

            using (var stream = new FileStream(tempPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var result = await _pythonService.AnalyzeImageAsync(tempPath);

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
        finally
        {
            if (!string.IsNullOrEmpty(tempPath) && System.IO.File.Exists(tempPath))
            {
                System.IO.File.Delete(tempPath);
            }
        }
    }
}
