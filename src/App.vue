<template>
  <div id="app">
    <h1 class="sketch-title">Sketch</h1>
    <Sketch/>
  </div>
</template>

<script>
import Sketch from './components/Sketch.vue'

export default {
  name: 'app',
  components: {
    Sketch,
  },
}
</script>

<style>
.sketch-title {
  position: absolute;
  z-index: 9;
  width: 100%;
  text-align: center;
  pointer-events: none;
}
</style>
