<template>
  <div class="banner">
    <div class="banner-item1">
      <img src="/banner_1.svg" alt="Banner Image 1" />
    </div>
    <div class="banner-item2">
      <img src="/banner_2.svg" alt="Banner Image 2" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        '/banner_1.svg',
        '/banner_2.svg'
      ]
    };
  }
};
</script>

<style postcss>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');

.banner {
  display: flex;
  width: 100%;
  height: 194px;
  gap: 28px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.banner-item {
  flex: 1;
  height: 100%;
}

.banner-item1 img {
  width: 952px;
  height: 100%;
  object-fit: cover;
}

.banner-item2 img {
  width: 541px;
  height: 100%;
  object-fit: cover;
}

@media only screen and (max-width: 768px) {
  .banner {
    flex-direction: column;
    height: auto;
  }

  .banner-item {
    width: 100%;
    margin-bottom: 20px;
  }

  .banner-item1 img {
    width: 100%;
    height: auto;
  }

  .banner-item2 img {
    width: 100%;
    height: auto;
  }
}

</style>
