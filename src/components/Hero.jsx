import Carousel from 'react-bootstrap/Carousel'

const imagePath = (img) =>
  new URL(`../assets/images/${img}`, import.meta.url).href

export default function Hero() {
  return (
    <section id="home" className="hero-section">

      <Carousel fade interval={3500} controls indicators>
        <Carousel.Item>
          <img
            className="d-block w-100 home-slide"
            src={imagePath("h1.jpg")}
            alt="Slide 1"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 home-slide"
            src={imagePath("h2.jpg")}
            alt="Slide 2"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 home-slide"
            src={imagePath("h3.jpg")}
            alt="Slide 3"
          />
        </Carousel.Item>
      </Carousel>

      <div className="hero-content">
        <h1>Ruchi Mandal</h1>
        <p>Where Every Bite Tells a Story of Taste & Tradition</p>
        <a href="#menu" className="hero-btn">Explore Menu</a>
      </div>

    </section>
  )
}
