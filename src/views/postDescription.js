
export default (state) => {
  const { articles } = state.feeds.find(({ id }) => id === state.activeFeedId);
  const { title, desc } = articles.find(({ guid }) => guid === state.activePostGuid);
  const modal = document.getElementById('postDesc');
  const modalTitle = modal.querySelector('.modal-title');
  const modalContent = modal.querySelector('.modal-body');
  modalTitle.textContent = title;
  modalContent.textContent = desc;
};
