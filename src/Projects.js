import React, { forwardRef } from 'react';
import { FaGithubSquare } from "react-icons/fa";

const PROJECTS = [
    {
        title: "Commute.nz",
        url: "https://commute.nz",
        description: "A dashboard for exploring commuter data from the 2018 New Zealand census.",
        githubRepo: "commute-nz",
        githubLink: "https://github.com/jonathancarr/commute-nz",
        screenshot: "commutenz.png",
    },
    {
        title: "Sameageasmydog.com",
        url: "https://sameageasmydog.com",
        description: "Ever wondered when you'll be the same age as your dog?",
        githubRepo: "same-age-as-my-dog",
        githubLink: "https://github.com/jonathancarr/same-age-as-my-dog",
        screenshot: "sameageasmydog.png",
    },
    {
        title: "Cheds.club",
        url: "https://cheds.club",
        description: "A public messenger where you can share appreciation for your favourite cracker!",
        githubRepo: "cheds-club",
        githubLink: "https://github.com/jonathancarr/cheds-club",
        screenshot: "chedsclub.png",
    },
]

const Header = forwardRef(({ height }, ref) => (
    <div className="projects" ref={ref} style={{ height }}>
        { PROJECTS.map(project => (
            <div className="project">
                <div className="project__col">
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="project__url"><h2 className="project__title">{project.title}</h2></a>
                    <p className="project__description">{project.description}</p>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project__github"><FaGithubSquare className="project__github--icon"/>{project.githubRepo}</a>
                </div>
                <div className="project__col">
                    <a href={project.url} target="_blank" rel="noopener noreferrer"><img className="project__screenshot" src={project.screenshot}/></a>
                </div>
            </div>
        ))}
    </div>
));

export default Header;