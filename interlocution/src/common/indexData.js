const defaultOption = {
    name: 'customer',
    version: 1,
    storeName: 'questionAnswer'
  }

  function IndexedDB(option) {
    const indexdb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    if (!indexdb) {
      console.log('你的浏览器不支持indexdb!')
      return
    }
    this.indexedDB = indexdb
    this._init(option)
  }

  IndexedDB.prototype._init = function(option) {
    option = option || defaultOption
    this.dbName = option.name
    this.dbVersion = option.version
    this.storeName = option.storeName
    this.db = null
  }

  IndexedDB.prototype.open = function() {
    const request = this.indexedDB.open(this.dbName, this.dbVersion)
    const vm = this
    request.onerror = function(e) {
      console.log('---------->>>> indexdb error: ', e.currentTarget.error.message)
    }
    request.onsuccess = function(e) {
      vm.db = e.target.result
      console.log('---------->>>> indexdb success: ', vm.db)
    }
    request.onupgradeneeded = function(e) {
      const db = e.target.result
      if (!db.objectStoreNames.contains(vm.storeName)) {
        // 创建object store
        const store = db.createObjectStore(vm.storeName, {
          keyPath: 'id'
        })
        console.log('创建成功')
        // 创建索引
        // store.createIndex('indexname', 'attr', {
        //  unique: false
        // })
        vm.db = db
      }
    }
  }

  function getStore(vm) {
    // 事物只有一次，每次需要重新获得事务
    const transaction = vm.db.transaction(vm.storeName, 'readwrite')
    const store = transaction.objectStore(vm.storeName)
    return store
  }

  function getStoreReadOnly(vm) {
    // 事物只有一次，每次需要重新获得事务
    const transaction = vm.db.transaction(vm.storeName)
    const store = transaction.objectStore(vm.storeName)
    return store
  }

  IndexedDB.prototype.addData = function(data) {
    getStore(this).add(data)
  }

  IndexedDB.prototype.deleteDataByKey = function(key) {
    getStore(this).delete(key)
  }

  IndexedDB.prototype.updateData = function(key,data) {
    var this_=this
    const request = getStore(this_).get(key);
    request.onsuccess = (e) => {
      console.log('更新数据库成功')
      let res = e.target.result;
      if(!res){
        let _value = [];
        if(data instanceof Array){
          _value = data;
        }else{
          _value = [data];
        }
        getStore(this_).add({'id':key,'value':_value})

      }else{
        if(data instanceof Array){
          for(let i=0;i<data.length;i++){
            res.value.push(data[i]);
          }
        }else{
          res.value.push(data);
        }
        getStore(this_).put(res)
      }

    }
  }
  // 修改点赞点踩数据
  IndexedDB.prototype.editData = function(key,index,text) {
    var this_=this
    const request = getStore(this_).get(key);
    request.onsuccess = (e) => {
      //console.log('成功')
      const res = e.target.result;
      for ( let i = 0; i <res.value.length; i++){
        if(i==index){
          if(res.value[index].robotZan == 1){
            res.value[index].robotZan = 2
            res.value[index].zan = 0
          }else{
            res.value[index].msg = text
            res.value[index].zan = 0
            res.value[index].robotZan = 2
          }
        }
      }
      getStore(this_).put(res)
    }
  }
// 修改点是点否数据
IndexedDB.prototype.editWhetherData = function(key,index) {
  var this_=this
  const request = getStore(this_).get(key);
  request.onsuccess = (e) => {
    //console.log('成功')
    const res = e.target.result;
    for ( let i = 0; i <res.value.length; i++){
      if(i==index){
          res.value[index].whetherposition = 0
      }
    }
    getStore(this_).put(res)
  }
}
  //
  IndexedDB.prototype.getDataByKey = function(key,length) {
    return new Promise((resolve, reject) => {
      const request = getStoreReadOnly(this).get(key)
      request.onsuccess = (e) => {
        const res = e.target.result
        if (!res) {
          resolve(res)
        } else {
          resolve({value:res.value,length:length})

        }

      }
    })
  }

  IndexedDB.prototype.clearObjectStore = function() {
    getStore(this).clear()
  }

  IndexedDB.prototype.closeDB = function() {
    this.db.close()
  }
  IndexedDB.prototype.deleteDB = function() {
    this.indexedDB.deleteDatabase(this.name)
  }
  export {IndexedDB}
