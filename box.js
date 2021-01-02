class Box{
    constructor(x,y){
        this.body=Bodies.rectangle(x,y,50,50)
        World.add(world,this.body)
        this.width=50
        this.height=50
        this.number=Math.round(random(-100,100))
    }

    display(){
        push()
        fill("yellow")
        rectMode(CENTER)
        rect(this.body.position.x,this.body.position.y,this.width,this.height)
        pop()

        push()
        fill("red")
        textSize(25)
        text(this.number,this.body.position.x-15,this.body.position.y)
        pop()
    }
}