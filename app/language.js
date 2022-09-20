const languageList = ['en', 'es', 'fr', 'ja', 'nl', 'ru', 'zh'];

const url = new URL(document.location.href);
const langParam = new URLSearchParams(document.location.search).get('lang');

const language = window.navigator.language || window.navigator.userLanguage;
const pageLanguage =
  languageList.includes(langParam) ?
    langParam :
    (languageList.includes(language.substr(0,2)) ? language : 'en');

//LANGUAGE LOGIC

const setLangParam = () => {
  if (!langParam || !languageList.includes(langParam)) {
    url.searchParams.set('lang', pageLanguage);
    window.location.href = url.href;
  }
}

setLangParam();

const getDictionary = (lang) => {
  let req = new XMLHttpRequest();
  req.open('GET', `./Localizations/${lang}.json`, false);
  req.send(null);

  return JSON.parse(req.responseText);
}

const setLangStr = () => {
  const dictionary = getDictionary(pageLanguage);
  const dictionaryList = Object.values(dictionary);

  const elementsToSet = [
    document.getElementById('title_el'),
    document.getElementById('unlimited_documents'),
    document.getElementById('count_mode'),
    document.getElementById('ocr'),
    document.getElementById('monthly_el'),
    document.getElementById('month'),
    document.getElementById('free_period'),
    document.getElementById('per_month'),
    document.getElementById('annually_title'),
    document.getElementById('83'),
    document.getElementById('per_year'),
    document.getElementById('popular'),
    document.getElementById('continue_el'),
    document.getElementById('cancel'),
    document.getElementById('terms_of_use'),
    document.getElementById('restore'),
    document.getElementById('privacy_policy'),
  ];

  elementsToSet.forEach((element, index) => {
    let price = '';

    if (!dictionaryList[index].match(/\{\{price\}\}/g, price)) {
      element.innerHTML = dictionaryList[index];
    } else {
      if (element.id === 'month' || element.id === 'per_month') {
        price = '$9.99';

        if (element.id === 'per_month') {
          const perMonthElement = document.getElementById('sale-month');
          const perMonthText = perMonthElement.innerHTML;
          const monthPrice = perMonthText.slice(0, perMonthText.indexOf('/'));
          const perMonthTranslation = dictionaryList[index].slice(dictionaryList[index].indexOf('/') + 1);

          perMonthElement.innerHTML = `${monthPrice}/${perMonthTranslation}`;
        }
      } else if (element.id === 'per_year') {
        price = '$19.99';
      }

      const priceStr = dictionaryList[index].replaceAll(/\{\{price\}\}/g, price);
      element.innerHTML = priceStr;
    }
  });
};

setLangStr();
