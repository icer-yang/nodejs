http.createServer(function(require,response){
	response.writeHead(200,{'Content-Type':'text/plain'})
	response.end('hello icer')
}).listen(8888);
其中的createserver函数原型是
这个是既传递函数本身，又传递其中的参数
function execute(someFunction, value) {
  someFunction(value);
}
execute(function(word){ console.log(word) }, "Hello");
==============================
function createServer(agr){
	response = '...'
	request = "..."
	agr(require，response)//函数的参数由createserver自带了
};
function agr(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'})
	res.end('hello icer')
}
createServer(agr)
=======================================
即agr接受一个function，这个function在｛｝中运行
运行时的函数接受的任何输入都相当于 “形参=输入的对象”
另外一种是包裹函数decorate似的，类似python
functtion createServer(agr(&require,&response)){
	agr(require，response)()
};
其中，agr()返回的也是一个函数,&response和&require是createServer实际传进的参数，而
response,require是形参，传给需要写的匿名函数用
-------
    function a(callback) {    
        alert("我是parent函数a！");   
        d(); 
        if (typeof callback === "function"){
            //alert(callback);
            callback(); 
        }
    } 
    callback即是回调函数，
// A callback is a function that is passed as an argument to another function and is executed after its parent function has completed.
结合java,python和js总结,
所谓回调,就是方法A中调用方法B,方法B通过参数反过来也调用了A中的对象,即回调
A(){var a; B(a);}  将A动态化时,B可作为参数传入,如下:
A(agr){var a; agr(a)} 调用时,A(B) 
-----------------------------------------------------------------------------------
function Module(id, parent) { 
  this.id = id; 
  this.exports = {}; 
  this.parent = parent; 

  // ... 
 }
 Module.prototype.require = function(path) {
  return Module._load(path, this);
}
 Module._load = function(request, parent, isMain) { 

  // 1.在Module._cache中检查模块是否被缓存

  // 2.如果缓存中为空，创建一个新的模块实例。new module

  // 3. 保存到缓存

  // 4. 使用指定的名称调用module.load() 

  //    在读取了文件内容后将调用module.compile() 

  // 5.如果加载和分析文件时有错误

  //    从缓存中删除坏的模块

  // 6. 返回 module.exports 

};
Module.prototype._compile = function(content, filename) { 

  // 1. 创建调用模块需要的require标准函数

  // 2.将其他帮助方法加入require. 

  // 3.包装JS代码到一个函数，这个函数提供我们的require模块, 比如变量本地化到模块的作用域

  // 4.返回这个函数
  (function (exports, require, module, __filename, __dirname) { 

  // YOUR CODE INJECTED HERE! 你的代码在这里

	}); 
};  
 每一个放在nodejs路径下的js文件都是一个模块，和python一样，每一个模块都有require方法
 并判断这个文件是否是当前运行的主文件，

===
这是require模块之后的流程
// 准备module对象:
var module = {
    id: 'hello',
    exports: {}
};
var load = function (exports,module) {
    // 读取的hello.js代码:
    function greet(name) {
        console.log('Hello, ' + name + '!');
    }

    module.exports = greet;//这样是调用后一个形参moudle
    //exports.greet = greet  //这样是调用前一个形参exports
    // hello.js代码结束
    return module.exports;
};
var exported = load(module.exports,module);

 ------------------------------------------------------------------------------
 //所有类的基类
var Class = function () { };

