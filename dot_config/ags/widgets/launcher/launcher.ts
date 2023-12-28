import { Button, Box, Icon, Label, Entry, Window, Scrollable } from "resource:///com/github/Aylur/ags/widget.js" 
import App from "resource:///com/github/Aylur/ags/app.js"
import applications from "resource:///com/github/Aylur/ags/service/applications.js"

const item = app => Button({
    setup: self => self.app = app,
    onClicked: () => {
        App.closeWindow("app-launcher")
        app.launch()
    },

    child: Box({
        vertical: false,
        spacing: 5,

        children: [
            Icon({
                icon: app.iconName || "",
                size: 42
            }),
            Box({
                vertical: true,
                vpack: 'center',
                children: [
                    Label({
                        className: 'title',
                        label: app.name,
                        xalign: 0,
                        vpack: 'center',
                        truncate: 'end',
                    }),
                ],
            }),
        ]
    })
})

const list = () => Box({
    vertical: true,
    spacing: 5
})

const search = () => Entry({
    hexpand: true,
    text: "-",

    onAccept: ({ text }) => {
        const list = applications.query(text || '');
        if (list[0]) {
            App.toggleWindow("app-launcher");
            list[0].launch();
        }
    },

    // @ts-ignore
    onChange: ({ text }) => list.children.map(item => {
        item.visible = item.app.match(text)
    })
})

const appLauncher = () => Window({
    name: "app-launcher",
    focusable: true,
    popup: true,

    child: Box({
        vertical: true,
        children: [
            search(),

            Scrollable({
                className: "list",
                hscroll: "never",

                child: list()
            })
        ],

        connections: [[App, (_, name, visible) => {
            list().children = applications.list.map(item)

            search().text = ""
        }]]
    })
})

export default appLauncher