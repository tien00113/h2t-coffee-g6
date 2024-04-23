import React from 'react'
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io';

const ProductRating = ({rating}) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars.push(<IoMdStar key={i} />);
        } else if (i - rating < 1 && i - rating > 0) {
            stars.push(<IoMdStarHalf key={i} />);
        } else {
            stars.push(<IoMdStarOutline key={i} />);
        }
    }
    return <span className="rating_star">{stars}</span>;
}

export default ProductRating