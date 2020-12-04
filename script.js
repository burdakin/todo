var todo_array = [];
var array_id = 0;
var del_num = 0;

function add_to_array() {
    let id_num = array_id++;
    let todo_parse = document.getElementById('todo_text').value;
    todo_array.push({id_num,todo_parse});
    storage();
    render();

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
        document.body.append(new_todo);
        add_del_btn(del_num);
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
            document.body.append(new_todo);
            add_del_btn(del_num);
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
    render();
}

function add_del_btn(num) {
    let new_del_btn = document.createElement('button');
    new_del_btn.value = "delete!";
    new_del_btn.id = 'del_btn';
    new_del_btn.setAttribute('onclick', 'delete_todo'+'(' + num + ')');
    new_del_btn.innerHTML = 'oodalee'
    document.getElementById(num).append(new_del_btn);
}

function delete_todo(del_num) {
    todo_array.splice(del_num,1);
    array_id = 0;
    render();
    storage();
}
