var todo_array = [];
var array_id = 1;
var del_num = 0;

function add_to_array() {
    if (document.getElementById('todo_text').value.length !== 0) {
        let id_num = array_id++;
        let todo_parse = document.getElementById('todo_text').value;
        todo_array.push({id_num, todo_parse});
        document.getElementById('todo_text').value = '';
        storage();
        render();
    } else {
        alert('Введите задачу')
    }
}

function render (){
    delete_old_render()
    for (let i=0; i<todo_array.length; i++) {
        let new_todo = document.createElement('div');
        new_todo.className = 'new_todo';
        let array_data_id = todo_array[i].id_num;
        new_todo.id = array_data_id;
        del_num = array_data_id;
        let array_data_text = todo_array[i].todo_parse;
        new_todo.innerHTML = '<b>' + array_data_id++ + ': ' + array_data_text + '</b>';
        document.getElementById('results').append(new_todo);
        add_del_btn(del_num);
        add_edit_btn(del_num);
    }
}


function delete_old_render() {
    for (let i = 0; i < todo_array.length; i++) {
        document.querySelectorAll('.new_todo').forEach(function (a) {
                a.remove();
            }
        )
    }
}


function storage() {
    let store_todo = JSON.stringify(todo_array);
    localStorage.setItem('todo_list',store_todo);
}

function render_from_storage() {
    todo_array = (JSON.parse(window.localStorage.getItem('todo_list')));
    array_id = 1;
    if (todo_array !== null) {
        //Сюда вставил кусок кода из render(), так как выпадала ошибка из-за функции удаления старого рендера//
        for (let i=0; i<todo_array.length; i++) {
            let new_todo = document.createElement('div');
            new_todo.className = 'new_todo';
            let array_data_id = todo_array[i].id_num;
            new_todo.id = array_data_id;
            del_num = array_data_id;
            let array_data_text = todo_array[i].todo_parse;
            new_todo.innerHTML = '<b>' + array_data_id++ + ': ' + array_data_text + '</b>';
            document.getElementById('results').append(new_todo);
            array_id = array_data_id;
            add_del_btn(del_num);
            add_edit_btn(del_num);
        }
    } else {
        todo_array = []
        }
}

function lstorage_clr() {
    for (let i = 0; i < todo_array.length; i++) {
        document.querySelectorAll('.new_todo').forEach(function (a) {
                a.remove();
            }
        )
    };
    window.localStorage.clear();
    todo_array = [];
    array_id = 1;
    render();
}

function add_del_btn(num) {
    let new_del_btn = document.createElement('button');
    new_del_btn.value = "delete";
    new_del_btn.id = 'del_btn';
    new_del_btn.className = 'del_btn';
    new_del_btn.setAttribute('onclick', 'delete_todo'+'(' + num + ')');
    new_del_btn.innerHTML = 'Удалить'
    document.getElementById(num).append(new_del_btn);
}

function delete_todo(del_num) {
    todo_array.splice(del_num,1);
    array_id = 0;
    render();
    storage();
}

function edit_todo() {
    let edit_num = +prompt('какой номер хочешь исправить?');
    let edit_todo = todo_array[edit_num].todo_parse;
    let edit_new_todo = prompt('введи новую задачу вместо ' + edit_todo);
    //вот здесь не знаю, нужно ли это, но вставил на всякий случай, чтобы имена переменных и ключи объектов совпали//
    let id_num = edit_num;
    let todo_parse = edit_new_todo;
    delete todo_array[edit_num];
    todo_array.splice(edit_num, 1, {id_num, todo_parse});
    render();
    storage();
}


function add_edit_btn(num) {
    let new_edit_btn = document.createElement('button');
    new_edit_btn.value = "edit";
    new_edit_btn.id = 'edit_btn'+num;
    new_edit_btn.className = 'edit_btn';
    new_edit_btn.setAttribute('onclick', 'edit_todo1'+'(' + num + ')');
    new_edit_btn.innerHTML = 'Редактировать'
    document.getElementById(num).append(new_edit_btn);
}

function edit_todo1(num) {
    let edit_input = document.createElement("input");
    edit_input.placeholder = 'отредактируйте задачу';
    edit_input.className = 'edit_input';
    edit_input.id = ('edit_input'+num);
    edit_input.setAttribute(onsubmit, 'edit_input_close' + '(' + num + ')'); //изменить название функции//
    document.getElementById(num).append(edit_input);
    let edit_btn = document.getElementById('edit_btn'+num);
    edit_btn.setAttribute('onclick', 'edit_input_close('+ num + ')')


}

function edit_input_close(num) {
    let edit_close = document.getElementById('edit_input'+num);
    edit_close.remove();
    let edit_btn = document.getElementById('edit_btn'+num);
    edit_btn.setAttribute('onclick', 'edit_todo1'+'(' + num + ')')
    /*render();
    storage();
     */
}

/*функция для получения текста и id по индексу массива, вставки текста в placeholder инпута, замены его в массиве*/