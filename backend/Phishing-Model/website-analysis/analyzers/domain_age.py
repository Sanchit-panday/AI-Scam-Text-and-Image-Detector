import json
import sys
from datetime import datetime, timezone

import requests
from datetime import datetime, timezone

def get_domain_age(domain):
    try:
        rdap_url = f"https://rdap.org/domain/{domain}"

        response = requests.get(
            rdap_url,
            timeout=10
        )

        # Domain doesn't exist
        if response.status_code == 404:
            return {
                "domain": domain,
                "created_date": None,
                "age_days": None,
                "riskLevel": "Unavailable",
                "error": "RDAP record unavailable",
            }
        
        response.raise_for_status()

        data = response.json()

        creation_date = None

        # Search RDAP events
        registration_events = {
            "registration",
            "registered"
        }
        
        for event in data.get("events", []):
            if event.get("eventAction", "").lower() in registration_events:
                creation_date = event.get("eventDate")
                break

        # Registration date missing
        if not creation_date:
            return {
                "domain": domain,
                "error": "Domain registration date unavailable",
                "riskLevel": "Unavailable"
            }

        try:
            creation_date = datetime.fromisoformat(
                creation_date.replace("Z", "+00:00")
            )
        except ValueError:
            return {
                "domain": domain,
                "error": "Invalid registration date format",
                "riskLevel": "Unavailable"
            }

        if creation_date.tzinfo is None:
            creation_date = creation_date.replace(
                tzinfo=timezone.utc
            )

        age_days = (
            datetime.now(timezone.utc)
            - creation_date
        ).days

        return {
            "domain": domain,
            "created_date": str(creation_date.date()),
            "age_days": age_days,
            "riskLevel": calculate_domain_risk(age_days)
        }

    except requests.exceptions.Timeout:
        return {
            "domain": domain,
            "error": "RDAP request timed out",
            "riskLevel": "Unavailable"
        }

    except requests.exceptions.ConnectionError:
        return {
            "domain": domain,
            "error": "Unable to connect to RDAP service",
            "riskLevel": "Unavailable"
        }

    except requests.exceptions.HTTPError as e:
        return {
            "domain": domain,
            "error": f"RDAP HTTP error: {e.response.status_code}",
            "riskLevel": "Unavailable"
        }

    except requests.exceptions.RequestException as e:
        return {
            "domain": domain,
            "error": f"RDAP request failed: {str(e)}",
            "riskLevel": "Unavailable"
        }

    except Exception as e:
        return {
            "domain": domain,
            "error": f"Unexpected error: {str(e)}",
            "riskLevel": "Unavailable"
        }
# Domain Risk
def calculate_domain_risk(age_days):

    if age_days < 14:
        return "Critical Risk"

    if age_days < 90:
        return "Very High Risk"

    if age_days < 180:
        return "High Risk"

    if age_days < 365:
        return "Medium Risk"

    if age_days < 1095:  # 3 years
        return "Low Risk"

    return "Very Low Risk"

if __name__ == "__main__":
    url = sys.argv[1]
    result = get_domain_age(url)
    print(json.dumps(result))