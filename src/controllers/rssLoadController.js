import axios from 'axios';
import {
  getFeedTitle, getFeedDesc, getArticles,
} from '../parsers/rssParser';
import config from '../config';

const loadOneFeed = (url, rssDownloadFormModel, rssFeedsModel) => {
  axios.get(url)
    .then(response => response.data)
    .then((data) => {
      const xml = new DOMParser().parseFromString(data, 'text/xml');
      const newFeed = {
        url: rssDownloadFormModel.getValue(),
        title: getFeedTitle(xml),
        desc: getFeedDesc(xml),
        articles: getArticles(xml),
      };
      rssFeedsModel.addFeed(newFeed);
      rssDownloadFormModel.setValue('');
    })
    .catch((error) => {
      rssDownloadFormModel.setValidationMessage(error);
    })
    .finally(() => {
      rssDownloadFormModel.setAddButtonDisabled(false);
    });
};

const loadArticlesToDownloadedFeeds = (response, rssFeedsModel) => {
  const { corsproxy } = config;
  const xml = new DOMParser().parseFromString(response.data, 'text/xml');
  const url = response.config.url.replace(corsproxy, '');
  const downloadedArticles = getArticles(xml);
  rssFeedsModel.addPostsToDownloadedFeed(url, downloadedArticles);
};

const periodicallyUpdateFeeds = (rssFeedsModel, rssDownloadFormModel) => {
  const { corsproxy, updateInterval } = config;
  const feeds = rssFeedsModel.getFeeds();
  if (feeds.length === 0) {
    setTimeout(periodicallyUpdateFeeds, updateInterval,
      rssFeedsModel, rssDownloadFormModel);
    return;
  }
  const requests = feeds.map(el => el.url)
    .map(url => corsproxy + url)
    .map(url => axios.get(url));
  Promise.all(requests)
    .then((responses) => {
      responses.forEach((response) => {
        loadArticlesToDownloadedFeeds(response, rssFeedsModel);
      });
    })
    .catch((error) => {
      rssDownloadFormModel.setValidationMessage(error);
    })
    .finally(() => {
      setTimeout(periodicallyUpdateFeeds, updateInterval,
        rssFeedsModel, rssDownloadFormModel);
    });
};

export { loadOneFeed, periodicallyUpdateFeeds };
