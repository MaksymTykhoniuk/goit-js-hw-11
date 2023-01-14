import { refs } from './js/refs';
import { fetchImages } from './js/fetch';
import {
  renderCardMarkup,
  clearMarkup,
  isHiddenLoadMoreBtn,
  isVisibleLoadMoreBtn,
} from './js/cardRender';

import { scroll } from './js/scroll';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

isHiddenLoadMoreBtn();

let query = '';
let page = 1;

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(event) {
  event.preventDefault();
  clearMarkup();
  query = refs.input.value;

  if (query) {
    try {
      const response = await fetchImages(query, (page = 1));

      if (response.data.hits.length === 0) {
        clearMarkup();
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        refs.gallery.insertAdjacentHTML(
          'beforeend',
          renderCardMarkup(response.data.hits)
        );
        Notify.success(`"Hooray! We found ${response.data.totalHits} images."`);
        lightbox.refresh();

        if (response.data.totalHits > 40) {
          isVisibleLoadMoreBtn();
        } else {
          isHiddenLoadMoreBtn();
        }
      }
    } catch (error) {
      Notify.failure(error);
      clearMarkup();
    }
  } else {
    isHiddenLoadMoreBtn();
    Notify.warning('Please start typing.');
  }
}

async function onLoadMoreBtnClick() {
  page += 1;

  try {
    const response = await fetchImages(query, page);
    const totalPages = response.data.totalHits / 40;

    if (totalPages < page) {
      isHiddenLoadMoreBtn();
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        renderCardMarkup(response.data.hits)
      );
      lightbox.refresh();
      scroll();
    }
  } catch (error) {
    Notify.failure(error);
    clearMarkup();
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

console.dir(refs.loadMoreBtn);
