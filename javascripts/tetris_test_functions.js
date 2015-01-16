//Testing Move functions
// var t = new Shape_T();


// function display() {
// alert(superimpose.temp_grid[0] + "\n" + superimpose.temp_grid[1] + "\n" + superimpose.temp_grid[2] + "\n" + superimpose.temp_grid[3] + "\n" + superimpose.temp_grid[4] + "\n" + superimpose.temp_grid[5] + "\n" + superimpose.temp_grid[6] + "\n" + superimpose.temp_grid[7] + "\n" + superimpose.temp_grid[8] + "\n" + superimpose.temp_grid[9] + "\n" );
// }
function printGrid(){
for(var i = 0; i< rows; i++){
    for(var j =0; j <cols; j++){
        document.write(superimpose.temp_grid[i][j].state);
    }
    document.write("<br/>");
}
}
var condition = 0;
document.onkeydown = function(e) {
    e = e || window.event;
    switch(e.which || e.keyCode) {
 		case 37: // left
 			move_left(ShapeArray[gen]);
 			superimpose.printSuper();
            // printGrid();
        break;

        case 38: // up
        	superimpose.rotateShape(ShapeArray[gen],1);
        	superimpose.printSuper();
            //printGrid();
        break;

        case 39: // right
        	move_right(ShapeArray[gen]);
        	superimpose.printSuper();
            //printGrid();
        break;

        case 40: // down
        	condition = move_down(ShapeArray[gen]);
            if (condition === 1){
                gen = Math.floor((Math.random() * 4) + 1);
                end_of_game();
                superimpose.copyShape(ShapeArray[gen]);            //leave the older shape on grid  and insert a new one at the top! 
                
                //printGrid();
            }
            
       		superimpose.printSuper();
            //printGrid();
        break;

        // case 33:  //page up
        // 	superimpose.copyShape(ShapeArray[gen]);			//leave the older shape on grid  and insert a new one at the top! 
        // 	superimpose.printSuper();
        // break;

        default:
            // alert("Hello");
            break;

    }
}

var delay=500;//1 seconds
setInterval(function(){
    // alert("Runs");end_
    condition = move_down(ShapeArray[gen]);
    if (condition === 1){
        gen = Math.floor((Math.random() * 4) + 1);
        end_of_game();
        superimpose.copyShape(ShapeArray[gen]);            //leave the older shape on grid  and insert a new one at the top! 
        // alert(score);
        //printGrid();
    }
    
    superimpose.printSuper();
    // stx.fillText("Score is : "+score,20,50);
    
    
    },delay); 

// superimpose.copyShape(ShapeArray[gen]);

