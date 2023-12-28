# A Collection of my Dotfiles
### Requirements
- [ ] Arch Linux
- [ ] Chezmoi
- [ ] Hyprland
- [ ] ZSH
- [ ] AGS
- [ ] Kitty (comes pre-installed with Arch)
- [ ] Paru (or any AUR helper)
- [ ] SWWW (you can also install Waypaper)
- [ ] Wofi
- [ ] NetworkManager

### Installation
```bash
paru -Syu --noconfirm hyprland zsh aylurs-gtk-shell kitty swww chezmoi wofi networkmanager
chezmoi init --apply https://github.com/ixion396/hyprland-dots.git
```

### Keybinds
`SUPER+d` = open wofi
`SUPER+w` = open ags drawer
Look at `~/.config/hypr/hyprland.conf` for more keybinds

You should be all set! Give this repo a star if you like these dotfiles :)
