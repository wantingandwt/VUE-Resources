// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;

// 素材管理列表 数据
let arr = []
for (let i = 0; i < 30; i++) {
  let newArticleObject = {
    'id':i,
    'name':Random.ctitle(4, 6),
    'type':Random.csentence(2, 5),
    'downnum':Random.integer( 100, 400 ),
    'texttype':Random.cword(2, 5),
    'textnunm':Random.integer(20, 30),
    'date':Random.date(),
    'author':Random.cname(),
    'imgurl':Random.dataImage('300x250', '素材图片'), 
    'content':Random.ctitle(10, 20)
  }
  arr.push(newArticleObject);
}

// 素材管理的删除操作
let list = function (options) {
    let rtype = options.type.toLowerCase(); //获取请求类型
    switch (rtype) {
    case 'get':
        break;
    case 'post':
        let id = parseInt(JSON.parse(options.body).params.id) //获取删除的id
        arr = arr.filter(function(val){
        return val.id!=id;//把这个id对应的对象从数组里删除
        });
        break;
    default:
    }
    return {
       data: arr
    } //返回这个数组,也就是返回处理后的假数据
 }
Mock.mock('/material/data', /get|post/i, list);//get用于请求数据，post用于删除数据

// 素材搜索栏 数据展示
Mock.mock('/material/list', {
    "seller": {
        "type":"素材类别",
        "typrch":[
          {
          "name": "贴图素材",
          "url":"/material/0"
        },
        {
          "name": "制作资料",
          "url":"/material/1"
        },
        {
          "name": "其他资源",
          "url":"/material/2"
        }
      ],
      "dataList":[
        {
        "type":"筛选",
        "namech":[
            {"name":"不限"},
            {"name":"室内设计类"},
            {"name":"建筑表现类"},
            {"name":"交通工具类"},
            {"name":"游戏场景类"},
            {"name":"人物模型类"}
        ]
      },
      {
        "type":"文件类型",
        "namech":[
            {"name":"不限"},
            {"name":"照片"},
            {"name":"CDA图纸"},
            {"name":"三视图"},
            {"name":"其他"}
        ]
      }
    ] 
   },
});

// 素材管理的添加操作
let materAdd = function(options){
  //  console.log("传过来的数据"+JSON.parse(options.body).params.obj);
      let rtype = options.type.toLowerCase(); //获取请求的类型
      switch (rtype) {
          case 'get':
              break;
          case 'post':
              let obj = JSON.parse(options.body).params.obj;
              // console.log("数据获取"+ obj);
              arr = arr.concat(obj);  // 将前台返回来的数据，拼接到数组中。
              break;
          default:
              break;
      }
      return {
          data: arr
      }
  }
Mock.mock('/materAdd',/get|post/i,materAdd);

// 素材管理的修改操作
let materUpdate = function(options){
  let rtype = options.type.toLowerCase(); //获取请求的类型
  switch (rtype) {
      case 'get':
          break;
      case 'post':
          let obj = JSON.parse(options.body).params.obj;
          // console.log(JSON.parse(options.body).params);
          // let id = parseInt(JSON.parse(options.body).params.obj.id);
          arr = arr.map(val => {  // 将需要替换的数据替换掉
              return val.id === obj.id ? obj : val ;
          });
          break;
      default:
          break;
  }
  return {
      data: arr
  }
}
Mock.mock('/materUpdate',/get|post/i,materUpdate);

//素材上传图片
let materImg = function(options){
  let obj = JSON.parse(options.body).params.obj;
  return {
      data: obj
  }
}
Mock.mock('/materImg',materImg);

//素材管理列表   ---这种方法不能做删除添加------
// let arr2=['贴图素材','制作资料','其他资源'];
// let type=['doc','text','psd','excel'];
// Mock.mock('/material/data', 'get',{
//     'list|10': [{
//         'id|+1':1,
//         'name': '@cname',
//         'type|1':arr2,
//         'downnum|1000-3000':4,//随机生成数字
//         'texttype|1':type,
//         'textnunm|100-300':3,
//         'date':'@date'
//     }]
// });
