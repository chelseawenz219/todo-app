let allTodos;


let pendingTodos, completedTodos, expiredTodos; 

function isCurrent(todo) {
    const todoDueDate = new Date(todo.dueDate);
    const now = new Date();
    return now < todoDueDate;
}


function splitTodos() {
	pendingTodos = allTodos.filter(function (obj) {
		return obj.isComplete == false && isCurrent();
	});
	completedTodos = allTodos.filter(function (obj) {
		return obj.isComplete;
	});
	expiredTodos = allTodos.filter(function (obj) {
		return obj.isComplete === false && !isCurrent();
	});
}

function createElementFromTodo(obj) {
    const todoContainer = $(`<div class="todo"> <h3><span class="title">${obj.title}</span><span class="due-date">${obj.dueDate}</span>
    </h3><pre>${obj.description}</pre><footer class="actions"><button class="action complete">${obj.isComplete? true : false}</button>
    <button class="action delete">Delete</button></footer></div>`).data('todo', obj)
    return todoContainer;
}

function renderTodos() {
    $('main .content').empty();
    pendingTodos.forEach(function(currentValue){
    $(".pending-todos").append(createElementFromTodo(currentValue))
})
    completedTodos.forEach(function(currentValue){
    $(".completed-todos").append(createElementFromTodo(currentValue))
})
    expiredTodos.forEach(function(currentValue){
    $(".expired-todos").append(createElementFromTodo(currentValue))
})
}

$(".left-drawer").click(function() {
    if ($(event.target).hasClass("left-drawer")){
    $("#app").toggleClass("drawer-open")}
 });

$(".add-todo").click(function() {
    $(".modal").addClass("open")
 });

 $(".create-todo").click(function(event) {
    event.preventDefault();
    allTodos.unshift(createTodoFromForm());
    $(".todo-form").trigger("reset");
    $('.modal').removeClass("open");
    renderTodos();
    storeData()
 });

$(".cancel-create-todo").click(function() {
    $(".modal").removeClass("open")
 });

 function createTodoFromForm(){
    const newObj = {
        title: $("#todo-title").val(),
        dueDate: $("#todo-due-date").val(),
        description: $("#todo-description").val(),
        isComplete: false
    }
    return newObj
}

$('main').on('click', '.action.complete', function () {
    const todoElement = $(this).closest('.todo');
    todoElement.data().todo.isComplete = true;
    console.log(todoElement.data());
    storeData();
    renderTodos();
});


// sets an item in localStorage with key allTodos
// uses JSON.stringify() to stringify the contents of allTodos

function storeData() {
    const todoStorage = JSON.stringify(allTodos);
    localStorage.setItem("allTodos", todoStorage);
}

// gets the item from localStorage with key allTodos
// if it exists, set the global allTodos to the result of JSON.parse() applied to it
// if not, set allTodos equal to some default todos

function retrieveData() {
    allTodos = JSON.parse(localStorage.getItem("allTodos")) || fetchDefaultTodos();
}

function fetchDefaultTodos(){
    let defaultTodos = [
        { title: "Create new 'todo'",
          dueDate: "10/20/2021",
          description: "Using the '+' button in the top left-hand corner, you can add items to your 'todo-list'.",
          isComplete: false
        },
        { title: "Completed Items!",
          dueDate: "11/28/2028",
          description: "When you've completed a task, simply press complete to move your items to the completed tab!",
          isComplete: true
        },
        { title: "Oopsie!",
          dueDate: "10/9/2020",
          description: "Make a mistake? You can remove items with the 'DELETE' button.",
          isComplete: false
        },
        { title: "LATE!!",
          dueDate: "02/19/2020",
          description: "When your set due date passes, your items will move to the 'EXPIRED' tab!",
          isComplete: false
        }   
    ]
        return defaultTodos;
}

storeData();
splitTodos();
renderTodos();
