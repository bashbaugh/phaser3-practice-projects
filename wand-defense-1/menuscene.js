class Menu extends Phaser.Scene{
  constructor(config) {
    super(config);
  }
  
  preload() {
    
  }
  
  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    
    var assetText = this.make.text({
        x: width / 2 - 100,
        y: height / 2 - 250,
        text: 'Wand Defense 1',
        style: {
            font: '25px monospace',
            fill: '#ffffff'
        }
    });
    
    var startText = this.make.text({
        x: width / 2 - 20,
        y: height / 2 - 20,
        text: 'Play!',
        style: {
            backgroundColor: '#ffffff',
            baselineX: 50,
            baselineY: 20,
            font: '20px monospace',
            fill: '#000000'
        }
    })
    .setInteractive()
    .on('pointerdown', () => this.scene.start('castle'));
  }
}

export default Menu;