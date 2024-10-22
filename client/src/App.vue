<template>
  <Loader />
  <RouterView />
</template>

<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Loader from './components/Loader.vue'
import axios from 'axios'
import { onErrorCaptured } from 'vue'
import { showInfoModal } from './modals/info-modal.js'

if (!import.meta.env.SSR) {
    onErrorCaptured((error) => {
        console.error(error)

        if (axios.isAxiosError(error)) {
            void showInfoModal({ message: 'Произошла ошибка' })
        }

        return false
    })
}
</script>

<style>
@import url('/assets/css/bootstrap.css');

* {
    box-sizing: border-box;
    outline: 0 !important;
}

a,
abbr,
acronym,
address,
applet,
article,
aside,
audio,
b,
big,
blockquote,
canvas,
caption,
center,
cite,
code,
dd,
del,
details,
dfn,
div,
dl,
dt,
em,
embed,
fieldset,
figcaption,
figure,
footer,
form,
h5,
h6,
header,
hgroup,
html,
i,
iframe,
img,
ins,
kbd,
label,
legend,
li,
mark,
menu,
nav,
object,
ol,
output,
p,
pre,
q,
ruby,
s,
samp,
section,
small,
span,
strike,
strong,
sub,
summary,
sup,
table,
tbody,
td,
tfoot,
th,
thead,
time,
tr,
tt,
u,
ul,
var,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
}

body {
    padding: 0;
    border: 0;
    vertical-align: baseline;
    margin: 0;
    line-height: 1;
    font: 14px 'Montserrat';
    letter-spacing: -0.03em;
    color: #1a1a47;
}

h1, h2, h3, h4 {
    padding: 0;
    border: 0;
    vertical-align: baseline;
    font: inherit;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}

html {
    height: 100%;
}

ol, ul {
    list-style: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

h1, h2 {
    font-size: 32px;
    margin: 0 0 34px;
}

@media (max-width: 900px) {
    h1 {
        font-size: 25px;
        margin-bottom: 20px
    }
}

@media (max-width: 700px) {
    h1 {
        font-size: 18px;
        margin-bottom: 20px
    }
}

h2 {
    font-size: 24px;
    margin: 0 0 10px;
}

@media (max-width: 992px) {
    h2 {
        font-size: 18px
    }
}

h3 {
    font-weight: 500;
    font-size: 20px;
    margin: 0 0 17px;
}

h4 {
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin: 0 0 20px;
    color: #1a1a47;
}

button {
    font-family: 'Montserrat';
}

a {
    color: #fb0f47;
}

a:hover {
    text-decoration: none;
}
</style>
