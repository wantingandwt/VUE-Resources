<template>
<div class="index-bg">
	<!--搜索-->
		  <div class="all-content">
			<span class="layui-breadcrumb search-breadcrumb" lay-separator=">" style="visibility: visible;">
				  <span> 当前位置：</span>
				  <router-link :to="{path:'/index'}">首页</router-link><span lay-separator="">&gt;</span>
				  <a>素材库</a><span lay-separator="">&gt;</span>
				  <router-link :to="{path:'/material/0'}">{{ typeList[pid] }}</router-link><span lay-separator="">&gt;</span>
				  <a v-if="dataList1[0].name">{{ dataList1[id].name }}</a>
			</span>
		      <div class="search-right">
			     <router-link :to="{path:'/materialmanage'}">素材管理</router-link>
		   </div>
		   </div>
	<!--搜索 end-->
	<div class="all-content">
       <div class="material-left">
           <h1 class="material-title"  v-if="dataList1[0].name">{{ dataList1[id].name }}</h1>
		   <div class="mater-time">
			   <span class="material-blue" v-if="dataList1[0].name">下载量：{{ dataList1[id].downnum }}次</span>
		       <span class="material-hui" v-if="dataList1[0].name">更新时间：{{ dataList1[id].date }}</span>
		   </div>
		   <div class="mater-img" v-if="dataList1[0].name">
			   <img :src="dataList1[id].imgurl">
		   </div>
           <div class="mater-zhong">
			   <table cellspacing="1">
				   <tbody><tr>
					   <td v-if="dataList1[0].name">文件格式：{{ dataList1[id].texttype }}</td>
					   <td v-if="dataList1[0].name">发布时间：{{ dataList1[id].date }}</td>
				   </tr>
				   <tr>
					   <td v-if="dataList1[0].name">文件大小：{{ dataList1[id].textnunm }}M</td>
					   <td v-if="dataList1[0].name">发布者：{{ dataList1[id].author }}</td>
				   </tr>
			   </tbody></table>
			   <a class="mater-upload" href="" title="立即下载" alt="立即下载"><span class="icon-upload"></span>立即下载</a>
		   </div>
		   <div class="mater-body">
			   <p class="mater-p">文字说明</p>
			   <div class="mater-b">
				   <p v-if="dataList1[0].name">{{ dataList1[id].content }}</p>
			   </div>
		   </div>
	   </div>
		<div class="material-right">
          <h2>同类相关模型</h2>
			<ul class="mater-ul">
				<li class="mater-li" v-for="(item,index) in dataList1" v-if='index<=5' @click="details(index)">
						<img :src="item.imgurl">
						<p>{{ item.name }}</p>
						<span class="mater-one">{{ item.texttype }}</span>
						<span class="mater-two">{{ item.textnunm }}M</span>
				</li>			
			</ul>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: 'materialDetails',
  data () {
    return {
      id: this.$route.params.id,
      pid:this.$route.query.materId,
      dataList1:[
        {
          name:false
        }
      ],
      typeList:['图片素材','视频素材','文档素材']
    }
  },
  methods:{
      dataList(){
        this.$api.get('/material/data','')
        .then(res => {
             this.dataList1 = res.data;
            // console.log(res.data)
        })
      },
      details:function(index){
       // console.log(index)
        this.id = index;
      }
  }, 
  created(){
     this.dataList()
  }
}
</script>

<style scoped>
.material-left{
	overflow: hidden;
	width:768px;
	min-height:870px;
	border:1px solid #ddd;
	background: #fff;
	margin-bottom: 45px;
	margin-right:10px;
	display: inline-block;
}
.material-right{
	overflow: hidden;
	padding:16px 10px;
	width:328px;
	min-height:840px;
	border:1px solid #ddd;
	background: #fff;
	float: right;
	vertical-align: top;
	margin-bottom: 45px;
}
.material-title{
	font-size:24px;
	text-align: center;
	margin:20px 0;
}
.mater-time{
	overflow: hidden;
}
.mater-img{
	clear: both;
	margin:20px 0;
	border-top:1px solid #ddd;
	border-bottom:1px solid #ddd;
}
.mater-img img{
	width:100%;
  height:500px;
}
.mater-zhong{
	padding:0 10px;
}
.mater-zhong table{
	display: inline-block;
}
.mater-zhong td{
	border:1px solid #e5e5e5;
	color:#999;
	padding:11px 15px;
	font-size:12px;
}
.mater-upload{
	float:right;
	padding: 0 23px;
	color:#fff;
	height:80px;
	line-height: 80px;
	font-size: 20px;
	text-align: center;
	background: #17d15d;
}
.mater-upload:hover{
	background: #377ff1;
	color:#fff;
}
.mater-upload span{
	font-size: 39px;
	vertical-align: -10px;
	margin-right:15px;
}
.mater-body{
	padding:20px 10px;
}
.mater-p{
	font-size:16px;
	margin-bottom: 10px;
}
.mater-b{
	margin-left:25px;
	color:#505050;
}
.mater-b p{
	margin-bottom: 5px;
}
.material-right h2{
	font-weight: 600;
	margin-bottom: 6px;
}
.material-blue{
	float: left;
	color:#999;
	margin-left:10px;
}
.material-hui{
	float:right;
	color:#999;
	margin-right:10px;
}
.mater-li{
	margin: 12px 6px 0;
	border:1px solid #ddd;
	width:147px;
	overflow: hidden;
	display: inline-block;
	cursor: pointer;
}
.mater-li img{
	width:100%;
	height:150px;
}
.mater-li p,.mater-li span{
	padding:0 10px;
	font-size:12px;
}
.mater-li p{
	padding-top:6px;
	margin-bottom: 1px;
	border-top:1px solid #ddd;
}
.mater-li span{
	color:#999;
	margin-bottom: 6px;
	display: inline-block;

}
</style>
