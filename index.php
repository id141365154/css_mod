<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>VivaTao Bike</title>
</head>


<body>
  <header class="css_mod__page-header">
    <div class="page-header__wrapper">
      <img class="page-header__logo" src="img/logo.png" alt="VavaTao Bike">
      <button class="page-header__menu" type="button">Меню</button>
      <p class="page-header__sale">Распродажа (скидки до 90%)</p>
      <div class="page-header__city">
        <p>Мой город:</p>
        <button type="button">Нижний Новгород</button>
      </div>
    </div>
  </header>

  <main class="css_mod__page-main">
    <div class="page-main__wrapper">
      <h1 class="visually-hidden">Велосипеды на все случаи жизни</h1>
      <section class="css_mod__profile">
        <h2 class="visually-hidden">Личный кабинет</h2>
        <div class="profile__city">
          <p>Мой город:</p>
          <button type="button">Нижний Новгород</button>
        </div>
        <div class="profile__name">
          <img src="img/profile.png" alt="profile photo">
          <div class="profile__help">
            <p>Имя пользователя</p>
            <button type="button">Выход</button>
          </div>
        </div>
        <div class="profile__basket">
          <a href="#">5 товаров,</a>
          <p>на сумму 123 330₽</p>
        </div>
      </section>
      <section class="css_mod__communication">
        <h2 class="visually-hidden">Заказ велосипеда</h2>
        <p class="communication__delivery">Бесплатная доставка | 60 дней на возврат</p>
        <div class="communication__telephone">
          <a href="tel:+78002000600">8 800 2000 600</a>
          <p>Бесплатный звонок по РФ</p>
        </div>
        <button class="communication__button">Заказть звонок</button>
        <form class="communication__search" method="get">
          <input placeholder="Пример поиска: Велобат 2015">
          <button type="submit">Найти</button>
        </form>
      </section>
      <section class="css_mod__bike">
        <h2 class="visually-hidden">Выбрать велосипед</h2>
        <div class="bike__item">
          <picture>
            <source media="(min-width: 750px)" srcset="img/photo1_750.jpg">
            <img src="img/photo1_320.jpg" alt="city bike">
          </picture>
          <a href="#">Городские</a>
        </div>
        <div class="bike__item">
          <picture>
            <source media="(min-width: 750px)" srcset="img/photo2_750.jpg">
            <img src="img/photo2_320.jpg" alt="mountain bike">
          </picture>
          <a href="#">Горные / Универсальные</a>
        </div>
        <div class="bike__item">
          <picture>
            <source media="(min-width: 750px)" srcset="img/photo3_750.jpg">
            <img src="img/photo3_320.jpg" alt="highway bike">
          </picture>
          <a href="#">Шоссейные / триатлон</a>
        </div>
        <div class="bike__item">
          <picture>
            <source media="(min-width: 750px)" srcset="img/photo4_750.jpg">
            <img src="img/photo4_320.jpg" alt="bmx">
          </picture>
          <a href="#">Экстрим (BMX)</a>
        </div>
        <a class="bike__help-me" href="#">Я не понимаю что мне выбрать, посоветуйте!</a>
      </section>
    </div>
  </main>

	 <script defer src="assets/js/CSS_MOD.js"></script>
</body>

</html>
