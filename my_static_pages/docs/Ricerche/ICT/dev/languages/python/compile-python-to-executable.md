# Compile to executable file

## CPython

E' un interprete di Python, funziona come Java. Ovvero, puoi compilare il codice python in un bytecode che viene interpretato dalla macchina virtuale di CPython.
Non è possibile trasformare un codice python in un eseguibile compilato in codice macchina.
Però ci sono degli strumenti per impacchettare il codice python con tutto quello che serve per eseguirlo in un eseguibile.
Ad esempio:

1. crei un codice python
2. lo compili con CPython
3. impacchetti con `PyInstaller` il codice compilato con il suo interprete

> Note that these tools may have limitations and may not work for all Python code.
