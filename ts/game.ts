import * as Phaser from 'phaser';
import htmx from 'htmx.org';
import { corridor } from './corridor/game';
import { key_z } from './corridor';
import Sans from './sans/game';
export const game = document.querySelector(".game") as HTMLElement;
export const sans_data:Array< { text:string, time:number, type:number } > = [];
export const width = 800;
export const height = 600;
export var sans_page1: Phaser.Types.Animations.Animation;
export var start_sans: Phaser.Types.Animations.Animation;
export var glitch_json: Phaser.Types.Animations.Animation;
export var glitch2_json: Phaser.Types.Animations.Animation;
export var gaster_blaster_json: Phaser.Types.Animations.Animation;
export var error_blaster_json: Phaser.Types.Animations.Animation;
export var death_json: Phaser.Types.Animations.Animation;
export var attack_json: Phaser.Types.Animations.Animation;
export var error_start_json: Phaser.Types.Animations.Animation;
export var error_sans_json: Phaser.Types.Animations.Animation;
export var page_1: sprite;
export var sans_start: sprite;
export var glitch: sprite;
export var glitch2: sprite;
export var gaster_blaster:sprite;
export var error_blaster:sprite;
export var death:sprite;
export var attack:sprite;
export var error_start:sprite;
export var error_sans:sprite;
export var battle_data:Array<{ text:string }> = [];
export var item: {
    index:number,
    row:number,
    item:string,
    hp:number
}[];
type sprite = {
    url: string;
    type: string;
    key: string;
}[];

document.addEventListener("DOMContentLoaded", async function() {
    const data = await (await fetch("/sans.json")).json();
    const battle_json = await (await fetch("/game/sans.json")).json() as Array<{ text:string }>;
    battle_json.forEach((value) => {
        battle_data.push({ text: value.text });
    });
    sans_page1 = await (await fetch("/game/res/json/sans_page1.json")).json() as Phaser.Types.Animations.Animation;
    start_sans = await (await fetch("/game/res/json/start_sans.json")).json() as Phaser.Types.Animations.Animation;
    glitch_json = await (await fetch("/game/res/json/glitch.json")).json() as Phaser.Types.Animations.Animation;
    glitch2_json = await (await fetch("/game/res/json/glitch2.json")).json() as Phaser.Types.Animations.Animation;
    gaster_blaster_json = await (await fetch("/game/res/json/gaster_blaster.json")).json() as Phaser.Types.Animations.Animation;
    error_blaster_json = await (await fetch("/game/res/json/error_blaster.json")).json() as Phaser.Types.Animations.Animation;
    death_json = await (await fetch("/game/res/json/death.json")).json() as Phaser.Types.Animations.Animation;
    attack_json = await (await fetch("/game/res/json/attack.json")).json() as Phaser.Types.Animations.Animation;
    error_start_json = await (await fetch("/game/res/json/error_start.json")).json() as Phaser.Types.Animations.Animation;
    error_sans_json = await (await fetch("/game/res/json/error_sans.json")).json() as Phaser.Types.Animations.Animation;
    data.forEach((value: { text:string, time:number, type:number }) => { 
        const { text, time, type } = value;
        sans_data.push({
            text:text,
            time:time,
            type:type
        });
    });
    page_1 = await (await fetch("/img/game/json/page_1.json")).json() as sprite;
    gaster_blaster = await (await fetch("/img/game/json/gaster_blaster.json")).json() as sprite;
    error_blaster = await (await fetch("/img/game/json/error_blaster.json")).json() as sprite;
    sans_start = await (await fetch("/img/game/json/sans_start.json")).json() as sprite;
    glitch = await (await fetch("/img/game/json/glitch.json")).json() as sprite;
    glitch2 = await (await fetch("/img/game/json/glitch2.json")).json() as sprite;
    death = await (await fetch("/img/game/json/death.json")).json() as sprite;
    attack = await (await fetch("/img/game/json/attack.json")).json() as sprite;
    error_start = await (await fetch("/img/game/json/error_start.json")).json() as sprite;
    error_sans = await (await fetch("/img/game/json/error_sans.json")).json() as sprite;
    item = await (await fetch("/game/tool.json")).json();
    const config: Phaser.Types.Core.GameConfig = {
        type:Phaser.AUTO,
        width:width,
        height:height,
        scene: [ corridor, Sans ],
        parent:game,
        physics: {
            default:"arcade",
            arcade: {
                gravity:{x:0, y:0}
            }
        }
    }
    const canvas = new Phaser.Game(config).canvas;
    htmx.addClass(canvas, "wow");
});

document.addEventListener("keyup", function(key) {
    key_z(key);
});