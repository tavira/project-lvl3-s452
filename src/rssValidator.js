import { watch } from 'melanke-watchjs';
import validator from 'validator';

const app = () => {
  const state = {
    rssFeed: '',
    rssFeedIsValid: null,
    addFeedIsDisabled: true,
  };

  const rssFeedInput = document.getElementById('rss-address');
  const rssFeedAddButton = document.getElementById('rss-address-add');

  watch(state, 'rssFeed', () => {
    rssFeedInput.value = state.rssFeed;
  });

  watch(state, 'addFeedIsDisabled', () => {
    rssFeedAddButton.disabled = state.addFeedIsDisabled;
  });

  watch(state, 'rssFeedIsValid', () => {
    if (!state.rssFeedIsValid) {
      rssFeedInput.classList.add('border');
      rssFeedInput.classList.add('border-danger');
    } else {
      rssFeedInput.classList.remove('border');
      rssFeedInput.classList.remove('border-danger');
    }
  });

  const updateRssFeedHandler = () => {
    state.rssFeed = rssFeedInput.value;
    state.rssFeedIsValid = validator.isURL(state.rssFeed);
    state.addFeedIsDisabled = !state.rssFeedIsValid;
    console.log(state);
  };

  rssFeedInput.addEventListener('input', updateRssFeedHandler);
};

export default app;
