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

  const downloadedUrls = feeds.map(feed => feed.url);

  downloadedUrls.forEach((url) => {
    axios.get(`${corsproxy}${url}`)
      .then((response) => {
        try {
          const { articles } = getRssFeed(response.data);
          state.addPostsToDownloadedFeed(url, articles);
          state.removeRssErrors(url);
        } catch (err) {
          state.addRssErrors(url, err);
        }
      })
      .catch((err) => {
        state.addRssErrors(url, err);
      });
  });

  setTimeout(() => periodicallyUpdateFeeds(state), updateInterval);
};

export default periodicallyUpdateFeeds;
