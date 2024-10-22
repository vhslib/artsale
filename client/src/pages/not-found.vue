<template>
  <div class="wrapper">
    <header>
      <div class="inner">
        <div class="header-row">
          <div class="logo-wrap">
            <Logo />
          </div>
        </div>
      </div>
    </header>

    <main>
      <div class="inner">
        <div class="row">
          <div class="left">
            <img class="img404" src="/assets/img/404.svg" />

            <p>
              К сожалению, такой страницы не существует. <br />
              Вы можете
              <RouterLink :to="{ name: 'Home' }" class="link">
                вернуться на главную
              </RouterLink>
              страницу или&nbsp;другие разделы маркетплейса.
            </p>
          </div>
        </div>
      </div>

      <div class="inner dude-wrap">
        <img class="dude" src="/assets/img/404.png" />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import Logo from '../components/Logo.vue'
import { useTitle } from '../composables/title.js'

useTitle('Страница не найдена')
</script>

<style scoped>
.wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.header-row {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.inner {
    max-width: 1340px;
    padding: 0 20px;
    margin-left: auto;
    margin-right: auto;
    width: 100%
}

.left .link:hover {
    text-decoration: none
}

.left .link {
    color: #fb0f47
}

.row {
    display: flex;
    flex-direction: row
}

header {
    margin-top: 51px;
    padding: 27px 0;
    position: relative;
    z-index: 99;
}

main {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center
}

.left {
    max-width: 430px
}

.left p {
    font-weight: 300;
    font-size: 18px
}

.dude-wrap {
    position: absolute;
    bottom: 0;
    z-index: -1
}

.dude {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 200px);
    -o-object-fit: contain;
    object-fit: contain;
    -o-object-position: bottom right;
    object-position: bottom right
}

.img404 {
    margin-bottom: 25px;
    max-width: 100%
}

@media (max-width:992px) {
    .logo-wrap {
        margin: 0 auto;
    }

    header {
        margin-top: 0
    }

    .left {
        max-width: 100%
    }

    .dude-wrap {
        opacity: .6
    }

    .dude {
        min-height: calc(100vh - 100px)
    }
}
</style>
