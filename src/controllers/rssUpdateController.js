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
    .map(feed => corsproxy + feed.url)
    .map(url => axios.get(url));

  Promise.all(requests)
    .then((responses) => {
      responses.forEach((r) => {
        const url = r.config.url.replace(corsproxy, '');
        const { articles } = getRssFeed(r);
        state.addPostsToDownloadedFeed(url, articles);
      });
    })
    .catch((error) => {
      state.setDownloadFormState('download-error', error);
    })
    .finally(() => {
      setTimeout(() => periodicallyUpdateFeeds(state), updateInterval);
    });
};

export default periodicallyUpdateFeeds;
