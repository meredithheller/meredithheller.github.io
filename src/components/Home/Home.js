import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import portrait from "../../Assets/portrait.jpeg";
import Particle from "../Particle";
import Type from "./Type";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn, FaPinterest } from "react-icons/fa";
import { BiRun } from "react-icons/bi";

const introduction = ` Hi! I'm Meredith, a first year post-grad currently roaming NYC. By the day, I spend my time contributing to one of my favorite platforms, 
  Pinterest, as a full stack software engineer. Outside the hours of 9-5, you'll find me on a constant pursuit for more Strava kudos, 
  dreaming up my next travel adventure, or scouring Depop for the best wardrobe additions. This website is a bitwise representation of my thoughts, 
  interests, and aspirations. Welcome to the chaos!
`

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content" fluid >
          <Row>
            <Col md={3}>
              <img
                src={portrait}
                alt="pic of me"
                className="img-fluid"
                style={{ paddingLeft: 50, maxHeight: 450}}
              />
            </Col>
            <Col>
              <p className="heading-name">
                MEREDITH HELLER
              </p>
              <div style={{ fontSize: 15 }}>
                <Type />
              </div>
              <div  style={{ fontSize: 10, color: "#0C907D", width: "75%" }}>
                <p className="home-about-body">
                  {introduction}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ELSEWHERE:</h1>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/meredithheller"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/meredith-heller/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/meredithaheller/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.pinterest.com/meredithaheller/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaPinterest />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.strava.com/athletes/119643556"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <BiRun />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
    </section>
  );
}

export default Home;
