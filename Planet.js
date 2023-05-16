export default class Planet{
    constructor(x,y1,y2,y3,y4){
        this.x=x;
        this.EarthY=y1;
        this.SaturnY=y2;
        this.MarsY=y3;
        this.JupiterY=y4;
    }
    draw() {
        //Earth
        push();
        translate(this.x-250, this.EarthY);
        scale(4);
        fill(0, 174, 255);
        strokeWeight(4);   
        stroke(39, 106, 206);
        circle(0, 0, 60);
        noStroke();
        fill(29, 140, 55);
        push();
        rotate(0.6);
        ellipse(20, 10, 20, 25);
        pop();
        push();
        rotate(0.5);
        ellipse(-23, 0, 23, 30);
        pop();
        ellipse(25, 7, 15, 20);
        push();
        rotate(0.4);
        ellipse(25, 6, 15, 20);
        pop();
        square(20, 15, 6, 20);
        square(21, 15, 6, 20);
        square(18, 18, 6, 20);
        square(10, -1, 15, 4);
        square(6, 5, 10, 4);
        pop();
      
        //Saturn
        push();
        translate(this.x, this.SaturnY);
        rotate(-0.4);
        scale(5);
        noStroke();
        fill(211, 189, 133);
        circle(0, 0, 70);
        fill(163, 136, 93);
        ellipse(0, 0, 130, 50);
        fill(211, 189, 133);
        push();
        rotate(-0.4);
        arc(0, 0, 70, 70, PI, QUARTER_PI, OPEN);
        pop();
        push();
        rotate(-0.9);
        arc(10, -17, 80, 100, HALF_PI, PI, OPEN);
        pop();
        pop();
      
        //Mars
        push();
        translate(this.x+150, this.MarsY);
        scale(5.0);
        stroke(124, 104, 61);
        strokeWeight(3);
        fill(204, 170, 85);
        circle(0, 0, 40);
        pop();
        
        //Jupiter
        push();
        translate(this.x-200, this.JupiterY);
        rotate(0.4);
        scale(3.6);
        stroke(196, 123, 74);
        strokeWeight(6);
        fill(239, 206, 160);
        circle(0, 0, 80); 
        line(-40, 0, 40, 0);
        strokeWeight(4);
        line(-35, 15, 35, 15);
        strokeWeight(3);
        line(-38, -12, 38, -12);
        line(-19, 33, 19, 33);
        strokeWeight(6);
        line(-23, -32, 23, -32);
        pop();
    }

    move(){
        if(this.EarthY<1200){
            this.EarthY+=0.5; 
        }else{
            this.EarthY=-2800;
        }

        if(this.SaturnY<1200){
            this.SaturnY+=0.5; 
        }else{
            this.SaturnY=-2800;
        }

        if(this.MarsY<1200){
            this.MarsY+=0.5; 
        }else{
            this.MarsY=-2800;
        }
        
        if(this.JupiterY<1200){
            this.JupiterY+=0.5; 
        }else{
            this.JupiterY=-2800;
        }
    }
}