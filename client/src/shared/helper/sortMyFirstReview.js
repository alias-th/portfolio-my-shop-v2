function sortMyFirstReview(array, user) {
  const firstArray = [];
  array.forEach((review) => {
    if (review.user.name === user.name) {
      return firstArray.unshift(review);
    } else {
      return firstArray.push(review);
    }
  });

  return firstArray;
}

export default sortMyFirstReview;
