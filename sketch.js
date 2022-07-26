
var s = 20;
var tiles = [];
var walls = [];
var x = 00;
var y = 00;
var a = 0;
var n = 5;
var best = 0;
var moves = [[1,2],[2,1],[-1,2],[-2,1],[-1,-2],[-2,-1],[1,-2],[2,-1]]

function setup() {
  createCanvas(400, 400);
  makeWalls(n);
  frameRate(120);
}

function makeWalls(x){
  walls = [
    {x:-x-1,y:-x,w:2,h:x*2+2},
    {x:x+1,y:-x,w:2,h:x*2+3},
    {x:-x-1,y:-x,w:x*2+2,h:2},
    {x:-x-1,y:x+2,w:x*2+4,h:2}
  ]
  a = x*2*x*2;
}

function draw() {
  background(255);

  for(let i = 0; i<width/s; i++){
    for(let j = 0; j<height/s; j++){
      rect(i*s,j*s,s,s);
    }
  }
  
  push();
  translate(200+s/2,200+s/2);
  fill("#ffff00");
  ellipse(s*2,s,s/2,s/2);
  ellipse(-s*2,-s,s/2,s/2);
  ellipse(s,s*2,s/2,s/2);
  ellipse(-s,-s*2,s/2,s/2);
  ellipse(-s*2,s,s/2,s/2);
  ellipse(s*2,-s,s/2,s/2);
  ellipse(-s,s*2,s/2,s/2);
  ellipse(s,-s*2,s/2,s/2);
  pop();

  push();
  fill("#aeaeae");
  for(let i of walls){
    rect((i.x-x+width/s/2)*s,(i.y-y+width/s/2)*s,i.w*s,i.h*s)
  }
  pop();

  push();
  fill("#0000ff");
  for(let i of tiles){
    rect((i.x-x+width/s/2)*s,(i.y-y+width/s/2)*s,s,s)
  }
  pop();

  push();
  fill("#ff0000");
  ellipse(200+s/2,200+s/2,s/3*2);
  pop();

  //ai();

  let b = 0;
  for(let i of moves){
    let c = 1;
    let xx = i[0];
    let yy = i[1];
    for(let j of tiles){
      if(x + xx ==  j.x && y + yy ==  j.y){
        c = 0;
      }
    }
    for(let j of walls){
      if(x + xx >=  j.x && x + xx <  j.x + j.w && y + yy >=  j.y && y + yy <  j.y + j.h){
        c = 0;
      }
    }
    b += c;
  }

  if(b == 0){
    alert("you lose 😭 you filled " + 100 / a * tiles.length + "% your best is " + 100 / a * best + "%");
    if(tiles.length > best){
      best = tiles.length;
    }
    tiles = [];
    x = 0;
    y = 0;
  }

  if(tiles.length >= a){
    text("GOOD JOB!!!!",200,200);
    tiles = clean(tiles);
    n += 1;
    tiles = [];
    setTimeout(() => {
      tiles = [];
      x = 0;
      y = 0;
      makeWalls(n);
    }, 2000);
  }
}

function mousePressed(){
  var xx = round((mouseX - 200 - s / 2) / s);
  var yy = round((mouseY - 200 - s / 2) / s);

  for(let i of walls){
    if(x + xx >=  i.x && x + xx <  i.x + i.w && y + yy >=  i.y && y + yy <  i.y + i.h){
      return;
    }
  }

  for(let i of tiles){
    if(x + xx ==  i.x && y + yy ==  i.y){
      return;
    }
  }//*/

  

  if(xx == 2 && yy == 1){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == 2 && yy == -1){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == -2 && yy == 1){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == -2 && yy == -1){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == 1 && yy == 2){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == 1 && yy == -2){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == -1 && yy == 2){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == -1 && yy == -2){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  for(let i = 0 ; i < tiles.length - 1 ; i++){
    var t = tiles[i];
    if(t.x == tiles[tiles.length-1].x && t.y == tiles[tiles.length-1].y){
      tiles[i] = null;
    }
  }

  tiles = clean(tiles);
}

function clean(x){
  var y = [];
   
  for(let i of x){
    if(i){
      y.push(i);
    }
  }

  return y;
}

function ai(){

  var xx = round(random(-2,2));
  var yy = round(random(-2,2));

  for(let i of walls){
    if(x + xx >=  i.x && x + xx <  i.x + i.w && y + yy >=  i.y && y + yy <  i.y + i.h){
      return;
    }
  }

  for(let i of tiles){
    if(x + xx ==  i.x && y + yy ==  i.y){
      return;
    }
  }

  if(xx == 2 && yy == 1){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == 2 && yy == -1){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == -2 && yy == 1){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == -2 && yy == -1){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == 1 && yy == 2){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == 1 && yy == -2){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == -1 && yy == 2){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  if(xx == -1 && yy == -2){
    x += xx;
    y += yy;
    tiles.push({x:x,y:y});
  }

  for(let i = 0 ; i < tiles.length - 1 ; i++){
    var t = tiles[i];
    if(t.x == tiles[tiles.length-1].x && t.y == tiles[tiles.length-1].y){
      tiles[i] = null;
    }
  }

  tiles = clean(tiles);
}
