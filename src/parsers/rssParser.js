export const getFeedTitle = xml => xml.querySelector('channel > title').textContent;

export const getFeedDesc = xml => xml.querySelector('channel > description').textContent;

export const getFeedInfo = xml => ({
  title: getFeedTitle(xml),
  desc: getFeedDesc(xml),
});

export const getFeedArticles = xml => Array.from(xml.querySelectorAll('item'));

export const getArticleTitle = item => item.querySelector('title').textContent;

export const getArticleDesc = item => item.querySelector('description').textContent;

export const getArticleLink = item => item.querySelector('link').textContent;

export const getArticlePubDate = item => item.querySelector('pubDate').textContent;

export const getArticleGuid = item => item.querySelector('guid').textContent;

export const getArticle = item => ({
  title: getArticleTitle(item),
  desc: getArticleDesc(item),
  link: getArticleLink(item),
  guid: getArticleGuid(item),
});

export const getArticles = xml => getFeedArticles(xml).map(el => getArticle(el));
