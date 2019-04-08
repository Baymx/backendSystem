<template>
  <div class="family">
    <div class="family_left">
      <ul>
        <li>
          <span>厨房排风设施</span>
          <b>油烟机</b>
        </li>
        <li>
          <span>饮水</span>
          <b>矿泉水</b>
        </li>
        <li>
          <span>禽兽栏</span>
          <b>无</b>
        </li>
      </ul>
    </div>
    <div class="family_right">
      <ul>
        <li>
          <span>燃料类型</span>
          <b>天然气</b>
        </li>
        <li>
          <span>厕所</span>
          <b>卫生厕所</b>
        </li>
        <li>
          <span>是否老化改造</span>
          <b>是</b>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
.family{
  width: 95%;
  margin-left: 2.5%;
  background: #fff;
  display: flex;
}
.family .family_left,.family .family_right{
  flex: 1;
  border: 1px solid #E8E8E8;
  border-bottom:0;
}
.family .family_left ul li,.family .family_right ul li{
  height: 44px;
  border-bottom: 1px solid #E8E8E8;
  line-height: 44px;
}
.family .family_left ul li span, .family .family_right ul li span{
  display: inline-block;
  background: #F9F9F9;
  width: 25%;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #333333;
  letter-spacing: 0.62px;
  border-right: 1px solid #E8E8E8;
}
.family .family_left ul li b, .family .family_right ul li b{
  font-weight: normal;
  padding-left: 12px
}
.family .family_right{
  border-left: 0;
}
</style>
