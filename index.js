// console.log(1);
import player from "./player.js";
import meteorite from "./meteorite.js";
import enemies from "./enemies.js";
import Planet from "./Planet.js";
import nightSky from "./nightSky.js";

// object for class  
let fighter;
let NSO; //night Sky Object
let Planets;
let Met; //meteorite
let Enm; //enemies

// array
let Meteorites = [];
let Enemies = [];
let Ammo_array = [];
let stars = [];
let Mya= [-75,  -350, -800]; //M y position  array 

// Variable
const cx = 300; 
const cy = 450; 
const Max_width = 600;
const Max_hight = 950;
let Killed=0;  
let Kp;
let Fx=300; 
let lyp;//lat one Meteorite y position
let Mvp=5;//Meteorite velocity parameters(Control of real-time speed)
// let Mavp=0;//Meteorite automatic velocity parameters（Control speed reference Increasing with time）
let My ;//Meteorite y position
let index=0;

let playerLifeValue=100;//
let EarthY=cy-400;
let SaturnY=cy+400;
let MarsY=cy-2500;
let JupiterY=cy-1500;
let operationalStatus=-1;

    
// creat and push object in array of Meteorite Ammo Enemies and Star
for (let i = 0; i < 100; i++) {
    // Meteorite
    const Mx = Math.floor(Math.random() * 530)+25;
    
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
    const M = {x:Mx, y:My ,p:Pi, vp:Mvp};
    Meteorites.push(M); 
    // Ammo
    const A ={x:-10,y:cy+300,p:0};
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
for (let i = 0; i < 300; i++) {
    const star = {
        x : Math.floor(Math.random() * Max_width),
        y : Math.floor(Math.random() * Max_hight),
        s : Math.floor(Math.random() * 3),
        a : Math.random()
    };
    stars.push(star);
    Planets=new Planet(cx,EarthY,SaturnY,MarsY,JupiterY);
}


function setup(){
    createCanvas(600,900);
    frameRate(60);
}
window.setup = setup;

function basic_condition(){
    Fx = 300; 
    Mya = [-75,  -350, -800]; //M y position  array
    index = 0;    
    Killed = 0;                
    playerLifeValue=100;
    EarthY=cy-400;
    SaturnY=cy+400;
    MarsY=cy-2500;
    JupiterY=cy-1500;
    operationalStatus=-1;

    for (let i = 0; i < 100; i++){ 
        //refresh Meteorites position
        if(i<Mya.length){
            Meteorites[i].y =  Mya[i]; 
        }
        else{
            const Rem = i % Mya.length;
            const Int = parseInt(i/Mya.length); 
            Meteorites[i].y =  Mya[Rem]-Max_hight*Int;  
        } 
        //refresh Meteorites speed parameter
        Meteorites[i].vp = 5;

        // refresh Enemies poshition
        Enemies[i].y = -50;
        // refresh Ammo poshition
        Ammo_array[i].x=-10;
        Ammo_array[i].y=cy+300;
        Ammo_array[i].p=0;

    }

    fighter=new player(Fx,cy,Ammo_array);
} 


// main program
if( operationalStatus===-1 ){
    basic_condition();//Initialization
}

function draw(){  
    clear();
    background(29, 29, 29); 
    fixedScenes();

    if(operationalStatus===-1){
        startPage();
    }
    if(operationalStatus===0){
        creatEnemies();
        creatMeteorites();
        creatPlayer();
        Score();
    }
    if(operationalStatus===1){
        endPage();
    }
    
} 
window.draw = draw;

function mouseClicked(){
    if(operationalStatus===1){
        operationalStatus=-1;
        basic_condition();//refresh 
        // startPage();


    }else if(operationalStatus===-1){
        operationalStatus=0;
    }
            console.log(operationalStatus);


} 
window.mouseClicked = mouseClicked;


//function
function creatPlayer(){
    push(); 
    fighter.draw_ammo();
    fighter.attack(); 
    // pop();
    // push();
    fighter.draw();   
    fighter.move();
    pop();
}


function creatMeteorites(){
    Meteorites.forEach((M) =>{
        Met=new meteorite(M,lyp,fighter.x,fighter.y,playerLifeValue);
        Met.draw();
        Met.move();      
        Met.judgement();
        playerLifeValue=Met.playerLifeValue;
        if(Met.playerLifeValue<=0){
            operationalStatus=1;
        }
    });         
}

function creatEnemies(){

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
            }  
        });
    });  
    // console.log(Killed);

} 

function Score(){ 
    // console.log(Killed); 
    push();
    fill(255,255,255);
    textSize(15);
    text("Score: "+Killed*100, 24, 120);
    pop();
}

function fixedScenes(){
    stars.forEach((S)=>{
        NSO=new nightSky(S);
        NSO.draw();
    });
    Planets.draw();
    Planets.move();   
}

function startPage(){
    push();
    fill(255,255,255);
    textAlign(CENTER);
    textFont();
    textSize(40);
    text("start game", cx, cy);
    pop();
}

function endPage(){
    push();
    fill(255,255,255);
    textAlign(CENTER);
    textFont();
    textSize(40);
    text("You Final Score is "+Killed*100, cx, cy);
    pop();
}
