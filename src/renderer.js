;
export default class Renderer {
    constructor(eng) {
        this.eng = eng;
    }
    FrameRender(ctx, deltaT) {
        var particles = this.eng.GetParticles();
        particles.forEach(x => {
            let circle = new Path2D();
            circle.arc(x.X, x.Y, x.Radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = x.Color;
            ctx.fill(circle);
        });
    }
}
