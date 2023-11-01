const samuraiMack = {
    imageSrc: "./img/samuraiMack/Idle.png",
    frameRate: 8,
    scale: 1.2,
    offset: {
            position: {
                x: 105,
                y:86
            },
            width: 30,
            height:62
    },
    attckBox: {
         left:{
        offset:{
            x:10,
            y:100
        }
        },
        right: {
            offset:{
            x:140,
            y:100
        }
        },
        width:90,
        height:30
    },
    animations: {
        idleRight: {
            frameRate: 8,
            frameBuffer: 2,
            loop: true,
            imageSrc: "./img/samuraiMack/Idle.png",
        },
        idleLeft: {
            frameRate: 8,
            frameBuffer: 2,
            loop: true,
            imageSrc: "./img/samuraiMack/IdleLeft.png",
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/Run.png",
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/RunLeft.png",
        },
        JumpRight: {
            frameRate: 2,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/Jump.png",
        },
        JumpLeft: {
            frameRate: 2,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/JumpLeft.png",
        },
        DeathLeft: {
            frameRate: 6,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/DeathLeft.png",
        },
        DeathRight: {
            frameRate: 6,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/Death.png",
        },
        TakeHitRight: {
            frameRate: 4,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/Take Hit.png",
        },
        TakeHitLeft: {
            frameRate: 4,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/Take HitLeft.png",
        },
        Attack1left: {
            frameRate: 6,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/Attack1Left.png",
        },
        Attack1right: {
            frameRate: 6,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/Attack1.png",
        },
        Attack2right: {
            frameRate: 6,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/Attack2.png",
        },
        Attack2left: {
            frameRate: 6,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/Attack2Left.png",
        },
        fallRight: {
            frameRate: 2,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/Fall.png",
        },
        fallLeft: {
            frameRate: 2,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/samuraiMack/FallLeft.png",
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 5,
            loop: false,
            imageSrc:"./img/samuraiMack/Run.png",
            onComplete: () => {
                overlay.opacity
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        if (level === 4) level = 1
                        players[playerId].level=level
                        playerRef.set(players[playerId]);
                        levels[level].init()
                        players[playerId].x= playerClass[playerId].position.x
                        players[playerId].y= playerClass[playerId].position.y
                        playerRef.set(players[playerId]);
                         playerClass[playerId].swichSprite("idleRight")
                         playerClass[playerId].preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            }
        }
    }
}
    
const kenji = {
    imageSrc: "./img/kenji/Idle.png",
    frameRate: 4,
    scale: 1.2,
    offset: {
            position: {
                x: 113,
                y: 89
            },
            width: 21,
            height:62
    },
    attckBox: {
         left:{
        offset:{
            x:20,
            y:100
        }
        },
        right: {
            offset:{
            x:143,
            y:100
        }
        },
        width:77,
        height:30
    },
    animations: {
        idleRight: {
            frameRate: 4,
            frameBuffer: 6,
            loop: true,
            imageSrc: "./img/kenji/IdleRight.png",
        },
        idleLeft: {
            frameRate: 4,
            frameBuffer: 6,
            loop: true,
            imageSrc: "./img/kenji/Idle.png",
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 3,
            loop: true,
            imageSrc: "./img/kenji/RunRight.png",
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 3,
            loop: true,
            imageSrc: "./img/kenji/Run.png",
        },
        JumpRight: {
            frameRate: 2,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/kenji/JumpRight.png",
        },
        JumpLeft: {
            frameRate: 2,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/kenji/Jump.png",
        },
        DeathLeft: {
            frameRate: 7,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/kenji/Death.png",
        },
        DeathRight: {
            frameRate: 7,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/kenji/DeathRight.png",
        },
        TakeHitRight: {
            frameRate: 3,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/kenji/Take hitRight.png",
        },
        TakeHitLeft: {
            frameRate: 3,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/kenji/Take hit.png",
        },
        Attack1left: {
            frameRate: 4,
            frameBuffer: 6,
            loop: true,
            imageSrc: "./img/kenji/Attack1.png",
        },
        Attack1right: {
            frameRate: 4,
            frameBuffer: 6,
            loop: true,
            imageSrc: "./img/kenji/Attack1Right.png",
        },
        Attack2right: {
            frameRate: 4,
            frameBuffer: 6,
            loop: true,
            imageSrc: "./img/kenji/Attack2Right.png",
        },
        Attack2left: {
            frameRate: 4,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/kenji/Attack2.png",
        },
        fallRight: {
            frameRate: 2,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/kenji/FallRight.png",
        },
        fallLeft: {
            frameRate: 2,
            frameBuffer: 5,
            loop: true,
            imageSrc: "./img/kenji/Fall.png",
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 2,
            loop: false,
            imageSrc: "./img/kenji/RunRight.png",
            onComplete: () => {
                overlay.opacity
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        if (level === 4) level = 1
                        players[playerId].level=level
                        playerRef.set(players[playerId]);
                        levels[level].init()
                        players[playerId].x= playerClass[playerId].position.x
                        players[playerId].y= playerClass[playerId].position.y
                        playerRef.set(players[playerId]);
                        playerClass[playerId].swichSprite("idleRight")
                         playerClass[playerId].preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            }
        }
    }
}
    
