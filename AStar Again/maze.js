let cells_ = [];
let w;
let h;

let currCell;
let stack = [];

let done = false;

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
    let walls = []
    let points = []
    for(let x=0; x<w; x++){
    for(let y=0; y<h; y++){
      let cell = cells_[x][y];
      let drawX = cell.x * cellSize;
      let drawY = cell.y * cellSize;
      // draw cell
      if(cell == currCell && !done){
        fill(0, 255, 0);
      }else if(cell.isWall){
        fill(0);
        walls.push(cell)
      }
    }
  }
    //getWallCoordinates();
    done = true;
    for (var n=0;n<walls.length;n++){
      rect(walls[n].x*cellSize, walls[n].y*cellSize, cellSize, cellSize)
      for (var i=1;i<cells.length;i++){
        for (var j=1;j<cells[i].length;j++){
          if (cells[i][j].x == walls[n].x*cellSize && cells[i][j].y == walls[n].y*cellSize){
            //cells[i][j].obstacle = true
            cells[i][j].obstacle = true


          }
        }
      }
    }

    cells[0][0].obstacle = false
    cells[10][0].obstacle = false

  }


}

function getWallCoordinates(){
  let walls = [];
  for(let x=0; x<w; x++){
    for(let y=0; y<h; y++){
      let cell = cells_[x][y];
      if(cell.isWall){
        walls.push([cell.x, cell.y]);
      }
    }
  }

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
  console.log(str);

}

function Maze(){
  while(!done){
    for(let i=0; i<1000; i++){
      if(!done){
        iterate();
      }
    }
  }


}
