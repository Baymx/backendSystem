<template>
  <div class="_Post_Management">
    <el-row class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" class="_Post_Management_form">
        <div class="_Post_Management_form_left">
          <el-form-item>
            <el-input v-model="filters" placeholder="请输入名称/手机查询关键字"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="date">
            <el-select v-model="department" placeholder="全部类型" style="width:130px;">
              <el-option style="height:45px;" v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getUsers">查询</el-button>
          </el-form-item>
        </div>
        <div class="_Post_Management_right">
          <el-form-item style="float:right;">
            <el-button-group>
                <el-button type="primary" @click="handleAdd">+新增</el-button>
                <el-button type="primary">修改</el-button>
                <el-button type="primary">删除</el-button>
            </el-button-group>
          </el-form-item>
        </div>
      </el-form>
  </el-row>
  <el-table :data="listData" style="width: 100%">
    <el-table-column fixed prop="name" label="序号"></el-table-column>
    <el-table-column prop="type" label="驿站名称"></el-table-column>
    <el-table-column prop="experience" label="所属机构"></el-table-column>        
    <el-table-column prop="age" label="负责人"></el-table-column>
    <el-table-column prop="place" label="性别"></el-table-column>
    <el-table-column prop="education" label="联系电话"></el-table-column>
    <el-table-column prop="blood" label="驿站地址"></el-table-column>
    <el-table-column prop="zodiac" label="状态"></el-table-column>
    <el-table-column prop="constellation" label="创建时间"></el-table-column>
    <!-- <el-table-column fixed="right" label="操作" width="140">
      <template slot-scope="scope">
        <el-button size="small" icon="el-icon-edit" @click="compileEdit(scope.$index, scope.row)"></el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteAdd(scope.$index, scope.row)"></el-button>
      </template>
    </el-table-column> -->
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total='totalItems'>
  </el-pagination>
</div>
</template>
<script>
export default {
  data(){
    return {
      filters:'',
      totalItems:0,
      department:'',
      typeData:[],
      currentPage:1, //初始页
      pagesize:5,
      totalItems:0,
      options:[
        {
          value:0,label:'保姆保洁'
        },{
          value:1,label:'月嫂'
        },{
          value:2,label:'育婴师'
        },{
          value:3,label:'小时工'
        },{
          value:4,label:'养老陪护'
        }
      ],
    }
  },
  created(){
    let _this = this
    fetch('../../../static/data/list.json').then(function(res){
      return res.json()
    }).then(function(stories){
      console.log(stories)
      _this.typeData = stories
    }).then(function(err){
      console.log(err)
    })
  },
  computed:{
    listData(){
      let newList=[];
      let sonList=[];
      var _this = this;
      var NewItems = [];
      let pages=Math.ceil(_this.typeData.length/_this.pagesize);//8为每页设置数量
      for(let i=0;i<pages;i++){
      sonList=_this.typeData.slice(i*_this.pagesize,i*_this.pagesize+_this.pagesize);//8为每页设置数量
        newList.push(sonList)
      }
      if(_this.filters !== ''){
      _this.typeData.map(item=>{
          if (item.name.indexOf(_this.filters) != -1) {
            NewItems.push(item);
          }
        })
        _this.totalItems=NewItems.length
        return NewItems;
      }
      _this.totalItems=_this.typeData.length
      return newList[_this.currentPage-1];
    },
  },
  methods: {
    //分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if(!this.flag){
        this.currentChangePage(this.data)
      }else{
        this.currentChangePage(this.filterTableDataEnd)
      }
    },
    currentChangePage(nursing,currentPage){
      let from = (this.currentPage -1) * this.pagesize;
      let to = this.currentPage * this.pagesize;
      for(; from<to;from++){
        if(nursing[from]){
          this.data.push(nursing[from])
        }
      }
    },
    //查询
    getUsers(){
      
    },
    //新增页面显示
    handleAdd: function(){
      this.addFormVisible = true;
      this.addForm = {
          type:'',
          place:'',
          age:'',
          experience:'',
          education:'',
          blood:'',
          zodiac:'',
          constellation:'',
          price:'',
          star:''
      }
    },
    /**
       * getListData 获取列表信息
       */
      getListData(){
        const role = sessionStorage.getItem("role");
        if(role){
          const accountId = JSON.parse(role).AccountId;
          this.accountId = accountId;
          this.$http.get(`/api/v1/user/${this.accountId}/station `)
            .then(res=>{
            console.log(res);
          })
        }
      },
  },
  mounted(){
    this.totalItems = this.typeData.length;
    if(this.totalItems > this.pagesize){
      for(let index=0; index<this.pagesize;index++){
        this.data.push(this.typeData[index])
      }
    }else{
      this.data = this.typeData
    }
    this.getListData();
  }
  
}
</script>
<style scoped>
  ._Post_Management_form{
    display: flex;
    justify-content: space-between;
  }
</style>
