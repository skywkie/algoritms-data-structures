export const numbers = [
  1, 2, 3, 4, 2, 5, 1, 3, 4, 9, 2, 6, 1, 5, 3, 12, 165, 4, 7, 2, 1, 3, 5, 4, 6, 2, 1, 3, 7, 4, 5, 2, 1,
  8,
];

const binarySearch = (sortedArray, seek) => {
  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  while (startIndex <= endIndex) {
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
    console.log(startIndex, middleIndex, endIndex);

    if (seek === sortedArray[middleIndex]) {
      return sortedArray[middleIndex];
    } else if (seek < sortedArray[middleIndex]) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }

  return null;
};

const seek = binarySearch(
  numbers.sort((a, b) => b - a),
  9
);

console.log(seek);
