// import quickSettings from './widgets/quick-settings/quick-settings.ts';
// import bar from './widgets/bar/bar.ts';
// import mprisClient from './widgets/mpris/mpris.ts';
// export default {
//     closeWindowDelay: {
//         'window-name': 500, // milliseconds
//     },
//     notificationPopupTimeout: 5000, // milliseconds
//     cacheNotificationActions: false,
//     maxStreamVolume: 1.5, // float
//     style: App.configDir + "/style.css",
//     windows: [
//         bar(),
//         // quickSettings(),
//         // mprisClient(),
//     ],
// };
const expectedVersion = "1.0";
let config = {};
config = (await import("./widgets/main.js")).default;
export default config;
