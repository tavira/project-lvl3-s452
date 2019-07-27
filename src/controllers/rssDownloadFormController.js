import { loadOneFeed } from './rssLoadController';

export default (state) => {
  const addButton = document.getElementById('rss-address-add');
  const rssInput = document.getElementById('rss-address');

  const inputHandler = ({ target }) => {
    state.rssDownloadForm.setUrlValue(target.value);
  };

  const addButtonHandler = (e) => {
    e.preventDefault();
    state.rssDownloadForm.setState('downloading');
    loadOneFeed(state);
  };

  addButton.addEventListener('click', addButtonHandler);
  rssInput.addEventListener('input', inputHandler);
};
