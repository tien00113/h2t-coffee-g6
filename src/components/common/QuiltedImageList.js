import { ImageList, ImageListItem } from '@mui/material';
import * as React from 'react';
import { BsFullscreen } from 'react-icons/bs';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      variant="quilted"
      cols={4}
      rowHeight={250}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://cdn.pixabay.com/photo/2015/07/12/14/26/coffee-842020_1280.jpg',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
    className:'img1',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1280.jpg',
    title: 'Burger',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2016/10/30/09/30/hot-chocolate-1782623_1280.jpg',
    title: 'Camera',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2015/06/24/01/15/coffee-819362_1280.jpg',
    title: 'Coffee',
    cols:2,
  },
];

