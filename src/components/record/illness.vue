<template>
  <div class="family">
    <div class="family_box">
      <div class="family_left">
        <ul>
          <li>
            <span>高血压</span>
            <b>有</b>
          </li>
          <li>
            <span>糖尿病</span>
            <b>--</b>
          </li>
          <li>
            <span>冠心病</span>
            <b>--</b>
          </li>
          <li>
            <span>脑血管病</span>
            <b>--</b>
          </li>
          <li>
            <span>其他</span>
            <b>--</b>
          </li>
        </ul>
      </div>
      <div class="family_center">
        <ul>
          <li>
            <span>诊断时间</span>
            <b>2019-08-29</b>
          </li>
          <li>
            <span>诊断时间</span>
            <b>2019-08-29</b>
          </li>
          <li>
            <span>诊断时间</span>
            <b>2019-08-29</b>
          </li>
          <li>
            <span>诊断时间</span>
            <b>2019-08-29</b>
          </li>
          <li>
            <span>诊断时间</span>
            <b>2019-08-29</b>
          </li>
        </ul>
      </div>
      <div class="family_right">
        <ul>
          <li>
            <span>用药与剂量</span>
            <b>--</b>
          </li>
          <li>
            <span>用药与剂量</span>
            <b>--</b>
          </li>
          <li>
            <span>用药与剂量</span>
            <b>--</b>
          </li>
          <li>
            <span>用药与剂量</span>
            <b>--</b>
          </li>
          <li>
            <span>用药与剂量</span>
            <b>--</b>
          </li>
        </ul>
      </div>
    </div>
    <ul class="nav">
      <li>
        <span>其他慢性病</span>
        <b></b>
      </li>
    </ul>
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
}
.family_box{
  display: flex;
}
.family_left, .family_center{
  flex: 3;
  border: 1px solid #E8E8E8;
  border-bottom:0;
}
.family_right{
  border: 1px solid #E8E8E8;
  border-bottom:0;
  flex: 4;
}
.family_left ul li, .family_center ul li, .family_right ul li{
  height: 44px;
  border-bottom: 1px solid #E8E8E8;
  line-height: 44px;
}
.family_left ul li span, .family_center ul li span, .family_right ul li span{
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
.family_left ul li b, .family_center ul li b, .family_right ul li b{
  font-weight: normal;
  padding-left: 12px
}
.family_center{
  border-left: 0;
}
.family_right{
  border-left: 0;
}
.nav{
  height: 44px;
  line-height: 44px;
  border: 1px solid #E8E8E8;
  border-top: 0;
}
.nav li span{
  display: inline-block;
  background: #F9F9F9;
  width: 10%;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #333333;
  letter-spacing: 0.62px;
  border-right: 1px solid #E8E8E8;
}
</style>
