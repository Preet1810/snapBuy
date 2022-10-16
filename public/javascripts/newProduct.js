const config={
    search: true, // Toggle search feature. Default: false
    creatable: false, // Creatable selection. Default: false
    clearable: true, // Clearable selection. Default: false
    maxHeight: '180px', // Max height for showing scrollbar. Default: 360px
    size: '', // Can be "sm" or "lg". Default ''
}
dselect(document.querySelector('#select_box'), config)