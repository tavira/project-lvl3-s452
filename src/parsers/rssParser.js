const getArticles = (xml) => {
  const xmlArticles = Array.from(xml.querySelectorAll('item'));
  return xmlArticles.map(item => ({
    title: item.querySelector('title').textContent,
    desc: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
    guid: item.querySelector('guid').textContent,
  }));
};

export default (response) => {
  const { data } = response;
  const xml = new DOMParser().parseFromString(data, 'text/xml');
  return {
    title: xml.querySelector('channel > title').textContent,
    desc: xml.querySelector('channel > description').textContent,
    articles: getArticles(xml),
  };
};
