import axios from 'axios';
import { extractRssFeed } from '../parsers/rssParser';
import config from '../config';

export default (state) => {
  const addButton = document.getElementById('rss-address-add');
  const rssInput = document.getElementById('rss-address');

  const inputHandler = ({ target }) => {
    state.rssDownloadForm.setUrlValue(target.value);
  };

  const addButtonHandler = (e) => {
    e.preventDefault();
    state.rssDownloadForm.setState('downloading');
    const url = config.corsproxy + state.rssDownloadForm.urlValue;

    axios.get(url)
      .then((response) => {
        const feed = {
          ...extractRssFeed(response),
          url: state.rssDownloadForm.urlValue,
        };
        state.feeds.addFeed(feed);
        state.rssDownloadForm.setState('downloaded');
      })
      .catch((error) => {
        state.rssDownloadForm.setState('download-error', error);
      });
  };

  addButton.addEventListener('click', addButtonHandler);
  rssInput.addEventListener('input', inputHandler);
};
