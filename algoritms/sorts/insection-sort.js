export const numbers = [
  500, 18, 1, 2, 3, 4, 2, 55, 5, 1, 3, 4, 2, 6, 1, 50, -10, 5, 3, 4, 7, 2, 1, 3, 5, 4, 6, 2, 1, 3,
  7, 4, 5, 2, 1, 124, -125,
];

const insectionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const tempValue = array[i];

    let j = i - 1;

    while (j >= 0 && array[j] > tempValue) {
      array[j + 1] = array[j];
      array[j] = tempValue;
      j--;
    }
  }
};

insectionSort(numbers);

console.log(numbers);
