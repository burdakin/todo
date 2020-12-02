var todo_array = [];
var array_id = 0;

function add_to_array() {
    let todo_parse = document.getElementById('todo_text').value;
    let id_num = array_id++;
    todo_array.push({id_num,todo_parse});
    render();
    storage();
}

function render (){
    delete_old_render()
    array_id = 1;
    for (let i=0; i<todo_array.length; i++) {
        let array_data_id = todo_array[i].id_num;
        let array_data_text = todo_array[i].todo_parse;
        let new_todo = document.createElement('div');
        new_todo.id = 'new_todo';
        let del_btn = add_del_btn(i);
        new_todo.innerHTML = array_id++ + ': ' + array_data_text + ": " + del_btn;
        document.body.append(new_todo);

    }
}

function delete_todo(num) {
    /*alert('э, ты чё?');
    let delete_num = +prompt('какой номер задачи ты хочешь удалить?');*/
    todo_array.splice(num,1);
    render();
    storage();
}

//чот из-за смены классов на айди перестала работать эта функция//
function delete_old_render() {
    document.querySelectorAll('#new_todo').forEach(function (a) {
    a.remove();}
    )
}

function add_del_btn(num) {
    let todo_num = num;
    let new_del_btn = document.createElement('button');
    new_del_btn.id = 'del_btn';
    document.getElementById('new_todo').append(new_del_btn);

    /*new_del_btn.onclick = delete_todo(todo_num);*/
}

function edit_todo() {
    let edit_num = +prompt('какой номер хочешь исправить?');
    let edit_todo = todo_array[edit_num].todo_parse;
    let edit_new_todo = prompt('введи новую задачу вместо ' + edit_todo);
    //вот здесь не знаю, нужно ли это, но вставил на всякий случай, чтобы имена переменных и ключи объектов совпали//
    let id_num = edit_num;
    let todo_parse = edit_new_todo;
    delete todo_array[edit_num];
    todo_array.splice(edit_num,1,{id_num,todo_parse});
    render();
    storage();
}

function storage() {
    let store_todo = JSON.stringify(todo_array);
    localStorage.setItem('todo_list',store_todo);
}

function render_from_storage() {
    todo_array = (JSON.parse(window.localStorage.getItem('todo_list')));
    if (todo_array !== null) {
        //Сюда вставил кусок кода из render(), так как выпадала ошибка из-за функции удаления старого рендера//
        for (let i = 0; i < todo_array.length; i++) {
            let new_todo = document.createElement('div');
            new_todo.className = 'new_todo';
            /*let array_data_id = todo_array[i].id_num;*/
            let array_data_text = todo_array[i].todo_parse;
            new_todo.innerHTML = '<b>' + array_id++ + ': ' + array_data_text + '</b>';
            document.body.append(new_todo);
        }
    } else {
        todo_array = []
        }
}

function lstorage_clr() {
    delete_old_render();
    window.localStorage.clear();
}