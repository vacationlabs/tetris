//Specify the Number of rows and columns
var rows = 20;
var cols = 12;
var padding = 25;
var canvas_width = 300;
var canvas_height = 500;
//Every individual block in the grid
function Blocks (pos_x,pos_y) {
	this.pos_x = pos_x;
	this.pos_y = pos_y;
	this.state = 0;
}
//This is the whole Grid
function Grid(rows,cols) {
	this.dimension = []; // Have an array here to hold all the values of the grid
	this.rows = rows;
	this.cols = cols;
}

function Shape_Square(){					
	this.dimension = [[1,1],
					  [1,1]];
	this.size_of = 2;
	this.rowSize = 2;
	this.colSize = 2;
	this.orientation = 0;
}

function Shape_T(){
	this.dimension = [[1,1,1],
					  [0,1,0]];
	this.size_of = 3;
	this.rowSize = 2;
	this.colSize = 3;
	this.orientation = 4;
}

function Shape_Z(){
	this.dimension = [[1,1,0],
					  [0,1,1]];
	this.size_of = 3;
	this.rowSize = 2;
	this.colSize = 3;
	this.orientation = 2;
}

function Shape_L(){
	this.dimension = [[1,1,1],
					          [0,0,1]];
	this.size_of = 3;
	this.rowSize = 2;
	this.colSize = 3;
	this.orientation = 2;
}

function Shape_I(){
	this.dimension = [[1,1,1]];
	this.size_of = 3;
	this.rowSize = 1;
	this.colSize = 3;
	this.orientation = 0;
}

function TempShape (size_of,rowSize,colSize) {
	this.dimension = [[0,0,0],
					  [0,0,0],
					  [0,0,0]];
	this.size_of = size_of;
	this.rowSize = rowSize;
	this.colSize = colSize;
}

//Decalres every element in the grid
Grid.prototype.init_grid = function() {
	for ( var i = 0; i < this.rows; i++ ){
		this.dimension[i] = [];
		for ( var j = 0; j < this.cols; j++ ){
			this.dimension[i][j] = new Blocks(i*padding,j*padding); 
		}
	}
}

//Temp Grid ( SuperImpose )
function Superimpose (rows,cols) {
	this.temp_grid = [];
	this.rows = rows;
	this.cols = cols;
}

//Grid Init
Superimpose.prototype.init_super = function() {
	for ( var i = 0; i < this.rows; i++ ){
		this.temp_grid[i] = [];
		for ( var j = 0; j < this.cols; j++ ){
			this.temp_grid[i][j] = new Blocks(i*padding,j*padding);
		}
	}
};

Superimpose.prototype.newShape = function(shape_object) {
	var valid_state = 0;
	for ( var i = 0; i < 3; i++ ){
		for ( var j = 0; j < 3; j++ ){
			if ( this.temp_grid[i][j] != 0 ){				//check if there is place before inserting objec
				valid_state = 1;
			}
		}
	}

	if (valid_state === 0){
		for ( var i = 0; i < 3; i++ ){
			for ( var j = 0; j < 3; j++ ){
				this.temp_grid[i][j] = shape_object[i][j];
			}
		}
	}
	else{
		console.log("Go cry to yer Momma");
	}
};


Superimpose.prototype.copyShape = function(shape_object){
	var state = 0;
	current_x = 0;
	current_y = 0;
	for ( var i = 0; i < shape_object.rowSize; i++ ){
		for ( var j = 0; j < shape_object.colSize; j++ ){
			// if ( this.collisionDetection(shape_object, i, j) ){
			 
				if ( shape_object.dimension[i][j] === 1){
						this.temp_grid[i][j].state = 1;
				}
			
		}
	}
	//Need to add test to check values of all properties of ShapeObjects [all]
	//superimpose.printSuper();
};

