<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  
}
</script>

<style lang="less">
@import "./assets/css/style.css";
body {
  margin: 0;
  padding: 0;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  overflow: scroll;
  overflow-y: hidden;
}

#app {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;

}

.el-submenu [class^=fa] {
  vertical-align: baseline;
  margin-right: 10px;
}

.el-menu-item [class^=fa] {
  vertical-align: baseline;
  margin-right: 10px;
}

.toolbar {
  background: #f2f2f2;
  padding: 10px;
  margin: 10px 0;
  .el-form-item {
      margin-bottom: 10px;
  }
}

</style>
