function quicksort(arr, key) {
    if (arr.length <= 1) {
      return arr;
    }
    const pivot = arr[Math.floor(arr.length / 2)][key];
    const left = arr.filter(x => x[key] < pivot);
    const middle = arr.filter(x => x[key] === pivot);
    const right = arr.filter(x => x[key] > pivot);
    return quicksort(left, key).concat(middle, quicksort(right, key));
  }
  
  module.exports = { quicksort };
  