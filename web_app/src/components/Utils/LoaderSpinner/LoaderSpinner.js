import React from 'react';
import Loader from 'react-loader-spinner';

const LoaderSpinner = () => {
    return <Loader
        type="ThreeDots"
        color="rgb(165, 163, 159)"
        height={40}
        width={40}
    />;
};

export default LoaderSpinner;
