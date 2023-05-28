import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './data.js';
import { createMarkup } from './functions.js'

let pageParams = 1;
let isCanLoad = false;
let searchVal;
refs.formEl.addEventListener('submit',async function (event) {
  
    event.preventDefault();

    refs.galleryEl.innerHTML = '';
    
    searchVal = event.target.searchQuery.value;

    if (searchVal.trim() == "") {
        Notiflix.Report.failure("Input can't be empty!!!");
        return 
    }

    pageParams = 1;

    await axios({
        method: 'get',
        url: 'https://pixabay.com/api/',
        params: {
            key: refs.pixabayKey,
            q: searchVal,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: refs.PER_PAGE,
            page: pageParams
        },   
    })
        .then(function (response) {
            if (response.data.hits.length == 0) { 
                
                Notiflix.Report.info('Sorry, there are no images matching your search query. Please try again.')
                return false
            }
            
            isCanLoad = response.data.totalHits > refs.PER_PAGE ? true : false;
            
            createMarkup(response.data.hits);
            
            refs.lightbox.refresh(); 

        })
        .catch(function (error) {
            console.log(error);
        })
    });

window.addEventListener('scroll', async function listenerScroll () {

    if((document.body.offsetHeight-window.innerHeight) <= window.pageYOffset && isCanLoad == true){
    await loadMoreImgs();
  }
})

function loadMoreImgs() {
    
  

    axios({
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
          key: refs.pixabayKey,
          q: searchVal,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: refs.PER_PAGE,
          page: pageParams
      }  
  })
  .then(function (response) {
    if ( pageParams*refs.PER_PAGE >= response.data.totalHits ) { 
        Notiflix.Report.info("We're sorry, but you've reached the end of search results.")
        window.removeEventListener("scroll",listenerScroll())
        return;
    }
    pageParams += 1;
    createMarkup(response.data.hits);
       
    refs.lightbox.refresh(); 
    

  })
  
  .catch(function (error) {
      console.log(error);
  })
}