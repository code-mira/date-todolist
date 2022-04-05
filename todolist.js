let addButton = document.getElementById("add_task");

function getAndUpdate(){
    task = document.getElementById("task_name").value;
    description = document.getElementById("task_description").value;

    if(localStorage.getItem('jsonData') == null){
        allTasks = [];
        allTasks.push([task, description]);
        localStorage.setItem('jsonData', JSON.stringify(allTasks));
    }else{
        itemStr = localStorage.getItem('jsonData');
        allTasks = JSON.parse(itemStr);
        allTasks.push([task, description]);
        localStorage.setItem('jsonData', JSON.stringify(allTasks));

    }
    update();
    resetFields();
}

function update(){
    if (localStorage.getItem('jsonData')==null){
        allTasks = []; 
        localStorage.setItem('jsonData', JSON.stringify(allTasks))
    }else{
        itemStr = localStorage.getItem('jsonData')
        allTasks = JSON.parse(itemStr); 
    }

    let tableBody = document.getElementById("tableBody");
    let tr = '';

    allTasks.forEach((element, index) => {
        tr += `<tr>
            <th scope="row">${index+1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
        </tr>`;
    });
    tableBody.innerHTML = tr;
}

function resetFields(){
    document.getElementById("task_name").value = '';
    document.getElementById("task_description").value = '';
}

addButton.addEventListener("click", getAndUpdate);
update();
function deleted(itemIndex){
    itemStr = localStorage.getItem('jsonData')
    allTasks = JSON.parse(itemStr);
    allTasks.splice(itemIndex, 1);
    localStorage.setItem('jsonData', JSON.stringify(allTasks));
    update();
}
function clearStorage(){
    if (confirm("Do you areally want to clear?")){
        console.log('Clearing the storage');
        localStorage.clear();
        update();
        resetFields();
    }
}
