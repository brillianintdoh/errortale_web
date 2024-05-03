import * as Phaser from 'phaser';
import Sans from '../game';
import error from './error';
import sans_wow from './sans';
export const blaster_speed = 900;
var game:Sans;

export default class Create {
    sans:sans_wow;
    error:error;
    blaster_speed = 900;

    constructor(th:Sans) {
        game = th;
        this.sans = new sans_wow(th);
        this.error = new error(th);
    }

    sans_create(): Phaser.GameObjects.Sprite {
		const sans = game.add.sprite(403, 126, "sans_000");
		sans.scaleX = 0.7038438358693064;
		sans.scaleY = 0.6847207734798493;

        return sans;
    }

    glitch_create(): Phaser.GameObjects.Sprite {
		const glitch = game.add.sprite(399, 303, "glitch_9");
		glitch.scaleX = 2.9855493334980516;
		glitch.scaleY = 2.231651014897517;
		glitch.angle = -90;
        glitch.setDepth(10);

        return glitch;
    }

    glitch2_create(): Phaser.GameObjects.Sprite {
		const glitch2 = game.add.sprite(390, 298, "glitch2_19");
		glitch2.scaleX = 2.272822781218376;
		glitch2.scaleY = 1.9757390041514342;
		glitch2.angle = -90;
        glitch2.setDepth(10);

        return glitch2;
    }
}