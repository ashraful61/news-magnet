const loadCategories = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
  } catch (err) {
    console.log(err);
  }
};

const displayCategories = (categories) => {
  //   console.log(categories);
  const categoriesContainer = document.getElementById("categoriesContainer");
  categoriesContainer.textContent = "";
  //Categories is empty
  if (!categories?.length) {
    alert("No category found");
    return;
  } else {
    // display all categories
    categories.forEach((category) => {
      const createDiv = document.createElement("div");
      createDiv.classList.add("my-3");
      createDiv.innerHTML = `
            <span id="${category?.category_id}" onclick="loadCategoryNews('${category?.category_id}','${category?.category_name}')" class="py-3 cursor-pointer">${category?.category_name}</span> &nbsp; &nbsp; &nbsp;
          `;
      categoriesContainer.appendChild(createDiv);
    });
  }
};

const loadCategoryNews = async (category_id, category_name) => {
  try {
    //Remove previous selected category
    const allCategoriesSpanTag = document.querySelectorAll(
      "#categoriesContainer span"
    );
    for (const spanTag of allCategoriesSpanTag) {
      spanTag.classList.remove("selected-category");
    }

    //Add border for current selected category
    const categoryId = document.getElementById(category_id);
    categoryId.classList.add("selected-category");

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    displayCategoryNews(data?.data, category_name);
  } catch (err) {
    console.log(err);
  }
};

const displayCategoryNews = (news, category_name) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  const noNewsFound = document.getElementById("no-news-found");
  const newsFound = document.getElementById("news-found");

  if (!news?.length) {
    noNewsFound.classList.remove('d-none')
    newsFound.classList.add('d-none')
    noNewsFound.innerText = `No items found for category ${category_name}`;
    return;
  } else {
    noNewsFound.classList.add('d-none')
    newsFound.classList.remove('d-none')
    newsFound.innerText = `${news.length} items found for category ${category_name}`;
  }

  // News list sort by property total_view
  news = news.sort(({ total_view: a }, { total_view: b }) => b - a);

  // display all news
  news.forEach((item) => {
    if (item.details.length > 200) {
      item.details = item.details.slice(0, 400) + "...";
    }
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("col");
    newsDiv.innerHTML = `
            <div onclick="loadNewsDetails('${item._id}')" class="card flex-sm-row">
            <img class="img-fluid w-sm-100" src="${item?.thumbnail_url}" />
            <div class="card-body">
            <h5 class="card-title">${item?.title}</h5>
            <p class="card-text">
                ${item?.details}
            </p>
            <div class="row py-2">
                <div class="col-6">
                <div class="d-flex">
                    <div><img class="author-profile" src="${item?.author?.img}" ></div>
                    <div class="ms-3">
                        <div class="fw-bold">${item?.author?.name}</div>
                        <div>${item?.author?.published_date}</div>
                    </div>
                </div>
                </div>
                <div class="col-3">
                <i class="fa-regular fa-eye"></i> &nbsp; ${item?.total_view}
                </div>
                <div class=" col-3">
                <i class="fa-solid fa-arrow-right"></i>
                </div>
                
            </div>
            </div>
        </div>
            `;
    newsContainer.appendChild(newsDiv);
  });
};


const loadNewsDetails = async (news_id) => {
  try {
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    displayNewsDetails(data?.data[0]);
  } catch (err) {
    console.log(err);
  }
}

const displayNewsDetails = (newsDetails) => {
  console.log(newsDetails)
  // displayNewsDetails
}




//News button event handler
document.getElementById('news-text').addEventListener('click', (e) => {
  const newsSection = document.getElementById('newsSection')
  const blogSection = document.getElementById('blogSection')
  e.target.classList.add('news-text-cls')

  const blogText = document.getElementById('blog-text')
  blogText.classList.remove('blog-text-cls')
  blogSection.classList.add('d-none')
  newsSection.classList.remove('d-none')
  blogSection.classList.remove('d-block')
})

//Blog button event handler
document.getElementById('blog-text').addEventListener('click', (e) => {
  const newsSection = document.getElementById('newsSection')
  const blogSection = document.getElementById('blogSection')
  e.target.classList.add('blog-text-cls')

  const newsText = document.getElementById('news-text')
  
  newsText.classList.remove('news-text-cls')
  newsSection.classList.add('d-none')
  blogSection.classList.remove('d-none') 
  blogSection.classList.add('d-block')
  
})

loadCategories();

// const displayPhones = (phones, dataLimit) =>{
//     const phonesContainer = document.getElementById('phones-container');
//     phonesContainer.textContent = '';
//     // display 10 phones only
//     const showAll = document.getElementById('show-all');
//     if(dataLimit && phones.length > 10) {
//         phones = phones.slice(0, 10);
//         showAll.classList.remove('d-none');
//     }
//     else{
//         showAll.classList.add('d-block');
//     }

//     // display no phones found
//     const noPhone = document.getElementById('no-found-message');
//     if(phones.length === 0){
//         noPhone.classList.remove('d-none');
//     }
//     else{
//         noPhone.classList.add('d-none');
//     }
//     // display all phones
//     phones.forEach(phone =>{
//         const phoneDiv  = document.createElement('div');
//         phoneDiv.classList.add('col');
//         phonesContainer.innerHTML = `
//         <div class="card p-4">
//             <img src="${phone.image}" class="card-img-top" alt="...">
//             <div class="card-body">
//                 <h5 class="card-title">${phone.phone_name}</h5>
//                 <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//                 <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>

//             </div>
//         </div>
//         `;
//         phonesContainer.appendChild(phoneDiv);
//     });
//     // stop spinner or loader
//     toggleSpinner(false);
// }

// const processSearch = (dataLimit) =>{
//     toggleSpinner(true);
//     const searchField = document.getElementById('search-field');
//     const searchText = searchField.value;
//     loadPhones(searchText, dataLimit);
// }

// // handle search button click
// document.getElementById('btn-search').addEventListener('click', function(){
//     // start loader
//     processSearch(10);
// })

// // search input field enter key handler
// document.getElementById('search-field').addEventListener('keypress', function (e) {
//     if (e.key === 'enter') {
//         processSearch(10);
//     }
// });

// const toggleSpinner = isLoading => {
//     const loaderSection = document.getElementById('loader');
//     if(!isLoading){
//         loaderSection.classList.remove('d-none')
//     }
//     else{
//         loaderSection.classList.add('d-none');
//     }
// }

// // not the best way to load show All
// document.getElementById('btn-show-all').addEventListener('click', function(){
//     processSearch();
// })

// const loadPhoneDetails = async id =>{
//     const url =`www.openapi.programming-hero.com/api/phone/${id}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     displayPhoneDetails(data.data);
// }

// const displayPhoneDetails = phone =>{
//     console.log(phone);
//     const modalTitle = document.getElementById('phoneDetailModalLabel');
//     modalTitle.innerText = phone.name;
//     const phoneDetails = document.getElementById('phone-details');
//     console.log(phone.mainFeatures.sensors[0]);
//     phoneDetails.innerHTML = `
//         <p>Release Date: ${phone.releaseDate}</p>
//         <p>Storage: ${phone.mainFeatures}</p>
//         <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
//         <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
//     `
// }

// loadPhones('a');
