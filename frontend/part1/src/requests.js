
async function getItems(tableId) {
  try {
    let tableBody = document.getElementById(tableId);
    const response = await fetch('http://localhost:3001/items');
    const items = await response.json();
    
    items.forEach(item => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      const cell_imp = document.createElement('td');
      const checkbox = document.createElement('input');

      cell.innerText = item.value;
      checkbox.type = 'checkbox';
      checkbox.checked = item.important;

      cell_imp.appendChild(checkbox);
      row.appendChild(cell);
      row.appendChild(cell_imp);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}