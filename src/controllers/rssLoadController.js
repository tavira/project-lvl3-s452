import axios from 'axios';
import {
  getFeedTitle, getFeedDesc, getArticles,
} from '../parsers/rssParser';
import config from '../config';

const loadOneFeed = (state) => {
  const feedUrl = state.rssDownloadForm.urlValue;
  const loadUrl = config.corsproxy + feedUrl;
  axios.get(loadUrl)
    .then(response => response.data)
    .then((data) => {
      const xml = new DOMParser().parseFromString(data, 'text/xml');
      const newFeed = {
        url: feedUrl,
        title: getFeedTitle(xml),
        desc: getFeedDesc(xml),
        articles: getArticles(xml),
      };
      state.rssDownloadForm.setState('downloaded');
      state.feeds.addFeed(newFeed);
    })
    .catch((error) => {
      state.rssDownloadForm.setState('download-error', error);
    });
};

const loadArticlesToDownloadedFeeds = (response, state) => {
  const { corsproxy } = config;
  const xml = new DOMParser().parseFromString(response.data, 'text/xml');
  const url = response.config.url.replace(corsproxy, '');
  const downloadedArticles = getArticles(xml);
  state.feeds.addPostsToDownloadedFeed(url, downloadedArticles);
};

const periodicallyUpdateFeeds = (state) => {
  const { corsproxy, updateInterval } = config;
  const { feedsList } = state.feeds;
  if (feedsList.length === 0) {
    setTimeout(periodicallyUpdateFeeds, updateInterval, state);
    return;
  }
  const requests = feedsList.map(el => el.url)
    .map(url => corsproxy + url)
    .map(url => axios.get(url));
  Promise.all(requests)
    .then((responses) => {
      responses.forEach((response) => {
        loadArticlesToDownloadedFeeds(response, state);
      });
    })
    .catch((error) => {
      state.setValidationMessage(error);
    })
    .finally(() => {
      setTimeout(periodicallyUpdateFeeds, updateInterval, state);
    });
};

export { loadOneFeed, periodicallyUpdateFeeds };
