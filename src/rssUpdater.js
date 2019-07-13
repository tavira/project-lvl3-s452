import axios from 'axios';
import store from './store';

import { getArticles } from './parsers/rssParser';

const app = () => {
  store.downloading = 'active';
  store.activeData.hasNewPosts = false;
  const { corsproxy, feeds } = store;
  const requests = feeds.map(el => axios.get(corsproxy + el.url));
  Promise.all(requests)
    .then((responses) => {
      responses.forEach((response) => {
        const xmlDocument = new DOMParser().parseFromString(response.data, 'text/xml');
        const url = response.config.url.replace(corsproxy, '');
        const feed = store.feeds.find(el => el.url === url);
        const downloadedArticles = getArticles(xmlDocument);
        const newArticles = downloadedArticles
          .filter(({ guid }) => !feed.articles.some(el => el.guid === guid));
        feed.articles = [...newArticles, ...feed.articles]
          .map((el, index) => ({ id: index + 1, ...el }));
        if (feed.id === store.activeData.feedId && newArticles.length > 0) {
          store.activeData.hasNewPosts = true;
        } else {
          store.activeData.hasNewPosts = false;
        }
        store.downloading = 'completed';
      });
    })
    .catch((error) => {
      throw new Error(error);
    })
    .finally(() => {
      setTimeout(app, store.updateInterval);
    });
};

export default app;
