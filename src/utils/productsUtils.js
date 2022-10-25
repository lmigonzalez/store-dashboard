

export const findByName = (data, match, selected) => {
  let array = [];

	// console.log(data)
  data.map((n) => {
    if (n[selected].toString().includes(match)) {
      array.push(n);
    }
  });

  return array;
};
