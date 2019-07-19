
export default ({ title, desc }) => {
  const modal = document.getElementById('postDesc');
  const modalTitle = modal.querySelector('.modal-title');
  const modalContent = modal.querySelector('.modal-body');
  modalTitle.textContent = title;
  modalContent.textContent = desc;
};
