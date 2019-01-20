
myButton.addEventListener('click', (e)=>{
    window.jQuery.ajax(
        {
            url:'',
            method:'get',
        }
    )
}).then(//then的中文含义：然后
    (responseText)=>{console.log(responseText);
        return responseText
    },
    (request)=>{console.log('error1');
        return '已处理'
    }
).then(
    (上一次的处理结果)=>{上一次的处理结果},
    (request)=>{console.log('error2')}
)


