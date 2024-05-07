import "./services.css";

const Services = () => {
  return (
    <>
      <div className="container">
        <h1 className="container__heading">Our Sevices</h1>
        <div className="container__box">
          <div className="box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/888/888859.png?w=740&t=st=1677916471~exp=1677917071~hmac=827af8ac831a0bb7d0b81be0893374f854d05dd02adfaeffb66149b744d2cf97"
              alt=""
              height="120px"
              width="200px"
            />
            <h3>HTML5</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt,
              soluta.
            </p>
            <a href="" className="btn">
              Read More
            </a>
          </div>
          <div className="box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/919/919826.png?w=740&t=st=1677916869~exp=1677917469~hmac=0543aa1335360aac66f18c8110ffbd21b085825c31d92ffa0e6ad7874027ccd9"
              alt=""
              height="120px"
              width="200px"
            />
            <h3>CSS3</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt,
              soluta.
            </p>
            <a href="" className="btn">
              Read More
            </a>
          </div>
          <div className="box">
            <img
              src="https://img.freepik.com/free-icon/javascript_318-698169.jpg?size=338&ext=jpg&uid=R95218254&ga=GA1.1.1791957629.1674016057&semt=sph"
              alt=""
              height="120px"
              width="200px"
            />
            <h3>JavaScript</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt,
              soluta.
            </p>
            <a href="" className="btn">
              Read More
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
