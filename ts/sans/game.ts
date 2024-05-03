import * as Phaser from 'phaser';
import { attack_json, battle_data, death_json, error_blaster_json, error_sans, error_sans_json, error_start, error_start_json, gaster_blaster_json, glitch2_json, glitch_json, height, page_1, sans_page1, start_sans, width } from '../game';
import { start_bgm } from '../corridor/game';
import UI from './ui';
import Input from './input';
import Pattern from './pattern';
import Create from './create';
import sound from './sound';
export var attack!: Phaser.Physics.Arcade.Group;
export var blue = false , user:Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body; };
export var ui:UI;
export var input:Input;

export default class Sans extends Phaser.Scene {
    curr!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    sans!:Phaser.GameObjects.Sprite;
    trun_evt!: NodeJS.Timeout;
    bgm!:{
        part: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound,
        part_loop: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound,
        count:number,
        loop:boolean
    };
    over = false;
    over_sound!: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    menu_text!: Phaser.GameObjects.Text;
    menu_loop!: NodeJS.Timeout;
    border!: Phaser.Geom.Rectangle;
    index = 0;
    pattern = new Pattern(this);
    creates = new Create(this);
    soundOn = new sound(this);
    down_void!: { static:Phaser.Physics.Arcade.StaticGroup, group:Phaser.Physics.Arcade.Group };
    hp = 92;

    constructor() {
        super("Sans");
    }

    preload() {
        page_1.forEach((value) => {
            this.load.image(value.key, value.url);
        });
        error_sans.forEach((value) => {
            this.load.image(value.key, value.url);
        });
        error_start.forEach((value) => {
            this.load.image(value.key, value.url);
        });
        this.load.image("blue","/img/game/battle/blue.png");
        this.load.image("bone","/img/game/battle/bone.png");
        this.load.image("btn_1","/img/game/battle/1.png");
        this.load.image("btn_2","/img/game/battle/2.png");
        this.load.image("btn_3","/img/game/battle/3.png");
        this.load.image("btn_4","/img/game/battle/4.png");
        this.load.image("btn_1_","/img/game/battle/1_.png");
        this.load.image("btn_2_","/img/game/battle/2_.png");
        this.load.image("btn_3_","/img/game/battle/3_.png");
        this.load.image("btn_4_","/img/game/battle/4_.png");
        this.load.image("beam","/img/game/battle/gaster_blaster/beam.png");
        this.load.image("attack_menu","/img/game/battle/attack_menu.png");
        this.load.image("longBone","/img/game/battle/bone/longBone.png");
        this.load.image("bone_floor","/img/game/battle/bone/bone_floor.png");
        this.load.audio("part_1", "/game/res/part/1/1.mp3");
        this.load.audio("partLoop_1", "/game/res/part/1/loop.mp3");
        this.load.audio("part_2", "/game/res/part/2/2.mp3");
        this.load.audio("partLoop_2", "/game/res/part/2/loop.mp3");
        this.load.audio("death_sound", "/game/res/death.mp3");
    }

    create() {
        this.down_void = {
            static:this.physics.add.staticGroup(),
            group:this.physics.add.group()
        }
        ui = new UI(this);
        input = new Input(this);
        this.bgm = {
            part: this.sound.add("part_1"),
            part_loop: this.sound.add("partLoop_1"),
            count:1,
            loop:false
        };
        this.over_sound = this.sound.add("death_sound");
        attack = this.physics.add.group();
        this.anims.create(sans_page1);
        this.anims.create(start_sans);
        this.anims.create(glitch_json);
        this.anims.create(glitch2_json);
        this.anims.create(gaster_blaster_json);
        this.anims.create(error_blaster_json);
        this.anims.create(death_json);
        this.anims.create(attack_json);
        this.anims.create(error_start_json);
        this.anims.create(error_sans_json);

		this.sans = this.creates.sans_create(); 
        this.border = this.cameras.main.getBounds();

        user = this.add.sprite(405, 367, "red") as Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body };
		user.scaleX = 0.08404099878141938;
		user.scaleY = 0.07122553755059433;
		this.physics.add.existing(user, false);
		user.body.setSize(250, 250, false);
        user.setDepth(5);

		const glitch = this.creates.glitch_create();

