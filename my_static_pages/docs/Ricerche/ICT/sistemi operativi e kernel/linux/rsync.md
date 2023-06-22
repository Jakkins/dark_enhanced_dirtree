# rsync

E' un software per Unix che sincronizza file e cartelle da una posizione all'altra minimizzando il trasferimento di dati utilizzando quando possibile la codifica delta.
Che vor dì?

Vuol dire che non sincronizza i file già sincronizzati.
C'è un [ottimo video](https://www.youtube.com/watch?v=qE77MbDnljA) che mostra degli esempi di utilizzo base.

## Come mostrare a schermo (loggare) quello che il programma sta facendo

```bash
rsync -v -progress

# -v           verbose, mostra delle info
# -progress    mostra quanti dati ha spostato sul totale
```

## Come faccio a sincronizzare due cartelle forzando l'eliminazione dei file che non esistono più?

Questo comando copia la cartella 1 dentro la cartella 2.

```bash
rsync -v -progress -a ./dir1 ./dir2

# -a, --archive, archive mode, equivalent to -rlptgoD. Questa operazione del conserva tutto (permessi, link simbolici, gruppi, proprietà, data modifica, ...)
```

Questo comando, ***invece, copia il contenuto*** della cartella 1 dentro la cartella 2.

```bash
rsync -v -progress -a ./dir1/ ./dir2
```

Unico problema, questo comando non cancella i file, ovvero non fa un perfetto mirror della cartella sorgente, ovvero:

- se su dir1 ci sono 2 file (file1, file2)
- e su dir 2 ci sono 3 file (file1, file3, file4)

Un perfetto mirror sarebbe quello di cancellare file3 e file4 e salvare il file2 in modo da avere entrambe le cartelle che contengono gli stessi file.

## Mirror backup

```bash
rsync -v -progress -a --delete ./dir1/ ./dir2 

# --delete       questo comando cancella i file nella dir2 che non sono presenti nella dir1
```

## Shortcut

Il comando sopra può essere scritto anche in questo modo:

```bash
rsync -vPa --delete ./dir1/ ./dir2     
```

## Come controllare prima di fare modifiche

Basta aggiungere una "-n". In questo modo non verranno eseguite modifiche nella cartella destinazione.

```bash
rsync -nvPa --delete ./dir1/ ./dir2     
```

## Come ignorare il backup di certi file o cartelle

Ci sono 2 opzioni per fare questo.

```bash
# --exclude=PATTERN       exclude files matching PATTERN
# --exclude-from=FILE     read exclude patterns from FILE
```

### --exclude

```bash
rsync -vPa --delete --exclude={"file1.txt","dir1/*","dir2"} ./dir1/ ./dir2

# "file1.txt"        won't copy file1.txt
# "dir1/*"           will copy dir1, but not it's content
# "dir2"             won't copy the whole dir2
```

### --exclude-from

This is maybe stupid, but also a sort of hack.

```bash
EXCLUDES_NODE=$(echo -e 'node_modules')
EXCLUDES_ANDROID=$(echo -e 'build\n.idea\n*.apk')
EXCLUDES_RUST=$(echo -e 'target')
EXCLUDES_ALL=$(echo -e "$EXCLUDES_NODE\n$EXCLUDES_ANDROID\n$EXCLUDES_RUST")

rsync -vPa --delete --exclude-from=<(printf "%s" "$EXCLUDES_ALL") ./dir1/ ./dir2
```
