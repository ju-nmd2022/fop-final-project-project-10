export default class enemies{
    constructor(x,y){
        this.E=x;

        this.index=y;
    }
    draw(){
        if(this.E.y<=165){
            push(); 
            translate(this.E.x, this.E.y);
            scale(0.25);
            noStroke();
            rotate(PI / 1);
            fill(222, 222, 222);
            //head
            triangle(-20, -80, 0, -130, 20, -80);
            //body
            fill(169, 176, 186);
            quad(-20, -80, -20, 50, 20, 50, 20, -80);
            //body shadow
            fill(222, 222, 222);
            quad(-10, -80, -10, 50, 10, 50, 10, -80);
            //Left engine
            fill(100, 100, 100);
            quad(-65, 50, -65, 20, -40, 20, -40, 50);
            //Left wing
            fill(222, 222, 222);
            quad(-20, -50, -170, 0, -160, 25, -20, 20);
            //Left wing shadow
            fill(169, 176, 186);
            quad(-170, 0, -160, 25, -20, 20, -20, -25);
            //Right engine
            fill(100, 100, 100);
            quad(40, 50, 65, 50, 65, 20, 40, 20);
            //Right wing
            fill(222, 222, 222);
            quad(20, -50, 170, 0, 160, 25, 20, 20);
            //Right wing shadow
            fill(169, 176, 186);
            quad(20, -25, 20, 20, 160, 25, 170, 0);
            //tail
            fill(222, 222, 222);
            quad(-10, 90, -10, 50, 10, 50, 10, 90);
            //Left tailplane
            fill(222, 222, 222);
            quad(-55, 75, -45, 90, -10, 85, -10, 55);
            //Left tailplane shadow
            fill(169, 176, 186);
            quad(-50, 82, -45, 90, -10, 85, -10, 65);
            //Right tailplane
            fill(222, 222, 222);
            quad(10, 55, 10, 85, 45, 90, 55, 75);
            //Right tailplane shadow
            fill(169, 176, 186);
            quad(10, 65, 10, 85, 45, 90, 50, 82);
            pop();
        }
    }
    move(){
        if(this.E.y<165){
            this.E.y++;
        }
    }
}    