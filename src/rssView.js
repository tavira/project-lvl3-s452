import $ from 'jquery';
import { watch } from 'melanke-watchjs';
import store from './store';
import renderFeedPosts from './views/feedPostsList';
import renderPostDescription from './views/postDescription';

const app = () => {
  const feeds = document.getElementById('feeds-list');

  watch(store.activeData, 'feedId', () => {
    renderFeedPosts();
  });

  watch(store.activeData, 'hasNewPosts', () => {
    renderFeedPosts();
  });

  const clickFeedHandler = (e) => {
    store.activeData.feedId = Number(e.target.closest('.card').dataset.id);
  };

  $('#postDesc').on('show.bs.modal', (e) => {
    store.activeData.postId = Number(e.relatedTarget.closest('.card').dataset.id);
    renderPostDescription();
  });

  feeds.addEventListener('click', clickFeedHandler);
};

export default app;
