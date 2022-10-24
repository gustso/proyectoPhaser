import Phaser from "phaser";

class Preload extends Phaser.Scene {

    constructor() {
        super("Preload");
    }

    preload() {
        this.load.audio('cancion', 'sound/cancion.mp3');
        this.load.image('sky', 'img/sky.png');
        this.load.image('pipe', 'img/pipe.png');
        this.load.image('star', 'img/star.png');
        this.load.image('bomb', 'img/bomb.png');
        this.load.spritesheet('dude',
            'img/dude.png',
            { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('bird',
            'img/birdSprite.png',
            { frameWidth: 16, frameHeight: 16 });
            //debugger;
    }

    create() {
        this.scene.start('Play');
    }
}

export default Preload;