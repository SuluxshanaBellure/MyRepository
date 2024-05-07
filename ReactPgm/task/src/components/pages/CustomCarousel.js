import { Container, Row, Col, Carousel } from "react-bootstrap";

export default function CustomCarousel() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Carousel fade>
              <Carousel.Item interval={500}>
                <img src="images/image1.png" />
              </Carousel.Item>
              <Carousel.Item interval={500}>
                <img src="images/image2.png" />
              </Carousel.Item>
              <Carousel.Item interval={500}>
                <img src="images/image3.png" />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
}