// document.onkeydown = function(e) {
//     e = e || window.event;
//     switch(e.which || e.keyCode) {
//  		case 37: // left
//  			move_left(t);
//  			superimpose.printSuper();
//         break;

//         case 38: // up
//         	superimpose.rotateShape(t,1);
//         	superimpose.printSuper();
//         break;

//         case 39: // right
//         	move_right(t);
//         	superimpose.printSuper();
//         break;

//         case 40: // down
        	
//         	move_down(t);
//        		superimpose.printSuper();
//         break;

//         case 33:  //page up
//         	superimpose.copyShape(t);			//leave the older shape on grid  and insert a new one at the top! 
//         	superimpose.printSuper();
//         break;

//         default:
//    		return; 
//     }
// }


Superimpose.prototype.printSuper = function() {
	for( var i = 0; i < canvas_height; i+=padding ){
		for ( var j = 0; j < canvas_width; j+=padding ){
			var m = i/padding; //Had to do this because of the Indexing, Yes it is a bitch
			var n = j/padding;
			if ( this.temp_grid[m][n].state === 1 ){
				ctx.fillStyle = "#f39c12";
			}
			else{
				ctx.fillStyle = "#3498db";
			}
			ctx.fillRect(j,i,padding,padding);
		}
	}	
};

Superimpose.prototype.rotateShape = function(shapeObject,rotationDegree) {
	var sandboxShape = new TempShape(shapeObject.size_of);
	// if ( rotationDegree >= shapeObject.orientation ){
	// 	rotationDegree = 0;
	// }
	for ( var i = current_x; i < current_x+shapeObject.rowSize; i ++ ){
		for ( var j = current_y; j < current_y+shapeObject.colSize; j++){
			this.temp_grid[i][j].state = 0;
		}
	}
	switch(rotationDegree){
		// case 0:
		// 	//Orientation : 0 degrees
		// 	for ( var i = 0; i < shapeObject.size_of; i++ ){
		// 		for ( var j = 0; j < shapeObject.size_of; j++ ){
		// 			sandboxShape.dimension[i][j] = shapeObject.dimension[i][j];
		// 		}
		// 	}
		// break;
		case 1:
			//Orientation : 90 degrees
			var m = 0;
			var n = 0;
			shapeObject.colSize= [shapeObject.rowSize, shapeObject.rowSize = shapeObject.colSize][0];
			// alert(shapeObject.colSize+" "+shapeObject.rowSize);
			// for ( var i = 0; i < shapeObject.size_of; i++,m++ ){
			// 	for ( var j = shapeObject.size_of - 1,n=0; j >=0; j--,n++ ){
			// 		sandboxShape.dimension[m][n] = shapeObject.dimension[i][j];
			// 		// alert(sandboxShape.dimension[m][n]);
			// 	}
			// }
			// alert("Running fine");
			for (var i = 0; i < shapeObject.rowSize; i++, m++ ){	
				for ( var j =shapeObject.colSize-1, n=0; j >=0; j--,n++ ){
					// alert(m+" "+n);
					sandboxShape.dimension[m][n] = shapeObject.dimension[j][i];
				}
			}
		break;
		// case 2:
		// 	//Orientation : 180 degrees
		// 	var m = 0;
		// 	var n = 0;
		// 	for ( var i = shapeObject.size_of-1; i >= 0; i--,m++ ){
		// 		for ( var j = shapeObject.size_of - 1,n=0; j >=0; j--,n++ ){
		// 			sandboxShape.dimension[m][n] = shapeObject.dimension[i][j];
		// 		}
		// 	}	
		// break;
		// case 3:
		// 	var m = 0;
		// 	var n = 0;
		// 	for ( var i = shapeObject.size_of-1; i >= 0; i--,m++ ){
		// 		for ( var j = 0,n=0; j < shapeObject.size_of; j++,n++ ){
		// 			sandboxShape.dimension[m][n] = shapeObject.dimension[j][i];
		// 		}
		// 	}
		// break;
	}
	for ( var i = 0; i < shapeObject.rowSize; i ++ ){
		shapeObject.dimension[i]=[];
		for ( var j = 0; j < shapeObject.colSize; j++ ){
			// alert(i+" "+j);
			// alert(shapeObject.dimension[i][j]);
			shapeObject.dimension[i][j]=0;
			// this.temp_grid[i][j].state=0;
			shapeObject.dimension[i][j]=sandboxShape.dimension[i][j];
		}
	}
	for ( var i = current_x, m = 0; i < current_x + shapeObject.rowSize; i ++,m++ ){
		for ( var j = current_y , n =0; j < current_y + shapeObject.colSize; j++,n++ ){
			superimpose.temp_grid[i][j].state = 0;
			superimpose.temp_grid[i][j].state = sandboxShape.dimension[m][n];
		}
	}

};
Grid.prototype.printGrid = function(superimpose_grid) {
	for ( var i = 0; i < canvas_height; i+=padding ){
		for ( var j = 0; j < canvas_width; j+=padding ){
			var m = i/padding;
			var n = j/padding;
			// Debugginf purposed
			if ( this.dimension[m][n].state === 1){
				ctx.fillStyle = "#f39c12";
			}
			else{
				ctx.fillStyle = "#3498db";
			}
			ctx.fillRect(j,i,padding,padding);
		}
	}
};

