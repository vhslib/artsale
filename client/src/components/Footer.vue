<template>
  <footer class="footer">
    <div class="inner">
      <div class="footer__row">
        <Logo />

        <div class="footer__menu-wrap">
          <div class="links">
            <RouterLink :to="{ name: 'About' }" class="link">
              О компании
            </RouterLink>

            <RouterLink :to="{ name: 'Contacts' }" class="link">
              Контакты
            </RouterLink>

            <RouterLink :to="{ name: 'About' }" class="link">
              Информация
            </RouterLink>

            <RouterLink :to="{ name: 'Contacts' }" class="link">
              Для инвесторов
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="footer__bottom-row">
        <a href="#">Политика конфиденциальности</a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import Logo from './Logo.vue'
</script>

<style scoped>
.footer {
    background: rgba(26, 26, 71, .05);
    color: #121212;
    padding-top: 66px;
    font-size: 12px;
    margin-top: 76px
}

.inner {
    max-width: 1340px;
    padding: 0 20px;
    margin-left: auto;
    margin-right: auto;
}

.footer a {
    color: #121212;
    text-decoration: none;
    transition: color .3s
}

.footer a:hover {
    color: #fb0f47
}

.footer__row {
    display: flex;
    flex-direction: row
}

.footer__menu-wrap {
    max-width: 50%;
    margin-left: auto
}

.links {
    -moz-column-count: 3;
    column-count: 3;
    -moz-column-gap: 70px;
    column-gap: 70px
}

.links .link {
    display: block;
    margin-bottom: 15px
}

.footer__bottom-row {
    display: flex;
    flex-direction: row;
    padding: 35px 0;
    margin-top: 50px;
    align-items: center
}

.footer__bottom-row::before {
    display: block;
    position: absolute;
    height: 1px;
    background: rgba(26, 26, 71, .2);
    content: '';
    left: 0;
    margin-top: -93px;
    width: 100%
}

@media (max-width:992px) {
    .footer__menu-wrap {
        max-width: initial
    }
}

@media (max-width:768px) {
    .footer {
        padding-top: 0
    }
    .footer__bottom-row::before,
    .footer__row {
        display: none
    }
    .footer__bottom-row {
        padding: 25px 0;
        margin-top: 0
    }
}

@media (max-width:500px) {
    .footer__bottom-row {
        flex-direction: column
    }
    .footer__bottom-row > a {
        color: #fb0f47;
        text-decoration: underline
    }
    .footer__bottom-row > a:hover {
        text-decoration: none
    }
}
</style>
