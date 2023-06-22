# Usare le applicazioni x11 su Windows

Ad esempio, ho un server a cui mi posso collegare in ssh e voglio spostare dei dati.
Posso:
- farlo tramite linea di comando
- installare pcmanfm, aprire pcmanfm su windows e spostare con il mouse

## First thing first

Check server side configuration:

- <https://superuser.com/questions/1405848/understanding-x11-forwarding-through-ssh-start-to-finish-steps>

```bash
pkill sshd   
```

## X Window System Server (client side)

- WSL (libero)
- Cygwin
    - PuTTY (libero)
- Xming (licensed but gratis)
- x410 (licensed and maybe not gratis)

### WSL

```bash
sudo apt-get install x11-apps
```