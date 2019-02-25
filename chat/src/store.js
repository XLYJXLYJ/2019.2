const defaultOption = {
  name: 'answers',
  version: 1,
  storeName: 'q_a'
}

function IndexedDB(option) {
  const indexdb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
  if (!indexdb) {
    console.warn('indexdb does not support in this browser!')
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
    console.log(e.currentTarget.error.message)
  }
  request.onsuccess = function(e) {
    vm.db = e.target.result
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
    //console.log('成功')
    const res = e.target.result;
    res.value.push(data);
    getStore(this_).put(res)
  }
}

IndexedDB.prototype.getDataByKey = function(key,length) {
  return new Promise((resolve, reject) => {
    const request = getStoreReadOnly(this).get(key)
    request.onsuccess = (e) => {
      const res = e.target.result
      if (!res) {
        console.log('没有匹配的数据')
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
