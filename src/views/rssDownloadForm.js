export default (model) => {
  const rssFeedAddButton = document.getElementById('rss-address-add');
  const rssFeedback = document.getElementById('rss-feedback');
  const rssFeedInput = document.getElementById('rss-address');

  rssFeedInput.value = model.getValue();
  rssFeedAddButton.disabled = model.getAddButtonDisabled();
  rssFeedback.textContent = model.getValidationMessage();
  rssFeedback.style.display = 'block';

  if (!model.getValid()) {
    rssFeedInput.classList.add('border');
    rssFeedInput.classList.add('border-danger');
  } else {
    rssFeedInput.classList.remove('border');
    rssFeedInput.classList.remove('border-danger');
  }
};
