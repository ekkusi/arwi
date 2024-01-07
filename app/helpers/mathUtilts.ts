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

export function median(arr: number[]) {
  const sorted = [...arr].sort((a, b) => a - b);
  const isEven = sorted.length % 2 === 0;

  const middle = (arr.length + 1) / 2;

  return isEven ? (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2 : sorted[middle - 1];
}

export function mode(arr: number[]) {
  const res: { [id: number]: number } = {};
  let max = 0;
  let count = 0;

  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i];

    if (res[item]) {
      res[item] += 1;
    } else {
      res[item] = 1;
    }

    if (count < res[item]) {
      max = item;
      count = res[item];
    }
  }

  return max;
}

// Divide 100 into int percentages
export const dividePercentages = (parts: number) => {
  const individualAmount = Math.floor(100 / parts);
  const total = individualAmount * parts;
  const remainder = 100 - total;
  const percentages = Array(parts).fill(individualAmount);

  for (let i = 0; i < remainder; i += 1) {
    percentages[i] += 1;
  }

  return percentages;
};
