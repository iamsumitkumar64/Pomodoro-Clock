document.getElementById('mode').addEventListener("click", () => {
    if (document.body.style.color == 'white') {
        document.body.setAttribute('style', 'color:#328d72;background-color: #f4f4f4;');
    } else {
        document.body.setAttribute('style', 'color:white;background-color: rgb(0,0,0);');
    }
})

let label = document.getElementsByTagName('label');
const cont = document.getElementById("cont");
const s_inc = document.getElementById("s_inc");
const s_dec = document.getElementById("s_dec");
const b_inc = document.getElementById("b_inc");
const b_dec = document.getElementById("b_dec");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
let s = 10, b = 5, s_min = 10, sec = 59, b_min = 5, s_obj, b_obj;
let flag = false;

function toggleButtons(disable) {
    s_inc.disabled = disable;
    s_dec.disabled = disable;
    b_inc.disabled = disable;
    b_dec.disabled = disable;
}

function s_inc_func() {
    s++;
    s_min = s;
    label[1].innerText = s;
}
function s_dec_func() {
    if (s == 0) { s = s; }
    else {
        s--;
        s_min = s;
        label[1].innerText = s;
    }
}

function b_inc_func() {
    b++;
    b_min = b;
    label[2].innerText = b;
}
function b_dec_func() {
    if (b == 0) { b = b; }
    else {
        b--;
        b_min = b;
        label[2].innerText = b;
    }
}

s_inc.addEventListener("click", s_inc_func);
s_dec.addEventListener("click", s_dec_func);
b_inc.addEventListener("click", b_inc_func);
b_dec.addEventListener("click", b_dec_func);

start.addEventListener("click", () => {
    if (flag == false) {
        toggleButtons(true);
        flag = true;
        s_obj = setInterval(() => {
            if (s_min >= 0) {
                label[0].innerText = `${s_min < 10 ? '0' + s_min : s_min}:${sec < 10 ? '0' + sec : sec}`;
                sec--;
                label[0].style.border = '1px solid rgb(89, 230, 235)';
                if (sec < 0) {
                    sec = 60;
                    s_min = s_min - 1;
                }
            }
            else {
                label[0].innerText = s_min + sec;
                cont.innerText = "Break Time";
                pausefunc();
                b_obj = setInterval(() => {
                    if (b_min >= 0) {
                        label[0].innerText = `${b_min < 10 ? '0' + b_min : b_min}:${sec < 10 ? '0' + sec : sec}`;
                        label[0].style.border = '1px solid rgb(255, 0, 0)';
                        sec--;
                        if (sec < 0) {
                            sec = 60;
                            b_min = b_min - 1;
                        }
                    } else { b_min = b; }
                }, 10);
            }
        }, 10);
    }
});

function pausefunc() {
    clearInterval(s_obj);
    clearInterval(b_obj);
    flag = false;
    toggleButtons(false);
}
pause.addEventListener("click", pausefunc);

function resetfunc() {
    clearInterval(s_obj);
    clearInterval(b_obj);
    flag = false;
    toggleButtons(false);
    s = 10;
    b = 5;
    s_min = 10;
    sec = 59;
    b_min = 5;
    label[1].innerText = s;
    label[2].innerText = b;
    cont.innerText = "Session Time";
    label[0].innerText = "00:00";
}
reset.addEventListener("click", resetfunc);