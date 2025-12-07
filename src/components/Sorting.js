import { MENU_URL } from "../../utils/constant";
const Sorting = (arr) => {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = Sorting(arr.slice(0, mid));
  let right = Sorting(arr.slice(mid));

  return merge(left, right);
};
const merge = (left, right) => {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i].info.avgRating > right[j].info.avgRating) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
};
export default Sorting;
