<template>
<div>
  <el-carousel :interval="5000" arrow="always" height="430px" trigger="click">
    <el-carousel-item v-for="item in 4" :key="item">
     <img :src="bannerUrl[item-1]">
    </el-carousel-item>
  </el-carousel>
<div class="index-bg">
	<div class="all-content">

       <div class="index-ulOne">
		   <h1 class="index-title">{{ indexcon[0].name }}<span> / {{ indexcon[0].englishName }} </span></h1>
		   <p class="index-p">{{ indexcon[0].content }} </p>
		   <div class="index-centent">
			   <div class="index-item" v-for="(item,index) in  indexcon[0].urlch">
				   <img :src="item.urlimg"  @mouseenter="enter(index)">
					<div class="index-ulBg" v-show="seen&&index==current"> </div>
					<dl v-show="seen&&index==current">
						<div class="index-ulTitle">
							<dd>{{ item.name }}</dd>
							<dd class="index-more"><router-link :to="item.url">更多</router-link></dd>
						</div>
					</dl>
			   </div>
			   			   
		   </div>
	      </div>

		<div class="index-ulOne">
			<h1 class="index-title">教学资源<span> / TEACHING RESOURCES</span></h1>
			<p class="index-p">丰富的教学课件及配套教材，教学视频，专业科普常识等科学性，趣味性的教学资源，辅助教学。</p>
			<div class="index-centent">
				<div class="index-li">
					<a href="/resource/0" title="教学学习">
						<div class="index-resourimg">
							<img class="resourImg" src="../assets/resource1.png">
						</div>
						<p class="index-resourp">教学学习</p>
					</a>
				</div>
				<div class="index-li">
					<a href="/resource/1" title="教学练习">
						<div class="index-resourimg">
							<img class="resourImg" src="../assets/resource2.png">
						</div>
						<p class="index-resourp">教学练习</p>
					</a>
				</div>
				<div class="index-li">
					<a href="/resource/2" title="其他教学">
						<div class="index-resourimg">
							<img class="resourImg" src="../assets/resource3.png">
						</div>
						<p class="index-resourp">其他教学</p>
					</a>
				</div>
			</div>
		</div>
	</div>
	<div class="index-task">
		<div class="all-content">
			<div class="index-ulOne">
				<h1 class="index-title">{{ indexcon[1].name }}<span> / {{ indexcon[1].englishName }}</span></h1>
				<p class="index-p">{{ indexcon[1].content }}</p>
				<div class="index-centent">
					<div class="index-itemThree" v-for="(item,index) in indexcon[1].urlch">
						<img :src="item.urlimg"  @mouseenter="enter(index)">
						<div class="index-ulBg" v-show="seen&&index==current"> </div>
						<dl v-show="seen&&index==current">
							<div class="index-ulTitle">
								<dd>{{ item.name }}</dd>
								<dd class="index-more"><router-link :to="item.url">更多</router-link></dd>
							</div>
						</dl>
					</div>
					
				</div>
			</div>
		</div>
	</div>
    <div class="all-content index-taskMargin">
		<div class="index-ulOne">
			<h1 class="index-title">优秀作品<span> / WORKS OF EXCELLENCE</span></h1>
			<p class="index-p">丰富的教学课件及配套教材，教学视频，专业科普常识等科学性，趣味性的教学资源，辅助教学。</p>
			<div class="index-centent">
				<div class="index-li index-liTask">
					<router-link :to="{path:'/resourceDetails/1?resourceid=0'}" title="图片类">
						<div class="index-taskimg">
							<img class="taskImg" src="../assets/works1.png">
						</div>
						<p class="index-resourp">图片类</p>
					</router-link>
				</div>
				<div class="index-li index-liTask">
					<router-link :to="{path:'/resourceDetails/2?resourceid=0'}" title="视频类">
						<div class="index-taskimg">
							<img class="taskImg" src="../assets/works2.png">
						</div>
						<p class="index-resourp">视频类</p>
					</router-link>
				</div>
				<div class="index-li index-liTask">
					<router-link :to="{path:'/resourceDetails/3?resourceid=0'}" title="模型类">
						<div class="index-taskimg">
							<img class="taskImg" src="../assets/works3.png">
						</div>
						<p class="index-resourp">文档类</p>
					</router-link>
				</div>
				<div class="index-li index-liTask">
					<router-link :to="{path:'/resourceDetails/4?resourceid=0'}" title="交互类">
						<div class="index-taskimg">
							<img class="taskImg" src="../assets/works4.png">
						</div>
						<p class="index-resourp">其他类</p>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</div>

</div>
</template>

