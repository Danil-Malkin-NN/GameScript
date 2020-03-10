const PROG = 0; // Запоминаем команды
const PLAY = 1; // Выполняем список команд
const EXEC = 2; // Выполняем одну команду из списка команд

const STEP_SIZE = 120; //
const width = 1200;
const height = 840;
const finishX =  STEP_SIZE*7,
	finishY = STEP_SIZE*5;

let state = PROG;

let scor = 0;

//alert("Пройдите уровень потратив как можно меньше топлива! Знайте, сниговики уменьшают количекство топлива которое вы потратили!");

var Command = function(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
};

Command.prototype.x = 0;
Command.prototype.y = 0;
Command.prototype.angle = 0;


let tr_top = 0;
let tr_left = 0;
function imagePos(X , Y, angle){
	let im = document.getElementById("tractor100");
	tr_top += X;
	tr_left += Y;
	
	im.style.transform = 'rotate(' + angle + 'deg)';
	im.style.top = (tr_top + "px");
	im.style.left = (tr_left + "px");
	cleanGrass(angle, "snow");
	cleanGrass(angle,"sugrob")
	score();
    finishGame();
}

let commands = [];

function stackCommandAdd(x, y, angle){
	if(state == PROG)
    	commands.push(new Command(x, y, angle));

}

function moveLeft() {
    stackCommandAdd(0, -STEP_SIZE, 270);
	stacComand("Влево");
}

function moveRight() {
    stackCommandAdd(0, STEP_SIZE, 90);
	stacComand("Вправо");
}

function moveDown() {
    stackCommandAdd(STEP_SIZE, 0, 180);
	stacComand("Вниз");
}

function moveUp() {
    stackCommandAdd(-STEP_SIZE, 0 ,0);
	stacComand("Вверх");
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
	stacComandClear();

}

//функция очистки земли
function cleanGrass(angle,canva){

    let canvas = document.getElementById(canva);
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
	for(let i = 0; i < sugrobXY.length; i++){
		if(sugrobXY[i][0]*STEP_SIZE == tr_left && sugrobXY[i][1]*STEP_SIZE == tr_top )
			scor -=240;
	}
	document.getElementById("score").innerText = ++scor + "потрачено топлива!";

}
function finishGame(){
	if( tr_left == finishX && tr_top == finishY){
		alert("Конец игры, ваш счёт : " + scor + " !!")
	}
	for(let i = 0; i < houseXY.length; i++){
		if(houseXY[i][0]*STEP_SIZE == tr_left && houseXY[i][1]*STEP_SIZE == tr_top ) {
			tr_top = 0;
			tr_left = 0;
			scor = 0;
			stacComandClear();
			clearS();
			alert("Эй, смотри куда едешь! строй алгоритм, что бы не наезжать на дома!!");
		}
	}



}

function stacComand(comand){
	if( state == PROG)
		document.getElementById("stacComand").innerText += comand + "\n";
}

function stacComandClear(){
	if( state == PROG)
		document.getElementById("stacComand").innerText = " ";
}
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

//Отрисовка Линий, снега, земли, сугробов, домов наверное тоже!

let houseXY = [];
let sugrobXY = [];

function generateMap(){
	let sugrob = new Image();
	let finish = new Image();
	let house = new Image();
	house.src = 'House.png';
	finish.src = 'Finish.png';
	sugrob.src = 'sugrob.png';
	sugrob.onload = function () {
		for(let i = 0; i < getRandomInt(10); i ++){
			houseXY.push([getRandomInt(10),getRandomInt(10)]);


		}

		let canvas = document.getElementById('sugrob');
		let context = canvas.getContext("2d");
		for(let i =0; i < sugrobXY.length; i++) {
			context.drawImage(sugrob, STEP_SIZE*sugrobXY[i][0], STEP_SIZE*sugrobXY[i][1], STEP_SIZE, STEP_SIZE);
		}

		for(let i =0; i < houseXY.length; i++) {
			context.drawImage(house, STEP_SIZE * houseXY[i][0], STEP_SIZE * houseXY[i][1], STEP_SIZE, STEP_SIZE);
		}
		context.drawImage(finish, finishX, finishY, STEP_SIZE, STEP_SIZE);
	}

}






window.onload = function() {





	generateMap();






	let snow = new Image();
	snow.onload = function(){
		let canvas = document.getElementById('snow');
		let context = canvas.getContext("2d");
		context.drawImage(snow, 0, 0, width, height);
	}
	snow.src = '1.png';

	//добавить тут замлю!
	let grass = new Image();
	grass.onload = function(){
		let canvas = document.getElementById('grass');
		let context = canvas.getContext("2d");
		context.drawImage(grass, 0, 0, width, height);
	}
	grass.src = "grass.png";

	let canvas = document.getElementById('grid');
	let context = canvas.getContext("2d");

	context.beginPath();
	context.lineWidth = 2;
	context.strokeStyle = 'red';
	for(let i = 0; i < height; i+= STEP_SIZE){
		context.moveTo(0, i);
		context.lineTo(width, i);

	}

	for(let i = 0; i < width; i+= STEP_SIZE){
		context.moveTo(i, 0);
		context.lineTo(i,height);

	}


	context.stroke();
}