Grid.prototype.copySuperimpose = function(super_object) {
	for ( var i = 0; i < rows; ++i ){
		for ( var j = 0; j < cols; ++j ){
			if ( superimpose.temp_grid[i][j].state === 1 ){
				this.dimension[i][j].state = superimpose.temp_grid[i][j].state;
			}
		}
	}
};

//Function that returns random value between 1 and 4
// Superimpose.prototype.Generate_random_Shape = function(){
// console.log("Inside Gen Random shape");
// var gen = Math.floor((Math.random() * 5) + 1);
// console.log("Random number generated is "+gen);
// 	switch (gen)
// 	{
// 		case 1:
// 			var t = new Shape_T();
			
// 			superimpose.copyShape(t);
// 		break;

// 		case 2:
// 			var t = new Shape_L();
		
// 			superimpose.copyShape(t);
// 		break;

// 		case 3: 
// 			var t = new Shape_I();
		
// 			superimpose.copyShape(t);
// 		break;

// 		case 4:
// 			var t = new Shape_Z();
		
// 			superimpose.copyShape(t);
// 		break;

// 		case 5:
// 			var t = new Shape_Square();
		
// 			superimpose.copyShape(t);
// 		break;
// 	}
// }




Superimpose.prototype.collisionDetection = function(shapeObject,direction) {
	switch ( direction ){
		case "down":
			// var m=2;
			// var n=0;
			// var j = current_x + 2;
			// for ( var i = current_y; i <= current_y + 2; ++i, n++ ){
			// 	console.log(j);
			// 	console.log(i);
			// 	if ( (this.temp_grid[j+1][i].state === 1 && shapeObject.dimension[m][n] === 1) ){
			// 		return 1;				
			// 	}
			// 	else if (this.temp_grid[j][i].state === 1 && shapeObject.dimension[m-1][n] ===1) {
			// 		return 1;
			// 	} 
			// }

			// alert("It reaches here");
			for ( var i = 0,m = current_x; i < shapeObject.rowSize && m < current_x+shapeObject.rowSize ; i++,m++ ){
				console.log(i);
				console.log(m);
				var nextBlockShape = i + 1;
				var nextBlockGrid = m + 1;
				for ( var j = 0,n = current_y; j < shapeObject.colSize && n < current_y+shapeObject.colSize; j++,n++ ){
					console.log(j);
					console.log(n);
					console.log(nextBlockShape);
					console.log(shapeObject.rowSize);
					console.log(" ");
					if ( nextBlockShape >= shapeObject.rowSize  &&  nextBlockGrid >= current_x+shapeObject.rowSize ){
						if ( shapeObject.dimension[i][j] === 1 && this.temp_grid[nextBlockGrid][n].state === 1){
							console.log("HEYY in if collision ");
							return 1;
						}
					}
					else{
						if ( shapeObject.dimension[i][j] === 1 && shapeObject.dimension[nextBlockShape][j] === 0 ){
							if ( this.temp_grid[nextBlockGrid][n].state===1 ){
								console.log("HEYY in else collision");
								return 1;
							}
						}
					}
				}
			}


			break;
		case "right":
			for ( var i = 0, m = current_x; i < shapeObject.rowSize && m < current_x+shapeObject.rowSize; i++,m++){
				for ( var j = 0, n = current_y; j < shapeObject.colSize && n < current_y+shapeObject.colSize;j++,n++){
					var nextBlockShape = j + 1;
					var nextBlockGrid = n + 1;
					if ( nextBlockShape >= shapeObject.colSize && nextBlockGrid >= current_y+shapeObject.colSize){
						if ( shapeObject.dimension[i][j] === 1 && this.temp_grid[m][nextBlockGrid].state === 1){
							console.log("Cannot move");
							return 1;
						}
					}
					if ( shapeObject.dimension[i][j] === 1 && shapeObject.dimension[i][nextBlockShape] === 0){
						if ( this.temp_grid[m][nextBlockGrid].state === 1 ){
							console.log("Cannot move");
							return 1;
						}
					}
				}
			}
			break;
		case "left":
			var m=0;
			var n=0;
			var j = current_y;
			for ( var i = 0, m = current_x; i < shapeObject.rowSize && m < current_x+shapeObject.rowSize; i++,m++ ){
				for ( var j = shapeObject.colSize-1, n = current_y+shapeObject.colSize - 1; j>=0 && n>=current_y; j--,n--){
					var nextBlockShape = j - 1;
					var nextBlockGrid = n - 1;
					if ( nextBlockShape < 0 && nextBlockGrid < current_y ){
						if ( shapeObject.dimension[i][j] === 1 && this.temp_grid[m][nextBlockGrid].state === 1 ){
							console.log("Cannot move left");
							return 1;
						}
					}
					if ( shapeObject.dimension[i][j] === 1 && shapeObject.dimension[i][nextBlockShape] === 0){
						if ( this.temp_grid[m][nextBlockGrid].state === 1 ){
							console.log("Cannot move left");
							return 1;
						}
					}
				}
			}
			break;
	}
	return 0;
};

