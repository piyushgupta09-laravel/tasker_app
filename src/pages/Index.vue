<template>
  <q-page>
    <div class="q-gutter-md">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        navigation
        padding
        arrows
        :fullscreen.sync="fullscreen"
        control-color="white"
        class="bg-blue text-white"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="style" size="56px" />
          <div class="q-mt-md text-center">
            <p>{{ lorem }}</p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            <p>{{ lorem }}</p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" size="56px" />
          <div class="q-mt-md text-center">
            <p>{{ lorem }}</p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-img class="center" src="~assets/app_logo.png" width="150px" height="150px" />
          <div class="text-center">
            <q-btn class="q-mt-xl text-blue text-weight-bold" color="white" label="Get Started" to="/login" />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      slide: 'style',
      fullscreen: true,
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  }
}
</script>

<style scoped>
.q-page {
  text-align: center;
  width: 100%;
}
p {
  font-size: 1.2rem;
  line-height: 1.6rem;
  font-weight: 700;
  font-family: 'Quattrocento Sans', sans-serif;
}
.q-img {
  filter: contrast(200%) brightness(150%) grayscale(50%);
}
</style>
