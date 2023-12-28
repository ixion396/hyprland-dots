import { EventBox, Label, Window } from "resource:///com/github/Aylur/ags/widget.js";
import app from "resource:///com/github/Aylur/ags/app.js";
const hoover = () => Window({
    anchor: ["left"],
    css: "min-width: 600px; min-height: 1050px; background-color: white;",
    child: EventBox({
        onHover: () => {
            app.toggleWindow("ags-drawer");
        },
        onHoverLost: () => {
            app.toggleWindow("ags-drawer");
        },
        child: Label("jfksjdfjkjdslkjlkjdsfjlkj")
    })
});
export default hoover;