//基类增加一个extend方法
Class.extend = function (prop) {
    var prototype = Object.create(this.prototype);
    //把要扩展的属性复制到prototype变量上
    for (var name in prop) {
        //下面代码是让ctor里可以直接访问使用this._super访问父类构造函数，除了ctor的其他方法，this._super都是访问父类的实例
        prototype[name] = prop[name];
    }

    //假的构造函数
    function Class() {
        //执行真正的ctor构造函数
        this.ctor.apply(this, arguments);
    }

    Class.prototype = prototype;

    Class.prototype._super = Object.create(this.prototype);


    Class.prototype.constructor = Class;
    //任何Class.extend的返回对象都将具备extend方法
    Class.extend = arguments.callee;

    return Class;
};
----------
var F = function(){};
 F.prototype = MED.prototype;
 WD.prototype = new F();
 WD.prototype.constructor = WD; 
 ---
 function extend(Child, Parent) {
 	var F = function(){};
 	F.prototype = Parent.prototype;
 	Child.prototype = new F();
 	Child.prototype.constructor = Child;
} 
----------------
(x) => x + 6
function(x){
    return x + 6;
}
---------------------------------------------------------
function Promise(executor) {
    // 共有三种状态：pending（准备）、fulfilled（完成）、rejected（拒绝）
    this.PromiseStatus = 'pending';
    // 用于存储返回的数据
    this.PromiseValue;
    // 完成
    var resolve = function(reson) {};
    // 拒绝
    var reject = function(reson) {};
    ...
    // 开始执行承诺
    executor(resolve, reject);
}
Promise.prototype.then = function(executor) {};
Promise.prototype.chain = function() {};
Promise.prototype.catch = function() {};

Class Promise{
  String promiseStatus ='pending'
  String promiseValue = ''
  Promise _next 
  public then(onResolved,onReject){
      this._next =new Promise(exector)
      next = this._next
      status = this.status
      this._resolves.push(onResolveed)
      return next
  }
  public  resolve(value){
      this.then(executor( , ,value))
  }
  public Promise(executer){
      exector(this.resolve,this.reject)
  }
}
按同步流程来走的java代码这样写
new promise()=>exector()=>reslove()=>then()
promise承若会执行异步函数 exector，并在异步线程中异步函数执行完成后执行then ，
有Promise()包裹excetor或者
then()包裹executor 效果都是一样的。是一个Promise 链表。当然无论是同步函数还是异步都是可以用promise 的

function(options){
    return new Promise(function(resolve,reject){
      options = Object.assign(options,{//合并对象，一级深度拷贝
        success(result){
          if(rsult.statusCode===200){
            resolve(result.data)
          }else{
            reject(result)
          }
        }
        fail:reject
      })
      wx.request(options)
    })
}
=======
    Promise.prototype.then = function(resolve, reject) {  
        var next = this._next || (this._next = Promise());  
        var status = this.status;  
        var x;  
      
        if('pending' === status) {  
            isFn(resolve) && this._resolves.push(resolve);  
            isFn(reject) && this._rejects.push(reject);  
            return next;  
        }  
      
        if('resolved' === status) {  
            if(!isFn(resolve)) {  
                next.resolve(resolve);  
            } else {  
                try {  
                    x = resolve(this.value);  
                    resolveX(next, x);  
                } catch(e) {  
                    this.reject(e);  
                }  
            }  
            return next;  
        }  
      
        if('rejected' === status) {  
            if(!isFn(reject)) {  
                next.reject(reject);  
            } else {  
                try {  
                    x = reject(this.reason);  
                    resolveX(next, x);  
                } catch(e) {  
                    this.reject(e);  
                }  
            }  
            return next;  
        }  
    };  

======
function test(resolve, reject) {
    var timeOut = Math.random() * 2;
    log('set timeout to: ' + timeOut + ' seconds.');
    setTimeout(function () {
        if (timeOut < 1) {
            log('call resolve()...');
            resolve('200 OK');
        }
        else {
            log('call reject()...');
            reject('timeout in ' + timeOut + ' seconds.');
        }
    }, timeOut * 1000);
}
new Promise(test).then(function (result) {
    console.log('成功：' + result);
}).catch(function (reason) {
    console.log('失败：' + reason);
});

---------------------------------------------------------------------
阻塞 ------>阻塞必耗时,无论同步异步都会阻塞
耗时非阻塞----->可通过多线程/进程处理 典型的网络请求读写文件数据库等.
不耗时非阻塞------>同步异步都不影响

