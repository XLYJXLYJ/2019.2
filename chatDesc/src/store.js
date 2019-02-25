//indexedDB中没有表的概念，而是objectStore，一个数据库中可以包含多个objectStore，
//objectStore是一个灵活的数据结构，可以存放多种类型数据。
//也就是说一个objectStore相当于一张表，里面存储的每条数据和一个键相关联。

//我们可以使用每条记录中的某个指定字段作为键值（keyPath），也可以使用自动生成的递增数字作为键值（keyGenerator），
//也可以不指定。选择键的类型不同，objectStore可以存储的数据结构也有差异

const defaultOption = {
  name: 'answers',
  version: 1,
  storeName: 'q_a'
}
//获取数据库
function IndexedDB(option) {
  const indexdb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
  if (!indexdb) {
    console.warn('indexdb does not support in this browser!')
    return
  }
  this.indexedDB = indexdb
  this._init(option)
}
//数据库初始化
IndexedDB.prototype._init = function(option) {
  option = option || defaultOption
  this.dbName = option.name
  this.dbVersion = option.version
  this.storeName = option.storeName
  this.db = null
}

IndexedDB.prototype.open = function() {
  const request = this.indexedDB.open(this.dbName, this.dbVersion)  //打开数据库 这条指令请求的响应是一个 IDBDatabase对象，这就是IndexedDB对象
  const vm = this
  request.onerror = function(e) {
    console.log(e.currentTarget.error.message)
  }
  request.onsuccess = function(e) {
    vm.db = e.target.result
  }
  request.onupgradeneeded = function(e) { //onupgradeneeded 这个句柄在我们请求打开的数据库的版本号和已经存在的数据库版本号不一致的时候调用，
                                          //当我们传入的版本号和数据库当前版本号不一致的时候onupgradeneeded就会被调用，
                                          //当然我们不能试图打开比当前数据库版本低的version，否则调用的就是onerror了
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
  const transaction = vm.db.transaction(vm.storeName, 'readwrite') //打开一个事务
  const store = transaction.objectStore(vm.storeName) //获取students object store
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

//删除数据 调用object store的delete方法根据键值删除记录
IndexedDB.prototype.deleteDataByKey = function(key) {
  getStore(this).delete(key)
}

//调用object store的clear方法可以清空object store
IndexedDB.prototype.clearObjectStore = function() {
  getStore(this).clear()
}

// 更新数据 可以调用object store的put方法更新数据，会自动替换键值相同的记录，达到更新目的，没有相同的则添加，以使用keyPath做键为例
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

// 查找数据 可以调用object store的get方法通过键获取数据，以使用keyPath做键为例
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

//关闭数据库可以直接调用数据库对象的close方法
IndexedDB.prototype.closeDB = function() {
  this.db.close()
}

//删除数据库使用indexedDB对象的deleteDatabase方法
IndexedDB.prototype.deleteDB = function() {
  this.indexedDB.deleteDatabase(this.name)
}
export {IndexedDB}
