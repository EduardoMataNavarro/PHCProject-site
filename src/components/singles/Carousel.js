import React, { Component } from 'react'
import { FaWizardsOfTheCoast } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../slider.css';

export default class MainCarousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [...this.props.Images]
        }
        this.settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            arrows: false
        };
    }
    render() {
        return (
            <Slider {...this.settings}>
                {
                    this.state.images &&
                        this.state.images.length > 0 ?
                        this.state.images.map((image, index) => {
                            return (
                                <div className="w-100" key={index}>
                                    <Link to="/">
                                        <img
                                            src={image.Path}
                                            alt=""
                                            className="img-fluid d-block m-auto" />
                                    </Link>
                                </div>
                            );
                        })
                        :
                        null
                }
                {
                    /*
            <div className="w-100">
                    <Link to="/">
                        <img
                            src="https://phcmenudeo.s3.amazonaws.com/front-slider-images/bc_gamer_48.jpg"
                            alt=""
                            className="img-fluid"/>
                    </Link>
                </div>
                <div className="w-100">
                    <Link to="/">
                        <img
                            src="https://phcmenudeo.s3.amazonaws.com/front-slider-images/bc_getttech_102.jpg"
                            alt="" 
                            className="img-fluid" />
                    </Link>
                </div>
                <div className="w-100">
                    <Link to="/">
                        <img
                            src="https://phcmenudeo.s3.amazonaws.com/front-slider-images/bc_logi_14.jpg"
                            alt="" 
                            className="img-fluid" />
                    </Link>
                </div>
                <div className="w-100">
                    <Link to="/">
                        <img
                            src="https://phcmenudeo.s3.amazonaws.com/front-slider-images/bc_stylos_108.jpg"
                            alt="" 
                            className="img-fluid" />
                    </Link>
                </div>
                    */
                }
            </Slider>
        )
    }
}
