var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var controls_active = false;

var game = new Phaser.Game(config);

function preload() {

}

function create() {
  this.add.rectangle(400, 300, 800, 600, 0xb5d4ff, 1)
}

function update() {

}
