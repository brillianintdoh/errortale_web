import { sans_data } from '../game';
import { sans_text, sans_type } from './game';
export var battle = false;
var text_load = false;
var index = 1;
export function key_z(key: KeyboardEvent) {
    if((key.keyCode == 122 || key.keyCode == 90) && sans_type && index < sans_data.length && text_load) {
        text_add(sans_data[index].time, sans_data[index].type, sans_data[index].text);
        index++;
    }
}

export function text_add(time:number, type:number, value:string) {
    const text = document.querySelector(".text") as HTMLElement;
    const head = document.querySelector(".head") as HTMLElement;
    let i = 0;
    text.innerHTML = "";
    if(type == 1) {
        head.style.backgroundImage = "url('/img/game/sans_head.png')"; 
    }else if(type == 2) {
        head.style.backgroundImage = "url('/img/game/sans_head_2.png')"; 
    }else if(type == 3) {
        head.style.backgroundImage = "url('/img/game/sans_head_3.png')"; 
    }else if(type == 4) {
        head.style.backgroundImage = "url('/img/game/sans_head_4.png')"; 
    }

    const add = setInterval(() => {
        text.innerHTML+=value[i];
        i++;
        if(value[i] == undefined) {
            text_load = true;
            if(value[value.length - 1] == '`') {
                sans_text.style.display = 'none';
                battle = true;
                clearInterval(add);
            }else {
                clearInterval(add);
            }
        }else {
            text_load = false;
        }
    },time);
}