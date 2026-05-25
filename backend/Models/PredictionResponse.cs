namespace PhishingDetector.API.Models;
using System.Text.Json.Serialization;

public class PredictionResponse
{
    [JsonPropertyName("prediction")]
    public string Prediction { get; set; } = string.Empty;

    [JsonPropertyName("confidence")]
    public double Confidence { get; set; }

    [JsonPropertyName("riskLevel")]
    public string Risk { get; set; } = string.Empty;

    [JsonPropertyName("indicators")]
    public List<string> Indicators { get; set; } = [];

    [JsonPropertyName("urls")]
    public List<string> URLs { get; set; } = [];
    
}