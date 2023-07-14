import axios from "axios";
import Notiflix from 'notiflix';
const BASE_URL = "https://pixabay.com/api/?key=38201775-25af2f6387845f79e6ba89182";

const form = document.querySelector('#search-form')
const gallery = document.querySelector(".gallery")
const searchMore = document.querySelector(".load-more")
let searchQuery = '';
let page = 1;

form.addEventListener('submit', getSearchData)
searchMore.addEventListener("click", getMoreData)


function getMoreData (event) {
  fetchSearchEl(searchQuery).then((data) => {
    const answers = data;
    const gallarys = answers.map(answer => { 
    const webformatURL = answer.webformatURL;
    const largeImageURL = answer.largeImageURL;
    const tags = answer.tags;
    const likes = answer.likes;
    const views = answer.views;
    const comments = answer.comments;
    const downloads = answer.downloads;
    gallery.insertAdjacentHTML("beforeend", 
        `<div class="photo-card">
<img src="${webformatURL}" width="200" height="120" alt="${tags}" loading="lazy" />
<div class="info">
  <p class="info-item">
    <b>Likes:</b>
    <b>${likes}</b>
  </p>
  <p class="info-item">
    <b>Views:</b>
    <b>${views}</b>
  </p>
  <p class="info-item">
    <b>Comments:</b>
    <b>${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads:</b>
    <b>${downloads}</b>
  </p>
</div>
</div>`);
    
})

})
}
function getSearchData(event) {
    event.preventDefault();
    
    searchMore.style.display = "block";
    searchQuery = event.currentTarget.elements.searchQuery.value;
    gallery.innerHTML = "";
    page = 1;
    fetchSearchEl(searchQuery).then((data) => {
        const answers = data;
        const gallarys = answers.map(answer => {
         
            const webformatURL = answer.webformatURL;
            const largeImageURL = answer.largeImageURL;
            const tags = answer.tags;
            const likes = answer.likes;
            const views = answer.views;
            const comments = answer.comments;
            const downloads = answer.downloads;
            gallery.insertAdjacentHTML("beforeend",
                `<div class="photo-card">
        <img src="${webformatURL}" width="200" height="120" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes:</b>
            <b>${likes}</b>
          </p>
          <p class="info-item">
            <b>Views:</b>
            <b>${views}</b>
          </p>
          <p class="info-item">
            <b>Comments:</b>
            <b>${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads:</b>
            <b>${downloads}</b>
          </p>
        </div>
      </div>`);
            
        });
       
    });
};
const axios = require('axios');

async function fetchSearchEl(searchEl) {
    try {
        const response = await axios(`${BASE_URL}&q=${searchEl}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
                  page += 1;
          
    if (response.data.hits.length === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
   
    }  
      return response.data.hits;
    }
  catch {
      searchMore.style.display = "none"
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    }
};