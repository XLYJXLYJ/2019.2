
    
    
// Map实例  
var map; 
function map_init(m,zz) { 
    map = new BMap.Map(m);
    // 地图样式
    var styleJson = [
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": {
                      "visibility": "off"
            }
         
	 	},
	 	{
            "featureType": "label",
            "elementType": "labels.icon",
            "stylers": {
                      "color": "#ffff00",
                      "visibility": "off"
            }
        }
	];
	map.setMapStyle({styleJson:styleJson});
    // 第1步：设置地图中心点  
    
    
    // 创建地址解析器实例
	var myGeo = new BMap.Geocoder();
	// 将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint(zz, function(pointss){
		if (pointss) {
			var point = new BMap.Point(pointss.lng , pointss.lat); 
			//  画圆
			var circle = new BMap.Circle(point,50000,{strokeColor:"blue", strokeWeight:2});
			// 中心点的标注
			var marker1 = new BMap.Marker(point);  // 创建标注
			map.addOverlay(marker1);               // 将标注添加到地图中
			marker1.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动的动画
			marker1.addEventListener("mouseover",function(){
				map.addOverlay(circle); 
				map.addOverlay(label);
			});
			marker1.addEventListener("mouseout",function(){
				map.removeOverlay(circle); 
				map.removeOverlay(label);
			}); 
		}else{
			var point = new BMap.Point(116.404, 39.915); 
		}
		// 第2步：初始化地图,设置中心点坐标和地图级别。  
		map.centerAndZoom(point, 5); 
	    
		var opts = {
		  position : point,    // 指定文本标注所在的地理位置
		  offset   : new BMap.Size(10, -30)    //设置文本偏移量
		};
		var zhi=0;
		var nn=0;
		
	    // 第3步：启用滚轮放大缩小  
	    map.enableScrollWheelZoom(true);  
	    
	    // 第4步：向地图中添加缩放控件  
	    var ctrlNav = new window.BMap.NavigationControl({  
	        anchor: BMAP_ANCHOR_TOP_LEFT,  
	        type: BMAP_NAVIGATION_CONTROL_LARGE  
	    });
	    map.addControl(ctrlNav);
	    
	    // 第5步：向地图中添加缩略图控件  
	    var ctrlOve = new window.BMap.OverviewMapControl({  
	        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,  
	        isOpen: 1  
	    }); 
	    map.addControl(ctrlOve);  
	
	    // 第6步：向地图中添加比例尺控件  
	    var ctrlSca = new window.BMap.ScaleControl({  
	        anchor: BMAP_ANCHOR_BOTTOM_LEFT
	    }); 
	    map.addControl(ctrlSca); 
	    var mapType1 = new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]});
	    map.addControl(mapType1);//2D图，卫星图
	  
		// 第7步：绘制点   
		
		if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
			var pointArr = []; 
	        var pointArr1 = []; 
	        var pointArr2 = []; 
	        var pointArr3 = []; 
	        var pointArr4 = []; 
	        var pointArr5 = []; 
	        var pointArr6 = []; 
	        if(m=='map1'){ 
				var markerArr = earthquake;
			}else if(m=='map2'){
				var markerArr = typhoon;
			};
			// 添加海量点数据
	        for (var i = 0; i < markerArr.length; i++) {
	        	var pointz = new BMap.Point(markerArr[i].lo, markerArr[i].la)
				if(BMapLib.GeoUtils.isPointInCircle(pointz,circle)){ 
					nn++;
					zhi+=(markerArr[i].l-0); 
				};
	        	pointArr.push(new BMap.Point(markerArr[i].lo, markerArr[i].la));
	        	if(m=='map1'){ 
					if(markerArr[i].l>=0&&markerArr[i].l<3){
		        		pointArr1.push(new BMap.Point(markerArr[i].lo, markerArr[i].la));
		        	}else if(markerArr[i].l>=3&&markerArr[i].l<4.5){
		        		pointArr2.push(new BMap.Point(markerArr[i].lo, markerArr[i].la));
		        	}else if(markerArr[i].l>=4.5&&markerArr[i].l<6){
		        		pointArr3.push(new BMap.Point(markerArr[i].lo, markerArr[i].la));
		        	}else if(markerArr[i].l>=6&&markerArr[i].l<7){
		        		pointArr4.push(new BMap.Point(markerArr[i].lo, markerArr[i].la));
		        	}else if(markerArr[i].l>=7&&markerArr[i].l<8){
		        		pointArr5.push(new BMap.Point(markerArr[i].lo, markerArr[i].la));
		        	}else if(markerArr[i].l>=8){
		        		pointArr6.push(new BMap.Point(markerArr[i].lo, markerArr[i].la));
		        	};
				}else if(m=='map2'){
					if(markerArr[i].l>=0&&markerArr[i].l<2){
		        		pointArr1.push(new BMap.Point(markerArr[i].lo, markerArr[i].la));
		        	}else if(markerArr[i].l>=2&&markerArr[i].l<4){
		        		pointArr2.push(new BMap.Point(markerArr[i].lo, markerArr[i].la));
		        	}else if(markerArr[i].l>=4&&markerArr[i].l<5){
		        		pointArr3.push(new BMap.Point(markerArr[i].lo, markerArr[i].la));
		        	}else if(markerArr[i].l>=5&&markerArr[i].l<6){
		        		pointArr4.push(new BMap.Point(markerArr[i].lo, markerArr[i].la));
		        	}else if(markerArr[i].l>=6){
		        		pointArr5.push(new BMap.Point(markerArr[i].lo, markerArr[i].la));
		        	};
				};
	        	
	          
	        }
	        var options1 = {
	            size: BMAP_POINT_SIZE_SMALL,
	            shape: BMAP_POINT_SHAPE_CIRCLE,
	            color: '#7cfa7c'
	         };
	        var options2 = {
	            size: BMAP_POINT_SIZE_SMALL,
	            shape: BMAP_POINT_SHAPE_CIRCLE,
	            color: '#fcd147'
	        };
	        var options3 = {
	            size: BMAP_POINT_SIZE_SMALL,
	            shape: BMAP_POINT_SHAPE_CIRCLE,
	            color: '#f48a1b'
	        };
	        var options4 = {
	            size: BMAP_POINT_SIZE_SMALL,
	            shape: BMAP_POINT_SHAPE_CIRCLE,
	            color: '#f25622'
	        };
	        var options5 = {
	            size: BMAP_POINT_SIZE_SMALL,
	            shape: BMAP_POINT_SHAPE_CIRCLE,
	            color: '#e51f22'
	        };
	        var options6 = {
	            size: BMAP_POINT_SIZE_SMALL,
	            shape: BMAP_POINT_SHAPE_CIRCLE,
	            color: '#302a2a'
	        };
	        var pointCollection1 = new BMap.PointCollection(pointArr1, options1);  // 初始化PointCollection
	        var pointCollection2 = new BMap.PointCollection(pointArr2, options2);
	        var pointCollection3 = new BMap.PointCollection(pointArr3, options3);
	        var pointCollection4 = new BMap.PointCollection(pointArr4, options4);
	        var pointCollection5 = new BMap.PointCollection(pointArr5, options5);
	        var pointCollection6 = new BMap.PointCollection(pointArr6, options6);
	        
			var labels;
			
			a(pointCollection1,markerArr,pointArr,m);
			a(pointCollection2,markerArr,pointArr,m)
			a(pointCollection3,markerArr,pointArr,m)
			a(pointCollection4,markerArr,pointArr,m)
			a(pointCollection5,markerArr,pointArr,m)
			a(pointCollection6,markerArr,pointArr,m)
	        map.addOverlay(pointCollection1);  // 添加Overlay
	        map.addOverlay(pointCollection2);
	        map.addOverlay(pointCollection3);
	        map.addOverlay(pointCollection4);
	        map.addOverlay(pointCollection5);
	        map.addOverlay(pointCollection6);
	    } else {
	        alert('请在chrome、safari、IE8+以上浏览器查看本示例');
	    };
	    if(zhi!=0){
	    	zhi=zhi/nn;
	    };
	    if(m=='map1'){ 
			var label = new window.BMap.Label('<p class="point_label">历年平均地震等级：M '+zhi.toFixed(1)+'</p>',opts); 
		}else if(m=='map2'){
			if(zhi>=0&&zhi<2){
				zhi="热带低压";
			}else if(zhi>=2&&zhi<4){
				zhi="热地风暴";
			}else if(zhi>=4&&zhi<5){
				zhi="台风";
			}else if(zhi>=5&&zhi<6){
				zhi="强台风";
			}else if(zhi>=6){
				zhi="超强台风";
			};
			var label = new window.BMap.Label('<p class="point_label">历年平均台风等级：'+zhi+'</p>',opts);
		};
		label.setStyle({borderColor:"#e9e9f4"}); 
	//	map.addOverlay(label);
	
	}, "中国");
	return false;
};
  
