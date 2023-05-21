export default class meteorite{
    constructor(M,lyp,fx,fy,playerLifeValue){
        this.M=M;
        this.lyp=lyp;
        this.fx=fx;
        this.fy=fy;
        this.playerLifeValue=playerLifeValue;
    }
    draw(){
        push();
        fill(255,255,255);
        textSize(15);
        text("Airframe integrity: "+this.playerLifeValue+"%", 24, 75);
        pop();
        push();
        fill(220,20,60);
        rect(20, 85, this.playerLifeValue*2, 10, 10);
        pop();
        if(this.M.y<950){   
            push(); 
            fill(255,255,255);
            translate(this.M.x, this.M.y);
            scale(2);
            rotate(10*PI*Math.abs(Math.sin(this.M.p)));
            this.M.p+=0.001;
            noStroke();
            fill(115, 112, 104);
            circle(0, 0, 25);
            fill(161, 155, 142);
            circle(0, 0, 20);
            fill(115, 112, 104); 
            ellipse(6, 7, 4.6, 4);
            ellipse(-7, -6, 6.2, 5.4);
            ellipse(-6, 4, 9, 8);
            ellipse(5, -5, 10, 11.8);
            ellipse(8.5, 1, 2.5, 2.5);
            pop();
        }
    }
    move(){
        if(this.M.y<950){
            this.M.y+=this.M.vp;
            if(this.M.vp<=20){
                this.M.vp+=0.01;   
            }
        }
        else{
            this.M.y+=this.lyp; //Refresh position
        }
    }
    judgement(){
        let distance=Math.pow((this.M.x-this.fx), 2)+Math.pow((this.fy+300-this.M.y),2);
        if(Math.pow(distance, 0.5)<50){
            if(this.playerLifeValue>=0){
                this.playerLifeValue-=2;
            }
        } 
    }
}