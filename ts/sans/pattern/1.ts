import Sans, { ui, user } from '../game';

export default class pattern_1 {
    group;

    constructor(game:Sans) {
        this.group = game.physics.add.group();
        const create = game.creates;
        user.setVisible(true);
        ui.window.setVisible(true);
        
        const glitch = create.glitch_create();
        glitch.play("glitch");
        glitch.on("animationcomplete", () => {
            game.sans.play("sans_page1");
            game.Soul(true);
            const bone_1 = create.sans.bone_create();
            bone_1.setPosition(975, 116);
            this.group.add(bone_1);

            const bone_2 = create.sans.bone_create();
            bone_2.setPosition(616, 116);
            this.group.add(bone_2);
            
            game.trun_evt = setInterval(() => {
                game.tweens.add({
                    targets:bone_1,
                    x:616,
                    y:115,
                    duration:1000,
                    onComplete: () => {
                        game.tweens.add({
                            targets:bone_1,
                            x:975,
                            y:116,
                            duration:1000
                        });
                    }
                });
                game.tweens.add({
                    targets:bone_2,
                    x:841,
                    y:116,
                    duration:1000,
                    onComplete: () => {
                        game.tweens.add({
                            targets:bone_2,
                            x:616,
                            y:116,
                            duration:1000
                        });
                    }
                });
            },2100);
            setTimeout(() => {
                clearInterval(game.trun_evt);
                glitch.destroy();
                this.group.clear(true, true);
                game.pattern.next();
            },15000);
        });
    }
}