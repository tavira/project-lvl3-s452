import axios from 'axios';
import { extractRssArticles } from '../parsers/rssParser';
import config from '../config';

const periodicallyUpdateFeeds = (state) => {
  const { corsproxy, updateInterval } = config;
  const { feedsList } = state.feeds;

  if (feedsList.length === 0) {
    setTimeout(() => periodicallyUpdateFeeds(state), updateInterval);
    return;
  }

  const requests = feedsList
    .map(feed => corsproxy + feed.url)
    .map(url => axios.get(url));

  Promise.all(requests)
    .then((responses) => {
      responses.forEach((r) => {
        const url = r.config.url.replace(corsproxy, '');
        const articles = extractRssArticles(r);
        state.feeds.addPostsToDownloadedFeed(url, articles);
      });
    })
    .catch((error) => {
      state.setValidationMessage(error);
    })
    .finally(() => {
      setTimeout(() => periodicallyUpdateFeeds(state), updateInterval);
    });
};

export default periodicallyUpdateFeeds;
