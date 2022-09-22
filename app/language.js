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
    document.getElementsByTagName('body');
  }
  const htmlTag = document.querySelector('html[lang]');
  htmlTag.lang = pageLanguage;
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

  const elementsToSet = document.querySelectorAll('[data-translate]');

  elementsToSet.forEach((element) => {
    let price = '';
    const currentTranslation = Number(element.dataset.translate);
    console.log(currentTranslation);

    if (!dictionaryList[currentTranslation].match(/\{\{price\}\}/g, price)) {
      element.innerHTML = dictionaryList[currentTranslation];
    } else {
      if (currentTranslation === 5 || currentTranslation === 7) {
        price = '$9.99';

        if (currentTranslation === 7) {
          const perMonthElement = document.querySelector('[data-month]');
          const perMonthText = perMonthElement.innerHTML;
          const monthPrice = perMonthText.slice(0, perMonthText.indexOf('/'));
          const perMonthTranslation = dictionaryList[currentTranslation].slice(dictionaryList[currentTranslation].indexOf('/') + 1);

          perMonthElement.innerHTML += `/${perMonthTranslation}`;
        }
      } else if (currentTranslation === 10) {
        price = '$19.99';
      }

      const priceStr = dictionaryList[currentTranslation].replaceAll(/\{\{price\}\}/g, price);
      element.innerHTML = priceStr;
    }
  });
};

setLangStr();
