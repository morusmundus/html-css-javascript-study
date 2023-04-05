const tname = document.querySelector(".data1");
const tpurpose = document.querySelector(".data2");
const tweight = document.querySelector(".data3");
const tprice = document.querySelector(".data4");

const select = document.getElementById("select_del")
const inputs = document.querySelector(".inputs");
const span = document.querySelector(".span");
const new_prop = document.getElementById("new_prop")

const addBtn = document.getElementById("addInfo");
const addPropBtn = document.getElementById("add_prop_btn");
const minBtn = document.getElementById("min");
const deleteBtn = document.getElementById("delete_btn");
const showBtn = document.getElementById("show");

const table = document.getElementById("tools");
const trWithProps = document.getElementById("TableHeader");
const blockForNewProps = document.querySelector(".blockForNewProps");

let flag = false;
let newRows = "";
let newProp = "";
let r5 = 5;

let db = window.openDatabase("myDb", "1.0", "Hello", 2 * 1024 * 1024);
if (!db) {
  alert("Failed to connect to the database!");
}

//---------------------------------Create Table-------------------------

db.transaction(
    function (tx) {
      // tx.executeSql("DROP table autopark", []);
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS warehouse (id integer primary key autoincrement, tool_name, purpose, weight, price);`,
        []
      );
    },
    (tx) => {
      console.log("Table was created");
      updateSelector();
    }
  );

//-----------------------------------Update Selector-------------------------

function updateSelector() {
    for (i = select.options.length; i >= 0; i--) {
      select.remove(i);
    }
  
    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT id from warehouse",
        [],
        function (tx, result) {
          for (let i = 0; i < result.rows.length; i++) {
            let item = result.rows.item(i)["id"];
  
            select.options[select.options.length] = new Option(item, item);
          }
        },
        function (tx, e) {
          alert("Error: " + e.message);
        }
      );
    });
  }


  //-----------------------------------Update Table------------------------------

  function updateTable() {
    while (table.rows.length > 1) {
      table.deleteRow(table.rows.length - 1);
    }
  
    db.transaction(function (tx) {
      tx.executeSql(
        `SELECT * FROM warehouse`,
        [],
        function (tx, result) {
          for (let i = 0; i < result.rows.length; i++) {
            let newRow = table.insertRow(-1);
  
            if (flag) {
              let newRowsCell = newRow.insertCell(0);
              newRowsCell.innerHTML = result.rows.item(i)[newRows];
            }
  
            let priceCell = newRow.insertCell(0);
            let weightCell = newRow.insertCell(0);
            let purposeCell = newRow.insertCell(0);
            let toolNameCell = newRow.insertCell(0);
            let idCell = newRow.insertCell(0);
  
            idCell.innerHTML = result.rows.item(i)["id"];
            toolNameCell.innerHTML = result.rows.item(i)["tool_name"];
            purposeCell.innerHTML = result.rows.item(i)["purpose"];
            weightCell.innerHTML = result.rows.item(i)["weight"];
            priceCell.innerHTML = result.rows.item(i)["price"];
          }
        },
        null
      );
    });
    showMin();
  }
  
  // ---------------------- Add new Row----------------------
  function addNewRow(e) {
    e.preventDefault();
  
    let TToolName = tname.value; 
    let Tpurpose = tpurpose.value; 
    let Tweight = tweight.value; 
    let Tprice = tprice.value;

  
    if (!TToolName || !Tpurpose || !Tweight || !Tprice) {
      alert("Not all field have value!");
      return;
    }
  
    if (flag) {
      const newRowsValue = document.getElementById(newRows).value;
  
      db.transaction(function (tx) {
        tx.executeSql(
          "INSERT INTO warehouse (tool_name, purpose, weight, price, " +
            newRows +
            ") values (?, ?, ?, ?, ?)",
          [TToolName, Tpurpose, Tweight, Tprice, newRowsValue],
          function (tx, result) {
            console.log("An entry has been added");
          },
          function (tx, error) {
            console.log("Error: " + error.message);
          }
        );
      });
    } else {
      db.transaction(function (tx) {
        tx.executeSql(
          `INSERT INTO warehouse (tool_name, purpose, weight, price) VALUES (?,?,?,?)`,
          [TToolName, Tpurpose, Tweight, Tprice],
          function (tx, result) {
            console.log("An entry has been added");
          },
          function (tx, error) {
            console.log("Error: " + error.message);
          }
        );
      });
    }
  
    updateTable();
    updateSelector();
  }

  // ---------------------- Delete Item ----------------------

function deleteRow() {
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM warehouse WHERE id=?`, [select.value]);
      },
      (err) => console.error("Imposible to delete an entry", err),
      (tx) => {
        console.log("An entry has been deleted, id = " + select.value);
  
        updateTable();
        updateSelector();
      }
    );
  }

  // ---------------------- Add new Field ----------------------

function addNewField() {
    if (!new_prop.value) {
      alert("The field name is not entered!!!");
      return;
    }
  
    newRows = new_prop.value;
  
    db.transaction((tx) => {
      tx.executeSql(
        `ALTER TABLE warehouse ADD ` + newRows + ` TEXT;`,
        [],
        (tx, result) => {
          (err) => console.error("Column wasn't added", err),
            (tx) => {
              console.log("Column:" + newRows + "was added");
            };
        }
      );
    });
  
    const element = document.createElement("input");
    const span = document.createElement("span");
    const newTh = document.createElement("th");
    element.type = "text";
    element.id = newRows;
    element.class = "data" + r5;
    element.placeholder = "value";
    r5++;

    span.innerHTML = `${newRows}: &nbsp;`;
  
    newTh.innerHTML = newRows;
  
    trWithProps.appendChild(newTh);
    blockForNewProps.appendChild(span);
    inputs.appendChild(element);
  
    flag = true;
  }

  // ---------------------- Show Min ----------------------
function showMin() {
    db.transaction(function (tx) {
      tx.executeSql("SELECT * from warehouse", [], function (tx, result) {
        let min = "";
        let arrWithFields = [];
  
        for (let i = 0; i < result.rows.length; ++i) {
          arrWithFields.push(result.rows[i]);
        }
  
        let sortArray = arrWithFields.sort((a, b) =>
          +a.weight < +b.weight ? 1 : -1
        );     
  
        min = sortArray[sortArray.length - 1].weight;
        span.innerHTML = `Min: ${min}`;
        if (sortArray[sortArray.length - 1].weight === undefined) span.innerHTML = `Min: no`;
      });
    });
  }
  
  // ---------------------- Show Table ----------------------
  function showTable() {
    updateTable();
    updateSelector();
  }
  
  showBtn.addEventListener("click", showTable);
  addPropBtn.addEventListener("click", addNewField);
  minBtn.addEventListener("click", showMin);
  deleteBtn.addEventListener("click", deleteRow);
  addBtn.addEventListener("click", (e) => addNewRow(e));
  