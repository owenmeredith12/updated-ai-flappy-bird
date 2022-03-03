var gen = 0;
function nextGen(){
  calcfit();
  for(let i = 0 ; i<total; i++){
    birds[i] = pickOne();
  }
  savedBirds = [];

}

function calcfit(){
  let sum = 0;
  for (let bird of savedBirds){
    sum+= bird.score;
    //console.log(bird.score);
  }
  for (let bird of savedBirds){
    bird.fitness = bird.score/sum;
    //console.log(bird.fitness);
  }
}

function pickOne(){

  var index = 0;
  var r = random(1);

  while(r>0){
     r-=savedBirds[index].fitness;
    index++;
  }
  index--;



  let bird = savedBirds[index];
  let child = new Bird(bird.brain);
  child.mutate();
  return child;
}
