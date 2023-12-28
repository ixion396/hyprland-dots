import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";
import { Box, EventBox, Label, Window } from "resource:///com/github/Aylur/ags/widget.js";
const layerItem = (name, icon, command) => EventBox({
    className: "context-menu-item",
    onPrimaryClick: () => execAsync(command),
    child: Box({
        vertical: false,
        children: [
            Label({
                className: "context-menu-item-icon",
                label: icon
            }),
            Label({
                className: "context-menu-item-label",
                label: name
            })
        ]
    })
});
const layer = (items, marginFromTop) => Box({
    className: "context-menu-hover-popup",
    vertical: true,
    spacing: 8,
    css: `margin-top: ${marginFromTop}px;`,
    connections: [[items, self => {
                for (let i = 0; i < items.length; i++) {
                    self.children[i] = items[i];
                }
            }]]
});
const contextMenuItem = (name, icon, cmd) => EventBox({
    className: "context-menu-item",
    onPrimaryClick: () => execAsync(cmd),
    child: Box({
        vertical: false,
        children: [
            Label({
                className: "context-menu-item-icon",
                label: icon
            }),
            Label({
                className: "context-menu-item-label",
                label: name
            })
        ]
    })
});
const contextMenu = () => Window({
    name: "desktop-context-menu",
    layer: "overlay",
    visible: true,
    anchor: ["left"],
    margins: [800, 800, 800, 500],
    child: Box({
        className: "context-menu-content",
        vertical: true,
        spacing: 8,
        children: [
            EventBox({
                className: "context-menu-item",
                onPrimaryClick: () => {
                    execAsync("kitty");
                },
                // onHoverRelease: self => {
                //     layer([layerItem("Dotfiles", "", "kitty chezmoi cd"), layerItem("Code", "󰅩", "kitty cd Documents/Code/")], 0).visible = true
                // },
                child: Box({
                    vertical: false,
                    children: [
                        Label({
                            className: "context-menu-item-icon",
                            label: ""
                        }),
                        Label({
                            className: "context-menu-item-label",
                            label: "Open a Terminal"
                        }),
                        // layer(
                        //     [
                        //         layerItem("Dotfiles", "", "kitty chezmoi cd"),
                        //         layerItem("Code", "󰅩", "kitty cd Documents/Code/")
                        //     ],
                        //     0)
                    ]
                })
            }),
            EventBox({
                className: "context-menu-item",
                onPrimaryClick: () => {
                    execAsync("firefox --browser");
                },
                child: Box({
                    vertical: false,
                    children: [
                        Label({
                            className: "context-menu-item-icon",
                            label: "󰈹"
                        }),
                        Label({
                            className: "context-menu-item-label",
                            label: "Open Firefox"
                        })
                    ]
                })
            }),
            contextMenuItem("Move", "󰩨", "slurp")
        ]
    })
});
export default contextMenu;
