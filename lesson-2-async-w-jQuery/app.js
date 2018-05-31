/* eslint-env jquery */

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
        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers:{
                'Authorization': 'Client-ID f38193ece85790dfc1489a70d18a948e3d0923699791445f0f01bf57e8c6e7f1'
            }
        }).done(addImage)
        .fail((err)=>{
          console.log(err);
        })

        //NYTimes articleRequest
        $.ajax({
          url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=36c7788cda3b49e4a434e90eb03f98e3`
        }).done(addArticles)
        .fail((err)=>{
          console.log(err);
        })


    });

    function addArticles (articles) {
      console.log(articles);
      let htmlContent = '';

      if (articles.response && articles.response.docs && articles.response.docs.length > 1) {
      	htmlContent = '<ul>' +  articles.response.docs.map(article => `<li class="aritcle">
      	<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
      	<p>${article.snippet}</p>
      	<li>`
      ).join('') + '</ul>'
      } else {
      	htmlContent = `<div class="error-no-articles">No articles available</div>`
      }

      responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }


    function addImage(images){
      let htmlContent = '';


      if (images && images.results && images.results[0]) {
        const firstImage = images.results[0];

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
