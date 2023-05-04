import player from "./player.js";
import meteorite from "./meteorite.js";
import enemies from "./enemies.js";
  
let fighter;
let Ammo;
const cx = 300; 
const cy = 450; 
const Max_width = 600;
const Max_hight = 950;
            // console.log(1);
let Killed;  
let Kp;
let Fx; 
let Mya=[]; 
let lyp;//lat one y position
let Mvp;//Meteorite velocity parameters(Control of real-time speed)
let Mavp;//Meteorite automatic velocity parameters（Control speed reference Increasing with time）
let index;
let Meteorites = [];
let Enemies = [];
let Ammo_array = [];
let Met;
let Enm;

function setup(){
    createCanvas(600,900);
    frameRate(60);
}
window.setup = setup;

function basic_condition(){
    Fx = 300; 
    Mya = [-75,  -350, -800]; //M y position  a rray
    index = 0;    
    Killed = 0;                

    for (let i = 0; i < 100; i++) {
        // Meteorite
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
        // Ammo
        const A ={x:0,y:cy+300,p:0};
        Ammo_array.push(A);
        // Enemies
        const Ey = -50;
        const Ex1 = Math.floor(Math.random() * 150)+50;
        let E ={x:Ex1,y:Ey};
        Enemies.push(E); 
        const Ex2 = Math.floor(Math.random() * 200)+200;
        E ={x:Ex2,y:Ey};
        Enemies.push(E); 
        const Ex3 = Math.floor(Math.random() * 150)+400;
        E ={x:Ex3,y:Ey};
        Enemies.push(E); 


    }  
    fighter=new player(Fx,cy,Ammo_array);
    // console.log(Enemies);

} 

// main program
basic_condition();

function draw(){  
    clear();
    background(29, 29, 29);  
    creat_Meteorites();
    creat_enemies();
    push(); 
    fighter.draw_ammo();
    fighter.attack(); 
    pop();
    push();
    fighter.draw();   
    fighter.move();
    pop();
} 
window.draw = draw;

function creat_Meteorites(){

    Meteorites.forEach((M) =>{
        Met=new meteorite(M,lyp,fighter.x,fighter.y);
        Met.draw();
        Met.move();      
        Met.judgement();
    });         
}
function creat_enemies(){

    Enemies.forEach((E) =>{
        Enm=new enemies(E,Enemies.indexOf(E));
        Enm.draw();
        if(Killed%3===0){
            Kp=Killed;
            if(Enemies.indexOf(E)>=Kp&&Enemies.indexOf(E)<Kp+3){
                Enm.move(); 
            }
        }else{
            if(Enemies.indexOf(E)>=Kp&&Enemies.indexOf(E)<Kp+3){
                Enm.move(); 
            }
        }
        //judgement
  
        Ammo_array.forEach((A)=>{ 
            let distance=Math.pow((E.x-A.x), 2)+Math.pow((A.y-E.y),2);
            if(Math.pow(distance, 0.5)<20){
                E.y=1000;
                Killed++;
                console.log(Killed); 

            } 
        });
    });  
    // console.log(Killed);

}


