const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint=Matter.Constraint;

var engine,world
var ball,ground
var chain
var boxes=[]
var groundImg,backgroundImg
var largestNum=[]
//walls of container
var leftWall,rightWall;
var leftEdge,rightEdge;
var submitButton
var gameState="play"
var returnedValues=[]
var acsendingButton,descendingButton


function preload(){
  groundImg=loadImage("ground.jpg")
  backgroundImg=loadImage("background2.png")
}



function setup(){
  createCanvas(1200,600)

  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES)

  ball=new Ball(300,470)

  ground=Bodies.rectangle(600,580,1200,40,{isStatic:true});
  World.add(world,ground)

  chain=new Sling({x:200,y:300},ball.body)

  for(var i=0;i<5;i++){
    boxes.push(new Box(400,i*40))
  }
  findLargestNumber(boxes)

  leftWall=new Wall(1000,410,5,300)
  rightWall=new Wall(1070,410,5,300);

  leftEdge=new Wall(1201,300,1,600)
  rightEdge=new Wall(-1,300,1,600)

  submitButton=createButton("SUBMIT")

  acsendingButton=createButton("Ascending Order")
  descendingButton=createButton("Descending Order")

}



function draw(){
  background("lightblue")
  Engine.update(engine)

  //rectMode(CENTER)
  //rect(ground.position.x,ground.position.y,1200,40)

  imageMode(CENTER)
  image(groundImg,ground.position.x,ground.position.y,1200,100)



  ball.display()
  chain.display()

  for(var i=0;i<boxes.length;i++){
    boxes[i].display()
  }

  leftWall.display()
  rightWall.display()

  submitButton.position(1000,100)
  submitButton.style('background','lightgreen')

  acsendingButton.position(100,100)
  acsendingButton.style('background','red')
  acsendingButton.style('width','100px')

  descendingButton.position(100,200)
  descendingButton.style('background','red')
  descendingButton.style('width','100px')

  if(frameCount===100){
    Matter.Body.applyForce(ball.body,ball.body.position,{x:1,y:2})
  }

  //feedbacks
  push()
  fill("orange")
  textSize(30)
  text("Stack The Numbers Between Pillars",620,250)
  pop()

  if(gameState==="play"){
    fill("green")
    textSize(30)
    text("Choose Your Option",70,50)
  }

  if(gameState==="descending"){
    fill("orange")
    textSize(30)
    text("Arrange In Descending Order(Bottom To Top)",400,100)
  }

  else if(gameState==="ascending"){
    fill("orange")
    textSize(30)
    text("Arrange In Ascending Order(Bottom To Top)",400,100)
  }

  else if(gameState==="correct"){
    fill("orange")
    textSize(30)
    text("Amazing You Have Done It Correct",400,100)
  }

  else if(gameState==="wrong"){
    fill("orange")
    textSize(30)
    text("Oops! It Seems You Have Done It Wrong",400,100)
  }

  acsendingButton.mousePressed(()=>{
    gameState="ascending"
    acsendingButton.hide()
    descendingButton.hide()
  })

  descendingButton.mousePressed(()=>{
    gameState="descending"
    descendingButton.hide()
    acsendingButton.hide()
  })

  submitButton.mousePressed(()=>{ 
    if(gameState==="ascending"){
      checkAscendingOrder()
    }
    else if(gameState==="descending"){
      checkDescendingOrder()
    }
})


  drawSprites()
}



