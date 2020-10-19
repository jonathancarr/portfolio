import React, { useLayoutEffect, useRef, useEffect, useState, useCallback, useMemo } from 'react';
import './App.css';
import Background from './Background';
import Header from './Header';
import Projects from './Projects';
import Footer from './Footer';

const App = () => {
  const projectsRef = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const newImageLoaded = useCallback(() => {
    setImagesLoaded(imagesLoaded + 1);
  }, imagesLoaded, setImagesLoaded)

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

    var style = getComputedStyle(projectsRef.current);
    return parseInt(projectsRef.current.clientHeight) + parseInt(style.marginTop) + parseInt(style.marginBottom);
  }, [projectsRef.current, width, height, imagesLoaded])

  const pathStart = useMemo(() => height / 2, [height]);
  const pathRadius = useMemo(() => width > 1000 ? width / 2 : width -  30, [width]);
  const pathArcDistance = useMemo(() => 0.5 * Math.PI * pathRadius, [pathRadius]);

  const angle = useMemo(() => {
    if (scrollY < pathArcDistance) {
      return 90 * scrollY / pathArcDistance;
    } else if (scrollY >= pathArcDistance && scrollY < pathArcDistance + projectsHeight) {
        return 90;
    } else {
        return 90 - (90 * (scrollY - projectsHeight - pathArcDistance) / pathArcDistance)
    }
  }, [scrollY, pathArcDistance, projectsHeight]);

  const rocketXPos = useMemo(() => {
    if (scrollY < pathArcDistance) {
      return pathRadius * Math.sin(angle * Math.PI / 180)
    } else if (scrollY >= pathArcDistance && scrollY < pathArcDistance + projectsHeight) {
      return pathRadius * Math.sin(angle * Math.PI / 180)
    } else {
      return pathRadius + (pathRadius - pathRadius * Math.cos((90 - angle) * Math.PI / 180))
    }
  }, [scrollY, pathArcDistance, angle, projectsHeight, pathRadius])

  const pageOffset = useMemo(() => {
    if (scrollY < pathArcDistance) {
      return -((pathRadius - (pathRadius * Math.cos(angle * Math.PI / 180))));
    } else if (scrollY >= pathArcDistance && scrollY < pathArcDistance + projectsHeight) {
      return  -(scrollY - pathArcDistance + pathRadius);
    } else {
      return -(pathArcDistance + projectsHeight - pathArcDistance + pathRadius) - pathRadius * (Math.sin((90 - angle) * Math.PI / 180))
    }
  }, [scrollY, pathArcDistance, pathRadius, angle])

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
        xPos={rocketXPos}
        pageOffset={pageOffset}
        angle={angle}
      />
      <Header
        startHeight={pathStart / 2}
        height={pathArcDistance + pathStart}
        pageOffset={pageOffset}
      />
      <Projects
        ref={projectsRef}
        newImageLoaded={newImageLoaded}
      />
      <Footer
        height={pathArcDistance + pathStart}
        pageOffset={pageOffset}
        startHeight = {pathArcDistance + projectsHeight}
      />
    </div>
  );
}

export default App;
