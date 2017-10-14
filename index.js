const YOU_TUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    q:searchTerm,
    //per_page: 5,
    part:"snippet",
    key:'AIzaSyBAE41UKG8EFUxFqNWXS_b8eBIaRO3pVSU'
    }
  $.getJSON(YOU_TUBE_SEARCH_URL, query, callback).fail(function(){
    console.log("error");
    
  })
  
  
}

function renderResult(result) {
  console.log(result);
  //var vId=console.log(result.id.videoId);
  //var vId=result.id.videoId;
  //console.log(vId);
  console.log(result.id.videoId);
  //console.log(totalResults);
  return `
    <div>
      <h2>${result.snippet.title}</h2>
      <p>Check out ${result.snippet.title}'s video!</p>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"> <img src="${result.snippet.thumbnails.medium.url}" alt= "${result.snippet.title}'s video"></a> 
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  //console.log(data.items[0].snippet.title);
  //console.log(data.items[1].id.videoId);
 // let movieTitle = data.items[0].snippet.title;
  //let results = []
  //for(let i =0; i < data.items.length; i++) {
    // results.push(renderResult(data.items[i]));
  //}
     //const results = data.items.map( function (item, index) { 
     //return renderResult(item)
   //});
   
 const results = data.items.map((item, index) => renderResult(item));
  //console.log(data);
  //$('.js-search-results').prepend(`<h4>About ${data.pageInfo.totalResults} results </h4>`);
  $('.js-search-results').html(`<h2>Results</h2> About ${data.pageInfo.totalResults} results` + results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const searchTerm = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(searchTerm, displayYouTubeSearchData);
  });
}

$(watchSubmit);
