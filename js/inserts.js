const indexLocation = "../view/index.html";
const navBarLocation = "../view/navbar.html";
const categoriesLocation = "../view/categories-products.html";
const caroselLocation = "../view/carousel.html";
const logInFormLocation = "../view/login-signin-forms.html";
const cartLocation = "../view/cart.html";
const bodyContent0 = document.querySelector('#body-content-0');
const bodyContent1 = document.querySelector('#body-content-1');
const bodyContent2 = document.querySelector('#body-content-2');

//mapping links - breadcrumbs
function folowTheLinks(linkMapCategories, linkMapSubcategories, linkMapProd){
    const linkMapLocation = document.querySelector('#link-map');
   
    let cat = `${linkMapCategories}`;
    let subCat = ` / ${linkMapSubcategories}`;
    let prod = ` / ${linkMapProd}`;

    if (linkMapCategories === ''){ cat = '';};
    if (linkMapSubcategories === ''){ subCat = ''; }
    if (linkMapProd === ''){ prod = ''; };
    
    let toPrint = `
    <p class="h6" style="text-decoration:none;">You are on: 
        <a style="text-decoration:none;" id = "goCat-link" href="#">${cat}</a>
        <a style="text-decoration:none;" id = "goSubCat-link" href="#">${subCat}</a> 
        <a style="text-decoration:none;" id = "goProd-link" href="#">${prod}</a> 
    </p>`;

    linkMapLocation.innerHTML = toPrint;
}
folowTheLinks('Home Page', '', '');



//Template display from location to (.class or #id, etc)
function display(elementLocation, elementToDisplay){
    $(function () {
        $.get(elementLocation, function (data) {            
        $(`${elementToDisplay}`).append(data).hide().slideDown(1000);
    });
});
}

//insert navbar
$(function () {
    $.get(navBarLocation, function (data) {
        $("#navbar-div").append(data).hide().slideDown(1000);
    });
});


//carousel insert/configurations and buttons
$(function() {
    $.get(caroselLocation, function (data) {
        $("#carousel-holder").append(data);
        const slides = $('.foto');
        //console.log(slides);        
        var slideIndex = 0;        
        const btn1Carousel = document.getElementById('btn1-carousel');
        const btn2Carousel = document.getElementById('btn2-carousel');
            function noDysplay(){for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                };
            }

            function showSlides() {                
                noDysplay();
                slideIndex++;
                if (slideIndex >= slides.length-1) {
                    slideIndex = 0;
                };                                        
                slides[slideIndex].style.display = "block";
                setTimeout(showSlides, 3500);
            }

            btn1Carousel.addEventListener('click', function(){
                noDysplay();
                if (slideIndex <= 0){slideIndex = slides.length-1;
                };
                slideIndex --;
                slides[slideIndex].style.display = "block";            
            });          

            btn2Carousel.addEventListener('click', function(){                
                noDysplay();
                if (slideIndex === slides.length-1){
                    slideIndex = -1;
                };
                slideIndex ++;                
                slides[slideIndex].style.display = "block";              
            }); 

            showSlides(); 
    });
});


function selectDeselect(){
    var btns = $.get(navBarLocation, ".btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {   
            btns[i].toggleClass("active");
            // var current = document.getElementsByClassName("active");
            // if (current.length > 0) {
            // current[0].className = current[0].className.replace("active", "");
            }
            //this.className += " active";
        );
    }
}


function printFunction() {
    fetch('../services/UserServices')
    .then(jsonData => jsonData.json())
    .then(data => printIt(data))
    
    //from categories-products get element
    //from API fill element with data
    let printIt = (data) => {
        let data1 = data[0].page_title;
        let data4 = data[0].page_description;
        let data5 = data[0].name;
        $("#category-title").empty().append(data1);
        $("div#text-category-holder p").empty().text(data4);
        $("div#text-category-title-holder h5").empty().text(data5);
    }
}



//TEMPLATE
//insert function: when click some button, insert html
// // if click display something  
function clicked(btnClick, toBeDisplayd, folowTheLinksString) {
    $(function () {
        $.get(navBarLocation, function () {             
            var button1 = document.getElementById(`${btnClick}`);
            button1.addEventListener('click', function(){
                    bodyContent0.innerHTML = "";
                    bodyContent1.innerHTML = "";
                    selectDeselect();
                    folowTheLinks(folowTheLinksString, '', '');
                    //printFunction(apiIndexCategories);
                    display(toBeDisplayd, '#body-content-1');                    
                    }                      
                 );
        });
    }); 
}


         
clicked('cart-link', cartLocation, 'Cart');
clicked('login-link', logInFormLocation, 'Log In / Sign In');
// clicked('navbarDropdownWomens', categoriesLocation);
// clicked('navbarDropdownMens', categoriesLocation);

//homepage logo - refresh page
$(function () {
    $.get(navBarLocation, function () {             
        const button1 = document.getElementById(`logo`);
        button1.addEventListener('click', function(){
                location.reload();                
                }                      
             );
    });
}); 

//Womens dropdown button toggle
$(function () {        
    $.get(navBarLocation, function () {      
        $('#navbarDropdownWomens').on('click', function(e){            
            $("#toAddWomens").toggleClass("show active");
        });
        $('#toAddWomens').on('click', function(e){
            if ($(e.target).is("#toAddWomens") === false){
                $("#toAddWomens").removeClass("show active");
            }
        })
        $('#toAddWomens').mouseleave( function(){
            $("#toAddWomens").removeClass("show");
        
        })
    })
})

//Mans dropdown button toggle
$(function () {        
    $.get(navBarLocation, function () {      
        $('#navbarDropdownMens').on('click', function(e){
            //selectDeselect();
            $("#toAddMens").toggleClass("show");
        });
        $('#toAddMens').on('click', function(e){
            if ($(e.target).is("#toAddMens") === false){
                $("#toAddMens").removeClass("show");
            }
        })
        $('#toAddMens').mouseleave( function(){
                $("#toAddMens").removeClass("show");
            
        })
    })
})

//Tel dropdown button toggle
$(function () {        
    $.get(navBarLocation, function () {      
        $('#tel').on('click', function(e){
            $("#navbarSupportedContent").toggleClass("show");
        });
        $('#navbarSupportedContent').on('click', function(e){
            if ($(e.target).is("#navbarSupportedContent") === false){
                $("#navbarSupportedContent").removeClass("show");
            }
        })
    })
})


//TO DO - Not working 
// remove all .active classes when clicked anywhere and collaps dropdowns
// function removeShowClass(){hide = true;
//     $('body').on("click", function () {
//         if (hide) $('.dropdown-menu').removeClass('show');
//         hide = true;
//     });
// }
