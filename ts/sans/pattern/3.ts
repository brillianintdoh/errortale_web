import Sans from '../game';

export default class pattern_3 {
	create;
	game:Sans;
    constructor(game:Sans) {
		this.game = game;
		this.create = game.creates;
		const left = this.create.sans.LongBone_left_create(7);
		const right = this.create.sans.LongBone_right_create(7);

		game.tweens.add({
			targets:left,
			y:-1248,
			duration:8000,
			onComplete: () => {
				left.destroy();
			}
		});

		game.tweens.add({
			targets:right,
			y:-1173,
			duration:8000,
			onComplete: () => {
				right.destroy();
			}
		});

		setTimeout(() => {
			this.create.sans.blaster_left_create(6,-62);
			this.create.sans.blaster_left_create(16,70);
			setTimeout(() => {
				this.create.sans.blaster_right_create(22,8);
				this.create.sans.blaster_left_create(10,78);

				setTimeout(() => {
					this.create.sans.bone_throw({ create: { x:677, y:374 } , x: 142 });
					this.create.sans.bone_throw({ create: { x:140, y:436 } , x: 676 });
					this.create.sans.bone_throw({ create: { x:140, y:436 } , x: 676 });
					setTimeout(() => {
						this.create.sans.bone_throw({ create: { x:663, y:305 } , x: 138 });
						this.create.sans.bone_throw({ create: { x:138, y:367 } , x: 677 });
						setTimeout(() => {
							this.plate();
						},500);
					},400);
				},800);
			},900);
		},5500);
    }

	plate() {
		setTimeout(() => {
			this.create.sans.blaster_right_create(-2,32);
			setTimeout(() => {
				this.create.sans.blaster_left_create(7,-38)
				setTimeout(() => this.create.sans.blaster_right_create(5, 36), 1000);
			},1000);
		},1500);
		const board = this.create.sans.plate_create();
		this.game.tweens.add({
			targets:board,
			x:657,
			y:413,
			duration:7000,
			onComplete: () => {
				this.create.sans.bone_throw({ create: { x:882, y:396 }, x:-83 },1000);
				setTimeout(() => {
					this.create.sans.blaster_up_create(347,-29)
					setTimeout(() => {
						this.create.sans.blaster_up_create(303,-40);
						this.create.sans.bone_throw({create: { x:-40, y:352 }, x:895},1000);
						setTimeout(() => this.create.sans.bone_throw({ create: { x:895, y:386 }, x:-80 },1000),1000);
						setTimeout(() => this.create.sans.blaster_left_create(-2,-19), 1500);
					},1000);
				},1000);
				setTimeout(() => {
					this.create.sans.blaster_up_create(11,-30)
					this.game.soundOn.next(() => {
						const loop = setInterval(() => this.game.cameras.main.shake(80,0.05), 100);
						this.game.sans.destroy();
						this.game.cameras.main.setAlpha(0.5);
						this.game.sans = this.create.sans_create();
						const glitch = this.create.glitch2_create();
						glitch.play("glitch2");
						this.game.sans.play("error_start");
						this.game.sans.on("animationcomplete", () => {
							clearInterval(loop);
							this.game.cameras.main.setAlpha(1);
							glitch.destroy();
							this.game.sans.play("error_sans");
							this.create.sans.floor.destroy();
							board.destroy();
							this.game.trun(true);
						});
					});
				},5500);
				
				this.game.tweens.add({
					targets:board,
					x:156,
					y:413,
					duration:8000,
					onComplete: () => {
						this.game.bgm.part_loop.seek = 8;
						board.body.setImmovable(true);
					}
				});
			}
		});
	}
}