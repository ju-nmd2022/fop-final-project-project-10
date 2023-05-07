export default class player{
    constructor(x,y,a){
        this.x=x;
        this.y=y;
        this.a=a;
        this.index=0;
        this.time=0;
    }
    draw(){
        translate(this.x, this.y+300);
        scale(0.4);
        noStroke();
        fill(118, 118, 118);
        //head
        triangle(-20, -80, 0, -130, 20, -80);
        //body
        fill(112, 112, 112);
        quad(-20, -80, -20, 50, 20, 50, 20, -80);
        fill(118, 118, 118);
        quad(-10, -80, -10, 50, 10, 50, 10, -80);
        fill(100, 100, 100);
        quad(-65, 50, -65, 35, -40, 25, -40, 50);
        fill(118, 118, 118);
        quad(-20, -50, -130, 35, -100, 53, -20, 20);
        fill(108, 108, 110);
        quad(-115, 44, -100, 53, -20, 20, -20, -25);
        fill(100, 100, 100);
        quad(40, 50, 65, 50, 65, 30, 40, 25);
        fill(118, 118, 118);
        quad(20, -50, 130, 35, 100, 53, 20, 20);
        fill(108, 108, 110);
        quad(20, -25, 20, 20, 100, 53, 115, 44);
        fill(118, 118, 118);
        quad(-10, 90, -10, 50, 10, 50, 10, 90);
        fill(118, 118, 118);
        quad(-55, 75, -45, 90, -10, 85, -10, 55);
        fill(108, 108, 110);
        quad(-50, 82, -45, 90, -10, 85, -10, 65);
        fill(118, 118, 118);
        quad(10, 55, 10, 85, 45, 90, 55, 75);
        fill(108, 108, 110);
        quad(10, 65, 10, 85, 45, 90, 50, 82);
        
        
    }
    move() {
        // Fighter move
        if (keyIsDown(65)&&this.x>50||keyIsDown(37)&&this.x>50) {
            this.x-=5;
        }
        
        else if (keyIsDown(68)&&this.x<550||keyIsDown(39)&&this.x<550) {

            this.x+=5;

        }

    }
    draw_ammo(){
        for(let i=0; i < this.a.length; i++){
            if(this.a[i].y>=10){
                this.a[i].y-=this.a[i].p;
            }else{
                this.a[i].y=this.y+300;
                this.a[i].x=0;
                this.a[i].p=0;
            }
            push();
            translate(this.a[i].x, this.a[i].y);
            stroke(252, 79, 0);
            fill(247, 149, 64);
            quad(2, 0, 2, 10, -2, 10, -2, 0);
            pop();
        }
    }
    attack(){
        if(keyIsDown(32)){
            if(this.index<this.a.length){
                this.time++;
                if(this.time>=5){
                    this.a[this.index].x=this.x;
                    this.a[this.index].p=7.5;
                    this.index=this.index+1;    
                    this.time=0;
                }
            }else{
                this.index=0;
            }
        }else{
            this.time=5;
        }
    }
    
}