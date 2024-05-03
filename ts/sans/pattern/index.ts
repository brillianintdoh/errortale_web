import Sans, { user } from '../game';
import pattern_1 from './1';
import pattern_2 from './2';
import pattern_3 from './3';
import pattern_4 from './4';

export default class Pattern {
    game:Sans;
    trun = 1;

    constructor(game:Sans) {
        this.game = game;
    }

    next(is?:number) {
        user.setVisible(true);
        var wow = this.trun;
        if(is) {
            wow = is;
        }

        if(wow == 1) {
            new pattern_1(this.game);
        }else if(wow == 2) {
            new pattern_2(this.game);
        }else if(wow == 3) {
            new pattern_3(this.game);
        }else if(wow == 4) {
            new pattern_4(this.game);
        }
        if(!is) {
            this.trun+=1;
        }
    }
}