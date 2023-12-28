import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import network from 'resource:///com/github/Aylur/ags/service/network.js';
import battery from 'resource:///com/github/Aylur/ags/service/battery.js';
import * as Utils from "resource:///com/github/Aylur/ags/utils.js"
import app from 'resource:///com/github/Aylur/ags/app.js';

const launcher = () => Widget.Button ({
    className: "launcher",
    vexpand: false,
    
    onClicked: () => Utils.execAsync("wofi --show drun -W 335 -H 600 --allow-images -b -n -e -i -c ~/.config/wofi/config"),

    child: Widget.Label ("󰣇")
})

const workspaceDispatch = ws => Utils.execAsync(`hyprctl dispatch workspace ${ws}`)

function getWorkspaceLabel(workspaceId) {
    if (workspaceId === 1) return ""
    if (workspaceId === 2) return "󰈹"
    if (workspaceId === 3) return "󰈙"
    if (workspaceId === 4) return "󰅨"
    if (workspaceId === 5) return "󱎓"
    if (workspaceId === 6) return "󰉼"
    if (workspaceId === 10) return ""
    return ""
}

const workspaces = () => Widget.EventBox ({
    className: "workspaces",
    vexpand: true,
    vpack: "center",

    onScrollUp: () => workspaceDispatch("+1"),
    onScrollDown: () => workspaceDispatch("-1"),

    child: Widget.Box ({
        vexpand: true,
        vertical: true,
        
        children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button ({
            className: "workspace",
            child: Widget.Label(getWorkspaceLabel(i)),
            setup: button => button.name = i.toString(),
            onClicked: () => workspaceDispatch(i),
        })),

        connections: [[hyprland, self => self.children.forEach(button => {
            button.visible = hyprland.workspaces.some(ws => ws.id === Number.parseInt(button.name))
            button.toggleClassName("selected-workspace", hyprland.active.workspace.id === Number.parseInt(button.name))
        })]]
    })
})

function getBatteryLabel() {
    if (battery.charging) {
        if (battery.percent === 100) return "󰂅"
        if (battery.percent >= 90) return "󰂋"
        if (battery.percent >= 80) return "󰂊"
        if (battery.percent >= 70) return "󰢞"
        if (battery.percent >= 60) return "󰂉"
        if (battery.percent >= 50) return "󰢝"
        if (battery.percent >= 40) return "󰂈"
        if (battery.percent >= 30) return "󰂇"
        if (battery.percent >= 20) return "󰂆"
        if (battery.percent >= 10) return "󰢜"

        return "󰢟"
    }

    if (battery.percent === 100) return "󰁹"
    if (battery.percent >= 90) return "󰂂"
    if (battery.percent >= 80) return "󰂁"
    if (battery.percent >= 70) return "󰂀"
    if (battery.percent >= 60) return "󰁿"
    if (battery.percent >= 50) return "󰁿"
    if (battery.percent >= 40) return "󰁽"
    if (battery.percent >= 30) return "󰁼"
    if (battery.percent >= 20) return "󰁻"
    if (battery.percent >= 10) return "󰁺"

    return "󰂎"
}

function getNetworkLabel() {
    if (network.primary === "wired") return "󰈁"

    if (network.connectivity === "none") return "󰤮"
    if (network.connectivity === "limited") return "󰤢"
    if (network.connectivity === "full") return "󰤨"
}

const quickView = () => Widget.Button ({
    className: "quick-view",
    vexpand: false,
    onClicked: () => {
        app.toggleWindow("quick-settings")

    },

    connections: [[app, (self, windowName, visible) => {
        if (windowName != "quick-settings") return

        self.toggleClassName("enabled", visible)
    }, "window-toggled"]],

    child: Widget.Box ({
        vertical: true,
        children: [
            Widget.Label ({
                connections: [[battery, self => self.label = getBatteryLabel()]]
            }),

            Widget.Label ({
                className: "network",
                connections: [[network, self => self.label = getNetworkLabel()]]
            }),

            Widget.Label ({
                connections: [[1000, self => self.label = Utils.exec("date +%H%M").slice(0, 2) + "\n" + 
                    Utils.exec("date +%H%M").slice(2, 4)]]
            })
        ]
    })
})

const bar = () => Widget.Window ({
    name: "ags-bar",
    className: "bar",
    anchor: ["left"],
    exclusivity: "exclusive",

    child: Widget.CenterBox ({
        className: "bar-content",
        vertical: true,

        startWidget: launcher(),
        centerWidget: Widget.Box ({
            child: workspaces(),
            css: "min-height: 894px;" 
        }),
        endWidget: quickView()
    })
})

export default bar
