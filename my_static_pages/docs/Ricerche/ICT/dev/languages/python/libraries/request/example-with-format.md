# Example with format

```python
#
# pip install urllib3
# pip install requests
#
import sys

sys.path.append("c:\\python311\\lib\\site-packages")
sys.path.append(
    "C:\\Users\\{USERNAME}\\AppData\\Roaming\\Python\\Python311\\site-packages"
)

# couldn't get this work
# import ssl
# hostname = "hostname.it"
# conn = ssl.create_connection((hostname, 443))
# context = ssl.SSLContext(ssl.PROTOCOL_TLS)
# sock = context.wrap_socket(conn, server_hostname=hostname)
# certificate = ssl.DER_cert_to_PEM_cert(sock.getpeercert(True))
# file = open("cert.pem", "w")
# file.write(certificate)
# file.close()

import requests

url = "https://hostname.it/api/to/call"
headers = { "cookie": "your_cookie" }
payload = {}
# verify="C:\\Users\\path\\to\\cert.crt",
# verify="key.pem", cert="cert.crt"
response = requests.get(url, headers=headers, data=payload, verify=False)
json_data_arr = response.json()
for data in json_data_arr:
    print("{0: <10}\t{1}".format(data["json_field1"], data["json_field2"]))

```
