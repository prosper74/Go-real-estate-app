import { StarIcon } from "./svgIcons";

const Rating = ({ number, size }) => {
  const diff = 5 - Math.ceil(number);

  return (
    <>
      {[...Array(Math.floor(number))].map((e, i) => (
        <StarIcon key={i} />
      ))}
      {number % 1 !== 0 ? <StarHalf className={classes.size} /> : null}
      {[...Array(diff)].map((e, i) => (
        <StarBorder key={`${i}-empty`} className={classes.size} />
      ))}
    </>
  );
};

export default Rating;