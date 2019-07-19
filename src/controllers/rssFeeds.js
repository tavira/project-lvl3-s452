export default (rssFeedsModel) => {
  const feedsList = document.getElementById('feeds-list');
  const clickFeedHandler = (e) => {
    const id = Number(e.target.closest('.card').dataset.id);
    rssFeedsModel.setActiveFeedId(id);
  };
  feedsList.addEventListener('click', clickFeedHandler);
};
