const new_result_array = [];
const tableHead = '<tr><th>Surname</th><th>Name</th><th>Email</th><th>Laptops current brand</th><th>Time since last laptop was bought</th><th>Requied factors</th><th>Suggestions</th></tr>';
const array2 = [];
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector('.fname').value,
        surname = document.querySelector('.lname').value,
        email = document.querySelector('.email').value,
        current_brand = document.querySelector('.current_laptop').value,
        last_time = document.querySelectorAll('.radio'),
        factors = document.querySelectorAll('.top'),
        suggestions = document.querySelector('.page_textarea').value;

    let final_last_time = "";
    last_time.forEach(item=>{
        if(item.checked){
            final_last_time = item.value;
            return;
        }
    })

    const final_factors = [];
    factors.forEach(item=>{
        if(item.checked){
            final_factors.push(item.value);
        }
    })

    new_result_array.push({
        surname, name, email, current_brand, final_last_time, final_factors, suggestions
    })

    array2.push(name);
    const content = new_result_array.map(({surname, name, email, current_brand, final_last_time, final_factors, suggestions})=>{
        return(`
            <tr>
                <td>${surname}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${current_brand}</td>
                <td>${final_last_time}</td>
                <td>${final_factors}</td>
                <td>${suggestions}</td>
            </tr>
        `)
    })

    const users = array2.map(item=>{
        return(`
        <li>${item}</li>
        `)
    })

    document.querySelector("table").innerHTML = `${tableHead}${content.join("")}`;
    document.querySelector("ol").innerHTML = `${users.join("")}`;
    document.querySelector(".modal").style.visibility = "visible";
})

document.querySelector('.result_exit').addEventListener('click', () => {
    document.querySelector(".modal").style.visibility = "hidden";
});

document.querySelector('#aside_dec').addEventListener('click', () => {
    document.querySelector(".modal").style.visibility = "visible";
});
