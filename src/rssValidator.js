import { watch } from 'melanke-watchjs';
import validator from 'validator';

import store from './store';

const app = () => {
  const rssFeedInput = document.getElementById('rss-address');
  const rssFeedAddButton = document.getElementById('rss-address-add');
  const rssFeedback = document.getElementById('rss-feedback');

  watch(store.rssFeed, 'value', () => {
    rssFeedInput.value = store.rssFeed.value;
  });

  watch(store.addFeedButton, 'disabled', () => {
    rssFeedAddButton.disabled = store.addFeedButton.disabled;
  });

  watch(store.rssFeed, 'validationMessage', () => {
    rssFeedback.textContent = store.rssFeed.validationMessage;
    rssFeedback.style.display = 'block';
  });

  watch(store.rssFeed, 'isValid', () => {
    if (!store.rssFeed.isValid) {
      rssFeedInput.classList.add('border');
      rssFeedInput.classList.add('border-danger');
    } else {
      rssFeedInput.classList.remove('border');
      rssFeedInput.classList.remove('border-danger');
    }
  });

  const updateRssFeedHandler = () => {
    store.rssFeed.value = rssFeedInput.value;
    store.rssFeed.isValid = true;
    store.addFeedButton.disabled = false;
    store.rssFeed.validationMessage = '';
    const urls = store.feeds.map(item => item.url);
    console.log(`urls - ${urls}`);
    if (!validator.isURL(store.rssFeed.value)) {
      store.rssFeed.isValid = false;
      store.addFeedButton.disabled = true;
      store.rssFeed.validationMessage = 'RSS feed is not valid address';
    }
    if (urls.includes(store.rssFeed.value)) {
      store.rssFeed.isValid = false;
      store.addFeedButton.disabled = true;
      store.rssFeed.validationMessage = 'RSS feed is already on the list';
    }
    console.log(store);
  };

  rssFeedInput.addEventListener('input', updateRssFeedHandler);
};

export default app;
