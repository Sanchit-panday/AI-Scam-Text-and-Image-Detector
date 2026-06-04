using System.Text.Json.Serialization;

namespace PhishingDetector.API.DTOs;

public class DomainAgeResultDto
{
    [JsonPropertyName("domain")]
    public string Domain { get; set; } = string.Empty;

    [JsonPropertyName("created_date")]
    public string? CreatedDate { get; set; } = string.Empty;

    [JsonPropertyName("age_days")]
    public int? AgeDays { get; set; }

    [JsonPropertyName("riskLevel")]
    public string RiskLevel { get; set; } = string.Empty;

    [JsonPropertyName("error")]
    public string? Error { get; set; }
}
