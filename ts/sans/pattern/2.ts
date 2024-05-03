import Sans from '../game';

export default class pattern_2 {
    constructor(game:Sans) {
        const create = game.creates;
        game.Soul(false);
        create.sans.blaster_right_create(3,90);
        setTimeout(() => { 
            create.sans.blaster_up_create(362,-29);
            create.sans.blaster_left_create(21,-22);
            setTimeout(() => {
                create.sans.blaster_right_create(-7,-59);
                setTimeout(() => {
                    create.sans.blaster_left_create(0,0);
                    setTimeout(() => game.trun(true), 1000);
                },1000);
            },1000);
        },1000);
    }
}