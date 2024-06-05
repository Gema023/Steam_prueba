<template>
  <div class="carousel_0">
    <div class="carousel-inner_0" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div class="carousel-item_0" v-for="(image, index) in images" :key="index">
        <img :src="image" :alt="`Image ${index + 1}`" />
      </div>
    </div>
    <div class="carousel-controls_0">
      <button @click="prev">‹</button>
      <button @click="next">›</button>
    </div>
    <div class="carousel-indicators_0">
      <span
        v-for="(image, index) in images"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      currentIndex: 0,
      images: [
        '/imagen_1.svg',
        '/imagen_2.svg',
        '/imagen_3.svg'
      ]
    };
  },
  methods: {
    prev() {
      this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
    },
    next() {
      this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : this.currentIndex + 1;
    },
    goToSlide(index) {
      this.currentIndex = index;
    }
  }
};
</script>



<style postcss>
.carousel_0 {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.carousel-inner_0 {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item_0 {
  min-width: 100%;
  box-sizing: border-box;
}

.carousel-item_0 img {
  width: 100%;
  display: block;
}

.carousel-controls_0 {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  color: #C714E4;
  border: none;
  font-size: 4rem;
  cursor: pointer;
  z-index: 1000;
  padding: 0 10px;
}

.carousel-controls_0 button {
  color: #C714E4;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.carousel-controls_0 button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.carousel-indicators_0 {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
}

.carousel-indicators_0 span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #C714E4;
  transition: background 0.3s ease;
}

.carousel-indicators_0 span.active,
.carousel-indicators_0 span:hover {
  background: #c714e4;
}

@media only screen and (max-width: 768px) {
  .carousel-item_0 img {
    max-width: 100%;
  }
}

</style>
