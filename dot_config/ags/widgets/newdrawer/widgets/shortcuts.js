import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";
import { Box, EventBox, Label } from "resource:///com/github/Aylur/ags/widget.js";
const shortcut = (icon, name, className, cmd) => EventBox({
    classNames: ["shortcut", className],
    onPrimaryClick: () => execAsync(cmd),
    child: Box({
        vertical: false,
        children: [
            Box({
                css: `background-image: url("${icon}");`
            }),
            Label(name)
        ]
    })
});
const shortcuts = () => Box({
    className: "shortcuts",
    vertical: true,
    children: [
        shortcut("/usr/share/icons/kora/apps/scalable/obsidian.svg", "Daily Note", "obsidian", "obsidian"),
        shortcut("/home/corbin/icons/googleclassroom.svg", "Google Classroom", "google-classroom", "firefox --private-window classroom.google.com"),
        shortcut("/home/corbin/icons/intellij.svg", "Realistic Cities", "realistic-cities", "intellij-idea-ultimate-edition '/home/corbin/Documents/Code/Realistic Cities/realisticcities/'"),
        shortcut("/home/corbin/icons/vscode.svg", "AGS Config", "ags-config", "code /home/corbin/.config/ags")
    ]
});
export default shortcuts;
