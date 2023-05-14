
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { AppDiv } from './App.styled';
import getImages from 'services/getImages';

const App = () => {
  const [nameSearchImage, setNameSearchImage] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [nameSearchImage, page]);

  const handleFormSubmit = nameSearchImage => {
    setNameSearchImage(nameSearchImage);
    setImages([]);
    setPage(1);
    setTotalHits(null);
  };

  const handleIncrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const fetchImages = () => {
    if (nameSearchImage.trim() === '') {
      return;
    }

    setLoading(true);

    getImages(nameSearchImage, page)
      .then(result => {
        setImages(prevImages => [...prevImages, ...result.data.hits]);
        setTotalHits(result.data.totalHits);
        setLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        setLoading(false);
      });
  };

  return (
    <AppDiv>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        nameSearchImage={nameSearchImage}
        images={images}
        loading={loading}
        totalHits={totalHits}
        onIncrementPage={handleIncrementPage}
      />
    </AppDiv>
  );
};

App.propTypes = {
  nameSearchImage: PropTypes.string,
  images: PropTypes.array,
  loading: PropTypes.bool,
  totalHits: PropTypes.number,
  onIncrementPage: PropTypes.func,
};

export default App;



