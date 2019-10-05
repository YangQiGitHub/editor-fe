<template>
  <div class="editor">
    <menu-bar></menu-bar>
    {{a}}
    <div @click="setA">sss</div>
    <page></page>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuBar from '@/components/menu-bar.vue'
import Page from '@/components/page.vue'
import { mapStateEditor, mapMutationsEditor } from '@/store/modules/editor'

export default {
  name: 'editor',
  components: {
    MenuBar,
    Page
  },
  methods: {
    ...mapMutationsEditor([
      'setA'
    ])
  },
  computed: {
    ...mapStateEditor([
      'a'
    ])
  },
  created () {
    console.log('--------------ss-----------')
    // this.axios.get('/test/ab?e=1&e=2').then((response) => {
    //   console.log('success', response)
    // }).catch((response) => {
    //   console.log('error', response)
    // }).finally(() => {
    //   console.log('finally')
    // });

    // this.axios.post('/test/gg', {
    //   firstName: 'Fred',
    //   lastName: 'Flintstone'
    // }).then((response) => {
    //   console.log('success', response)
    // }).catch((response) => {
    //   console.log('fail', response)
    // }).finally(() => {
    //   console.log('error')
    // })
  }
}

</script>
