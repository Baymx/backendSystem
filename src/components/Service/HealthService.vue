<template>
  <div class="_Health_Service">
    <el-form :inline="true" class="_Service_Publishing_ServiceList_form">
      <div class="_Service_Publishing_ServiceList_form_left">
        <el-form-item prop="date">
          <el-input placeholder="请输入内容查询关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="ReleaseFlag(4)">添加</el-button>
        <el-button type="primary">删除</el-button>
      </el-form-item>
    </el-form>
    <el-table style="100%">
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="order" label="图标"></el-table-column>
      <el-table-column prop="payment" label="名称"></el-table-column>
      <el-table-column prop="payment" label="连接"></el-table-column>
      <el-table-column prop="order" label="发布时间"></el-table-column>
      <el-table-column prop="payment" label="操作">
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-edit" ></el-button>
          <el-button type="danger" size="small" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="_Release_Elastic_frame" v-bind:class="{'_Release_Elastic_frame' :ReleaseTrue,'_Release_Elastic_frame ReleaseFalse' : ReleaseFalse}">
      <div class="_Release_Elastic_frame_flex">
        <div class="_Release_Elastic_frame_top">
          <div class="_Release_Elastic_frame_top_left">
            <el-form>
              <el-form-item label="名称" prop="date">
                <el-input v-model="filters"></el-input>
              </el-form-item>
              <el-form-item label="单位" prop="date">
                <el-cascader
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange">
                </el-cascader>
              </el-form-item>
            </el-form>
            <div>时间<input type="text" value="1"/>小时 费用<input type="text" value="100"/><button>删除</button></div>
          </div>
          <div class="_Release_Elastic_frame_top_right">
            <div class="item_bock head_p">
              <div class="head_img">
                <img :src="userInfo.avatar"/>
              </div>
              <div class="setting_right" @click.stop="uploadHeadImg">
                <div class="caption">更改头像</div>
              </div>
              <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
            </div>
          </div>
        </div>
        <div class="_Release_Elastic_frame_bottom">
          <el-form>
            <el-form-item label="服务介绍" prop="issue">
              <div class='tinymce'>
                <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="_Release_Elastic_frame_button">
          <el-button type="success" @click="ReleaseFlag(1)">保存</el-button>
          <el-button type="success" @click="ReleaseFlag(2)">保存并发布</el-button>
          <el-button type="danger" @click="ReleaseFlag(3)">关闭</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
export default {
  data(){
    return {
      filters:'',
      options: [{
        value : 'zhinan',
        label : '指南'
      },{
        value : 'zujian',
        label : '组件'
      },{
        value : 'ziyuan',
        label : '资源'
      }],
      selectedOptions: [],
      userInfo: {
        avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg'
      },
      tinymceHtml: '请输入内容',
      init: {
        language_url: '/static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/lightgray',
        height: 300,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false
      },
      ReleaseTrue : true,
      ReleaseFalse : false
    }
  },
  methods : {
    handleChange(value) {
      console.log(value);
    },
    // 打开图片上传
    uploadHeadImg: function () {
      this.$el.querySelector('.hiddenInput').click()
    },
    // 将头像显示
    handleFile: function (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.userInfo.avatar = res.result
      }
      reader.readAsDataURL(file)
    },
    ReleaseFlag(id){
      if(id===1){
        this.ReleaseFalse = false
      }else if(id===2){
        this.ReleaseFalse = false
      }else if(id===3){
        this.ReleaseFalse = false
      }else{
        this.ReleaseFalse = true
      }
    }
  },
  mounted () {
    tinymce.init({})
  },
  components: {Editor},
}
</script>
<style scoped>
  ._Service_Publishing_ServiceList_form{
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 0 10px;
  }
  ._Release_Elastic_frame{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color:#000;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: none;
    overflow-y: auto;
  }
  .ReleaseFalse{
    display: block;
  }
  ._Release_Elastic_frame_top{
    display: flex;
    padding: 1% 5% 0 3%;
  }
  ._Release_Elastic_frame_flex{
    width: 60%;
    background-color: #fff;
    margin: 5% auto;
  }
  .item_bock {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding:0px 24px 0px 38px;
  }
  .head_p {
    height:132px;
  }  
  .head_img{
    height: 90px;
  }
  .head_img img{
    width:90px;
    height:90px;
    border-radius:50px
  }
  .setting_right{
    display: flex;
    height: 37px;
    justify-content: flex-end;
    align-items: center;
  }
  .hiddenInput{
    display: none;
  }
  .caption {
    color: #8F8F8F;
    line-height: 35px;
    margin-top: 10px;
    cursor: pointer;
    border: 1px solid skyblue;
    padding: 0px 5px;
  }
  ._Release_Elastic_frame_top_left{
    width: 60%;
  }
  ._Release_Elastic_frame_top_right{
    width: 40%;
    padding-top: 3%;
  }
  ._Release_Elastic_frame_top_left form .el-input,._Release_Elastic_frame_top_left form .el-cascader{
    width: 50%;
  }
  ._Release_Elastic_frame_top_left>div{
    display: flex;
    line-height: 20px;
  }
  ._Release_Elastic_frame_top_left>div input{
    width: 60px;
    height: 20px;
    border: 1px solid #eee;
    text-align: center;
    margin: 0 3%;
  }
  ._Release_Elastic_frame_top_left>div button{
    width: 40px;
    background-color: skyblue;
    color: #fff;
    border:none;
    outline: none;
  }
  ._Release_Elastic_frame_flex ._Release_Elastic_frame_bottom{
    width: 100%;
  }
  ._Release_Elastic_frame_flex ._Release_Elastic_frame_bottom form{
    padding: 3% 3% 0 3%;
  } 
  ._Release_Elastic_frame_flex ._Release_Elastic_frame_bottom form .el-form-item .tinymce{
    width: 85%;
    margin-left: 8%;
  }
  ._Release_Elastic_frame_flex  /deep/ .el-form-item__label{
    width: 9%;
    text-align: left;
  }
  ._Release_Elastic_frame_flex ._Release_Elastic_frame_button{
    text-align: center;
    padding-bottom: 1%;
  }
  /* .mce-notification.mce-has-close .mce-notification-error{
    display: none;
  }
  .mce-notification.mce-has-close /deep/ .mce-notification-inner{
    display: none;
  } */
  /* .mce_widget /deep/ .mce-notification.mce-notification-error .mce-has-close.mce-in{
    display: none;
  } */
  
</style>