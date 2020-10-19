import React, { useLayoutEffect, useRef, useEffect, useState, useCallback, useMemo } from 'react';
import './App.css';
import Background from './Background';
import Header from './Header';
import Projects from './Projects';
import Footer from './Footer';

const App = () => {
  const projectsRef = useRef(null);

  // const projectsHeight = projectsRef.current ? projectsRef.current.clientHeight : 0;
  // console.log(projectsHeight)

  const [scrollY, setScrollY] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = useCallback(() => {
    setDimensions({width: window.innerWidth, height: window.innerHeight});
  });

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => { window.removeEventListener('resize', updateDimensions) };
  }, [])

  const { width, height } = dimensions;

  const projectsHeight = useMemo(() => {
    if (!projectsRef.current) return 0;


    var style = getComputedStyle(projectsRef.current);    // const el = 
    return parseInt(projectsRef.current.clientHeight) + parseInt(style.marginTop) + parseInt(style.marginBottom);
  }, [projectsRef.current, width, height])

  const pathStart = useMemo(() => height / 2, [height]);
  const pathRadius = useMemo(() => width > 700 ? width / 2 : width -  30, [width]);
  const pathArcDistance = useMemo(() => 0.5 * Math.PI * pathRadius, [pathRadius]);

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      setScrollY(window.scrollY)
    });
  });

  return (
    <div className="portfolio">
      <Background
        pathRadius={pathRadius}
        pathArcDistance={pathArcDistance}
        scrollY={scrollY}
        pathStart={pathStart}
        projectsHeight={projectsHeight}
      />
      <Header 
        height={pathArcDistance + pathStart}
      />
      <Projects
        ref={projectsRef}
      />
      <Footer
        height={pathArcDistance + pathStart}
      />
    </div>
  );
}

export default App;
