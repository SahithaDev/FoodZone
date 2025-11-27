import { MENU_URL } from "../../utils/constant";
const mergersort = (arr) => {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.silce(mid);

  return merge(left, right);
};
const merge = (left, right) => {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i].info.avgRating > right[i].info.avgRating) {
      result.push(left[i]);
    } else {
      result.push(right[i]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
};
