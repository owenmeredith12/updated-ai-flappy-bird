class Bird{
  constructor(brain){
  this.y = height/2;
  this.x = 50;
  this.g = .2;
  this.velocity = 0;
  this.lift = 3.5;
  this.score = 0;
  this.fitness = 0;
  if(brain){
    this.brain = brain.copy();
  }else{
  this.brain = new NeuralNetwork(5,15,1);
  }
}
  show(){
    fill(255);
    ellipse(this.x,this.y,16,16);
  }

  up(){
    this.velocity -= this.lift;
  }

  think(p){
    let closest = null;
    let closestD = Infinity;
    for(let i = 0; i<p.length; i++){
      let d = (p[i].x+ p[i].w) -this.x;
      if(d<closestD && d >0){
        closest = p[i];
        closestD = d;
      }
    }


    let inputs = [];
    inputs[0] = this.y/height;
    inputs[1] = closest.top/height;
    inputs[2] = closest.bottom/height;
    inputs[3] = closest.x/height;
    inputs[4] = this.velocity/5;

    let output = this.brain.predict(inputs);
    if(output[0]>.5){
      this.up();
    }
  }

  update(){
    this.score++;
    this.velocity += this.g;
    this.y += this.g+this.velocity;

  }

  mutate(){
    this.brain.mutate(0.5);
  }

  die(){
    console.log("game over")
    noLoop();
  }

  offscreen(){
    return(this.y>height || this.y<0);
  }
}
