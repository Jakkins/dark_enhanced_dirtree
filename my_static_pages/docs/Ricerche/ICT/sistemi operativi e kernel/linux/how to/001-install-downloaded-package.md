# Install downloaded general linux package

## TL;DR

```bash
sudo mkdir /usr/local/programs
sudo mv ~/Downloads/idea-IC-222.4345.14 /usr/local/programs/
sudo ln -s /usr/local/programs/idea-IC-222.4345.14/bin/idea.sh /usr/local/bin/
```

## How to install in /usr/local/

- [Where should I install my package?](../QA/index.md#where-should-i-install-my-program)

For example I just downloaded Intellij (an IDE to program with) and I want to make it available to everyone.

```bash
cd /usr/local/
sudo mkdir programs
sudo mv ~/Downloads/idea-IC-222.4345.14 ./programs/
cd ./idea-IC-222.4345.14/bin/
sudo ln -s $(pwd)/idea.sh /usr/local/bin/     # MUST: use absolute path

# if you want to give another name
sudo ln -s $(pwd)/idea.sh /usr/local/bin/intellij
```

- [What is `ln -s`](../QA/index.md#what-is-a-soft-link-ln-s)
- [How to update a soft link](../QA/index.md#how-to-update-a-soft-link)

## Sources

- <https://unix.stackexchange.com/questions/8656/usr-bin-vs-usr-local-bin-on-linux/>
