import { blaster_speed } from '..';
import Sans, { attack } from '../../game';

export default class erorr {
    game:Sans;

    constructor(game:Sans) {
        this.game = game;
    }

    ErrorBlaster_right_create(x:number, y:number) {
        const game = this.game;
		const error_blaster = game.add.container(x,y);

		const blaster = game.add.sprite(718, 363, "error_blaster_00");
		blaster.angle = 90;
		error_blaster.add(blaster);

		const beam = game.add.sprite(772, 363, "beam_error");
		beam.scaleX = 2.1220271226025975;
		beam.scaleY = 3.478520483738134;
		beam.angle = -90;
		error_blaster.add(beam);

		const beam_body = game.add.rectangle(1180, 178, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		beam_body.visible = false;
		game.physics.add.existing(beam_body, false);
		beam_body.body.setOffset(-671, 228);
		beam_body.body.setSize(449, 34, false);
		beam_body.isFilled = true;
		error_blaster.add(beam_body);
        attack.add(beam_body);

        blaster.play("error_blaster");
        game.tweens.add({
            targets:beam_body,
            x:940,
            duration:blaster_speed,
        });
        game.tweens.add({
            targets:beam,
            x:430,
            duration:blaster_speed,
            onComplete: () => {
                attack.remove(beam_body);
                error_blaster.destroy();
            }
        });
    }
}