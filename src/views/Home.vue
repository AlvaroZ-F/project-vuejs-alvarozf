<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" class="logo" />
    <TaskManager msg="Task Manager for you!" />
  </div>
</template>

<script>
// @ is an alias to /src
import TaskManager from "@/components/TaskManager.vue";

export default {
  name: "home",
  components: {
    TaskManager,
  }
};
</script>
