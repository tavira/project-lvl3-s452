import store from '../store';

export default () => {
  const rssFeedAddButton = document.getElementById('rss-address-add');
  const rssFeedback = document.getElementById('rss-feedback');
  const rssFeedInput = document.getElementById('rss-address');

  rssFeedInput.value = store.rssFeed.value;
  rssFeedAddButton.disabled = store.addFeedButton.disabled;
  rssFeedback.textContent = store.rssFeed.validationMessage;
  rssFeedback.style.display = 'block';

  if (!store.rssFeed.isValid) {
    rssFeedInput.classList.add('border');
    rssFeedInput.classList.add('border-danger');
  } else {
    rssFeedInput.classList.remove('border');
    rssFeedInput.classList.remove('border-danger');
  }
};
