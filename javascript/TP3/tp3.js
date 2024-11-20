const dialog = document.getElementById('myDialog');
const showDialog = document.getElementById('show-dialog');
const closeDialog = document.getElementById('close-dialog');

showDialog.addEventListener('click', () => dialog.showModal());
closeDialog.addEventListener('click', () => dialog.close());