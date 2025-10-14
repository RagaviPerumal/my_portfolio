import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard"; // Make sure you have renamed Projectscard.js to ProjectCard.js
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "Cloud DDoS Mitigation System",
      description: "A cloud security solution that automatically detects, blocks, and recovers from DDoS attacks. Tools: Python, AWS, Docker, Grafana, Scapy.",
      imgUrl: projImg1,
    },
    {
      title: "E-Commerce Agriculture App",
      description: "Connects farmers directly with consumers, eliminating middlemen and ensuring fair pricing. Tools: Flutter, Figma, Dart.",
      imgUrl: projImg2,
    },
    {
      title: "Spotify UI/UX Redesign",
      description: "A modern UI/UX concept for Spotify, focusing on enhanced usability and aesthetics. Tools: Figma.",
      imgUrl: projImg3,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>Here are some of the projects I've worked on, showcasing my skills in cloud security, mobile app development, and UI/UX design.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">My Projects</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}