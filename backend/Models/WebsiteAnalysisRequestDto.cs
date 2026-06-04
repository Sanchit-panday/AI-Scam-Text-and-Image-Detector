using System.ComponentModel.DataAnnotations;

namespace PhishingDetector.API.DTOs;

public class WebsiteAnalysisRequestDto
{
    [Required]
    public string Url { get; set; } = string.Empty;
}
