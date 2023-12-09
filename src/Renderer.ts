import PhyEng from "./PhyEng.js";

;
export default class Renderer
{ 
    private eng: PhyEng;

    constructor(eng : PhyEng){ 
        this.eng = eng;
    }

    public FrameRender(ctx: CanvasRenderingContext2D, deltaT : number) { 
        
        var particles = this.eng.GetParticles();

        particles.forEach(x => {
            let circle = new Path2D();
            circle.arc(x.X, x.Y, x.Radius, 0, 2 * Math.PI, false);

            ctx.fillStyle =x.Color;
            ctx.fill(circle);
        });
    }

}

