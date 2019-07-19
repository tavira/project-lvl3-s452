import { watch } from 'melanke-watchjs';
import validator from 'validator';

import render from '../views/rssDownloadForm';

export default class RssDownloadFormModel {
  constructor(rssFeedsModel) {
    this.isValid = null;
    this.value = '';
    this.validationMessage = '';
    this.addButtonDisabled = true;
    this.rssFeedsModel = rssFeedsModel;

    watch(this, () => {
      render(this);
    });
  }

  getValid() {
    return this.isValid;
  }

  setValid(v) {
    this.isValid = v;
  }

  getAddButtonDisabled() {
    return this.addButtonDisabled;
  }

  setAddButtonDisabled(v) {
    this.addButtonDisabled = v;
  }

  getValue() {
    return this.value;
  }

  setValue(v) {
    this.value = v;
    if (this.value === '') {
      this.isValid = true;
      this.addButtonDisabled = false;
      this.validationMessage = '';
      return;
    }
    if (!validator.isURL(this.value)) {
      this.isValid = false;
      this.addButtonDisabled = true;
      this.validationMessage = 'RSS feed address is not valid';
      return;
    }
    if (this.rssFeedsModel.isAlreadyDownloaded(this.value)) {
      this.isValid = false;
      this.addButtonDisabled = true;
      this.validationMessage = 'RSS feed is already on the list';
      return;
    }
    this.isValid = true;
    this.addButtonDisabled = false;
    this.validationMessage = '';
  }

  getValidationMessage() {
    return this.validationMessage;
  }

  setValidationMessage(v) {
    this.validationMessage = v;
  }
}