Superimpose.prototype.outOfBounds = function(shapeObject,direction) {
	switch(direction){
		case "down":
			var check = current_x + shapeObject.rowSize;
			if ( check >= rows ){
				
				// alert("Cannot Move Down");
				// this.copyShape(shapeObject);
				return 1;
			}
			break;
		case "right":
			var check = current_y + shapeObject.colSize;
			if ( check >= cols ){
				// alert("Cannot move right");
				return 1;
			}
			break;
		case "left":
			var check = current_y - 1;
			if ( check < 0 ){
				// alert("Cannot move left out of bounds");
				return 1;
			}
			break;
	}
	return 0;
};

// Superimpose.prototype.shapeManupilator = function(shapeObject,direction) {
// 	var sandboxShape = new TempShape(shapeObject.size_of);
// 	switch(direction){
// 		case "down":
// 			for ( i = 1; i < 3; i++ ){
// 				for ( j = 0; j < 3; j++ ){
// 					sandboxShape.dimension[i][j] = shapeObject.dimension[i-1][j];
// 				}
// 			}
// 			for ( i = 0; i < 3; i++ ){
// 				for ( j = 0; j < 3; j++ ){
// 					shapeObject.dimension[i][j];
// 					shapeObject.dimension[i][j] = sandboxShape.dimension[i][j];
// 				}
// 			}
// 			break;
// 		case "right":
// 			break;
// 		case "left":
// 			break;
// 	}
// };
// 	if ( state === 1 ){
// 		console.log("Invalid move");
// 	}
// };

