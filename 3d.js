class ThreeD {
    constructor(xRate, phase, scale) {
        this.x = phase;
        this.z = 0;
        this.xRate = xRate;
        this.zRate = 0;
        this.scale = scale;
    }

    advance() {
        this.x += this.xRate;
        this.z += this.zRate;
    }

    getX() {
        let val = Math.sin(this.x);
        val += 1;
        val /= 2;
        return Math.ceil(val * this.scale);
    }

    getZ() {
        let val = Math.sin(this.z);
        val += 1;
        val /= 2;
        let adjusted = Math.floor(val * 4);
        return [".", "o", "*", "0"][adjusted];
    }
}

function render(ts) {
    let l = new Array(41).fill(" ");
    for (let x of ts) {
        l[x.getX()] = x.getZ();
    }
    
    // Select the output element on the page
    const outputElement = document.getElementById('output');
    
    // Append the new output to the output element
    outputElement.textContent += l.join("") + "\n";
    outputElement.scrollTop = outputElement.scrollHeight; // Scroll to bottom
}

function genList(number, phaseInc, startFrequency, frequencyInc) {
    let l = [];
    let scale = 40;
    let phase = 0;
    while (number > 0) {
        l.push(new ThreeD(startFrequency, phase, scale));
        number--;
        phase += phaseInc;
        startFrequency += frequencyInc;
    }
    return l;
}

const l = genList(10, 0.05, 0.05, 0.0005);

let lastTime = 0;
const frameDelay = 300; 

function printToShell(timestamp) {
    if (timestamp - lastTime > frameDelay) {    
        render(l);
        for (let x of l) {
            x.advance();
        }
    }

    // Use requestAnimationFrame to keep the process running
    requestAnimationFrame(printToShell);
}

// Start the animation loop
requestAnimationFrame(printToShell);