function a(zz,markerArr,pointArr,m){
	var arr=[];
	var arr2=[];
	zz.addEventListener("mouseover", function (e) {
		var start_time="";//名称
		var level="";//地址
		//关于自定义信息 修改json [[经度,维度,1,名称,地址,电话]]
		//循环查出值
		for (var i = 0; i < markerArr.length; i++) {
			pointArr.push(new BMap.Point(markerArr[i].lo, markerArr[i].la));
			if(markerArr[i].lo==e.point.lng&&markerArr[i].la==e.point.lat){//经度==点击的,维度
				start_time=markerArr[i].t;
				level=markerArr[i].l;
				break;
			}
		}
		var point = new BMap.Point(e.point.lng, e.point.lat);
		
		if(m=='map1'){
			var txt = '<p class="point_label">'+ start_time +' 地震：M '+ level +'</p>';
		}else if(m=='map2'){
			if(level>=0&&level<2){
				level="热带低压";
			}else if(level>=2&&level<4){
				level="热地风暴";
			}else if(level>=4&&level<5){
				level="台风";
			}else if(level>=5&&level<6){
				level="强台风";
			}else if(level>=6){
				level="超强台风";
			};
			
			var txt = '<p class="point_label">'+ start_time +' 台风：'+ level +'</p>';
		};
		var opts = {
		   position : point,    // 指定文本标注所在的地理位置
		   offset   : new BMap.Size(18, -24)    //设置文本偏移量
		};
		var labels = new window.BMap.Label(txt,opts);
		labels.setStyle({borderColor:"#e9e9f4"});
		map.addOverlay(labels);
		arr2.push(labels);
		
//		var circle = new BMap.Circle(point,50000,{strokeColor:"blue", strokeWeight:2});
//		map.addOverlay(circle);
//      arr.push(circle);
	});
	
	zz.addEventListener("mouseout", function (e) {
		for(var i=0;i<arr2.length;i++)map.removeOverlay(arr2[i]);
		for(var i=0;i<arr.length;i++)map.removeOverlay(arr[i]);
	});
	
}





  

