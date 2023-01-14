function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery .container')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export { scroll };
