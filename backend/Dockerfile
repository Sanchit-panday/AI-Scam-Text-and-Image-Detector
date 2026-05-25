FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

COPY . .

RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0

RUN apt-get update && \
    apt-get install -y python3 python3-pip \ 
    tesseract-ocr

WORKDIR /app

COPY --from=build /app/publish .

COPY ./Phishing-Model ./Phishing-Model

RUN pip3 install --break-system-packages \
    -r ./Phishing-Model/requirements.txt

ENTRYPOINT ["dotnet", "PhishingDetector.API.dll"]