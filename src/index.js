import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImageApiService from './js/fetchImages';
import { createGalleryMarkup } from './js/gallery-markup';
import LoadMoreBtn from './js/load-more-btn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
  //   loadMoreBtn: document.querySelector('.load-more'),
};
// робимо екземпляр
const imageApiService = new ImageApiService();
console.log(imageApiService);
const loadMoreBtn = new LoadMoreBtn({ selektor: '.load-more', hidden: true });
console.log(loadMoreBtn);
// прослуховувач
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  imageApiService.query = e.currentTarget.elements.searchQuery.value;
  if (imageApiService.query === '') {
    return;
  }
  loadMoreBtn.show();
  imageApiService.resetPage();
  clearGallery();
  fetchImages();
}
function fetchImages() {
  loadMoreBtn.disabled();
  imageApiService.fetchImages().then(hits => {
    appendGalleryMarkup(hits);
    loadMoreBtn.enable();
  });
}

function appendGalleryMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    createGalleryMarkup(hits)
  );
}
function clearGallery() {
  refs.galleryContainer.innerHTML = '';
}
let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
