<template>
  <div class="recommend">
      <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name: 'RecommendView',
    props: {
        recommends: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style>
    .recommend {
        display: flex;
        justify-content: space-around;
        text-align: center;
        padding: 10px 0 20px;
        border-bottom: 10px solid #eee;
    }
    .recommend-item {
        flex: 1;
    }
    .recommend-item img {
        width: 80%;
        padding-bottom: 5px;
    }
</style>