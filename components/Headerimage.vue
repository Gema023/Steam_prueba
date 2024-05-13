<template>
    <img class="imagen_header" :src="source" alt="Imagen header">
</template>

<script setup>
    const props = defineProps({
        source: {
            type: String,
            required: false,
        },
    });
    const { source } = props;
</script>