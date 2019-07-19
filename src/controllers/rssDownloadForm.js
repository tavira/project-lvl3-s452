import config from '../config';
import { loadOneFeed } from './rssLoadController';

export default (rssDownloadFormModel, rssFeedsModel) => {
  const addButton = document.getElementById('rss-address-add');
  const rssInput = document.getElementById('rss-address');

  const addButtonHandler = (e) => {
    e.preventDefault();
    rssDownloadFormModel.setAddButtonDisabled(true);
    const loadUrl = config.corsproxy + rssDownloadFormModel.getValue();
    loadOneFeed(loadUrl, rssDownloadFormModel, rssFeedsModel);
  };

  const inputHandler = ({ target }) => {
    rssDownloadFormModel.setValue(target.value);
  };

  addButton.addEventListener('click', addButtonHandler);
  rssInput.addEventListener('input', inputHandler);
};
