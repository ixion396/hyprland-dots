import app from "resource:///com/github/Aylur/ags/app.js"
import contextMenu from "./context-menu.js"
import { Box, EventBox, Overlay, Revealer, Window } from "resource:///com/github/Aylur/ags/widget.js"

// const currentWallpaper = () => {
//     let currentImage = `url("${app.configDir}/../../Pictures/wallpapers/tests/wallhaven-5wqjj3.jpg")`
//     let nextImage = `url("${app.configDir}./../../Pictures/wallpapers/tests/wallhaven-wed2qq.png")`

//     return EventBox({
//         css:
//             `background: cross-fade(50%, ${currentImage}, ${nextImage});`,

//         onPrimaryClick: self => {
//             self.toggleClassName("bcoll", true)
//         }
//     })

// }

const wallpaper = () => Window({
    name: "wallpaper",
    layer: "bottom",

    css: "background: none;",

    // child: Overlay({
    //     child: Box({
    //         css:
    //             "min-width: 1950px;" +
    //             "min-height: 1110px;"
    //     }),

    //     overlays: [
    //         currentWallpaper()
    //     ]
    // })
    child: EventBox({
        css: 
            "min-width: 1920px;" +
            "min-height: 1080px;" +
            "background: none;",

        onSecondaryClick: self => {
            contextMenu().visible = true    
        }
    })
    // child: Revealer({
    //     transitionDuration: 4000,
    //     transition: "slide_right",

    //     child: Box({
    //         className: "bcool",

    //         css:
    //              "min-width: 1920px;" +
    //              "min-height: 1080px;"
    //         //     "background-image: url('../../../../Pictures/wallpapers/tests/wallhaven-5wqjj3.jpg');"
    //     }),

    //     connections: [[2000, self => {
    //         self.revealChild = !self.revealChild
    //     }]]
    // })
})

export default wallpaper