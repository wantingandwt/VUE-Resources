<template>
<div class="index-bg">
	<!--title-->
	<div class="resource-top">
		<div class="all-content">
      <span class="layui-breadcrumb">
		   	<span> 当前位置：</span>
				  <a>首页</a><span lay-separator="">&gt;</span>
				  <a>教学资源</a><span lay-separator="">&gt;</span>
				  <a>{{datatitle[taskid]}}</a><span lay-separator="">&gt;</span>
			    <a v-if="tableData[0].name">{{ tableData[id].name }}</a>
		  </span>
			<h1  v-if="tableData[0].name">{{ tableData[id].name }}</h1>
			<div class="resource-bottom">
				<a @click="taskAn(id)" title="立即安排" class="resource-an">立即安排</a>
				<span  v-if="tableData[0].name">课件类型<br>{{ tableData[id].type }}</span>
				<i>分割线</i>
				<span  v-if="tableData[0].name">文件大小<br>{{ tableData[id].textnunm }}M</span>
				<i>分割线</i>
				<span  v-if="tableData[0].name">上传时间<br>{{ tableData[id].date }}</span>
				<i>分割线</i>
				<span  v-if="tableData[0].name">上传者<br>{{ tableData[id].author }}</span>
				<a href="javascript:history.go(-1)" title="返回上一页" class="eye-arrow">返回上一页</a>
			</div>
		</div>
	</div>
    <anpai :an='isanpai' @childAn="isxian"></anpai>
	<!--title end-->
	<div class="resource-bg">
		<div class="all-content">
        <div class="resource-left">
          <h2>课件内容</h2>
          <div class="reLeft-body"  v-if="tableData[0].name">
              <img :src="tableData[id].imgurl">
          </div>
			</div>
			<div class="resource-right">
				<h2>课程简介</h2>
				<div class="reRight-body">
           <h3>资源说明</h3>
					 <p  v-if="tableData[0].name">
						{{ tableData[id].content }}
					 </p>
					 <h3 class="resource-h3">学习要点</h3>
					 <p  v-if="tableData[0].name">
						 	{{ tableData[id].content }}
					 </p>
				</div>
			</div>
			<div class="height40"></div>
		</div>
	</div>
</div>
</template>

<script>
import anpai from './taskAnpai.vue'
export default {
  name: 'taskDetails',
  data () {
    return {
        taskid: this.$route.query.taskid,
        id: this.$route.params.id,
        datatitle:[
          '课程实训',
		  '项目实训',
		  '仿真实训'
        ],
        tableData:[
        {
            name:false
        }
        ],
        isanpai:false,
    }
  },
  created() {
    this.setData();
  },
  components: {
	  anpai
  },
  methods: {
    //获取组件传递的值
	isxian(q){
	   this.isanpai = q;
	},
    //获取数据
	  setData: function() {
       this.$api.get("/task/data",'') 
       .then(res=>{
        this.tableData = res.data;
       })   
    },
	taskAn(index){
        this.isanpai = true;
	},
  }
    
}
</script>

<style scoped>
.resource-top .layui-breadcrumb {
    padding-top: 15px;
    display: inline-block;
}
.resource-top .layui-breadcrumb span, .resource-top .layui-breadcrumb a {
    color: #e5e5e5 !important;
}
.resource-h3 {
    margin-top: 25px;
}
.resource-top {
    width: 100%;
    height: 260px;
    background-position: center;
    background-repeat: no-repeat;
     background-image: url(../assets/re-eyebg.png);
}
.resource-top h1 {
    font-size: 48px;
    color: #fff;
    font-weight: 600;
    height: 130px;
    line-height: 130px;
}
.resource-an {
    display: inline-block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    border-radius: 5px;
    background: #377ff1;
    cursor: pointer;
    margin-top: 1px;
    margin-right: 25px;
    vertical-align: top;
}
.resource-bottom span {
    color: #e5e5e5;
    display: inline-block;
}
.resource-bottom i {
    font-size: 0;
    height: 30px;
    border-right: 2px solid #a7977f;
    display: inline-block;
    margin: 0 25px;
    vertical-align: text-bottom;
    margin-bottom: 3px;
}
.eye-arrow {
    float: right;
    margin-top: -5px;
    font-size: 0;
    height: 52px;
    width: 52px;
    background-image: url(../assets/arrow.png);
}
.resource-bg {
    background: #fff;
    overflow: hidden;
}
.resource-left {
    width: 820px;
    float: left;
}
.resource-left, .resource-right {
    padding-top: 50px;
}
.resource-left h2, .resource-right h2 {
    font-size: 18px;
    margin-bottom: 30px;
}
.reLeft-body {
    background: #edf1f2;
    min-height: 500px;
}
.resource-right {
    width: 280px;
    float: right;
    vertical-align: top;
}
.reRight-body {
    background: #edf1f2;
    padding: 20px;
}
.reLeft-body img{
  width:100%;
}
.reRight-body h3 {
    margin-bottom: 10px;
}
.reRight-body p {
    line-height: 20px;
    color: #666 !important;
    font-size: 12px !important;
}
.height40 {
    height: 40px;
    clear: both;
}
</style>
