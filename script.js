var todo_array = [];
var done_array = [];
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

function render() {
    delete_old_render()
    for (let i = 0; i < todo_array.length; i++) {
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
        add_check(del_num);
    }
}

function delete_old_render() {
    document.querySelectorAll('.new_todo').forEach(function (a) {
            a.remove();
        }
    )
}

function storage() {
    let store_todo = JSON.stringify(todo_array);
    localStorage.setItem('todo_list', store_todo);
}

function render_from_storage() {
    document.getElementById('done').style.visibility = 'hidden';
    todo_array = (JSON.parse(window.localStorage.getItem('todo_list')));
    array_id = 1;
    if (todo_array !== null) {
        for (let i = 0; i < todo_array.length; i++) {
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
            add_check(del_num);
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
    }
    ;
    for (let i = 0; i < done_array.length; i++) {
        document.querySelectorAll('.done').forEach(function (a) {
                a.remove();
            }
        )
    }
    ;
    window.localStorage.clear();
    todo_array = [];
    array_id = 1;
    render();
    document.getElementById('done').style.visibility = 'hidden';
}

function add_del_btn(num) {
    let new_del_btn = document.createElement('button');
    new_del_btn.value = "delete";
    new_del_btn.id = 'del_btn';
    new_del_btn.className = 'del_btn';
    new_del_btn.setAttribute('onclick', 'delete_todo' + '(' + num + ')');
    new_del_btn.innerHTML = 'Удалить'
    document.getElementById(num).append(new_del_btn);
}

function delete_todo(del_num) {
    let index = todo_array.findIndex(i => i.id_num === del_num);
    todo_array.splice(index, 1);
    array_id = 0;
    render();
    storage();
}

function add_edit_btn(num) {
    let new_edit_btn = document.createElement('button');
    new_edit_btn.value = "edit";
    new_edit_btn.id = 'edit_btn' + num;
    new_edit_btn.className = 'edit_btn';
    new_edit_btn.setAttribute('onclick', 'edit_todo' + '(' + num + ')');
    new_edit_btn.innerHTML = 'Редактировать'
    document.getElementById(num).append(new_edit_btn);
}

function edit_todo(num) {
    let edit_input = document.createElement("input");
    edit_input.placeholder = 'отредактируйте задачу';
    edit_input.className = 'edit_input';
    edit_input.id = ('edit_input' + num);
    edit_input.setAttribute(onsubmit, 'edit_input_close' + '(' + num + ')');
    document.getElementById(num).append(edit_input);
    let edit_btn = document.getElementById('edit_btn' + num);
    edit_btn.setAttribute('onclick', 'edit_input_close(' + num + ')');
    edit_btn.innerHTML = 'Сохранить';
}

function edit_input_close(num) {
    let index = todo_array.findIndex(i => i.id_num === num);
    let old_todo_text = todo_array[index].todo_parse;
    let old_todo_id = todo_array[index].id_num;
    let edited_todo = ({id_num: old_todo_id, todo_parse: document.getElementById('edit_input' + num).value});
    todo_array.splice(index, 1, edited_todo);
    let edit_close = document.getElementById('edit_input' + num);
    edit_close.remove();
    let edit_btn = document.getElementById('edit_btn' + num);
    edit_btn.setAttribute('onclick', 'edit_todo' + '(' + num + ')')
    render();
    storage();
}

function add_check(num) {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'check' + num;
    checkbox.className = 'checkbox';
    checkbox.setAttribute('onclick', 'add_to_done(' + num + ')');
    document.getElementById(num).append(checkbox);
}

function add_to_done(num) {
    document.getElementById('done').style.visibility = 'visible';
    let index = todo_array.findIndex(i => i.id_num === num);
    let id_done = num;
    let text_done = todo_array[index].todo_parse;
    done_array.push({id_done, text_done});
    //засунуть в другую функцию или переделать старую под параметр//
    let store_todo = JSON.stringify(done_array);
    localStorage.setItem('done_list', store_todo);
    let done = document.createElement('div');
    done.className = 'done';
    let array_data_id = done_array[done_array.length - 1].id_done;
    done.id = array_data_id;
    let array_data_text = done_array[done_array.length - 1].text_done;
    done.innerHTML = '<i>' + num + ': ' + array_data_text + '</i>';
    document.getElementById('done').append(done);
    delete_todo(num);
}
