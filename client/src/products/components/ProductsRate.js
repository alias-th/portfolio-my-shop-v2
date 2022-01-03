import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React, { useMemo, useState } from "react";

const ProductsRate = ({
  count,
  rating,
  colorFilled,
  colorUnfilled,
  onRating,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const starRating = useMemo(() => {
    const getColor = (index) => {
      if (hoverRating >= index) {
        return colorFilled;
      } else if (!hoverRating && rating >= index) {
        return colorFilled;
      }

      return colorUnfilled;
    };

    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FontAwesomeIcon
          key={idx}
          className="cursor-pointer"
          icon={faStar}
          onClick={() => onRating(idx)}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ));
  }, [count, onRating, colorFilled, colorUnfilled, hoverRating, rating]);

  return <div>{starRating}</div>;
};

ProductsRate.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
  colorFilled: PropTypes.string,
  colorUnfilled: PropTypes.string,
};

ProductsRate.defaultProps = {
  count: 5,
  rating: 0,
  colorFilled: "#f5eb3b",
  colorUnfilled: "#DCDCDC",
};

export default ProductsRate;
