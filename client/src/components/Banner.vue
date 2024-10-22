<template>
  <a class="banner" href="javascript:void">
    <span class="title">
      Место под <br />
      ваш рекламный баннер
    </span>
  </a>
</template>

<style scoped>
.banner {
    background: #fff;
    border: 1px solid #1a1a47;
    min-height: 250px;
    color: #1a1a47;
    text-decoration: none;
    position: relative;
    display: flex;
    padding: 40px 30px;
    overflow: hidden
}

.title {
    margin-top: auto;
    position: relative;
    width: 100%;
    font-weight: 500;
    font-size: 18px;
    line-height: 133%;
    z-index: 10
}

.banner::before {
    width: 261px;
    height: 261px;
    background: #1a1a47;
    border-radius: 50%;
    position: absolute;
    right: 0;
    display: block;
    content: "";
    top: 0;
    transition: width .3s, height .3s;
    transform: translateY(-50%) translateX(50%)
}

.banner::after {
    background: url("data:image/svg+xml,%3Csvg width='46' height='49' viewBox='0 0 46 49' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M45 24.5L25.5135 43.8283C22.8206 46.4994 19.1681 48 15.3597 48C7.42906 48 1 41.6231 1 33.7569C1 29.9793 2.51289 26.3565 5.20586 23.6854L25.273 3.78114C27.0683 2.0004 29.5033 1 32.0422 1C37.3293 1 41.6154 5.25125 41.6154 10.4954C41.6154 13.0138 40.6068 15.429 38.8115 17.2097L19.325 36.538C18.4274 37.4284 17.2099 37.9286 15.9404 37.9286C13.2969 37.9286 11.1538 35.8029 11.1538 33.1809C11.1538 31.9217 11.6581 30.7141 12.5558 29.8237L31.4615 11.0714' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E%0A") no-repeat center;
    width: 48px;
    height: 53px;
    position: absolute;
    right: 30px;
    top: 25px;
    display: block;
    content: "";
    transition: transform .3s
}

.banner:hover::before {
    width: 320px;
    height: 320px
}

.banner:hover::after {
    transform: scale(1.3)
}

@media (max-width:992px) {
    .banner {
        align-items: center;
        min-height: initial;
        height: 133px!important;
        max-height: 133px!important
    }

    .title {
        font-size: 14px;
        margin-top: 0
    }

    .banner::before {
        width: 111px;
        height: 111px
    }

    .banner::after {
        width: 18px;
        height: 19px;
        right: 14px;
        top: 14px;
        background-image: url("data:image/svg+xml,%3Csvg width='19' height='20' viewBox='0 0 19 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 10L10.4711 17.4023C9.43068 18.4253 8.01951 19 6.54807 19C3.48396 19 1 16.5578 1 13.5452C1 12.0985 1.58453 10.711 2.62499 9.68803L10.3782 2.06512C11.0719 1.38313 12.0126 1 12.9936 1C15.0363 1 16.6923 2.62814 16.6923 4.63655C16.6923 5.60102 16.3026 6.52599 15.609 7.20798L8.08012 14.6103C7.7333 14.9513 7.26291 15.1429 6.77243 15.1429C5.75106 15.1429 4.92308 14.3288 4.92308 13.3246C4.92308 12.8423 5.11792 12.3799 5.46474 12.0389L12.7692 4.85714' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E%0A")
    }

    .banner:hover::before {
        width: 150px;
        height: 150px
    }
}
</style>
