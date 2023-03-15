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
};
// робимо екземпляри
const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn({ selektor: '.load-more', hidden: true });
let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
// прослуховувач
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  imageApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
  if (imageApiService.searchQuery === '') {
    return;
  }
  loadMoreBtn.show();
  imageApiService.resetPage();
  clearGallery();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disabled();
  imageApiService
    .fetchImages()
    .then(({ data }) => {
      if (data.total === 0) {
        Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        loadMoreBtn.hide();
        return;
      }
      appendGalleryMarkup(data);

      lightbox.refresh();
      const { totalHits } = data;

      if (refs.galleryContainer.children.length === totalHits) {
        Notify.warning(
          `We're sorry, but you've reached the end of search results.`
        );
        loadMoreBtn.hide();
      } else {
        loadMoreBtn.enable();
        Notify.success(`Hooray! We found ${totalHits} images.`);
      }
    })
    .catch(console.log('Error!'));
}

function appendGalleryMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    createGalleryMarkup(hits)
  );
  smoothScrolling();
}
function clearGallery() {
  refs.galleryContainer.innerHTML = '';
}
//  Цей код дозволяє автоматично прокручувати сторінку на висоту N карток галереї, коли вона завантажується
function smoothScrolling() {
  const { height: cardHeight } =
    refs.galleryContainer.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
