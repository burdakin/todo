var todo_array = [];
var array_id = 0;

function add_to_array() {
    let todo_parse = document.getElementById('todo_text').value;
    let id_num = array_id++;
    todo_array.push({id_num,todo_parse});
    render();
}

function render (){
    let new_todo = document.createElement('div');
    new_todo.className = 'new_todo';
    for (i=0; i<=todo_array.length-1; i++) {
        let array_data_id = JSON.stringify(todo_array[i]);
        new_todo.innerHTML = '<b>' + array_data_id + '</b>';
        document.body.append(new_todo);
    }
}

function delete_todo() {
    alert('э, ты чё?');
    let delete_num = +prompt('какой номер задачи ты хочешь удалить?');
    delete todo_array[delete_num];
    render()
}

/*function save(id_name) {
    let todo_in_text = document.getElementById(id_name).value;
    let new_todo = document.createElement('div');
    new_todo.className = 'new_todo';
    new_todo.innerHTML = '<b>' + todo_in_text + '</b>';
    document.body.append(new_todo);
};*/

/*    let array_data_id = id_num+1;
    let array_data_text = todo_parse;
    let new_todo = document.createElement('div');
    new_todo.className = 'new_todo';
    new_todo.innerHTML = '<b>' + array_data_id + " " + array_data_text + '</b>';
    document.body.append(new_todo);*/

/*function delete() {
    alert('э, ты чё?');
    let delete_num = +prompt('какой номер задачи ты хочешь удалить?');

} */