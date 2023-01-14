import axios from 'axios';

function fetchImages(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '32829243-8ce4d52288749b879b0aaea3c';
  const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true';

  return axios.get(
    `${BASE_URL}?key=${KEY}&q=${searchQuery}&${OPTIONS}&per_page=40&page=${page}`
  );
}

export { fetchImages };
