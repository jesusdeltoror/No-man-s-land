export class Enemigo {
    constructor(scene, x, y, player) {
        this.scene = scene;
        this.player = player;
        
        // Crear sprite del enemigo
        this.sprite = this.scene.physics.add.sprite(x, y, 'enemigoRunF1');
        this.sprite.body.setSize(this.sprite.width * 0.8, this.sprite.height * 0.9);
        this.sprite.body.setOffset(this.sprite.width * 0.1, this.sprite.height * 0.1);
         // Habilitar gravedad para el enemigo
         this.sprite.body.setAllowGravity(true);
        // Preload de animaciones del enemigo
        this.preload();

        // Configurar colisión con el jugador
        this.scene.physics.add.overlap(this.sprite, this.player, this.colisionJugador, null, this);
    }

    preload() {
        // Carga de imágenes si es necesario (esto podría no ser necesario si ya se han cargado globalmente)
        this.scene.load.image('enemigoRunF1', 'assest/enemigos/zombie_basico/modelo-personaje-acaminar1.png');
        this.scene.load.image('enemigoRunF2', 'assest/enemigos/zombie_basico/modelo-personaje-acaminar2.png');
        this.scene.load.image('enemigoRunF3', 'assest/enemigos/zombie_basico/modelo-personaje-acaminar3.png');
        this.scene.load.image('enemigoRunF4', 'assest/enemigos/zombie_basico/modelo-personaje-acaminar4.png');
    }

    create() {
        // Crear animación del enemigo
        this.scene.anims.create({
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

        // Reproducir animación del enemigo
        this.sprite.play('zombie', true);
    }

    update() {
        // Lógica de movimiento del enemigo
        const speed = 100; // Velocidad de movimiento del enemigo (ajusta según tu juego)

        const dx = this.player.x - this.sprite.x;
        const dy = this.player.y - this.sprite.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const directionX = dx / distance;
        const directionY = dy / distance;

        this.sprite.setVelocityX(directionX * speed);
        this.sprite.setVelocityY(directionY * speed);
    }

    colisionJugador(enemigo, jugador) {
        // Lógica de colisión con el jugador
        console.log('¡Game Over!');
        this.scene.add.text(200, 200, 'Game Over', { fontFamily: 'Segoe Print', fontSize: 48, color: '#ff0000',align: 'center' });
        // Aquí podrías reiniciar el nivel o realizar cualquier otra acción
    }
}