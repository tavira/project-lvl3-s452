export default (state) => {
  const feedsList = document.getElementById('feeds-list');
  const clickFeedHandler = (e) => {
    const id = Number(e.target.closest('.card').dataset.id);
    state.setActiveFeedId(id);
  };
  feedsList.addEventListener('click', clickFeedHandler);
};
