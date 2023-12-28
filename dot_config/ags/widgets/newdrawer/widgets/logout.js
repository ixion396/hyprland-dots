import { Box, EventBox, Label } from "resource:///com/github/Aylur/ags/widget.js";
const logout = () => EventBox({
    className: "logout",
    vpack: "end",
    hexpand: true,
    child: Box({
        vertical: false,
        children: [
            Label({
                className: "logout-icon",
                label: "󰍃"
            }),
            Label({
                className: "logout-text",
                label: "End Hyprland Session"
            })
        ]
    })
});
export default logout;
