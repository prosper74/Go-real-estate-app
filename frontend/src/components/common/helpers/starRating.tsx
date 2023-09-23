import { StarIcon, StarHalfIcon } from "./svgIcons";

interface IProps {
  number: number;
  dimensions?: string;
}

const Rating = ({ number, dimensions }: IProps) => {
  const diff = 5 - Math.ceil(number);

  return (
    <>
      {[...Array(Math.floor(number))].map((_e, i) => (
        <StarIcon dimensions={dimensions && dimensions} key={i} />
      ))}
      {number % 1 !== 0 ? (
        <StarHalfIcon dimensions={dimensions && dimensions} />
      ) : null}
      {[...Array(diff)].map((_e, i) => (
        <StarIcon
          key={`${i}-empty`}
          dimensions={dimensions && dimensions}
          fill="none"
          outline="#FACA15"
        />
      ))}
    </>
  );
};

export default Rating;
