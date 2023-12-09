import PhyEng from "./PhyEng.js";
import Renderer from "./Renderer.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./global.js";
let ctx;
let frameCounter = 0;
let currentMsTime = new Date().getTime();
let previousMsTime = currentMsTime;
let secondCounter = 0;
let previousFrameCounter = 0;
let phyEng = new PhyEng();
let renderer = new Renderer(phyEng);
function main() {
    const canvas = document.getElementById("canvas_2d");
    canvas.height = SCREEN_HEIGHT;
    canvas.width = SCREEN_WIDTH;
    if (canvas.getContext("2d") == null) {
        alert("Canvas not supported");
        return;
    }
    ctx = canvas.getContext("2d");
    window.requestAnimationFrame(gameLoop);
}
function gameLoop() {
    //compute delta time
    currentMsTime = new Date().getTime();
    const deltaTime = currentMsTime - previousMsTime;
    //clean screen
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    //phy engine tick
    phyEng.Tick(deltaTime);
    //render frame
    renderer.FrameRender(ctx, deltaTime);
    //compute fps
    secondCounter += deltaTime;
    if (secondCounter >= 1000) {
        secondCounter -= 1000;
        document.title = "Simulator | FPS: " + (frameCounter - previousFrameCounter);
        previousFrameCounter = frameCounter;
    }
    window.requestAnimationFrame(gameLoop);
    frameCounter++;
    previousMsTime = currentMsTime;
}
main();
