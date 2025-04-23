let bagitemsobjects;
onLOad();
function onLOad() {
  loadbagitems();
  displaybagitems();
  displaybagicon();
  displaybagsummary();
}

function displaybagsummary() {
  let bagsummaryelement = document.querySelector(".bagsummary");

  let totalitems = bagitemsobjects.length;
  let totalmrp = 0;
  let totaldiscount = 0;
  let finalpayment = 0;

  for(let i=0; i<bagitemsobjects.length; i++){


    totalmrp += bagitemsobjects[i].original_price;
    totaldiscount += (bagitemsobjects[i].discount_percentage*bagitemsobjects[i].original_price)/100;
    finalpayment += totalmrp-totaldiscount+99;


  }

  bagsummaryelement.innerHTML = `  <div class="bagdetailscontainer">
            <div class="priceheader">PRICE DETAILS (${totalitems} Items) </div>
            <div class="priceitem">
              <span class="priceitemtag">Total MRP</span>
              <span class="priceitemvalue">Rs${totalmrp}</span>
            </div>
            <div class="priceitem">
              <span class="priceitemtag">Discount on MRP</span>
              <span class="priceitemvalue pricedetailbasediscount">-Rs ${totaldiscount} </span>
            </div>
            <div class="priceitem">
              <span class="priceitemtag">Convenience Fee</span>
              <span class="priceitemvalue">Rs 99</span>
            </div>
            <hr>
            <div class="pricefooter">
              <span class="priceitemtag">Total Amount</span>
              <span class="priceitemvalue">Rs ${finalpayment} </span>
            </div>
          </div>
          <button class="btnplaceorder">
            <div class="cssxjhrni">PLACE ORDER</div>
          </button>
        </div>`;
}

function loadbagitems() {
  console.log(bagitems)
  bagitemsobjects = bagitems.map(itemid => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id == itemid) {
        return items[i];
      }
    }
  })
  console.log(bagitemsobjects)
}


function displaybagitems() {
  let containerelement = document.querySelector(".bagitemscontainer");
  innerhtml = '';
  bagitemsobjects.forEach(bagitem => {
    innerhtml += generateitemhtml(bagitem);
  });
  containerelement.innerHTML = innerhtml;
}


function removefrombag(itemid) {
  bagitems = bagitems.filter(bagitemid => bagitemid != itemid);
  localStorage.setItem('bagitems', JSON.stringify(bagitems));
  loadbagitems();
  displaybagicon();
  displaybagitems();
  displaybagsummary();
}


function generateitemhtml(item) {

  return `
    <div class="bagitemcontainer">
            <div class="itemleftpart">
              <img class="bagitemimg" src="../${item.image}">
            </div>
            <div class="itemrightpart">
              <div class="company">${item.company}</div>
              <div class="itemname">${item.item_name}</div>
              <div class="pricecontainer">
                <span class="currentprice">Rs ${item.current_price}</span>
                <span class="originalprice">Rs ${item.original_price}</span>
                <span class="discountpercentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="returnperiod">
                <span class="returnperioddays">${item.return_period} days</span> return available
              </div>
              <div class="deliverydetails">
                Delivery by
                <span class="deliverydetailsdays">${item.delivery_date}</span>
              </div>
            </div>

            <div class="removefromcart" onclick="removefrombag(${item.id})" >X</div>
          </div>
    `


}