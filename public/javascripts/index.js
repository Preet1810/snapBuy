$(document).ready(function () {
    $(document).on('click', '.modalbtn', function () {
        // const productname=$('#productname').text();
        const productname=$(this).closest('div').find('#productname').text();
        const sellername=$(this).closest('div').find('#sellername').text();
        const nproduct=productname.replace(/\s+/g, ' ').trim();
        const nseller=sellername.replace(/\s+/g, ' ').trim();
        $('#exampleModal').modal('show')
        $('#pname').val(nproduct);
        $('#sname').val(nseller);

    });
})

function form_submit() {
    document.getElementById("search_form").submit();
}

function GetURL() {
    const list=document.querySelectorAll(".pagination li a");
    const less=document.getElementById('less');
    const curr=document.URL
    for (let b=0; b<list.length; b++) {
        if (curr.includes('search=')) {
            // let newCurr=curr.replace(/page=/+b, 'page='+b)
            // list[b].href=newCurr;
            if (curr.includes('page=')) {
                let newCurr=curr.slice(0, -1);
                let moreCurr=newCurr.replace(/page=/, 'page='+b)
                list[b].href=moreCurr;
            } else {
                list[b].href=curr+'&page='+b;
            }
        }
        else {
            list[b].href=list[b].href+b;
        }
        // list[b].href=curr;
        // let newCurr=curr.replace(/page=1/, 'page='+b)
        // list[b].href=newCurr;

        // less.href = less.href+'?page='+
    }
}

// function idk() {
//     let gfg=document.URL;
//     const hehe=document.getElementById('idk');
//     hehe.innerHTML=gfg
// }
