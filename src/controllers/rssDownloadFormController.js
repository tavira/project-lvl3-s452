import axios from 'axios';
import { extractRssFeed } from '../parsers/rssParser';
import config from '../config';

export default (state) => {
  const addButton = document.getElementById('rss-address-add');
  const rssInput = document.getElementById('rss-address');

  const inputHandler = ({ target }) => {
    state.setDownloadFormValue(target.value);
  };

  const addButtonHandler = (e) => {
    e.preventDefault();
    state.setDownloadFormState('downloading');
    const url = config.corsproxy + state.downloadFormValue;

    axios.get(url)
      .then((response) => {
        const feed = {
          ...extractRssFeed(response),
          url: state.downloadFormValue,
        };
        state.addFeed(feed);
        state.setDownloadFormState('downloaded');
      })
      .catch((error) => {
        state.setDownloadFormState('download-error', error);
      });
  };

  addButton.addEventListener('click', addButtonHandler);
  rssInput.addEventListener('input', inputHandler);
};
