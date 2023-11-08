import Widget, {Button} from 'resource:///com/github/Aylur/ags/widget.js';
import Battery from 'resource:///com/github/Aylur/ags/service/battery.js';
import hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import * as Utils from "resource:///com/github/Aylur/ags/utils.js"

const workspaceDispatch = ws => Utils.execAsync(`hyprctl dispatch workspace ${ws}`)

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

        children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.EventBox ({
            className: "workspace",
            child: Widget.Label(" "),
            setup: button => button.name = i.toString(),
            onPrimaryClick: () => workspaceDispatch(i),
        })),

        // children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button ({
        //     className: "workspace",
        //     child: Widget.Label(" "),
        //     setup: button => button.name = i.toString(),
        //     onClicked: () => workspaceDispatch(i),
        // })),

        connections: [[hyprland, self => self.children.forEach(button => {
            button.visible = hyprland.workspaces.some(ws => ws.id === Number.parseInt(button.name))
            button.toggleClassName("selected-workspace", hyprland.active.workspace.id === Number.parseInt(button.name))
        })]]
    })
})

const quickView = () => Widget.Box ({
    className: "quick-view",
    valign: "start",
    halign: "start",
    vertical: true,
    children: [
        Widget.Label ({
            
        })
    ]
})

const bar = () => Widget.Window ({
    name: "ags-bar",
    className: "bar",
    anchor: ["left"],
    exclusive: true,

    child: Widget.CenterBox ({
        className: "bar-content",
        vertical: true,
        spacing: 300,

        startWidget: Widget.Button ({}),
        centerWidget: workspaces(),
        endWidget: quickView(),
    })
})

export default bar