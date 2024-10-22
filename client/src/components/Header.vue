<template>
  <header class="header">
    <Logo class="logo" />
    <SearchBar class="search-bar" />
    <ProfileButton class="profile-button" />
  </header>
</template>

<script lang="ts" setup>
import Logo from './Logo.vue'
import ProfileButton from './ProfileButton.vue'
import SearchBar from './SearchBar.vue'
</script>

<style scoped>
.header {
    padding: 27px 30px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

@media (max-width: 992px) {
    .logo {
        margin: 0 auto;
    }

    .header {
        flex-wrap: wrap;
    }

    .profile-button {
        font-size: 0;
        width: 20px;
    }

    .search-bar {
        min-width: 100%;
        margin-top: 14px;
        order: 11;
    }

    .header {
        padding: 27px 20px;
    }
}
</style>
