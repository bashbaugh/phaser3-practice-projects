// import './rexuiplugin.min.js';

var gameconfig = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: null,
//   plugins: {
//     scene: [{
//       key: 'rexUI',
//       plugin: rexuiplugin,
//       mapping: 'rexUI'
//     },
//     ]
//   }
};

var game = new Phaser.Game(gameconfig);

import LoadingScene from './loadingscene.js';
import MenuScene from './menuscene.js';
import CastleScene from './basiccastlescene.js';

game.scene.add('boot', LoadingScene, false);
game.scene.add('menu', MenuScene, false);
game.scene.add('castle', CastleScene, false);

game.scene.start('boot');
