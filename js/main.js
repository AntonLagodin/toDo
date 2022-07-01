const inputBox = document.querySelector(".inputFieldArea");
const addBtn = document.querySelector(".inputFieldBtn");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".deleteAllBtn")

inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if(userData.trim() != 0){
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}

showTasks();

addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New ToDo");
    let listArr;
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTasks();
    addBtn.classList.remove("active");
}

function showTasks() {
    let getLocalStorage = localStorage.getItem("New ToDo");
    let listArr;
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingCounter = document.querySelector(".pendingCounter");
    pendingCounter.textContent = listArr.length;
    if(listArr.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag ='';
    listArr.forEach((element,index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"><i class="fa-solid fa-trash-can"></i></i></span></li>`
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

//delete func
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New ToDo");
    let listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTasks();
}

//delete all tasks
deleteAllBtn.onclick = () => {
    let listArr = [];
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTasks();
}