
async function getItems(tableId) {
  try {
    let tableBody = document.getElementById(tableId);
    tableBody.innerHTML = "";
    const response = await fetch('http://localhost:3001/items');
    const items = await response.json();
    
    items.forEach(item => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      const cell_imp = document.createElement('td');
      const checkbox = document.createElement('input');
      const hidden_id = document.createElement('p');
      
      hidden_id.innerText = item.id;
      hidden_id.style.display = 'none';
      cell.innerText = item.value;
      checkbox.type = 'checkbox';
      checkbox.checked = item.completed;

      cell_imp.appendChild(checkbox);
      row.appendChild(cell);
      row.appendChild(cell_imp);
      row.appendChild(hidden_id);
      checkbox.addEventListener('click', () => {
          toggleCompleted(event, hidden_id.innerText);
      });

      const del_btn = document.createElement('button');
      del_btn.innerText = "delete";
      del_btn.addEventListener('click', () => {
        deleteTodo(event, hidden_id.innerText);
      });
      row.appendChild(del_btn);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
};


async function addTodo(e){
    e.preventDefault();
    let elem = document.getElementById("newInput");
    let text = elem.value;
    let item = {id:null, value:text, completed:false};
    let url = 'http://localhost:3001/items';

    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    }).then(response => {
        if (!response.ok) {
          alert("Error in saving todo");
        } else {
            elem.value = "";
            getItems("todoTable");
        }
    });
};


async function deleteTodo(e, id_){
    e.preventDefault();
    let data = {id:id_};
    let url = 'http://localhost:3001/delete';

    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
          alert("Error in deleting todo");
        } else {
            getItems("todoTable");
        }
    });
};


async function toggleCompleted(e, id_){
    let data = {id:id_};
    let url = 'http://localhost:3001/completed';
    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
          alert("Error in deleting todo");
        } else {
            getItems("todoTable");
        }
    });
};