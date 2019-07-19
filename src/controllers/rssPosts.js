import $ from 'jquery';

export default (rssFeedsModel) => {
  $('#postDesc').on('show.bs.modal', ({ relatedTarget }) => {
    const { guid } = relatedTarget.closest('.card').dataset;
    rssFeedsModel.setActivePostGuid(guid);
  });
};
