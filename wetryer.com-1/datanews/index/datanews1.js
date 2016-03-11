      // <script type="text/javascript">
            // 路径配置
            require.config({
                paths: {
                    echarts: 'http://echarts.baidu.com/build/dist'
                }
            });
            
            // 使用
            require(
                [
                    'echarts',
                    'echarts/chart/force' // 使用柱状图就加载bar模块，按需加载
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('datanewspagepic')); 
                   /* var dataStyle = {
                        normal: {
                            label: {show:true},
                            labelLine: {show:true}
                        }
                    };
                    var placeHolderStyle = {
                        normal : {
                            color: 'rgba(0,0,0,0)',
                            label: {show:false},
                            labelLine: {show:false}
                        },
                        emphasis : {
                            color: 'rgba(0,0,0,0)'
                        }
                    };*/
                        var option = {
                            title : {
                                text: '当代数据工作者应具备的知识技能结构',
                                textStyle: {
                                                    fontFamily: '微软雅黑',
                                                    fontSize: 16,
                                                    color: '#666'
                                                },
                                x:'center',
                                y:'bottom'
                            },
                        
                            tooltip : {           //鼠标交互时信息提示
                                trigger: 'item',
                                formatter: '{a} : {b}'//内容格式器：在力导向图中--节点 : a（系列名称），b（节点名称），c（节点值）, d(节点类目索引)
                                                      //边 : a（系列名称），b（边名称，默认为大端节点名称-小端节点名称），c（link.value）, d(大端节点 name 或者 index), e(小端节点 name 或者 index)
                            },
                            /*
                            toolbox: {
                                show : true,
                                feature : {
                                    restore : {show: true},
                                    magicType: {show: true, type: ['force', 'chord']},
                                    saveAsImage : {show: true}
                                }
                            },*/
                           /* legend: {
                                x: 'left',
                                data:['家人','朋友']
                            },*/
                            series : [
                                {
                                    type:'force',
                                    name : "相关技术",
                                    ribbonType: false,//?
                                    categories : [
                                        {
                                            name: '数据新闻', 
                                            itemStyle:{
                                                normal:{
                                                    brushType : 'both', //
                                                    color:'rgb(173,100,173)',//填充颜色
                                                    borderColor : 'rgba(255,215,0,0.4)',//描边颜色
                                                    borderWidth : 1,//描边线宽
                                                },
                                                emphasis:{ 
                                                }
                                            }
                                        },
                                        {
                                            name: '数据科学',
                                            itemStyle:{
                                                normal:{
                                                    brushType : 'both', //
                                                    color:'rgb(112,204,248)',//填充颜色
                                                    borderColor : 'rgba(255,215,0,0.4)',//描边颜色
                                                    borderWidth : 1,//描边线宽
                                                },
                                                emphasis:{ 
                                                }
                                            }
                                        },
                                        {
                                            name:'可视化',
                                            itemStyle:{
                                                normal:{
                                                    brushType : 'both', //
                                                    color:'rgb(189,218,186)',//填充颜色
                                                    borderColor : 'rgba(255,215,0,0.4)',//描边颜色
                                                    borderWidth : 1,//描边线宽
                                                },
                                                emphasis:{ 
                                                }
                                            }
                                        },
                                        {
                                            name:'计算机科学',
                                            itemStyle:{
                                                normal:{
                                                    brushType : 'both', //
                                                    color:'rgb(124,181,42)',//填充颜色
                                                    borderColor : 'rgba(255,215,0,0.4)',//描边颜色
                                                    borderWidth : 1,//描边线宽
                                                },
                                                emphasis:{ 
                                                }
                                            }
                                        },
                                        {
                                            name:'专业领域\n(这里为新闻传播学）',
                                            itemStyle:{
                                                normal:{
                                                    brushType : 'both', //
                                                    color:'rgb(210,214,232)',//填充颜色
                                                    borderColor : 'rgba(255,215,0,0.4)',//描边颜色
                                                    borderWidth : 1,//描边线宽
                                                },
                                                emphasis:{ 
                                                }
                                            }
                                        }
                                    ],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                textStyle: {
                                                    fontFamily: '微软雅黑',
                                                    fontSize: 12,
                                                    color: '#666'
                                                }
                                            },
                                            nodeStyle : {     //力导向图节点样式
                                                brushType : 'both', //
                                                //color:'#f08c2e',//填充颜色:不指定填充颜色则不同类别不同颜色
                                                borderColor : 'rgba(255,215,0,0.4)',//描边颜色
                                                borderWidth : 1,//描边线宽
                                            },
                                            linkStyle: {     //力导向图边样式
                                                type: 'curve',//线条类型，可选curve或line
                                                color:'#5182ab',//线条颜色
                                                width: 2 //线宽
                                            }
                                        },
                                        emphasis: {
                                            label: {
                                                show: false
                                                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                                            },
                                            nodeStyle : {
                                                //r: 30
                                                brushType : 'both', //
                                                color:'#f08c2e',//填充颜色:不指定填充颜色则不同类别不同颜色
                                                borderColor : 'rgb(105,107,116)',//描边颜色
                                                borderWidth : 3//描边线宽
                                            },
                                            linkStyle : {
                                                
                                            }
                                        }
                                    },
                                    useWorker: false,//是否在浏览器支持 web worker 的时候把布局计算放入 web worker 中(不懂)
                                    minRadius : 10, //顶点数据映射成圆半径后的最小半径
                                    maxRadius : 30, //顶点数据映射成圆半径后的最大半径
                                    gravity: 8, //向心力系数，系数越大则节点越往中心靠拢
                                    scaling: 2.2,//布局缩放系数，并不完全精确, 效果跟布局大小类似
                                    roam: 'move', //是否开启滚轮缩放和拖拽漫游，默认为false（关闭），
                                                  //其他有效输入为true（开启），'scale'（仅开启滚轮缩放），'move'（仅开启拖拽漫游）
                                    nodes:[
                                        {category:0, name: '数据新闻', value : 10, label: '数据新闻'},//默认显示name作为标签
                                        {category:1, name: '数据分析',value : 8},
                                        {category:1, name: '数据获取',value : 6},//value:节点值，如果不设置会取所有边的权重(weight)和
                                        {category:1, name: '数据清洗',value : 6},
                                        {category:1, name: '数据挖掘',value : 6},
                                        {category:1, name: '机器学习',value : 4},
                                        {category:2, name: '计算机图形学',value : 6},
                                        {category:2, name: '图像处理',value : 8},
                                        {category:2, name: '计算机辅助设计',value : 6},
                                        {category:3, name: 'Web前端',value : 8},
                                        {category:3, name: '程序语言',value : 8},
                                        {category:3, name: '数据库技术',value : 8},
                                        {category:4, name: '专业领域\n(这里为新闻传播学）',value : 8}
                                    ],
                                    links : [
                                        {source : '数据分析', target : '数据新闻', weight : 10},//边的权重越大离主要人物越近
                                        {source : '数据获取', target : '数据新闻', weight : 6},
                                        {source : '数据清洗', target : '数据新闻', weight : 6},
                                        {source : '数据挖掘', target : '数据新闻', weight : 6},
                                        {source : '机器学习', target : '数据新闻', weight : 3},
                                        {source : '计算机图形学', target : '数据新闻', weight : 6},
                                        {source : '图像处理', target : '数据新闻', weight : 10},
                                        {source : '计算机辅助设计', target : '数据新闻', weight : 3/*, name: '竞争对手'*/},
                                        {source : 'Web前端', target : '数据新闻', weight : 10},
                                        {source : '程序语言', target : '数据新闻', weight : 6},
                                        {source : '数据库技术', target : '数据新闻', weight : 6},
                                        {source : '数据获取', target : '数据分析', weight : 10},
                                        {source : '数据清洗', target : '数据分析', weight : 10},
                                        {source : '数据挖掘', target : '数据分析', weight : 10},
                                        {source : '机器学习', target : '数据分析', weight : 10},
                                        {source : '机器学习', target : '数据挖掘', weight : 10},
                                        {source : '计算机图形学', target : '图像处理', weight : 10},
                                        {source : '图像处理', target : '数据分析', weight : 10},
                                        {source : '计算机辅助设计', target : '计算机图形学', weight : 10},
                                        {source : '计算机辅助设计', target : '图像处理', weight : 10},
                                        
                                        {source : 'Web前端', target : '计算机辅助设计', weight : 10},
                                        {source : '程序语言', target : 'Web前端', weight : 10},
                                        {source : '数据库技术', target : 'Web前端', weight : 8},
                                        {source : '数据分析', target : '数据库技术', weight : 8},
                                        {source : '数据获取', target : '数据库技术', weight : 10},
                                        
                                        {source : '专业领域\n(这里为新闻传播学）', target : '数据新闻', weight : 10}
                                    ]
                                }
                            ]
                        };
                        /*
                        var ecConfig = require('echarts/config');
                        function focus(param) {
                            var data = param.data;
                            var links = option.series[0].links;
                            var nodes = option.series[0].nodes;
                            if (
                                data.source !== undefined
                                && data.target !== undefined
                            ) { //点击的是边
                                var sourceNode = nodes.filter(function (n) {return n.name == data.source})[0];
                                var targetNode = nodes.filter(function (n) {return n.name == data.target})[0];
                                console.log("选中了边 " + sourceNode.name + ' -> ' + targetNode.name + ' (' + data.weight + ')');
                            } else { // 点击的是点
                                console.log("选中了" + data.name + '(' + data.value + ')');
                            }
                        }
                        myChart.on(ecConfig.EVENT.CLICK, focus)
                        
                        myChart.on(ecConfig.EVENT.FORCE_LAYOUT_END, function () {
                            console.log(myChart.chart.force.getPosition());
                        });
                        */
    
                        
                    // 为echarts对象加载数据 
                    myChart.setOption(option); 
                }
            );
       // </script>