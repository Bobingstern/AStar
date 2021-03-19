let base
let maze = []


let cells_ = [];
let w;
let h;

let currCell;
let stack = [];

let done = false;


let test = []

function Cell_(x, y){
  this.x = x;
  this.y = y;
  this.isWall = true;
  
  this.getRandomNeighbour = function(){
    let neighbours = [];
    
    let top = cells_[this.x][this.y-2]; //top
    let right = cells_[this.x+2][this.y]; //right
    let bottom = cells_[this.x][this.y+2]; //bottom
    let left = cells_[this.x-2][this.y]; //left
    
    if(top && top.isWall){ //top
      neighbours.push(top);
    }
    if(right && right.isWall){ //right
      neighbours.push(right);
    }
    if(bottom && bottom.isWall){ //bottom
      neighbours.push(bottom);
    }
    if(left && left.isWall){ //left
      neighbours.push(left);
    }
    
    if(neighbours.length > 0){
      let randomIndex = Math.floor(Math.random()*neighbours.length);
      let randomNeighbour = neighbours[randomIndex];
      return randomNeighbour;
    }else{
      return null;
    }
  }
}


function removeWalls(cell1, cell2){
  let x = (cell1.x + cell2.x) / 2;
  let y = (cell1.y + cell2.y) / 2;
  cells_[x][y].isWall = false;
}

function iterate(){
  currCell.isWall = false;
  
  let next = currCell.getRandomNeighbour();
  
  if(next){
    stack.push(currCell);
    
    removeWalls(currCell, next); // remove walls between cells_
    
    currCell = next;
  }else if(stack.length > 0){
    currCell = stack.pop();
  }else{
    console.log("DONE!");
    console.log("width = "+w+", height = "+h);
    getWallCoordinates();
    done = true;
  }
}



function getWallCoordinates(){
  let walls = [];
  for (var i=0;i<cells_.length;i++){
    for (var j=0;j<cells_[i].length;j++){
      if (cells_[i][j].isWall){
        walls.push([i, j])
      }
    }
  }
  console.log(cells_.length, cells.length)

  let str = "[";
  for(let i=0; i<walls.length; i++){
    str += "[";
    str += walls[i][0];
    str += ",";
    str += walls[i][1];
    str += "], ";
  }
  str = str.substring(0, str.length-2);
  str += "]";
  obstacles = []
  for (var n=0;n<walls.length;n++){
    cells[walls[n][0]][walls[n][1]].obstacle = true
  }
  cells[1][1].visitable = true
  cells[1][1].obstacle = false
  
}


function Maze(){
  if(!done){
    while (!done){
      if(!done){
        iterate();
      }
    }
  }
  
  // draw cells_
  for(let x=0; x<w; x++){
    for(let y=0; y<h; y++){
      let cell = cells_[x][y];
      let drawX = cell.x * base;
      let drawY = cell.y * base;
      // draw cell
      if(cell == currCell && !done){
        fill(0, 255, 0);
      }else if(cell.isWall){
        fill(0);
      }else{
        fill(255);
      }
      noStroke();
      //rect(drawX, drawY, cellSize, cellSize);
    }
  }
}
