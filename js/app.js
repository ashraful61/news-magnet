

//Loading spinner toggle
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

//Load all categories
const loadCategories = async () => {
  try {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
  } catch (err) {
    console.log(err);
    toggleSpinner(false);
  }
};

//Display all categories
const displayCategories = (categories) => {
  //   console.log(categories);
  const categoriesContainer = document.getElementById("categoriesContainer");
  categoriesContainer.textContent = "";
  //Categories is empty
  if (!categories?.length) {
    alert("No category found");
    return;
  } else {
    //By default first index category showing
  
    // display all categories
    categories.forEach((category) => {
      const createDiv = document.createElement("div");
      createDiv.classList.add("my-3");
      createDiv.innerHTML = `
            <span id="${category?.category_id}" onclick="loadCategoryNews('${category?.category_id}','${category?.category_name}')" class="py-3 cursor-pointer">${category?.category_name}</span> &nbsp; &nbsp; &nbsp;
          `;
      categoriesContainer.appendChild(createDiv);
    });
    loadCategoryNews(categories[0]?.category_id, categories[0]?.category_name)
    toggleSpinner(false);
  }
};

//Load all category news
const loadCategoryNews = async (category_id, category_name) => {
  try {
    // start loader
    toggleSpinner(true);

    //Remove previous selected category
    const allCategoriesSpanTag = document.querySelectorAll(
      "#categoriesContainer span"
    );
    for (const spanTag of allCategoriesSpanTag) {
      spanTag?.classList?.remove("selected-category");
    }

    //Add border for current selected category
    const categoryId = document.getElementById(category_id);
    categoryId?.classList?.add("selected-category");

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    displayCategoryNews(data?.data, category_name);
  } catch (err) {
    console.log(err);
    toggleSpinner(false);
  }
};

//Display all news by category wise
const displayCategoryNews = (news, category_name) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  const noNewsFound = document.getElementById("no-news-found");
  const newsFound = document.getElementById("news-found");

  if (!news?.length) {
    toggleSpinner(false);
    noNewsFound.classList.remove("d-none");
    newsFound.classList.add("d-none");
    noNewsFound.innerText = `No items found for category ${category_name}`;
    return;
  } else {
    noNewsFound.classList.add("d-none");
    newsFound.classList.remove("d-none");
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
            <div onclick="loadNewsDetails('${
              item._id
            }')" class="card flex-sm-row shadow" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
            <img class="img-fluid w-sm-100" src="${item?.thumbnail_url}" />
            <div class="card-body">
            <h5 class="card-title">${item?.title}</h5>
            <p class="card-text">
                ${item?.details}
            </p>
            <div class="row py-2">
                <div class="col-6">
                <div class="d-flex">
                    <div><img class="author-profile" src="${
                      item?.author?.img
                    }" ></div>
                    <div class="ms-3">
                        <div class="fw-bold">${
                          item?.author?.name
                            ? item.author.name
                            : "No author found"
                        }</div>
                        <div>${
                          item?.author?.published_date
                            ? item?.author?.published_date
                            : "No date found"
                        }</div>
                    </div>
                </div>
                </div>
                <div class="col-3">
                <i class="fa-regular fa-eye"></i> &nbsp; ${
                  item?.total_view ? item?.total_view + "M" : "No view found"
                }
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
  toggleSpinner(false);
};

// Load news details
const loadNewsDetails = async (news_id) => {
  try {
    toggleSpinner(true);
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayNewsDetails(data?.data[0]);
  } catch (err) {
    console.log(err);
    toggleSpinner(false);
  }
};

// Display news details
const displayNewsDetails = (newsDetails) => {
  console.log(newsDetails);
  // displayNewsDetails
  const modalTitle = document.getElementById("newsDetailsModalLabel");
  modalTitle.innerText = newsDetails.title;
  const newsDetailsDiv = document.getElementById("news-details");
  newsDetailsDiv.innerHTML = `
    <p> <strong>Author Name:</strong> ${
      newsDetails.author.name ? newsDetails.author.name : "No author name found"
    } </p>
    <p> <strong>Publish Date:</strong> ${
      newsDetails.author.published_date
        ? newsDetails.author.published_date
        : "No published date found"
    } </p>
    <p> <strong>Total view:</strong> ${
      newsDetails.total_view ? newsDetails.total_view + "M" : "No view found"
    } </p>
    <p> <strong>Todays Pick:</strong> ${
      newsDetails.others_info.is_todays_pick ? "Yes" : "No"
    } </p>
    

  `;
  toggleSpinner(false);
};

//News button event handler
document.getElementById("news-text").addEventListener("click", (e) => {
  const newsSection = document.getElementById("newsSection");
  const blogSection = document.getElementById("blogSection");
  e.target.classList.add("news-text-cls");

  const blogText = document.getElementById("blog-text");
  blogText.classList.remove("blog-text-cls");
  blogSection.classList.add("d-none");
  newsSection.classList.remove("d-none");
  blogSection.classList.remove("d-block");
});

//Blog button event handler
document.getElementById("blog-text").addEventListener("click", (e) => {
  const newsSection = document.getElementById("newsSection");
  const blogSection = document.getElementById("blogSection");
  e.target.classList.add("blog-text-cls");

  const newsText = document.getElementById("news-text");

  newsText.classList.remove("news-text-cls");
  newsSection.classList.add("d-none");
  blogSection.classList.remove("d-none");
  blogSection.classList.add("d-block");
});

loadCategories();
