import app from "resource:///com/github/Aylur/ags/app.js";
import { Box, Revealer, Window } from "resource:///com/github/Aylur/ags/widget.js";
import quickSettings from "./widgets/quicksettings.js";
import systemMonitor from "./widgets/sysmonitor.js";
import shortcuts from "./widgets/shortcuts.js";
import logout from "./widgets/logout.js";
const drawer = () => Window({
    name: "ags-drawer",
    anchor: ["left"],
    // setup: self => self.poll(2000, () => {
    //     if (!self.revealChild) self.transition = "slide_left"
    //     else self.transition = "slide_right"
    //     self.revealChild = !self.revealChild
    // }),
    child: Box({
        // className: "drawer-content",
        vertical: true,
        child: Revealer({
            revealChild: true,
            transition: "slide_right",
            transitionDuration: 500,
            setup: self => self.hook(app, (self, wname, visible) => {
                // if (wname != "ags-drawer") return
                // if (visible) self.transition = "slide_left"
                // else self.transition = "slide_right"
                if (wname === "ags-drawer") {
                    // if (visible) self.transition = "slide_right"
                    // else self.transition = "slide_left"
                    self.revealChild = visible;
                }
            }, "window-toggled"),
            child: Box({
                className: "drawer-content",
                vertical: true,
                children: [
                    // Label({
                    //     className: "hi-corbin",
                    //     vpack: "start",
                    //     label: "Hello, Corbin."
                    // }),
                    quickSettings(),
                    systemMonitor(),
                    shortcuts(),
                    logout(),
                ]
            })
        }),
    })
});
export default drawer;
