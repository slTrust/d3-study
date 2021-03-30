// http://blog.thomsonreuters.com/index.php/mobile-patent-suits-graphic-of-the-day/
var links = [
    {source: "恒天中岩投资管理有限公司", target: "恒天中岩投资管理有限公司", type: "3", rela:"自身"},
    {source: "上海恒天润逸金融信息服务有限公司", target: "广东恒天财富投资管理有限公司", type: "1", rela:"股东(机构)"},
    {source: "广东恒天财富投资管理有限公司", target: "朱学锦", type: "2", rela:"法人(自然人)"},
    {source: "朱学锦", target: "恒天中岩投资管理有限公司", type: "2", rela:"相关公司"},
    {source: "朱学锦", target: "北京实创天成资产管理有限公司", type: "3", rela:"股东"},
    {source: "上海恒天润逸金融信息服务有限公司", target: "广东恒天财富投资管理有限公司", type: "2", rela:"股东(机构)"},
    {source: "广东恒天财富投资管理有限公司", target: "恒天融泽资产管理有限公司", type: "2", rela:"对外投资"},
    {source: "恒天融泽资产管理有限公司", target: "广东恒天财富投资管理有限公司", type: "2", rela:"股东"},
    {source: "恒天融泽资产管理", target: "广东恒天财富投资管理有限公司", type: "2", rela:"股东"},
 
    {source: "上海恒天润逸金融信息服务有限公司", target: "广东恒天财富投资管理有限公司", type: "2", rela:"股东(机构)"},
    {source: "广东恒天财富投资管理有限公司", target: "北京实创天成资产管理有限公司", type: "2", rela:"对外投资"},
    {source: "北京实创天成资产管理有限公司", target: "恒天中岩投资管理有限公司", type: "2", rela:"相同地址,相同法人"},
    {source: "恒天融泽资产管理有限公司", target: "恒天中岩投资管理有限公司", type: "2", rela:"相同地址,相同法人"},
 
    {source: "朱学锦", target: "恒天中岩投资管理有限公司", type: "2", rela:"相关公司"},
    {source: "恒天中岩投资管理有限公司", target: "恒天中岩投资管理有限公司", type: "resolved", },
];
 
var nodes = {};
 
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

console.log(nodes)
 
var width = window.innerWidth ,
    height = window.innerHeight ;
var force = d3.layout.force()//layout将json格式转化为力学图可用的格式
    .nodes(d3.values(nodes))//设定节点数组
    .links(links)//设定连线数组
    .size([width, height])//作用域的大小
    .linkDistance(250)//连接线长度
    .charge(-4000)//顶点的电荷数。该参数决定是排斥还是吸引，数值越小越互相排斥
    .on("tick", tick)//指时间间隔，隔一段时间刷新一次画面
    .start();//开始转换
 
 
 
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    // .call(zoom);
 
//箭头
var marker=
    svg.append("marker")
    //.attr("id", function(d) { return d; })
    .attr("id", "resolved")
    //.attr("markerUnits","strokeWidth")//设置为strokeWidth箭头会随着线的粗细发生变化
    .attr("markerUnits","userSpaceOnUse")
    .attr("viewBox", "0 -5 10 10")//坐标系的区域
    .attr("refX",59)//箭头坐标
    .attr("refY", 0)
    .attr("markerWidth", 8)//标识的大小
    .attr("markerHeight", 8)
    .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
    .attr("stroke-width",2)//箭头宽度
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")//箭头的路径
    .attr('fill','#595D68');//箭头颜色
 
//  将连接线设置为曲线
// var path = svg.append("g").selectAll("path")
//     .data(force.links())
//     .enter().append("path")
//     .attr("class", function(d) { return "link " + d.type; })
//     .style("stroke",function(d){
//         //console.log(d);
//        return "#A254A2";//连接线的颜色
//     })
//     .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });
 
 
// 设置连接线    
var edges_line = svg.selectAll(".edgepath")
    .data(force.links())
    .enter()
    .append("path")
    .attr({
 
          'd': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
          'class':'edgepath',
          //'fill-opacity':0,
          //'stroke-opacity':0,
          //'fill':'blue',
          //'stroke':'red',
          'id':function(d,i) {return 'edgepath'+i;}})
    .style("stroke",'#595D68')
    .style("pointer-events", "none")
    .style("stroke-width",1)//线条粗细
    .attr("marker-end", function(d){
        if(d.rela=='自身'){
            return ''
        }else{
            return 'url(#resolved)'
        }
    } );//根据箭头标记的id号标记箭头
 
