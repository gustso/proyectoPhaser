import Phaser from "phaser";

class Escena extends Phaser.Scene{

    platforms = null;
    cursors = null;
    player = null;
    stars = null;
    score = 0;
    scoreText = null;

    sonido = null;

    posicionInicialY = 200;
    posicionInicialX = 200;

    //variable para la distancia entre pipes    
    //pipeDistanciaVertical = Phaser.Math.Between(150,250);


    preload() {    
        this.load.audio('cancion', 'sound/cancion.mp3');
        this.load.image('sky', 'img/sky.png');
        this.load.image('ground', 'img/platform.png');
        this.load.image('pipe', 'img/pipe.png');
        this.load.image('star', 'img/star.png');
        this.load.image('bomb', 'img/bomb.png');
        this.load.spritesheet('dude', 
            'img/dude.png',
            { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('bird', 
            'img/birdSprite.png',
            { frameWidth: 16, frameHeight: 16});
    }
    
    create() {
        //creando el fondo
        this.add.image(400, 300, 'sky');

        //creando las plataformas
        //this.platforms = this.physics.add.staticGroup();

        //this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //this.platforms.create(600, 400, 'ground');
        //this.platforms.create(50, 250, 'ground');
        //this.platforms.create(750, 220, 'ground');

        //agregando bird como player
        //al personaje se le asigna el sprite
        //this.add.image(400, 300, 'star');
        this.player = this.physics.add.sprite(this.posicionInicialX, this.posicionInicialY, 'bird');
        this.player.body.velocity.x = 100;       
        this.player.body.gravity.y = 200;       

        //this.player.setCollideWorldBounds(true);
        
        //agregando las estrellas        
        //this.stars = this.physics.add.group({
        //    key: 'star',
        //    repeat: 3,
        //    gravityY:50,
        //    setXY: { x: 12, y: 0, stepX: 60 }
        //});        
        
        //esto si genera el rebote del grupo
        //this.stars.children.iterate(function (child) {
        //    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        //    child.setCollideWorldBounds(true);
        //});

        //como tiene gravedad el bird cae, entoces utilizo flap para que empuje hacia arriba
        //flap es una funcion
        this.input.on('pointerdown',this.flap, this);
        this.input.keyboard.on('keydown-SPACE',this.flap, this);
        //this.stars.body.setCollideWorldBounds(true);
        //this.stars.body.collideWorldBounds = true;
        /**
        //rebote contra las plaformas
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);    

        this.cursors = this.input.keyboard.createCursorKeys();       
        
        //choque de las estrellas con el jugador
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        
        //agregamos el texto
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });        
        */
        //this.pipes = this.physics.add.staticGroup();
        //this.pipesAbajo = this.physics.add.staticGroup();
        //this.pipes.create(600, 10, 'pipe').setScale(3).refreshBody();
        //this.pipes.create(400, 110, 'pipe');
        //this.pipes.create(600, 610, 'pipe');
        
        //this.pipes = this.physics.add.sprite(300,300,'pipe');
        //this.pipes.body.velocity.x = -200;
        let pipeDistanciaHorizontal = 500;
        
        for(let i=0;i<4; i++){            
            let pipeDistanciaVertical = Phaser.Math.Between(150,160);
            let pipeAltura = Phaser.Math.Between(400,480);
            let pipePosicionAltura = Phaser.Math.Between(0,100);
            //this.pipes.create(pipeDistanciaHorizontal, pipePosicionAltura, 'pipe');
            //this.pipes.create(pipeDistanciaHorizontal, pipeAltura + pipeDistanciaVertical, 'pipe');

            this.pipesSuperior = this.physics.add.sprite(pipeDistanciaHorizontal, pipePosicionAltura, 'pipe');
            this.pipesInferior = this.physics.add.sprite(pipeDistanciaHorizontal, pipeAltura + pipeDistanciaVertical, 'pipe');


            pipeDistanciaHorizontal = pipeDistanciaHorizontal + 300;
            this.pipesSuperior.body.velocity.x = -200;
            this.pipesInferior.body.velocity.x = -200;
        }
        
        //posicion inferior menos tamano - d= posicion superior
        //psi - pss = t + d
        //psi = t + d + pss

        this.sonido = this.sound.add('cancion');
        const soundConfig = {
            volume: 1,
            loop: true
        }
    //    this.sonido.play(soundConfig);

        if (!this.sound.locked)
	{
		// already unlocked so play
		this.sonido.play(soundConfig)
	}
	else
	{
		// wait for 'unlocked' to fire and then play
		this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
			this.sonido.play(soundConfig)
		})
	}
    }

    update() {
        //alerta de salida del canvas
        if (this.player.y > 600 || this.player.y < 0){
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

        //movimientos segun el cursor del teclado
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }
        
        //saltar si esta en el suelo y la tecla de cursos hacia arriba
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    //se llama desde collider entre el jugador y el 
    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
/**
        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
        setPuntaje(score);  */
    }
    
    flap() {
        console.log("hola: ");
        this.player.body.velocity.y = -200;
    } 

    volverAPosicionInicial(){
        this.player.x= this.posicionInicialX;
        this.player.y= this.posicionInicialY;
        this.player.body.velocity.y = 0;
        //this.player.velocity.x = 800;
    }
}

export default Escena;
