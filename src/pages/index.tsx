import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import Loader from '../../components/Loader';
// import ErrorView from '../../components/ErrorView';
import { unsplashAction, unsplashSelector } from '../features/ImageGrid/slice';
import { END } from 'redux-saga';
// import './styles.css';
import wrapper from '../store/configureStore';

const ImageGrid = () => {
  const dispatch = useDispatch();
  const { isLoading, images, error } = useSelector(unsplashSelector.all);

  // useEffect(() => {
  //   const { load } = unsplashAction;
  //   dispatch(load());
  // }, []);
  // if (isLoading) {
  //   return <Loader />;
  // }
  // if (error) {
  //   return <ErrorView />;
  // }

  return (
    <div className="content">
      <section className="grid">
        {images.map(image => (
          <div key={image.id} className={`item item-${Math.ceil(image.height / image.width)}`}>
            <img src={image.urls.small} alt={image.user.username} />
          </div>
        ))}
      </section>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const { load } = unsplashAction;
  context.store.dispatch(load());

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default ImageGrid;
