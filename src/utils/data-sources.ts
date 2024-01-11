const dataSources = [{
  sourceName: 'Polsat News',
  lightColor: '#e6007e',
  darkColor: '#143266',
  logoFileName: 'polsat-news-logo.svg',
  url: '',
  active: false,
  sources: [{
    name: 'Wszystkie',
    url: 'https://www.polsatnews.pl/rss/wszystkie.xml',
    feed: [],
    active: true,
  },
  {
    name: 'Polska',
    url: 'https://www.polsatnews.pl/rss/polska.xml',
    feed: [],
    active: false,
  },
  {
    name: 'Świat',
    url: 'https://www.polsatnews.pl/rss/swiat.xml',
    feed: [],
    active: false,
  },
  {
    name: 'Wideo',
    url: 'https://www.polsatnews.pl/rss/wideo.xml',
    feed: [],
    active: false,
  },
  {
    name: 'Biznes',
    url: 'https://www.polsatnews.pl/rss/biznes.xml',
    feed: [],
    active: false,
  }]
},
{
  sourceName: 'Polska Agencja Prasowa',
  lightColor: '#e6007e',
  darkColor: '#842219',
  logoFileName: 'pap.svg',
  url: '',
  active: false,
  sources: [{
    name: 'Wszystkie',
    url: 'https://pap-mediaroom.pl/rss.xml',
    feed: [],
    active: true,
  },
  {
    name: 'Biznes i finanse',
    url: 'https://pap-mediaroom.pl/kategoria/biznes-i-finanse/rss.xml',
    feed: [],
    active: false,
  }]
},
{
  sourceName: 'Auto centrum',
  lightColor: '#e6007e',
  darkColor: '#1e80a4',
  logoFileName: 'autocentrum.svg',
  url: '',
  active: false,
  sources: [{
    name: 'Co nowego',
    url: 'https://www.autocentrum.pl/rss/co-nowego/',
    feed: [],
    active: true,
  },
  {
    name: 'Publikacje',
    url: 'https://www.autocentrum.pl/rss/publikacje/',
    feed: [],
    active: false,
  }]
},
{
  sourceName: 'Interia',
  lightColor: '#e6007e',
  darkColor: '#4b69b4',
  logoFileName: 'interia.png',
  url: '',
  active: false,
  sources: [{
    name: 'Wydarzenia',
    url: 'https://wydarzenia.interia.pl/feed',
    feed: [],
    active: true,
  },
  {
    name: 'Polska',
    url: 'https://wydarzenia.interia.pl/kraj/feed',
    feed: [],
    active: false,
  }]
}];

export default dataSources;