var edges_text = svg.append("g").selectAll(".edgelabel")
.data(force.links())
.enter()
.append("text")
.style("pointer-events", "none")
//.attr("class","linetext")
.attr({  'class':'edgelabel',
               'id':function(d,i){return 'edgepath'+i;},
               'dx':60,
               'dy':-5
               //'font-size':10,
               //'fill':'#aaa'
               });
 
//设置线条上的文字
edges_text.append('textPath')
.attr('xlink:href',function(d,i) {return '#edgepath'+i})
.style("pointer-events", "none")
.text(function(d){return d.rela;});
 
//圆圈
console.log(force.nodes())
var circle = svg.append("g").selectAll("circle")
    .data(force.nodes())//表示使用force.nodes数据
    .enter().append("circle")
    .style("fill",function(node){
        var color;//圆圈背景色
        var link=links[node.index];
        // console.log(link.name)
        if(link){
              console.log(link.rela)
            if(link.type == "1"){ //p2p
                return color="#C03939"; 
            }else if(link.type == "3"){
                return color="#5095FF"; 
            }else if(link.source.name.length <= 4){//人
                return color="#CD994C"; 
            }else { 
                return color = '#1943AC'
            }
        }
    })
    .style('stroke',function(node){ 
        var color;//圆圈线条的颜色
        var link=links[node.index];
        if(link){
              console.log(link.rela)
            if(link.type == "1"){ //p2p
                return color="#C03939"; 
            }else if(link.type == "3"){
                return color="#5095FF"; 
            }else if(link.source.name.length <= 4){//人
                return color="#CD994C"; 
            }else { 
                return color = '#1943AC'
            }
        }
        // return color;
    })
    .attr("r", 40)//设置圆圈半径
    // .on("click",function(node){
    //     //单击时让连接线加粗
    //     edges_line.style("stroke-width",function(line){
    //         console.log(line);
    //         if(line.source.name==node.name || line.target.name==node.name){
    //             return 4;
    //         }else{
    //             return 0.5;
    //         }
    //     });
    //     //d3.select(this).style('stroke-width',2);
    // })
    .call(force.drag);//将当前选中的元素传到drag函数中，使顶点可以被拖动
 
 
  //圆圈的提示文字
