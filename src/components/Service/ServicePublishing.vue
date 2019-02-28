<template>
  <div class="_Service_Publishing">
    <div class="_Service_Publishing_ServiceType">
      <p class="_Service_Publishing_ServiceType_p">服务类型</p>
      <ul>
        <li><router-link to="/ServicePublishing/HealthService">远程健康服务</router-link></li>
        <li>居家生活服务</li>
        <li>社区驿站服务</li>
        <li>第三方服务</li>
      </ul>
    </div>
    <div class="_Service_Publishing_ServiceList">
      <p class="_Service_Publishing_ServiceList_p">服务列表</p>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  }
}
</script>
<style scoped>
   ._Service_Publishing{
    display: flex;
    margin-top: 15px;
  }
  ._Service_Publishing ._Service_Publishing_ServiceType{
    width: 20%;
  }
  ._Service_Publishing ._Service_Publishing_ServiceType ul{
    border: 1px solid #ccc;
    height: 100%;
  }
  ._Service_Publishing ._Service_Publishing_ServiceType ul li{
    width: 75%;
    border: 1px solid #eee;
    text-align: center;
    line-height: 35px;
    margin: 5% 0 0 12.5%;
  }
  ._Service_Publishing ._Service_Publishing_ServiceType ul li a{
    color: #000;
    text-decoration: none;
  }
  ._Service_Publishing_ServiceType_p{
    text-align: center;
  }
  ._Service_Publishing_ServiceList_p{
    padding-left: 10px;
  }
  ._Service_Publishing ._Service_Publishing_ServiceList{
    width: 77%;
  }
  ._Service_Publishing_ServiceList_p,._Service_Publishing_ServiceType_p{
    border: 1px solid #ccc;
    line-height: 40px;
  }
</style>
