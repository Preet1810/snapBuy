function GetURL() {
    const list=document.querySelectorAll(".pagination li a");
    // const less=document.getElementById('less');
    const curr=document.URL
    for (let b=0; b<list.length; b++) {
        if (curr.includes('search=')) {
            if (curr.includes('page=')) {
                let newCurr=curr.slice(0, -1);
                let moreCurr=newCurr.replace(/page=/, 'page='+b)
                list[b].href=moreCurr;
            } else {
                list[b].href=curr+'&page='+b;
            }
        }
        else {
            // console.log(list[b].href+b-1)
            list[b].href=list[b].href+b;
            // less.href=b;
        }
    }
}