export const numbers = [
  1, 2, 3, 4, 2, 5, 1, 3, 4, 2, 6, 1, 5, 3, 4, 7, 2, 1, 3, 5, 4, 6, 2, 1, 3, 7, 4, 5, 2, 1,
];

const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
};

bubbleSort(numbers);

console.log(numbers);
