import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';
// @ts-ignore
import Variable from "resource:///com/github/Aylur/ags/variable.js";
import App from 'resource:///com/github/Aylur/ags/app.js';

const art = () => Widget.Box ({
    connections: [
        [
            Mpris,

            self => self.style = 
                "min-height: 200px;" +
                "min-width: 200px;" +
                "margin: 20px;" +
                "border-radius: 10px;" +
                `background-image: url("${Mpris.players[0]?.trackCoverUrl}");` +
                "background-size: cover;" +
                "background-position: center;"
        ]
    ],
})

const cava = Variable ("", {
    listen: [["python3", App.configDir + "/widgets/mpris/cava.py"]]
})

const equalizer = () => Widget.Box ({
    children: [
        Widget.Label ({
            connections: [[cava, self => {
                const value = cava.value.slice(1, -1)
                // value.substring(0, 1)
                // value.substring(value.indexOf("]") - 1, value.indexOf("]"))
            
            }]]        
        }),
    ],

    connections: [[cava, self => {
        const data = cava.value.slice(1, -1)

        for (let i = 0; i < 6; i++) {
            const datapoint = data.substring(0, data.indexOf(","))
            const height = (parseFloat(datapoint) * 10) + 10

            self.children[i] = Widget.Box ({
                vertical: true,
                style:
                    `min-height: ${height}px;` +
                    "min-width: 10px;" +
                    "background-image: none;" +
                    "background-color: white;"
            })
        }
    }]]
})

const trackLabel = () => Widget.Label ({
    className: "track",
    halign: "center",

    connections: [
        [
            Mpris, 
            self => {
                let label = `${Mpris.players[0]?.trackTitle} by ${Mpris.players[0]?.trackArtists.join(", ")}`

                if (label.length) label = label.slice(0, 30) + "..."

                self.label = label
            }
        ]
    ],
})

const controls = () => Widget.Box ({
    vertical: false,
    halign: "center",

    children: [
        Widget.Button ({
            className: "controls",
            onPrimaryClick: () => Mpris.players[0]?.previous(),
                        
            child: Widget.Label ("󰒮")
        }),

        Widget.Button ({
            className: "controls",
            onPrimaryClick: () => Mpris.players[0]?.playPause(),
                        
            child: Widget.Label ({
            connections: [[Mpris, self => {
                    if (Mpris.players[0]?.playBackStatus === "Playing") self.label = "󰏤"
                    if (Mpris.players[0]?.playBackStatus === "Paused") self.label = "󰐊"
                    self.label = "󰓛"
                }]]
            })
        }),

        Widget.Button ({
            className: "controls",
            onPrimaryClick: () => Mpris.players[0]?.next(),
                        
            child: Widget.Label ("󰒭")
        })
    ]
})

const mprisClient = () => Widget.Window ({
    name: "mpris-client",
    className: "mpris",
    anchor: ["bottom", "left"],
    exclusive: true,
    margin: [26, 26, 26, 26],

    focusable: true,
    popup: true,

    child: Widget.Box ({
        vertical: true,
        children: [
            Widget.Box ({
                vertical: false,
                children: [
                    art(),
                    //equalizer()
                ]
            }),
            trackLabel(),
            controls(),
        ]
    })
})

export default mprisClient