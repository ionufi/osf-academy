const axios = require('axios');

function helloWorld() {
    return "Hello World";
}

//async function serviceThatCallsApi(postId, email){


async function serviceThatCallsApi(subFolder){
    //const searchUrl = 'https://jsonplaceholder.typicode.com/comments?postId=' + postId + '&email='+ email;
    const ionuMailAPI = 'ionufi@gmail.com';
    const ionuKeyAPI = 'secretKey=$2a$08$Q7mZUzGfHcsvGKKrjLKzo.Co..xcmeM7OnW3Fpy8WXgXsRVc7SLD.';
    const searchUrl = 'https://osf-digital-backend-academy.herokuapp.com/api/' + subFolder + ionuKeyAPI;
    const response = await axios.get(searchUrl);
 
    return response.data;
}




//https://osf-digital-backend-academy.herokuapp.com/api/

//"email": "ionufi@gmail.com",
//"secretKey": "$2a$08$Q7mZUzGfHcsvGKKrjLKzo.Co..xcmeM7OnW3Fpy8WXgXsRVc7SLD.",

// all category https://osf-digital-backend-academy.herokuapp.com/api/categories/?secretKey=$2a$08$Q7mZUzGfHcsvGKKrjLKzo.Co..xcmeM7OnW3Fpy8WXgXsRVc7SLD.


// products https://osf-digital-backend-academy.herokuapp.com/api/products/product_search?primary_category_id=womens-clothing-tops&secretKey=$2a$08$Q7mZUzGfHcsvGKKrjLKzo.Co..xcmeM7OnW3Fpy8WXgXsRVc7SLD.


helloWorld();

module.exports = {
    helloWorld: helloWorld,
    serviceThatCallsApi: serviceThatCallsApi
}
  