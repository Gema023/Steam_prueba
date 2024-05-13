<template>
    <article>
        <img :src="article.url" :alt="article.title">
        <button>{{ article.title }}</button>

    </article>
</template>

<script setup>
    const props = defineProps({
        article: {
            type: Object,
            required: false
        }
    });
    const {article} = props;
</script>

<style lang="postcss">
    article{
        @apply w-1/5;
        img{
            @apply h-32;
            object-fit: cover;
        }
        button{
            @apply p-5 bg-gray-200 w-full;
            text-align: center;
        }
    }
    
</style>