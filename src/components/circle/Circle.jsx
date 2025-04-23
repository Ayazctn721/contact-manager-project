import './Circle.css';

function Circle({ width, positionX, positionY }) {
  const styles = {
    width: width,
    height: width,
    top: positionY,
    left: positionX,
  };
  return <div className="circle" style={styles}></div>;
}

export default Circle;