        const start = setInterval(() => {
            this.cameras.main.shake(150,0.02);
            user.setVisible(false);
            this.sans.setVisible(false);
            ui.window.setVisible(true);
            setTimeout(() => {
                this.cameras.main.shake(150,0.02);
                user.setVisible(true);
                this.sans.setVisible(true);
                ui.window.setVisible(false);
            },200);
        },400);
        start_bgm.once("complete", () => {
            glitch.play("glitch");
            clearInterval(start);
            this.bgm.part.play();
            this.sans.setVisible(true);
            this.sans.play("start_sans");
            this.cameras.main.shake(1000,0.05);
        });
        this.bgm.part.once("complete", () => {
            if(!this.soundOn.check && !this.over) {
                this.cameras.main.shake(800, 0.01);
                setTimeout(() => this.bgm.part_loop.play(), 700);
                this.bgm.loop = true;
            }
        });
        this.bgm.part_loop.once("complete", () => {
            if(!this.soundOn.check && !this.over) {
                this.cameras.main.shake(800, 0.01);
                setTimeout(() => this.bgm.part_loop.play(), 700);
            }
        });
        this.sans.on("animationcomplete", () => {
            this.pattern.next();
        });

        ui.UI.setVisible(false);
        this.physics.add.collider(user, ui.wall);
    }

    update() {
        if(this.border.contains(user.x, user.y)) {
            user.setPosition(405, 367);
        }
        this.physics.world.collide(user, this.down_void.static, () => {
            input.move = true;
        });
        this.physics.world.collide(user, this.down_void.group, () => {
            input.move = true;
        });
        this.physics.world.overlap(user, attack, this.Demage, undefined, this);
        attack.setVelocity(0,0);
        this.down_void.group.setVelocity(0,0);
        input.keyInput(this);
    }
    
    Demage() {
        if(this.hp != 1) {
            this.hp-=1;
            ui.hp_number.setText(this.hp+"/92");
            ui.hp.scaleX -= ui.hp_1 / 92;
        }else if(!this.over) {
            user.body.setVelocity(0);
            user.body.gravity.set(0,0);
            this.over = true;
            this.bgm.part.stop();
            this.bgm.part_loop.stop();
            user.setTexture("red");
            user.setDepth(21);
            const black = this.add.sprite(399, 303, "glitch_1");
            black.scaleX = 3.223444520193298; 
            black.scaleY = 3.4880317706466784;
            black.angle = -90;
            black.setDepth(20);
            black.setAlpha(0);
            this.tweens.add({
                targets:user,
                x:width/2,
                y:height/2,
                duration:1000,
                onComplete: () => {
                    const death = this.add.sprite(width/2, height/2, "death_00");
                    death.setDepth(21);
                    death.scaleX = 1.2654114540900219;
                    death.scaleY = 1.1257826391359953;
                    this.over_sound.play();
                    death.play("death");
                    this.over_sound.once("complete", () => {
                        user.setAlpha(0);
                        death.setAlpha(0);
                    });
                }
            });
            this.tweens.add({
                targets:black,
                alpha:1,
                duration:1000
            });
        }
    }

    Soul(type:boolean) {
        if(type) {
            user.setTexture("blue");
            user.body.gravity.set(0,500);
            blue = true;
        }else {
            user.body.setVelocity(0);
            user.setTexture("red");
            user.body.gravity.set(0,0);
            blue = false;
        }
    }

    trun(type:boolean) {
        if(type) {
            input.button = 1;
            input.button_click = false;
            ui.btn[0].setTexture("btn_1_");
            ui.UI.setVisible(true);
            this.Soul(false);
            user.setVisible(false);
            this.tweens.add({
                targets:ui.window,
                scaleX: 5.191976802490971,
                duration:300,
                onComplete: () => {
                    input.my_turn = true;
                    this.UI_text();
                }
            });
        }else {
            this.index+=1;
            input.attack_menu.ui.setVisible(false);
            ui.void_size(this, false);
            this.tweens.add({
                targets:ui.window,
                scaleX:3.0417850308514995,
                duration:500,
                onComplete: () => {
                    user.setPosition(405, 367);
                    user.setVisible(true);
                    this.pattern.next();
                }
            });
        }
    }

    UI_text() {
        this.menu_text = this.add.text(109, 289, "", {"fontFamily": "굴림", "fontSize": "15px"});
		this.menu_text.scaleX = 1.9930840379999994;
		this.menu_text.scaleY = 2.1855633158287566;

        const text = battle_data[this.index].text;
        let index = 0;
		this.menu_text.text = "* ";
        this.menu_loop = setInterval(() => {
            if(index < text.length) {
                this.menu_text.text += text[index];
                index++;
            }else {
                clearInterval(this.menu_loop);
            }
        },50);
    }
}