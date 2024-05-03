import * as Phaser from 'phaser';
import Sans from './game';

export default class UI {
    wall!: Phaser.Physics.Arcade.StaticGroup;
    UI!: Phaser.Physics.Arcade.Group;
    window!: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body; };
    hp!: Phaser.GameObjects.Rectangle;
    hp_1!: number;
    hp_number!: Phaser.GameObjects.Text;
    button = 1;
    btn:Array<Phaser.GameObjects.Image> = [];
	void_4!:Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };

    constructor(game:Sans) {
        this.UI = game.physics.add.group();
        this.wall = game.physics.add.staticGroup();
        this.window = game.add.rectangle(405, 366, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		this.window.scaleX = 3.0417850308514995;
		this.window.scaleY = 1.664624276933256;
		this.window.isStroked = true;
		this.window.lineWidth = 5;

        const name = game.add.text(159, 491, "", {});
		name.scaleX = 1.3189424588720287;
		name.scaleY = 1.508651214897031;
		name.text = "Chara";
		name.setStyle({ "fontFamily": "sans", "fontStyle": "bold" });

		const lv = game.add.text(238, 494, "", {});
		lv.scaleX = 1.015415872914643;
		lv.scaleY = 1.3525135987422716;
		lv.text = "VL19";
		lv.setStyle({ "fontFamily": "sans", "fontStyle": "bold" });

		const hp_dar = game.add.rectangle(399, 504, 128, 128);
		hp_dar.scaleX = 1.3089703907423496;
		hp_dar.scaleY = 0.1767681249437775;
		hp_dar.isStroked = true;
		hp_dar.lineWidth = 4;

		this.hp_number = game.add.text(494, 490, "", {});
		this.hp_number.scaleX = 1.0394450290445283;
		this.hp_number.scaleY = 1.4963779012336957;
		this.hp_number.text = "92/92";
		this.hp_number.setStyle({ "fontFamily": "sans", "fontStyle": "bold" });

		this.hp = game.add.rectangle(399, 504, 128, 128);
		this.hp.scaleX = 1.2374517433620529;
		this.hp.scaleY = 0.1468605601803351;
		this.hp.isFilled = true;
		this.hp.fillColor = 16771328;
		this.hp.isStroked = true;
		this.hp.lineWidth = 4;
        this.hp_1 = this.hp.scaleX;


		const void_1 = game.add.rectangle(-191, 160, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		game.physics.add.existing(void_1, true);
		void_1.body.setOffset(851, 162);
		void_1.body.setSize(30, 216, false);
		void_1.isFilled = true;
		void_1.fillColor = 0;
		
		const void_2 = game.add.rectangle(-190, 310, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		game.physics.add.existing(void_2, true);
		void_2.body.setOffset(439, 11);
		void_2.body.setSize(30, 216, false);
		void_2.isFilled = true;
		void_2.fillColor = 0;

		const void_3 = game.add.rectangle(946, 162, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		game.physics.add.existing(void_3, true);
		void_3.body.setOffset(-677, 125);
		void_3.body.setSize(402, 36, false);
		void_3.isFilled = true;
		void_3.fillColor = 0;

		this.void_4 = game.add.rectangle(948, 315, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		game.physics.add.existing(this.void_4, true);
		this.void_4.body.setOffset(-682, 220);
		this.void_4.body.setSize(405, 34, false);
		this.void_4.isFilled = true;
		this.void_4.fillColor = 0;
		game.down_void.static.add(this.void_4);
        this.wall.add(void_1);
        this.wall.add(void_2);
        this.wall.add(void_3);

		this.btn.push(game.add.image(130, 570, "btn_1_"));
		this.btn.push(game.add.image(315, 569, "btn_2"));
		this.btn.push(game.add.image(498, 568, "btn_3"));
		this.btn.push(game.add.image(686, 569, "btn_4"));
        for(let i=0; i < 4; i++) {
            this.UI.add(this.btn[i]);
        }
    }

	void_size(game:Sans, type:boolean) {
		var v_1 = 851, v_2 = 439, v_3 = { x:-677, y:125, size:402 }, v_4 = { x:-682, y:220, size:405 };
		game.down_void.static.remove(this.void_4);
		this.void_4.destroy();
		this.wall.clear(true, true);
		if(type) {
			v_1 = 1004;
			v_2 = 283;
			v_3.x = -846, v_3.y = 126, v_3.size = 733;
			v_4.x = -858, v_4.y = 218, v_4.size = 751;
		}
		const void_1 = game.add.rectangle(-191, 160, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		game.physics.add.existing(void_1, true);
		void_1.body.setOffset(v_1, 162);
		void_1.body.setSize(30, 216, false);
		void_1.isFilled = true;
		void_1.fillColor = 0;
		
		const void_2 = game.add.rectangle(-190, 310, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		game.physics.add.existing(void_2, true);
		void_2.body.setOffset(v_2, 11);
		void_2.body.setSize(30, 216, false);
		void_2.isFilled = true;
		void_2.fillColor = 0;
		
		const void_3 = game.add.rectangle(946, 162, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		game.physics.add.existing(void_3, true);
		void_3.body.setOffset(v_3.x, v_3.y);
		void_3.body.setSize(v_3.size, 36, false);
		void_3.isFilled = true;
		void_3.fillColor = 0;
		
		this.void_4 = game.add.rectangle(948, 315, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		game.physics.add.existing(this.void_4, true);
		this.void_4.body.setOffset(v_4.x, v_4.y);
		this.void_4.body.setSize(v_4.size, 34, false);
		this.void_4.isFilled = true;
		this.void_4.fillColor = 0;
		game.down_void.static.add(this.void_4);
		this.wall.add(void_1);
		this.wall.add(void_2);
		this.wall.add(void_3);
	}
}