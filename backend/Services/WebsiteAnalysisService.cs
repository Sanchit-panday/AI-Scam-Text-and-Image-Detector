using System.Diagnostics;
using System.Text.Json;
using PhishingDetector.API.DTOs;

namespace PhishingDetector.API.Services;

using System.Runtime.InteropServices;

public class WebsiteAnalysisService
{
    public async Task<DomainAgeResultDto> AnalyzeDomainAsync(string url)
    {
        var process = new Process();
        string pythonExe = RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
            ? "python"
            : "python3";

        var scriptPath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "Phishing-Model",
            "website-analysis",
            "domain-age.py"
        );
        process.StartInfo = new ProcessStartInfo
        {
            FileName = pythonExe,
            Arguments = $"\"{scriptPath}\" \"{url}\"",
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
        };

        // using var process =
        //     Process.Start(startInfo);

        process.Start();

        var output = await process!.StandardOutput.ReadToEndAsync();

        var error = await process.StandardError.ReadToEndAsync();

        await process.WaitForExitAsync();

        if (process.ExitCode != 0)
        {
            throw new Exception(error);
        }

        return JsonSerializer.Deserialize<DomainAgeResultDto>(output)!;
    }
}
