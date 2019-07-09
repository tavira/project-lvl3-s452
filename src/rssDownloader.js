import { watch } from 'melanke-watchjs';
import axios from 'axios';

import store from './store';

const app = () => {
  const corsproxy = 'https://cors-anywhere.herokuapp.com/';
  const rssFeedAddButton = document.getElementById('rss-address-add');
  const feedsList = document.getElementById('feeds-list');

  watch(store, 'feeds', () => {
    feedsList.innerHTML = '';
    store.feeds.forEach((element) => {
      const feed = document.createElement('div');
      feed.setAttribute('data-id', element.id);

      const title = document.createElement('h2');
      title.textContent = element.title;
      feed.appendChild(title);

      const desc = document.createElement('p');
      desc.textContent = element.desc;
      feed.appendChild(desc);

      feedsList.appendChild(feed);
    });
    feedsList.style.display = 'block';
  });

  const addFeedHandler = (e) => {
    e.preventDefault();
    store.addFeedButton.disabled = true;
    axios.get(corsproxy + store.rssFeed.value)
      .then((response) => {
        store.addFeedButton.disabled = true;
        const xmlDocument = new DOMParser().parseFromString(response.data, 'text/xml');

        const id = store.feeds.length + 1;
        const url = store.rssFeed.value;
        const title = xmlDocument.querySelector('channel > title').textContent;
        const desc = xmlDocument.querySelector('channel > description').textContent;
        const articles = Array.from(xmlDocument.querySelectorAll('item'))
          .map((el) => {
            const itemTitle = el.querySelector('title').textContent;
            const itemDesc = el.querySelector('description').textContent;
            const itemLink = el.querySelector('link').textContent;
            return {
              title: itemTitle, desc: itemDesc, link: itemLink,
            };
          });
        const newFeed = {
          id, url, title, desc, articles,
        };

        store.feeds = [...store.feeds, newFeed];
        store.rssFeed.value = '';
        store.addFeedButton.disabled = false;
      })
      .catch(() => {
        store.rssFeed.validationMessage = 'Error while downloading RSS. Try another RSS';
      });
  };

  rssFeedAddButton.addEventListener('click', addFeedHandler);
};

export default app;
