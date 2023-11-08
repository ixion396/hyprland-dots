import Widget, {Button} from 'resource:///com/github/Aylur/ags/widget.js';
import hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import * as Utils from "resource:///com/github/Aylur/ags/utils.js"
import battery from 'resource:///com/github/Aylur/ags/service/battery.js';

const launcher = () => Widget.Button ({
    className: "launcher",
    valign: "end",
    
    onClicked: () => Utils.execAsync("wofi --show drun"),

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
    return ""
}

const workspaces = () => Widget.EventBox ({
    className: "workspaces",
    halign: "center",

    onScrollUp: () => workspaceDispatch("+1"),
    onScrollDown: () => workspaceDispatch("-1"),

    child: Widget.Box ({
        vertical: true,
        // connections: [[hyprland, self => {
        //     const buttonArray = Array.from({ length: 10 }, (_, i) => i + 1)
        //     self.children = buttonArray.map(i => Widget.Button({
        //         onClicked: () => Utils.execAsync(`hyprctl dispatch workspace ${i}`),
        //         child: Widget.Label(`${i}`),
        //         className: hyprland.active.workspace.id == i ? "focused" : "",
        //         visible: hyprland.workspaces.values
        //     }));
        // }]],

        // children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.EventBox ({
        //     className: "workspace",
        //     child: Widget.Label(" "),
        //     setup: button => button.name = i.toString(),
        //     onPrimaryClick: () => workspaceDispatch(i),
        // })),

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
        if (battery.percent >= 10) return "󰢜"
        if (battery.percent >= 20) return "󰂆"
        if (battery.percent >= 30) return "󰂇"
        if (battery.percent >= 40) return "󰂈"
        if (battery.percent >= 50) return "󰢝"
        if (battery.percent >= 60) return "󰂉"
        if (battery.percent >= 70) return "󰢞"
        if (battery.percent >= 80) return "󰂊"
        if (battery.percent >= 90) return "󰂋"
        if (battery.percent === 100) return "󰂅"

        return "󰢟"
    }

    if (battery.percent >= 10) return "󰁺"
    if (battery.percent >= 20) return "󰁻"
    if (battery.percent >= 30) return "󰁼"
    if (battery.percent >= 40) return "󰁽"
    if (battery.percent >= 50) return "󰁿"
    if (battery.percent >= 60) return "󰁿"
    if (battery.percent >= 70) return "󰂀"
    if (battery.percent >= 80) return "󰂁"
    if (battery.percent >= 90) return "󰂂"
    if (battery.percent === 100) return "󰁹"

    return "󰂎"
}

const quickView = () => Widget.Button ({
    className: "quick-view",
    valign: "start",
    child: Widget.Box ({
        vertical: true,
        children: [
            Widget.Label ({
                className: "battery",
                halign: "center",
                connections: [[battery, self => self.label = getBatteryLabel()]]
            }),

            Widget.Label ({

            }),

            Widget.Label ({
                className: "clock",
                halign: "center",
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
    exclusive: true,

    child: Widget.CenterBox ({
        className: "bar-content",
        vertical: true,
        spacing: 100,

        startWidget: launcher(),
        centerWidget: workspaces(),
        endWidget: quickView(),
    })
})

export default bar