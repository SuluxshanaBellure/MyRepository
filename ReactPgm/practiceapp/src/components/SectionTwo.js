import MyCarousel from "./MyCarousel";


const SectionTwo=()=>{
    return(
        <div style={{height:"850px",backgroundColor:"#f5f5ef"}}>
            <br></br>
          <h1 style={{ fontSize: "60px" }}>Join a community <br></br>of millions</h1><br></br>
          <p style={{ fontSize: "25px", fontFamily: "Georgia, serif" }}>You’re not alone. Two million developers from all over the world visit the React<br></br>
          docs every month. React is something that people and teams can agree on.</p><br></br>
          <MyCarousel/><br></br>
          <p style={{ fontSize: "25px", fontFamily: "Georgia, serif" }}>This is why React is more than a library, an architecture, or even an ecosystem.<br></br>
          React is a community. It’s a place where you can ask for help, find opportunities,<br></br>
          and meet new friends. You will meet both developers and designers, beginners<br></br>
          and experts, researchers and artists, teachers and students. Our backgrounds<br></br>
          may be very different, but React lets us all create user interfaces together.</p>
          </div>
    )
}

export default SectionTwo;