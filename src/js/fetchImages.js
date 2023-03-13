// import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '34294435-d3446f23ab07641a2c4369356';

// export default class ImageApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   async fetchImages() {
//     const filter = `?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

//     try {
//       const response = await axios.get(`${BASE_URL}${filter}`);
//       console.log(response);
//       this.incrementPage();
//       return response;
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   incrementPage() {
//     this.page += 1;
//   }
//   resetPage() {
//     this.page = 1;
//   }
// }

export default class ImageApiService {
  constructor() {
    this.searchImg = '';
    this.page = 1;
  }

  fetchImages() {
    console.log(this);
    const url = `https://pixabay.com/api/?key=34294435-d3446f23ab07641a2c4369356&q=${this.searchImg}&image_type=photo&orientation=horizontal&safesearch=true&per_page=6&page=${this.page}`;

    return fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.page += 1;
        return data.hits;
      });
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchImg;
  }
  set query(newQuery) {
    this.searchImg = newQuery;
  }
}
