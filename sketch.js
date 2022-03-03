const total = 500;
var birds = [];
var savedBirds = [];
var p = [];
let counter = 0;

function setup(){
  createCanvas(400,400);
  for(let i = 0; i<total; i++){
      birds[i] = new Bird();
  }
   p.push(new pipe());

}

function draw(){
  background(0);
  for(let bird of birds){
  bird.show();
  bird.update();
  bird.think(p);
}
  if (birds.length === 0 ){
    counter = 0;
    nextGen();
    pipes = [];

  }

  if(frameCount % 150 == 0){
    p.push(new pipe());
  }
  counter ++;

  for (var i = p.length-1; i>=0; i--){
    p[i].show();
    p[i].update();
    for(let j = birds.length-1; j>=0; j--){
      if(p[i].hit(birds[j])){
        savedBirds.push(birds.splice(j,1)[0]);
    }
  }
    if (p[i].offscreen()){
      p.splice(i,1);
    }
  }

  for(let i = birds.length-1; i>=0; i--){
    if(birds[i].offscreen()){
      birds.splice(i,1);
    }
  }
}

//function keyPressed(){
  //if(key == " "){
    //birds.up();
  //}
//}
