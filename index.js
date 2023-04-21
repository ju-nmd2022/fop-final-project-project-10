import player from "./player.js";
import meteorite from "./Meteorite.js";

let fighter;
const cx = 300; 
const cy = 450; 
const Max_width = 600;
const Max_hight = 950;
            // console.log(1);    
let Fx; 
let Mya=[]; 
let lyp;//lat one y position
let Mvp;//Meteorite velocity parameters(Control of real-time speed)
let Mavp;//Meteorite automatic velocity parameters（Control speed reference Increasing with time）
let index;
let Meteorites = [];
let Met;

function setup(){
    createCanvas(600,900);
    frameRate(60);
}
window.setup = setup;

function basic_condition(){
    Fx = 300; 
    Mya = [-75,  -350, -850]; //Ma position y array
    index = 0;                                          
    for (let i = 0; i < 100; i++) {
            
        const Mx = Math.floor(Math.random() * 530)+25;
        Mavp = 5;  
        Mvp = 5;
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
        if (i===99){
            lyp=My;

        }
        const M = {x:Mx, y:My ,p:Pi, vp:Mvp, avp:Mavp};
        Meteorites.push(M); 
    }  
    fighter = new player(Fx,cy);


} 

// main program
basic_condition();

function draw(){  
    clear();
    background(29, 29, 29);  
    creat_Meteorites();
    fighter.draw();
    fighter.move();
         
} 
window.draw = draw;

function creat_Meteorites(){

    Meteorites.forEach((M) =>{
        Met=new meteorite(M,lyp);
        Met.draw();
        Met.move(); 
    });      
}
 
