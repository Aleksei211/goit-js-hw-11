
import './sass/main.scss';
import galleryTpl from './templates/gallery.hbs';
import NewsApiService from './js/NewsApiService';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn:document.querySelector('[data-action="load-more"]')
}

const newsApiService = new NewsApiService();

//const API_KEY = '24706231-43c46d3eecbbb07f6810d4a25';

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);



function onSearch(evt) {
    evt.preventDefault();

    clearHitsContainer();
    newsApiService.searchQuery = evt.currentTarget.elements.searchQuery.value;

    if (newsApiService.searchQuery === '') {
        return Notify.failure('Sorry, enter your query')
    }
    newsApiService.resetPage();
    newsApiService.fetchHits().then(appendHitsMarkup);
    
}

function onLoadMore() {
    newsApiService.fetchHits().then(appendHitsMarkup);
}


function appendHitsMarkup(hits) {
    
    refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(hits));
    lightbox.refresh()
}
function clearHitsContainer() {
    refs.gallery.innerHTML = '';
}

 const lightbox = new SimpleLightbox('.gallery a', {
   disableRightClick: true,
    scrollZoom: false,
    captionDelay: 250,
    captionsData: 'alt', 
});