// using System.Globalization;
using System.Net;
using System.Net.Sockets;
using Microsoft.AspNetCore.Mvc;
using Nager.PublicSuffix;
using PhishingDetector.API.DTOs;
using PhishingDetector.API.Services;

namespace PhishingDetector.Api.Controllers;

[ApiController]
[Route("api/website")]
public class WebsiteAnalysisController : ControllerBase
{
    private readonly WebsiteAnalysisService _service;
    private readonly DomainParser _domainParser;

    public WebsiteAnalysisController(WebsiteAnalysisService service, DomainParser domainParser)
    {
        _service = service;
        _domainParser = domainParser;
    }

    [HttpPost("domain-age")]
    public async Task<IActionResult> Analyze([FromBody] WebsiteAnalysisRequestDto request)
    {
        var url = request.Url?.Trim();

        if (string.IsNullOrWhiteSpace(url))
        {
            return BadRequest(new { error = "URL is required" });
        }

        // normalization of domain
        if (
            !url.StartsWith("http://", StringComparison.OrdinalIgnoreCase)
            && !url.StartsWith("https://", StringComparison.OrdinalIgnoreCase)
        )
        {
            url = "https://" + url;
        }

        if (!Uri.TryCreate(url, UriKind.Absolute, out var uri))
        {
            return BadRequest(new { error = "Invalid URL" });
        }

        string host = uri.IdnHost.ToLowerInvariant();

        if (host.Length > 253)
        {
            return BadRequest(new { error = "Domain too long" });
        }

        // edge cases for Local Host and ip addresses
        if (host == "localhost")
        {
            return BadRequest(new { error = "Localhost is not a valid public domain" });
        }
        if (IPAddress.TryParse(host, out _))
        {
            return BadRequest(new { error = "IP addresses are not supported" });
        }

        // Extract Registrable Domain
        DomainInfo domainInfo;
        try
        {
            domainInfo = _domainParser.Parse(host);
        }
        catch
        {
            return BadRequest(new { error = "Invalid domain" });
        }
        if (string.IsNullOrWhiteSpace(domainInfo.RegistrableDomain))
        {
            return BadRequest(new { error = "Invalid domain" });
        }
        string domain = domainInfo.RegistrableDomain;
        try
        {
            var addresses = await Dns.GetHostAddressesAsync(domain);

            if (addresses.Length == 0)
            {
                return BadRequest(new { error = "Domain does not exist" });
            }
        }
        catch (SocketException)
        {
            return BadRequest(new { error = "Domain does not exist" });
        }

        var result = await _service.AnalyzeDomainAsync(domain);

        return Ok(result);
    }
}
