
var config = {
	pallet : {
		size : 25
	},
	positions : [
		{
			x:510,//1
			y:208
		},
		{
			x:615,//2
			y:208
		},
		{
			x:660,//3
			y:208
		},
		{
			x:590,//4a
			y:268
		},
		{
			x:700,//4b
			y:268
		},
		{
			x:810,//5b
			y:208
		},
		{
			x:730,//5a
			y:268
		},
		{
			x:2270,//moveout
			y:268
		},
	]
}
/* 
Some global variables. Globals are undesired but will go for now
pallets - an array of bites defining where exist a pallet
pallet - a d3 svg object which we can move. consider to have an array instead to have multiple pallets

*/
var pallets = [1,1,1,1,1];
var myPallets = new Array(5);
var pallet;
var loadPallet = false;
var palletZone2 = false;
var palletZone3 = false;
var palletZone4 = false;
var palletZone5 = false;
var x = new XMLHttpRequest();

/**function to add a pallet. 
*/

var socket = io();
 var at5 = false;
  
 socket.on("NotificationData", function(Data) {
 
 console.log("myData", Data);
 
 if(Data.id == "Z1_Changed" && Data.senderID == "CNV5"){
     add_pallet1();
 }
 else if(Data.id == "Z2_Changed" && Data.senderID == "CNV5"){
	move_pallet12();
 }
 else if(Data.id == "Z3_Changed" && Data.senderID == "CNV5"){
	move_pallet23();
	at5 = false;
 }
 else if(Data.id == "Z5_Changed" && Data.senderID == "CNV5"){
	if(at5 == false){
		move_pallet35();
		
	}
	else if(at5 == true){
		move_pallet45();
		at5 = false;
	}
}
 else if(Data.id == "Z4_Changed" && Data.senderID == "CNV5"){
	move_pallet14();
	at5 = true;
 }
	
});


function add_pallet1(){
	if(!loadPallet){
	var svg = d3.select('svg'); // get root svg object to add pallets in it
	pallet = svg.append('rect') // create a pallet and assign to the pallet 
		.attr("x" , config.positions[0].x) 		// NB! as you can see prev line does not have semicolon
		.attr("y" , config.positions[0].y) 		// NB! and in current lines you are using .attr()
		.attr("width" , config.pallet.size) 	// NB! which means that the operatiosn will be done on
		.attr("height" , config.pallet.size); 	// NB! the same object.
		
		loadPallet = true;
		myPallets[0] = pallet;
		
		
		x.open('POST', 'http://130.230.141.228:3000/RTU/CNV4/services/TransZone45', true);
		x.send();
		
	};
};


function move_pallet12(){
	if(loadPallet && !palletZone2){
		
	loadPallet = false;
	palletZone2 = true;
	myPallets[1] = myPallets[0];
	
	myPallets[1].transition() // movement is to be done on the d3 object created in add_pallet1(). You will need to use .transitions().
		.attr("x",config.positions[1].x) 	//assigning new values
		.attr("y",config.positions[1].y)
		.duration(1000);					//defining how long the duration will take
		
		x.open('POST', 'http://130.230.141.228:3000/RTU/CNV5/services/TransZone12', true);
		x.send();
	};
};

function move_pallet23(){
	
	if(palletZone2 && !palletZone3){
	palletZone2 = false;
	palletZone3 = true;
	myPallets[2] = myPallets[1];
	
	myPallets[2].transition() // movement is to be done on the d3 object created in add_pallet1(). You will need to use .transitions().
		.attr("x",config.positions[2].x) 	//assigning new values
		.attr("y",config.positions[2].y)
		.duration(1000);					//defining how long the duration will take
		
		x.open('POST', 'http://130.230.141.228:3000/RTU/CNV5/services/TransZone23', true);
		x.send();
	};
};

function move_pallet35(){
	
	if(palletZone3 && !palletZone5){
		
	palletZone3 = false;
	palletZone5 = true;
	myPallets[4] = myPallets[2];
	
		myPallets[4].transition() // movement is to be done on the d3 object created in add_pallet1(). You will need to use .transitions().
		.attr("x",config.positions[5].x) 	//assigning new values
		.attr("y",config.positions[5].y)
		.duration(1000);					//defining how long the duration will take
		
		x.open('POST', 'http://130.230.141.228:3000/RTU/CNV5/services/TransZone35', true);
		x.send();
	};
};

function move_pallet14_a(){
		myPallets[3].transition() // movement is to be done on the d3 object created in add_pallet1(). You will need to use .transitions().
		.attr("x",config.positions[3].x) 	//assigning new values
		.attr("y",config.positions[3].y)
		.duration(1000);					//defining how long the duration will take
};
function move_pallet14_b(){
		myPallets[3].transition() // movement is to be done on the d3 object created in add_pallet1(). You will need to use .transitions().
		.attr("x",config.positions[4].x) 	//assigning new values
		.attr("y",config.positions[4].y)
		.duration(1000);					//defining how long the duration will take
};

function move_pallet14(){
	if(loadPallet && !palletZone4){
		
		loadPallet = false;
		palletZone4 = true;
		myPallets[3] = myPallets[0];
		
		move_pallet14_a();
		setTimeout(move_pallet14_b, 1000)
		
		x.open('POST', 'http://130.230.141.228:3000/RTU/CNV5/services/TransZone14', true);
		x.send();
	};
};

function move_pallet45_a(){
		myPallets[4].transition() // movement is to be done on the d3 object created in add_pallet1(). You will need to use .transitions().
		.attr("x",config.positions[6].x) 	//assigning new values
		.attr("y",config.positions[6].y)
		.duration(1000);					//defining how long the duration will take
};

function move_pallet45_b(){
		myPallets[4].transition() // movement is to be done on the d3 object created in add_pallet1(). You will need to use .transitions().
		.attr("x",config.positions[5].x) 	//assigning new values
		.attr("y",config.positions[5].y)
		.duration(1000);					//defining how long the duration will take
}


function move_pallet45(){
	if(palletZone4 && !palletZone5){
		
		palletZone4 = false;
		palletZone5 = true;
		myPallets[4] = myPallets[3];
		
		move_pallet45_a();
		setTimeout(move_pallet45_b, 1000)
		
		x.open('POST', 'http://130.230.141.228:3000/RTU/CNV5/services/TransZone45', true);
		x.send();
	};
};

function move_palletout(){
	if(palletZone5){
		palletZone5 = false;
		myPallets[4].transition() // movement is to be done on the d3 object created in add_pallet1(). You will need to use 
		.attr("x",config.positions[7].x) 	//assigning new values
		.attr("y",config.positions[7].y)
		.duration(1000);					//defining how long the duration will take
		
		x.open('POST', 'http://130.230.141.228:3000/RTU/CNV6/services/TransZone12', true);
		x.send();
	};
};