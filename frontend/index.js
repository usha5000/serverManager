function create() {
    const table = document.getElementById('table');
    const row = table.insertRow(-1);
    const columnCount = table.rows[0].cells.length;
    
    for (let i = 0; i < columnCount - 1; i++) {
      const cell = row.insertCell(i);
      const input = document.createElement("input");
      input.type = "text";
      cell.appendChild(input);
    }
  
    const cell = row.insertCell(columnCount - 1);
    const button = document.createElement("button");
    button.innerHTML = "Ausgeben";
    button.onclick = function() {
      const inputs = row.getElementsByTagName("input");
      const values = [];
      for (let i = 0; i < inputs.length; i++) {
        values.push(inputs[i].value);
      }
      console.log(values);
    };
    cell.appendChild(button);
  
  }
  