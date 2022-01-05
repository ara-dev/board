export function usePrice(price: number, digit = true, unit = 'تومان') {
  const _price = price
  if (digit) {
    _price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return `${_price} ${unit}`
}

/*
import moment from 'moment-jalaali';

Vue.filter('price', (val) => {
  if (val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return val;
});

Vue.filter('priceUnit', (val) => {
  if (val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' تومان ';
  }
  return val;
});


Vue.filter('jdate', (val) => {
  if (val) {
    return moment(val).format('jYY/jMM/jDD-hh:mm:ss');
  }
  return val;
});*/
