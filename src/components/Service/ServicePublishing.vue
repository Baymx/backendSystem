<template>
  <div class="_Health_Service">
    <el-row class="toolbar" style="padding-bottom:0px">
      <el-form :inline="true" class="_Health_Service_form">
        <div class="_Health_Service_form_left">
          <el-form-item>
            <el-input v-model="content.filter" placeholder="请输入名称查询"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="state" placeholder="服务类型" style="width:130px;">
              <el-option style="height:45px;" v-for="item in selectedOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button click="primary" type="primary" @click="srarch">查询</el-button>
          </el-form-item>
        </div>
        <div class="_Health_Service_right">
          <el-form-item style="float:right;">
            <el-button-group>
              <el-button type="primary" @click="addFormVisible = true">+添加</el-button>
            </el-button-group>
          </el-form-item>
        </div>
      </el-form>
    </el-row>
    <el-table style="100%" :data="tableData">
      <el-table-column fixed type="index" label="序号" :index="roleIndexMethod"></el-table-column>
      <el-table-column prop="StationName" label="驿站名称" width="140"></el-table-column>
      <el-table-column prop="" label="服务类型" width="140"></el-table-column>      
      <el-table-column prop="GoodsName" label="服务名称" width="140"></el-table-column>
      <el-table-column prop="Sales" label="销量" width="140"></el-table-column>
      <el-table-column prop="Comments" label="评论量" width="140"></el-table-column>
      <el-table-column prop="IsLaunched" label="是否上架" width="140">
        <template slot-scope="scope">
          <span> {{ scope.row.IsLaunched == false ? "未上架" : "已上架" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="IconUrl" label="服务图标" width="160">
        <template slot-scope="scope">
          <img :src="scope.row.IconUrl" style="width:50px;height:50px" :onerror="defaultImg"/>
          <!-- <img src="/logo.png" :onerror="defaultImg" @click="getImg()"> -->
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="small" v-if="scope.row.IsLaunched" @click="ObtainedfData(scope.$index, scope.row)">下架</el-button>
          <el-button type="danger" size="small" v-if="!scope.row.IsLaunched" @click="ShelfData(scope.$index, scope.row)">上架</el-button>
          <el-button size="small" @click="EditData(scope.$index, scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteData(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total='totalItems'>
    </el-pagination>
    <!-- 添加页面 -->
    <div class="_Release_Elastic_frame" v-if="addFormVisible" v-bind:class="{'_Release_Elastic_frame' :ReleaseTrue,'_Release_Elastic_frame ReleaseFalse' : addFormVisible}">
      <div class="_Release_Elastic_frame_flex">
        <p class="el-dialog__header">
          <span>新增</span>
        </p>
        <div class="_Release_Elastic_frame_top">
          <div class="_Release_Elastic_frame_top_left">
            <el-form :model="addForm" label-width="130px" ref="addForm">
              <el-form-item label="所属机构" prop="CompanyId" :rules="[{ required: true, message: '机构名称不能为空'}]">
                <el-select v-model="addForm.CompanyId" style="width:100%;" placeholder="请选择所属机构" @change="selectCompany">
                  <el-option v-for="item in companyOpption" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属驿站" prop="StationId" :rules="[{ required: true, message: '驿站名称不能为空'}]">
                <el-select v-model="addForm.StationId" style="width:100%" placeholder="请选择所属驿站" @change="companyChange">
                  <el-option v-for="item in stationOpption" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="自定义服务类型" prop="CustomCategoryId" :rules="[{ required: true, message: '请选择自定义服务类型'}]">
                <el-select v-model="addForm.CustomCategoryId" style="width:100%" placeholder="请选择">
                  <el-option v-for="item in selectedOption" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="服务类型" prop="Category1_Id" :rules="[{ required: true, message: '请选择服务类型'}]">
                <el-select v-model="addForm.Category1_Id" style="width:100%" placeholder="请选择">
                  <el-option v-for="item in selected" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="_Release_Elastic_frame_top_right">
            <div class="item_bock head_p">
              <div class="show-img" v-if="addForm.IconUrl" style="position: relative;z-index:999" >
                <img :src="addForm.IconUrl" class="avatar" style="width:80px;height:80px;position: absolute;top:2px;right:-40px;border-radius:2px">
                <i class="el-icon-error uploader-delete"  @click="addFormDelImg" style="position: absolute;top: 0;left:29px;"></i>
              </div>
              <div class="head_img">
                <i class="el-icon-plus avatar-uploader-icon"></i>
                <p>上传logo</p>
              </div>
              <div class="setting_right">
                <el-upload
                  class="upload-demo"
                  action="http://210.76.124.110:86/api/v1/file/push"
                  :show-file-list="false"
                  :http-request="addUploadFile"
                  >
                  <el-button size="small" type="primary">本地上传</el-button>
                  <el-button @click="btnClick">系统上传</el-button>
                </el-upload>
                <!-- <button @click="btnClick">系统上传</button> -->
              </div>
              <!-- <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/> -->
            </div>
          </div>
          <div class="_Release_Elastic_frame_top_bottom">
            <el-form :model="addForm" label-width="130px" ref="addForm">
              <el-form-item label="服务名称" prop="Name" style="width:335px;" :rules="[{ required: true, message: '请输入服务名称'}]">
                <el-input v-model="addForm.Name" auto-complete="off"></el-input>
              </el-form-item>
              <div class="_from_time" v-for="(item,index) in addForm.SkuList" :key="index">
                <el-form-item label="服务单位" prop="OptionId">
                  <el-select v-model="item.OptionId">
                    <el-option v-for="sub in serviceList" :key="sub.label" :label="sub.label" :value="sub.value"></el-option>
                  </el-select>
                </el-form-item>
                <div>服务时间<input type="text" v-model="item.Count" /> 服务费用<input type="text" v-model="item.MarketPrice" />
                  <button @click="delService">删除</button>
                </div>
                <div class="ServicePublishing_button">
                  <span @click=addService>添加</span>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div class="_Release_Elastic_frame_bottom">
          <el-form>
            <el-form-item label="服务介绍">
              <div class='tinymce'>
                <editor v-model='addForm.DescDetail' :init='init'></editor>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="_Release_Elastic_frame_button">
          <el-button type="success" @click.native="addSubmit('addForm',false)" :loading="addLoading" v-model="addFormVisible">保存</el-button>
          <el-button type="success" @click.native="addSubmit('addForm',trues)">保存并发布</el-button>
          <el-button type="danger" @click.native="flagClick">关闭</el-button>
        </div>
      </div>
    </div>
    <!-- 编辑页面 -->
    <div class="_Release_Elastic_frame" v-if="editFormVisible" v-bind:class="{'_Release_Elastic_frame' :ReleaseTrue,'_Release_Elastic_frame ReleaseFalse' : editFormVisible}" :before-close="editClose">
      <div class="_Release_Elastic_frame_flex">
        <p class="el-dialog__header">
          <span>编辑</span>
        </p>
        <div class="_Release_Elastic_frame_top">
            <div class="_Release_Elastic_frame_top_left">
              <el-form :model="editForm" label-width="130px" ref="editForm">
                <el-form-item label="所属机构" prop="CompanyId">
                  <el-select v-model="editForm.CompanyId" style="width:100%" placeholder="请选择所属机构" @change="selectCompany">
                    <el-option v-for="item in companyOpption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属驿站" prop="StationName">
                  <el-select v-model="editForm.StationName" style="width:100%" placeholder="请选择所属驿站" @change="companyChange">
                    <el-option v-for="item in stationOpption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="自定义服务类型" prop="CustomCategoryId">
                  <el-select v-model="editForm.CustomCategoryId" style="width:100%" placeholder="请选择">
                    <el-option v-for="item in selectedOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="服务类型" prop="Category1_Id">
                  <el-select v-model="editForm.Category1_Id" style="width:100%" placeholder="请选择">
                    <el-option v-for="item in selected" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div class="_Release_Elastic_frame_top_right">
              <div class="item_bock head_p">
                <div class="show-img" v-if="editForm.IconUrl" style="position: relative;">
                  <img :src="editForm.IconUrl" class="avatar" style="width:70px;height:70px">
                  <i class="el-icon-error uploader-delete" @click="editFormDelImg" style="position: absolute;top: 0;right: 0;"></i>
                </div>
                <div v-else class="head_img">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                  <p>上传logo</p>
                </div>
                <div class="setting_right">
                  <el-upload class="upload-demo" action="http://210.76.124.110:86/api/v1/file/push" :show-file-list="false" :http-request="editUploadFile">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <button @click="btnClick">系统上传</button>
                  </el-upload>
                  <!-- <button @click="btnClick">系统上传</button> -->
                </div>
                  <!-- <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/> -->
              </div>
            </div>
            <div class="_Release_Elastic_frame_top_bottom">
              <el-form :model="editForm" label-width="130px" ref="editForm">
                <el-form-item label="服务名称" prop="GoodsName" style="width:335px;">
                  <el-input v-model="editForm.GoodsName" auto-complete="off"></el-input>
                </el-form-item>
                <!--<div>
                  <el-button type="primary" @click="editService">添加服务单位</el-button>
                </div>-->
                <div class="_from_time" v-for="(item,index) in editForm.SkuList" :key="index">
                  <!-- <el-form-item label="服务单位">
                    <el-select v-model="editForm.unitsname" placeholder="请选择" @change="serveChange">
                      <el-option v-for="item in units" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item> -->
                  <el-form-item label="服务单位">
                    <!-- <el-button>{{OptionName}}</el-button> -->
                    <el-button size="small" @click="chooseServiceUnits(index)">选择服务单位</el-button>
                    <el-dialog title="服务单位" :visible.sync="dialogFormVisible" :modal-append-to-body="false" style="width:50%;margin-left:20%;">
                      <el-form-item prop="OptionId">
                         <el-select v-model="bindOptionId" placeholder="请选择" @change="serveChange">
                          <el-option v-for="opItem in units" :key="opItem.value" :label="opItem.label" :value="opItem.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="confimChooseUnit">确 定</el-button>
                      </span>
                    </el-dialog>
                    <!-- <el-select v-model="editSkuOptionId['OptionId' + (index + 1)]" placeholder="请选择"  @change="serveChange($event,index)">
                      <el-option  v-for="opItem in units" :key="opItem.value" :label="opItem.label" :value="opItem.value">
                      </el-option>
                    </el-select> -->
                  </el-form-item>
                  <div>
                    服务时间<input type="text" v-model="item['Count' + (index + 1)]" />
                    服务费用<input type="text" v-model="item['MarketPrice' + (index + 1)]" />
                      <button class="button" @click="editdelService">删除</button>
                  </div>
                  <div class="ServicePublishing_button">
                      <span @click=editService>添加</span>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
          <div class="_Release_Elastic_frame_bottom">
            <el-form>
              <el-form-item label="服务介绍">
                <div class='tinymce'>
                  <editor v-model='editForm.DescDetail' :init='init'></editor>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="_Release_Elastic_frame_button">
            <el-button type="success" @click.native="editSubmit('editForm',false)"  v-model="editFormVisible">保存</el-button>
            <el-button type="danger" @click.native="editClose">关闭</el-button>
          </div>
      </div>
    </div>
    <div class="popContainer" v-show="maskShow" @click.self="btnClick">
      <div class="dialog">
        <p>系统LOGO</p>
        <div class="dialog_img">
          <ul>
            <li><img src="../../img/daiban.png" alt=""></li>
            <li><img src="../../img/falvzixun.png" alt=""></li>
            <li><img src="../../img/huodongyuyue.png" alt=""></li>
            <li><img src="../../img/jiankanghuli.png" alt=""></li>
            <li><img src="../../img/jiatingyisheng.png" alt=""></li>
            <li><img src="../../img/jiazhengfuwu .png" alt=""></li>
            <li><img src="../../img/jinronglicai.png" alt=""></li>
            <li><img src="../../img/jishidingwei.png" alt=""></li>
            <li><img src="../../img/jujiahuli.png" alt=""></li>
            <li><img src="../../img/kangfuliliao.png" alt=""></li>
            <li><img src="../../img/laoniancan.png" alt=""></li>
            <li><img src="../../img/rijianzhaogu.png" alt=""></li>
            <li><img src="../../img/tijian.png" alt=""></li>
            <li><img src="../../img/yanglaobaoxian.png" alt=""></li>
            <li><img src="../../img/zhinengwenzhne.png" alt=""></li>
          </ul>
        </div>
        <div class="dialog_bottom">
          <button>确认</button>
          <button>取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
export default {
  data() {
    return {
      defaultImg:'this.src="' + require('../../assets/logo.png') + '"',
      dialogFormVisible:false,
      formLabelWidth:'120px',
      //查询
      content:{
        filter:''
      },
      testmodel:"",
      state: "",
      tableData: [], //表格数据
      totalItems: 0, //列表条数
      currentPage: 1, //初始页
      pageSize: 5, //页数大小
      maskShow: false,
      selectedOptions: [],
      // userInfo: {
      //   avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg'
      // },
      // tinymceHtml: '请输入内容',
      init: {
        language_url: '/static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/lightgray',
        height: 300,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false,
        images_upload_handler: (blobInfo, success, failure) => {
          this.handleImgUpload(blobInfo, success, failure);
        }
      },
      ReleaseTrue: true,
      ReleaseFalse: false,
      //新增页面
      addFormVisible: false,
      addLoading: false,
      addForm: {
        CompanyId: "", //(integer, optional): 所属机构id
        StationId: "",
        Name: "", // 服务名称
        CustomCategoryId: null, // 自定义服务类型id
        Category1_Id: null, // 服务类型
        DescDetail: "请输入内容", // 详细介绍
        IconUrl: "", // 服务图标
        ImageUrls: [],
        SkuList: [
          {
            SkuId: "",
            OptionId: "",
            Count: "",
            MarketPrice: ""
          }
        ],
        MerchantId: "" //商户Id
      },
      //编辑页面
      editFormVisible:false,
      editSkuOptionId:{},
      editForm:{
        CompanyId: "", //(integer, optional): 所属机构id
        StationId: "",
        Name: "", // 服务名称
        CustomCategoryId: null, // 自定义服务类型id
        Category1_Id: null, // 服务类型
        DescDetail: "请输入内容", // 详细介绍
        IconUrl: "", // 服务图标
        ImageUrls: [],
        SkuList: [
          {
            SkuId: "",
            OptionId: "",
            Count: "",
            MarketPrice: ""
          }
        ],
        MerchantId: "", //商户Id
        unitsname:'', //服务单位
      },
      serviceList: [],
      //机构列表
      companyOpption: [],
      //驿站列表
      stationOpption: [],
      //服务类型
      selectedOption: [],
      selected:[],
      //用户id
      accountId: "",
     
      units:[],
      unitsId: [],
      
      productType: [],
      // 编辑服务单位使用
      bindOptionId: '',
      currentIndex: '',
      // OptionName: ''
    };
  },
  components: { Editor },
  created(){
    this.getUnits()
  },
  mounted() {
    tinymce.init({})
    const role = sessionStorage.getItem("role");
    // console.log(role)
    if (role) {
      const accountId = JSON.parse(role).AccountId;
      this.accountId = accountId;
    }
    this.const();
    this.getListnumber();
    
    this.getProductType()
  },
  methods: {
    confimChooseUnit: function() {
      // 显示
      // this.OptionName = '次'
      // 赋值
      var currentRow = this.editForm.SkuList[this.currentIndex]
      var key = 'OptionId' + (this.currentIndex + 1)
      currentRow[key] = this.bindOptionId
      debugger
      this.dialogFormVisible = false
    },
    chooseServiceUnits: function(index) {
      // 显示
      // this.OptionName = '年'
      // 赋值
      this.currentIndex = index
      var currentRow = this.editForm.SkuList[index]
      var key = 'OptionId' + (index + 1)
      var optionId = currentRow[key]
      this.bindOptionId = optionId
      this.dialogFormVisible = true
    },
    getProductType: function() {

    },
    handleImgUpload(blobInfo, success, failure) {
      let formdata = new FormData();
      console.log(blobInfo)
      formdata.append("accountId", this.accountId);
      formdata.append("extension", blobInfo.filename());
      formdata.append("file", blobInfo.blob());
      this.$http.post(`/api/v1/file/push`, formdata).then(res => {
        success(res.data.Obj[0])
      });
    },
    btnClick() {
      this.maskShow = !this.maskShow;
    },
    //分页
    //handleSizeChange 列表一页的数量进行改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getListnumber();
    },
    //handleCurrentChange 列表页数进行改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListnumber();
    },
    //常量
    const() {
      // 商品类型
      var this_ = this
      this.$http.get(`/api/v1/goodscategory`, {
          parentId: 2
          }).then(function(res) {
              res.data.Obj.map(function(item) {
                  this_.productType.push({
                      value: item.Id,
                      label: item.Name
                  });
              });
          });
      //机构
      this.$http.get(`/api/v1/staff/${this.accountId}/company`)
      .then(res => {
        res.data.Obj.map(item => {
          this.companyOpption.push({
            value: item.Id,
            label: item.Name
          });
        });
      });
      console.log(this.companyOpption);
      //驿站
      // this.$http.get(`/api/v1/user/${this.accountId}/station`)
      // .then(res => {
      //   res.data.Obj.map(item => {
      //     this.stationOpption.push({
      //       value: item.Id,
      //       label: item.Name
      //     });
      //   });
      //   console.log(this.stationOpption);
      // });
      //服务类型自定义
      this.$http.get(`/api/v1/merchantcustomcategory/selected?accountId=${this.accountId}`)
      .then(res => {
        res.data.Obj.map(item => {
          this.selectedOption.push({
            value: item.Id,
            label: item.Name
          });
        });
        console.log(this.selectedOption);
      });
      //服务类型
      this.$http.get(`/api/v1/goodscategory?parentId=2`)
      .then(res=>{
        console.log(res)
         res.data.Obj.map(item => {
          this.selected.push({
            value: item.Id,
            label: item.Name
          });
        });
        console.log(this.selected)
      })
      //服务单位
      // this.$http.get(`/api/v1/goodsspecoption/server/page?page=${this.currentPage}&row=${this.pageSize}&accountId=${this.accountId}`)
      // .then(res=>{
      //   console.log(res)
      //   res.data.Obj.map(item=>{
      //     this.units.push({
      //       value:item.Id,
      //       label: item.Value
      //     })
      //   })
      //   console.log(this.units)
      // })
    },
    //服务单位数量
    getUnits(){
      const role = sessionStorage.getItem("role");
      if (role) {
        const accountId = JSON.parse(role).AccountId;
        this.accountId = accountId;
        this.$http.get(`/api/v1/goodsspecoption/server/count?accountId=${this.accountId}`)
        .then(res=>{
          console.log(res)
          this.$http.get(`/api/v1/goodsspecoption/server/page?page=${this.currentPage}&row=${this.pageSize}&accountId=${this.accountId}`)
          .then(res =>{
            console.log(res)
             res.data.Obj.map(item=>{
              this.unitsId.push(item.Id)
              this.units.push({
                value: item.Id,
                label: item.Value
              })
            })
          })
        })
      }
    },
    serveChange(e,index){
      // var currIndex = 0
      // this.editSkuOptionId['OptionId' +(index + 1)] = e
      // this.editForm.SkuList.forEach(function(sku){
      //   if(currIndex === index)
      //   sku['OptionId' +(index + 1)] = e
      // })
      // console.log(this.editSkuOptionId)
      this.OptionId = e
      console.log(this.OptionId)
    },
    companyChange(val) {
      // console.log(val)
      this.$http.get(`/api/v1/merchant/station?stationId=${val}`)
      .then(res => {
        console.log(res);
        this.addForm.MerchantId = res.data.Obj;
        this.$http.get(`/api/v1/goodsspecoption/server?merchantId=${this.addForm.MerchantId}`)
        .then(res => {
          res.data.Obj.forEach(item => {
            this.serviceList.push({
              value: item.Id,
              label: item.Value
            });
          });
          console.log(res);
        });
      });
    },
    //列表数量
    getListnumber() {
      const role = sessionStorage.getItem("role");
      if (role) {
        const accountId = JSON.parse(role).AccountId;
        this.accountId = accountId;
        const category1 = 2;
        this.$http.get(`/api/v1/goods/manage/count?accountId=${this.accountId}&category1=${category1}`)
        .then(res => {
          this.totalItems = res.data.Obj;
          this.getListData();
          console.log(res);
        });
      }
    },
    //列表信息
    getListData() {
      const role = sessionStorage.getItem("role");
      if (role) {
        const accountId = JSON.parse(role).AccountId;
        this.accountId = accountId;
        const category1 = 2;
        this.$http.get(`/api/v1/goods/manage?page=${this.currentPage}&row=${this.pageSize}&accountId=${this.accountId}&saleSort=true&comSort=true&category1=2`)
        .then(res => {
          console.log(res);
          this.tableData = res.data.Obj || [];
        });
      }
    },
    //查询数量
    getnumber(){
      const role = sessionStorage.getItem("role");
      if (role) {
        const accountId = JSON.parse(role).AccountId;
        this.accountId = accountId;
        const category1 = 2;
        const filter = this.content.filter
        this.$http.get(`/api/v1/goods/manage/count?accountId=${this.accountId}&category1=2&filter=${filter}`)
        .then(res=>{
          console.log(res.data.Obj)
          this.totalItems = res.data.Obj
        })
      }
    },
    //查询
    srarch() {
      const role = sessionStorage.getItem('role')
      if(role) {
        const accountId = JSON.parse(role).AccountId;
        this.accountId = accountId;
        const category1 = 2;
        const filter = this.content.filter
        this.$http.get(`/api/v1/goods/manage?page=${this.currentPage}&row=${this.pageSize}&accountId=${this.accountId}&saleSort=true&comSort=true&category1=2&filter=${filter}`)
        .then(res=>{
          this.tableData = res.data.Obj || []
          this.currentPage = 1;
          this.getnumber()
        })
      }
    },
    //新增
    flagClick() {
      this.addFormVisible = false;
      this.addForm = {
        CompanyId: "", //(integer, optional): 所属机构id
        StationId: "",
        Name: "", // 服务名称
        CustomCategoryId: null, // 自定义服务类型id
        Category_Id: null, // 服务类型
        DescDetail: "请输入内容", // 详细介绍
        IconUrl: "", // 服务图标
        ImageUrls: [],
        SkuList: [],
        MerchantId: "" //商户Id
      };
    },
    //addSubmit 新增
    addSubmit(formName, flag) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post(`/api/v1/goodsserver`, this.addForm)
          .then(res => {
            console.log(res);
            this.getListnumber();
            this.flagClick();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * addService 添加服务
     */
    addService() {
      this.addForm.SkuList.push({
        SkuId: "",
        OptionId: "",
        Count: "",
        MarketPrice: ""
      });
    },
    /**
     * addUploadFile 新增上传文件
     * @param params 改变的数量
     */
    addUploadFile(params) {
      const _file = params.file;
      var formData = new FormData();
      let fileName = _file.name.split(",");
      formData.append("file", _file);
      formData.append("accountId", this.accountId);
      formData.append("extension", fileName[fileName.length - 1]);
      return this.$http.post(`/api/v1/file/push`, formData).then(res => {
        this.addForm.IconUrl = res.data.Obj[0];
      });
    },
    /**
     * addFormDelImg 修改头像
     */
    addFormDelImg() {
      this.addForm.IconUrl = "";
    },
    //编辑
    EditData(index, row){
      var this_ = this
      this.$http.get(`/api/v1/goods/info?id=${row.GoodsId}`)
      .then(res => {
        this.editFormVisible = true
        this.editForm = Object.assign({}, row, res.data.Obj)
        this_.editForm.SkuList = []
        // 处理服务单位
          var data = res.data.Obj
          this_.editForm.Name = data.GoodsName
          this_.editForm.ImageUrls = data.Urls
          var cId = data.Category1_Id
          if (cId === -1) {
              this_.editForm.Category1_Id = ""
          }
          var skus = data.GoodsSkuShow.GoodsSkuInfoList
          skus.forEach(function(item, index) {
              var skuStr = "SkuId" + (index + 1)
              var optionStr = "OptionId" + (index + 1)
              var countStr = "Count" + (index + 1)
              var priceStr = "MarketPrice" + (index + 1)
              
              // 判断当前optionId是否存在服务单位
              if (this_.unitsId.indexOf(item.OptionIdList[0]) !== -1) {
                  var sku = {}
                  sku[skuStr] = item.SkuId
                  sku[optionStr] = item.OptionIdList[0]
                  sku[countStr] = item.Count
                  sku[priceStr] = item.MarketPrice
                  this_.editForm.SkuList.push(sku)
                  this_.editSkuOptionId[optionStr] = item.OptionIdList[0]
              } else {
                  var sku = {}
                  sku[skuStr] = 0
                  sku[optionStr] = 0
                  sku[countStr] = 0
                  sku[priceStr] = 0
                  this_.editForm.SkuList.push(sku)
              }
          })
        console.log(this_.editSkuOptionId)
        console.log(this.editForm.SkuList)
      })
      // this.editFormVisible = true
      // this.editForm = Object.assign({},row)
      // console.log( this.editForm = Object.assign({},row))
    },
    editClose(){
      this.editFormVisible = false;
      this.editForm = {
        CompanyId: "", //(integer, optional): 所属机构id
        StationId: "",
        Name: "", // 服务名称
        CustomCategoryId: null, // 自定义服务类型id
        Category_Id: null, // 服务类型
        DescDetail: "请输入内容", // 详细介绍
        IconUrl: "", // 服务图标
        ImageUrls: [],
        SkuList: [
        {
          SkuId: "",
          OptionId: "",
          Count: "",
          MarketPrice: ""
        }
      ],
      MerchantId: "" //商户Id
      }
    },
    editSubmit:function(formName){
        var this_ = this
        this.$refs[formName].validate((valid) => {
        if(valid) {
          // 数据整合
           var skuList =  this.editForm.SkuList
          if (skuList.length === 0) {
              this_.$message.error('请选择服务单位')
            return
          }
          var newSku = []
          skuList.forEach(function(item, i) {
              var skuStr = "SkuId" + (i + 1)
              var optionStr = "OptionId" + (i + 1)
              var countStr = "Count" + (i + 1)
              var priceStr = "MarketPrice" + (i + 1)
              var skuId = item.skuStr
              var param = {
                  "SkuId": item[skuStr],
                  "OptionId": item[optionStr],
                  "Count": parseInt(item[countStr]),
                  "MarketPrice": parseInt(item[priceStr])
              }
              newSku.push(param)
          })
          this_.editForm.SkuList = newSku
          this.$http.post('/api/v1/goods/server/update',this.editForm)
          .then(res=>{
            console.log(res)
            this.editClose();
            this.getListnumber()
          })
        }
      })
    },
    /**
     * editService 添加服务
     */
    editService() {
      this.editForm.GoodsSkuShow.GoodsSkuInfoList.push({
        SkuId: "",
        OptionId: "",
        Count: "",
        MarketPrice: ""
      });
    },
    /**
     * delService 删除服务
     * @param index 序号
     */
    editdelService(index) {
      this.editForm.GoodsSkuShow.GoodsSkuInfoList.splice(index, 1);
    },
    /**
     * editUploadFile 编辑上传文件
     * @param params 改变的数量
     */
    editUploadFile(params) {
      const _file = params.file;
      var formData = new FormData();
      let fileName = _file.name.split(",");
      formData.append("file", _file);
      formData.append("accountId", this.accountId);
      formData.append("extension", fileName[fileName.length - 1]);
      return this.$http.post(`/api/v1/file/push`, formData).then(res => {
        this.editForm.IconUrl = res.data.Obj[0];
      });
    },
    /**
      * editFormDelImg 修改头像
      */
    editFormDelImg() {
      this.editForm.IconUrl = "";
    },
    /**
     * delService 删除服务
     * @param index 序号
     */
    delService(index) {
      this.addForm.SkuList.splice(index, 1);
    },
    selectCompany(val) {
      console.log(val);
      //驿站
      this.$http.get(`/api/v1/company/${val}/station`).then(res => {
        res.data.Obj.map(item => {
          this.stationOpption.push({
            value: item.Id,
            label: item.Name
          });
        });
        console.log(this.stationOpption);
      });
    },
    roleIndexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    /**
     * deleteData 列表中删除
     * @param index s 列表的index
     * @param row  列表的一条数据
     */
    deleteData: function(index, row) {
      this.$confirm("确认删除该记录吗？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row);
        this.$http.delete("/api/v1/goods?id=" + row.GoodsId, row)
        .then(res => {
          this.getListnumber();
        });
      });
    },
    /**
     * ObtainedfData 下架
     * @param index s 列表的index
     * @param row  列表的一条数据
     */
    ObtainedfData: function(index, row) {
      this.$confirm("确认下架此服务吗？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row);
        this.$http.get("/api/v1/goods/launched?id=" + row.GoodsId)
        .then(res => {
          this.getListnumber();
        });
      });
    },
    /**
     * ShelfData  上架
     * @param index s 列表的index
     * @param row  列表的一条数据
    */
    ShelfData: function(index, row) {
      this.$confirm("确认上架此服务吗？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row);
        this.$http.get("/api/v1/goods/lowershelf?id=" + row.GoodsId)
        .then(res => {
          this.getListnumber();
        });
      });
    }
  },
};
</script>
<style scoped>
.dialog-footer{
  text-align: center;
}
.dialog-body .dialog-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
.el-button--small, .el-button--small.is-round {
  padding: 9px 20px;
  margin-left: 9px;
  margin-bottom: 2px;
}
/* ._Service_Publishing_ServiceList_form{
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 0 10px;
  } */
