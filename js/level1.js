import { Player } from "./player.js";
import { Plataformas } from "./plataformas.js";
import { Enemigo } from './enemigo.js';

export class Level1 extends Phaser.Scene {
    constructor(){
        super({
            key: "level1"
        });

        this.player = null;
        this.plataformas = null;
        this.enemigos = [];
    }

    preload() {
        this.load.image('fondo', 'assest/fondos/fondo.png');
        this.load.image('enemigoRunF1', 'assest/enemigos/zombie_basico/modelo-personaje-acaminar1.png');
        this.load.image('enemigoRunF2', 'assest/enemigos/zombie_basico/modelo-personaje-acaminar2.png');
        this.load.image('enemigoRunF3', 'assest/enemigos/zombie_basico/modelo-personaje-acaminar3.png');
        this.load.image('enemigoRunF4', 'assest/enemigos/zombie_basico/modelo-personaje-acaminar4.png');

        this.plataformas = new Plataformas(this);
        this.plataformas.preload();

        this.player = new Player(this);
        this.player.preload();
    }

    create() {
        this.add.image(0, 0, 'fondo').setOrigin(0, 0);

        this.plataformas.create();
        this.player.create();

        this.physics.add.collider(this.player.Player, this.plataformas.layer1);

        // Crear enemigos y configurar colisiones
        this.enemigos.push(new Enemigo(this, 300, 200, this.player.Player));
        this.enemigos.push(new Enemigo(this, 850, 400, this.player.Player));

        this.enemigos.forEach(enemigo => {
            enemigo.create();
            this.physics.add.collider(enemigo.sprite, this.plataformas.layer1); // Colisión enemigo - plataformas

            this.physics.add.overlap(this.player.Player, enemigo.sprite, () => {
                this.gameOver();
            });
        });
    }

    update() {
        this.player.update();
        this.enemigos.forEach(enemigo => {
            enemigo.update();
        });
    }

    gameOver() {
        console.log('¡Game Over!');
        this.scene.restart();
    }
}