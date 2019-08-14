import axios from 'axios';
import getRssFeed from '../parsers/rssParser';
import config from '../config';

const periodicallyUpdateFeeds = (state) => {
  const { corsproxy, updateInterval } = config;
  const { feeds } = state;

  if (feeds.length === 0) {
    setTimeout(() => periodicallyUpdateFeeds(state), updateInterval);
    return;
  }

  const requests = feeds
    .map(feed => `${corsproxy}${feed.url}`)
    .map(axios.get);

  Promise.all(requests)
    .then((responses) => {
      responses.forEach((r) => {
        const url = r.config.url.replace(corsproxy, '');
        try {
          const { articles } = getRssFeed(r.data);
          state.addPostsToDownloadedFeed(url, articles);
        } catch (error) {
          console.log(error);
          state.setDownloadFormState('invalid', 'parsedWithError');
        }
      });
    })
    .catch((error) => {
      console.error(error);
      state.setDownloadFormState('invalid', 'downloadedWithError');
    })
    .finally(() => {
      setTimeout(() => periodicallyUpdateFeeds(state), updateInterval);
    });
};

export default periodicallyUpdateFeeds;
