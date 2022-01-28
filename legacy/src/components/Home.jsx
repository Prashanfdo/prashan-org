import React from "react";
import Social from "./Social";

const Home = () => {
  return (
    <>
      <div className="tokyo_tm_home">
        <div className="home_content">
          <div className="avatar">
            <div
              className="image avatar_img"
              style={{
                filter: "grayscale(90%)",
                backgroundImage: "url(assets/img/home/prashan.jpg)",
              }}></div>
          </div>

          <div className="details">
            <h3 className="name">Prashan Fernando</h3>
            <p className="job">
              Fullstack Developer with 10+ years of experience, Certified Azure Architect with a
              passion for software development
            </p>

            <Social />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
