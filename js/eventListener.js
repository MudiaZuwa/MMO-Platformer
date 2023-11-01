window.addEventListener("keydown", (event) => {
    if( playerClass[playerId].preventInput) return
    switch (event.key) {
        case "w":
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]
                // if a collision exist
                if ( playerClass[playerId].hitbox.position.x+  playerClass[playerId].hitbox.width <= door.position.x + door.width &&
                     playerClass[playerId].hitbox.position.x  >= door.position.x &&
                     playerClass[playerId].hitbox.position.y +  playerClass[playerId].hitbox.height >= door.position.y &&
                     playerClass[playerId].hitbox.position.y <= door.position.y + door.height) {
                        
                     playerClass[playerId].velocity.x = 0
                     playerClass[playerId].velocity.y = 0
                     playerClass[playerId].preventInput = true
                     playerClass[playerId].swichSprite("enterDoor")
                    door.play()
                    return
                }
            }
            if (playerClass[playerId].velocity.y === 0) playerClass[playerId].velocity.y = -15
            playerClass[playerId].keys.w.pressed = true
            players[playerId].keys = playerClass[playerId].keys
      playerRef.set(players[playerId]);
            break
        case "a":
           playerClass[playerId].keys.a.pressed=true
            players[playerId].keys = playerClass[playerId].keys
      playerRef.set(players[playerId]);
            break
        case "d":
           playerClass[playerId].keys.d.pressed=true
            players[playerId].keys = playerClass[playerId].keys
        playerRef.set(players[playerId]);
            break
        case "s":
        playerClass[playerId].attack(1)
        playerClass[playerId].keys.s.pressed=true
        players[playerId].keys = playerClass[playerId].keys
      playerRef.set(players[playerId]);
                     break
        case "z":
            playerClass[playerId].attack(2)
            playerClass[playerId].keys.z.pressed=true
            players[playerId].keys = playerClass[playerId].keys
      playerRef.set(players[playerId]);
                     break
    }
})

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "w":
           playerClass[playerId].keys.w.pressed=false
            players[playerId].keys = playerClass[playerId].keys
      playerRef.set(players[playerId]);
            break
        case "d":
           playerClass[playerId].keys.d.pressed=false
            players[playerId].keys = playerClass[playerId].keys
            players[playerId].x= playerClass[playerId].position.x
            players[playerId].y= playerClass[playerId].position.y
            players[playerId].lastDirection=playerClass[playerId].lastDirection
      playerRef.set(players[playerId]);
            break
        case "a":
           playerClass[playerId].keys.a.pressed=false
            players[playerId].keys = playerClass[playerId].keys
            players[playerId].y= playerClass[playerId].position.y
            players[playerId].x = playerClass[playerId].position.x
            players[playerId].lastDirection=playerClass[playerId].lastDirection
      playerRef.set(players[playerId]);
            break
        case "s":
           playerClass[playerId].keys.s.pressed=false
            players[playerId].keys = playerClass[playerId].keys
      playerRef.set(players[playerId]);
            break
        case "z":
           playerClass[playerId].keys.z.pressed=false
            players[playerId].keys = playerClass[playerId].keys
      playerRef.set(players[playerId]);
            break
    }
})