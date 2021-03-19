let cells = []
let cellSize = 10
let W
let H

let start = [0, 0]
let end
let finish = false
let bestv = 100000;
let curr = [0, 0]
function setup() {
  createCanvas(2000, 2000);
  W = width/cellSize
  H = height/cellSize
  end = [(width-cellSize*3)/cellSize, (height-cellSize*3)/cellSize]
  end2 = [(width-cellSize*3)/cellSize-3, (height-cellSize*3)/cellSize-3]

  for (var x=cellSize;x<width-cellSize;x+=cellSize){

    let temp = []
    for (var y=cellSize;y<height-cellSize;y+=cellSize){
      temp.push(new Cell(x, y))
    }
    cells.push(temp)
  }

  cells[start[0]][start[1]].visitable = true

  for (var i=0;i<cells.length;i++){
    for (var j=0;j<cells[i].length;j++){
      cells[i][j].calculateCosts()

      if (random(0, 1) < 0.3){

      }
    }
  }

  background(56);
  showCells()
  fill(0, 0, 255)

  //----
  w = end[0]
  h = end[1]


  // initialize cells_
  for(let x=0; x<w; x++){
    cells_[x] = [];
    for(let y=0; y<h; y++){
      cells_[x][y] = new Cell_(x, y);
    }
  }
  // fix invalid neighbour indexing problem
  cells_[-1] = [];
  cells_[-2] = [];
  cells_[w] = [];
  cells_[w+1] = [];

  // initialize starting cell
  currCell = cells_[1][1];



  Maze()
  for (var i=0;i<cells.length;i++){
    for (var j=0;j<cells[i].length;j++){
      if (j==0){
        //cells[i][j].obstacle = true
      }
    }
  }
  cells[start[0]][start[1]].obstacle = false


}

function showCells(){
  for (var i=0;i<cells.length;i++){
    for (var j=0;j<cells[i].length;j++){
      cells[i][j].show()
    }
  }
}


function reconstruct(cameFrom, current){

}

function AStar(){
  let bestF = 10000000
  let bestIn = [0, 0]
  for (var i=0;i<cells.length;i++){
    for (var j=0;j<cells[i].length;j++){
      if (cells[i][j].visitable && !cells[i][j].expanded && !cells[i][j].obstacle){
        if (cells[i][j].f < bestF){
          bestF = cells[i][j].f
          bestIn = [i, j]
        }
      }

    }
  }
  let prev = []
  if (dist(end2[0], end2[1], bestIn[0], bestIn[1]) >= 2){
    cells[bestIn[0]][bestIn[1]].show()
    cells[bestIn[0]][bestIn[1]].visitable = false
    cells[bestIn[0]][bestIn[1]].expanded = true
    if (bestIn[0] > 0){
      if (!cells[bestIn[0]-1][bestIn[1]].expanded){
      cells[bestIn[0]-1][bestIn[1]].visitable = true

      cells[bestIn[0]-1][bestIn[1]].myPrev = bestIn
      }


    }
    if (bestIn[0] < (width-cellSize*3)/cellSize){
      if (!cells[bestIn[0]+1][bestIn[1]].expanded){
      cells[bestIn[0]+1][bestIn[1]].visitable = true

      cells[bestIn[0]+1][bestIn[1]].myPrev = bestIn
    }
    }

    if (bestIn[1] > 0){
      if (!cells[bestIn[0]][bestIn[1]-1].expanded){
      cells[bestIn[0]][bestIn[1]-1].visitable = true

      cells[bestIn[0]][bestIn[1]-1].myPrev = bestIn
    }
    }
    if (bestIn[1] < (height-cellSize*3)/cellSize){
      if (!cells[bestIn[0]][bestIn[1]+1].expanded){
      cells[bestIn[0]][bestIn[1]+1].visitable = true

      cells[bestIn[0]][bestIn[1]+1].myPrev = bestIn
    }
    }
    curr = bestIn

  }
  else{
    finish = true
  }



//   cells[bestIn[0]][bestIn[1]].visitable = false

//   cells[bestIn[0]][bestIn[1]+1].visitable = true
//   cells[bestIn[0]-1][bestIn[1]+1].visitable = true


}


function draw() {
  for (var i=0;i<20;i++){
    if (!finish){
      AStar()
    }
    else{
      let on = curr
      if (on != [0, 0]){

        fill(255, 255, 0)
        rect(cells[on[0]][on[1]].x, cells[on[0]][on[1]].y, cellSize, cellSize)
        //console.log(on, cells[on[0]][on[1]].myPrev)
        curr = cells[on[0]][on[1]].myPrev
      }
    }
  }

}



class Cell{
  constructor(x, y){
    this.x = x
    this.y = y
    this.expanded = false
    this.visitable = false;
    this.f = 0
    this.obstacle = false
    this.myPrev = []

  }

  show(){
    if (!this.visitable){
      fill(255, 255, 255)
    }
    else{
      fill(0, 255, 0)
    }
    if (this.obstacle){
      fill(0, 0, 0)
    }
    noStroke()
    rect(this.x, this.y, cellSize, cellSize)
  }


  calculateCosts(){
    let g = dist(cells[start[0]][start[1]].x, cells[start[0]][start[1]].y, this.x, this.y)
    let h = dist(cells[end[0]][end[1]].x, cells[end[0]][end[1]].y, this.x, this.y)
    this.f = g+h

  }


}
