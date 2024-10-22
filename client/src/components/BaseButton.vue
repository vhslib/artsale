<template>
  <component :is="link ? 'a' : 'button'" class="button" :class="['kind-' + kind, { small }]">
    <slot />
  </component>
</template>

<script lang="ts" setup>
interface Props {
    kind: 'red' | 'gray-border' | 'red-border'
    small?: boolean
    link?: boolean
}

withDefaults(defineProps<Props>(), { small: false, link: false })
</script>

<style scoped>
.button {
    padding: 12px 30px;
    display: inline-block;
    min-width: 105px;
    border: 2px solid;
    transition: all 0.3s;
    cursor: pointer;
    font-weight: 500;
    box-sizing: border-box;
    text-decoration: none;
    font-size: 14px;
    line-height: 20px;
}

.button.kind-red {
    background: #fb0f47;
    border-color: #fb0f47;
    color: white;
}

.button.kind-red:hover {
    background: #d90c3c;
    border-color: #d90c3c;
}

.button.kind-gray-border {
    background: white;
    border-color: #acacb8;
    color: #acacb8;
    border-width: 1px;
}

.button.kind-gray-border:hover {
    background: #acacb8;
    color: white;
}

.button.kind-red-border {
    background: white;
    border-width: 1px;
    border-color: #fb0f47;
    color: #fb0f47;
    padding: 13px 30px;
}

.button.kind-red-border:hover {
    background: #fb0f47;
    color: white;
}

.button.small {
    min-width: initial;
    padding: 7px 11px;
    line-height: 142%;
    font-size: 12px;
}

@media (max-width:991px) {
    .button {
        font-size: 12px;
        padding: 9px 30px;
    }
}
</style>
