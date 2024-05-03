import Sans from './game';
export default class sound {
    check = false;
    game: Sans;
    constructor(game:Sans) {
        this.game = game;
    }

    next(fu:Function) {
        const game = this.game;
        this.check = true;
        var part:Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
        if(game.bgm.loop) {
            part = game.bgm.part_loop;
        }else {
            part = game.bgm.part;
        }
        part.once("complete", () => {
            if(this.check) {
                game.bgm.part.destroy();
                game.bgm.part_loop.destroy();
                game.bgm.count += 1;
                game.bgm.part = game.sound.add("part_"+game.bgm.count);
                game.bgm.part_loop = game.sound.add("partLoop_"+game.bgm.count);
                game.bgm.part.play();
                game.bgm.loop = false;
                this.check = false;
                fu();

                game.bgm.part.once("complete", () => {
                    if(!this.check && !game.over) {
                        game.cameras.main.shake(800, 0.01);
                        setTimeout(() => game.bgm.part_loop.play(), 700);
                        game.bgm.loop = true;
                    }
                });

                game.bgm.part_loop.once("complete", () => {
                    if(!this.check && !game.over) {
                        game.cameras.main.shake(800, 0.01);
                        setTimeout(() => game.bgm.part_loop.play(), 700);
                    }
                });
            }
        });
    }
}