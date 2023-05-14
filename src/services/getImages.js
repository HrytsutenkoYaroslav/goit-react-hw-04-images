import axios from 'axios';

const getImages = (nameSearchImage, page) => {
  const KEY_PIXABAY = '33151516-86a0165a6b4455c1503ffac76';
  const BASE_URL = 'https://pixabay.com/api/?key=';

  return axios.get(
    `${BASE_URL}${KEY_PIXABAY}&q=${nameSearchImage}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
};

export default getImages;
