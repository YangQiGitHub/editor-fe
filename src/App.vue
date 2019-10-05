<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    {{globalTest}}
    <div @click="globlaMuTest">sdfsdf</div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      'globlaMuTest'
    ])
  },
  computed: {
    ...mapState([
      'globalTest'
    ])
  }
}
</script>

<style lang="less">

</style>
