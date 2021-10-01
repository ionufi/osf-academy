//html for subcategories display
function categoryHtml(catId, catName, catTitle, catImage, catDescription){
    return `<div id="${catId}" href="#" type="button" class="bg-dark card mb-3">
            <h4 class="card-text text-center text-light mt-3">${catName}</h4>
            <hr class="m-20 text-light">
            <div id="text-category-title-holder" class="text-center card-body">
                <h5 id="parent-category" class="pb-3 card-text text-light">${catTitle}<small class="text-muted"></small></h5>
            </div>
            <img id="category-image" src="../${catImage}" class="card-img-top" alt="..." >
            <div id="text-category-holder" class="card-body">
            <p id="category-title" class="card-title text-center text-light">${catDescription}</p>
            </div>
        </div>
        `
}

//fetch One Category and display it as page products title
function fetchOneCategory(y){
    fetch('/services/UserServices')
        .then(response => {
            //console.log(response);
            if(!response.ok){
                throw Error('ERROR: Api not ok, check fetch adress');
            }
            return response.json();
        })
        .then(data => {
            //console.log(data);
            const html = data;
                 for (let i=0; i <= data.length; i++){
                        let category = data[i];
                        //console.log(category);
                        if (category.id === y) {
                            let insertCatFunction = categoryHtml(category.id, category.name, category.page_title, category.image, category.page_description)
                            return  document.querySelector("#body-content-0").innerHTML = insertCatFunction;
                            //console.log(category),
                        }
                    }
        })
        .catch(error => {
            console.log(error);
        });
}
//fetchOneCategory('womens-jewelry-earrings');

//fetch all Categories and display them
function fetchCategories(y){
    fetch('/services/UserServices')
        .then(response => {
            //console.log(response);
            if(!response.ok){
                throw Error('ERROR: Api not ok, check fetch adress');
            }
            return response.json();
        })
        .then(data => {
            //console.log(data);
            const html = data
                .map(category => {
                    
                    if (category.parent_category_id === y) {
                         //console.log(category);
                         displayProductsFromCategory(`#${category.id}`);                          
                         return categoryHtml(category.id, category.name, category.page_title, category.image, category.page_description)
                    }
                })
                .join("");
            document.querySelector("#body-content-1").innerHTML = html;
            //console.log(html);            
        })
        .catch(error => {
            console.log(error);
        });
}


//when click on link fetch subcategories data for that link + map links
function clicked(btnClick, x) {
    $(function () {
        $.get(navBarLocation, function () {             
            const button1 = document.getElementById(`${btnClick}`);
            button1.addEventListener('click', function(){
                    bodyContent0.innerHTML = "";
                    bodyContent1.innerHTML = "";
                    fetchCategories(x);

                    //map liks                    
                        weAreHere = btnClick;
                        //console.log(weAreHere);
                        folowTheLinks(btnClick,'','');                                             
                        const goCatButton = document.querySelector('#goCat-link');
                        goCatButton.addEventListener('click', function(){
                            bodyContent0.innerHTML = "";
                            bodyContent1.innerHTML = "";
                            fetchCategories(x);
                        })
                    //                    
            });
        });
    }); 
}

clicked('womens-clothing', 'womens-clothing');
clicked('womens-accessories', 'womens-accessories');
clicked('womens-jewelry', 'womens-jewelry');
clicked('mens-clothing', 'mens-clothing');
clicked('mens-accessories', 'mens-accessories');


//Fetch products from categories - first page / display it
let page = '';

function getProductsFromCategory(categoryName, page){
    fetch(`/services/${page}${categoryName}`)
    .then(response => {
        //console.log(response);
        if(!response.ok){
            throw Error('ERROR: Api not ok, check fetch adress');
        }
        return response.json();
    })
    .then(data => {
                //console.log(data);  //print one product
                 const html = data
                
                 .map(product => {
                        const productId = `link-${product.id}`;
                        const productImage = product.image_groups[0].images[0].link;
                        const productName = product.name;
                        const productPrice = product.price;
                        const productCurrency = product.currency;
                        const productDescription = product.short_description;

                        displayProductDetails(`#${productId}`);                        
                        //console.log(product);                         
                         return `                            
                            <div class="col d-flex justify-content-center pt-4">
                                <div class="card text-center p-2 " style="width: 18rem;">                                    
                                        <h5 id="card-title" class="card-title">${productName}</h5>
                                        <img id="card-image" class="card-img-top" src="../${productImage}" alt="Card image cap">
                                        <p class="card-text">${productDescription}</p>                                        
                                        <h5 class="card-text align-bottom">Price: ${productPrice} ${productCurrency}</h5>
                                        <a id="${productId}" href="#" class="btn btn-primary ">View details</a>                                        
                                </div>
                            </div>
                         `                          
                 })
                 .join("");
    
              document.querySelector("#body-content-1").innerHTML =`<div class="row d-flex "> ${html} </div>`;              
    })
}


//if class active Go To Category Page //displayProductsFomCategory() is called in fetch categories;
function displayProductsFromCategory(categoriesDivButton){
    $(function () {            
            const button13 = document.querySelector(categoriesDivButton);
                button13.addEventListener('click', function(){
                    //console.log(categoriesDivButton);
                    categoriesDivButton = categoriesDivButton.substring(1);                    
                    categoryPageProducts(categoriesDivButton);
                    //console.log('This link is working : ' + button13);

                    //mapping links
                       const goCatButton = document.querySelector('#goCat-link');
                       goCatButton.addEventListener('click', function(){
                           bodyContent0.innerHTML = "";
                           bodyContent1.innerHTML = "";
                           fetchCategories(weAreHere);
                           folowTheLinks(weAreHere, '','');
                       })
                    //
                });                                         
        })    
}

let weAreHereSub = '';
//when click categ. fetch cat. data then display in body products
function categoryPageProducts(categClicked){
    
    //console.log(categClicked);
    bodyContent1.innerHTML = ""; 
    weAreHereSub = categClicked;
    fetchOneCategory(`${categClicked}`);
    getProductsFromCategory(`${categClicked}`,'');
       
    //map links
    folowTheLinks(weAreHere, categClicked, '');           
}