import axios from 'axios';
import getRssFeed from '../parsers/rssParser';
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
    const url = `${config.corsproxy}${state.downloadFormValue}`;

    axios.get(url)
      .then((response) => {
        try {
          const { title, desc, articles } = getRssFeed(response);
          const feed = {
            title,
            desc,
            articles,
            url: state.downloadFormValue,
          };
          state.addFeed(feed);
          state.setDownloadFormState('downloaded');
        } catch (error) {
          console.error(error);
          state.setDownloadFormState('invalid', 'parsedWithError');
        }
      })
      .catch((error) => {
        console.error(error);
        state.setDownloadFormState('invalid', 'downloadedWithError');
      });
  };

  addButton.addEventListener('click', addButtonHandler);
  rssInput.addEventListener('input', inputHandler);
};
