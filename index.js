const app = () => {
  const loginButton = document.querySelector('.login-link');
  const loginModalWindow = document.querySelector('.modal-login');
  const loginInput = document.querySelector('.login-icon-user');
  const passwordInput = document.querySelector('.login-icon-password');
  const [loginButtonClose, mapButtonClose] =
    document.querySelectorAll('.modal-close');
  const form = document.querySelector('.login-form');
  const mapLink = document.querySelectorAll('.link-map');
  const modalMap = document.querySelector('.modal-map');
  const locker = document.querySelector('.locker');

  const storageLogin = localStorage.getItem('login');

  let isStorageSupport = true;
  let storage = '';
  try {
    storage = localStorage.getItem('login');
  } catch (err) {
    isStorageSupport = false;
  }

  loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    loginModalWindow.classList.add('modal-login-show');
    locker.classList.add('lockOn');
    if (storageLogin) {
      loginInput.value = storageLogin;
      passwordInput.focus();
    } else loginInput.focus();
  });

  mapLink.forEach((button) =>
    button.addEventListener('click', (e) => {
      e.preventDefault();
      modalMap.classList.add('modal-login-show');
      locker.classList.add('lockOn');
    })
  );

  loginButtonClose.addEventListener('click', (e) => {
    e.preventDefault();
    loginModalWindow.classList.remove('modal-login-show');
    loginModalWindow.classList.remove('modal-error');
    locker.classList.remove('lockOn');
  });

  mapButtonClose.addEventListener('click', (e) => {
    e.preventDefault();
    modalMap.classList.remove('modal-login-show');
    locker.classList.remove('lockOn');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const [login, password] = formData.values();

    if (!login || !password) {
      //alert('Поля не заполнены');
      loginModalWindow.classList.remove('modal-error');
      loginModalWindow.offsetWidth = loginModalWindow.offsetWidth;
      loginModalWindow.classList.add('modal-error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('login', login);
        alert('Отправили данные на сервер');
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      if (
        loginModalWindow.classList.contains('modal-login-show') ||
        modalMap.classList.contains('modal-login-show')
      ) {
        e.preventDefault();
        loginModalWindow.classList.remove('modal-login-show');
        loginModalWindow.classList.remove('modal-error');
        modalMap.classList.remove('modal-login-show');
        modalMap.classList.remove('modal-error');
        locker.classList.remove('lockOn');
      }
    }
  });
};

app();
