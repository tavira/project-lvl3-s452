
export default (state) => {
  const { articles } = state.feeds.feedsList.find(({ id }) => id === state.feeds.activeFeedId);
  const { title, desc } = articles.find(({ guid }) => guid === state.posts.activePostGuid);
  const modal = document.getElementById('postDesc');
  const modalTitle = modal.querySelector('.modal-title');
  const modalContent = modal.querySelector('.modal-body');
  modalTitle.textContent = title;
  modalContent.textContent = desc;
};