javascript单线程是指用户单线程,还有用户无法直接操作的异步线程以及进程,所谓nodejs的
异步非阻塞就是针对第二种情况的优化,直接在底层API就给用户多线程
每一个函数内部的逻辑区块都是按顺序执行的,但是用底层api的执行顺序不是由用户决定的
即程序是按一帧一帧执行,每一帧内是顺序执行
异步中的"调用"和"执行"要区分开,用户线程调用API,
用户线程并不等待API调用返回的结果,而是继续往下执行,
//由于用户线程不能直接操作异步线程,所以只能在主线程中写回调函数或通过参数传入
//在异步API中回调函数部分放入异步线程去执行
主线程与异步线程的执行靠各CPU来调节了,都是快速切换执行
function foo(callback) {
     你自己的代码1;
     asyncFn(function() {  //此处匿名函数是A,由异步函数asycnFn调用，
          var result = 你自己的代码;
          callback(result);//callback是B,至于回调是嵌套了多少层函数框不影响
     });
     自己的代码2;
}
回调与异步没有必要的关联关系
且异步发起函数asyncFn 和 回调函数callback 是可以分离的，这个例子中匿名函数并非直接的回调函数


foo主线程 发起一个异步请求，相应的async异步线程 接收请求并告知主线程已收到（异步函数返回）；
主线程可以继续执行后面的代码，同时工作线程执行异步任务；工作线程完成工作以后，通知主线程；主线程收到通知后，
将回调函数放入消息队列。主线程当js文件执行完成以后，事件循环开始执行，并从消息队列中取出消息，开始执行回调函数。


在python中的yield关键字将函数变为生成器，有状态量，每执行一次都生成一次
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1
    return 'done'

def odd():
    print('step 1')
    yield 1
    print('step 2')
    yield(3)
    print('step 3')
    yield(5)
 普通函数是调用函数就开始执行，遇到returned 时直接返回，而生成器则是调用函数时不动，调用next(函数名)方法才执行，遇到yield 时返回一次
 [x * x for x in range(10)] 这个是列表生成式  >>> [0, 1, 4, 9, 16, 25, 36, 49, 64, 81] ，Iterable类型
 (x * x for x in range(10)) 这个是generator 生成式 >>> <generator object <genexpr> at 0x1022ef630>，Iterator类型，也可迭代
    凡是可作用于for循环的对象都是Iterable类型；
    凡是可作用于next()函数的对象都是Iterator类型，它们表示一个惰性计算的序列；
    集合数据类型如list、dict、str等是Iterable但不是Iterator，不过可以通过iter()函数获得一个Iterator对象。
  for x in [1, 2, 3, 4, 5]:
      pass
  实际上完全等价于：
  # 首先获得Iterator对象:
  it = iter([1, 2, 3, 4, 5])
  while True:
      try:
          # 获得下一个值:
          x = next(it)
      except StopIteration:
          # 遇到StopIteration就退出循环
          break
当然，迭代器遇到for 也会进行执行
>>> for n in fib(6):
...     print(n)
  for循环无法拿到retrun值，要捕捉异常topIteration 才行
>>> g = fib(6)
>>> while True:
...     try:
...         x = next(g)
...         print('g:', x)
...     except StopIteration as e:
...         print('Generator return value:', e.value)
...         break

ES7中的async和await
async function findPosts() {
  var response = await $.get('/posts');
  try{ return JSON.parse(response.posts) 
  } catch(e) { 
  throw new Error("failed") 
  } 
}
function findPosts() { 
    var ctx = this, args = arguments; 
    return Promise.resolve().then(function () { 
        var response; 
        return $.get('/posts').then(function (value) { 
            response = value; 
            return Promise.resolve().then(function () { 
                return JSON.parse(response.posts); 
            }).catch(function (e) { 
                throw new Error('failed'); 
            }).then(function () { 
            }); 
        }); 
    }); 
}



try {
  module.exports = Promise
} catch (e) {}

