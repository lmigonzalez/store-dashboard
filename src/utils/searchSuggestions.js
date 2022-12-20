export const orderProductNameSuggestion = (searchValue, arrayValues) => {
  let array = [];
  arrayValues.map((n) => {
    let newString = n.name.split(' ').join('');
    let newValue = searchValue.split(' ').join('');
    if (
      newString.toLowerCase().trim().includes(newValue.toLowerCase().trim())
    ) {
      array.push(n);
    }
  });

  if (searchValue.length === 0) {
    array = [];
  }

  return array;
};

export const orderClientNameSuggestion = (searchValue, arrayValues) => {
  let array = [];
  arrayValues.map((n) => {
    let newString = n.name.split(' ').join('');
    let newValue = searchValue.split(' ').join('');
    if (
      newString.toLowerCase().trim().includes(newValue.toLowerCase().trim())
      ) {
        array.push(n);
      }
    });
    
    if (searchValue.length === 0) {
      array = [];
    }
    
  return array;
};
