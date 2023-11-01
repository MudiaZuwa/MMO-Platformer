class Player extends Sprite{
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop, scale=1, offset={x:0, y:0},
                    attckBox={offset:{}, width: undefined, height:undefined}}) {
        super({imageSrc, frameRate, animations, loop, scale})
        this.position = {
            x: 200,
            y:200
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.sides = {
            bottom:this.position.x+this.height
        }
        this.gravity = 1
        this.collisionBlocks = collisionBlocks
        this.preventInput = false
        this.offset=offset
        this.lastDirection = "right"
        this.level = 1
        this.name
        this.health=100
        this.attackBox={
            position:{
                x:this.position.x,
                y: this.position.y
            },
            width: attckBox.width,
            height: attckBox.height,
            left:{
            offset:attckBox.left.offset
            },
             right:{
            offset:attckBox.right.offset
            }
        }
        this.keys={
    w: {
        pressed:false
    },
    a: {
        pressed:false
    },
    d: {
        pressed:false
    },
    s: {
        pressed:false
    },
    z: {
        pressed:false
    }
}
    }

    update() {
        this.position.x += this.velocity.x
        this.updateHitbox()

        //Update attackBox
        this.attackBox.position.x=this.position.x+ this.attackBox[this.lastDirection].offset.x
        this.attackBox.position.y=this.position.y+ this.attackBox[this.lastDirection].offset.y

      // c.fillStyle="rgba(255, 0, 0, 0.5)"
      // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
       
    //Player Health Bar
    c.fillStyle="rgba(255, 0, 0, 1)"
    c.fillRect(this.hitbox.position.x-10, this.hitbox.position.y-10, 0.6*this.health, 3)
        
      //check for horizontal collisions
        this.checkForHorizontalCollisions()
        this.applyGravity()

        this.updateHitbox()

        // check for vertical collision
        this.checkForVerticalCollisions()

      // c.fillStyle="rgba(255, 0, 0, 0.5)"
      // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
   
   //Set Player Name
        c.fillStyle="black"
        c.font = "13px Arial";
        c.fillText(this.name, this.hitbox.position.x-15, this.hitbox.position.y-15)
    }

    attack(n) {
        this.swichSprite("Attack"+n+this.lastDirection)
        this.isAttacking=true
    }

    handleInput() {
        if (this.preventInput) return
        if(this.image===this.animations.Attack1left.image&&this.currentFrame<this.animations.Attack1left.frameRate-1) return
        if(this.image===this.animations.Attack2left.image&&this.currentFrame<this.animations.Attack2left.frameRate-1) return
        if(this.image===this.animations.Attack1right.image&&this.currentFrame<this.animations.Attack1right.frameRate-1) return
        if(this.image===this.animations.Attack2right.image&&this.currentFrame<this.animations.Attack2right.frameRate-1) return
        this.velocity.x=0
    if (this.keys.a.pressed) {
        this.swichSprite("runLeft")
        this.velocity.x = -5
        this.lastDirection="left"
    }
    else if (this.keys.d.pressed) {
        this.swichSprite("runRight")
        this.velocity.x = 5
        this.lastDirection="right"
    }else if(this.velocity.y<0&&this.lastDirection === "left"){
        this.swichSprite("JumpLeft")
    }else if(this.velocity.y>0&&this.lastDirection === "left"){
        this.swichSprite("fallLeft")
    } else if(this.velocity.y<0&&this.lastDirection === "right"){
        this.swichSprite("JumpRight")
    }else if(this.velocity.y>0&&this.lastDirection === "right"){
        this.swichSprite("fallRight")
    } else {
        if (this.lastDirection === "left") this.swichSprite("idleLeft")
        else this.swichSprite("idleRight")
    }
    }

    swichSprite(name) {
        if(this.image===this.animations[name].image) return
        this.currentFrame=0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation= this.animations[name]
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x+this.offset.position.x,
                y: this.position.y+this.offset.position.y
            },
            width: this.offset.width,
            height:this.offset.height
        }
    }

    checkForHorizontalCollisions() {
            for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            // if a collision exist
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y<= collisionBlock.position.y+collisionBlock.height) {
                //collision on x axisgoing to the left
                if (this.velocity.x < 0) {
                    const offset= this.hitbox.position.x-this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width-offset + 0.01
                    break
                }
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
            }
        }
    }

    applyGravity() {
     this.velocity.y += this.gravity
        this.position.y+=this.velocity.y
    }

    checkForVerticalCollisions() {
         for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            // if a collision exist
         if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height) {
                
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height-offset+ 0.01
                    break
                }
                if (this.velocity.y > 0) {
                   this.velocity.y=0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y -offset - 0.01
                    break
                }
            }
        }
    }
}
