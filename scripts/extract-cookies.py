import json
import sys
import browser_cookie3

cookies = []

for domain in ('marsof.es', 'supabase.co'):
    try:
        cj = browser_cookie3.chrome(domain_name=domain)
        for c in cj:
            cookies.append({
                'name': c.name,
                'value': c.value,
                'domain': c.domain,
                'path': c.path or '/',
                'secure': bool(c.secure),
                'httpOnly': False,
                'expires': int(c.expires) if c.expires else -1,
            })
    except Exception as e:
        print(f'skipped {domain}: {e}', file=sys.stderr)

print(json.dumps(cookies))