// // Collision detection
// Superimpose.prototype.collisionDetection = function(shape_object,i,j) {
// 	if ( this.temp_grid[i][j] === 1 && shape_object.dimension[i][j] === 1 ){
// 		return 1;
// 	}
// 	return 0;
// };



var grid = new Grid(rows,cols);
grid.init_grid();
var superimpose = new Superimpose(rows,cols);
superimpose.init_super();
// var t = new Shape_I();

var canvas = document.getElementById("gridCanvas");
var ctx = canvas.getContext("2d");
//superimpose.copyShape(t);
grid.copySuperimpose(superimpose);
// for ( var i = 0; i < 300; i+=padding){
// 	for ( var j = 0; j < 500; j+=padding ){
// 		var m = i/padding; //Had to do this because of the Indexing, Yes it is a bitch
// 		var n = j/padding;
// 		if (superimpose.temp_grid[n][m].state === 1){
// 			ctx.fillStyle = "#f39c12";
// 		}
// 		else{
// 			ctx.fillStyle = "#3498db";
// 		}
// 		ctx.fillRect(i,j,padding,padding);
// 	}
// }

var ShapeL = new Shape_L();
var ShapeZ = new Shape_Z();
var ShapeI = new Shape_I();
var ShapeT = new Shape_T();
var ShapeSquare = new Shape_Square();

var ShapeArray = [ShapeL, ShapeZ, ShapeT, ShapeI, ShapeSquare];
var gen = Math.floor((Math.random() * 4) + 1);
superimpose.copyShape(ShapeArray[gen]);            //leave the older shape on grid  and insert a new one at the top! 
superimpose.printSuper();




var current_x = 0;
var current_y = 0;



function move_down(shape_object){
	//Check for collision/Out of BOunds
	console.log(gen);

	var bounds = superimpose.outOfBounds(shape_object,"down");
	if(bounds === 1){
		// superimpose.copyShape(shape_object);
		return 1;
		restart();
	}
	var collision = superimpose.collisionDetection(shape_object,"down");
	if(collision === 1){
		// superimpose.copyShape(shape_object);
		console.log("Collision Detected!")
		restart();
		return 1;
	}
	var m = 0;
	var n = 0;
	//First switch the current positions of the shape to 0
	for(i= current_x; i <current_x+ shape_object.rowSize; i++, m++) 
	{
		for(j= current_y; j< current_y + shape_object.colSize; j++, n++)
		{
			if(shape_object.dimension[m][n] === 1){ 		//CLEAR ONLY THE SHAPE, leave other blocks on grid
			superimpose.temp_grid[i][j].state = 0; }
		}
	n =0;
	}
	console.log("cleared");
	// console.log("\n");
	current_x+=1;
	m = 0;
	n=0;
	//Update all the blocks of the shape to their new position
	for(i= current_x; i <current_x+ shape_object.rowSize; i++,m++) 
	{
		for(j= current_y; j< current_y + shape_object.colSize; j++,n++)
		{
			if(superimpose.temp_grid[i][j].state != 1){			//if there is already something occupying the block but not colliding
			superimpose.temp_grid[i][j].state = shape_object.dimension[m][n];
			}
		}
		n=0;
	}
	
	return 0;
}

