import $ from 'jquery';

export default (state) => {
  $('#postDesc').on('show.bs.modal', ({ relatedTarget }) => {
    const { guid } = relatedTarget.closest('.card').dataset;
    state.setActivePostGuid(guid);
  });
};
