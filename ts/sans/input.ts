import Phaser from "phaser";
import Sans, { blue, ui, user } from './game';
import { item } from "../game";
const exception:Array<number> = [];

export default class Input {
    my_turn:boolean = false;
    item_type = false;
    button = 1;
    button_click = false;
    move = false;
    sans_text!: Phaser.GameObjects.Text;
    item;
    attack_menu!: {
        ui: Phaser.GameObjects.Image,
        ball: Phaser.GameObjects.Rectangle | null
    }
    user_attack!: {
        is:boolean,
        tween:Phaser.Tweens.Tween | null
    };

    constructor(game:Sans) {
        game.curr = game.input.keyboard?.createCursorKeys();
        const Keyleft = game.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        const Keyright = game.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        const Keyup = game.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        const Keydown = game.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        const KeyEnter = game.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        const KeyZ = game.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        const KeyX = game.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.sans_text = game.add.text(130, 289, "", {"fontFamily": "굴림", "fontSize": "15px"});
        this.sans_text.scaleX = 1.9930840379999994;
        this.sans_text.scaleY = 2.1855633158287566;
        this.sans_text.text = "* 샌즈";
        this.sans_text.setVisible(false);

        this.item = game.physics.add.group();

		this.attack_menu = {
            ball: null,
            ui: game.add.image(407, 365, "attack_menu")
        };
		this.attack_menu.ui.scaleX = 0.8797409329272863;
		this.attack_menu.ui.scaleY = 1.2108466910162594;
        this.attack_menu.ui.setVisible(false);

        this.user_attack = {
            is:false,
            tween: null
        }

        Keydown?.on("down", () => {
            if(this.my_turn) {
                if(this.button == 3) {
                    if(user.y == 295) {
                        user.y = 365;
                    }else {
                        user.y = 295;
                    }
                }
            }    
        });

        Keyup?.on("down", () => {
            if(blue && this.move && !this.my_turn) {
                user.body.setVelocityY(-350);
                this.move = false;
            }else if(this.item_type) {
                if(this.button == 3) {
                    if(this.button == 3) {
                        if(user.y == 365) {
                            user.y = 295;
                        }else {
                            user.y = 365;
                        }
                    }
                }
            }
        });

        Keyleft?.on("down", () => {
            if(this.my_turn && !this.button_click) {
                if(this.button == 1) {
                    ui.btn[0].setTexture("btn_1");
                    ui.btn[3].setTexture("btn_4_");
                    this.button = 4;
                }else if(this.button == 4) {
                    ui.btn[3].setTexture("btn_4");
                    ui.btn[2].setTexture("btn_3_");
                    this.button = 3;
                }else if(this.button == 3) {
                    ui.btn[2].setTexture("btn_3");
                    ui.btn[1].setTexture("btn_2_");
                    this.button = 2;
                }else if(this.button == 2) {
                    ui.btn[1].setTexture("btn_2");
                    ui.btn[0].setTexture("btn_1_");
                    this.button = 1;
                }
            }else if(this.item_type) {
                if(user.x != 105) {
                    user.x-=150;
                }else {
                    user.x = 555;
                }
            }
        });

        Keyright?.on("down", () => {
            if(this.my_turn && !this.button_click) {
                if(this.button == 1) {
                    ui.btn[0].setTexture("btn_1");
                    ui.btn[1].setTexture("btn_2_");
                    this.button = 2;
                }else if(this.button == 2) {
                    ui.btn[1].setTexture("btn_2");
                    ui.btn[2].setTexture("btn_3_");
                    this.button = 3;
                }else if(this.button == 3) {
                    ui.btn[2].setTexture("btn_3");
                    ui.btn[3].setTexture("btn_4_");
                    this.button = 4;
                }else if(this.button == 4) {
                    ui.btn[3].setTexture("btn_4");
                    ui.btn[0].setTexture("btn_1_");
                    this.button = 1;
                }
            }else if(this.my_turn) {
                if(this.button == 3) {
                    if(user.x != 555) {
                        user.x+=150;
                    }else {
                        user.x = 105;
                    }
                }
            }
        });

        KeyEnter?.on("down", () => {
            if(this.my_turn) {
                if(this.item_type) {
                    this.tool(game, false);
                }else {
                    this.menu_click(game);
                }
            }
        });

        KeyZ?.on("down", () => {
            if(this.my_turn) {
                if(this.item_type) {
                    this.tool(game, false);
                }else {
                    this.menu_click(game);
                }
            }
        });

        KeyX?.on("down", () => {
            if(this.my_turn) {
                user.setVisible(false);
                clearInterval(game.menu_loop);
                game.menu_text.destroy();
                this.button_click = false;
                if(this.button == 1) {
                    ui.btn[0].setTexture("btn_1_");
                    this.sans_text.setVisible(false);
                }else if(this.button == 2) {
                }else if(this.button == 3) {
                    this.item_type = false;
                    ui.btn[2].setTexture("btn_3_");
                    this.item.clear(true, true);
                }else if(this.button == 4) {
                }
                game.UI_text();
            }
        });
    }

