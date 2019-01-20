//之前学的
window.jQuery =function(nodeOrSelector){
    let nodes={}
    nodes.addClass = function(){}
    nodes.html = function(){}
    return nodes
}
window.jQuery.ajax = function({url,method,body,successFn,failFn,headers}){
    // let url = options.url
    // let method = options.method
    // let body = options.body
    // let successFn = options.successFn
    // let failFn = options.failFn
    // let headers= options.headers
    // //ES6 析构复制
    // let {url,method,body,successFn,failFn,headers} = options
    let request = new XMLHttpRequest()
    request.open(method,url)//配置request
    for(let key in headers){
        let value =headers[key]
        request.setRequestHeader(key,value)
    }
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            if(request.status >= 200 && request.status<300){
                successFn.call(undefined,request.responseText)
            }else if(request.status >= 400){
                failFn.call(undefined,request)
            }
        }
    }
    request.send(body)
}

function f1(responseText){}
function f2(responseText){}
window.$ =window.jQuery
myButton.addEventListener('click', (e)=>{
    window.jQuery.ajax(
        {
            url:'',
            method:'',
            headers:{'Content-Type':'application/x-www-form-urlencoded',
                    'frank':'18'
        },
            body:'',
            successFn:(x)=>{
                f1.call(undefined,x)
                f2.call(undefined,x)
            },
            failFn:(x)=>{},
        }
    )
})









// myButton.addEventListener('click', (e)=>{
//     let request = new XMLHttpRequest()
//     //第一部分
//     request.open('POST','/xxx')//配置request
//     //第二部分
//     request.setRequestHeader('frank','18');
//     request.setRequestHeader('Content-Type','x-www-form-urlencoded');
//     //第四部分(get默认不展示第四部分)
//     request.send('我偏要设置第四部分')
//     request.onreadystatechange = ()=>{
//         if(request.readyState === 4){
//             console.log('请求响应完毕了')
//             console.log(request.status)
//             console.log(request.statusText)
//             if(request.status >= 200 && request.status<300){
//                 console.log('说明请求成功')
//                 console.log(request.getAllResponseHeaders())
//                 let string = request.responseText
//                 //把符合JSON字符串
//                 //转换成JS对象
//                 let object = window.JSON.parse(string)
//                 //JSON.parse 是浏览器提供的
//                 //document.getElementById 是浏览器提供的
//                 console.log(typeof object)
//                 console.log(object)
//                 console.log('object.note')
//                 console.log(object.note)
//                 console.log('object.note.from')
//                 console.log(object.note.from)
//             }else if(request.status >= 400){
//                 console.log('说明请求失败')
//             }
//         }
//     }
// })