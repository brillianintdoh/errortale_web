import Sans, { attack, ui, user } from '../../game';
import { blaster_speed } from '..';
type cord = {
    create: {
        x:number,
        y:number
    },
    x:number
};

export default class sans_wow {
    game:Sans;
    floor!: Phaser.GameObjects.Container;

    constructor(game:Sans) {
        this.game = game;
    }

    bone_create():Phaser.GameObjects.Container {
        const game = this.game;
        const bone = game.add.container(949, 115);
        
        const bone_a = game.add.sprite(-392, 314, "bone");
        bone_a.scaleX = 0.17186083809873803;
        bone_a.scaleY = 0.1554256751412092;
        bone_a.angle = -90;
        bone.add(bone_a);
        
        const bone_body = game.add.rectangle(-192, 256, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
        bone_body.visible = false;
        game.physics.add.existing(bone_body, false);
        bone_body.body.setOffset(-147, 85);
        bone_body.body.setSize(21, 72, false);
        bone_body.isFilled = true;
        bone.add(bone_body);
        attack.add(bone_body);
        
        return bone;
    }

    blaster_right_create(x:number ,y:number) {
        const game = this.game;
		const gaster_blaster = game.add.container(x,y);
		const GasterBlaster = game.add.sprite(670, 353, "blaster_02");
		GasterBlaster.angle = -90;
		gaster_blaster.add(GasterBlaster);

		const beam_body = game.add.rectangle(1350, 471, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
        beam_body.visible = false;
		game.physics.add.existing(beam_body, false);
		beam_body.body.setOffset(-623, -71);
		beam_body.body.setSize(445, 32, false);
		beam_body.isFilled = true;
		gaster_blaster.add(beam_body);
        attack.add(beam_body);

		const beam = game.add.image(600, 355, "beam");
		beam.scaleX = 2.1220271226025975;
		beam.scaleY = 0;
		beam.angle = -90;
		gaster_blaster.add(beam);

        GasterBlaster.play("gaster_blaster");
        setTimeout(() => {
            game.tweens.add({
                targets:beam_body,
                x:910,
                duration:blaster_speed
            });
            game.tweens.add({
                targets:beam,
                x:442,
                scaleY:3.478520483738134,
                duration:blaster_speed,
                onComplete:() => {
                    attack.remove(beam_body);
                    gaster_blaster.destroy();
                }
            });
        },350);
    }

    blaster_left_create(x:number, y:number) {
        const game = this.game;
        const gaster_blaster = game.add.container(x, y);
		const GasterBlaster = game.add.sprite(125, 362, "blaster_02");
		GasterBlaster.angle = 90;
		gaster_blaster.add(GasterBlaster);

		const beam = game.add.image(100, 366, "beam");
		beam.scaleX = 2.1220271226025975;
		beam.scaleY = 0;
		beam.angle = -90;
		gaster_blaster.add(beam);

		const beam_body = game.add.rectangle(-300, 452, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		beam_body.visible = false;
		game.physics.add.existing(beam_body, false);
		beam_body.body.setOffset(287, -42);
		beam_body.body.setSize(449, 34, false);
		beam_body.isFilled = true;
        attack.add(beam_body);
		gaster_blaster.add(beam_body);

        GasterBlaster.play("gaster_blaster");
        setTimeout(() => {
            game.tweens.add({
                targets:beam_body,
                x:-82,
                duration:blaster_speed
            });
            game.tweens.add({
                targets:beam,
                x:432,
                scaleY:3.478520483738134,
                duration:blaster_speed,
                onComplete:() => {
                    attack.remove(beam_body);
                    gaster_blaster.destroy();
                }
            });
        },350);
    }
    
    blaster_up_create(x:number ,y:number) {
        const game = this.game;
		const gaster_blaster = game.add.container(x, y);

		const GasterBlaster = game.add.sprite(148, 168, "blaster_02");
		GasterBlaster.angle = -180;
		gaster_blaster.add(GasterBlaster);

		const beam = game.add.image(144, 180, "beam") as Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body };
		beam.scaleX = 2.1220271226025975;
		beam.scaleY = 0;
		game.physics.add.existing(beam, false);
		beam.body.setOffset(37, 1);
		beam.body.setSize(16, 128, false);
        attack.add(beam);
		gaster_blaster.add(beam);
        GasterBlaster.play("gaster_blaster");

        game.tweens.add({
            targets:beam,
            y:345,
            scaleY:2.558424943599719,
            duration:blaster_speed,
            onComplete: () => {
                attack.remove(beam);
                gaster_blaster.destroy();
            }
        });
    }


    LongBone_left_create(length:number): Phaser.GameObjects.Container {
        const game = this.game;
        const bone_left = game.add.container(-10, -248);

        let j=0;
        for(let i=0; i < length; i++) {
            const body = game.add.container(-470, j) as Phaser.GameObjects.Container & { body: Phaser.Physics.Arcade.Body };
            game.physics.add.existing(body, false);
            body.body.setOffset(486, 298);
            body.body.setSize(393, 26, false);
            attack.add(body);
            bone_left.add(body);
            const bone = game.add.image(677, 311, "longBone");
            bone.scaleX = -2.410212270157668;
            bone.scaleY = 5.53376642678186;
            bone.angle = -90;
            body.add(bone);
            j+=150;
        }

        return bone_left;
    }

    LongBone_right_create(length:number): Phaser.GameObjects.Container {
        const game = this.game;
		const bone_right = game.add.container(394, -173);

        let j=0;
        for(let i=0; i < length; i++) {
            const body = game.add.container(-470, j) as Phaser.GameObjects.Container & { body: Phaser.Physics.Arcade.Body };
            game.physics.add.existing(body, false);
            body.body.setOffset(486, 298);
            body.body.setSize(393, 26, false);
            attack.add(body);
            bone_right.add(body);
            const bone = game.add.image(677, 311, "longBone");
            bone.scaleX = -2.410212270157668;
            bone.scaleY = 5.53376642678186;
            bone.angle = -90;
            body.add(bone);
            j+=150;
        }

        return bone_right;
    }

    bone_throw(cord:cord,t?:number) {
        const game = this.game;
        var time = 800;
        if(t) time = t;
		const bone = game.add.image(cord.create.x, cord.create.y, "bone") as Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body };
		bone.scaleX = 0.30116949706511575;
		bone.scaleY = 0.16090000475359578;
		game.physics.add.existing(bone, false);
		bone.body.setOffset(0, 15);
		bone.body.setSize(459, 149, false);
        attack.add(bone);

        game.tweens.add({
            targets:bone,
            x:cord.x,
            duration:time,
            onComplete: () => {
                attack.remove(bone);
                bone.destroy();
            }
        });
    }

    plate_create(): Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body } {
        const game = this.game;
        ui.void_size(game,true);
        game.tweens.add({
            targets:ui.window,
            scaleX:5.561041920081929,
            duration:800,
            onComplete: () => {
                user.setPosition(405,371);
                game.Soul(true);
                this.floor = game.add.container(96, 86);
                
                const bone_1 = game.add.image(537, 364, "bone_floor") as Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body };
                game.physics.add.existing(bone_1, false);
                bone_1.body.setSize(216, 35, false);
                this.floor.add(bone_1);
                attack.add(bone_1);

                const bone_2 = game.add.image(309, 364, "bone_floor") as Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body };
                game.physics.add.existing(bone_2, false);
                bone_2.body.setSize(216, 35, false);
                this.floor.add(bone_2);
                attack.add(bone_2);

                const bone_3 = game.add.image(77, 364, "bone_floor") as Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body };
                game.physics.add.existing(bone_3, false);
                bone_3.body.setSize(216, 35, false);
                this.floor.add(bone_3);
                attack.add(bone_3);
            }
        });

        const plate = game.add.rectangle(407, 413, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
        plate.scaleY = 0.08953814198347199;
        game.physics.add.existing(plate, false);
        plate.body.setSize(128, 128, false);
        plate.isFilled = true;
        plate.fillColor = 10066329;
        plate.strokeColor = 0;
        game.down_void.group.add(plate);
        return plate;
    }
}