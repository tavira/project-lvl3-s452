import { watch } from 'melanke-watchjs';
import validator from 'validator';

import store from './store';
import render from './views/rssForm';

const app = () => {
  const rssFeedInput = document.getElementById('rss-address');

  watch(store.rssFeed, ['value', 'validationMessage', 'isValid'], () => {
    render();
  });

  watch(store.addFeedButton, 'disabled', () => {
    render();
  });

  const updateRssFeedHandler = () => {
    store.rssFeed.value = rssFeedInput.value;
    store.rssFeed.isValid = true;
    store.addFeedButton.disabled = false;
    store.rssFeed.validationMessage = '';
    const urls = store.feeds.map(item => item.url);
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
  };

  rssFeedInput.addEventListener('input', updateRssFeedHandler);
};

export default app;
