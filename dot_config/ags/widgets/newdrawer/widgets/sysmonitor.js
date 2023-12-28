import { Variable } from "resource:///com/github/Aylur/ags/variable.js";
import { Box, Label, ProgressBar } from "resource:///com/github/Aylur/ags/widget.js";
const divide = ([total, free]) => free / total;
const cpuValue = new Variable("0", {
    poll: [500, 'top -b -n 1', out => divide([100, out.split('\n')
                .find(line => line.includes('Cpu(s)'))
                .split(/\s+/)[1]
                .replace(',', '.')])]
});
const cpu = () => Box({
    vertical: false,
    children: [
        Label({
            className: "cpu-icon",
            label: "󰻠"
        }),
        ProgressBar({
            className: "cpu-progress",
            hexpand: true,
            value: cpuValue.bind()
        })
    ]
});
const ramValue = new Variable(0, {
    poll: [500, 'free', out => divide(out.split('\n')
            .find(line => line.includes('Mem:'))
            .split(/\s+/)
            .splice(1, 2))],
});
const ram = () => Box({
    vertical: false,
    children: [
        Label({
            className: "ram-icon",
            label: "󰘚"
        }),
        ProgressBar({
            className: "ram-progress",
            hexpand: true,
            value: ramValue.bind()
        })
    ]
});
function grep(string, patternToSearch) {
    const regexPatternToSearch = new RegExp("^.*(" + patternToSearch + ").*$", "mg");
    const match = string.match(regexPatternToSearch);
    return match;
}
const storageValue = new Variable(0, {
    // poll: [
    //     1000, "df -h", (out: string) => grep(out.toString(), "/home")
    //         .toString()
    //         .split(/ +/)[4]
    //         .slice(0, -1)
    // ],
    poll: [
        1000, "df -h", (out) => divide([
            grep(out.toString(), "/home")
                .toString()
                .split(/ +/)[1]
                .slice(0, -1),
            grep(out, "/home")
                .toString()
                .split(/ +/)[2]
                .slice(0, -1)
        ])
    ]
});
const storage = () => Box({
    vertical: false,
    children: [
        Label({
            className: "storage-icon",
            label: ""
        }),
        ProgressBar({
            className: "storage-progress",
            hexpand: true,
            value: storageValue.bind()
        })
    ]
});
const systemMonitor = () => Box({
    className: "quick-settings",
    vertical: true,
    children: [
        cpu(),
        ram(),
        storage()
    ]
});
export default systemMonitor;
