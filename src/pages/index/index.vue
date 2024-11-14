<script lang="ts" setup>
import { fetchGitHubRepo } from "@/api";
import { useQuery } from "@tanstack/vue-query";

// #ifdef MP
const repo = ref("yang1206/uniapp-template");
fetchGitHubRepo().then((res) => {
  console.log(res);
});
// const { data } = useQuery(
//   computed(() => {
//     return {
//       ...fetchGitHubRepo(repo.value),
//     };
//   })
// );
// #endif
</script>

<template>
  <Counter />
</template>

<route lang="json">
{
  "style": {
    "navigationStyle": "default",
    "navigationBarTitleText": "Home"
  }
}
</route>

<style scoped>
.logo {
  width: 100rpx;
  height: 100rpx;
  margin-top: 200rpx;
  margin-bottom: 50rpx;
  text-decoration: none;
}
</style>
