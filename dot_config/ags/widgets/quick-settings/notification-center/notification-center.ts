import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import notifications from "resource:///com/github/Aylur/ags/service/notifications.js"
import notification from './notification.js'
import { execAsync, timeout } from 'resource:///com/github/Aylur/ags/utils.js'

timeout(500, () => execAsync([
    "notify-send",
    "Notification Center example",
    "to have panel do stuff",
    "pess esc to escape :)"
]).catch())

const notificationPopUp = () => Widget.Window ({
    name: "notification-popup",
    anchor: ["top", "right"],
    margin: [10, 10, 10, 10],
    child: Widget.Box ({
        className: "popupList",
        style: "min-width: 1px;",
        vertical: true,
        binds: [["children", notifications, "popups",
            popups => popups.map(notification)]]
    })
})

export default notificationPopUp()