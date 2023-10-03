import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import portrait from "../../Assets/me.jpeg";
import Particle from "../Particle";
import Type from "./Type";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const introduction = "Hi! I'm a senior at the University of Notre Dame studying Computer Science and Sustainability. I have experience in fullstack development and have interned at Twitch, WHOOP, and State Farm. My current goal is to learn as much as possible, so I am pursuing fulltime Fullstack or Backend opportunities in an environment that embraces new challenges."

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={5} style={{display:'flex', justifyContent:'right'}}>
              <img
                src={portrait}
                alt="pic of me"
                className="img-fluid"
                style={{ maxHeight: "300px" }}
              />
            </Col>
            <Col md={7}>

              <h1 className="heading-name">
                MEREDITH HELLER
              </h1>

              <div style={{ paddingLeft: 45, fontSize: 15 }}>
                <Type />
              </div>
              <div  style={{ paddingLeft: 45, fontSize: 10, color: "#0C907D", width: "75%" }}>
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
            <h1>CONNECT WITH ME</h1>
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
                  href="https://www.linkedin.com/in/meredithheller/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/meredithaheller"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
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
