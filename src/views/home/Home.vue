<template>
  <div class="wrapper">
    <static-part />
    <nearby />
  </div>
  <docker />
</template>

<script>
import StaticPart from '@/views/home/StaticPart'
import Nearby from '@/views/home/Nearby'
import Docker from '@/components/Docker'
export default {
  name: 'Home',
  components: {
    StaticPart,
    Nearby,
    Docker,
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem 0.12rem;
  overflow-y: auto;
}
</style>
