const languageList = ['en', 'es', 'fr', 'ja', 'nl', 'ru', 'zh'];

const getAppLanguage = () => {
  const language = window.navigator.language || window.navigator.userLanguage;
  console.log('language', language);
  currentLanguage = language.substr(0,2);

  return languageList.includes(currentLanguage) ? currentLanguage : 'en';
};

const getFile = (lang) => {
  console.log('lang', lang);
  let req = new XMLHttpRequest();
  req.open('GET', `./Localizations/${lang}.json`, false);
  req.send(null);

  return JSON.parse(req.responseText);
}

const setLangStr = () => {
  const language = getAppLanguage();

  console.log(language);

  const dictionary = getFile(language);

  console.log(dictionary);

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

  const dictionaryList = Object.values(dictionary);

  console.log(dictionaryList);

  //console.log(dictionary);

  elementsToSet.forEach((element, index) => {
    //element.innerHTML = dictionaryList[index];

    let price = '';
    //const 

    if (!dictionaryList[index].match(/\{\{price\}\}/g, price)) {
      element.innerHTML = dictionaryList[index];
      //console.log('kfjhgfdhjsk');
    } else {
      if (element.id === 'month' || element.id === 'per_month') {
        price = '$9.99';
      } else if (element.id === 'per_year') {
        price = '$19.99';
      }
  
      //console.log(dictionaryList[index].match(<[^>]*>));
      const priceStr = dictionaryList[index].replaceAll(/\{\{price\}\}/g, price);
      //[0-9A-F]
      // if (element.innerHTML) {
  
      // }
      //console.log(priceStr);
      element.innerHTML = priceStr;
    }
  });
};

setLangStr();

