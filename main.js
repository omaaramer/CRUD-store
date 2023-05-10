
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let supmit = document.getElementById('supmit')
let tmp;
let mood = "create";

// console.log(title, price, taxes, ads, discount, total, count, category, supmit );

// get total
function getTotal()
{
// console.log("done");
if (price.value != '')
    {

     let result = (+price.value + +taxes.value + +ads.value) 
     - +discount.value ;
     total.innerHTML = result;
     total.style.background = '#040';
        } else {
            total.innerHTML = '';
            total.style.background = '#d37306';

        }

}



//create product
let dataProduct;
if (localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
} else{
    dataProduct = [];
}



supmit.onclick = function(){

        let newProduct ={
            title: title.value.toLowerCase(),
            price: price.value ,
            taxes: taxes.value ,
            ads: ads.value ,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
        }

        if (title.value != '' 
            && price.value !=''
            && category.value !=''
            && newProduct.count <= 100){

            if (mood === "create")
            {

        if (newProduct.count > 1)
        {
            for(let i = 0; i < newProduct.count; i++)
            dataProduct.push(newProduct);
        }else{
            dataProduct.push(newProduct);
        }
            } else{
                dataProduct[tmp]=newProduct;
                mood= "create";
                supmit.innerHTML="create";
                count.style.display = "block";
            }
            clearData();
        }
    
 // save local storage

        localStorage.setItem('product',  JSON.stringify(dataProduct) );
        console.log (newProduct);

        showdata();
}




//clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}


//read
function showdata(){
    //to handel total box
    getTotal();


    let table = '';
    for( let i = 0; i < dataProduct.length ; i++) {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    
        `
        // console.log(table);

    }

    document.getElementById("tbody").innerHTML = table;

    let btnDelete = document.getElementById("deleteAll") ;
    if (dataProduct.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()"> deleteAll (${dataProduct.length})</button>
        `
    }else{
        btnDelete.innerHTML ='';
    }
}
    showdata();

//count

//delete
function deleteData(i){

    dataProduct.splice(i,1);
    localStorage.product= JSON.stringify(dataProduct);
    showdata();

}

function deleteAll(){

    localStorage.clear();
    dataProduct.splice(0);
    showdata(); 
}
//update
function updateData(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = "none";

    category.value = dataProduct[i].category;
    supmit.innerHTML = "update";
    mood = "update";
    tmp = i;

    scroll({
        top : 0,
        behavior: "smooth",
        
    })
}
//searhe
let seachMood = "title";

function getSearchMood(id){

        search = document.getElementById("searsh");
    if (id == "searsh-title"){
        seachMood = "title";
        searsh.placeholder = 'search by title';
    }else{
        seachMood= "category";
        searsh.placeholder = 'search by category';
    }
    search.focus()
    search.value='';
    showdata();
}


function searchData(value){
    let table = '';

    if (seachMood == "title")
    
    {
        for( let i =0; i< dataProduct.length; i++){
            if (dataProduct[i].title.includes(value.toLowerCase())){
        
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            
                `
            }
        }



    }else{

        for( let i =0; i< dataProduct.length; i++){
            if (dataProduct[i].category.includes(value.toLowerCase())){
        
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            
                `
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}
//clean data