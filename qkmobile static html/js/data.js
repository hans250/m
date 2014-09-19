//F2E填充静态数据用js，线上环境需要删除的js文件
function data(id,num){
	var elem = document.getElementById(id);
    function cleanWhitespace(oEelement){
     for(var i=0;i<oEelement.childNodes.length;i++){
      var node=oEelement.childNodes[i];
      if(node.nodeType==3 && !/\S/.test(node.nodeValue)){node.parentNode.removeChild(node)}
      }
    }
    cleanWhitespace(elem);
    var last = elem.lastChild.outerHTML;
    var tmp = '';
    for(i = 0; i < num; i++){
    	tmp += last;
    };
    elem.innerHTML += tmp;
};