._Health_Service_form {
  display: flex;
  justify-content: space-between;
}
._Release_Elastic_frame {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;
  overflow-y: auto;
}
._Release_Elastic_frame ._Release_Elastic_frame_flex .el-dialog__header{
  padding: 20px 20px 10px;
  display: flex;
  justify-content: space-between;
}
._Release_Elastic_frame ._Release_Elastic_frame_flex .el-dialog__header span{
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}
._Release_Elastic_frame ._Release_Elastic_frame_flex .el-dialog__header .dialog__headerbtn {
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
}
.ReleaseFalse {
    display: block;
}
._Release_Elastic_frame_top {
    display: flex;
    padding: 1% 5% 0 8%;
    flex-wrap: wrap;
}
._Release_Elastic_frame_flex {
    width: 60%;
    background-color: #fff;
    margin: 5% auto;
}
.item_bock {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0px 24px 0px 38px;
}
.head_p {
    height: 132px;
}
.head_img {
    width: 80px;
    height: 80px;
    background: #ffffff;
    border: 2px solid #f6f4f4;
    border-radius: 4px;
    position: relative;
}
.head_img i {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 65px;
    font-size: 38px;
    color: #1088d8;
    transform: translate(0,0);
}
.head_img p{
  position: absolute;
  bottom:5px;
  left: 15%;
  transform: translate(0,-15%);
}
.head_img img {
    width: 90px;
    height: 90px;
    border-radius: 50px;
    z-index: 999;
}
.setting_right {
    display: flex;
    /* height: 37px; */
    /* justify-content: flex-end;
    align-items: center; */
}
.setting_right button {
    background-image: linear-gradient(-180deg, #ffffff 0%, #eeeeee 98%);
    border: 1px solid #979797;
    border-radius: 6px;
    padding: 5px 7px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #333333;
    letter-spacing: 1px;
    margin-top: 10px;
    outline: 0;
}
.setting_right button:nth-child(1) {
    margin-right: 8px;
}
.hiddenInput {
    display: none;
}
.caption {
    color: #8f8f8f;
    line-height: 35px;
    margin-top: 10px;
    cursor: pointer;
    border: 1px solid skyblue;
    padding: 0px 5px;
}
._Release_Elastic_frame_top_left {
    width: 60%;
    height: auto;
}
._Release_Elastic_frame_top_right {
    width: 40%;
    /* padding-top: 3%; */
}
._Release_Elastic_frame_top_left form .el-input,
._Release_Elastic_frame_top_left form .el-cascader {
    width: 50%;
}
._Release_Elastic_frame_top_left > div {
    display: flex;
    line-height: 20px;
}
._Release_Elastic_frame_top_left > div input {
    width: 60px;
    height: 20px;
    border: 1px solid #eee;
    text-align: center;
    margin: 0 3%;
}
/* ._Release_Elastic_frame_top_left>div button{
    background-image: linear-gradient(-180deg, #EF7676 0%, #DA4141 100%);
    border-radius: 2px;
    border:none;
    outline: none;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0;
    padding:2px 7px;
    margin-left: 30px;
  } */
._Release_Elastic_frame_top_bottom ._from_time div:nth-child(2),
.ServicePublishing_button {
    line-height: 40px;
}
.ServicePublishing_button {
    width: 100%;
    text-align: right;
    margin-right: 6.4%;
    margin-top: -25px;
}
.ServicePublishing_button span {
    background-image: linear-gradient(-180deg, #25bdee 0%, #1088d8 100%);
    border-radius: 2px;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #fff;
    letter-spacing: 0;
    padding: 2px 7px;
    /* margin-left: 15.5%; */
    /* margin-top: 15px; */
}
._Release_Elastic_frame_flex ._Release_Elastic_frame_bottom {
    width: 100%;
}
._Release_Elastic_frame_flex ._Release_Elastic_frame_bottom form {
    padding: 3% 3% 0 3%;
}
._Release_Elastic_frame_flex
    ._Release_Elastic_frame_bottom
    form
    .el-form-item
    .tinymce {
    width: 85%;
    margin-left: 8%;
}
._Release_Elastic_frame_flex /deep/ .el-form-item__label {
    width: 9%;
    text-align: left;
}
._Release_Elastic_frame_flex ._Release_Elastic_frame_button {
    text-align: center;
    padding-bottom: 1%;
}
._Release_Elastic_frame_top_bottom ._from_time {
    display: flex;
    flex-wrap: wrap;
}
._Release_Elastic_frame_top_bottom ._from_time div:nth-child(2) {
    /* width: 50%; */
    margin-left: 16px;
    /* z-index: 999; */
    color: #606266;
}
._Release_Elastic_frame_top_bottom ._from_time div:nth-child(2) input {
    width: 40px;
    margin: 0 10px;
}
._Release_Elastic_frame_top_bottom ._from_time div:nth-child(2) .button {
    background-image: linear-gradient(-180deg, #ef7676 0%, #da4141 100%);
    border-radius: 2px;
    border: none;
    outline: none;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
    letter-spacing: 0;
    padding: 2px 7px;
}
/* ._from_time .el-form-item{
  width: 50%;
} */
.tinymce-textarea >>> .wscnph{
  width: 110px;
  height: 90px;
}
div.popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    z-index: 999;
}
.popContainer .dialog {
    width: 574px;
    height: 450px;
    background: #ffffff;
    border-radius: 8px;
    margin-left: 50%;
    margin-top: 15%;
    transform: translate(-50%, -15%);
}
.popContainer .dialog p {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0.65px;
    padding: 14px 15px;
}
.popContainer .dialog .dialog_img {
    width: 541px;
    height: 301px;
    background: #f7f7f7;
    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.35);
    border-radius: 8px;
    display: flex;
    margin-left: 15px;
}
.popContainer .dialog .dialog_img ul {
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    align-items: center;
}
.popContainer .dialog .dialog_img ul li {
    display: flex;
    justify-content: space-around;
    width: 20%;
}
.popContainer .dialog .dialog_img ul li img {
    width: 60px;
    height: 60px;
}
.popContainer .dialog .dialog_bottom {
    text-align: center;
    margin-top: 30px;
}
.popContainer .dialog .dialog_bottom button {
    background-image: linear-gradient(-180deg, #ffffff 0%, #eeeeee 98%);
    border: 1px solid #979797;
    border-radius: 6px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #333333;
    letter-spacing: 1px;
    padding: 8px 36px;
}
</style>