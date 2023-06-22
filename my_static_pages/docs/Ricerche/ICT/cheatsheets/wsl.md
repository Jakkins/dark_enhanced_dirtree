# Windows Subsystem for Linux (WSL)

## conf file list

```txt
/etc/wsl.conf
/etc/resolv.conf
/etc/hosts
```

## commands

<https://learn.microsoft.com/en-us/windows/wsl/basic-commands>

```bash
# show installed distro
wsl -l -v
#   NAME                   STATE           VERSION
# * Ubuntu-20.04           Stopped         2
#   docker-desktop-data    Stopped         2
#   Ubuntu                 Stopped         2
```

```bash
# remove installed distro
wsl --unregister Ubuntu-20.04 
```

```bash
# show all distro list
wsl --list --online
```
```bash
# install a distro
wsl --install -d Debian
```

```bash
# update wsl to latest version
wsl --update
wsl --update --web-download
```

### more commands

```bash
wsl --shutdown
```

## FAQ

Are there other distro? Yes, <https://www.windowscentral.com/software-apps/the-best-linux-distros-for-wsl-on-windows-10-and-11>

Where is the instance locted? <https://askubuntu.com/questions/1380253/where-is-wsl-located-on-my-computer>

Link to the window store? <https://aka.ms/wslstore>

## Problems

- <https://stephenreescarter.net/wsl2-network-issues-and-win-10-fast-start-up/>


