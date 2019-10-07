<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
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
html body {
  background-color: #f3f4f7;
}
.ql-clipboard{
  display: none;
}
.ql-editor{
  outline: none;
}
</style>
