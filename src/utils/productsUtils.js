export const findByName = (data, match, selected) => {
  let array = [];
  data.map((value) => {
  
    let newValue = value[selected].toString().toLowerCase().split(' ').join('');
    let newMatch = match.toString().toLowerCase().split(' ').join('');

    if (newValue.toString().includes(newMatch)) {
      array.push(value);
    }
  });

  return array;
};
