//import MyCarousel from "../MyCarousel";
import Buttons from "../global/Buttons";
import bodyimage from "../global/bodyimage.png";
import SectionTwo from "../SectionTwo";
import SectionThree from "../SectionThree";

export default function HomePage({ pone, ptwo }) {
  return (
    <>
      <br></br>
      {/* <MyCarousel/> */}
      <img src={bodyimage} alt="Logo" />
      <h1 style={{ fontSize: "60px" }}>React</h1>
      <p style={{ fontSize: "25px", fontFamily: "Georgia, serif" }}>
        The library for web and native user interfaces
      </p>

      <Buttons url="/learn" />
      <br></br>
      <br></br>
      <br></br>
      <section
        style={{
          backgroundColor: "#f5f5ef",
          height: "400px",
          paddingTop: "90px",
        }}
      >
        <h1 style={{ fontSize: "60px" }}>
          Create user interfaces <br></br>from components
        </h1>
        <br></br>

        <p style={{ fontSize: "25px", fontFamily: "Georgia, serif" }}>
          {pone}
          <br></br>
          {ptwo}
          <br></br>
          Then combine them into entire screens,pages, and apps.
        </p>
      </section>
      
      <br></br>
      <SectionThree/>
      <br></br>
      <SectionTwo/>
      <br></br>
      
    </>
  );
}

