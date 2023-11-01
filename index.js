const canvas= document.querySelector("canvas")
const c = canvas.getContext("2d")
        
canvas.width=1024
canvas.height = 576

let parsedCollisions
let collisionBlocks
let backgroundLevel
let doors

let level = 1
let levels = {
    1: {
        init: () => {
        parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            Object.keys(playerClass).forEach(playerid => {
        let player = playerClass[playerid]
        if (player.level === level) {
             player.collisionBlocks = collisionBlocks
            if (player.currentAnimation) player.currentAnimation.isActive = false
        }
    });
        backgroundLevel = new Sprite({
             position: {
                x:0,
                y:0
            },
            imageSrc:"./img/backgroundLevel1.png"
        })
        doors = [
            new Sprite({
            position: {
            x: 767,
            y:270
        },
            imageSrc: "./img/doorOpen.png",
            frameRate: 5,
            frameBuffer: 5,
            loop: false,
            autoplay: false
    })
]
            }
    },
    2: {
        init: () => {
        parsedCollisions = collisionsLevel2.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()

              Object.keys(playerClass).forEach(playerid => {
        let player = playerClass[playerid]
        if (player.level === level) {
        player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 140
            if (player.currentAnimation) player.currentAnimation.isActive = false
        }
    }); 
        backgroundLevel = new Sprite({
             position: {
                x:0,
                y:0
            },
            imageSrc:"./img/backgroundLevel2.png"
        })
        doors = [
            new Sprite({
            position: {
            x: 772,
            y:336
        },
            imageSrc: "./img/doorOpen.png",
            frameRate: 5,
            frameBuffer: 5,
            loop: false,
            autoplay: false
    })
]
            }
    },
    3: {
        init: () => {
        parsedCollisions = collisionsLevel3.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
              Object.keys(playerClass).forEach(playerid => {
        let player = playerClass[playerid]
        if (player.level === level) {
         player.collisionBlocks = collisionBlocks
            player.position.x =750
            player.position.y = 300
            if (player.currentAnimation) player.currentAnimation.isActive = false
        }
    }); 
          
        backgroundLevel = new Sprite({
             position: {
                x:0,
                y:0
            },
            imageSrc:"./img/backgroundLevel3.png"
        })
        doors = [
            new Sprite({
            position: {
            x: 176,
            y:333
        },
            imageSrc: "./img/doorOpen.png",
            frameRate: 5,
            frameBuffer: 5,
            loop: false,
            autoplay: false
    })
]
            }
        },
    }

const keys = {
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

const overlay = {
    opacity:0
}

function animate() {

    backgroundLevel.draw()

    doors.forEach(door => {
       door.draw()
    })

    Object.keys(playerClass).forEach(playerid => {
        let player = playerClass[playerid]
        if (player.level === level) {
            player.draw()
            player.update()
            player.handleInput()
        }
    });
    c.save()
    c.globalAlpha=overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()
    requestAnimationFrame(animate)
}
