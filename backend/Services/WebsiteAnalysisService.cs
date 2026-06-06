using System.Diagnostics;
using System.Text.Json;
using PhishingDetector.API.DTOs;

namespace PhishingDetector.API.Services;

using System.Runtime.InteropServices;

public class WebsiteAnalysisService
{
    public async Task<DnsLookupResponseDto> AnalyzeDomainAsync(string analysisType, string domain)
    {
        var process = new Process();
        string pythonExe = RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
            ? "python"
            : "python3";

        var scriptPath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "Phishing-Model",
            "website-analysis",
            // "domain-age.py"
            "domain_analyzer.py"
        );
        process.StartInfo = new ProcessStartInfo
        {
            FileName = pythonExe,
            Arguments = $"\"{scriptPath}\" \"{analysisType}\" \"{domain}\"",
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
        };

        process.Start();

        var output = await process!.StandardOutput.ReadToEndAsync();

        var error = await process.StandardError.ReadToEndAsync();

        await process.WaitForExitAsync();

        if (process.ExitCode != 0)
        {
            throw new Exception(error);
        }

        return JsonSerializer.Deserialize<DnsLookupResponseDto>(output)!;
    }
}
