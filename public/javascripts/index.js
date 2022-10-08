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

// $(function () {

//     $("#search_form").validate({
//         rules: {
//             productname: {
//                 required: true,
//                 minlength: 8
//             },
//             action: "required"
//         },
//         messages: {
//             productname: {
//                 required: "Please enter some data",
//                 minlength: "Your data must be at least 8 characters"
//             },
//             action: "Please provide some data"
//         }
//     });
// });
