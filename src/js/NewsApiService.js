const BASE_URL = 'pixabay.com/api';
const API_KEY = '24706231-43c46d3eecbbb07f6810d4a25';


export default class NewApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
   async fetchHits() {
        
        const url =  `https://${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}
    &image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=12`;

 return  await fetch(url)
    .then(response => response.json())
     .then(({ hits }) => {
         this.incrementPage();
        
         return hits;
         
         //    try {
         //     const response = await fetch(url);
         //    const hits = await response.json();
         //    return hits;
         //    } catch (error) {
           
         //    }
     })
    .catch(error => error(Notify.failure( "We're sorry, but you've reached the end of search results.")));

    }
    incrementPage() {
        this.page += 1;
        
    }
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
