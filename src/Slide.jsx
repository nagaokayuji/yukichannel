import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const imgUrls = [
    "https://camo.githubusercontent.com/412ac08592ee0cb9fd3f1b2a3495c99eb90eb190b652911d19c036b010bde48c/68747470733a2f2f64327a6e6c387072643261356f382e636c6f756466726f6e742e6e65742f3133323038303232382d32376264633739312d366131372d343966342d626661632d6463393335333365316230622e676966",
    "https://camo.githubusercontent.com/3ff2fa16c0f73a665fb4105c6537294532b61c71f0025679e5450df50484561a/68747470733a2f2f64327a6e6c387072643261356f382e636c6f756466726f6e742e6e65742f3133323038303232332d64316363646462332d656333392d343334352d626132612d6465396366343939323430302e676966",
    "https://camo.githubusercontent.com/ce2b24f9ff6b4c22357d73dd1d93d1986e0adbd1348e8d6dd166006d5641e7c9/68747470733a2f2f64327a6e6c387072643261356f382e636c6f756466726f6e742e6e65742f3133323934373034322d36333737323265342d373032392d343133392d613732382d6666326433326566393264362e676966"
];

const Slide = () => {
    return (
        <>
            <Carousel indicators={false} nextLabel={null} prevLabel={null}>
                {imgUrls.map((url, index) => <Carousel.Item>
                    <img className="d-block w-100" src={url} alt={`yuki ${index}`} />
                </Carousel.Item>)}
            </Carousel>
        </>
    );
}

export default Slide
