export default class Planet{
    constructor(x){
        this.star=x;
    }
    draw(){
        push();
        fill(255,255,255,Math.abs(Math.sin(this.star.a)*255));
        strokeWeight(0); 
        ellipse(this.star.x,this.star.y,this.star.s);
        this.star.a+=0.02;
        pop();  
    }
}