$(document).ready(function () {
    $(document).on('click', '.modalbtn', function () {
        // const productname=$('#productname').text();
        const productname=$(this).closest('div').find('#productname').text();
        $('#exampleModal').modal('show')
        $('#service').val(productname);
    });
})