const but = document.querySelector('.btn');
const icon1 = document.querySelector('.icon1');  
const icon2 = document.querySelector('.icon2'); ; 

but.addEventListener('click', () => {
  if (icon1.style.display === 'block') {
    icon1.style.display = 'none';
    icon2.style.display = 'block';
  } else {
    icon2.style.display = 'none';
    icon1.style.display = 'block';
  }
});