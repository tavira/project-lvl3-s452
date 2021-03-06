import axios from 'axios';
import getRssFeed from '../parsers/rssParser';
import config from '../config';

export default (state) => {
  const rssDownloadForm = document.getElementById('rss-download-form');
  const rssInput = document.getElementById('rss-address');

  const inputHandler = ({ target }) => {
    state.setDownloadFormValue(target.value);
  };

  const rssFormSubmitHandler = (e) => {
    e.preventDefault();
    state.setDownloadFormState('downloading');
    const url = `${config.corsproxy}${state.downloadFormValue}`;

    axios.get(url)
      .then((response) => {
        try {
          const { title, desc, articles } = getRssFeed(response.data);
          const feed = {
            title,
            desc,
            articles,
            url: state.downloadFormValue,
          };
          state.addFeed(feed);
          state.setDownloadFormState('downloaded');
        } catch (err) {
          console.error(err);
          state.setDownloadFormState('unparsed', err);
        }
      })
      .catch((err) => {
        console.error(err);
        state.setDownloadFormState('undownloaded', err);
      });
  };

  rssDownloadForm.addEventListener('submit', rssFormSubmitHandler);
  rssInput.addEventListener('input', inputHandler);
};
