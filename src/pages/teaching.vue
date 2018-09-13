<template>
<div class="index-bg">
	<!--搜索-->
	  <div class="search">
		  <div class="all-content">
        <span class="layui-breadcrumb search-breadcrumb" lay-separator=">" style="visibility: visible;">
            <span> 当前位置：</span>
            <a>首页</a><span lay-separator="">&gt;</span>
            <a>任务中心</a>
        </span>
        <div class="form-search">
          <el-form ref="form" :model="form" :inline="true">
              <el-form-item>
                <el-input v-model="form.search" placeholder="请输入任务"></el-input>
              </el-form-item>
               <el-form-item>
                <el-input v-model="form.type" placeholder="请输入类别"></el-input>
              </el-form-item>
              <el-form-item>
              <el-button type="primary" @click="searchSubmit">搜索</el-button>
              </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
     <div class="all-content manage-body">
      <div class="manage-table">
        <el-table
          ref="multipleTable"
          :data="listData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)"
          border
          stripe
          tooltip-effect="dark"
          style="width: 100%"  >
          </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            width="50">
          </el-table-column>
          <el-table-column
            label="任务名称"
            width="120">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="类别"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="开始时间">
             <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date | getYMD }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="结束时间">
             <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date | getYMD }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="textnunm"
            label="制作工具">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.textnunm }}K</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="任务状态">
            <template slot-scope="scope">
              <span style="margin-left: 10px;color:red">{{ scope.row.status }}</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="date"
            label="完成时间"
            width="140">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date | getYMD }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="260">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary" plain
                @click="handleEye(scope.$index, scope.row)">查看</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handlesubmit(scope.$index, scope.row)">提交</el-button>
            </template>
          </el-table-column>
        </el-table>
          <!--分页-->
          <div class="page">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            background
            :page-size="6"
            layout="prev, pager, next"
            :total="length">
            </el-pagination>
          </div>
          <!--分页 end-->
      </div>
    </div>
    <tijiao :an='istijiao' @childAn="isxian" @childdata="isdata"></tijiao>
 </div>
</template>

<script>
import tijiao from './tachingTijiao.vue'
export default {
  name: 'teaching',
  data () {
    return {
      form:{
        search:'',
        type:''
      },
      tableData: [],
      listData:[],
      id:'1',
      length:'',
      currentPage: 1,
      length:29,
      pagesize: 6,
      istijiao:false
    }
  },
  components: {
	  tijiao
  },
  created() {
    this.setmanageList();
  },
  methods: {
    //搜索
	  searchSubmit(){
       var arrData =[];
       for(var i=0;i<this.tableData.length;i++){
         if(this.tableData[i].name.search(this.form.search) != -1 && this.tableData[i].type.search(this.form.type) != -1){
           arrData.push(this.tableData[i]);
         }
       }
      this.listData = arrData;
      this.length =  this.listData.length;
    },
    setmanageList(){
      this.$api.get('/resource/data','')
        .then(res => {
          //console.log(res.data);
          this.tableData = res.data;
           this.listData = res.data;
          this.length = res.data.length;
        });
    },
     //分页
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.$api.get('/resource/data','')//点击分页是重新请求改页面的数据
        .then(res => {
          //console.log(res.data);
          this.tableData = res.data;
          this.length = res.data.length;
        });
    },
    //查看详情
    handleEye(index,row){
      console.log(row);
      this.$router.push({path:'/teachingDetails/'+row.id,
        query:{
           resourceid : this.id
        }
		 })
    },
    isxian(q){
	    this.istijiao = q;
  	},
    handlesubmit(index,row){
       this.istijiao = true;
    },
    isdata(q){
      this.tableData= q;
      this.length = q.length;
    }
  }
    
}
</script>

<style scoped>

</style>
