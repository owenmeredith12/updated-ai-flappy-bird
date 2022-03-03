
function pipe(){
  this.x = width;
  this.top = random(50,300);
  this.w = 30;
  this.speed = 2;
  this.gap = 150;
  this.bottom = this.top+this.gap;
  this.range = this.bottom - this.top;

  this.hit = function(Bird){
    if(Bird.y<this.top || Bird.y>this.bottom){
      if(Bird.x >this.x){
      return true;
    }
    if(this.x < Bird.x &&(Bird.y<this.top || Bird.y>this.bottom)){
      return false;
      }
    }
  }

  this.show = function(){
    fill(255);
    rect(this.x,0,this.w,this.top);
    rect(this.x,this.bottom,this.w,500);

  }

  this.update = function(){
    this.x -= this.speed;
  }

  this.offscreen = function(){
    if(this.x<0){
      return true;
    }else{
      return false;
    }
  }
}
