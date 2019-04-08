<template>
  <div class="medical_box">
    <div class="medical_top"> 
      <header>咨询中</header>
      <ul class="liuyan clearfix">
        <li class="ly_L clearfix">
          <img src="../../assets/user.png" alt="" class="wx_head_l">
          <div class="ly_L_T">
            <P>血压  收缩压  偏高</P>
          </div>
        </li>
        <li class="ly_R clearfix">
          <img src="../../assets/user.png" alt="" class="wx_head_r">
          <div class="ly_R_T">
            <P>注意控制血压</P>
          </div>
        </li>
      </ul>
      <div class="shuru">
        <img src="../../../static/img/tupian1.png" alt="">
          <div class="inputText">
            <!-- <textarea v-bind:maxlength="Surplus" @input="descArea" v-model="inputText" name="abstract" id="abstract" placeholder="咨询内容.."></textarea> -->
            <input type="text" placeholder="咨询内容...">
          </div>
        <button>发送</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      inputText: '',
      Surplus:140,
      introduct:''
    }
  },
  methods:{
    descArea() {
      var textVal = this.introduct.length
      this.Surplus = 200 - textVal
    },
  }
}
</script>
<style scoped>
@import url('../../css/Medical.css');
</style>
