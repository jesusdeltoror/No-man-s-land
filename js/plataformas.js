export class Plataformas{
    constructor(scene){
        this.myScene = scene
    }

    preload(){
        this.myScene.load.image('tiles', '/assest/paquetes/kenney_pixel-platformer-industrial-expansion/paquete1.png')
        this.myScene.load.image('tiles1', '/assest/paquetes/kenney_pixel-platformer-industrial-expansion/herramientas.png')
        this.myScene.load.tilemapTiledJSON('tilemapJSON', '/json/Tutorial_subterarnia.json')
    }

    create(){
        this.map = this.myScene.make.tilemap({key: 'tilemapJSON'})
        this.tileset1 = this.map.addTilesetImage('tuto','tiles')
        this.tileset2 = this.map.addTilesetImage('estantes','tiles1')
        this.layer1 = this.map.createLayer("piso", this.tileset1, 0, 0)
        this.layer2 = this.map.createLayer("herramientas", this.tileset2, 0, 0)
        this.layer3 = this.map.createLayer("Señales", this.tileset1, 0, 0)
        this.layer1.setCollisionByProperty({ Piso: true});
        this.layer2.setCollisionByProperty({ piso1: true});

    }
}