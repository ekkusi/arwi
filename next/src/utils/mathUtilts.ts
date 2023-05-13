export function stdev(arr: number[], meanParam?: number) {
  // Creating the mean with Array.reduce
  const mean =
    meanParam ||
    arr.reduce((acc, current) => {
      return acc + current;
    }, 0) / arr.length;

  // Assigning (value - mean) ^ 2 to every array item
  const newArr = arr.map((k) => {
    return (k - mean) ** 2;
  });

  // Calculating the sum of updated array
  const sum = newArr.reduce((acc, current) => acc + current, 0);

  // Returning the standard deviation
  return Math.sqrt(sum / arr.length);
}
