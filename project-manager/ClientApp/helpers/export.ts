export const downloadFile = (byteArray: Uint8Array) => {
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' }));
    a.download = 'Tasks_' + new Date().toLocaleString() + '.xlsx';
    a.click();
    a.remove();
}