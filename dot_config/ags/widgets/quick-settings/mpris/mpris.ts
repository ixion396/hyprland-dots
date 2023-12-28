import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';

const art = () => Widget.Box({
    hpack: "start",
    connections: [[mpris, self => self.css =
        "min-height: 150px;" +
        "min-width: 150px;" +
        "margin: 30px;" +
        "margin-right: 0px;" +
        "border-radius: 10px;" +
        `background-image: url("${mpris.players[0]?.trackCoverUrl}");` +
        "background-size: cover;" +
        "background-position: center;"
    ]]
})

const trackLabel = () => Widget.Label({
    className: "track-label",
    hpack: "start",

    truncate: "end",
    maxWidthChars: 30,

    connections: [[mpris, self => self.label = mpris.players[0]?.trackTitle]]
})

const artistLabel = () => Widget.Label({
    className: "artist-label",
    hpack: "start",

    truncate: "end",
    maxWidthChars: 30,

    connections: [[mpris, self => self.label = mpris.players[0]?.trackArtists.join(", ")]]
})

const controls = () => Widget.Box({
    className: "controls-container",
    vertical: false,
    halign: "center",
    spacing: 20,

    children: [
        Widget.Button({
            className: "controls",
            onPrimaryClick: () => mpris.players[0]?.previous(),

            child: Widget.Label("󰒮")
        }),

        Widget.Button({
            className: "controls",
            onPrimaryClick: () => mpris.players[0]?.playPause(),

            child: Widget.Label({
                connections: [[mpris, self => {
                    if (mpris.players[0]?.playBackStatus === "Playing") self.label = "󰏤"
                    if (mpris.players[0]?.playBackStatus === "Paused") self.label = "󰐊"
                    self.label = "󰓛"
                }]]
            })
        }),

        Widget.Button({
            className: "controls",
            onPrimaryClick: () => mpris.players[0]?.next(),

            child: Widget.Label("󰒭")
        })
    ]
})

const mprisClient = () => Widget.Box({
    className: "mpris-content",
    vertical: false,
    children: [
        // Widget.Overlay({
        //     child: Widget.Box({
        //         className: "cava-container",
        //         children: [
        //             Widget.ProgressBar({
        //                 className: "cava-bar",
        //                 vertical: true,

        //                 binds: [["label", cava]]
        //             })
        //         ]
        //     }),
        //     overlays: [
        //         Widget.Box ({
        //             connections: [[
        //                 mpris, self => self.css = 
        //                 "min-height: 150px;" +
        //                 "min-width: 150px;" +
        //                 "margin: 30px;" +
        //                 "border-radius: 10px;" +
        //                 `background-image: url("${mpris.players[0]?.trackCoverUrl}");` +
        //                 "background-size: cover;" +
        //                 "background-position: center;"
        //             ]]
        //         }),
        //     ]
        // })
        art(),

        Widget.Box({
            vertical: true,
            hpack: "center",
            vpack: "center",
            children: [
                trackLabel(),
                controls()
            ]
        })
    ]
})

export default mprisClient