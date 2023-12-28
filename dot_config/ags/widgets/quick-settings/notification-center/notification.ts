import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import Variable from "resource:///com/github/Aylur/ags/utils.js"
import { timeout, lookUpIcon } from "resource:///com/github/Aylur/ags/utils.js"
import GLib from "gi://GLib"

const icon = ({ appEntry, appIcon, image }) => {
    if (image) {
        return Widget.Box ({
            valign: "start",
            className: "img-icon",
            css: `background-image: url("${image}")` 
        })
    }

    let icon = "dialog-information-symbolic"
    if (lookUpIcon(appIcon)) icon = appIcon
    if (lookUpIcon(appEntry)) icon = appEntry

    return Widget.Box ({
        valign: "start",
        className: "icon",

        child: Widget.Icon ({
            icon, size: 58,
            halign: "center", hexpand: true,
            valign: "center", vexpand: true
        })
    })
}

// export const notification = notification => Widget.EventBox ({
//     className: "notification",
//     onPrimaryClick: () => notification.dismiss(),
//     properties: [["hovered", false]],
//     onHover: self => {
//         if (self._hovered) return

//         timeout(300, () => self._hovered = true)
//     },
//     onHoverLost: self => {
//         if (!self._hovered) return

//         self._hovered = false
//         notification.dismiss()
//     },
    
//     child: Widget.Box ({
//         vertical: true,
//         children: [
//             Widget.Box ({
//                 children: [
//                     icon(notification),
//                     Widget.Box ({
//                         vertical: true,
//                         hexpand: true,
//                         children: [
//                             Widget.Label ({
//                                 className: "title",
//                                 xalign: 0,
//                                 justification: "left",
//                                 hexpand: true,
//                                 maxWidthChars: 24,
//                                 truncate: "end",
//                                 wrap: true,
//                                 label: notification.summary,
//                                 useMarkup: true
//                             }),

//                             Widget.Button ({
//                                 className: "close-button",
//                                 valign: "start",
//                                 child: Widget.Label("󱎘"),
//                                 onClicked: () => notification.close.bind(notification)
//                             })
//                         ]
//                     })
//                 ]
//             }),
             
//             Widget.Box ({
//                 className: "actions",
//                 children: notification.actions.map(({ id, label }) => Widget.Button ({
//                     className: "active-button",
//                     hexpand: true,
//                     onClicked: () => notification.invoke(id),
//                     child: Widget.Label(label)
//                 }))
//             })
//         ]
//     })
// })

const notification = notification => Widget.EventBox ({
    properties: [["hovered", false]],

    onHover: self => {
        self._hovered.value = true
        self._hovered._block = true

        timeout(100, () => self._hovered._block = false)
    },

    onHoverLost: self => GLib.idle_add(0, () => {
        if (self._hovered._block) return GLib.SOURCE_REMOVE

        self._hovered.value = false
        notification.dismiss()
        return GLib.SOURCE_REMOVE

    }),

    child: Widget.Box ({
        className: "content",
        children: [
            icon(notification),
            Widget.Box ({
                hexpand: true,
                vertical: true,
                children: [
                    Widget.Box ({
                        children: [
                            Widget.Label ({
                                className: "title",
                                xalign: 0,
                                justification: "left",
                                hexpand: true,
                                maxWidthChars: 24,
                                truncate: "end",
                                wrap: true,
                                label: notification.summary,
                                useMarkup: notification.summary.startsWith("<"),
                            }),

                            Widget.Label ({
                                className: "time",
                                vpack: "start",
                                label: GLib.DateTime.new_from_unix_local(notification.time).format("%H:%M")
                            }),

                            Widget.Button ({
                                onHover: self => {
                                    self.parent
                                }
                            })
                        ]
                    })
                ]
            })
        ]
    })
})

export default notification