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

const form_modal=document.getElementById("search_form");
const btn=document.getElementById("submit_but");
btn.addEventListener("click", function () {
    form_modal.submit();
});
// document.getElementById('submit_but').addEventListener("click", form_modal.submit());