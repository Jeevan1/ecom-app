export const getStarIcons = (rating, totalStars = 5) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStars;

  const starIcons = [];

  for (let i = 0; i < fullStars; i++) {
    starIcons.push("star");
  }
  for (let i = 0; i < halfStars; i++) {
    starIcons.push("star-half");
  }
  for (let i = 0; i < emptyStars; i++) {
    starIcons.push("star-outline");
  }

  return starIcons;
};