//   circle.append("svg:title")  
//         .text(function(node) { 
//             var link=links[node.index];
//             // if(node.name==link.source.name && link.rela=="主营产品"){
//             //     return "双击可查看详情"
//             // }
//          });  
var text = svg.append("g").selectAll("text")
    .data(force.nodes())
    //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
    .enter()
    .append("text")
    .attr("dy", ".35em")  
    .attr("text-anchor", "middle")//在圆圈中加上数据  
    .style('fill',function(node){
        var color;//文字颜色
        var link=links[node.index];
        // if(node.name==link.source.name && link.rela=="主营产品"){
        //     color="#B43232";
        // }else{
        //     color="#A254A2";
        // }
        return color =  '#ffffff';
    }).attr('x',function(d){
        // console.log(d.name+"---"+ d.name.length);
        var re_en = /[a-zA-Z]+/g;
        //如果是全英文，不换行
        if(d.name.match(re_en)){
             d3.select(this).append('tspan')
             .attr('x',0)
             .attr('y',2)
             .text(function(){return d.name;});
        }
        //如果小于四个字符，不换行
        else if(d.name.length<=4){
             d3.select(this).append('tspan')
            .attr('x',-2)
            .attr('y',2)
            .text(function(){return d.name;});
        }else if(d.name.length>4&&d.name.length<=8) {//大于4  这两行
            var top=d.name.substring(0,4);
            var bot=d.name.substring(4,d.name.length);
 
            d3.select(this).text(function(){return '';});
 
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',-7)
                .text(function(){return top;});
 
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',10)
                .text(function(){return bot;});
 
 
        }else if(d.name.length>8&&d.name.length<=12){// 文字长度大于8 折三行
            var top=d.name.substring(0,4);
            var bot=d.name.substring(4,8);
            var bot1=d.name.substring(8,d.name.length);
 
            d3.select(this).text(function(){return '';});
 
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',-15)
                .text(function(){return top;});
 
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',2)
                .text(function(){return bot;});
                
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',16)
                .text(function(){return bot1;});
 
        }else if(d.name.length>12 && d.name.length<=16){//文字长度大于12 折四行'
 
            var top=d.name.substring(0,4);
            var bot=d.name.substring(4,8);
            var bot1=d.name.substring(8,12);
            var bot2=d.name.substring(12,d.name.length);
 
            d3.select(this).text(function(){return '';});
 
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',-20)
                .text(function(){return top;});
 
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',-3)
                .text(function(){return bot;});
                
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',10)
                .text(function(){return bot1;});
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',23)
                .text(function(){return bot2;});
 
 
        }else if(d.name.length>16 ){//文字长度大于16  方案
            var top=d.name.substring(0,4);
            var bot=d.name.substring(4,8);
            var bot1=d.name.substring(8,12);
            var bot2=d.name.substring(12,14);
 
                bot2 += '...'
            d3.select(this).text(function(){return '';});
 
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',-22)
                .text(function(){return top;});
 
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',-7)
                .text(function(){return bot;});
                
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',10)
                .text(function(){return bot1;});
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',25)
                .text(function(){return bot2;});
        }
        //直接显示文字    
        /*.text(function(d) { 
        return d.name; */
    })
 
/*  将文字显示在圆圈的外面 
var text2 = svg.append("g").selectAll("text")
     .data(force.links())
    //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
    .enter()
    .append("text")
    .attr("x", 150)//设置文字坐标
    .attr("y", ".50em")
    .text(function(d) { 
        //console.log(d);
        //return d.name; 
        //return d.rela;
        console.log(d);
        return  '1111';
    });*/
 
function tick() {
  //path.attr("d", linkArc);//连接线
  circle.attr("transform", transform1);//圆圈
  text.attr("transform", transform2);//顶点文字
  //edges_text.attr("transform", transform3);
  //text2.attr("d", linkArc);//连接线文字
  //console.log("text2...................");
  //console.log(text2);
  //edges_line.attr("x1",function(d){ return d.source.x; });
  //edges_line.attr("y1",function(d){ return d.source.y; });
  //edges_line.attr("x2",function(d){ return d.target.x; });
  //edges_line.attr("y2",function(d){ return d.target.y; });
    
  //edges_line.attr("x",function(d){ return (d.source.x + d.target.x) / 2 ; });
  //edges_line.attr("y",function(d){ return (d.source.y + d.target.y) / 2 ; });
 
 
  edges_line.attr('d', function(d) { 
      var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
      return path;
  });  
    
  edges_text.attr('transform',function(d,i){
        if (d.target.x<d.source.x){
            bbox = this.getBBox();
            rx = bbox.x+bbox.width/2;
            ry = bbox.y+bbox.height/2;
            return 'rotate(180 '+rx+' '+ry+')';
        }
        else {
            return 'rotate(0)';
        }
   });
}
//设置连接线的坐标,使用椭圆弧路径段双向编码
function linkArc(d) {
    //var dx = d.target.x - d.source.x,
  // dy = d.target.y - d.source.y,
     // dr = Math.sqrt(dx * dx + dy * dy);
  //return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  //打点path格式是：Msource.x,source.yArr00,1target.x,target.y  
  
  return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y
}
//设置圆圈和文字的坐标
function transform1(d) {
  return "translate(" + d.x + "," + d.y + ")";
}
function transform2(d) {
      return "translate(" + (d.x) + "," + d.y + ")";
}
 
 
 