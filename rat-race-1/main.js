var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

const velocity = 200;

var game = new Phaser.Game(config);

var map;
var player;
var cursors;
var groundLayer, foodLayer;
var text;

var last_direction = 'leftright';

function preload() {
    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/small_bare_ratcage.json');
    // tiles in spritesheet
    this.load.spritesheet('tiles', 'assets/tilesets/ratcage_floor.png', {frameWidth: 32, frameHeight: 32});
    this.load.atlas('player', 'assets/spritesheets/ratplayer.png', 'assets/spritesheets/ratplayer.json');
    // this.load.atlas('player', 'assetsp/player.png', 'assetsp/player.json');
    
}

function create() {
    // load the map
    map = this.make.tilemap({key: 'map'});

    // tiles for the ground layer
    var groundTiles = map.addTilesetImage('ratcage_floor1','tiles');
    // create the ground layer
    groundLayer = map.createStaticLayer('ground', groundTiles, 0, 0);
    foodLayer = map.createDynamicLayer('food', groundTiles, 0, 0);
    
    foodLayer.setCollisionByExclusion([-1]);

    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // create the player sprite
    player = this.physics.add.sprite(200, 200, 'player').setScale(2);
    player.setCollideWorldBounds(true); // don't go out of the map
    
    this.physics.add.collider(foodLayer, player);
    
    // small fix to our player images, we resize the physics body object slightly
    // player.body.setSize(player.width, player.height-8);

    //player walk animation
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', {prefix: 'ratplayer', suffix: '.png', start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'walk_up',
        frames: this.anims.generateFrameNames('player', {prefix: 'ratplayer', suffix: '.png', start: 3, end: 5}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'walk_down',
        frames: this.anims.generateFrameNames('player', {prefix: 'ratplayer', suffix: '.png', start: 6, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    // idle with only one frame, so repeat is not neaded
    this.anims.create({
        key: 'idle_leftright',
        frames: [{key: 'player', frame: 'ratplayer0.png'}],
        frameRate: 10,
    });
    
    this.anims.create({
        key: 'idle_up',
        frames: [{key: 'player', frame: 'ratplayer3.png'}],
        frameRate: 10,
    });
    this.anims.create({
        key: 'idle_down',
        frames: [{key: 'player', frame: 'ratplayer8.png'}],
        frameRate: 10,
    });


    cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(player);


    // this text will show the score
    text = this.add.text(20, 570, '0', {
        fontSize: '20px',
        fill: '#ffffff'
    });
    // fix the text to the camera
    text.setScrollFactor(0);
}

function update(time, delta) {
    var lr_down = cursors.left.isDown || cursors.right.isDown;
    if (cursors.up.isDown) {
      last_direction = 'up';
      player.body.setVelocityY(-velocity);
      if (!lr_down) player.anims.play('walk_up', true);
    } else if (cursors.down.isDown) {
      last_direction = 'down';
      player.body.setVelocityY(velocity);
      if (!lr_down) player.anims.play('walk_down', true);
    } else {
      player.body.setVelocityY(0);
    }
  
    if (cursors.left.isDown)
    {
        player.body.setVelocityX(-velocity);
        player.anims.play('walk', true); // walk left
        player.flipX = true; // flip the sprite to the left
        last_direction = 'leftright';
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(200);
        player.anims.play('walk', true);
        player.flipX = false;
        last_direction = 'leftright';
    } else if (!cursors.down.isDown && !cursors.up.isDown) {
         player.anims.play('idle_' + last_direction, true);
    }
    
    if (!lr_down) {
      player.body.setVelocityX(0);
    }
}