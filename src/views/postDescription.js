import store from '../store';

export default () => {
  const modal = document.getElementById('postDesc');
  const activeFeed = store.feeds[store.activeData.feedId - 1];
  const { title, desc } = activeFeed.articles[store.activeData.postId - 1];
  const modalTitle = modal.querySelector('.modal-title');
  const modalContent = modal.querySelector('.modal-body');
  modalTitle.textContent = title;
  modalContent.textContent = desc;
};
