<template>
  <div class="ver-todos-container">
    <h2>Juegos transmitidos en directo ahora</h2>
    <nuxt-link to="/see_all" class="ver-todos-link">Ver todos</nuxt-link>
  </div>

  <div class="carousel">
    <div class="carousel-wrapper" :style="{ transform: `translateX(-${currentIndex * 100 / visibleItems}%)` }">
      <div v-for="(game, index) in games" :key="index" class="carousel-item_2">
        <img :src="game.image" :alt="game.name" />
        <div class="overlay_3">
          <h3>{{ game.name }}</h3>
            <div class="overlay_info_3">
                <span class="discounted-price_3">{{ game.discountedPrice_3 }}</span>
            </div>
        </div>
      </div>
    </div>
    <button @click="prev" class="carousel-control prev">‹</button>
    <button @click="next" class="carousel-control next">›</button>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      isActive: {
        favorite: false,
        cart: false,
      },

      currentIndex: 0,
      games: [
        {
            image: '/article2_1.svg',
            name: 'Dead by daylight',
            discountedPrice_3: 'nombre_usuario',
          },
        {
            image: '/article2_2.svg',
            name: 'Read Dead Redemption II',
            discountedPrice_3: 'nombre_usuario',
          },
        {
            image: '/article2_3.svg',
            name: 'Soulmask',
            discountedPrice_3: 'nombre_usuario',
          },
        {
            image: '/article2_4.svg',
            name: 'Going medieval',
            discountedPrice_3: 'nombre_usuario',
          },
        {
            image: '/article2_5.svg',
            name: 'Wayfinder',
            discountedPrice_3: 'nombre_usuario',
          },
        {
            image: '/article2_6.svg',
            name: 'The Survivalist',
            discountedPrice_3: 'nombre_usuario',
          },
        {
            image: '/article2_7.svg',
            name: 'Chained Echoes',
            discountedPrice_3: 'nombre_usuario',
          },
        {
            image: '/article2_8.svg',
            name: 'Songs of silence',
            discountedPrice_3: 'nombre_usuario',
          },
      ],
      visibleItems: 4,
    };
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % (this.games.length - this.visibleItems + 1);
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + (this.games.length - this.visibleItems + 1)) % (this.games.length - this.visibleItems + 1);
    },
    toggleActive(icon) {
      this.isActive[icon] = !this.isActive[icon];
    },
  },
};
</script>

<style postcss>
h2 {
  font-family: 'Cairo', sans-serif;
  font-weight: bold;
  font-size: 26px;
}

.ver-todos-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4em;
  margin: 1em 0;
}

.ver-todos-link {
  color: #C714E4;
  text-decoration: none;
  font-family: 'Cairo', sans-serif;
  font-weight: lighter;
  font-size: 18px;
}

.ver-todos-link:hover {
  text-decoration: underline;
}

.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease;
  gap: 20px;
  padding-left: 60px;
  margin-right: 100px;
}

.carousel-item_3 {
  position: relative;
  min-width: 25%;
  box-sizing: border-box;
}

.carousel-item_3 img {
  width: 100%;
  height: auto;
}

.overlay_3 {
  height: 114px;
  background-color: #2B2B2B;
  color: #ffffff;
  padding: 10px;
  border: 2px solid #2B2B2B;
  border-radius: 0 0 40px 40px;
  padding: 12px 12px 12px 24px;
}

.overlay_3 h3 {
  margin: 0;
  font-size: 18px;
}

.overlay_info_3{
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: center;
  margin-top: 16px;
  font-size: 16px;
  gap: 126px;
}

.discounted-price_3 {
  font-family: 'Cairo', sans-serif;
  font-weight: lighter;
  font-size: 22px;
  color: #DEDEDE;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #C714E4;
  border: none;
  font-size: 4rem;
  cursor: pointer;
  z-index: 1000;
  padding: 0 10px;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}
</style>