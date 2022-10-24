import Phaser from "phaser";

class Play extends Phaser.Scene {

    constructor(config) {
        super('Play');       

        this.config = config;

        //this.platforms = null;
        //this.cursors = null;
        this.player = null;
        //this.stars = null;
        //this.score = 0;
        //this.scoreText = null;
        this.sonido = null;
    }

    create() {

        //super.create();

        //creando el fondo
        this.crearFondo();

        //agregando bird como player
        this.crearBird();

        //agregando los obstaculos
        this.crearPipes();

        //agregando sonido
        this.crearSonido();

        //como tiene gravedad el bird cae, entoces utilizo flap para que empuje hacia arriba
        //flap es una funcion
        this.input.on('pointerdown', this.flap, this);
        this.input.keyboard.on('keydown-SPACE', this.flap, this)
    }

    crearFondo() {
        //debugger;
        this.add.image(400, 300, 'sky');
    }

    crearBird() {
        //al personaje se le asigna el sprite        
        this.player = this.physics.add.sprite(this.config.posicionInicial.x, this.config.posicionInicial.y, 'bird');
        this.player.body.velocity.x = 100;
        this.player.body.gravity.y = 200;
        //this.player.setCollideWorldBounds(true);
    }

    crearPipes() {
        let pipeDistanciaHorizontal = 500;
                
        for (let i = 0; i < 4; i++) {
            let pipeDistanciaVertical = Phaser.Math.Between(150, 160);
            let pipeAltura = Phaser.Math.Between(400, 480);
            let pipePosicionAltura = Phaser.Math.Between(0, 100);

            this.pipesSuperior = this.physics.add.sprite(pipeDistanciaHorizontal, pipePosicionAltura, 'pipe');
            this.pipesInferior = this.physics.add.sprite(pipeDistanciaHorizontal, pipeAltura + pipeDistanciaVertical, 'pipe');

            pipeDistanciaHorizontal = pipeDistanciaHorizontal + 300;
            this.pipesSuperior.body.velocity.x = -200;
            this.pipesInferior.body.velocity.x = -200;

            this.physics.add.collider(this.player, this.pipesSuperior);
            this.physics.add.collider(this.player, this.pipesInferior);
        }
        
        //posicion inferior menos tamano - d= posicion superior
        //psi - pss = t + d
        //psi = t + d + pss
    }

    crearSonido() {
        this.sonido = this.sound.add('cancion');
        const soundConfig = {
            volume: 1,
            loop: true
        }
        //    this.sonido.play(soundConfig);

        if (!this.sound.locked) {
            // already unlocked so play
            this.sonido.play(soundConfig)
        }
        else {
            // wait for 'unlocked' to fire and then play
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.sonido.play(soundConfig)
            })
        }
    }

    update() {
        //alerta de salida del canvas
        if (this.player.y > 600 || this.player.y < 0) {
            this.volverAPosicionInicial();
            //alert("perdiste")
        }

        /**
        //1.- si utilizo el update, siempre esta sensando esta funcion, eventListener
        console.log(this.player.x);
        
        //this.player.body.velocity.x = 200;
        if(this.player.x <= 0){
            this.player.body.velocity.x = 200
        } else {
            if(this.player.x >= 800){
                this.player.body.velocity.x = -200
            }
        }
        //HASTA AQUI LO DE IR Y VENIR
        */
        
    }

    flap() {
        //console.log("hola: ");
        this.player.body.velocity.y = this.config.velocidadInical;
    }

    volverAPosicionInicial() {
        this.player.x = this.config.posicionInicial.x;
        this.player.y = this.config.posicionInicial.y;
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 800;
    }
}

export default Play;