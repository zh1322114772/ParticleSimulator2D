export default class Ball { 
    public X: number;
    public Y: number;

    public VX: number;
    public VY: number;

    public AX: number;
    public AY: number;

    public Radius: number;

    public Color: string;

    public Mass: number;

    public ID: number;

    constructor(id : number, radius : number, color: string, mass: number, x : number, y : number, vx : number, vy : number, ax : number, ay : number) { 
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