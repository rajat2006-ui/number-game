class Sling{
    constructor(point1,body1){
        var option={bodyA:body1,
                    pointB:point1,
                    lenght:45,
                    stiffness:0.7}

        this.sling=Constraint.create(option)
        this.pointB=point1
        World.add(world,this.sling)
    }

    display(){
        line(this.sling.bodyA.position.x,this.sling.bodyA.position.y,this.sling.pointB.x,this.sling.pointB.y)
    }
}