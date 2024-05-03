import htmx from 'htmx.org';
const title = document.getElementById("title") as HTMLElement;
const start_button = document.querySelector(".start_button") as HTMLElement;

document.addEventListener("DOMContentLoaded", function() {
    htmx.addClass(title,"down_1");
    htmx.addClass(start_button, "button_aim_1");
    setTimeout(() => {
        htmx.addClass(title,"down_2")
        htmx.addClass(start_button,"button_aim_2");
    },800);

    setTimeout(() => {
        htmx.removeClass(start_button,"button_aim_1");
        htmx.removeClass(start_button,"button_aim_2");
    },3000);
});