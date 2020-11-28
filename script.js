
function save(id_name) {
    let todo_in_text = document.getElementById(id_name).value;
    let new_todo = document.createElement('div');
    new_todo.className = 'new_todo';
    new_todo.innerHTML = '<b>' + todo_in_text + '</b>';
    document.body.append(new_todo);
};