function findLargestNumber(arr){
    var currentLargestNumber=-101
    var firstLargestNum
    var secondLargestNum
    var thirdLargestNum;
    var fourthLargestNum;
    var fifthLargestNum

    //to find first largest number
    for(var j=0;j<arr.length;j++){
      if(arr[j].number>currentLargestNumber){
        currentLargestNumber=arr[j].number
      }
    }

    firstLargestNum=currentLargestNumber;
    largestNum.push(firstLargestNum)
    currentLargestNumber=-101;

    //to find second largest number
    for(var j=0;j<arr.length;j++){
      if(arr[j].number!==firstLargestNum && arr[j].number>currentLargestNumber){
        currentLargestNumber=arr[j].number
      }
    }

    secondLargestNum=currentLargestNumber;
    largestNum.push(secondLargestNum)
    currentLargestNumber=-101;

    //to find third largest number
    for(var j=0;j<arr.length;j++){
      if(arr[j].number!==firstLargestNum && arr[j].number!==secondLargestNum && arr[j].number>currentLargestNumber){
        currentLargestNumber=arr[j].number
      }
    }

    thirdLargestNum=currentLargestNumber;
    largestNum.push(thirdLargestNum)
    currentLargestNumber=-101;

    for(var j=0;j<arr.length;j++){
      if(arr[j].number!==firstLargestNum && arr[j].number!==secondLargestNum && arr[j].number!==thirdLargestNum && arr[j].number>currentLargestNumber){
        currentLargestNumber=arr[j].number
      }
    }

    fourthLargestNum=currentLargestNumber;
    largestNum.push(fourthLargestNum)
    currentLargestNumber=-101;

    //to find firfth largest number
    for(var j=0;j<arr.length;j++){
      if(arr[j].number!==firstLargestNum && arr[j].number!==secondLargestNum && arr[j].number!==thirdLargestNum && arr[j].number!==fourthLargestNum){
        currentLargestNumber=arr[j].number
      }
    }

    fifthLargestNum=currentLargestNumber;
    largestNum.push(fifthLargestNum)
    currentLargestNumber=-101;
  }



function mouseDragged(){
  if(gameState!=="play"){
  for(var k=0;k<boxes.length;k++){
    if(mouseX-boxes[k].body.position.x<boxes[k].width&&
      boxes[k].body.position.x-mouseX<boxes[k].width&&
      mouseY-boxes[k].body.position.y<boxes[k].height&&
      boxes[k].body.position.y-mouseY<boxes[k].height){
        Matter.Body.setPosition(boxes[k].body,{x:mouseX,y:mouseY}) 
    } 
  }
}
}


function checkDescendingOrder(){
 
   submitButton.hide()
   
   for(var i=0;i<boxes.length;i++){
     if(boxes[i].body.position.x>1000 && boxes[i].body.position.x<1060){

       if(boxes[i].body.position.y>520 && boxes[i].body.position.y<550 && boxes[i].number===largestNum[0]){
        returnedValues.push(true)
       }

       else if(boxes[i].body.position.y>470  && boxes[i].body.position.y<500 && boxes[i].number===largestNum[1]){
        returnedValues.push(true)
       }

       else if(boxes[i].body.position.y>420  && boxes[i].body.position.y<450 && boxes[i].number===largestNum[2]){
        returnedValues.push(true)
       }

       else if(boxes[i].body.position.y>370  && boxes[i].body.position.y<400 && boxes[i].number===largestNum[3]){
        returnedValues.push(true)
       }

       else if(boxes[i].body.position.y>320  && boxes[i].body.position.y<350 && boxes[i].number===largestNum[4]){
        returnedValues.push(true)
       }

       else{
         returnedValues.push(false)
       }
     }
   }

   
   if(returnedValues[0]===true && returnedValues[1]===true && returnedValues[2]===true && returnedValues[3]===true && returnedValues[4]===true){
     gameState="correct"
   }

   else{
     gameState="wrong"
   }
 
}


function checkAscendingOrder(){
  for(var i=0;i<boxes.length;i++){
    if(boxes[i].body.position.x>1000 && boxes[i].body.position.x<1060){

      if(boxes[i].body.position.y>520 && boxes[i].body.position.y<550 && boxes[i].number===largestNum[4]){
       returnedValues.push(true)
      }

      else if(boxes[i].body.position.y>470  && boxes[i].body.position.y<500 && boxes[i].number===largestNum[3]){
       returnedValues.push(true)
      }

      else if(boxes[i].body.position.y>420  && boxes[i].body.position.y<450 && boxes[i].number===largestNum[2]){
       returnedValues.push(true)
      }

      else if(boxes[i].body.position.y>370  && boxes[i].body.position.y<400 && boxes[i].number===largestNum[1]){
       returnedValues.push(true)
      }

      else if(boxes[i].body.position.y>320  && boxes[i].body.position.y<350 && boxes[i].number===largestNum[0]){
       returnedValues.push(true)
      }

      else{
        returnedValues.push(false)
      }
    }
  }
  if(returnedValues[0]===true && returnedValues[1]===true && returnedValues[2]===true && returnedValues[3]===true && returnedValues[4]===true){
    gameState="correct"
  }

  else{
    gameState="wrong"
  }
}