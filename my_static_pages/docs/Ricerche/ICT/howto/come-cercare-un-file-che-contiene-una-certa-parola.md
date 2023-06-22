# Come cercare un file che contiene una certa parola

## Su Windows

Consiglio di scaricare `wsl.exe`, ovvero, windows subsystem linux e usare grep.

## Su Unix (Linux, Mac OS)

Su questi sistemi esiste un comando chiamato `grep` che serve apposta per questo.

```bash
grep -r /path/to/where/you/want/to/search -e "parola o frase che vuoi cercare"
```

Di solito lo utilizzo così:

```bash
cd ~/dev/projects/
grep -r . -e "TODO"
```