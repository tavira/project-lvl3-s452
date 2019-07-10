import $ from 'jquery';
import store from './store';

const app = () => {
  const feeds = document.getElementById('feeds-list');
  const feedsArticles = document.getElementById('articles-list');

  const clickFeedHandler = (e) => {
    const clickedId = e.target.closest('div').dataset.id;
    const { articles } = store.feeds.find(el => el.id === Number(clickedId));

    feedsArticles.innerHTML = '';
    articles.forEach((el) => {
      const article = document.createElement('div');
      const title = document.createElement('h3');
      const titleLink = document.createElement('a');
      titleLink.textContent = el.title;
      titleLink.setAttribute('href', el.link);
      article.setAttribute('data-id', el.id);
      title.appendChild(titleLink);
      article.appendChild(title);
      const buttonDesc = document.createElement('button');
      buttonDesc.classList.add('btn', 'btn-primary', 'postDesc');
      buttonDesc.setAttribute('data-toggle', 'modal');
      buttonDesc.setAttribute('data-target', '#postDesc');
      buttonDesc.textContent = 'Show post description';
      article.appendChild(buttonDesc);
      feedsArticles.appendChild(article);
    });
  };

  $('#postDesc').on('show.bs.modal', (e) => {
    console.log(e);
    store.activeData.postId = Number(e.relatedTarget.closest('div').dataset.id);
    const { title, desc } = store.feeds[store.activeData.feedId - 1]
      .articles[store.activeData.postId - 1];
    const modalTitle = e.currentTarget.querySelector('.modal-title');
    const modalContent = e.currentTarget.querySelector('.modal-body');
    modalTitle.textContent = title;
    modalContent.textContent = desc;
  });

  feeds.addEventListener('click', clickFeedHandler);
};

export default app;
