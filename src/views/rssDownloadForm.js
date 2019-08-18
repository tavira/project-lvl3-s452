import i18next from 'i18next';

export default (state) => {
  const rssFeedAddButton = document.getElementById('rss-address-add');
  const rssFeedback = document.getElementById('rss-feedback');
  const rssFeedInput = document.getElementById('rss-address');

  rssFeedInput.value = state.downloadFormValue;
  rssFeedback.style.display = 'block';
  rssFeedback.textContent = '';

  if (state.downloadErrors) {
    const errorsView = state.downloadErrors.map(([url, err]) => (`
      <p class="download-error">${i18next.t('updateError', { err: err.message, url })}`
    ));
    const rssErrors = document.getElementById('rss-errors');
    rssErrors.innerHTML = errorsView.join('');
    rssErrors.style.display = 'block';
  }

  switch (state.downloadFormState) {
    case 'invalidUrl':
      rssFeedInput.classList.add('border', 'border-danger');
      rssFeedAddButton.disabled = false;
      rssFeedback.textContent = i18next.t(`downloadFormState.${state.downloadFormState}`,
        { err: state.downloadFormError.message });
      break;
    case 'alreadyDownloadedUrl':
      rssFeedInput.classList.add('border', 'border-danger');
      rssFeedAddButton.disabled = false;
      rssFeedback.textContent = i18next.t(`downloadFormState.${state.downloadFormState}`,
        { err: state.downloadFormError.message });
      break;
    case 'undownloaded':
      rssFeedInput.classList.add('border', 'border-danger');
      rssFeedAddButton.disabled = false;
      rssFeedback.textContent = i18next.t(`downloadFormState.${state.downloadFormState}`,
        { err: state.downloadFormError.message });
      break;
    case 'unparsed':
      rssFeedInput.classList.add('border', 'border-danger');
      rssFeedAddButton.disabled = false;
      rssFeedback.textContent = i18next.t(`downloadFormState.${state.downloadFormState}`);
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
