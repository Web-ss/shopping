//效果

(function(doc,win){
    set();
    window.onresize=function(){
        set();
    };
    function set(){
        document.documentElement.style.fontSize=20*document.documentElement.clientWidth/320+'px';
    }
})(document,window);

window.addEventListener('DOMContentLoaded',function(){
        var oUl=document.querySelector('.banner ul');
        var aBtn=document.querySelectorAll('.btn span');
        var aLi=oUl.children;
        var x=-aLi[0].offsetWidth;
        //var y=0;
        var iNow=1;
        var now=0;
        var bReady=true;
        oUl.addEventListener('transitionend',function(){
            bReady=true;
            oUl.style.WebkitTransition='none';
            if(iNow==0){
                iNow=aLi.length-2;
            }else if(iNow==aLi.length-1){
                iNow=1;
            }
            btnCo();
            x=-aLi[0].offsetWidth*iNow;
            oUl.style.WebkitTransform='translate3d('+x+'px,'+'0,0)';
        },false);
        function btnCo(){
            for(var i=0;i<aBtn.length;i++){
                    aBtn[i].className='';
            }
            if(iNow==0){
                now=aBtn.length-1
            }else if(iNow==aLi.length-1){
                now=0;
            }else{
                now=iNow-1;
            };
            // alert(now)
            aBtn[now].className='active';
        };
        oUl.addEventListener('touchstart',function(ev){
            clearInterval(timer);
            if(!bReady)return;
            bReady=false;
            var downX=ev.targetTouches[0].pageX;
            var disX=downX-x;

            //var disY=ev.targetTouches[0].pageY-y;
            function fnMove(ev){
                x=ev.targetTouches[0].pageX-disX;
                //y=ev.targetTouches[0].pageY-disY;
                oUl.style.WebkitTransform='translate3d('+x+'px,'+'0,0)';
            };
            function fnEnd(ev){
                set();
                var upX=ev.changedTouches[0].pageX;
                var changeX=Math.abs(upX-downX);
                oUl.style.WebkitTransition='.4s linear all';
                if(changeX>50){
                    if(upX>downX){
                        iNow--;
                    }else{
                        iNow++;
                    }
                }
                btnCo();
                x=-aLi[0].offsetWidth*iNow;
                oUl.style.WebkitTransform='translate3d('+x+'px,'+'0,0)';
                document.removeEventListener('touchmove',fnMove,false);
                document.removeEventListener('touchend',fnEnd,false);
            };
            document.addEventListener('touchmove',fnMove,false);
            document.addEventListener('touchend',fnEnd,false);
            ev.preventDefault();
        },false);
        var timer=null;
        set();
        function set(){
            timer=setInterval(function(){
            iNow++;
            btnCo();
            oUl.style.WebkitTransition='.4s linear all';
            x=-aLi[0].offsetWidth*iNow;
            oUl.style.WebkitTransform='translate3d('+x+'px,'+'0,0)';
        },3000);
        }
    },false);