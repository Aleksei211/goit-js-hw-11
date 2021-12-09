
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

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);



function onSearch(evt) {
    evt.preventDefault();

    clearHitsContainer();
    newsApiService.searchQuery = evt.currentTarget.elements.searchQuery.value;

    if (newsApiService.searchQuery === '') {
        refs.loadMoreBtn.classList.add('is-hidden')
        return Notify.failure('Sorry, enter your query')
        
    }
    
            refs.loadMoreBtn.classList.add('is-hidden')
            newsApiService.resetPage();
            newsApiService.fetchHits().then(appendHitsMarkup);
    
    }

function onLoadMore() {
    newsApiService.fetchHits().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
                    if (hits.length  === 0) {
                        Notify.failure("Nothing has been found. Please enter a more specific query!");
                        return
    }
    refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(hits));
    lightbox.refresh()
    
    refs.loadMoreBtn.classList.remove('is-hidden')
                        if (hits.length  > 1) {
                        Notify.success('We found totalHits images.');
                        return
    }

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