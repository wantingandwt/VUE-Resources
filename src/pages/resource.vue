<template>
  <div class="index-bg">
   <div class="all-content">
         <span class="resour-breadcrumb">
				  <span> 当前位置：</span>
				  <a href="index.html">首页</a><span lay-separator="">&gt;</span>
				  <a href="resource.html">教学资源</a><span lay-separator="">&gt;</span>
				  <a>教学视频</a>
			</span>
	</div>
  <img class="resource-banner" src="../assets/banner5.png">
  <div class="all-content">
       <div class="form-search">
          <el-form ref="form" :model="form" :inline="true">
              <el-form-item>
                <el-input v-model="form.search" placeholder="请输入资源名称"></el-input>
              </el-form-item>
              <el-form-item>
              <el-button type="primary" @click="searchSubmit">搜索</el-button>
              </el-form-item>
          </el-form>
          <div class="search-right">
            <router-link :to="{path:'/resourcemanage'}">资源管理</router-link>
          </div>
       </div>
  </div>
  <div class="all-content">
		<!--课程导航-->
		<ul class="resource-ul">
			<li class="resource-li1 resource-this" data-content="◀"><a href="">Max</a></li>
			<li class="resource-li2"><a href="">Maya</a></li>
			<li class="resource-li3"><a href="">Photoshop</a></li>
			<li class="resource-li4"><a href="">Unity3D</a></li>
			<li class="resource-li5"><a href="">Mars</a></li>
			<li class="resource-li6"><a href="">RayVR</a></li>
		</ul>
		<!--课程导航 end-->
		<div class="resource-li">
			<div class="resource-title">
				<img src="../assets/reicon1.png">
				<h1>MAX<span>/</span>基<span>/</span>础</h1>
				<img src="../assets/reicon2.png">
				<a @click="resourceList()" class="resource-list">列表显示</a>
			</div>
			<div class="resource-table" style="display: none;">
				<div class="layui-form manage-table">
					<table class="layui-table">
						<colgroup>
							<col width="20%">
							<col width="20%">
							<col width="20%">
							<col width="20%">
							<col>
						</colgroup>
						<thead>
						<tr>
							<th>序号</th>
							<th>资源名称</th>
							<th>分类</th>
							<th>所属课程</th>
							<th>操作</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>1</td>
							<td>沙发</td>
							<td>模型素材</td>
							<td>MAX</td>
							<td class="mater-button">
								<a class="re-eye" href="resource_eye.html" title="查看">查看</a>
								<a class="re-an" title="安排" onclick="resourceAn()">安排</a>
							</td>
						</tr>
						<tr>
							<td>2</td>
							<td>沙发</td>
							<td>模型素材</td>
							<td>MAX</td>
							<td class="mater-button">
								<a class="re-eye" href="resource_eye.html" title="查看">查看</a>
								<a class="re-an" title="安排" onclick="resourceAn()">安排</a>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
				<!--分页-->
				<div class="page2">
					在这里写分页
				</div>
				<!--分页 end-->
			</div>
			<div class="material-li">
				<div class="course-item" v-for="(item,index) in tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
					<div class="index-materialimg">
            <img :src="item.imgurl" class="materialImg">
					</div>
					<p>{{ item.name }}</p>
					<span class="resoue-span">课程简介：{{ item.content }}。</span>
					<div class="resour-button">
						<a class="resour-eye" href="resource_eye.html" title="查看">查看</a>
						<a class="resour-an" title="安排" onclick="resourceAn()">安排</a>
					</div>
				</div>
			  <!--分页-->
        <div class="page">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            background
            :page-size="8"
            layout="prev, pager, next"
            :total="length">
            </el-pagination>
        </div>
        <!--分页 end-->
			</div>
		</div>	
	</div>
  </div>
</template>

<script>
export default {
  name: 'resource',
  data () {
    return {
      id: this.$route.params.id,
      form:{
        'search':'',
      },
      tableData:[],
      currentPage: 1,
      pagesize: 8,
      length:29,
    }
  },
  created() {
    this.setData();
  },
  methods: {
	  setData: function() {
       this.$api.get("/resource/data",'') 
       .then(res=>{
         this.tableData = res.data;
       })   
    },
    //分页
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    searchSubmit(){
      
    }
  }
    
}
</script>

<style scoped>
.resource-banner{
	width:100%;
}
.resource-title{
	text-align: center;
	margin-top:60px;
	height: 40px;
	line-height: 40px;
}
.resource-title h1{
	margin:0 25px;
	font-size: 24px;
	color:#0b2a56;
	display: inline-block;
}
.resource-title span{
	color:#8995af;
	margin:0 10px;
	font-size: 18px;
}
.resource-title img{
	vertical-align: text-bottom;
}
.reso-right{
	padding:30px 0 0 0;
}
.height60{
	height:60px;
}
.height40{
	height:40px;
	clear: both;
}
.course-right{
	padding:30px 0 0 0;
	display: inline-block;
	float: right;
}
.course-item p{
	text-align: left;
	padding:0 10px;
}
.resoue-span{
	color: #999;
	padding:0 10px;
	text-align: left;
	height:40px;
	overflow: hidden;
	display: inline-block;
}
.resour-breadcrumb{
	padding-top: 15px;
	display: inline-block;
	position: absolute;
}
.resour-breadcrumb a {
	color: #333 !important;
}
.layui-breadcrumb span[lay-separator] {
	margin: 0 10px;
	color: #333;
}
.resour-button{
	text-align: left;
	margin-top:10px;
	padding:10px 10px 0 10px;
	border-top:1px solid #ddd;
}
.resour-button a{
	padding:4px 20px;
	border-radius: 5px;
	display: inline-block;
}
.resour-eye{
	color:#377ff1;
	border:1px solid #377ff1;
	margin-right:5px;
}
.resour-eye:hover{
	background: #377ff1;
	color:#fff;
}
.resour-an{
	color:#fcae4a;
	cursor: pointer;
	border:1px solid #fcae4a;
}
.resour-an:hover{
	background: #fcae4a;
	color:#fff;
}
.resource-ul{
	position: fixed;
	right: 20px;
	top: 50%;
	margin-top:-180px;
}
.resource-ul li{
    width:100px;
	height:50px;
	line-height: 50px;
	text-align: center;
	border-radius: 5px;
	font-size: 16px;
	margin-top:10px;
}
.resource-li1{
	background: #c6e9c6;
}
.resource-li1 a{
	color:#7da177
}
.resource-li2{
	background: #b1d0ff;
}
.resource-li2 a{
	color:#3d619f
}
.resource-li3{
	background: #eedbcd;
}
.resource-li3 a{
	color:#ac652e
}
.resource-li4{
	background: #e9c6de;
}
.resource-li4 a{
	color:#cb52a5
}
.resource-li5{
	background: #b1e4ff;
}
.resource-li5 a{
	color:#598aad
}
.resource-li6{
	background: #c5b1ff;
}
.resource-li6 a{
	color:#bf67ba
}
.resource-li6:hover a,.resource-li5:hover a,.resource-li4:hover a,.resource-li3:hover a,.resource-li2:hover a,.resource-li1:hover a,.resource-this a{
	color:#fff
}
.resource-this:after{
	position: absolute;
	right: 0;
	margin-right: 4px;
	content: attr(data-content);
	width:5px;
	height:5px;
	color:#fff
}
.resource-list {
    float: right;
    width: 100px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    background: #377ff1;
    border-radius: 5px;
    cursor: pointer;
}
</style>
