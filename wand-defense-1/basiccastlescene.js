var player;

var pointer;

class Castle extends Phaser.Scene{

    constructor (config) {
        super(config);
    }

    preload () {
    }

    create (data)  {
      var width = this.cameras.main.width;
      var height = this.cameras.main.height;

      player = this.physics.add.sprite(width / 2, height / 2, 'player').setScale(1);
      player.setCollideWorldBounds(true);

      pointer = this.input.activePointer;

      this.cameras.main.setBounds(0, 0, 2000, 2000);
      this.cameras.main.startFollow(player);
    }

    update(time, delta) {
      player.angle = Phaser.Math.Angle.Between(player.x, player.y﻿, this.input.activePointer.x, this.input.activePointer.y);

    }

}

export default Castle;
