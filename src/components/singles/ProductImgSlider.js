import React, { Component } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import '../../slider.css'

export default class ProductImgSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [
                'https://source.unsplash.com/random/512x300',
                'https://source.unsplash.com/random/512x300',
                'https://source.unsplash.com/random/512x300',
                'https://source.unsplash.com/random/512x300',
                'https://source.unsplash.com/random/512x300'
            ]
        }

        this.slidePaging = this.slidePaging.bind(this);

    }

    slidePaging(index) {
        return (
            <a>
                <img src={this.state.images[index]} />
            </a>
        );
    }
    render() {
        const settings = {
            customPaging: this.slidePaging,
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <Slider {...settings}>
                <div className="w-100"> 
                    <img src={this.state.images[0]} className="img-fluid"/>
                </div>
                <div className="w-100">
                    <img src={this.state.images[1]} className="img-fluid"/>
                </div>
                <div className="w-100">
                    <img src={this.state.images[2]} className="img-fluid"/>
                </div>
                <div className="w-100">
                    <img src={this.state.images[3]} className="img-fluid"/>
                </div>
                <div className="w-100">
                    <img src={this.state.images[4]} className="img-fluid"/>
                </div>
            </Slider>
        );
    }
}
