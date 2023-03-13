import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34294435-d3446f23ab07641a2c4369356';
const PARAM =
  'per_page=40&image_type=photo&orientation=horizontal&safesearch=true';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&${PARAM}`
      );

      console.log(response);
      this.incrementPage();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
