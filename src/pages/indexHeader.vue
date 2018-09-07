<template>
<div>
    <div class="header">
		<div class="all-content">
			<div class="header-logo clearfix">
				<div class="logo ">
      				<h1>"> <router-link :to="{path: '/'}">华唐集团</router-link></h1>
     			</div>
     			<h2 class="VRlogo"><a href="#"><img src="../assets/VR-logo.jpg" alt="VR仿真教学实训平台" title="VR仿真教学实训平台"></a></h2>
			</div>
			<div class="header-perinfo clearfix">
				<span class="head-portrait"><img src="../assets/portrait.jpg" alt="头像" title="头像"></span>
				<span class="pet-name">
					<router-link :to="{path: '/info'}">阿陈坤</router-link><br>
					<a  @click="out()" alt="退出" href="javascript:;" title="退出"><i class="icon-out"></i>退出</a>
				</span>
			</div>
		</div>
	</div>
	<div class="nav">
		<div class="all-content">
			<el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="/index">首页</el-menu-item>
				<template v-for="(item,index) in navlist">
					<el-submenu :index="String(index)">						
						<template slot="title">{{ item.title }}</template>
						<template v-for="(itemc,indexc) in item.children">
							<el-menu-item :index="itemc.url1">{{ itemc.title1 }}</el-menu-item>		
						</template>					
					</el-submenu>	
				</template>		
			</el-menu>
		</div>
	</div>
	 <router-view></router-view>
	<div class="footer">
	<p>作者：万婷&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址：北京市海淀区上地九街9号</p>
	<p>联系邮箱：1060083667@qqq.com&nbsp;&nbsp;&nbsp;&nbsp;github：<a href="https://github.com/wantingandwt">https://github.com/wantingandwt</a></p>
</div>
</div>
</template>

<script>
export default {
  name: 'indexHeader',
  data () {
    return {
	  navlist:[
			{title:'素材库',children:[
				{title1:'贴图素材',url1:'/material/0'},
				{title1:'制作资料',url1:'/material/1'},
				{title1:'其他资源',url1:'/material/2'},
				{title1:'素材管理',url1:'/materialmanage'}
			]},
			{title:'教学资源',children:[
				{title1:'教学课件',url1:'/resource/0'},
				{title1:'教学视频',url1:'/resource/1'},
				{title1:'其他资源',url1:'/resource/2'},
				{title1:'资源管理',url1:'/resourcemanage'}
			]},
			{title:'实训任务',children:[
              {title1:'课程实训',url1:'/task/0'},
			  {title1:'项目实训',url1:'/task/1'},
			  {title1:'仿真实训',url1:'/task/2'},
			  {title1:'任务管理',url1:'/taskmanage'}
			]},
			{title:'优秀作品',children:[
              {title1:'图片作品',url1:'/works/0'},
			  {title1:'视频作品',url1:'/works/1'},
			  {title1:'模型作品',url1:'/works/2'},
			  {title1:'交互类作品',url1:'/works/3'},
			  {title1:'其他作品',url1:'/works/4'},
			  {title1:'作品管理',url1:'/worksmanage'}
			]},
			{title:'任务中心',children:[
              {title1:'全部完成任务',url1:'/teaching/0'},
			  {title1:'待完成任务',url1:'/teaching/1'},
			  {title1:'已完成任务',url1:'/teaching/3'},
			  {title1:'我的成绩',url1:'/teaching/4'}
			]},
			{title:'帮助中心',children:[
              {title1:'操作帮助',url1:'/help/0'},
			  {title1:'建模规范',url1:'/help/1'},
			  {title1:'编程规范',url1:'/help/2'}
			]},
	    ]
    }
  },
  methods: {
      handleSelect(key, keyPath) {
		this.$router.push({ path: key });
      }
    }
}
</script>

<style scoped>
.header{
	width:100%;
	height:120px;
}
.header .all-content{
	height:80px;
	padding:20px 0;
}
.header-logo{
	float:left;
}
.logo{
	display:inline-block;
	width:160px;
	height:82px;
	vertical-align:middle;
    text-indent: -999em;
    background: url(../assets/logo.png) no-repeat center;
}
.VRlogo{
	display:inline-block;
	vertical-align:middle;
}
.header-perinfo{
	float:right;
	height: 80px;
	line-height: 80px;
}
.head-portrait{
	display:inline-block;
	margin-right:10px;
	height:50px;
	width:50px;
	line-height:50px;
	text-align:center;
	border:5px solid #d2def0;
	border-radius:50%;
	vertical-align:middle;
	overflow:hidden;
}
.head-portrait img{
	width:100%;
}
.pet-name{
	display:inline-block;
	vertical-align:middle;
	line-height: 28px;
	text-align: right;
}
.pet-name a i{
	margin-right:5px;
}
.nav {
    width: 100%;
    height: 60px;
    background: #d2def0;
}
.nav .el-menu{
	background: #d2def0;
}
.footer{
	text-align: center;
	padding:20px 0;
	background: #666666;
}
.footer p{
	font-size:16px;
	color:#c6c6c6;
	line-height: 30px;
}
.footer p a{
	color:#fff;
}

</style>
