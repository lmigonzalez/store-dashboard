export const findByName = (data, match, selected) => {
  let array = [];

  console.log(match);

  data.map((value) => {
    let newValue = value[selected].toLowerCase().split(' ').join('');
    let newMatch = match.toLowerCase().split(' ').join('');

    if (newValue.toString().includes(newMatch)) {
      array.push(value);
    }
  });

  return array;
};
