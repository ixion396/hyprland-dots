import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Battery from 'resource:///com/github/Aylur/ags/service/battery.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Brightness from '../../services/brightness.js';
import mprisClient from './mpris/mpris.js';

const profilePicture = () => Widget.Box({
    className: "profile-picture"
})

const powerButtons = () => Widget.Box({
    vertical: false,

    children: [
        Widget.Button({
            className: "power-button",
            onPrimaryClick: () => "shutdown now",

            child: Widget.Label("󰐥")
        }),

        Widget.Button({
            className: "power-button",
            onPrimaryClick: () => "reboot now",

            child: Widget.Label("󰑓")
        }),

        Widget.Button({
            className: "power-button",
            onPrimaryClick: () => "hyprctl dispatch exit",

            child: Widget.Label("󱅞")
        })
    ]
})

function findVolumeRange(volume) {
    switch (true) {
        case (volume === 0):
            return "󰝟"
        case (volume < 20):
            return "󰝞"
        case (volume < 60):
            return "󰖀"
        default:
            return "󰕾"
    }
}

const muteButton = (type = "speaker") => Widget.Button({
    className: "volume-button",
    // @ts-ignore
    child: Widget.Label(findVolumeRange(volumeSlider.value))
})

const volumeSlider = (type = "speaker") => Widget.Slider({
    className: "volume-slider",
    hexpand: true,
    draw_value: false,
    onChange: ({ value }) => Audio[type].volume = value,
    connections: [[Audio, self => {
        self.value = Audio[type]?.volume || 0;
    }, `${type}-changed`]],
});

const brightnessLabel = () => Widget.Button({
    className: "volume-button",
    child: Widget.Label("󰖨")
})

const brightnessSlider = () => Widget.Slider({
    className: "volume-slider",
    hexpand: true,
    draw_value: false,
    // @ts-ignore
    binds: [["value", Brightness, "screen"]],
    onChange: ({ value }) => Brightness.screen = value
})

const batteryLabel = () => Widget.Label({
    className: "battery-label",
    hpack: "start",
    connections: [[Battery, self => {
        const weekdays = ["Sunday", "Monday", "Tuesday", " Wednesday", "Thursday", "Friday", "Saturday"]
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const today = new Date()

        self.label = `${weekdays[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}  |  ${Battery.percent}%`
    }]]
})

const quickSettings = () => Widget.Window({
    name: "quick-settings",
    className: "quick-settings",
    anchor: ["bottom", "left"],
    margins: [32, 32, 32, 32],

    // focusable: true,
    // popup: true,

    child: Widget.Box({
        vertical: true,
        children: [
            Widget.Box({
                name: "control-center-content",
                vertical: true,
                children: [
                    Widget.Box({
                        vertical: false,
                        spacing: 60,
                        children: [
                            profilePicture(),
                            powerButtons()
                        ]
                    }),

                    Widget.Box({
                        vertical: false,
                        children: [
                            muteButton(),
                            volumeSlider()
                        ]
                    }),

                    Widget.Box({
                        vertical: false,
                        children: [
                            brightnessLabel(),
                            brightnessSlider()
                        ]
                    }),

                    batteryLabel()
                ]
            }),

            // mprisClient()

            // Widget.Box({
            //     name: "notification-center-content",
            //     vertical: true,
            //     children: [
            //         // Widget.Box ({
            //         // className: "notifications",
            //         // style: "min-width: 1px;",
            //         // vertical: true,
            //         // binds: [["children", notifications, "popups",
            //         // popups => popups.map(notification)]]
            //         // })
            //     ]
            // })
        ]
    })
})

export default quickSettings