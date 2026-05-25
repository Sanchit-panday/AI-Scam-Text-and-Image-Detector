using System.Diagnostics;
using System.Text.Json;
using PhishingDetector.API.Models;
using System.Runtime.InteropServices;

namespace PhishingDetector.API.Services;


public class PythonPredictionService
{
    public async Task<PredictionResponse?> PredictAsync(string message)
    {
        var process = new Process();
        string pythonExe =
            RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
                ? "python"
                : "python3";

        var scriptPath = Path.Combine(
            Directory.GetCurrentDirectory(),
                "Phishing-Model",
                "predict.py"
            );
        process.StartInfo = new ProcessStartInfo
        {
            FileName = pythonExe,
            Arguments = $"\"{scriptPath}\" \"{message}\"",

            RedirectStandardOutput = true,
            RedirectStandardError = true,

            UseShellExecute = false,
            CreateNoWindow = true
        };

        process.Start();

        string output = await process.StandardOutput.ReadToEndAsync();

        string error = await process.StandardError.ReadToEndAsync();

        await process.WaitForExitAsync();

        if (process.ExitCode != 0)
        {
            throw new Exception(
                string.IsNullOrWhiteSpace(error)
                    ? "Python process failed"
                    : error
            );
        }

        return JsonSerializer.Deserialize<PredictionResponse>(output);
    }
    public async Task<ImagePredictionResponse> AnalyzeImageAsync(
    string imagePath)
    {
        var process = new Process();
        string pythonExe =
            RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
                ? "python"
                : "python3";

        var scriptPath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "Phishing-Model",
            "predict-image.py"
        );
        process.StartInfo = new ProcessStartInfo
        {
            FileName = pythonExe,

            Arguments = $"\"{scriptPath}\" \"{imagePath}\"",

            RedirectStandardOutput = true,
            RedirectStandardError = true,

            UseShellExecute = false,
            CreateNoWindow = true
        };

        process.Start();

        string output = await process.StandardOutput.ReadToEndAsync();

        string error = await process.StandardError.ReadToEndAsync();

        await process.WaitForExitAsync();

        if (!string.IsNullOrWhiteSpace(error))
        {
            Console.WriteLine($"Python stderr: {error}");
        }

        if (process.ExitCode != 0)
        {
            throw new Exception(
            string.IsNullOrWhiteSpace(error)
                ? "Python process failed"
                : error
            );
        }

        var result = JsonSerializer.Deserialize<ImagePredictionResponse>(output,
        new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        if (result == null)
        {
            Console.WriteLine($"Python stderr: {error}");
        }

        if (process.ExitCode != 0)
        {
            throw new Exception(
            result == null
                ? "Failed to parse Python response."
                : error
            );
        }

        return result;
    }
}