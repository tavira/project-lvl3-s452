import i18next from 'i18next';

export default (state) => {
  const rssFeedAddButton = document.getElementById('rss-address-add');
  const rssFeedback = document.getElementById('rss-feedback');
  const rssFeedInput = document.getElementById('rss-address');

  rssFeedInput.value = state.downloadFormValue;
  rssFeedback.style.display = 'block';
  rssFeedback.textContent = i18next.t(`errors.${state.downloadFormErrorType}`, '');

  switch (state.downloadFormState) {
    case 'invalid':
      rssFeedInput.classList.add('border', 'border-danger');
      rssFeedAddButton.disabled = true;
      break;
    case 'valid':
      rssFeedInput.classList.remove('border', 'border-danger');
      rssFeedAddButton.disabled = false;
      break;
    case 'empty':
      rssFeedInput.classList.remove('border', 'border-danger');
      rssFeedAddButton.disabled = true;
      break;
    case 'downloaded':
      rssFeedInput.classList.remove('border', 'border-danger');
      rssFeedAddButton.disabled = true;
      rssFeedInput.value = '';
      break;
    case 'downloading':
      rssFeedInput.classList.remove('border', 'border-danger');
      rssFeedAddButton.disabled = true;
      break;
    default:
      break;
  }
};
