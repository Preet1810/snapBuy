const dselect=require('dselect');

const config={
    search: true, // Toggle search feature. Default: false
    creatable: true, // Creatable selection. Default: false
    clearable: true, // Clearable selection. Default: false
    maxHeight: '360px', // Max height for showing scrollbar. Default: 360px
    size: '', // Can be "sm" or "lg". Default ''
}
dselect(document.querySelector('#select_box'), config)  