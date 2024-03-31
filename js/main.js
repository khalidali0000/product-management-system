let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
// get total 
function getTotal(){

    if(price.value != " "){

        let reuslt = (+price.value +  +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = reuslt;
        total.style.background = "#040";
    }
    
};
// sava loacalstorage
let datapro;
if(localStorage.projcet != null){
    datapro = JSON.parse(localStorage.projcet)
}else{
    datapro = [];
};

//create product
submit.onclick  = function(){
    let newpro = {
        title :title.value,
        price :price.value,
        taxes :taxes.value,
        ads :ads.value,
        discount :discount.value,
        total : total.innerHTML,
        count :count.value,
        category :category.value,
    }

    if(mood === "create"){
        if(newpro.count >1){
            for(let i = 0; i< newpro.count; i++){
                datapro.push(newpro);
            }
        }else{
            datapro.push(newpro)
        }
       
    }else{
            datapro[tmp] =newpro;
            mood = "create"
            submit.innerHTML = "create";
            count.style.display = 'block';
    }
  

    localStorage.setItem("projcet", JSON.stringify(datapro))
    cleardata()
    showData()

};
//clear inputs

function cleardata() {
    title.value ="";
    price.value ="";
    taxes.value ="";
    ads.value ="";
    discount.value ="";
    total.innerHTML ="";
    count.value ="";
    category.value ="";
};

//read

function showData(){
    getTotal()
    let table = "";
    
    for( let i= 0; i< datapro.length; i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button id="updata" onclick="updata(${i})">updata</button></td>
        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
     </tr>
        `
    }
    document.getElementById("tbody").innerHTML=table;
    //dataall
    let btnDelet=document.getElementById("deletall")
    if(datapro.length>0){
        btnDelet.innerHTML=`
        <button onclick="dateAllprodct()">deleteAll${datapro.length}</button>
        `
    }else{
        btnDelet.innerHTML="";
    };
};
showData()

//delete



function deleteData(i){
datapro.splice(i,1);
localStorage.projcet = JSON.stringify(datapro);
showData()
}
  //dataall
function dateAllprodct(){
    localStorage.clear();
    datapro.splice(0)
    showData()
}



//count
//uddate
function updata(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    getTotal()
    count.style.display = "none";
    submit.innerHTML = "UpData";
    mood = "UpData"
    tmp= i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}
//search
//clean data