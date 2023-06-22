# Cheatsheet

- [Cheatsheet](#cheatsheet)
- [Git](#git)
	- [config](#config)
	- [git proxy](#git-proxy)
- [Github](#github)
	- [remove all commits](#remove-all-commits)

# Git

## config

```bash
git config --list
git config --local --list
```

## git proxy

```bash
git config --local http.proxy http://hostname:port
git config --local https.proxy http://hostname:port

git config --local --unset http.proxy
git config --local --unset https.proxy
```

# Github

## remove all commits

```bash
# go into your local repo
rm .git
git init
git config --local user.name "username"
git config --local user.email email
git remote add origin https://ghp_yourgithubkey@github.com/username/yourrepo.git
git config --local --list
git branch -m main
git add .
git commit -m "init repo, deleted all commits"
# push to remote repo's branch
git push -f origin main
```