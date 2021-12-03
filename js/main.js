    
 
    new WOW().init();

    import Swiper from 'https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js'
    

    //day 1
    const cardButton = document.querySelector("#card-button");
    const modal = document.querySelector(".modal");
    const close = document.querySelector(".close");    
    const buttonAuth = document.querySelector("#button-auth");
    const modalAuth = document.querySelector('.modal-auth');
    const closeAuth = document.querySelector('.close-auth');
    const logInForm = document.querySelector('#logInForm');
    const logInInput = document.querySelector('#login');
    const userName = document.querySelector('.user-name');
    const buttonOut = document.querySelector('.button-out');
    const cardsReust = document.querySelector('.cards-reusts');
    const containerPromo = document.querySelector('.container-promo');
    const restaurants = document.querySelector('.restaurants');
    const menu  = document.querySelector('.menu');
    const logo = document.querySelector('.logo');
    const cardsMenu = document.querySelector('.cards-menu');
    const inputSearch = document.querySelector('.input-search');
    const restaurantTitle = document.querySelector('.restaurant-title');
    const cardInfo = document.querySelector('.card-info');
    const modalBody = document.querySelector('.modal-body');
    const priceTag = document.querySelector('.price-tag');
    const clearCart = document.querySelector('.clear-cart');

    let login = localStorage.getItem('gloDelivery');

    const cart = [];

    const getData = async function(url) {

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Ошибка по адресу ${url},
           статус ошибка ${response.status}!`);
        }
       
       return await response.json()
       
       };

    function toggleModal(){
        modal.classList.toggle('is-open');
    }

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
        cardButton.style.display = '';
        buttonOut.removeEventListener('click', logOut);
        checkAuth();
    }
   
    console.log('авторизован');
  
    userName.textContent = login;

    buttonAuth.style.display = 'none';
    userName.style.display ='inline';
    buttonOut.style.display= 'flex';
    cardButton.style.display = 'flex';
    cardsReust.addEventListener('click', openGoods);
    buttonOut.addEventListener('click', logOut);
    

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
        cardsReust.removeEventListener('click', toggleModalAuth);
        checkAuth();
    }
    else { 
        logInInput.style.borderColor = '#ff0000';
        logInInput.value = '';
    }
}
cardsReust.addEventListener('click', toggleModalAuth);
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

function createCardReust(reust) {

    console.log(reust);

    const { image, kitchen, name, price, products, stars, time_of_delivery: timeOfDelivery } = reust;
    const card = `
    <a class="card cards-reust" data-products="${products}">
		<img src="${image}" alt="image" class="card-image">
		<div class="card-text">
			<div class="card-heading">
				<h3 class="card-title">${name}</h3>
				<span class="card-tag tag">${timeOfDelivery}</span>
			</div>
				<!-- /.card-heading -->
			<div class="card-info">
				<div class="raiting">
					<img src="img/star.svg" alt="star" class="star">
                    ${stars}</div>
				<div class="price">От ${price} ₽</div>
				<div class="category">${kitchen}</div>
			</div>
			<!-- /.card-info -->
		</div>
		<!-- /.card-text -->
	</a>
	<!-- /.card -->
    `;
    
    cardsReust.insertAdjacentHTML('beforeend', card);
}
function createCardGood(gooods) {
console.log(gooods);
const { description, image, name, price, id } = gooods;

    const card = document.createElement('div');
    card.className = 'card';
  
    card.insertAdjacentHTML('beforeend', `
<img src="${image}" alt="image" class="card-image">
<div class="card-text">
  <div class="card-heading">
    <h3 class="card-title">${name}</h3>
    <span class="card-tag tag">45 минут</span>
  </div>
    <!-- /.card-heading -->
  <div class="card-info">
    <div class="raiting">
      <img src="img/star.svg" alt="star" class="star">
      4</div>
    <div class="price card-price"> ${price} ₽</div>
    <div class="category">Пицца</div>
  </div>
  <button class="button button-primary button-add-cart" id="${id}">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
  <!-- /.card-info -->
</div>
<!-- /.card-text -->

<!-- /.card -->
  `);
  
  cardsMenu.insertAdjacentElement('beforeend', card);
    
  }
    
function openGoods(event) {
    const target = event.target;

    const reust = target.closest('.cards-reust');
   
    if(reust) {
        cardsMenu.textContent = '';
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');
        getData(`./db/${reust.dataset.products}`).then(function(data){
            data.forEach(createCardGood)
          });
        
    }
   
}

function addToCart(event) {
    const target = event.target;
    const buttonAddToCart = target.closest('.button-add-cart')
    
    if (buttonAddToCart) {
        const card = target.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        const cost = card.querySelector('.card-price').textContent;
        const id = buttonAddToCart.id;
        console.log(title, cost, id);

        const food = cart.find(function(item) {
            return item.id === id;
        })
        if (food) {
            food.count += 1;
        } else {
            cart.push({
                id,
                title,
                cost,
                count: 1
            });
        }
    }
}

function renderCart() {
modalBody.textContent = '';
cart.forEach(function({id, title, cost, count}) {
    const itemCart = `
    <div class="food-row">
    <span class="food-name">${title}</span>
              <strong class="food-price">${cost}</strong>
              <div class="food-counter">
                  <button class="counter-button  counter-minus" data-id=${id}>-</button>
                  <span class="counter">${count}</span>
                  <button class="counter-button counter-plus" data-id=${id}>+</button>
              </div>
          </div>
    `;

    modalBody.insertAdjacentHTML(`afterbegin`, itemCart)
});

const totalPrice = cart.reduce(function(result, item) {
    return result + (parseFloat(item.cost) * item.count);
}, 0);
priceTag.textContent = totalPrice + ' ₽';
}

function changeCount(event) {
const target = event.target;
if (target.classList.contains('counter-button')) {
    const food = cart.find(function(item) {
        return item.id === target.dataset.id;
    });
   
    if (target.classList.contains('counter-minus')) {
        food.count--;
        if(food.count === 0) {
            cart.splice(cart.indexOf(food), 1);
        }
    };
    if (target.classList.contains('counter-plus'))   { food.count++; }

    renderCart();
}
}
function init(){
    getData('./db/partners.json').then(function(data){
        data.forEach(createCardReust)
      });
    
    cardButton.addEventListener('click',  function() {
       renderCart();
        toggleModal();
    });
  
    modalBody.addEventListener('click', changeCount);
    clearCart.addEventListener('click', function() {
        cart.length = 0;
        renderCart();
    });
    cardsMenu.addEventListener('click', addToCart);
      close.addEventListener('click', toggleModal ); 
    
    logo.addEventListener('click', 
    function() {
      containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');

       
    })
    
    
    new Swiper('.swiper-container', {
        sliderPerView: 1,
        loop: true,
        autoplay: true,
        effect: 'flip',
        grabCursor: true
    });


    inputSearch.addEventListener('keypress', function(event) {

        if (event.charCode === 13) {
            const value = event.target.value.trim();

            if (!value) {
                event.target.style.backgroundColor = '#d53e07';
                event.target.value = '';
                setTimeout(function () {
                    event.target.style.backgroundColor = '';
                }, 1500)
                return;
            }

            getData('./db/partners.json').then(function (data) {
                return data.map(function(partner) {
                    return partner.products;
               
                });   
                    
            })
            .then(function (linksProduct) {
                cardsMenu.textContent = '';
                linksProduct.forEach(function(link){
                    getData(`./db/${link}`)
                    .then(function (data) {
                       const resultSearch = data.filter(function (item) {
                           const name = item.name.toLowerCase();
                        return name.includes(value.toLowerCase());
                       })
                        containerPromo.classList.add('hide');
                        restaurants.classList.add('hide');
                        menu.classList.remove('hide');
                        resultSearch.forEach(createCardGood);
                        restaurantTitle.textContent = 'Результат';
                        cardInfo.textContent = '';
                    })
                })
            })
        }

    })
}
init();