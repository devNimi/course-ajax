(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        //imgRequest
        const imgRequest = new XMLHttpRequest();
        imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        imgRequest.onload = addImage;
        imgRequest.onerror = function(err){
          console.log(`something went wrong`);
          console.log(err);
        }
        imgRequest.setRequestHeader('Authorization' , 'Client-ID sssf38193ece85790dfc1489a70d18a948e3d0923699791445f0f01bf57e8c6e7f1');
        imgRequest.send()

        //NYTimes articleRequest
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        imgRequest.onerror = function(err){
          console.log(`something went wrong`);
          console.log(err);
        }
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=36c7788cda3b49e4a434e90eb03f98e3`);
        articleRequest.send();



    });

    function addArticles () {
      let htmlContent = '';
      const nyTimesdata = JSON.parse(this.responseText);
      if (nyTimesdata.response && nyTimesdata.response.docs && nyTimesdata.response.docs.length > 1) {
      	htmlContent = '<ul>' +  nyTimesdata.response.docs.map(article => `<li class="aritcle">
      	<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
      	<p>${article.snippet}</p>
      	<li>`
      ).join('') + '</ul>'
      } else {
      	htmlContent = `<div class="error-no-articles">No articles available</div>`
      }

      responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }


    function addImage(){
      let htmlContent = '';
      const unsplashData = JSON.parse(this.responseText);
      if (unsplashData && unsplashData.results && unsplashData.results[0]) {
        const firstImage = unsplashData.results[0];

        htmlContent = `<figure>
          <img src="${firstImage.urls.regular}" alt="${searchedForText}">
          <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`
      } else {
        htmlContent = `<div class="error-no-image">No image available</div>`
      }
      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
})();
