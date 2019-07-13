import { watch } from 'melanke-watchjs';
import axios from 'axios';

import store from './store';
import renderFeedList from './views/feedList';
import {
  getFeedInfo, getArticles,
} from './parsers/rssParser';

const app = () => {
  const { corsproxy } = store;
  const rssFeedAddButton = document.getElementById('rss-address-add');

  watch(store, 'feeds', () => {
    renderFeedList();
  });

  const addFeedHandler = (e) => {
    e.preventDefault();
    store.addFeedButton.disabled = true;
    axios.get(corsproxy + store.rssFeed.value)
      .then((response) => {
        store.addFeedButton.disabled = true;
        const xmlDocument = new DOMParser().parseFromString(response.data, 'text/xml');
        const downloadedArticles = getArticles(xmlDocument)
          .map((el, index) => ({ id: index + 1, ...el }));
        const newFeed = {
          id: store.feeds.length + 1,
          url: store.rssFeed.value,
          ...getFeedInfo(xmlDocument),
          articles: downloadedArticles,
        };
        store.feeds = [...store.feeds, newFeed];
        store.rssFeed.value = '';
        store.activeData.feedId = newFeed.id;
        store.addFeedButton.disabled = false;
      })
      .catch((error) => {
        store.rssFeed.validationMessage = 'Error while downloading RSS. Try another RSS';
        throw new Error(error);
      });
  };

  rssFeedAddButton.addEventListener('click', addFeedHandler);
};

export default app;
