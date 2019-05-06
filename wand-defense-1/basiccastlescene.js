const wizardVelocity = 100;

var player;
var map, groundLayer;
var pointer;
var target, targetx, targety;

class Castle extends Phaser.Scene{

    constructor (config) {
        super(config);
    }

    preload () {
    }

    create (data)  {
      var width = this.cameras.main.width;
      var height = this.cameras.main.height;

      map = this.make.tilemap({key: 'castle'});
      var groundTiles = map.addTilesetImage('pave-1.png', 'tiles');
      groundLayer = map.createStaticLayer('ground', groundTiles, 0, 0);

      player = this.physics.add.sprite(width / 2, height / 2, 'player').setScale(1);
      // player.setCollideWorldBounds(true);

      pointer = this.input.activePointer;

      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(player);
    }

    update(time, delta) {
      let rotation = Phaser.Math.Angle.Between(player.x, player.y﻿, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY) + 1.5708;

      if (pointer.leftButtonDown()) {
        targetx = pointer.x + this.cameras.main.scrollX;
        targety = pointer.y + this.cameras.main.scrollY;
        player.rotation = rotation;
        target = true;
      }

      if (target) {
        this.physics.moveTo(player, targetx, targety, wizardVelocity)
      } else {
        player.rotation = rotation;
      }

      if (Math.abs(player.x - targetx) < 5 && Math.abs(player.y - targety) < 5) {
        target = false;
        player.setVelocityX(0);
        player.setVelocityY(0);
      }
    }

}

export default Castle;
