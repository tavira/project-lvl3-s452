import store from './store';

const app = () => {
  const feeds = document.getElementById('feeds-list');
  const feedsArticles = document.getElementById('articles-list');


  const clickFeedHandler = (e) => {
    const clickedId = e.target.closest('div').dataset.id;
    console.log(typeof clickedId);
    console.log(store.feeds);
    const { articles } = store.feeds.find(el => el.id === Number(clickedId));

    feedsArticles.innerHTML = '';
    articles.forEach((el) => {
      const article = document.createElement('div');
      const title = document.createElement('h3');
      const titleLink = document.createElement('a');
      titleLink.textContent = el.title;
      titleLink.setAttribute('href', el.link);
      title.appendChild(titleLink);
      article.appendChild(title);
      const desc = document.createElement('p');
      desc.textContent = el.desc;
      article.appendChild(desc);
      feedsArticles.appendChild(article);
    });
  };

  feeds.addEventListener('click', clickFeedHandler);
};

export default app;
