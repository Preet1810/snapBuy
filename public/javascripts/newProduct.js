// $(function () {
//     $('.form-select').selectpicker();
// });

document.getElementsByClassName('previewMultiple')[0].addEventListener("change", previewMultiple)


function previewMultiple(event) {
    document.getElementById("formFile").innerHTML="";
    const images=document.getElementById("image");
    const number=images.files.length;
    for (i=0; i<number; i++) {
        const urls=URL.createObjectURL(event.target.files[i]);
        document.getElementById("formFile").innerHTML+='<img src="'+urls+'">';
    }
}

const form_product=document.getElementById("add_product");
const btn=document.getElementById("submit_but");
btn.addEventListener("click", function () {
    form_product.submit();
});



// const config={
//     search: true, // Toggle search feature. Default: false
//     creatable: false, // Creatable selection. Default: false
//     clearable: true, // Clearable selection. Default: false
//     maxHeight: '180px', // Max height for showing scrollbar. Default: 360px
//     size: '', // Can be "sm" or "lg". Default ''
// }
// dselect(document.querySelector('#select_box'), config)