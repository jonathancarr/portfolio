import React, { useRef, useLayoutEffect, useEffect } from 'react';
import Rocket from './Rocket';

const Background = ({scrollY, pathRadius, pathArcDistance, pathStart, height, projectsHeight}) => {
    const backgroundRef = useRef(null);
    const rocketRef = useRef(null);
    const pathRef = useRef(null);
    const circleRef = useRef(null);
    const footerPathRef = useRef(null);

    const textRef=useRef(null);


    useEffect(() => {
        let angle = 0;
        let xPos = 0;
        let pageOffset = 0

        if (scrollY < pathArcDistance) {
            angle = 90 * scrollY / pathArcDistance;
            xPos = pathRadius * Math.sin(angle * Math.PI / 180)
            pageOffset = -((pathRadius - (pathRadius * Math.cos(angle * Math.PI / 180))));
        } else if (scrollY >= pathArcDistance && scrollY < pathArcDistance + projectsHeight) {
            angle = 90;
            xPos = pathRadius * Math.sin(angle * Math.PI / 180)
            pageOffset = -(scrollY - pathArcDistance + pathRadius);
        } else {
            angle = 90 - (90 * (scrollY - projectsHeight - pathArcDistance) / pathArcDistance)
            xPos = pathRadius + (pathRadius - pathRadius * Math.cos((90 - angle) * Math.PI / 180))
            console.log(angle);
            console.log(Math.sin((90 - angle) * Math.PI / 180))
            console.log(pathRadius * (Math.sin((90 - angle) * Math.PI / 180)))
            pageOffset = -(pathArcDistance + projectsHeight - pathArcDistance + pathRadius) - pathRadius * (Math.sin((90 - angle) * Math.PI / 180))
        }
        // const angle = Math.min(90 * scrollY / pathArcDistance, 90)
        // const xPos = pathRadius * Math.sin(angle * Math.PI / 180)
        
        // const pageOffset = - (Math.max(0, scrollY - pathArcDistance) + (pathRadius - (pathRadius * Math.cos(angle * Math.PI / 180))));



        rocketRef.current.style.transform = `translate(${xPos}px, 50%)rotate(${90 + angle}deg)`
        pathRef.current.style.transform = `translateY(${pathRadius + pageOffset}px)`
        textRef.current.style.transform = `translateY(${pageOffset}px)`
        circleRef.current.style.r = `${backgroundRef.current.clientWidth / 2}px`;
        footerPathRef.current.style.r = `${backgroundRef.current.clientWidth / 2}px`;
    }, [scrollY, pathRadius, pathArcDistance]);

    return (
        <svg className="background" ref={backgroundRef}>
            <g ref={textRef}>
                <text
                    y="45%"
                    x="50%"
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fill="white"
                    fontSize="36"
                >
                    Jonathan Carr
                </text>
                <text
                    y="50%"
                    x="50%"
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fill="white"
                    fontSize="18"
                >
                    I create websites to justify my true passion - buying web domains
                </text>
                <text
                    y={`${pathStart + pathArcDistance + projectsHeight + pathArcDistance / 3}px`}
                    x="50%"
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fill="white"
                    fontSize="32"
                >
                    Get in touch!
                </text>
                <text
                    y={`${pathStart + pathArcDistance + projectsHeight + pathArcDistance / 3 + 48}px`}
                    x="50%"
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fill="white"
                    fontSize="24"
                    pointerEvents="all"
                >
                    howdy@jonathan.co.nz
                </text>
            </g>

            <g ref={pathRef}>
                <defs>
                    <clipPath id="circle-masks">
                        <rect
                            x={0}
                            y={pathStart - pathRadius}
                            width="100%"
                            height={`${pathRadius}px`}
                            />
                        <rect
                            x={0}
                            y={pathStart + projectsHeight}
                            width="100%"
                            height={`${pathRadius}px`}
                        />
                    </clipPath>
                </defs>
                
                <circle
                    cx="0"
                    cy="50%"
                    fill="none"
                    stroke="white"
                    opacity="10%"
                    strokeWidth="4"
                    ref={circleRef}
                    clipPath="url(#circle-masks)"
                />
                <line
                    x1="50%"
                    x2="50%"
                    y1={`${pathStart}px`}
                    y2={`${pathStart + projectsHeight}px`}
                    stroke="white"
                    opacity="10%"
                    strokeWidth="4"
                />
                <circle
                    cx="100%"
                    cy={`${pathStart + projectsHeight}px`}
                    fill="none"
                    stroke="white"
                    opacity="10%"
                    strokeWidth="4"
                    ref={footerPathRef}
                    clipPath="url(#circle-masks)"
                />
            </g>
            <g className="rocket" ref={rocketRef}>
                <Rocket />
            </g>
            
        </svg>
    );
};

export default Background;