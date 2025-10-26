export const numbers = [
  500, 18, 1, 2, 3, 4, 2, 5, 1, 3, 4, 2, 6, 1, 50, -10, 5, 3, 4, 7, 2, 1, 3, 5, 4, 6, 2, 1, 3, 7, 4, 5,
  2, 1,
];

const selectionSort = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    let currentMinIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[currentMinIndex]) {
        currentMinIndex = j;
      }
    }

    if (i !== currentMinIndex) {
      [array[i], array[currentMinIndex]] = [array[currentMinIndex], array[i]];
    }
  }
};

selectionSort(numbers);

console.log(numbers);
