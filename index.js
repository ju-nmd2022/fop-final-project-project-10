const cx = 300; 
const cy = 450; 
const Max_width = 600;
const Max_hight = 950;
            // console.log(1);    
let Fx; 
let Mya=[]; 
let Mya2=[];
let Mvp;//Meteorite velocity parameters
let index;
let Meteorites = [];


function setup(){
    createCanvas(600,900);
    frameRate(60);
}
function basic_condition(){
    Fx = 300; 
    Mya = [-10, -100, -350,-700, -850]; 
    Mvp = 3;  
    index = 0;                                          
    for (let i = 0; i < 10; i++) {
            
        const Mx = Math.floor(Math.random() * 530)+25;

        let My ;
        if(i<Mya.length){
            My =  Mya[i]; 

        }
        else{
            const Rem = i % Mya.length;
            const Int = parseInt(i/Mya.length); 
            My =  Mya[Rem]-Max_hight*Int;  
        }
        let Pi = Math.random();
        Mya2.push(My);
        const M = {x:Mx, y:My ,p:Pi} ;
        Meteorites.push(M); 
    }                            
} 

// main program
basic_condition();

function draw(){  
    clear();

    background(29, 29, 29);  
    F_move();
    draw_Meteorites();
    Fighter();
} 



// Fighter
function Fighter(){
    translate(Fx, cy+300);
    scale(0.4);
    noStroke();
    fill(118, 118, 118);
    //head
    triangle(-20, -80, 0, -130, 20, -80);
    //body
    fill(112, 112, 112);
    quad(-20, -80, -20, 50, 20, 50, 20, -80);
    //
    fill(118, 118, 118);
    quad(-10, -80, -10, 50, 10, 50, 10, -80);
    //左引擎
    fill(100, 100, 100);
    quad(-65, 50, -65, 35, -40, 25, -40, 50);
    //左翅膀
    fill(118, 118, 118);
    quad(-20, -50, -130, 35, -100, 53, -20, 20);
    //左翅膀上面的
    fill(108, 108, 110);
    quad(-115, 44, -100, 53, -20, 20, -20, -25);
    //右引擎
    fill(100, 100, 100);
    quad(40, 50, 65, 50, 65, 30, 40, 25);
    //右翅膀
    fill(118, 118, 118);
    quad(20, -50, 130, 35, 100, 53, 20, 20);
    //右翅膀上面的
    fill(108, 108, 110);
    quad(20, -25, 20, 20, 100, 53, 115, 44);
    //尾巴
    fill(118, 118, 118);
    quad(-10, 90, -10, 50, 10, 50, 10, 90);
    //左尾翼
    fill(118, 118, 118);
    quad(-55, 75, -45, 90, -10, 85, -10, 55);
    //左尾翼上面的
    fill(108, 108, 110);
    quad(-50, 82, -45, 90, -10, 85, -10, 65);
    //右尾翼
    fill(118, 118, 118);
    quad(10, 55, 10, 85, 45, 90, 55, 75);
    //右尾翼上面的
    fill(108, 108, 110);
    quad(10, 65, 10, 85, 45, 90, 50, 82);
}
function F_move(){
    // Fighter move
    if (keyIsDown(65)||keyIsDown(37)&&Fx>50) {
        Fx-=5;
        // console.log(Fx);
    }
    else if (keyIsDown(68)||keyIsDown(39)&&Fx<550) {

        Fx+=5;
    }
}


// Meteorite
function Meteorite(M){
    if(M.y<950){   
        push(); 
        fill(255,255,255);
        translate(M.x, M.y);
        scale(2);
        rotate(10*PI*Math.abs(Math.sin(M.p)));
        M.p+=0.001;
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

// Meteorite move
function M_move(M,index){
    
    let qew = Mya2[index];
    if(M.y<950){

        M.y+=Mvp;
        if (keyIsDown(87)||keyIsDown(38)&&Mvp<30){
            Mvp+=0.01;   
        }
        else if (keyIsDown(83)||keyIsDown(40)&&Mvp>1){
            Mvp-=0.005;   
        }
        else{
            if(Mvp>2){
                Mvp-=0.001;   
            }
            else if(Mvp<2){
                Mvp+=0.1;   
            }
        }
    }

    else{
        M.y=M.y-950+qew*2; 


       
        

    }

}

function draw_Meteorites(){
    Meteorites.forEach((M, index) =>{
        // Mya[index]=M.y; 
        Meteorite(M);    
        M_move(M,index);

    });
      
}
