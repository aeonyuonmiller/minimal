"use client"

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { projects } from "../data/projects"

function InfiniteScroll() {
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        ScrollTrigger.create({
            start: 1,
            end: "max",
            onLeaveBack: self => self.scroll(ScrollTrigger.maxScroll(window) - 2),
            onLeave: self => self.scroll(2)
        }).scroll(2);
    }, []);
    return (
        <>
            <div className='infinite-scroll'>
                <div className="projects-wrapper">
                    {/* {projects.map((project, index) => (
                        <div className='project' key={index}>
                            <img src={project.image} alt="" />
                            <h2>{project.name}</h2>
                        </div>
                    ))} */}

                    <div className='project' key={1}>
                        <img src="./glove.svg" alt="one" />
                        <h2>Uno</h2>
                    </div>

                    <div className='project' key={2}>
                        <img src="./window.svg" alt="two" />
                        <h2>Two</h2>
                    </div>

                    <div className='project' key={3}>
                        <img src="./vercel.svg" alt="three" />
                        <h2>Three</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfiniteScroll