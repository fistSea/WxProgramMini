<template>
  <div
    class="px-4 py-10 text-center font-sans text-gray-700 dark:text-gray-200"
  >
    12312
  </div>
</template>
<script setup>
import { fetchGitHubRepo } from "@/api";

fetchGitHubRepo().then((res) => {
  console.log(res);
});
</script>
<route lang="json">
{
  "style": {
    "navigationStyle": "default",
    "navigationBarTitleText": "Count"
  }
}
</route>