<script>
import con1 from "@/assets/banner1.png";
import con2 from "@/assets/banner2.png";
import con3 from "@/assets/banner3.png";
import con4 from "@/assets/banner4.png";
export default {
  name: 'index',
  data () {
    return {
      bannerUrl:[
		  con1,con2,con3,con4,
	  ],
	  indexcon:[
		{ name:'素材库',
		  englishName:'MATERIAL LIBRARY',
		  content:'丰富的教学课件及配套教材，专业科普常识等科学性，趣味性的教学资源，辅助教学，支持教师轻松备课及学生在线学习。',
          urlch:[
			  {urlimg:require('../assets/material1.png'),name:'图片素材',url:'/material/0'},
			  {urlimg:require('../assets/material2.png'),name:'视频素材',url:'/material/0'},
			  {urlimg:require('../assets/material3.png'),name:'文档素材',url:'/material/1'},
			  {urlimg:require('../assets/material4.png'),name:'其他素材',url:'/material/2'}
		  ]
		},
		{ name:'实训任务',
		  englishName:'SIMULATION TASKS',
		  content:'丰富的教学课件及配套教材，持教师轻松备课及学生在线学习。',
          urlch:[
			  {urlimg:require('../assets/task1.png'),name:'课程实训',url:'/task/0'},
			  {urlimg:require('../assets/task2.png'),name:'项目实训',url:'/task/1'},
			  {urlimg:require('../assets/task3.png'),name:'其他实训',url:'/task/2'},
		  ]
		},
	  ],
	  seen:false,
      current:0
    }
  },
  methods: {
	  enter(index){
        this.seen = true;
        this.current = index;
      }
  }
    
}
</script>

<style scoped>
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .index-bg{
	background: #edeff0;
}
.index-ulOne{
	padding-top:50px;
	overflow: hidden;
}
.index-p{
	text-align: center;
	color:#666;
	width:780px;
	margin: 15px auto 5px;
}
.index-title{
	text-align: center;
	font-size: 30px;
	color:#0b2a56;
	font-weight: 600;
}
.index-title span{
	font-size:24px;
	color:#97a5c5;
	font-weight: 500;
}
.index-item,.index-item dl{
	width: 460px;
	height: 290px;
}
.index-itemThree,.index-itemThree dl{
	width:350px;
	height:450px;
}
.index-item,.index-itemThree{
	position: relative;
	display: inline-block;
	margin: 15px;
	cursor: pointer;
	overflow: hidden;
}
.index-item .index-ulBg,.index-itemThree .index-ulBg{
	position: absolute;
	width: 100%;
	height: 100%;
	top:0;
	left:0;
	background: url(../assets/bghui4.png) repeat;
	overflow: hidden;
	/* display:none; */
	_zoom: 1;
}
.index-item dl,.index-itemThree dl {
	position: absolute;
	top: 0;
	left:0;
	width: 100%;
	height: 100%;
	/* display: none; */
}
.index-item dl dd,.index-itemThree dl dd{
	height: 50px;
	color:#fff;
	font-size:24px;
	text-align: center;
}
.index-more a{
	background: #377ef1;
	padding:10px 25px;
	color:#fff;
	font-size:16px;
	border-radius: 8px;
	margin-top:15px;
}
.index-item .index-ulTitle{
	height: 100px;
	margin-top: 95px;
}
.index-itemThree .index-ulTitle{
	height: 100px;
	margin-top: 175px;
}
.index-centent{
	text-align: center;
	overflow: hidden;
	margin: 0 -40px;
}
.index-li{
	display: inline-block;
	margin:15px 20px;
	width:350px;
}
.index-liTask{
	width:270px;
	margin:15px 8px;
}
.index-resourimg {
	height: 270px;
	overflow: hidden;
}
.index-taskimg{
	height: 250px;
	overflow: hidden;
}
.index-materialimg{
	height:160px;
	overflow: hidden;
	border-radius: 8px;
}
.resourImg{
	width: 410px;
	height: 296px;
}
.taskImg{
	width:270px;
	height:250px;
}
.materialImg,.courseImg{
	width:270px;
	height:160px;
	border-radius: 8px;
}
.resourImg,.taskImg ,.materialImg{
	background-size: cover;
	transition: all linear .3s;
}
.resourImg:hover,.taskImg:hover,.materialImg:hover {
	transform: scale(1.2);
}
.index-resourp{
	font-size:18px;
	background: #fff;
	height:60px;
	line-height: 60px;
}
.index-task{
	margin-top:35px;
	height:650px;
	background: url(../assets/indexTaskBg.png) center;
}
.index-task .index-title{
	color:#fff;
}
.index-task .index-title span{
	color:#afb6c2;
}
.index-task .index-p{
	color:#e5e5e5;
}
.index-taskMargin{
	padding-bottom: 160px;
}

</style>
