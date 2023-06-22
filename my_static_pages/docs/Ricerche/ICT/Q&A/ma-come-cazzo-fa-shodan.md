# Ma come fa Shodan a scannerizzare le porte senza essere bloccato?

## Ah

> The CFAA (in the United States, where Shodan is based) is INSUFERRABLY vague about what exactly "Fraud and Abuse" constitutes, especially the "Abuse" part of the argument.
>
> So, yeah, you can run mass scan and hit the entire internet, but if you accidently knock over some government computer in the process (enough so to irritate them), they are absolutely going to have your ass. [source number 1](#sources)
>
> In this case I use "Technically" legal because there is no explicit law against port scanning, but the law is incredibly vague and with the right judge / jury could easily be used against shodan.

## HowTo: Block IoT scanners like Shodan, Censys, Shadowserver, PAN Expanse etc

- <https://community.checkpoint.com/t5/Management/HowTo-Block-IoT-scanners-like-Shodan-Censys-Shadowserver-PAN/td-p/124612#>
- <https://wiki.ipfire.org/configuration/firewall/blockshodan>

## Ok, ma in Italia?

Stessa cosa, un port scanning non è illegale ma non puoi andare oltre, ovvero:

- Se dopo il port scanning si cominciano a lanciare degli exploits con il tentativo di bucare il sistema si diventa perseguibili penalmente (e direi anche grazie al caxxo)
- Le conseguenze legali risultano meno chiare quando si paralizza un sistema per via di un port scan, o di un port scan `intensivo`
    - un port scan intensivo potrebbe sovraccaricare il sistema finendo per arrestarlo, potreste essere perseguibili per attacco DDos
    - anche "un solo" port scan fatto in un certo modo potrebbe bloccare il sistema se il sistema... fa cagare
- Inoltre i responsabili del sistema di destinazione potrebbero già individuare le vostre azioni ancora prima dell’arresto e giudicarle come le prime mosse in vista di un attacco. In un caso simile non sono perciò da escludere delle ripercussioni legali. Come ogni cosa `dipende contro chi vi mettete` [source numero 4](#sources)

# Sources

1. <https://www.reddit.com/r/AskNetsec/comments/rgkmn0/is_shodan_illegal_in_any_context/>
2. [Molto interessante: blocchi IPv4 assegnati a organizzazioni](https://en.wikipedia.org/wiki/List_of_assigned_/8_IPv4_address_blocks)
3. <https://www.youtube.com/watch?v=C_3z8nez8Jo>
4. <https://www.ionos.it/digitalguide/server/know-how/port-scanning-nozioni-di-base-e-questioni-legali/>
