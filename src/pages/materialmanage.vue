<template>
<div class="index-bg">
	<!--搜索-->
	  <div class="search">
		  <div class="all-content">
			<span class="layui-breadcrumb search-breadcrumb" lay-separator=">" style="visibility: visible;">
				  <span> 当前位置：</span>
				  <a>首页</a><span lay-separator="">&gt;</span>
				  <a>素材库</a><span lay-separator="">&gt;</span>
				  <a>素材管理</a>
			</span>
			  <ul class="material-ul">
				  <li>
					  <span class="material-span">素材类别：</span>
					  <span class="search-this"><a>全部素材</a></span>
					  <span><a>模型素材</a></span>
					  <span><a>贴图素材</a></span>
					  <span><a>制作资料</a></span>
					  <span><a>其他资源</a></span>
				  </li>
			  </ul>
			  <div class="manage-button">
          <el-button type="text" size="medium" @click="materialAdd" class="import-a" icon="icon-import">上传</el-button>
          <el-button type="text" size="medium" @click="manageDel" :disabled="this.multipleSelection.length === 0" class="del-a" icon="icon-del">删除</el-button>
			  </div>
		   </div>
	  </div>
	<!--搜索 end-->
    <div class="all-content manage-body">
      <div class="manage-table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          stripe
          tooltip-effect="dark"
          style="width: 100%"  
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"
            >
          </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            width="50">
          </el-table-column>
          <el-table-column
            label="资源名称"
            width="120">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="类别"
            width="120">
          </el-table-column>
          <el-table-column
            prop="downnum"
            label="下载次数"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="texttype"
            label="文件格式"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="textnunm"
            label="文件大小">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.textnunm }}K</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="上传时间">
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
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

  <!--弹框-->
      <el-dialog 
        :title="titleMap[dialogStatus]"
        :visible.sync="dialogFormVisible" >
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="素材名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="素材类别">
              <el-select v-model="form.type" placeholder="请选择素材类别">
                <el-option label="模型素材" value="模型素材"></el-option>
                <el-option label="贴图素材" value="贴图素材"></el-option>
                 <el-option label="其他资源" value="其他资源"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上传文件">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList3">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="素材图片">
            <el-upload
                action="/materImg"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :file-list="fileList"
                :http-request="uploadImg"
                :on-remove="handleRemovepicture">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="资源说明">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
          </el-form>
            <div slot="footer" class="dialog-footer">          
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <template v-if="dialogStatus === 'addEquipment'">
                   <el-button type="primary" @click="materForm">确 定</el-button>
                </template>
                <template v-else-if="dialogStatus === 'editEquipment'">
                   <el-button type="primary" @click="materFormEdit">确 定</el-button>
                </template>
            </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'materialmanage',
  data () {
    return {
      id:'1',
      currentPage: 1,
      length:29,
      pagesize: 6,
      tableData: [],
      multipleSelection: [],
      ids:'',
      dialogFormVisible:false,
      form:{
          'id':'',
          'name':'',
          'type':'模型素材',
          'downnum':'0',
          'texttype':'png',
          'textnunm':'0',
          'date':'2017-12-12',
          'author':'wt',
          'imgurl':'', 
          'content':''
        },
      //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
      titleMap: {
        addEquipment:'上传素材',
        editEquipment: '编辑素材'
      },
      //新增和编辑弹框标题
      dialogStatus: "",

      //上传文件
      fileList3: [],
      //上传图片
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: []
    }
  },
  created() {
    this.setmanageList();
  },
  methods: {
    //上传图片
   uploadImg(item) {
        let formData = new FormData()
        formData.append('file', item.file)
        formData.append('group', 'system')
        
        this.$api.post('/materImg',{
           params: {
             obj:formData // 选择FormData方式传参
            }  
          })
        .then(res => {
          console.log(res.data);
          this.form.imgurl = res.data;
        })
        .catch((err) => {
          console.log(err, 'error');
        });
      },
    //分页
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.$api.get('/material/data','')//点击分页是重新请求改页面的数据
        .then(res => {
          //console.log(res.data);
          this.tableData = res.data.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);//将当前页数据赋值给表格
          this.length = res.data.length;
        });
    },
    //获取列表
    setmanageList:function(){
        this.$api.get('/material/data','')
        .then(res => {
          //console.log(res.data);
          this.tableData = res.data.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);//将第一页赋值给表格
          this.length = res.data.length;
        });
    },
    //获取列表选中的值
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量删除
    manageDel(){
      this.ids = this.multipleSelection,//获取所有选中行的id组成的字符串，以逗号分隔
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //console.log(this.ids)
         this.$api.post('/material/data', {
          params: {
            id: this.ids
          }
        }).then(function(res) {
            //console.log(res);
            this.tableData = res.data.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);//将第一页赋值给表格
            this.length = res.data.length;
            this.$message({
              type: 'success',
              message: '删除成功'
            });
        }.bind(this))
        .catch(function(error) {
            console.log(error)
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    //单个删除
    handleDelete(index,row){
      // console.log(index);    
      this.$confirm('删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = row.id;
        this.$api.post('/material/data', {
          params: {
          id: id
          }
        }).then(function(res) {
            //console.log(res);
            this.tableData = res.data.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);//将第一页赋值给表格
            this.length = res.data.length;
            this.$message({
              type: 'success',
              message: '第'+id+ '行删除成功'
            });
        }.bind(this))
        .catch(function(error) {
            console.log(error)
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    //查看详情
    handleEye(index,row){
      console.log(row);
       this.$router.push({path:'/materialDetails/'+row.id+'/?materId='+this.id})
    },
    //新增
    materialAdd(){
      this.form ={
          'id':'',
          'name':'',
          'type':'模型素材',
          'downnum':'0',
          'texttype':'png',
          'textnunm':'0',
          'date':'2017-12-12',
          'author':'wt',
          'imgurl':'', 
          'content':''
        };//还原表单
      this.fileList = []
      //显示弹框
      this.dialogFormVisible = true;
      //新增弹框标题
      this.dialogStatus = "addEquipment";
    },
    //编辑
    handleEdit(index,row) {
      //显示弹框
      this.dialogFormVisible = true;
      //编辑弹框标题
      this.dialogStatus = "editEquipment";
      this.form = this.tableData[row.id];
      this.fileList =[{name: 'food.jpeg', url: this.form.imgurl}] ;
      },

    //上传文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },

    //上传图片
    handleRemovepicture(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //新增提交表单
    materForm(){
      this.$confirm('是否提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.id = this.length+1;//获取当前id
        //获取当前时间
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;

        this.form.date = currentdate;//获取当前时间

        this.form.imgurl = this.dialogImageUrl;//获取当前图片
        console.log(this.dialogImageUrl);
        this.$api.post('/materAdd',{
          params: {
            obj: this.form
            }
          })
        .then(res=>{
           console.log(res.data);
           this.tableData = res.data.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
           this.length = res.data.length;
        })
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
        this.dialogFormVisible = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });          
      });
    },
    //编辑提交表单
    materFormEdit(){
     this.$confirm('是否提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //获取当前时间
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        this.form.date = currentdate;//获取当前时间

        console.log(this.dialogImageUrl);
        this.$api.post('/materUpdate',{
          params: {
            obj: this.form
            }
          })
        .then(res=>{
           console.log(res.data);
           this.tableData = res.data.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
        })
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
        this.dialogFormVisible = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });          
      });
    }
  }
    
}
</script>

<style scoped>

</style>
