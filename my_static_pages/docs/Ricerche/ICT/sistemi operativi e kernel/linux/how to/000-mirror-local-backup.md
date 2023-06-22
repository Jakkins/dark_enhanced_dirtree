# How to configure a mirror local backup

## backup command

This command will mirror content of dir1 into dir2.
For more information check [here](../rsync.md).

```bash
rsync -vPa --delete --exclude={"node_modules","build",".idea","*.apk","target"} ./dir1/ ./dir2
```

## automate command

To automate something in Linux you can use:

- Cron
- systemd timers (recommended)

## cron

```txt
cron                      : the name of the tool
crontab                   : generally the file that lists the jobs that cron will be executing
cronjobs or cron schedule : those jobs
```

## systemd timers

```bash
systemctl list-timers
```

> Rule number 1:
>
> - For each `.timer` file, a matching `.service` file exists (e.g. `foo.timer` and `foo.service`)
>

### 10k feet view

/etc/systemd/system/:

- lmb5m.timer
- lmb5m.script
- lmb5m.service

### lmb5m.timer

Create a timer to launch a service every 5 min.
Let's call this file `lmb5m.timer` (local mirror backup 5 min):

```txt
[Unit]
Description=local mirror backup timer, 5 min
Requires=lmb5m.service

[Timer]
OnCalendar=*:0/5
Persistent=true
Unit=lmb5m.service

[Install]
WantedBy=timers.target
```

Now I want to try to install this timer to see if `Requires` field is working:

```bash
sudo mv lmb5m.timer /etc/systemd/system/
systemctl enable lmb5m.timer
systemctl start lmb5m.timer
# Failed to start lmb5m.timer: Unit lmb5m.service not found.
```

And this is good!

### lmb5m.script

Create the script.

```bash
cd /etc/systemd/system/
nano lmb5m.script
sudo chmod +x lmb5m.script    # important
```

```bash
#!/bin/bash
dir1=./dir1/      # use the /
dir2=./dir2       # do not use the /
rsync -vPa --delete --exclude={"node_modules","build",".idea","*.apk","target"} $dir1 $dir2
# use -v to debug command
```

> You should remove write permission to this file because
>
> this file is runned with admin permission
>
> so someone can change this file and run every code with admin perm

### lmb5m.service

Create the service.

```txt
[Unit]
Description=local mirror backup service

[Service]
ExecStart=/etc/systemd/system/lmb5m.script

[Install]
WantedBy=multi-user.target
```

Start and check everything:

```bash
systemctl daemon-reload
systemctl enable lmb5m.timer
systemctl start lmb5m.timer
journalctl -f -u lmb5m           # log command output 
```

Yeeeee!
Local mirror backup accomplished!
Now go dance :P

# sources

- <https://wiki.archlinux.org/title/systemd/Timers>
- <https://askubuntu.com/questions/919054/how-do-i-run-a-single-command-at-startup-using-systemd>
