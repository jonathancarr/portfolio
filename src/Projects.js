import React, { forwardRef } from 'react';

const PROJECTS = [
    { title: "Commute.nz" },
    { title: "Sameageasmydog.com" },
    { title: "Cheds.club" },
]

const Header = forwardRef(({ height }, ref) => (
    <div className="projects" ref={ref} style={{ height }}>
        { PROJECTS.map(project => (
            <div className="project">
                <h2>
                    {project.title}
                </h2>
            </div>
        ))}
    </div>
));

export default Header;