const PROG = 0; // Запоминаем команды
const PLAY = 1; // Выполняем список команд
const EXEC = 2; // Выполняем одну команду из списка команд

const STEP_SIZE = 120; // px

let state = PROG;

let scor = 0;

var Command = function(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
};

Command.prototype.x = 0;
Command.prototype.y = 0;
Command.prototype.angle = 0;

const weidth = 1200;
const height = 840;
const finishX =  STEP_SIZE*7,
		finishY = STEP_SIZE*5;

let tr_top = 0;
let tr_left = 0;
function imagePos(X , Y, angle){
	let im = document.getElementById("tractor100");
	tr_top += X;
	tr_left += Y;
	
	im.style.transform = 'rotate(' + angle + 'deg)';
	im.style.top = (tr_top + "px");
	im.style.left = (tr_left + "px");
	cleanGrass(angle);
	score();
    finishGame();
}

let commands = [];

function stackCommandAdd(x, y, angle){
	if(state == PROG)
    	commands.push(new Command(x, y, angle));
    //console.log(commands);
}

function moveLeft() {
    stackCommandAdd(0, -STEP_SIZE, 270);
}

function moveRight() {
    stackCommandAdd(0, STEP_SIZE, 90);
}

function moveDown() {
    stackCommandAdd(STEP_SIZE, 0, 180);
}

function moveUp() {
    stackCommandAdd(-STEP_SIZE, 0 ,0);
}

let comandN;


function comandStart(){
	if (commands.length == 0)
	    return;
	
	if (state == PLAY) {
	    return;
	}
	if(state == PROG) {
	    let timeout = 10;
	    let command;
	    let deltaX, deltaY;
        let commandNumber = 0;
        let pxStepCounter = 0;
	    state = PLAY;
        setTimeout(function play() {
            switch (state) {
            case PLAY:
            	if (commandNumber < commands.length) {
                    command = commands[commandNumber];
                    commandNumber++;
                    deltaX = (command.x != 0) ? command.x / Math.abs(command.x) : 0;
                    deltaY = (command.y != 0) ? command.y / Math.abs(command.y) : 0;
                    pxStepCounter = Math.abs(command.x) + Math.abs(command.y);
                    state = EXEC;
                    setTimeout(play, timeout);
                } else {
                    clearS();
                    state = PROG;
                }
                break;
            
            case EXEC:
                if (pxStepCounter == 0) {
                    state = PLAY;
                } else {
                    imagePos(deltaX, deltaY, command.angle);
                    pxStepCounter--;
                }
                setTimeout(play, timeout);
                break;
            }
        }, timeout);
    }
}

//Очистка команд
function clearS(){
    commands = [];
    
}

//функция очистки земли
function cleanGrass(angle){
    let canvas = document.getElementById('snow');
	let context = canvas.getContext("2d");
	if(angle == 90){
        context.clearRect(tr_left + 70, tr_top, 50, STEP_SIZE); 
    }if(angle == 270){
         context.clearRect(tr_left, tr_top, 50, STEP_SIZE); 
    }if(angle == 180){
        context.clearRect(tr_left, tr_top + 70, STEP_SIZE, 50);
    }else{
        context.clearRect(tr_left, tr_top, STEP_SIZE,50);
    }
}
function score(){
	let doc = document.getElementById("score").innerText = scor++;

}
function finishGame(){
	if( tr_left == finishX && tr_top == finishY){
		alert("Конец игры, ваш счёт : " + scor + " !!")

	}

}

//Отрисовка Линий, снега, земли, сугробов, домов наверное тоже!
window.onload = function() {

	let sugrob = new Image();
	let finish = new Image();
	sugrob.onload = function() {
		let canvas = document.getElementById('sugrob');
		let context = canvas.getContext("2d");
		context.drawImage(sugrob, STEP_SIZE*2, STEP_SIZE*3, STEP_SIZE, STEP_SIZE);
		context.drawImage(sugrob, STEP_SIZE*2, STEP_SIZE*4, STEP_SIZE, STEP_SIZE);
		context.drawImage(finish, finishX, finishY, STEP_SIZE, STEP_SIZE);

	}
	finish.src = 'Finish.png';
	sugrob.src = 'sugrob.png';



	let snow = new Image();
	snow.onload = function(){
		let canvas = document.getElementById('snow');
		let context = canvas.getContext("2d");
		context.drawImage(snow, 0, 0, weidth, height);
	}
	snow.src = '1.png';

	//добавить тут замлю!
	let grass = new Image();
	grass.onload = function(){
		let canvas = document.getElementById('grass');
		let context = canvas.getContext("2d");
		context.drawImage(grass, 0, 0, weidth, height);
	}
	grass.src = "grass.png";

	let canvas = document.getElementById('grid');
	let context = canvas.getContext("2d");

	context.beginPath();
	context.lineWidth = 2;
	context.strokeStyle = 'red';
	for(let i = 0; i < height; i+= STEP_SIZE){
		context.moveTo(0, i);
		context.lineTo(weidth, i);

	}

	for(let i = 0; i < weidth; i+= STEP_SIZE){
		context.moveTo(i, 0);
		context.lineTo(i,height);

	}


	context.stroke();
}


