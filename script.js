function add() {
var todo_text = prompt('введите текст задачи');
document.getElementById('todo').innerHTML = '<h1>О, привет, пидор! Вот твоя задача</h1>' + todo_text;
}