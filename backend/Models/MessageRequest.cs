namespace PhishingDetector.API.Models;
using System.ComponentModel.DataAnnotations;

public class MessageRequest
{
    [Required]
    [MaxLength(5000)]
    public string Message { get; set; } = string.Empty;
}