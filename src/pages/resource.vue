<template>
  <div class="index">
   {{ newsListShow.name }}
  </div>
</template>

<script>
export default {
  name: 'resource',
  data () {
    return {
      newsListShow: [],
    }
  },
  created() {
    this.setNewsApi();
  },
  methods: {
	  setNewsApi: function() {
      this.$api.post('')
      .then(res => {
        var _this = this;
        console.log(res);
        _this.newsListShow = res;
      })     
    },
  }
    
}
</script>

<style scoped>

</style>
