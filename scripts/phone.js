const loadingSpinerContainer = document.getElementById("loading-container");

const loadPhones = async (searchText = "iphone", isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data  = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones.length);
    const showAllButton = document.getElementById("show-all-button");
    if(phones.length > 12 && !isShowAll){
        showAllButton.classList.remove("hidden");
    }
    else{
        showAllButton.classList.add("hidden");
    }
console.log(isShowAll);
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = "";

    phones.forEach(phone => {
        // console.log(phone);  
        const phoneCard = document.createElement("div");
        phoneCard.classList = "card card-compact py-10 px-5 bg-slate-200 shadow-xl";
        phoneCard.innerHTML = `
            <figure><img src=${phone.image} alt="Phones" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        
        phoneContainer.appendChild(phoneCard);
    });
    loadingSpinerContainer.classList.add("hidden");
}

// handle show details btn
const handleShowDetails =async (id)=>{
    // console.log(id);
    const res = await fetch(" https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089");
    const data = await res.json();
    const phone = data.data;
    console.log(phone);

    displayPhoneDetails(phone);
    
}
const displayPhoneDetails =(phone) =>{
    my_modal.showModal();

    const phoneInfoContainer = document.getElementById("phone-info-container");
    phoneInfoContainer.innerHTML = `
        <img class="mx-auto mb-3" src="${phone.image}" alt="">
        <p><b>Name:- </b>${phone.name}</p>
        <p><b>Storage:- </b>${phone.mainFeatures.storage}</p>
        <p><b>Display Size:- </b>${phone.mainFeatures.displaySize}</p>
        <p><b>ChipSet:- </b>${phone.mainFeatures.chipSet}</p>
        <p><b>Memory:- </b>${phone.mainFeatures.memory}</p>
        <p><b>GPS:- </b>${phone.others.GPS}</p>
        <p><b>Release Date:- </b>${phone.releaseDate}</p>
        <p><b>Brand:- </b>${phone.brand}</p>
    
    
    `;
}

// loadPhones();
const loadSearch = (isShowAll) =>{
    const searchField = document.getElementById("search-filed");
    const searchText = searchField.value;
    
    loadPhones(searchText, isShowAll);
    // loading spiner show
    loadingSpinerContainer.classList.remove("hidden");
}

// handle show all button
const handleShowAll = () =>{
    loadSearch(true);
}

loadPhones();