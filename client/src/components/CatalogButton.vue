<template>
  <button :class="{ open }">
    <div>
      <span />
    </div>

    Каталог
  </button>
</template>

<script lang="ts" setup>
interface Props {
    open: boolean
}

defineProps<Props>()
</script>

<style scoped>
button {
    font-size: 14px;
    min-width: 135px;
    font-weight: 400;
    text-align: center;
    background: #fb0f47;
    color: #fff;
    border-radius: 0;
    border: 0 solid;
    padding: 13px 15px;
    cursor: pointer;
}

div {
    width: 11px;
    height: 8px;
    display: inline-block;
    margin-right: 10px;
    position: relative;
    top: -1px;
}

span {
    left: 0;
    top: 50%;
    transition: opacity .3s;
    transform: translateY(-50%);
}

div::before {
    top: 0;
    left: 0;
    content: '';
    display: block;
    transition: all 0.3s;
}

div::after {
    bottom: 0;
    left: 0;
    content: '';
    display: block;
    transition: all 0.3s;
}

button.open div::before {
    transform: rotate(45deg);
    top: 4px;
}

button.open div::after {
    transform: rotate(-45deg);
    bottom: initial;
    top: 4px;
}

span, div::after, div::before {
    border-radius: 1px;
    background: #fff;
    position: absolute;
    height: 1px;
    width: 100%;
}

button.open span {
    opacity: 0;
}
</style>
