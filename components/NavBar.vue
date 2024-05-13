<template>
    <nav>
        <ul>
            <li>
                <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/about">About</NuxtLink>
            </li>
        </ul>
        <div class="user" @click="panelActive = !panelActive"><Icon name="noto:alien" size="30px"/></div>
        <div class="panel" v-show="panelActive"></div>
    </nav>
</template>

<script setup>
    import{ref} from "avue"
    const panelActive = ref(false)
</script>

<style lang="postcss">
    nav{
        @apply flex p-2;
        align-items: center;
        color: rgb(43, 43, 43);
    }
    ul{
        @apply flex p-4;
        li{
            @apply p-4;
        }
    }
    .panel{
        background-color: rgb(43, 43, 43);
        width: 300px;
        height: 300px; 
    }
</style>