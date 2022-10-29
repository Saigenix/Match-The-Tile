const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const img = document.getElementById("img1");

canvas.height = window.innerHeight
canvas.width = window.innerWidth
let imgheight;
let imgwidth;
function updateImage(){
   imgheight = 300
   imgwidth = 300
}
updateImage();
//const img = new Image(imgwidth, imgheight);
//img.src = './assets/test.jpg';
//console.log(img.naturalHeight)

// rows and cols
const rows = 3;
const cols = 3;
// img.style.width = imgwidth
// img.style.height = imgheight
 //ctx.drawImage(img,0*(imgwidth/cols), 0*(imgheight/rows),img.naturalWidth/cols,img.naturalHeight/rows,0,0,imgwidth/cols,imgheight/rows);
 ctx.drawImage(img,0,350,imgwidth,imgheight);

// game Logic 
let board = []
let tiles = []

class Tile {
  constructor(index,img,i,j){
    this.index = index;
    this.img = img;
    this.i = i;
    this.j = j;
  }
  draw(ctx,ii,jj){
    ctx.drawImage(this.img,(imgwidth/cols)*this.i,(imgheight/rows)*this.j, ((imgwidth)/cols), (imgheight/rows),(imgwidth/rows)*ii,(imgheight/cols)*jj,imgwidth/cols,imgheight/rows);
  }
}
// break img in parts 
function init(){
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let index= j + i * rows
     //console.log(index)
     //ctx.drawImage(img,(imgwidth/cols)*i,(imgheight/rows)*j, ((imgwidth)/cols), (imgheight/rows),(imgwidth/rows)*i,(imgheight/cols)*j,imgwidth/cols,imgheight/rows);
     board.push(index);
     let tile = new Tile(index,img,i,j)
     //tile.draw(ctx);
     tiles.push(tile);
    } 
  }
  tiles.pop()
  board.pop()
  board.push(-1)
  //console.log(board)
  shuffleArray(board)
  draw()
}
init()
 //console.log(board)
// show the image
function draw(){
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let  index = j + i * rows;
      let tileI = board[index]
      if (tileI > -1){
        let tile = tiles[tileI]
       // console.log(i,j)
       // here i sent j , i because its distance 
        tile.draw(ctx,j,i);
      }
      
    }
    
  }
}
//console.log(board)
grid()
// show the grid 
function grid(){
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      ctx.strokeRect(i*(imgwidth/rows), j*(imgheight/rows), imgwidth/cols , imgheight/rows);
    }
    
  }
}
grid()


// shuffle 
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function move(i,j,arr){
 let blank = findblank();
 let blankRow = Math.floor(blank/rows)
 let blankCol = blank % cols
 //console.log(board)
 //console.log(blankRow,blankCol)
 if(isNeigbour(i,j,blankRow,blankCol)){
  swap(blank,j+i*rows,arr)
 }
ctx.clearRect(0, 0, canvas.width, canvas.height);
//console.log(board)
draw();
grid()
if(isSolved(arr)){
  alert("Ohh! hoo You Solved it🙌")
}
}

function isSolved(arr){
  for (let i = 0; i < arr.length-1; i++) {
    console.log(arr[i],tiles[i].index)
    if(arr[i] !== tiles[i].index){
      return false
    }
  }
  return true;
}

function isNeigbour(i,j,x,y){
  if(i !== x && j !== y){
    //console.log("f")
    return false;
  }
  if(Math.abs(i-x)==1 || Math.abs(j-y)==1){
    //console.log("true")
    return true
  }
  //console.log("f")
  return false
}

function findblank(){
  for (let i = 0; i < board.length; i++) {
    if (board[i] == -1) return i;
  }
}

// swap 

function swap(i,j,arr){
  temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// handle mouse
const getCursorPosition = (canvas, event) => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  //console.log(imgwidth/4,imgheight/4)
  //console.log("default",x, y)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if(((imgwidth/cols)*j) <= x && x <= ((imgwidth/cols)*j)+(imgwidth/cols) && ((imgheight/rows)*i) <= y && y <= ((imgheight/rows)*i)+(imgheight/rows)){
        //console.log(x, y)
        //console.log(i,j)
        move(i,j,board)
      }    
    } 
  } 
}

canvas.addEventListener('mousedown', (e) => {
  getCursorPosition(canvas, e)
})

const picker = document.getElementById("picker");
picker.addEventListener("change",(e) => {
  img.src = URL.createObjectURL(e.target.files[0]);
  console.log(img.width,img.height)
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // imgheight = img.naturalHeight
  // imgwidth = img.naturalWidth
  alert("Click on screen to see changes! Image should be in 200*200 px!")
  init()
  draw()
})