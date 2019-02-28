<template>
  <div class="_commodity_newly_added">
    <div class="_commodity_newly_added_top">
      <el-form>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label="档案编号" prop="read">
          <el-input v-model="addForm.read" auto-complete="off" placeholder="档案编号"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="issue">
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
          <el-input v-model="addForm.issue" auto-complete="off" placeholder="证件号码"></el-input>
          <el-button>读取</el-button>
        </el-form-item>
        <el-form-item label="性别" prop="issue">
          <el-radio v-model="radio" label="1">男</el-radio>
          <el-radio v-model="radio" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" prop="issue">
            <el-input v-model="addForm.issue" auto-complete="off" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="issue">
          <el-cascader
            :options="options"
            v-model="selectedOptions1"
            @change="handleChange1">
          </el-cascader>
          <el-input v-model="addForm.issue" auto-complete="off" placeholder="出生日期"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="issue" class="_identity">
          <el-input v-model="addForm.issue" auto-complete="off" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="家庭座机" prop="issue" class="_address">
          <el-input v-model="addForm.issue" auto-complete="off" placeholder="家庭座机"></el-input>
        </el-form-item>
        <el-form-item label="居住地址" prop="issue" class="_address">
          <el-cascader
            placeholder="请选择"
            :options="options1"
            filterable
          ></el-cascader>
          <el-input v-model="addForm.issue" auto-complete="off" placeholder="详细地址"></el-input>
        </el-form-item>
        <el-form-item label="会员等级" prop="issue" class="_address">
          <el-cascader
            :options="options"
            v-model="selectedOptions2"
            @change="handleChange2">
          </el-cascader>
        </el-form-item>
        <el-form-item label="监护人" prop="issue" class="_address">
          <el-input v-model="addForm.issue" auto-complete="off" placeholder="姓名"></el-input>
          <el-input v-model="addForm.issue" auto-complete="off" placeholder="证件号码"></el-input>
          <el-input v-model="addForm.issue" auto-complete="off" placeholder="关系"></el-input>
          <el-input v-model="addForm.issue" auto-complete="off" placeholder="联系电话"></el-input>
          <el-input v-model="addForm.issue" auto-complete="off" placeholder="家庭住址"></el-input>
          <el-input v-model="addForm.issue" auto-complete="off" placeholder="工作单位"></el-input>
          <el-input v-model="addForm.issue" auto-complete="off" placeholder="工作单位地址"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <div class="item_bock head_p">
          <div class="head_img">
            <img :src="userInfo.avatar"/>
          </div>
          <div class="setting_right" @click.stop="uploadHeadImg">
            <div class="caption">更改头像</div>
          </div>
          <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
        </div>
      </el-form>
    </div>
    <div class="_commodity_newly_added_bottom">
      <el-form>
        <el-form-item label="紧急联系人" prop="name">
          <el-input v-model="addForm.name" auto-complete="off" placeholder="姓名"></el-input>
          <el-input v-model="addForm.name" auto-complete="off" placeholder="证件号码"></el-input>
          <el-input v-model="addForm.name" auto-complete="off" placeholder="关系"></el-input>
          <el-input v-model="addForm.name" auto-complete="off" placeholder="联系电话"></el-input>
          <el-input v-model="addForm.name" auto-complete="off" placeholder="座机号码"></el-input>
          <el-input v-model="addForm.name" auto-complete="off" placeholder="家庭住址"></el-input>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="addForm.name" auto-complete="off" placeholder="请输入名字"></el-input>
        </el-form-item>
      </el-form>
      <div class="_commodity_newly_added_emergency_contact">
        <el-button type="primary" >保存</el-button>
        <router-link to="/commodity"><el-button>取消</el-button></router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      radio: '1',
      addForm:{
        name:'',
        date:'',
        read:'',
        issue:'',
        name1: '',
        desc : ''
      },
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
      selectedOptions1: [],
      selectedOptions2: [],
      selectedOptions3 : [],
      options1: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      value: '',
      userInfo: {
        avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg'
      }
    }
  },
  methods : {
    handleChange(value) {
      console.log(value);
    },
    handleChange1(value) {
      console.log(value);
    },
    handleChange2(value) {
      console.log(value);
    },
    handleChange3(value) {
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
  }
}
</script>
<style scoped>
  ._commodity_newly_added_top{
    border-top: 1px solid #f2f2f2;
    margin-top: 5px;
    display: flex;
  }
  ._commodity_newly_added_top form:nth-child(1) {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
  }
  ._commodity_newly_added_top form:nth-child(2){
    width: 30%;
  }
  ._commodity_newly_added_top form:nth-child(2),._commodity_newly_added_top form:nth-child(1){
    padding-top: 5%;
  }
  ._commodity_newly_added_top form:nth-child(1) .el-form-item{
    width: 50%;
  }
  ._commodity_newly_added_top form:nth-child(1) .el-form-item .el-input{
    width: 60%;
  }
  ._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-child(3),._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-child(6){
    width: 60%;
  }
  ._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-child(3) .el-cascader,._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-child(3) .el-input,._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-child(6) .el-input,._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-child(6) .el-cascader{
    width: 30%;
  }
  ._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-child(9),._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-child(10),._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-last-child(1){
    width: 100%;
  }
  ._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-last-child(1) .el-input{
    width: 16%;
    margin: 0 2% 30px 0;
  }
  .item_bock {
  display: flex;
  align-items: center;
  flex-direction: column;
  /* justify-content: space-between; */
  height:94px;
  width: 300px;
  padding:0px 24px 0px 38px;
  background: #fff;
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
._commodity_newly_added_bottom form{
  display: flex;
  flex-wrap: wrap;
}
._commodity_newly_added_bottom form .el-input,._commodity_newly_added_bottom form .el-select{
  width: 11%;
}
._commodity_newly_added_emergency_contact{
  text-align: center;
}
._commodity_newly_added_emergency_contact button{
  width: 10%;
}
</style>