function Promise(executor) {
  var self = this

  self.status = 'pending'
  self.data = undefined  // Promise的值
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function() { // 异步执行,下一个loop时执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(function() { // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }

构造函数里面参数是executor,是一个 function(agr1=resolve,agr2=reject){...if...condition... agr1( 传入普通值value或promise ),else agr2( )}
执行resolve,resolve就是一个回调函数,这个回调函数所用的的参数是由executor传入的普通值或promise,当是promise时,直接执行该promise的then方法
当传入的是普通值value的时候,settimeout异步执行,到下一次loop回调函数时才执行,所以这时开始执行then,此时还是pending状态,故而then中new一个promise2,在这个promise2中,通过 (self) 将上一个promise1
中的onReslovedCallback数组push一个function进去,此function执行then方法传入OnResolved参数,而且是将第一个executor中agr1传入的参数作为onResolved的参数
也就是说相当于将then的resolved参数当作了executor函数{}中异步代码的回调

那么,当我传入的onResolved参数的{}中没有执行resolve时,到promise2后怎么继续then下去呢,通过resolvePromise来,
继续resolve,此时传入resolve的参数是 onResolved() 执行后返回的值,然后循环下去

总而言之,new Promise(executor).then(OnResolved,Onrejected).then(OnResolved2,OnRejected2)
executor是一个会被传入resolve,reject的function
OnResolved是一个会被传入executor的{}中resolve所传入的参数作为参数的普通function,其返回值可以是promise对象,例如return new Promise( executor)
OnResolved2是一个会被传入OnResolve执行后的返回值作为参数的function




  function then(onResolved, onRejected) {
    var self = this
    var promise2
    onResolved = typeof onResolved === 'function' ? onResolved : function(v) {
      return v
    }
    onRejected = typeof onRejected === 'function' ? onRejected : function(r) {
      throw r
    }

    if (self.status === 'pending') {
      // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义
      return promise2 = new Promise(function(resolve, reject) {
        self.onResolvedCallback.push(function(value) {
          try {
            var x = onResolved(value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (r) {
            reject(r)
          }
        })

        self.onRejectedCallback.push(function(reason) {
            try {
              var x = onRejected(reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (r) {
              reject(r)
            }
          })
      })
    }
  }

    if (self.status === 'resolved') {
      return promise2 = new Promise(function(resolve, reject) {
        setTimeout(function() { // 异步执行onResolved
          try {
            var x = onResolved(self.data)
            resolvePromise(promise2, x, resolve, reject)
          } catch (reason) {
            reject(reason)
          }
        })
      })
    }

    if (self.status === 'rejected') {
      return promise2 = new Promise(function(resolve, reject) {
        setTimeout(function() { // 异步执行onRejected
          try {
            var x = onRejected(self.data)
            resolvePromise(promise2, x, resolve, reject)
          } catch (reason) {
            reject(reason)
          }
        })
      })
    }



  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}


function resolvePromise(promise2, x, resolve, reject) {
  var then
  var thenCalledOrThrow = false

  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }

  if (x instanceof Promise) {
    if (x.status === 'pending') { //because x could resolved by a Promise Object
      x.then(function(v) {
        resolvePromise(promise2, v, resolve, reject)
      }, reject)
    } else { //but if it is resolved, it will never resolved by a Promise Object but a static value;
      x.then(resolve, reject)
    }
    return
  }

  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      then = x.then //because x.then could be a getter
      if (typeof then === 'function') {
        then.call(x, function rs(y) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return resolvePromise(promise2, y, resolve, reject)
        }, function rj(r) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      return reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

Promise.deferred = Promise.defer = function() {
  var dfd = {}
  dfd.promise = new Promise(function(resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}















Promise.prototype.then = function(onResolved, onRejected) {
  var self = this
  var promise2

  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  onResolved = typeof onResolved === 'function' ? onResolved : function(value) {}
  onRejected = typeof onRejected === 'function' ? onRejected : function(reason) {}

  if (self.status === 'resolved') {
    // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
    // 因为考虑到有可能throw，所以我们将其包在try/catch块里
    return promise2 = new Promise(function(resolve, reject) {
      try {
        var x = onResolved(self.data)
        if (x instanceof Promise) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
          x.then(resolve, reject)
        }
        resolve(x) // 否则，以它的返回值做为promise2的结果
      } catch (e) {
        reject(e) // 如果出错，以捕获到的错误做为promise2的结果
      }
    })
  }

  // 此处与前一个if块的逻辑几乎相同，区别在于所调用的是onRejected函数，就不再做过多解释
  if (self.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
      try {
        var x = onRejected(self.data)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  if (self.status === 'pending') {
  // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
  // 只能等到Promise的状态确定后，才能确实如何处理。
  // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
  // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}
