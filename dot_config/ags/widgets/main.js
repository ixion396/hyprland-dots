import bar from "./bar/bar.js";
import drawer from "./newdrawer/drawer.js";
import app from "resource:///com/github/Aylur/ags/app.js";
import * as Utils from "resource:///com/github/Aylur/ags/utils.js";
Utils.subprocess([
    "inotifywait",
    "--recursive",
    "--event", "create,modify",
    "-m", app.configDir + "/"
], () => {
    print("css reloaded");
    app.resetCss();
    app.applyCss(app.configDir + "/style.css");
}, () => {
    print("failed to reload css");
});
const windows = () => [
    // wallpaper(),
    // contextMenu(),
    // bar(),
    bar(),
    drawer(),
    // hoover(),
    // quickSettings(),
    // volumePopup()
    // appLauncher()    
];
export default {
    windows: windows().flat(2),
    style: app.configDir + "/style.css",
    maxStreamVolume: 1.05,
    cacheNotificationActions: true,
    closeWindowDelay: {
        "ags-drawer": 500
    }
};
