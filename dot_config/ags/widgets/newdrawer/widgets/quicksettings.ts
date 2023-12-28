import audio from "resource:///com/github/Aylur/ags/service/audio.js";
import { Box, Label, Slider } from "resource:///com/github/Aylur/ags/widget.js";
import brightness from "../../../services/brightness.js";

const volumeSlider = (type: string = "speaker") => Box({
    vertical: false,

    children: [
        Label({
            className: "volume-icon",
            label: "󰕾"
        }),
        Slider({
            className: "volume-slider",

            hexpand: true,
            drawValue: false,

            setup: self => self.hook(audio, () => {
                self.value = audio[type]?.volume || 0
            }, `${type}-changed`),

            onChange: ({ value }) => audio[type].volume = value
        })
    ]
})

const brightnessSlider = () => Box({
    vertical: false,

    children: [
        Label({
            className: "brightness-icon",
            label: "󰃠"
        }),

        Slider({
            className: "brightness-slider",

            hexpand: true,
            drawValue: false,

            setup: self => self.hook(brightness, () => {
                self.value = brightness.screen_value
            }, "screen-changed"),

            onChange: ({ value }) => brightness.screen_value = value
        })
    ]
})

const quickSettings = () => Box({
    className: "quick-settings",

    vertical: true,

    children: [
        // Label({
        //     className: "quick-settings-title",

        //     label: "Quick Settings"
        // }),
        volumeSlider(),
        brightnessSlider()
    ]
})

export default quickSettings