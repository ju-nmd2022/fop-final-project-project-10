export default class Planet{
    constructor(star){
        this.star=star;
    }
    draw(){
        push();
        fill(255,255,255,Math.abs(Math.sin(this.star.a)*255));
        this.star.a+=0.02;
        strokeWeight(0); 
        ellipse(this.star.x,this.star.y,this.star.s);
        pop();  
    }
}