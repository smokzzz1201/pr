 const cardButton = document.querySelector("#card-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
cardButton.addEventListener('click', toggleModal);
  close.addEventListener('click', toggleModal ); 

    function toggleModal(){
        modal.classList.toggle('is-open');
    }

    new WOW().init();

    //day 1

    const buttonAuth = document.querySelector("#button-auth");
    const modalAuth = document.querySelector('.modal-auth');
    const closeAuth = document.querySelector('.close-auth');
    const logInForm = document.querySelector('#logInForm');
    const logInInput = document.querySelector('#login');
    const userName = document.querySelector('.user-name');
    const buttonOut = document.querySelector('.button-out');

    let login = localStorage.getItem('gloDelivery');

    function toggleModalAuth(){
        modalAuth.classList.toggle("is-open");
        logInInput.style.borderColor = '';
        if (modalAuth.classList.contains("is-open")) {
        
            disableScroll();
        } else {
            enableScroll();
        }
    }

    function clearForm() {
        logInInput.style.borderColor = '';
        logInForm.reset();
    }


function authorized() {

    function logOut() {
        login = null;
        localStorage.removeItem('gloDelivery', login);
        buttonAuth.style.display = '';
        userName.style.display ='';
        buttonOut.style.display= '';
        buttonOut.removeEventListener('click', logOut);
        checkAuth();
    }

    console.log('авторизован');

    userName.textContent = login;

    buttonAuth.style.display = 'none';
    userName.style.display ='inline';
    buttonOut.style.display= 'block';

    buttonOut.addEventListener('click', logOut)

}

function notAuthorizer() {
    console.log('Не авторизован');
    function logIn(event) {
        event.preventDefault();
        if (logInInput.value.trim()) {
        login = logInInput.value;
        localStorage.setItem('gloDelivery', login)
        toggleModalAuth();
        buttonAuth.removeEventListener('click', toggleModalAuth);
        closeAuth.removeEventListener('click', toggleModalAuth);
        logInForm.removeEventListener('submit', logIn);
        logInForm.reset();
        checkAuth();
    }
    else { 
        logInInput.style.borderColor = '#ff0000';
        logInInput.value = '';
    }
}
    
    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
    modalAuth.addEventListener('click', function(event) {
        if (event.target.classList.contains('is-open')) {
            toggleModalAuth()
        }
    })
}

buttonAuth.addEventListener('click', clearForm);

function checkAuth() {
    if(login) {
        authorized();
    } else {
        notAuthorizer();
    }

}


checkAuth();
    