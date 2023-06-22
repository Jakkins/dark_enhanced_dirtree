# Git clone from Gitlab

```python
import os

protocol = "{PROTOCOL}"     # e.g. https
username = "{USERNAME}"
token = "{TOKEN}"           # e.g. gil_dE23jdewiKELdaj
gitlab_url = "{GITLAB_URL}" # e.g. your.gitlab.hostname.it
# os.system("git config --global http.sslVerify false") if needed
base_url_path = "{}://{}:{}@{}".format(protocol, username, token, gitlab_url)
for data in json_data_arr:
		# base_url_path         e.g. https://username:gil_dE23jdewiKELdaj@your.gitlab.hostname.it
		# data["relative_path"] e.g. /repo/project1/module1
    os.system("git clone {}".format(base_url_path) + data["relative_path"])
# os.system("git config --global http.sslVerify true")
```
