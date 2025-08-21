'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import './menu.css';
import Logo from "../../icons/Logo"

gsap.registerPlugin(SplitText, useGSAP);

const links = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Lab', path: '/lab' },
];

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const menuOverlay = useRef(null);
    const openBtnRef = useRef(null);
    const closeBtnRef = useRef(null);
    const linkRefs = useRef([]);
    const splitInstances = useRef([]);
    const timeline = useRef(null);

    // Prepare the overlay + link characters on mount
    useGSAP(() => {
        gsap.set(menuOverlay.current, { clipPath: 'inset(0% 0% 0% 100%)' });
        gsap.set(closeBtnRef.current, { autoAlpha: 0, y: -20 });

        // Clean up previous splits if any
        splitInstances.current.forEach((split) => split?.revert?.());
        splitInstances.current = [];

        linkRefs.current.forEach((el) => {
            const split = new SplitText(el, { type: 'chars' });
            splitInstances.current.push(split);
            gsap.set(split.chars, { y: 50, opacity: 0 });
        });

        return () => {
            splitInstances.current.forEach((split) => split?.revert?.());
            splitInstances.current = [];
            timeline.current?.kill();
        };
    }, []);

    const openMenu = () => {
        setIsOpen(true);

        // Re-split characters to ensure fresh state
        splitInstances.current.forEach((split, i) => {
            split.revert?.();
            const newSplit = new SplitText(linkRefs.current[i], { type: 'chars' });
            splitInstances.current[i] = newSplit;
            gsap.set(newSplit.chars, { y: 50, opacity: 0 });
        });

        timeline.current = gsap.timeline();

        timeline.current
            .to(openBtnRef.current, {
                autoAlpha: 0,
                x: -60,
                duration: 0.3,
                ease: 'power2.inOut',
            })
            .set(menuOverlay.current, { visibility: 'visible' }, '<')
            .to(
                menuOverlay.current,
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1,
                    ease: 'power3.out',
                },
                '<'
            )
            .fromTo(
                closeBtnRef.current,
                { autoAlpha: 0, x: 60 },
                { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' },
                '-=0.5'
            )
            .add(() => {
                splitInstances.current.forEach((split, i) => {
                    gsap.to(split.chars, {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.03,
                        ease: 'power3.out',
                        delay: i * 0.1,
                    });
                });
            }, '-=0.3');
    };

    const closeMenu = () => {
        timeline.current = gsap.timeline();

        splitInstances.current.forEach((split) => {
            timeline.current.to(
                split.chars,
                {
                    x: -20,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.02,
                    ease: 'power4.in',
                },
                '<'
            );
        });

        timeline.current
            .to(closeBtnRef.current, {
                autoAlpha: 0,
                x: 120,
                duration: 0.2,
                ease: 'power4.in',
            })
            .to(
                menuOverlay.current,
                {
                    clipPath: 'inset(0% 0% 0% 100%)',
                    duration: 0.8,
                    ease: 'power3.inOut',
                },
                '-=0.3'
            )
            .to(
                openBtnRef.current,
                {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.4,
                    ease: 'power2.in',
                },
                '-=0.5'
            )
            .set(menuOverlay.current, { visibility: 'hidden' });

        setIsOpen(false);
    };

    const handleHover = (index, enter = true) => {
        const chars = splitInstances.current[index]?.chars;
        if (!chars) return;

        gsap.to(chars, {
            y: enter ? -80 : 0,
            opacity: enter ? 1 : 0.8,
            duration: 0.4,
            ease: 'power4.inOut',
            stagger: 0.05,
        });
    };

    return (
        <div className="menu">
            {/* Open Button */}
            <div className="menu-logo">
                <Logo color="var(--accent)" />

                <button className="menu-toggle" ref={openBtnRef} onClick={openMenu}>
                    <div className="hamburger">
                        <span></span>
                        <span></span>
                    </div>
                    <span className="menu-label">menu</span>
                </button>
            </div>

            {/* Menu Overlay */}
            <div className="menu-overlay" ref={menuOverlay}>
                <button className="close-button" ref={closeBtnRef} onClick={closeMenu}>
                    <div className="close-icon">✕</div>
                    <span className="close-label">close</span>
                </button>

                <nav className="menu-links">
                    {links.map(({ text, path }, i) => (
                        <Link
                            key={path}
                            href={path}
                            ref={(el) => (linkRefs.current[i] = el)}
                            className="menu-link"
                            onMouseEnter={() => handleHover(i, true)}
                            onFocus={() => handleHover(i, true)}
                            onMouseLeave={() => handleHover(i, false)}
                            onBlur={() => handleHover(i, false)}
                            onClick={() => closeMenu()}
                            tabIndex={0} // Important to make the element focusable by keyboard
                        >
                            {text}
                        </Link>
                    ))}
                </nav>

                <div className="menu-footer">
                    <p>Our vision is to create playful communication.</p>
                </div>
            </div>
        </div>
    );
}
