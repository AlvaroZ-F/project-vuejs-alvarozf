<template>
  <div id="app" class="container">
    <div id="nav">
      <router-link to="/">Home Tasks</router-link> |
      <router-link to="/time">Time</router-link> |
      <router-link to="/news">News</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">

* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.logo {
  display:block;
  margin: 20px auto;
  height: 75px;
}

</style>
