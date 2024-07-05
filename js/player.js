export class Player {
    constructor(scene) {
        this.myScene = scene;
        this.isPaused = false;
        this.pauseText = null;
    }
    
    preload() {
        // Carga de recursos si es necesario
        this.myScene.load.image('playerRunF1','assest/player/Caminar/caminar1.png');
        this.myScene.load.image('playerRunF2','assest/player/Caminar/caminar2.png');
        this.myScene.load.image('playerRunF3','assest/player/Caminar/caminar3.png');
        this.myScene.load.image('playerRunF4','assest/player/Caminar/caminar4.png');
    
        this.myScene.load.image('playerIdleF1','assest/player/Personaje_reposo/personaje-reposo1.png');
        this.myScene.load.image('playerIdleF2','assest/player/Personaje_reposo/personaje-reposo2.png');
        this.myScene.load.image('playerIdleF3','assest/player/Personaje_reposo/personaje-reposo3.png');
        this.myScene.load.image('playerIdleF4','assest/player/Personaje_reposo/personaje-reposo4.png');
        
        this.myScene.load.image('playerJumpF1','assest/player/Salto/personaje1.png');
        this.myScene.load.image('playerJumpF2','assest/player/Salto/personaje2.png');
        this.myScene.load.image('playerJumpF3','assest/player/Salto/personaje3.png');
        this.myScene.load.image('playerJumpF4','assest/player/Salto/personaje4.png');
        this.myScene.load.image('playerJumpF5','assest/player/Salto/personaje5.png');
        
        this.myScene.load.image('playerFallF1','assest/personaje/personaje1.png');

        
    }
    createAnimations() {
        // Creación de animaciones
        this.myScene.anims.create({
            key: 'Run',
            frames: [
                { key: 'playerRunF1' },
                { key: 'playerRunF2' },
                { key: 'playerRunF3' },
                { key: 'playerRunF4' }
            ],
            frameRate: 5,
            repeat: -1
        });

        this.myScene.anims.create({
            key: 'Idle',
            frames: [
                { key: 'playerIdleF1' },
                { key: 'playerIdleF2' },
                { key: 'playerIdleF3' },
                { key: 'playerIdleF4' }
            ],
            frameRate: 5,
            repeat: -1
        });

        this.myScene.anims.create({
            key: 'Jump',
            frames: [
                { key: 'playerJumpF1' },
                { key: 'playerJumpF2' },
                { key: 'playerJumpF3' },
                { key: 'playerJumpF4' },
                { key: 'playerJumpF5' }
            ],
            frameRate: 10,
            repeat: 0
        });

        this.myScene.anims.create({
            key: 'Fall',
            frames: [
                { key: 'playerFallF1' }
            ],
            frameRate: 10,
            repeat: 0
        });

        this.myScene.anims.create({
            key: 'zombie',
            frames: [
                { key: 'enemigoRunF1' },
                { key: 'enemigoRunF2' },
                { key: 'enemigoRunF3' },
                { key: 'enemigoRunF4' }
            ],
            frameRate: 5,
            repeat: -1
        });
    }

    create() {
        // Creación de animaciones
        this.createAnimations();
        
        // Creación del jugador físico
        this.Player = this.myScene.physics.add.sprite(1000, 600, 'playerRunF1');
        this.Player.body.setSize(this.Player.width * 0.4, this.Player.height * 0.6);
        this.Player.body.setOffset(this.Player.width * 0.3, this.Player.height * 0.1);
        this.Player.setBounce(0.2);
        this.Player.setCollideWorldBounds(true);
        
        // Configuración de teclas de control
        this.keyD = this.myScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyA = this.myScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyW = this.myScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
       
   
  


        // Pausar juego al presionar la tecla P
        this.keyP = this.myScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyP.on('down', this.togglePause, this);
        
        // Crear texto de pausa
        this.pauseText = this.myScene.add.text(
            this.myScene.cameras.main.width / 2,
            this.myScene.cameras.main.height / 2,
            'PAUSA',
            {
                fontFamily: 'Segoe Print',
                fontSize: 48,
                color: '#ffffff',
                align: 'center'
            }
        );
        this.pauseText.setOrigin(0.5);
        this.pauseText.setVisible(false); // Inicialmente oculto
    }
    
    update() {
        if (!this.isPaused) {
            // Lógica de movimiento del jugador
            if (this.keyD.isDown) {
                this.Player.play('Run', true);
                this.Player.setVelocityX(160);
                this.Player.flipX = false;
            } else if (this.keyA.isDown) {
                this.Player.play('Run', true);
                this.Player.setVelocityX(-160);
                this.Player.flipX = true;
            } else {
                this.Player.setVelocityX(0);
                this.Player.play('Idle', true);
                this.Player.flipX = false;
            }

            // Lógica de salto del jugador
            if (this.keyW.isDown && this.Player.body.blocked.down) {
                this.Player.setVelocityY(-600);
                this.Player.play('Jump', true);
            }
        }
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            // Pausar juego
            this.myScene.physics.world.pause();
            this.Player.anims.pause();
            this.pauseText.setVisible(true);
            console.log("Juego pausado");
        } else {
            // Reanudar juego
            this.myScene.physics.world.resume();
            this.Player.anims.resume();
            this.pauseText.setVisible(false);
            console.log("Juego reanudado");
        }
    }   
}