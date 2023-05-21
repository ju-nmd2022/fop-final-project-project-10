// refrence:
// https://pixelkind.github.io/foundationsofprogramming/programming/
// https://p5js.org/reference/
// https://github.com/ju-nmd2022/fop-lunar-lander-HaiyingWang22 ( Night sky and start end page style borrowed from my lunar lander assignment )


// import class
import player from "./player.js";
import meteorite from "./meteorite.js";
import enemies from "./enemies.js";
import Planet from "./Planet.js";
import nightSky from "./nightSky.js";

// object for class  
let fighterJet;
let NSO; //night Sky Object
let Planets;
let Met; //meteorite
let Enm; //enemies

// array
let Meteorites = [];
let Enemies = [];
let ammoArray = [];
let stars = [];
let Mya= [-75,  -350, -800]; //meteorite y position  array 

// Variable
const cx = 300; 
const cy = 450; 
const maxWidth = 600;
const maxHight = 950;
let bestScore=0;
if(localStorage.getItem("best") != null){
    bestScore = localStorage.getItem("best");// Reading bast score
}
let Killed=0;  
let killedParameter;
let Fx=cx; 
let lyp;//last one Meteorite y position
let Mvp=5;//Meteorite velocity parameters(Control speed)
let MetY ;//Meteorite y position
let playerLifeValue=100;
let EarthY=cy-400;
let SaturnY=cy+400;
let MarsY=cy-2500;
let JupiterY=cy-1500;
let operationalStatus=-1;

    
// creat and push object in array of Meteorite, Ammo, Enemies and Star
for (let i = 0; i < 100; i++) {

    // Meteorite
    const MetX = Math.floor(Math.random() * 530)+25;
    if(i<Mya.length){
        MetY =  Mya[i]; 
    }
    else{
        const Rem = i % Mya.length;
        const Int = parseInt(i/Mya.length); 
        MetY =  Mya[Rem]-maxHight*Int;  
    } 
    let Pi = Math.random(); 
    if (i===99){
        lyp=MetY;
    }
    const M = {x:MetX, y:MetY ,p:Pi, vp:Mvp};
    Meteorites.push(M); 

    // Ammo
    const A ={x:-10,y:cy+300,moveP:0};//
    ammoArray.push(A);

    // Enemies
    const Ey = -50;
    const Ex1 = Math.floor(Math.random() * 130)+50;//x position from 50 to 180
    let E ={x:Ex1,y:Ey};
    Enemies.push(E); 
    const Ex2 = Math.floor(Math.random() * 160)+220;//x position from 220 to 380
    E ={x:Ex2,y:Ey};
    Enemies.push(E); 
    const Ex3 = Math.floor(Math.random() * 130)+420;//x position from 420 to 450
    E ={x:Ex3,y:Ey};
    Enemies.push(E); 
}  
    // star
for (let i = 0; i < 300; i++) {
    const star = {
        x : Math.floor(Math.random() * maxWidth),
        y : Math.floor(Math.random() * maxHight),
        s : Math.floor(Math.random() * 3),
        a : Math.random()
    };
    stars.push(star);
}

// main program
function setup(){
    createCanvas(600,900);
    frameRate(60);
}
window.setup = setup;

if( operationalStatus===-1 ){
    initialisation();
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
        Planets.move();   
    }
    if(operationalStatus===1){
        endPage();
        Planets.move();   
    }
    
} 
window.draw = draw;

function mouseClicked(){
    if(operationalStatus===1){
        operationalStatus=-1;
        initialisation();//refresh 
    }else if(operationalStatus===-1){
        operationalStatus=0;
    }
    // console.log(operationalStatus);


} 
window.mouseClicked = mouseClicked;


// Functions to be called
function initialisation(){ //initialisat for restart game
    Fx = 300; 
    Killed = 0;                
    playerLifeValue=100;
    EarthY=cy-400;
    SaturnY=cy+400;
    MarsY=cy-2500;
    JupiterY=cy-1500;
    operationalStatus=-1;
    if(localStorage.getItem("best") != null){
        bestScore = localStorage.getItem("best");// Reading bast score
    }

    for (let i = 0; i < 100; i++){ 
        //refresh Meteorites position
        if(i<Mya.length){
            Meteorites[i].y =  Mya[i]; 
        }
        else{
            const Rem = i % Mya.length;
            const Int = parseInt(i/Mya.length); 
            Meteorites[i].y =  Mya[Rem]-maxHight*Int;  
        } 
        //refresh Meteorites speed parameter
        Meteorites[i].vp = 5;

        // refresh Enemies poshition
        Enemies[i].y = -50;
        // refresh Ammo poshition
        ammoArray[i].x=-10;
        ammoArray[i].y=cy+300;
        ammoArray[i].p=0;

    }
    fighterJet=new player(Fx,cy,ammoArray);
    Planets=new Planet(cx,EarthY,SaturnY,MarsY,JupiterY);
} 

function creatPlayer(){
    push(); 
    fighterJet.draw_ammo();
    fighterJet.attack(); 
    
    fighterJet.draw();   
    fighterJet.move();
    pop();
}


function creatMeteorites(){
    Meteorites.forEach((M) =>{
        Met=new meteorite(M,lyp,fighterJet.x,fighterJet.y,playerLifeValue);
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
        if(Killed%3===0){
            killedParameter=Killed;
        }
        Enm=new enemies(E,Enemies.indexOf(E),Killed,killedParameter,ammoArray);
        Enm.draw();
        Enm.move(); 
        Enm.judgement();
        Killed=Enm.killed;
    });  
} 

function Score(){ 
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
}

function startPage(){
    push();
    fill(255, 255, 255);
    textFont();
    textAlign(CENTER);
    push();
    textSize(70);
    text("Starstream", cx, cy); 
    pop();  
    textSize(16);
    text("You need control fighter jet to dodge meteorites." , cx, cy+180);
    text( "And shoot down enemies to score points.", cx, cy+200); 
    textSize(15);
    text("Click on the screen to start the game", cx, cy+320); 
    pop(); 
    if(bestScore>0){
        push();
        fill(255,215,0);
        textAlign(CENTER);
        textSize(20);
        text("The Bast Recoed is "+bestScore, cx, cy-200); 
        pop();
    }
}

function endPage(){
    push();
    fill(255,255,255);
    textAlign(CENTER);
    textFont();
    textSize(40);
    text("You Final Score is "+Killed*100, cx, cy);
    pop();
    if(Killed*100>bestScore){
        push();
        fill(255,215,0);
        textAlign(CENTER);
        textSize(20);
        text("The New Recoed ! ", cx, cy-200); 
        pop();
        localStorage.setItem ("best",Killed*100) ;// Writing bast score
    }
    push();
    fill(255,255,255);
    textAlign(CENTER);
    textFont();
    textSize(15);
    text("Click on the screen to restart the game ", cx, cy+300);
    pop();
}
