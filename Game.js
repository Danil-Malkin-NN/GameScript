
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
	
    
}

let commands = [];

function stackCommandAdd(x, y, angle){
    commands.push(new Command(x, y, angle));
    console.log(commands);
}

let comandN;


function comandStart(){
	if (commands.length == 0)
		return;
		
    let commandNumber = 0;
    
    setTimeout(function handleCommand() {
        let command = commands[commandNumber];
        imagePos(command.x, command.y, 
		            command.angle);
		commandNumber++;
		if (commandNumber < commands.length) {
			setTimeout(handleCommand, 500);
		}
    }, 500);
}

function clearS(){
    commands = [];
    
}
 sizeSugX = 108;
 sizeSugY = 80;


window.onload = function() {
	let sugrob = new Image();
	sugrob.onload = function() {
		let canvas = document.getElementById('sugrob');
		let context = canvas.getContext("2d");
		context.drawImage(sugrob, sizeSugX, sizeSugY, sizeSugX, sizeSugY);
		context.drawImage(sugrob, sizeSugX*2, sizeSugY*2, sizeSugX, sizeSugY);
		context.drawImage(sugrob, sizeSugX*2, sizeSugY*3, sizeSugX, sizeSugY);
		context.drawImage(sugrob, sizeSugX*2, sizeSugY*4, sizeSugX, sizeSugY);
		context.drawImage(sugrob, sizeSugX*2, sizeSugY*5, sizeSugX, sizeSugY);
		context.drawImage(sugrob, sizeSugX*2, sizeSugY*6, sizeSugX, sizeSugY);
	}
	sugrob.src = 'sugrob.png';
	
	let snow = new Image();
	snow.onload = function(){
		let canvas = document.getElementById('snow');
		let context = canvas.getContext("2d");
		context.drawImage(snow, 0, 0, 1024, 766);
		
		
		
	}
	snow.src = '1.png';	 
}


	
	


