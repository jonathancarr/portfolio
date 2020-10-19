import React, { useRef, useLayoutEffect, useEffect } from 'react';
import Rocket from './Rocket';

const Background = ({scrollY, pathRadius, pathArcDistance, pathStart, height, projectsHeight, angle, xPos, pageOffset}) => {
    const backgroundRef = useRef(null);
    const rocketRef = useRef(null);
    const pathRef = useRef(null);
    const circleRef = useRef(null);
    const footerPathRef = useRef(null);

    useEffect(() => {
        rocketRef.current.style.transform = `translate(${xPos}px, 50%)rotate(${90 + angle}deg)`
        pathRef.current.style.transform = `translateY(${pathRadius + pageOffset}px)`
        circleRef.current.style.r = `${pathRadius}px`;
        footerPathRef.current.style.r = `${pathRadius}px`;
    }, [scrollY, pathRadius, pathArcDistance, xPos, angle, pageOffset]);

    return (
        <svg className="background" ref={backgroundRef}>
            <g ref={pathRef}>
                <defs>
                    <clipPath id="circle-masks">
                        <rect
                            x={0}
                            y={pathStart - pathRadius - 50}
                            width={pathRadius * 2}
                            height={`${pathRadius + 50}px`}
                            />
                        <rect
                            x={0}
                            y={pathStart + projectsHeight}
                            width={pathRadius * 2}
                            height={`${pathRadius +  50}px`}
                        />
                    </clipPath>
                </defs>

                <circle
                    cx="0"
                    cy={pathStart}
                    fill="none"
                    stroke="white"
                    opacity="0.05"
                    strokeWidth="50"
                    ref={circleRef}
                    clipPath="url(#circle-masks)"
                />
                <line
                    x1={pathRadius}
                    x2={pathRadius}
                    y1={`${pathStart}px`}
                    y2={`${pathStart + projectsHeight}px`}
                    stroke="white"
                    opacity="0.05"
                    strokeWidth="50"
                />
                <circle
                    cx={`${pathRadius * 2}px`}
                    cy={`${pathStart + projectsHeight}px`}
                    fill="none"
                    stroke="white"
                    opacity="0.05"
                    strokeWidth="50"
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