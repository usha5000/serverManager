let domainList = []

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
      const values = {
        Domain: inputs[0].value,
        Port: inputs[1].value,
        Status: inputs[2].value
      };
      
      axios.post("/api/create", values).then(response => {
        console.log(response.data)
      })
      console.log(values);
    };
    cell.appendChild(button);
  
  }

  async function getData() {
    let response = await axios.get("/api/get")
    
    for (let key in response.data) {
      domainList.push(response.data[key])
    }

    console.log(domainList)

    for (let element of domainList) {
      const table = document.getElementById("table")
      let row = table.insertRow()
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key])
        cell.appendChild(text)
      }
    }

  } getData()
  