import * as Phaser from 'phaser';
import { attack, death, error_blaster, gaster_blaster, glitch, glitch2, height, sans_data, sans_start, width } from '../game';
import { battle, text_add } from '.';
export const sans_text = document.querySelector(".sans_text") as HTMLElement;
export var sans_type = false;
export var start_bgm:Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound;
var battle_ = true;

export class corridor extends Phaser.Scene {
    user!: Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body; };
    curr!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    background!: Phaser.GameObjects.Sprite;
    came!:Phaser.GameObjects.Rectangle;
    left = true;
    rihgt = true;
    up = true;
    down = true;
    isStart = true;

    constructor() {
        super("corridor");
    }

    preload() {
        sans_start.forEach((value) => {
            this.load.image(value.key, value.url);
        });
        glitch.forEach((value) => {
            this.load.image(value.key, value.url);
        });
        glitch2.forEach((value) => {
            this.load.image(value.key, value.url);
        });
        gaster_blaster.forEach((value) => {
            this.load.image(value.key, value.url);
        });
        error_blaster.forEach((value) => {
            this.load.image(value.key, value.url);
        });
        death.forEach((value) => {
            this.load.image(value.key, value.url);
        });
        attack.forEach((value) => {
            this.load.image(value.key, value.url);
        });
        this.load.image("user","/img/user/user.png");
        this.load.image("user_","/img/user/user_.png");
        this.load.image("user_left","/img/user/user_left.png");
        this.load.image("user_right","/img/user/user_right.png");
        this.load.image("user_work","/img/user/user_work_1.png");
        this.load.image("user_work_2","/img/user/user_work_2.png");
        this.load.image("user_work_3","/img/user/user_work_3.png");
        this.load.image("user_work_4","/img/user/user_work_4.png");
        this.load.image("last_corridor","/img/game/last_corridor.png");
        this.load.image("void","/img/game/void.png");
        this.load.image("sans","/img/game/sans.png");
        this.load.image("red","/img/game/battle/red.png");
        this.load.image("error","/img/game/error.png");
        this.load.audio("start_bgm", "/game/res/start.mp3");
    }

    create() {
        this.curr = this.input.keyboard?.createCursorKeys();
        const wall = this.physics.add.staticGroup();
        start_bgm = this.sound.add("start_bgm");
        this.anims.create(worK_anims("right_work","user_right","user_work"));
        this.anims.create(worK_anims("left_work","user_left","user_work_2"));
        this.anims.create(worK_anims("up_work","user_","user_work_3"));
        this.anims.create(worK_anims("down_work","user","user_work_4"));
        this.anims.create(worK_anims("anime_void_1","last_corridor","void"));
        this.anims.create(worK_anims("battle_start","void","error"));

		const background = this.add.image(1162, 307, "last_corridor");
		background.scaleX = 1.9898856076600027;
		background.scaleY = 2.3304551154821365;
        background.setDepth(0);

		this.user = this.add.sprite(111, 422, "user") as Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body };
        this.user.setDepth(1);
		this.user.scaleX = 0.20231145909202736;
		this.user.scaleY = 0.20615272248834063;
		this.physics.add.existing(this.user);
		this.user.body.setSize(177, 268);

        // void 벽
		const void_1 = this.add.rectangle(-139, 122, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		this.physics.add.existing(void_1, true);
		void_1.body.setOffset(171, 138);
		void_1.body.setSize(2384, 149, false);
		void_1.isFilled = true;
		void_1.fillColor = 0;
        wall.add(void_1);

		const void_2 = this.add.rectangle(-135, 500, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		this.physics.add.existing(void_2, true);
		void_2.body.setOffset(173, 90);
		void_2.body.setSize(2376, 81, false);
		void_2.isFilled = true;
		void_2.fillColor = 0;
        wall.add(void_2);

		const void_3 = this.add.rectangle(-188, 296, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		this.physics.add.existing(void_3, true);
		void_3.body.setOffset(139, -172);
		void_3.body.setSize(87, 492, false);
		void_3.isFilled = true;
		void_3.fillColor = 0;
        wall.add(void_3);

        this.cameras.main.startFollow(this.user);
        this.physics.add.collider(this.user, wall);
    }

    update() {
        const speed = 150;
        if(this.user.x >= 900 && this.isStart) {
            this.user.body.setVelocity(0);
            this.user.anims.stop();
            this.user.setTexture("user_right");
            this.background = this.add.sprite(1162, 307, "void");
            this.background.scaleX = 1.9898856076600027;
            this.background.scaleY = 2.3304551154821365;
            this.background.setDepth(10);
            this.background.play("anime_void_1");
            this.isStart = false;
            
            setTimeout(() => {
                this.background.anims.stop();
                this.background.setTexture("void");
                this.background.setDepth(0);
                this.came = this.add.rectangle(this.user.x,this.user.y, 10, 10);
                const sans = this.add.sprite(this.user.x, this.user.y+height/13, "sans");
                this.came.fillColor = 0;
                this.cameras.main.startFollow(this.came);
                
                this.user.x -= width/3;
                
                sans.x += width/3;
                
                sans_text.style.display = "flex";
                sans_type = true;
                text_add(sans_data[0].time, sans_data[0].type, sans_data[0].text);
            },2500);
        }

        if(battle && battle_) {
            this.start_2();
        }

        if(this.curr && this.isStart) {
            this.user.body.setVelocity(0);

            if(this.curr.left.isDown) {
                this.user.body.setVelocityX(-speed);
                if(this.left) {
                    this.user.play("left_work");
                    this.left = false;
                }
            }else if(this.curr.right.isDown) {
                this.user.body.setVelocityX(speed);
                if(this.rihgt) {
                    this.user.play("right_work");
                    this.rihgt = false;
                }
            }

            if(this.curr.down.isDown) {
                this.user.body.setVelocityY(speed);
                if(this.down) {
                    this.user.play("down_work");
                    this.down = false;
                }
            }else if(this.curr.up.isDown) {
                this.user.body.setVelocityY(-speed);
                if(this.up) {
                    this.user.play("up_work");
                    this.up = false;
                }
            }

            if(this.curr.up.isUp && this.up == false) {
                this.user.anims.stop();
                this.user.setTexture("user_");
                this.up = true;
            }
            if(this.curr.down.isUp && this.down == false) {
                this.user.anims.stop();
                this.user.setTexture("user");
                this.down = true;
            }
            if(this.curr.right.isUp && this.rihgt == false) {
                this.user.anims.stop();
                this.user.setTexture("user_right");
                this.rihgt = true;
            }
            if(this.curr.left.isUp && this.left == false) {
                this.user.anims.stop();
                this.user.setTexture("user_left");
                this.left = true;
            }
        }
    }

    start_1() {
        this.background = this.add.sprite(1162, 307, "void");
        this.background.scaleX = 1.9898856076600027;
        this.background.scaleY = 2.3304551154821365;
        this.background.setDepth(10);
        this.background.play("anime_void_1");
        this.isStart = false;
    }

    start_2() {
        this.background.setDepth(13);
        start_bgm.play();
        const h = this.add.image(this.user.x, this.user.y, "red");
        h.scaleX = 0.11696778931868503;
        h.scaleY = 0.11549911440506973;
        h.setDepth(14);
        battle_ = false;
        
        this.tweens.add({
            targets:h,
            x: this.came.x,
            y: this.came.y,
            duration: 1000,
            onComplete: () => {
                this.scene.start('Sans');
            }
        });
    }
}

function worK_anims(key_1:string, key_2:string, key_3:string):Phaser.Types.Animations.Animation {
    return {
        "key": key_1,
        "frames": [
            {
                "key": key_2,
                "duration": 0
            },
            {
                "key": key_3,
                "duration": 0
            }
        ],
        "frameRate": 10,
        "skipMissedFrames": true,
        "delay": 1,
        "repeat": -1,
        "repeatDelay": 1,
        "randomFrame": false
    }
}