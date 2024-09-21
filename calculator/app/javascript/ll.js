const update = (result) => {
  screen.innerText = !result ? '0' : result;
};

getNumbers.forEach((item) => {
  const showNumber = (value1) => {
    const ShowNumberEnter = (event) => event === `${item}` && showNumber();
    // بجيب القيمة اللي جوه ال items
    const value = item.innerText;
    //اتأكد ان ال "." مش هتتكرر مرتين او لو موجوده متتكتبش تاني
    if (value === '.' && current.includes('.')) return;
    //اتأكد ان ال "0" مش هتتكرر مرتين او لو موجوده متتكتبش تاني
    if (value === '0' && !current) return;
    // لو محصلش اللي فوق طبق ده
    current += value;
    update(current);
  };

  item.addEventListener('click', () => {
    if (item.dataset.type === 'number') {
      showNumber(value1);
    }
  });
});
