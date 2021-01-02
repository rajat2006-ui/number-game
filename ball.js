class Ball{
    constructor(x,y){
        this.body=Bodies.circle(x,y,50)
        this.x=x
        this.y=y
        World.add(world,this.body)
    }

    display(){
        push()
        ellipseMode(RADIUS)
        fill("lightgreen")
        ellipse(this.body.position.x,this.body.position.y,50,50)

        pop()
    }
}