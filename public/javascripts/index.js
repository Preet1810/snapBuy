$(document).ready(function () {
    $(document).on('click', '.modalbtn', function () {
        const productname=$(this).closest('div').find('#productname').text();
        const sellername=$(this).closest('div').find('#sellername').text();
        const nproduct=productname.replace(/\s+/g, ' ').trim();
        const nseller=sellername.replace(/\s+/g, ' ').trim();
        // console.log(nproduct)
        $('#exampleModal').modal('show')
        $('#pname').val(nproduct);
        $('#sname').val(nseller);

    });
})

document.getElementsByClassName('pagenation')[0].addEventListener("click", GetURL());

function GetURL() {
    const list=document.querySelectorAll(".pagination li a");
    const curr=document.URL
    // console.log(curr)
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
            list[b].href=list[b].href+list[b].innerText;
        }
    }
}



// function idk() {
//     let gfg=document.URL;
//     const hehe=document.getElementById('idk');
//     hehe.innerHTML=gfg
// }
