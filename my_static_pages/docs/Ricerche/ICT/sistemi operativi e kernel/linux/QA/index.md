# Questions/Answers

## where should I install my program?

| name             | explanation                                                         | path                                                                    |
| ---------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| global workspace | a program installed in a global workspace is available to all users | /bin/, /sbin/, /usr/bin/, /usr/sbin/, /usr/local/bin/, /usr/local/sbin/ |
| user workspace   | is available to only that users                                     | ~/bin/                                                                  |
| local workspace  | is available only on that directory                                 | e.g. node_modules, gradle_wrapper                                       |

- /bin (and /sbin) were intended for programs that needed to be on a small / partition before the larger /usr, etc. partitions were mounted. These days, it mostly serves as a standard location for key programs like /bin/sh, although the original intent may still be relevant for e.g. installations on small embedded devices.
- /sbin, as distinct from /bin, is for system management programs (not normally used by ordinary users) needed before /usr is mounted.
- /usr/bin is for distribution-managed normal user programs.
- There is a /usr/sbin with the same relationship to /usr/bin as /sbin has to /bin.
- **_/usr/local/bin is for normal user programs not managed by the distribution package manager_**, e.g. locally compiled packages. You should not install them into /usr/bin because future distribution upgrades may modify or delete them without warning.
- /usr/local/sbin, as you can probably guess at this point, is to /usr/local/bin as /usr/sbin to /usr/bin.
- there is also /opt which is for monolithic non-distribution packages, although before they were properly integrated various distributions put Gnome and KDE there. Generally you should reserve it for large, poorly behaved third party packages such as Oracle.

## soft links

### What is a soft link (ln -s)?

Symbolic links (also called "soft" links) are files that point to a file or directory in your system, but don't mirror the other file's data.

### How to update a soft link

You can just `rm` and then `ln -s` again, or:

```bash
# for files
ln -sf /a/new/path files

# for dirs
ln -sfn /a/new/path files
```

## What is a package manager?

Is a collection of software tools that automates the process of installing, upgrading, configuring, and removing computer programs for a computer in a consistent manner.

### What is pacman?

Is a package manager for Arch Linux.
