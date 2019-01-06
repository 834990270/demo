window.jQuery = function(nodeOrselector) {
    let node = {}
    if(typeof nodeOrselector==='string'){
        let temp= document.querySelectorAll(nodeOrselector)
        for(let i=0;i <temp.length;i++){
        nodes[i] = temp[i]
        }
        nodes.length=temp.length
    }else if(nodeOrselector instanceof Node){
        nodes = {0:nodeOrselector,length:1}
    }
    nodes.addclass=function(classes){
        classes.forEach((value)=>{
        for(let i=0; i<nodes.length; i++){
            nodes[i].classList.add(value)
        }
    })
    }
    nodes.Text =function(){
        if(text === undefined){
            var texts=[]
            for(let i= 0;i<nodes.length; i++){
                texts.push(nodes[i].textContent)
            }
            return texts    
        }else{
            for(let i=0; i<nodes.lenght; i++){
                nodes[i].textContent=text
            }
        }
    }
        return nodes
}


window.$ = jQuery

var $div = $('div')
$div.addClass('red') // 可将所有 div 的 class 添加一个 red
$div.setText('hi') // 可将所有 div 的 textContent 变为 hi