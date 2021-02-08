let bars = document.querySelector('.bars');
let length_slider = document.querySelector('.length');
let speed_slider = document.querySelector('.speed');
let algorithms = document.querySelector('.sorting-algorithms');
let sort_button = document.querySelector('.sort-btn');
let reload_button = document.querySelector('.reload');
let burger = document.querySelector('.burger');
let nav_links = document.querySelector('.nav-links');

burger.addEventListener("click", showNav);

function showNav() {
    nav_links.classList.toggle('nav-active');
}

reload_button.addEventListener('click', () => location.reload());

length_slider.addEventListener('input', changeArraySize);
speed_slider.addEventListener('input', changeSpeed);
algorithms.addEventListener('change', changeAlgorithm);
sort_button.addEventListener('click', startAlgorithm);

var array_size = length_slider.value;
var speed = speed_slider.value;
var div_sizes = [];
var divs = [];
var start = 0;
var end = length_slider.value - 1;
var algorithm_name = "";

var blue = "#4285F4";
var red = "#EA4335";
var yellow = "#FBBC05";
var green = "#34A853";
var black = "black";
var grey = "grey";

var delay_time=10000/(Math.floor(array_size/5)*speed);
var c_delay=0;

function changeArraySize(e) {

    for(let i = 0; i < array_size; i++) {
        bars.removeChild(divs[i]);
        div_sizes.pop();
    }
    
    array_size = length_slider.value;
    generateArray(array_size);
}


function changeSpeed(e) {
    speed = speed_slider.value;
    delay_time=10000/(Math.floor(array_size/5)*speed);
    c_delay = 0;
}

// Generate bar
function generateArray(array_size) {

    for(let i = 0; i < array_size; i++) {
        h = Math.ceil(Math.random() * 400);
        divs[i] = document.createElement('div');
        bars.appendChild(divs[i]);
        divs[i].className = "bar";
        divs[i].style.height = `${h}px`;
        div_sizes[i] = h;
        if (array_size < 1) {
            divs[i].innerHTML = `<p>${h}</p>`
        }
    }
}


function changeAlgorithm() {
    algorithm_name = algorithms.value
}

function startAlgorithm() {
    nav_links.classList.toggle('nav-active');
    if(algorithm_name == "bubble_sort") {
        bubble_sort();
    } else if (algorithm_name == "selection_sort") {
        selection_sort();
    } else if (algorithm_name == "insertion_sort") {
        insertion_sort();
    } else if (algorithm_name == "quick_sort") {
        quick_sort(div_sizes, start, end);
    }
}

function disableAllButtons() {
    algorithms.disabled = true;
    length_slider.disabled = true;
    speed_slider.disabled = true;
    sort_button.disabled = true;
}

function enabelAllButtons() {
    window.setTimeout(() => {
        reload_button.style.display = "block";
    }, c_delay+delay_time);
}

generateArray(array_size);

// BUBBLE SORT
function bubble_sort(e) {
    disableAllButtons();
    for(var i = 0; i < div_sizes.length - 1; i++) {
        for(var j = 0; j < div_sizes.length - i - 1; j++) {

            divUpdate(divs[j], div_sizes[j], yellow);
            divUpdate(divs[j+1], div_sizes[j+1], yellow);

            if (div_sizes[j] > div_sizes[j+1]) {

                divUpdate(divs[j], div_sizes[j], red);
                divUpdate(divs[j+1], div_sizes[j+1], red);

                let temp = div_sizes[j];
                div_sizes[j] = div_sizes[j+1];
                div_sizes[j+1] = temp;

                divUpdate(divs[j], div_sizes[j], red);
                divUpdate(divs[j+1], div_sizes[j+1], red);
            }

            divUpdate(divs[j], div_sizes[j], blue);
        }
        divUpdate(divs[j], div_sizes[j], green);
    }
    enabelAllButtons();
    divUpdate(divs[0], div_sizes[0], green);
}

// SELECTION SORT
function selection_sort() {
    disableAllButtons();
    for(let i = 0; i < div_sizes.length; i++) {
        min_ind = i
        let old_min = i;
        divUpdate(divs[i], div_sizes[i], "grey");
        for(let j = i+1; j < div_sizes.length; j++) {
            
            divUpdate(divs[j], div_sizes[j], yellow);
            
            if (div_sizes[min_ind] > div_sizes[j]) {
                divUpdate(divs[min_ind], div_sizes[min_ind], blue);
                divUpdate(divs[old_min], div_sizes[old_min], "grey");
                min_ind = j
                divUpdate(divs[min_ind], div_sizes[min_ind], "black");
                continue;
            }
            
            divUpdate(divs[j], div_sizes[j], blue);
        }

        divUpdate(divs[i], div_sizes[i], red);
        divUpdate(divs[min_ind], div_sizes[min_ind], red);

        let temp = div_sizes[i];
        div_sizes[i] = div_sizes[min_ind];
        div_sizes[min_ind] = temp;

        divUpdate(divs[min_ind], div_sizes[min_ind], blue);
        divUpdate(divs[i], div_sizes[i], blue);

        divUpdate(divs[i], div_sizes[i], green);
    }
    enabelAllButtons();

}

// INSERTION SORT
function insertion_sort() {
    disableAllButtons();
    for(var i = 1; i < div_sizes.length; i++) {
        key = div_sizes[i];
        divUpdate(divs[i], key, yellow);
        j = i-1;
        while(j >= 0 && div_sizes[j] > key) {
            divUpdate(divs[j], div_sizes[j], red);
            divUpdate(divs[j+1], div_sizes[j+1], red);

            div_sizes[j+1] = div_sizes[j];

            divUpdate(divs[j],div_sizes[j],red);
            divUpdate(divs[j+1],div_sizes[j+1],red);

            divUpdate(divs[j],div_sizes[j],blue);
            if(j == (i-1)) {
                divUpdate(divs[j+1], div_sizes[j+1], yellow);
            }
            else {
                divUpdate(divs[j+1], div_sizes[j+1], blue);
            }
            j -= 1;
        }
        div_sizes[j+1] = key
        for(var t=0;t<i;t++)
        {
            divUpdate(divs[t],div_sizes[t],green);
        }
    }
    divUpdate(divs[i-1],div_sizes[i-1],green);
    enabelAllButtons();
}

// QUICK SORT
function quick_sort(arr, start, end) {
    if (start >= end) {
        return;
    }
    divs[start].style.height = `${div_sizes[start]}px`;
    divs[end].style.height = `${div_sizes[end]}px`;
    
    let index = partition(arr, start, end);
    quick_sort(arr, start, index - 1);
    quick_sort(arr, index + 1, end);    
}

function partition(arr, start, end) {
    let pivot_index = start;
    let pivot_value = arr[end];
    for(let i = start; i < end; i++) {
        if (arr[i] < pivot_value) {
            swap(arr, i, pivot_index);
            pivot_index++;
        }
    }
    swap(arr, pivot_index, end);

    return pivot_index;
}

function divUpdate(d, height, color) {
    window.setTimeout(() => {
        d.style.background = color
        d.style.height = `${height}px`;
        if(array_size < 1) {
            d.innerHTML = `<p>${height}</p>`
        }
    }, c_delay += delay_time);
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}