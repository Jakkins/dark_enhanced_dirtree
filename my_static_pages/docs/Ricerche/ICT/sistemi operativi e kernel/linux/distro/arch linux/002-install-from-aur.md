# Install package from AUR

```bash
git clone https://aur.archlinux.org/package_name.git
less PKGBUILD
makepkg -s

# install
pacman -U kdenlive-git-23.03.70.r17550-1-x86_64.pkg.tar.zst
```

## Example

```bash
git clone https://aur.archlinux.org/insomnia-bin.git
less PKGBUILD
makepkg -s
sudo pacman -U insomnia-bin-2023.1.0-1-x86_64.pkg.tar.zst 
insomnia
```
