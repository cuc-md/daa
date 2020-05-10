import React, {Component} from 'react';
import Carousel from "@brainhubeu/react-carousel";
import image1 from '../../assets/carousel/image1.png';
import image2 from '../../assets/carousel/image2.png';
import image3 from '../../assets/carousel/image3.png';
import '../Utils/Carousel/Carousel.css';
import './Home.css';

class Home extends Component {

    render() {
        return <div className="main">
            <Carousel arrows infinite>
                <img src={image2} alt="" className="carouselImage"/>
                <img src={image1} alt="" className="carouselImage"/>
                <img src={image3} alt="" className="carouselImage"/>
            </Carousel>
        </div>
    }
}

export default Home;
