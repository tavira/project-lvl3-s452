import { watch } from 'melanke-watchjs';

import renderDownloadForm from './views/rssDownloadForm';
import renderFeeds from './views/feedList';
import renderFeedPosts from './views/feedPostsList';
import renderPostDescription from './views/postDescription';

export default (state) => {
  watch(state, ['downloadFormState', 'downloadFormErrorType', 'downloadErrors'], () => {
    console.log(state);
    renderDownloadForm(state);
  });

  watch(state, ['feeds', 'feedsState'], () => {
    renderFeeds(state);
    renderFeedPosts(state);
  });

  watch(state, ['activeFeedId'], () => {
    renderFeedPosts(state);
  });

  watch(state, 'activePostGuid', () => {
    renderPostDescription(state);
  });
};
