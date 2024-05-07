// import SideBar from "../SideBar";

// export default function LearnPage() {
//   return (
//     <>
//     <div>
//       <br></br>
//       <div className="sidebar"><SideBar/></div>
//       <div className="content">
//       <h2> welcome to Learn page............!</h2>
//       </div>
//       </div>
//     </>
//   );
// }

import SideBar from "../SideBar";

export default function LearnPage() {
  const sidebar={
    width:"25%",
    textAlign:"left",
  };
  const content={
    flex: "1", 
    textAlign: "center",
    paddingRight: "10%",
  };
  const container = {
    display: "flex",
    width: "100%",
  }; 
  return (
    <>
    <br></br><br></br>
    <div style={container}>
      <div className="sidebar" style={sidebar}><SideBar/></div>
      <div className="content" style={content}>
      <h2> welcome to Learn page............!</h2>
      </div>
      </div>
    </>
  );
}
