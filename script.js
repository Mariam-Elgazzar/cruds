let productName= document.querySelector("#title");
let productPrice = document.querySelector("#price");
let productQuantity = document.querySelector("#quantity");
let productCategory = document.querySelector("#category");
let btnSubmit = document.querySelector(".submit");
let search = document.querySelector("#search");
let productArr;
let state ="create";
let updateIndex;

if(localStorage.getItem("product") != null){
    productArr=JSON.parse(localStorage.getItem("product"));
    // displayProduct();
}else{
    productArr=[];
}


displayProduct();


btnSubmit.addEventListener('click',function(){
    let obj ={
        productName: productName.value,
        productPrice: productPrice.value,
        productQuantity: productQuantity.value,
        productCategory : productCategory.value
    }
    if(state ==="create"){
        productArr.push(obj);
    }else{
        productArr[updateIndex]=obj;
        state="create"
        btnSubmit.textContent="submit";
    }
    productArr.push(obj);
    localStorage.setItem("product",JSON.stringify(productArr));
    console.log(productArr);
    displayProduct();
    updateProducts();
}
);

function displayProduct() {
    let tableData = ``;

    for (let i = 0; i < productArr.length; i++) { // Corrected 'length' typo
        tableData += `
        <tr>
            <td>${productArr[i].productName}</td>
            <td>${productArr[i].productPrice}</td>
            <td>${productArr[i].productQuantity}</td>
            <td>${productArr[i].productCategory}</td>
            <td><button id="update" onClick="updateProducts(${i})">update</button></td>
            <td><button id="delete" onClick="deleteProduct(${i})">delete</button></td>
        </tr>
        `;
    }

    document.querySelector("#tbody").innerHTML = tableData;
    console.log("Table updated");
}


//Delete
function deleteProduct(index){
    productArr.splice(index,1);
    localStorage.setItem("product",JSON.stringify(productArr));
    displayProduct();
} 


// Update
function updateProducts(index){
    console.log(index);
    productName.value = productArr[index].productName;
    productPrice.value = productArr[index].productPrice;
    productQuantity.value = productArr[index].productQuantity;
    productCategory.value = productArr[index].productCategory;
    state ="update";
    btnSubmit.textContent="update";
    updateIndex=index;
    
}

//search 

search.addEventListener('keyup',function(e){
    let tableData = ``;
    for (let i = 0; i < productArr.length; i++) { // Corrected 'length' typo
        if(productArr[i].productName.includes(e.target.value)){
        tableData += `
        <tr>
            <td>${productArr[i].productName}</td>
            <td>${productArr[i].productPrice}</td>
            <td>${productArr[i].productQuantity}</td>
            <td>${productArr[i].productCategory}</td>
            <td><button id="update" onClick="updateProducts(${i})">update</button></td>
            <td><button id="delete" onClick="deleteProduct(${i})">delete</button></td>
        </tr>
        `
    }
}
    document.querySelector("#tbody").innerHTML =tableData;
})