const rating = async array => {
  let arrayReview = [];
  if (Array.isArray(array) === false) {
    arrayReview.push(array);
  } else {
    arrayReview = array;
  }

  let sum = 0;
  let count = 0;
  for (let i = 0; i < arrayReview.length; i++) {
    const ratings = await Review.findById(arrayReview[i]);
    if (ratings) {
      count++;
      sum += ratings.rating;
    }
  }
  return sum / count;
};
module.exports = rating;
