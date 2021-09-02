
let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let button = null;
let valueInput = '';
let input = null

window.onload = function init() {
    input = document.querySelector('.todo__input input');
    input.addEventListener('keyup', updateInput)
    button = document.querySelector('.todo__button button');
    button.addEventListener('click', addTask);
    localStorage.setItem('tasks', JSON.stringify(allTasks))
    render();
}


const render = () => {

    console.log(allTasks);
    const uncompleteTasks = document.querySelector('.uncompleted__tasks');
    uncompleteTasks.innerHTML = '';
    allTasks.map((elem, index) => {
        let inputText = document.createElement('input');
        inputText.className = 'input__text'
        const div = document.createElement('div');
        div.className = 'container__task'
        const checkBox = document.createElement('input');
        const checkText = document.createElement('div');
        checkText.className = 'check__text';
        const buttonChangeDel = document.createElement('div');
        buttonChangeDel.className = 'but__change-del';
        checkBox.type = 'checkbox';
        checkBox.checked = elem.check;
        checkBox.onchange = function () {
            checkBoxChange(elem)
        }
        checkText.appendChild(checkBox);

        const text = document.createElement('p');
        text.style.margin = '0 10px';
        text.innerText = elem.text;
        elem.check ? text.className = 'done' : text.className = ''
        checkText.appendChild(text);


        const editImg = document.createElement('img');
        editImg.src = '/img/edit.svg';
        editImg.className = 'img';
        buttonChangeDel.appendChild(editImg);



        const doneImg = document.createElement('img');
        doneImg.src = '/img/check-mark.svg';
        doneImg.className = 'img hidden';
        buttonChangeDel.appendChild(doneImg);

        const delImg = document.createElement('img');
        delImg.src = '/img/delete.svg';
        delImg.className = 'img';

        buttonChangeDel.appendChild(delImg);
        div.appendChild(checkText);
        div.appendChild(buttonChangeDel);

        delImg.addEventListener('click', () => delTask(index));

        editImg.addEventListener('click', function () {
            editImg.classList.add('hidden');
            delImg.classList.add('hidden');
            inputText.classList.remove('hidden');
            inputText.value = text.innerHTML;
            inputText.onfocus = function (e) {
                selectText(e);
            };
            checkText.appendChild(inputText);
            text.classList.add('hidden');

            doneImg.classList.remove('hidden');
        })

        doneImg.addEventListener('click', function () {
            doneImg.classList.add('hidden');
            inputText.classList.add('hidden');
            editImg.classList.remove('hidden');
            console.log(inputText.value);
            elem.text = inputText.value;
            input.value = '';
            localStorage.setItem('tasks', JSON.stringify(allTasks))
            text.classList.remove('hidden');
            delImg.classList.remove('hidden');
            render();
        })

        uncompleteTasks.appendChild(div);

    });
    const inputDel = document.querySelector('.input__clear-one input');
    const oneDelItemStorage = document.querySelector('.but__clear-one button');
    oneDelItemStorage.addEventListener('click', () => {
        if (inputDel.value) {
            localStorage.removeItem(inputDel.value);
            allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            inputDel.value = '';
            render();
        }
    })
    const allDelItemStorage = document.querySelector('.container__clear__all button');
    allDelItemStorage.addEventListener('click', () => {
        localStorage.clear();
        allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        render();
    })
}

const updateInput = (e) => {
    if (e.target.value) {
        valueInput = e.target.value;
    }
}
const addTask = (e) => {
    allTasks.push({ text: valueInput, check: false });
    valueInput = '';
    input.value = '';
    localStorage.setItem('tasks', JSON.stringify(allTasks))
    render();
}
const checkBoxChange = (elem) => {
    elem.check = !elem.check;
    localStorage.setItem('tasks', JSON.stringify(allTasks))
    render();
}

const delTask = (index) => {
    allTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(allTasks))
    render();
}

const selectText = (e) => {
    e.target.select()
    console.log(e);
}

