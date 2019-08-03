const getFeedTitle = xml => xml.querySelector('channel > title').textContent;

const getFeedDesc = xml => xml.querySelector('channel > description').textContent;

const getFeedArticles = xml => Array.from(xml.querySelectorAll('item'));

const getArticleTitle = item => item.querySelector('title').textContent;

const getArticleDesc = item => item.querySelector('description').textContent;

const getArticleLink = item => item.querySelector('link').textContent;

const getArticleGuid = item => item.querySelector('guid').textContent;

const getArticle = item => ({
  title: getArticleTitle(item),
  desc: getArticleDesc(item),
  link: getArticleLink(item),
  guid: getArticleGuid(item),
});

const getArticles = xml => getFeedArticles(xml).map(el => getArticle(el));

export const extractRssFeed = (response) => {
  const { data } = response;
  const xmlParser = new DOMParser().parseFromString(data, 'text/xml');
  return {
    title: getFeedTitle(xmlParser),
    desc: getFeedDesc(xmlParser),
    articles: getArticles(xmlParser),
  };
};

export const extractRssArticles = (response) => {
  const { data } = response;
  const xmlParser = new DOMParser().parseFromString(data, 'text/xml');
  return getArticles(xmlParser);
};
