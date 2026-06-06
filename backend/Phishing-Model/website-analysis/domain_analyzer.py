import sys
import json

from analyzers.domain_age import get_domain_age
from analyzers.dns_lookup import dns_lookup

analysis_type = sys.argv[1]
domain = sys.argv[2]

if analysis_type == "domain_age":
    result = get_domain_age(domain)

elif analysis_type == "dns_lookup":
    result = dns_lookup(domain)

else:
    result = {
        "error": "Unknown analysis type"
    }

print(json.dumps(result))