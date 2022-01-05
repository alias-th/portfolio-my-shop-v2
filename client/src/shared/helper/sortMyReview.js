function sortMyReview(array, user) {
  const firstArray = [];
  array.forEach((review) => {
    if (review.user.name === user.name) {
      return firstArray.unshift(review);
    }
  });

  return firstArray;
}

export default sortMyReview;
