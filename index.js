const Koji = {
    config: {
        settings: {
            name: 'Stop Watch',
            fontFamily: 'Helvetica'
        },
        colors: {
            backgroundColor: 'pink',
            textColor: 'grey'
        }
    }
}

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

document.body.style = `
    font-size: 16px;
    font-family: ${Koji.config.settings.fontFamily};
    background-color: ${Koji.config.colors.backgroundColor};
    color: ${Koji.config.colors.textColor};
`

const containerStyle = `
    display: flex;
    flex-direction: column;
`

const startStyle = `
    flex: 0;
    width: 100%;
    font-size: 2em;
`

const timeStyle = `
    flex: 1;
    width: 100%;
    font-size: 4em;
`

const resetStyle = `
    flex: 0;
    width: 100%;
    font-size: 2em;
`

let frame = 0;
let start = 0;
let elapsed = 0;
let running = false;

function update() {
    // update every 5 frames
    if (frame % 5 === 0) {
        // update elapsed time
        elapsed = Date.now() - start

        render()
    }

    frame = requestAnimationFrame(update)
}

function startTime() {
    if (start < 1) {
        start = Date.now()
    }

    update()
}

function stopTime() {
    cancelAnimationFrame(frame)
    render()
}

function startStopTime() {
    if (running) {
        running = false;
        stopTime()
    } else {
        running = true;
        startTime()
    }
}

function reset() {
    frame = 0;
    start = 0;
    elapsed = 0;
    running = false;
    render();
}

function formatedTime(duration) {
    return [
        Math.floor((duration / (1000 * 60)) % 60),
        Math.floor((duration / 1000) % 60),
        Math.floor((duration % 1000) / 10)
    ]
    .filter((t, idx) => t > 0 || idx > 0)
    .map(t => {
        let padded = `${t}`

        // left padding
        if (padded.length === 1 && t < 10) {
            padded = `0${padded}`
        }

        return padded;
    })
    .join(':')
}

function render() {
    document.body.innerHTML = `
        <div style="${containerStyle}">
            <div style="${startStyle}" onClick="startStopTime()">${running ? 'stop' : 'start'}</div>
            <div id="elapsed" style="${timeStyle}">${formatedTime(elapsed)}</div>
            <div style="${resetStyle}" onClick="reset()">reset</div>
        </div>
    `
}

render();