export default class Ball {
    constructor(id, radius, color, mass, x, y, vx, vy, ax, ay) {
        this.ID = id;
        this.Radius = radius;
        this.X = x;
        this.Y = y;
        this.AX = ax;
        this.AY = ay;
        this.VX = vx;
        this.VY = vy;
        this.Color = color;
        this.Mass = mass;
    }
}
