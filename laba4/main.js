const del_Btn1 = document.querySelector('.delete_button_1');
const add_Btn2 = document.querySelector('.add_button_2');
const out_Btn3 = document.querySelector('.out_button_3');
const deleted_elements = [];
let x = 1;
const tableHead = '<tr><th>№</th><th>Value</th><th>Index in list</th></tr>';


function delete_element(){
    const element = document.getElementById("current_laptop");
    var elemvalue = element.value;
    let index = element.selectedIndex;
    deleted_elements.push({x, elemvalue, index});
    x++;
    element.remove(element.selectedIndex);
}

function add_element(){
    const invalue = document.querySelector('.input_value');
    var new_element = document.createElement("option");
    var newElText = document.createTextNode(invalue.value);
    new_element.appendChild(newElText);

    var list = document.getElementById("current_laptop");    
    list.insertBefore(new_element, list.children[2]);
}

function print_results(){
    const content = deleted_elements.map(({x, elemvalue, index})=>{
        return(`
            <tr>
                <td>${x}</td>
                <td>${elemvalue}</td>
                <td>${index}</td>
            </tr>
        `)
    })

    document.querySelector("table").innerHTML = `${tableHead}${content.join("")}`;
    document.querySelector(".results").style.visibility = "visible";
}

del_Btn1.addEventListener('click',(e) =>{
    e.preventDefault();
    delete_element();
})

add_Btn2.addEventListener('click',(e) =>{
    e.preventDefault();
    add_element();
})

out_Btn3.addEventListener('click',(e) =>{
    e.preventDefault();
    print_results();
})
