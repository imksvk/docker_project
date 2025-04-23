let itemscontainer = document.querySelector(".itemscontainer");
let bagitems;
onLoad();

function onLoad(){
    let bagitemsstr = localStorage.getItem('bagitems');
    bagitems = bagitemsstr ? JSON.parse(bagitemsstr): [];
    displayitemsonhomepage();
    displaybagicon();
    bannerchange();
}


function addtobag(itemid){
    bagitems.push(itemid);
    localStorage.setItem('bagitems',JSON.stringify(bagitems));
    displaybagicon();
}


function displaybagicon(){
    let bagitemcountelement = document.querySelector(".bagitemcount");
    if(bagitems.length == 0){
        bagitemcountelement.style.visibility = "hidden";
    }
    else{
        bagitemcountelement.style.visibility = "visible";
        bagitemcountelement.innerText = bagitems.length;
    }
}

function displayitemsonhomepage(){
    if(itemscontainer === undefined) return;
    let innerhtml = '';
    items.forEach((item)=>{
        innerhtml += `
    <div class="itemcontainer">
        <img class="itemimage" src="${item.image}" alt="">
        <div class="rating"> ${item.rating.stars} ⭐ | ${item.rating.count}</div>
        <div class="companyname">${item.company}</div>
        <div class="itemname">${item.item_name}</div>
        <div class="price">
            <span class="currentprice">RS ${item.current_price}</span>
            <span class="originalprice">Rs ${item.original_price}</span>
            <span class="discount">${item.discount_percentage}% OFF</span>
        </div>
        <button class="btnaddbag" onclick="addtobag(${item.id})" >Add to Bag</button>
    </div>
    `
    });
    
    itemscontainer.innerHTML = innerhtml;

}








function bannerchange(){
    let i = Math.floor((Math.random()*7)+1);
    console.log(i);
    let source =  `./images/banner${i}.jpg`;
    document.querySelector(".banner").style.backgroundImage = `url(${source})`;
}













