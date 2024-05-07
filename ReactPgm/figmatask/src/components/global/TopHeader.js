export default function TopHeader() {
  return (
    <div style={{position: "fixed",
    width: "100%",
    zIndex: 1000,
    }}>
      <div style={{ backgroundColor: "black", color: "white", height: "45px", paddingTop: "10px", textAlign: "center" }}>
        <p style={{ margin: "0", display: "inline" }}>Summer Sale For All Swim Suits And Free Express Delivery- OFF 50%!</p>
        <a style={{ margin: "0", display: "inline", color: "white" }} href="#">Shop Now</a>
      </div>
    </div>
  );
}