    keyInput(game:Sans) {
        const speed = 200;
        if(game.curr && !game.over) {
            user.body.setVelocityX(0);
            if(!blue) {
                user.body.setVelocityY(0);
            }

            if(game.curr.left.isDown) {
                if(!this.my_turn) {
                    user.body.setVelocityX(-speed);
                }
            }else if(game.curr.right.isDown) {
                if(!this.my_turn) {
                    user.body.setVelocityX(speed);
                }
            }
            
            if(game.curr.down.isDown) {
                if(!this.my_turn) {
                    user.body.setVelocityY(speed);
                }
            }else if(game.curr.up.isDown) {
                if(!this.my_turn && !blue) {
                    user.body.setVelocityY(-speed);
                }
            }
        }
    }

    menu_click(game:Sans) {
        if(this.my_turn) {
            if(this.button == 1) {
                if(this.user_attack.is) {
                    let i=0;
                    this.user_attack.tween?.stop();
                    this.user_attack.is = false;
                    const wow = game.add.sprite(400, 127, "attackg_02");
                    const glitch = game.creates.glitch_create();
                    wow.play("attack");
                    const att = setInterval(() => {
                        if(i < 3) {
                            this.attack_menu.ball?.setAlpha(0);
                            setTimeout(() => {
                                this.attack_menu.ball?.setAlpha(1);
                            },40);
                            i++;
                        }else {
                            this.attack_menu.ball?.destroy();
                            clearInterval(att);
                        }
                    },80);
                    wow.on("animationcomplete", () => {
                        game.cameras.main.shake(800, 0.03);
                        glitch.play("glitch");
                        glitch.on("animationcomplete", () => {
                            this.attack_menu.ui.setVisible(false);
                            wow.destroy();
                            this.my_turn = false;
                            game.trun(false);
                        });
                    });
                }else if(!this.button_click) {
                    clearInterval(game.menu_loop);
                    game.menu_text.destroy();
                    ui.btn[0].setTexture("btn_1");
                    this.sans_text.setVisible(true);
                    user.setVisible(true);
                    user.setPosition(116, 302);
                    this.button_click = true;
                }else if(this.button_click) {
                    this.sans_text.setVisible(false);
                    this.button_click = false;
                    this.attack(game);
                }
            }else if(this.button == 2) {
            }else if(this.button == 3) {
                if(!this.button_click) {
                    clearInterval(game.menu_loop);
                    game.menu_text.destroy();
                    ui.btn[2].setTexture("btn_3");
                    user.setVisible(true);
                    user.setPosition(105,295);
                    this.item_type = true;
                    this.tool(game,true);
                    this.button_click = true;
                }
            }else if(this.button == 4) {
            }
        }
    }

    tool(game:Sans, type:boolean) {
        if(type) {
            let length = 120;
            item.forEach((value) => {
                if(exception.indexOf(value.index) == -1) {
                    const row = (value.row == 1) ? 285 : 355;
                    const text = game.add.text(length, row, "", {"fontFamily": "sans", "fontSize": "20px"});
                    text.scaleX = 1.141294507482527;
                    text.scaleY = 1.5379811133993067;
                    text.text = "* "+value.item;
                    this.item.add(text);
                }
                if(value.row == 2) length+=150;
            });
        }else {
            var x = 105, y = 295;
            for(let i=1; i <= 8; i++) {
                if(x == user.x && y == user.y && exception.indexOf(i) == -1) {
                    user.setVisible(false);
                    exception.push(i);
                    item.forEach((value) => {
                        if(value.index == i) {
                            if(game.hp+value.hp >= 92) {
                                game.hp = 92;
                            }else {
                                game.hp+=value.hp;
                            }
                            ui.hp_number.setText(game.hp+"/92");
                            ui.hp.scaleX = 0;
                            for(let j=0; j < game.hp; j++) {
                                ui.hp.scaleX+=ui.hp_1 / 92;
                            }
                            this.item_type = false;
                            this.item.clear(true, true);
                            this.my_turn = false;
                            game.trun(false);
                        }
                    });
                    break;
                }else {
                    if(y == 295) {
                        y = 365;
                    }else {
                        x += 150;
                        y = 295;
                    }
                }
            }
        }
    }

    attack(game:Sans) {
        this.attack_menu.ui.setVisible(true);
		this.attack_menu.ball = game.add.rectangle(109, 367, 128, 128);
		this.attack_menu.ball.scaleX = 0.11208905777696086;
		this.attack_menu.ball.scaleY = 1.1639399518128275;
		this.attack_menu.ball.isFilled = true;

        user.setVisible(false);
        this.user_attack.is = true;
        this.user_attack.tween = game.tweens.add({
            targets:this.attack_menu.ball,
            x:714,
            onComplete: () => {
                this.attack_menu.ball?.destroy();
                this.my_turn = false;
                game.trun(false);
            }
        });
    }
}