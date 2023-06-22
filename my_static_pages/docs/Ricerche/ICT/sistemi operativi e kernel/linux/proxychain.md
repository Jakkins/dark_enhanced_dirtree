# Proxychain

## alternatives

- switchyomega (web browser plugin)

## installation and configuration

```bash
sudo pacman -S proxychains-ng
cp /etc/proxychains.conf ~/proxychains-2.conf
nano ~/proxychains-2.conf     # https://spys.one/free-proxy-list/DE/
proxychains4 -f ~/proxychains-2.conf curl ifconfig.me/ip         # questo funziona
# proxychains4 -f ~/proxychains-2.conf falkon           i browser non sembrano funzionare se usati direttamente con proxychain, bisogna mettere in mezzo tor
```

### proxychain.conf example

```bash
# proxychains.conf  VER 4.x
# find full configuration documentation in /etc/proxychain.conf
strict_chain
proxy_dns
remote_dns_subnet 224
tcp_read_time_out 15000
tcp_connect_time_out 8000

[ProxyList]
socks5 89.58.45.94 36007
```
