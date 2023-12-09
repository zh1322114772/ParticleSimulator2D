import Ball from "./Ball.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./global.js";
export default class PhyEng {
    constructor() {
        this.GRAVITY = 0.1;
        this.BOUNCE_FACTOR = 0.3;
        this.particles = new Array();
        this.maxBall = 1000;
    }
    overlapFix() {
        for (let thisParticleIndex = 0; thisParticleIndex < this.particles.length; thisParticleIndex++) {
            let thisParticle = this.particles[thisParticleIndex];
            let fixVx = 0;
            let fixVy = 0;
            for (let otherParticleIndex = 0; otherParticleIndex < this.particles.length; otherParticleIndex++) {
                if (otherParticleIndex == thisParticleIndex)
                    continue;
                let otherParticle = this.particles[otherParticleIndex];
                let distanceX = otherParticle.X - thisParticle.X;
                let distanceY = otherParticle.Y - thisParticle.Y;
                let r = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                let overlappedRadius = (thisParticle.Radius + otherParticle.Radius) - r;
                if (overlappedRadius > 0) {
                    fixVx += (otherParticle.X - thisParticle.X) * (overlappedRadius / r) * -0.5;
                    fixVy += (otherParticle.Y - thisParticle.Y) * (overlappedRadius / r) * -0.5;
                }
            }
            thisParticle.X += fixVx;
            thisParticle.Y += fixVy;
        }
    }
    applyVelocity(delta) {
        this.particles.forEach(x => {
            x.VX += x.AX;
            x.VY += x.AY;
            x.X += (x.VX * delta);
            x.Y += (x.VY * delta);
        });
    }
    borderCollisionOverlapFix() {
        this.particles.forEach(x => {
            let fixVx = 0;
            let fixVy = 0;
            if ((x.Radius - x.X) > 0)
                fixVx += (x.Radius - x.X);
            if ((x.Radius + x.X) > SCREEN_WIDTH)
                fixVx -= (x.Radius + x.X) - SCREEN_WIDTH;
            if ((x.Radius - x.Y) > 0)
                fixVy += (x.Radius - x.Y);
            if ((x.Radius + x.Y) > SCREEN_HEIGHT)
                fixVy -= (x.Radius + x.Y) - SCREEN_HEIGHT;
            x.X += fixVx;
            x.Y += fixVy;
        });
    }
    applyGravity(delta) {
        this.particles.forEach(x => {
            x.VY += this.GRAVITY * delta;
        });
    }
    borderCollision() {
        this.particles.forEach(x => {
            if ((x.Radius - x.X) >= 0)
                x.VX = -this.BOUNCE_FACTOR * x.VX;
            if ((x.Radius + x.X) >= SCREEN_WIDTH)
                x.VX = -this.BOUNCE_FACTOR * x.VX;
            if ((x.Radius - x.Y) >= 0)
                x.VY = -this.BOUNCE_FACTOR * x.VY;
            if ((x.Radius + x.Y) >= SCREEN_HEIGHT)
                x.VY = -this.BOUNCE_FACTOR * x.VY;
        });
    }
    particleCollision(delta) {
        for (let thisParticleIndex = 0; thisParticleIndex < this.particles.length; thisParticleIndex++) {
            let thisParticle = this.particles[thisParticleIndex];
            let fixVx = 0;
            let fixVy = 0;
            let collisions = 0;
            for (let otherParticleIndex = 0; otherParticleIndex < this.particles.length; otherParticleIndex++) {
                if (otherParticleIndex == thisParticleIndex)
                    continue;
                let otherParticle = this.particles[otherParticleIndex];
                let distanceX = otherParticle.X - thisParticle.X;
                let distanceY = otherParticle.Y - thisParticle.Y;
                let r = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
                let overlappedRadius = (thisParticle.Radius + otherParticle.Radius) - r;
                if (overlappedRadius >= 0) {
                    let dVx = (thisParticle.Mass * thisParticle.VX + otherParticle.Mass * otherParticle.VX) / (thisParticle.Mass + otherParticle.Mass);
                    let dVy = (thisParticle.Mass * thisParticle.VY + otherParticle.Mass * otherParticle.VY) / (thisParticle.Mass + otherParticle.Mass);
                    fixVx += dVx;
                    fixVy += dVy;
                    collisions++;
                }
            }
            if (collisions > 0) {
                thisParticle.VX = fixVx / collisions;
                thisParticle.VY = fixVy / collisions;
            }
        }
    }
    Tick(deltaT) {
        if ((Math.random() > 0.1) && (this.particles.length < this.maxBall)) {
            let direction = (350 + (Math.random() * 20)) * (Math.PI / 180);
            let velo = (Math.random() * 25) + 10;
            let grad = Math.floor(((this.particles.length / this.maxBall) * 0.55) * 256);
            this.particles.push(new Ball(this.particles.length, 1 + (Math.random() * 15), "rgb(" + grad + "," + grad + ",255)", 1, 200, 200, Math.cos(direction) * velo, Math.sin(direction) * velo, 0, 0));
        }
        if ((Math.random() > 0.1) && (this.particles.length < this.maxBall)) {
            let direction = (150 + (Math.random() * 20)) * (Math.PI / 180);
            let velo = (Math.random() * 25) + 10;
            let grad = Math.floor(((this.particles.length / this.maxBall) * 0.55) * 256);
            this.particles.push(new Ball(this.particles.length, 1 + (Math.random() * 15), "rgb(255," + grad + "," + grad + ")", 1, 1500, 200, Math.cos(direction) * velo, Math.sin(direction) * velo, 0, 0));
        }
        let deltaSecond = (deltaT / 16);
        this.particleCollision(deltaSecond);
        this.borderCollision();
        this.applyGravity(deltaSecond);
        this.applyVelocity(deltaSecond);
        //avoid overlap
        this.overlapFix();
        this.borderCollisionOverlapFix();
    }
    GetParticles() {
        return this.particles;
    }
}