function move_left(shape_object){
	//Check for collision/Out of BOunds
	var bounds = superimpose.outOfBounds(shape_object,"left");
	if(bounds === 1){
		return 1;
	}
	var collision = superimpose.collisionDetection(shape_object,"left");
	if(collision === 1){
		return 1;
	}
	var m=0;
	var n=0;
	//First switch the current positions of the shape to 0
	for(i = current_x; i<current_x+shape_object.rowSize; i++, m++)
	{
		for(j= current_y; j< current_y + shape_object.colSize; j++, n++)
		{
			if(shape_object.dimension[m][n] === 1){ 		//CLEAR ONLY THE SHAPE, leave other blocks on grid
			superimpose.temp_grid[i][j].state = 0;  }
		}
	n=0;
	}

current_y--;		//Update the current positon of the square 
// alert("cleared");
m = 0;
n=0;
//Update all the blocks of the shape to their new position
	for(i= current_x; i <current_x+ shape_object.rowSize; i++,m++) 
	{
		for(j= current_y; j< current_y + shape_object.colSize; j++,n++)
		{
			if(superimpose.temp_grid[i][j].state != 1){			//if there is already something occupying the block but not colliding
			superimpose.temp_grid[i][j].state = shape_object.dimension[m][n];
			}
		}
		n=0;
	}
}	

function move_right(shape_object){
	//Check for collision/Out of BOunds
	var bounds = superimpose.outOfBounds(shape_object,"right");
	if(bounds === 1){
		return 1;
	}
	var collision = superimpose.collisionDetection(shape_object,"right");
	if(collision === 1){
		return 1;
	}
	var m=0;
	var n=0;
	//First switch the current positions of the shape to 0
	for(i = current_x; i<current_x+shape_object.rowSize; i++, m++)
	{
		for(j= current_y,n=0; j< current_y + shape_object.colSize; j++, n++)
		{
			if(shape_object.dimension[m][n] === 1){ 		//CLEAR ONLY THE SHAPE, leave other blocks on grid
			superimpose.temp_grid[i][j].state = 0;  }
		}
	}

current_y++;		//Update the current positon of the square 
console.log("cleared");
m = 0;
n=0;
//Update all the blocks of the shape to their new position
	for(i= current_x; i <current_x+ shape_object.rowSize; i++,m++) 
	{
		for(j= current_y,n=0; j< current_y + shape_object.colSize; j++,n++)
		{
			if(superimpose.temp_grid[i][j].state != 1){			//if there is already something occupying the block but not colliding
			superimpose.temp_grid[i][j].state = shape_object.dimension[m][n];
			}
		}
	}
}	

function end_of_game() {
	var sum_of_row =0;
	for(i=0; i<superimpose.rows; i++){
		for(j=0;j<superimpose.cols; j++){
				sum_of_row = sum_of_row +superimpose.temp_grid[i][j].state;
				if(sum_of_row === superimpose.cols){
					console.log("LINE "+i+" NEEDS TO BE REMOVED!!!!!!");
					clear_lines(i);

					return 1;
				} 		
		}
		console.log("SUM of row"+i+"="+sum_of_row);
		sum_of_row =0;
	}
	
	return 0;
}

function clear_lines(line){
		for(j=0;j<superimpose.cols;j++){
			superimpose.temp_grid[line][j].state = 0;  	//Assign the completed row to 0
		}
		superimpose.printSuper();
		for(i=line;i>0;i--){
			for(j=0;j<superimpose.cols;j++){
			superimpose.temp_grid[i][j].state = superimpose.temp_grid[i-1][j].state;
				}
		}
		for(var k=0; k<superimpose.cols; k++){
			superimpose.temp_grid[0][k].state=0;
				}	
		end_of_game();				//Calls end of game again to check for any more complete lines that need to be cleared.
}

// superimpose.printSuper();
// superimpose.Generate_random_Shape();
// alert("Row size of current obj is: "+t.rowSize);
// move_down(t);
// superimpose.printSuper();

// setInterval(function(){
// move_down(t);
// superimpose.printSuper();
// }, 1000);

// var score =0;

function restart(){
	alert("restart has been called ");
	for(var i=0; i<2; i++){
		for(var j=0; j<cols;j++){
			if(superimpose.temp_grid[i][j].state === 1){
					superimpose.init_super();
					superimpose.printSuper();
			}
		}
	}
}
