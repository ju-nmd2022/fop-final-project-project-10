export default class meteorite{
    constructor(M,lyp,fx,fy){
        this.M=M;
        this.lyp=lyp;
        this.fx=fx;
        this.fy=fy;

    }
    draw(){
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
            if(this.M.avp<15){
                this.M.avp+=0.01;  
            }
            if (keyIsDown(87)&&this.M.vp<30||keyIsDown(38)&&this.M.vp<30){
                this.M.vp+=0.2; 
            }
            else if (keyIsDown(83)&&this.M.vp>4||keyIsDown(40)&&this.M.vp>4){
                this.M.vp-=0.25;   
            }
            else{ 
                if(this.M.vp>this.M.avp){
                    this.M.vp-=0.1;   
                }
                else if(this.M.vp< this.M.avp){
                    this.M.vp+=0.1;   
                }
            }
            


        }
        else{
            this.M.y=this.M.y+this.lyp; //Refresh position

        }

        
    }
    judgement(){
        let distance=Math.pow((this.M.x-this.fx), 2)+Math.pow((this.fy+300-this.M.y),2);

        if(Math.pow(distance, 0.5)<50){
            // console.log("crush");
        } 
    }
}