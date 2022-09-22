const monthly = document.getElementById('monthly');
const annually = document.getElementById('annually');

let appleUrl = 'https://apple.com/';
let googleUrl = 'https://google.com/';

const setHoverListener = (e) => {
  e.preventDefault();

  const linkElement = document.getElementById('continue-link');

  if (e.currentTarget.id === 'monthly' && linkElement.href !== appleUrl) {
    linkElement.href = appleUrl;

    monthly.classList.add('active');
    annually.classList.remove('active');
  } else if (e.currentTarget.id === 'annually' && linkElement.href !== googleUrl) {
    linkElement.href = googleUrl;

    monthly.classList.remove('active');
    annually.classList.add('active');
  }
};

monthly.addEventListener('touchstart', setHoverListener);
annually.addEventListener('touchstart', setHoverListener);
