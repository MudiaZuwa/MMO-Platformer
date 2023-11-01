let playerClass = {}
let playerId;
let players = {};
let playerRef;
  
function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getKeyString(x, y) {
  return `${x}x${y}`;
}

function createName() {
  const prefix = randomFromArray([
    'COOL',
    'SUPER',
    'HIP',
    'SMUG',
    'SILKY',
    'GOOD',
    'SAFE',
    'DEAR',
    'DAMP',
    'WARM',
    'RICH',
    'LONG',
    'DARK',
    'SOFT',
    'BUFF',
    'DOPE',
  ]);
  const animal = randomFromArray([
    'BEAR',
    'DOG',
    'CAT',
    'FOX',
    'LAMB',
    'LION',
    'BOAR',
    'GOAT',
    'VOLE',
    'SEAL',
    'PUMA',
    'MULE',
    'BULL',
    'BIRD',
    'BUG',
  ]);

  return `${prefix} ${animal}`;
}

(function () {
  function HandleInput(player){
    if ((!(player.keys.a.pressed) && playerClass[player.id].keys.a.pressed) || (!(player.keys.a.pressed) && playerClass[player.id].keys.a.pressed)) {
      playerClass[player.id].position.x = player.x
      playerClass[player.id].position.y = player.y
      playerClass[player.id].lastDirection = player.lastDirection
    }
    playerClass[player.id].keys = player.keys
    if (player.keys.w.pressed) {
 for (let i = 0; i < doors.length; i++) {
                const door = doors[i]
                // if a collision exist
                if ( playerClass[player.id].hitbox.position.x+  playerClass[player.id].hitbox.width <= door.position.x + door.width &&
                     playerClass[player.id].hitbox.position.x  >= door.position.x &&
                     playerClass[player.id].hitbox.position.y +  playerClass[player.id].hitbox.height >= door.position.y &&
                     playerClass[player.id].hitbox.position.y <= door.position.y + door.height) {
                        
                     playerClass[player.id].velocity.x = 0
                     playerClass[player.id].velocity.y = 0
                     playerClass[player.id].preventInput = true
                   //  playerClass[player.id].swichSprite("enterDoor")
                  //  door.play()
                    return
                }
            }
      if (playerClass[player.id].velocity.y === 0) playerClass[player.id].velocity.y = -15
      return
    }
    if (player.keys.s.pressed) {
      playerClass[player.id].attack(1)
      return
    }
    if (player.keys.z.pressed) {
      playerClass[player.id].attack(2)
      return
    }
  }

  function initGame() {
    const allPlayersRef = firebase.database().ref(`players`);

    allPlayersRef.on('value', (snapshot) => {
      //Fires whenever a change occurs
      players = snapshot.val() || {};
      Object.keys(players).forEach((key) => {
        const characterState = players[key];
        if (!(characterState.id === playerId)&&characterState.level===playerClass[characterState.id].level) HandleInput(characterState)
        if(!(characterState.level===playerClass[characterState.id].level)) playerClass[characterState.id].level=characterState.level
      });
    });

    allPlayersRef.on('child_added', (snapshot) => {
      //Fires whenever a new node is added the tree
      const addedPlayer = snapshot.val();
      playerClass[addedPlayer.id] = new Player(...[eval(addedPlayer.player)])
      playerClass[addedPlayer.id].name = addedPlayer.name
      playerClass[addedPlayer.id].position.x = addedPlayer.x
      playerClass[addedPlayer.id].position.y = addedPlayer.y
     playerClass[addedPlayer.id].lastDirection = addedPlayer.lastDirection
      if (addedPlayer.id === playerId) {
        levels[level].init()
        animate()
      }
          playerClass[addedPlayer.id].collisionBlocks = collisionBlocks
          if (playerClass[addedPlayer.id].currentAnimation) playerClass[addedPlayer.id].currentAnimation.isActive = false
  
    });
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //You're logged in;
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);

      const name = createName();

      playerRef.set({
        id: playerId,
        keys,
        lastDirection: "right",
        level:1,
        name,
        player: "samuraiMack",
        x: 200,
        y: 200,
      });
    
      playerRef.onDisconnect().remove();

      //Begin the game now that we signed in
      initGame();
    } else {
      //You're logged out
    }
  });

  firebase
    .auth()
    .signInAnonymously()
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode, errorMessage);
    });
})();
