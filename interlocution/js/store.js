
//打开数据库
function openDB(name,version){
	var version=version || 1;
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	var request=indexedDB.open(name,version);
	request.onerror=function(e){//失败
		console.log(e.currentTarget.error.message);
	};
	request.onsuccess=function(e){//成功
		myDB.db=e.target.result;
		console.log('success');
	}
	request.onupgradeneeded=function(e){
		var db=e.target.result;
		if(!db.objectStoreNames.contains('data')){
			db.createObjectStore('data',{keyPath:'name'});
		}
		console.log('database version changed to'+version)
	}
}

//add
function addData(db,storeName,value){
	var transaction=db.transaction(storeName,'readwrite');
	var store=transaction.objectStore(storeName);
	store.add(value);
}

//get
function getDataByKey(db,storeName,value,compute){
	var transaction=db.transaction(storeName,'readwrite');
	var store=transaction.objectStore(storeName);
	var request=store.get(value);

	var user;
	request.onsuccess=function(){
		user=request.result;
		compute(user);
	}
//	return user;
}
//update
function updateDataByKey(db,storeName,value,data){
	var transaction=db.transaction(storeName,'readwrite');
	var store=transaction.objectStore(storeName);
	var request=store.get(value);
	request.onsuccess=function(e){
		var user=e.target.result;
		user.data.push(data);
		store.put(user);
	}
}



