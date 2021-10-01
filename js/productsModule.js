
//if products is displayed To Category Page button redirect to product details page //displayProductDetails() is called in fetch categories;
function displayProductDetails(productButton){
    $(function () {
            const button14 = document.querySelector(productButton);
                button14.addEventListener('click', function(){
                    //console.log(`id button is: ${productButton}`);
                    productButton = productButton.substring(6);
                    //console.log(`id button is: ${productButton}`);
                    //console.log(weAreHere);
                    getProductDetails(weAreHereSub,'', productButton);                   
                    //console.log('This link is working : ' + button14);
                }); 
        })    
}

function productHtml(productId, productName, productImage, productCurrency, productPageTitle, productPageDescription, productPrice, productSizes){
        let productSizeIns = '';
        if (productSizes === 'nothing here'){ 
            productSizeIns = `<select>${productSizes}</select><hr>`;
        }
    return `                      
            <div class="col d-flex justify-content-center">
                <div class="card text-center p-2 " style="width: 30rem;">                    
                    <h6 id="card-title" class="card-title">${productName}</h6>
                    <img id="card-image" class="card-img-top" src="../${productImage}" alt="Card image cap">                          
                </div>
           
                <div class="card text-center p-2 " style="width: 30rem;">
                    <h5 class="card-text">${productPageTitle}</h5>
                    <p class="card-text">${productPageDescription}</p>
                    ${productSizeIns}
                    <hr>
                    <h5 class="card-text align-bottom">Price: ${productPrice} ${productCurrency}</h5>                     
                    <hr>
                    <a id="${productId}" href="#" class="btn btn-primary ">Add to Cart</a>                  
                </div>                
            </div>
        `
}


function getProductDetails(categoryName, page, productId){
    fetch(`/services/${page}${categoryName}`)
    .then(response => {
        //console.log(response);
        if(!response.ok){
            throw Error('ERROR: Api not ok, check fetch adress');
        }
        return response.json();
    })
    .then(data => {
        const html = data
                .map(product => {                    
                    //TO DO product sizes
                    // for (let i = 0; i<= prodConst.length; i++){
                    //     if (prodConst){ prodConst
                    //     prodConst = product.variation_attributes[1].values[i];
                    let prodConst = {"name" : "nothing here"};                                          
                    //console.log(prodConst);
                    //console.log(prodConst.name);
                    const productSizes = `<option>${prodConst.name}</option`;
                    if (product.id === productId) {
                        folowTheLinks(weAreHere,weAreHereSub,product.name);

                        //mapping links
                            const goCatButton = document.querySelector('#goCat-link');
                            const goSubCatButton = document.querySelector('#goSubCat-link');
                            goSubCatButton.addEventListener('click', function(){
                                categoryPageProducts(weAreHereSub);
                                folowTheLinks(weAreHere, weAreHereSub,'');        
                                const goCatButtonSecondRead = document.querySelector('#goCat-link');
                                goCatButtonSecondRead.addEventListener('click', function(){
                                    bodyContent0.innerHTML = "";
                                    bodyContent1.innerHTML = "";
                                    fetchCategories(weAreHere);
                                    folowTheLinks(weAreHere, '','');
                                });
                            })
                            goCatButton.addEventListener('click', function(){
                                //fetchOneCategory(weAreHere);
                                fetchCategories(weAreHere);
                                folowTheLinks(weAreHere, '','');
                            })
                        //

                        //displayProductDetails(`#${productId}`); 
                        //console.log(productId);
                        return productHtml(product.id, product.name, product.image_groups[0].images[0].link, product.currency, product.page_title, product.page_description, product.price, productSizes)
                    }
                    
                })
                .join("");
                // document.querySelector('#category-image').remove();
                // document.querySelector('#text-category-holder').remove();
                // document.querySelector('#text-category-title-holder').remove();
                bodyContent0.innerHTML='';
            document.querySelector("#body-content-1").innerHTML = `<div class="row d-flex "> ${html} </div>`;
            //console.log(data)
    })
}

//getProductDetails('mens-clothing-dress-shirts', '', '25604455')




