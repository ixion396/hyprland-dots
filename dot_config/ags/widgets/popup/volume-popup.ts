import { Box, Label, Slider, Window } from "resource:///com/github/Aylur/ags/widget.js";
import {Variable} from "resource:///com/github/Aylur/ags/variable.js";
import audio from "resource:///com/github/Aylur/ags/service/audio.js";

// const volume = Variable("0.0", {
//     listen: [""]
// })

const volumePopup = () => Window({
    name: "volume-popup",
    anchor: ["bottom", "right"],
    margins: [32, 32, 32, 32],
    visible: false,
    
    child: Box({
        className: "volume-popup",
        vertical: true,

        children: [
            Label({
                className: "volume",

                label: "Volume",
                justification: "left"    
            }),

            Slider({
                className: "slider",

                vertical: false,
                drawValue: false,

                onChange: value => audio.speaker.volume = value,

                connections: [[audio, self => {
                    self.visible = true
                    self.value = audio?.speaker.volume || 0
                }, `speaker-changed`]]
            })
        ]
    })
})

export default volumePopup