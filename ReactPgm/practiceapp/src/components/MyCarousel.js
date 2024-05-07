import React from 'react';
import {Container,Row,Col, Carousel} from 'react-bootstrap';
const MyCarousel=()=>{
    return(
        <>
        {/* <Container fluid/> */}
          <Container >
            <Row>
                <Col>
                {/* <Carousel fade variant='dark'> */}
                   <Carousel fade >
                    <Carousel.Item interval={500}>
                    {/* <img className='d-block w-100' src="images/bird1.png"/> */}
                        <img src="images/bird1.png"/>
                        <Carousel.Caption>
                            <h2>First Bird</h2>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img src="images/bird2.png"/>
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img src="images/bird3.png"/>
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img src="images/bird4.png"/>
                    </Carousel.Item>
                   </Carousel>
                </Col>
            </Row>
          </Container>
          </>
    )
}

export default MyCarousel;