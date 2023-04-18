const cx = 300; 
const cy = 450; 
const Max_width = 600;
let Fx; 
let Mx;
let My;

function setup(){
    createCanvas(600,900);
}
function basic_condition(){
    Fx = 300;  
} 
// main program
basic_condition();

function draw(){  
    clear();
    background(29, 29, 29);  
    move();
    Fighter();
} 

function Fighter(){
    push(); 
    fill(255,255,255);
    triangle(Fx, cy+250, Fx-20, cy+310, Fx+20, cy+310);
    pop();
}
function Meteorite(){
    push(); 
    fill(255,255,255);
    rect(Mx, My, 10, 10);
    pop();
}

function move(){
    // Fighter move
    if (keyIsDown(65)||keyIsDown(37)&&Fx>50) {
        Fx-=5;
        // console.log(Fx);
    }
    else if (keyIsDown(68)||keyIsDown(39)&&Fx<550) {

        Fx+=5;
    }
    // Meteorite move

}
// function Meteorite(){
//     push(); 
//     fill(255,255,255);
//     rect(Mx, My, 10, 10);
//     pop();
// }
