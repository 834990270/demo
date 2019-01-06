window.jQuery = function(nodeOrselector){
    /*获取并重构nodes对象*/
    let nodes = {}
    if(typeof nodeOrselector==='string'){
        let temp= document.querySelectorAll(nodeOrselector);//伪数组
        for(let i=0;i<temp.length;i++){
        nodes[i] = temp[i];
        }
        nodes.length=temp.length
    }else if(nodeOrselector instanceof Node){
        nodes = {0:nodeOrselector,length:1};
    }
    /*给对象nodes添加方法addClass（函数属性）*/
    nodes.addclass=function(classes){
      //把classes值通过forEach函数传进去
        classes.forEach((value)=>{
        for(let i=0;i<nodes.length;i++){
            nodes[i].classList.add(value);
        }
    });
    }
      /*给对象nodes添加方法Text（函数属性）*/
    nodes.Text =function(){
        if(text === undefined){
            var texts=[]
            for(let i= 0;i<nodes.length; i++){
                texts.push(nodes[i].textContent)
            }
            return texts    
        }else{
            for(let i=0; i<nodes.lenght; i++){
                nodes[i].textContent=text;
            }
        }
    }
        return nodes
}


window.$ = jQuery
var $div = $('div')
$div.addClass(['red']) // 可将所有 div 的 class 添加一个 red
$div.setText('hi') // 可将所有 div 的 textContent 变为 hi