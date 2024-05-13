<template>
    <main>
        <Headerimage :source="'/image1.jpg'"/>
        <div data-aos="fade-up"
            data-aos-duration="2000">
            <section>
                <h1>{{ title }}</h1>
                <p>Juegos</p>
            </section>
            <section class="container cards-section">
                <ArticleCard
                v-for="(article,index) in articles"
                :key="index"
                :article="article"
                />
            </section>
        </div>
    </main>
</template>

<script setup>
    import { ref } from "vue";
    const title = ref('Página de inicio');
    const articles = ref([
        {
            id: 1,
            title: "Artículo 1",
            url: "https://fastly.picsum.photos/id/945/500/200.jpg?hmac=oFOpI3Af3hCz4rDutDUj4av0cDUur5ZPnCJsTgOJ-kc"
        },
        {
            id: 2,
            title: "Artículo 2",
            url: "https://fastly.picsum.photos/id/851/500/200.jpg?hmac=idfq8ep-hvo-kkeHfN83YiziwCeQgKve6k52i2r7C4I"
        },
        {
            id: 3,
            title: "Artículo 3",
            url: "https://fastly.picsum.photos/id/610/500/200.jpg?hmac=qubB6O6C4OveunofKS9_lDhEZ-VW18Vbl9jnjCFDUCE"
        },
        {
            id: 4,
            title: "Artículo 4",
            url: "https://fastly.picsum.photos/id/63/500/200.jpg?hmac=mL1JDDKbE9hR1_5pbgu32crz91HE2CKBFO3RkN2tAxs"
        },
        
    ]);
</script>

<style lang="postcss">
    main{
        padding: 20px;
    }
    h1{
        font-size: 45px;
        font-weight: bold;
        color: rgb(43, 43, 43);
        padding-top: 20px;
        padding-bottom: 20px;
        font-family: Roboto;
    }
    p{
        font-size: 25px;
        color: rgb(43, 43, 43);
        padding-bottom: 15px;
    }
    .cards-section{
        display: flex;
        justify-content: space-between;
    }

</style>