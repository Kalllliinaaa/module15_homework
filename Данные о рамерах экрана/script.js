const btn = document.querySelector('.data');

btn.addEventListener('click', () => {
    alert('Высота экрана :' + document.documentElement.clientHeight + '    ' + 'Ширина экрана:' + document.documentElement.clientWidth);
});