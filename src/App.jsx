import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, Mail, ArrowRight, ArrowDown, ArrowUpRight,
  ChevronLeft, ChevronRight, Image as ImageIcon, Video, ExternalLink,
  GraduationCap, Cpu, Radio, Code2, Wallet, Megaphone, Award, User,
  Sun, Satellite, Sprout, Car, Wifi, Zap, Bot, CircuitBoard, Send,
  CheckCircle2, AlertCircle, MapPin,
} from "lucide-react";

/* ============================================================
   BRAND ICONS (custom SVGs — lucide-react dropped brand/logo icons
   in newer versions, so these are defined locally and version-proof)
   ============================================================ */
function GithubIcon({ size = 17, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 0.5C5.65 0.5 0.5 5.65 0.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.51 11.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}
function LinkedinIcon({ size = 17, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

/* ============================================================
   DESIGN TOKENS
   Palette: deep circuit-board navy, cyan signal + violet secondary trace
   Type: Space Grotesk (display) / Inter (body) / JetBrains Mono (labels, data)
   ============================================================ */
const T = {
  bg: "#0a0e16",
  bgAlt: "#0d1220",
  panel: "#0f1524",
  panel2: "#131a2b",
  border: "#1e2738",
  borderBright: "rgba(34,211,238,0.4)",
  cyan: "#22d3ee",
  cyanDim: "rgba(34,211,238,0.14)",
  violet: "#a78bfa",
  violetDim: "rgba(167,139,250,0.14)",
  text: "#e7edf5",
  muted: "#8592a6",
  mutedDim: "#5b6577",
};

/* ============================================================
   CONTENT DATA — edit here
   ============================================================ */
const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = {
  email: "chatapmitali@gmail.com",
  github: "https://github.com/mitalichatap",
  linkedin: "https://www.linkedin.com/in/mitali-chatap-388042283/",
};

const EDUCATION = [
  {
    degree: "Bachelor of Engineering — Computer Engineering",
    school: "St. Vincent Pallotti College of Engineering and Technology",
    location: "Nagpur, Maharashtra",
    meta: "Expected July 2027 · CGPA 8.75 / 10",
    status: "Ongoing",
  },
  {
    degree: "Higher Secondary — Class XII, CBSE",
    school: "St. Paul Jr. College",
    location: "Nagpur, Maharashtra",
    meta: "Completed June 2023",
    status: "Completed",
  },
  {
    degree: "Secondary School — Class X, CBSE",
    school: "St. Peter's School",
    location: "Bhandara, Maharashtra",
    meta: "Completed June 2021",
    status: "Completed",
  },
];

const SKILLS = [
  {
    icon: Code2,
    title: "Programming Languages",
    desc: "The languages I build with day to day, from firmware logic to UI.",
    items: ["Java", "C", "JavaScript — Basic"],
  },
  {
    icon: Cpu,
    title: "Microcontrollers & Hardware",
    desc: "The boards and sensors I wire up and program for my robotics and IoT builds.",
    items: [
      "ESP32", "ESP8266", "Arduino UNO", "MPU6050 IMU", "Air530Z GPS/GNSS",
      "HC-SR04 Ultrasonic Sensor", "L298N Motor Driver", "DHT11", "Soil Moisture Sensors",
    ],
  },
  {
    icon: CircuitBoard,
    title: "Core Technologies",
    desc: "The domains I work across — where hardware, mobile, and web meet.",
    items: [
      "Internet of Things (IoT)", "Android Application Development", "Java & XML Layouts",
      "Hardware & Sensor Integration", "Frontend Development", "HTML", "CSS", "JavaScript", "React",
    ],
  },
  {
    icon: Radio,
    title: "Networking & Communication",
    desc: "How my devices talk to each other and to the apps I build for them.",
    items: ["ESP-NOW", "HTTP", "JSON APIs", "Volley", "Web Servers", "Wi-Fi"],
  },
];

/* Media placeholder folders are just labels for where I'll drop real files later */
const PROJECTS = [
  {
    id: "agrobot",
    tag: "AGB-02",
    icon: Sprout,
    title: "AgroBot 2.0",
    subtitle: "A Solar-Based Autonomous Precision Sowing System",
    status: "Ongoing Project",
    overview:
      "I am developing AgroBot 2.0, a solar-powered and IoT-integrated agricultural robot designed to automate soil penetration and precision seed sowing for Kharif crops. The system is built around sustainable farming, aiming to improve consistency and reduce manual effort during sowing.",
    features: [
      "I am developing a companion Android application with a map interface for selecting field corners.",
      "The application allows field dimensions and row spacing to be defined.",
      "The system generates sowing paths based on the selected field.",
      "GPS status and robot speed can be monitored.",
      "The robot uses a dibbler and seed-metering mechanism for controlled seed placement.",
      "The mechanism is designed for proper furrow depth, seed placement, and soil covering.",
      "Solar power integration using a 12V / 20W solar panel.",
    ],
    tech: ["ESP32", "Air530Z GPS/GNSS", "Android", "Java", "Solar Power Integration", "IoT", "Robotics"],
    github: null,
    folder: "/images/agrobot/",
    media: [
      { type: "image", label: "Robot photograph", featured: true },
      { type: "image", label: "Android application screenshot" },
      { type: "image", label: "GPS / map screenshot" },
      { type: "image", label: "Sowing mechanism photograph" },
      { type: "video", label: "Demonstration video" },
    ],
  },
  {
    id: "gesture-car",
    tag: "WGC-06",
    icon: Car,
    title: "Wireless Gesture-Controlled Robotic Car",
    subtitle: "Tilt-based control over direct peer-to-peer radio",
    status: "June 2026",
    overview:
      "I developed a wireless robotic vehicle that can be controlled using real-time hand gestures, without depending on a Wi-Fi router or Bluetooth connection.",
    features: [
      "I used an MPU6050 IMU to detect hand orientation.",
      "Tilt gestures are translated into forward, backward, left, right, and stop commands.",
      "I implemented ESP-NOW for direct peer-to-peer communication between two ESP32 boards.",
      "The receiver controls TT motors through an L298N motor driver.",
      "I implemented safety timeout protection to stop the vehicle if communication is interrupted.",
    ],
    tech: ["ESP32-WROOM-32", "MPU6050", "L298N", "ESP-NOW", "TT Motors", "Arduino IDE"],
    github: null,
    folder: "/images/gesture-car/",
    media: [
      { type: "image", label: "Complete robotic car photograph", featured: true },
      { type: "image", label: "Transmitter photograph" },
      { type: "image", label: "Receiver photograph" },
      { type: "image", label: "Circuit / wiring photograph" },
      { type: "image", label: "Serial monitor screenshot" },
      { type: "video", label: "Demonstration video" },
    ],
  },
  {
    id: "parksense",
    tag: "PKS-04",
    icon: MapPin,
    title: "ParkSense",
    subtitle: "IoT Smart Parking System",
    status: "May 2026",
    overview:
      "I developed ParkSense, an Android-based IoT application that communicates with an ESP32 web server over Wi-Fi to display real-time parking slot availability.",
    features: [
      "I created a dynamic parking dashboard.",
      "The application displays parking slot availability.",
      "Slot counters provide a quick overview of occupancy.",
      "An occupancy progress indicator visualizes parking usage.",
      "Color-coded indicators distinguish available and occupied spaces.",
      "I used Volley for networking.",
      "The application fetches and parses JSON data through HTTP GET requests from the ESP32 web server.",
    ],
    tech: ["Android Studio", "Java", "XML Layouts", "Volley", "ESP32", "HTTP", "JSON API", "Wi-Fi"],
    github: null,
    folder: "/images/parksense/",
    media: [
      { type: "image", label: "Android application screenshot", featured: true },
      { type: "image", label: "ESP32 hardware photograph" },
      { type: "image", label: "Parking sensor setup" },
      { type: "image", label: "Dashboard screenshot" },
      { type: "video", label: "Demonstration video" },
    ],
  },
  {
    id: "greenhouse",
    tag: "SGH-01",
    icon: Zap,
    title: "Smart Greenhouse",
    subtitle: "ESP8266 Plant Monitoring System",
    status: "Completed",
    overview:
      "I developed a real-time IoT plant monitoring system using an ESP8266 NodeMCU. The system monitors environmental and soil conditions locally over Wi-Fi and presents the sensor readings through a web server.",
    features: [
      "I used a DHT11 sensor to monitor temperature and humidity.",
      "A soil moisture sensor monitors soil conditions.",
      "A PIR sensor detects motion.",
      "The ESP8266 hosts a local web server.",
      "Sensor information is displayed through a browser.",
      "The system provides an inexpensive and scalable approach for home gardens and small nurseries.",
    ],
    tech: ["ESP8266 NodeMCU", "DHT11", "Soil Moisture Sensor", "PIR Sensor", "Arduino IDE", "Wi-Fi", "Web Server"],
    github: null,
    folder: "/images/smart-greenhouse/",
    media: [
      { type: "image", label: "Hardware photograph", featured: true },
      { type: "image", label: "Sensor wiring photograph" },
      { type: "image", label: "Web dashboard screenshot" },
      { type: "image", label: "Plant / setup photograph" },
      { type: "video", label: "Demonstration video" },
    ],
  },
];

const LEADERSHIP = [
  {
    icon: Wallet,
    role: "Treasurer",
    org: "Zenith Forum — Computer Engineering Department Club",
    desc: "I contribute to the planning and coordination of activities within the Computer Engineering Department club while handling responsibilities related to the club's financial activities.",
  },
  {
    icon: Megaphone,
    role: "Social Media & Publicity Head",
    org: "ACM Student Chapter — SVPCET",
    desc: "I contribute to promoting chapter activities, managing digital communication, and helping create awareness about events and initiatives.",
  },
];

/* ============================================================
   SMALL UTILITIES
   ============================================================ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="mono" style={{ color: T.cyan, fontSize: 12.5, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 20, height: 1, background: T.cyan, display: "inline-block", opacity: 0.7 }} />
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span
      className="mono"
      style={{
        fontSize: 12,
        padding: "5px 10px",
        borderRadius: 6,
        border: `1px solid ${T.border}`,
        background: "rgba(255,255,255,0.02)",
        color: T.muted,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar({ active, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
        background: scrolled ? "rgba(10,14,22,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        transition: "all 0.35s ease",
      }}
    >
      <nav style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button
          onClick={() => handleClick("home")}
          className="mono"
          style={{ display: "flex", alignItems: "center", gap: 9, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          aria-label="Go to home"
        >
          <span style={{ width: 9, height: 9, borderRadius: 2, background: T.cyan, boxShadow: `0 0 10px ${T.cyan}` }} />
          <span style={{ color: T.text, fontSize: 15, letterSpacing: "0.02em", fontWeight: 600 }}>MITALI CHATAP</span>
        </button>

        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="mono navlink"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                letterSpacing: "0.04em",
                padding: "8px 14px",
                borderRadius: 8,
                color: active === item.id ? T.text : T.muted,
                position: "relative",
              }}
            >
              {item.label}
              {active === item.id && (
                <span style={{ position: "absolute", left: 14, right: 14, bottom: 3, height: 2, background: T.cyan, borderRadius: 2, boxShadow: `0 0 8px ${T.cyan}` }} />
              )}
            </button>
          ))}
        </div>

        <button
          className="hide-desktop"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 8, padding: 8, color: T.text, cursor: "pointer" }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="hide-desktop" style={{ borderTop: `1px solid ${T.border}`, background: T.bgAlt, padding: "8px 24px 18px" }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="mono"
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "12px 4px",
                fontSize: 14,
                borderBottom: `1px solid ${T.border}`,
                color: active === item.id ? T.cyan : T.muted,
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ onNavigate }) {
  const labels = [
    { text: "ESP32", top: "14%", left: "4%", delay: "0s" },
    { text: "IoT", top: "72%", left: "2%", delay: "0.6s" },
    { text: "GPS", top: "20%", left: "84%", delay: "1.1s" },
    { text: "Java", top: "78%", left: "80%", delay: "1.7s" },
    { text: "Robotics", top: "48%", left: "90%", delay: "2.2s" },
  ];

  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "visible", paddingTop: 88 }}>
      <div className="circuit-grid" aria-hidden="true" />
      <div className="scan-line" aria-hidden="true" />

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 48, alignItems: "center", width: "100%" }}>
        <div className="hero-copy">
          <Eyebrow>Computer Engineering · Nagpur, India</Eyebrow>
          <h1 className="display" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)", lineHeight: 1.08, color: T.text, margin: 0, letterSpacing: "-0.01em" }}>
            Mitali Chatap
          </h1>
          <p className="mono" style={{ color: T.cyan, fontSize: 14.5, marginTop: 16, letterSpacing: "0.01em", lineHeight: 1.7 }}>
            Computer Engineering Undergraduate&nbsp;·&nbsp;IoT &amp; Robotics Developer&nbsp;·&nbsp;Android &amp; Frontend Enthusiast
          </p>
          <p style={{ color: T.muted, fontSize: 16.5, lineHeight: 1.75, marginTop: 22, maxWidth: 560 }}>
            I am an innovative Computer Engineering student with hands-on experience developing hardware and
            software solutions, including Android applications, IoT systems, and autonomous robotics. I enjoy
            combining microcontrollers, sensors, wireless communication, and software to build practical,
            real-world solutions.
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <button onClick={() => onNavigate("projects")} className="btn-primary">
              View My Projects <ArrowRight size={16} />
            </button>
            <button onClick={() => onNavigate("contact")} className="btn-ghost">
              Contact Me
            </button>
          </div>

          <div style={{ display: "flex", gap: 18, marginTop: 36, flexWrap: "wrap" }}>
            <a href={`mailto:${SOCIALS.email}`} className="icon-link" aria-label="Email Mitali">
              <Mail size={17} /> <span className="mono" style={{ fontSize: 13 }}>{SOCIALS.email}</span>
            </a>
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="GitHub profile">
              <GithubIcon size={17} /> <span className="mono" style={{ fontSize: 13 }}>GitHub</span>
            </a>
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="LinkedIn profile">
              <LinkedinIcon size={17} /> <span className="mono" style={{ fontSize: 13 }}>LinkedIn</span>
            </a>
          </div>
        </div>
      
        <div className="hero-visual" aria-hidden="false">
          <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <g opacity="0.55">
              <line x1="200" y1="200" x2="60" y2="90" stroke={T.cyan} strokeWidth="1" className="trace" />
              <line x1="200" y1="200" x2="340" y2="80" stroke={T.violet} strokeWidth="1" className="trace" style={{ animationDelay: "0.4s" }} />
              <line x1="200" y1="200" x2="50" y2="300" stroke={T.violet} strokeWidth="1" className="trace" style={{ animationDelay: "0.8s" }} />
              <line x1="200" y1="200" x2="350" y2="310" stroke={T.cyan} strokeWidth="1" className="trace" style={{ animationDelay: "1.2s" }} />
              <line x1="200" y1="200" x2="200" y2="30" stroke={T.cyan} strokeWidth="1" className="trace" style={{ animationDelay: "1.6s" }} />
            </g>
            <circle cx="60" cy="90" r="3.5" fill={T.cyan} className="node-pulse" />
            <circle cx="340" cy="80" r="3.5" fill={T.violet} className="node-pulse" style={{ animationDelay: "0.5s" }} />
            <circle cx="50" cy="300" r="3.5" fill={T.violet} className="node-pulse" style={{ animationDelay: "1s" }} />
            <circle cx="350" cy="310" r="3.5" fill={T.cyan} className="node-pulse" style={{ animationDelay: "1.5s" }} />
            <circle cx="200" cy="30" r="3.5" fill={T.cyan} className="node-pulse" style={{ animationDelay: "2s" }} />
          </svg>

          <div className="profile-frame">
            <div className="profile-frame-inner">
              <User size={40} strokeWidth={1.3} color={T.mutedDim} />
              <span className="mono" style={{ fontSize: 10.5, color: T.mutedDim, letterSpacing: "0.08em", marginTop: 8, textAlign: "center", padding: "0 10px" }}>
                ADD PROFILE PHOTO HERE
              </span>
            </div>
            <span className="ring ring-1" />
            <span className="ring ring-2" />
          </div>

          {labels.map((l) => (
            <span key={l.text} className="float-chip mono" style={{ top: l.top, left: l.left, animationDelay: l.delay }}>
              {l.text}
            </span>
          ))}
        </div>
      </div>

      <button onClick={() => onNavigate("about")} className="scroll-cue" aria-label="Scroll to About section">
        <ArrowDown size={18} />
      </button>
    </section>
  );
}

/* ============================================================
   ABOUT + EDUCATION
   ============================================================ */
function About() {
  return (
    <section id="about" style={{ padding: "120px 24px 100px", position: "relative" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 56 }}>
        <Reveal>
          <Eyebrow>About Me</Eyebrow>
          <h2 className="display" style={{ fontSize: "clamp(1.7rem, 3vw, 2.3rem)", color: T.text, margin: "0 0 20px" }}>
            Where software meets hardware
          </h2>
          <p style={{ color: T.muted, fontSize: 16, lineHeight: 1.85 }}>
            I am currently pursuing a Bachelor of Engineering in Computer Engineering and enjoy working at the
            intersection of software and hardware. My interests include IoT, robotics, Android development,
            embedded systems, and frontend development. I like turning ideas into working prototypes by combining
            programming with sensors, microcontrollers, wireless communication, and real-world problem solving.
          </p>
          <p style={{ color: T.muted, fontSize: 16, lineHeight: 1.85, marginTop: 16 }}>
            I'm particularly interested in building practical, sustainable, and technology-driven solutions.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <Eyebrow>Education</Eyebrow>
          <div style={{ position: "relative", marginTop: 8 }}>
            <div style={{ position: "absolute", left: 7, top: 10, bottom: 10, width: 1, background: `linear-gradient(${T.cyan}, ${T.border})`, opacity: 0.35 }} />
            {EDUCATION.map((ed, i) => (
              <div key={i} style={{ position: "relative", paddingLeft: 34, marginBottom: i === EDUCATION.length - 1 ? 0 : 26 }}>
                <span
                  style={{
                    position: "absolute", left: 0, top: 4, width: 15, height: 15, borderRadius: "50%",
                    background: T.bg, border: `2px solid ${ed.status === "Ongoing" ? T.cyan : T.border}`,
                    boxShadow: ed.status === "Ongoing" ? `0 0 10px ${T.cyan}` : "none",
                  }}
                />
                <div className="edu-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: 15.5, color: T.text, margin: 0, fontWeight: 600 }}>{ed.degree}</h3>
                    {ed.status === "Ongoing" && (
                      <span className="mono" style={{ fontSize: 10.5, color: T.cyan, border: `1px solid ${T.borderBright}`, padding: "2px 8px", borderRadius: 20, letterSpacing: "0.06em" }}>
                        ONGOING
                      </span>
                    )}
                  </div>
                  <p style={{ margin: "6px 0 0", fontSize: 14, color: T.muted }}>{ed.school}</p>
                  <p className="mono" style={{ margin: "8px 0 0", fontSize: 12, color: T.mutedDim, display: "flex", alignItems: "center", gap: 6 }}>
                    <GraduationCap size={13} /> {ed.location} &nbsp;·&nbsp; {ed.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   SKILLS
   ============================================================ */
function SkillCard({ skill, index }) {
  const Icon = skill.icon;
  return (
    <Reveal delay={index * 90}>
      <div className="skill-card">
        <div className="skill-icon">
          <Icon size={19} color={T.cyan} strokeWidth={1.6} />
        </div>
        <h3 style={{ fontSize: 16, color: T.text, margin: "14px 0 6px", fontWeight: 600 }}>{skill.title}</h3>
        <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.6, margin: "0 0 16px" }}>{skill.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {skill.items.map((it) => <Badge key={it}>{it}</Badge>)}
        </div>
      </div>
    </Reveal>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "100px 24px", position: "relative", background: T.bgAlt, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal>
          <Eyebrow>Technical Skills</Eyebrow>
          <h2 className="display" style={{ fontSize: "clamp(1.7rem, 3vw, 2.3rem)", color: T.text, margin: "0 0 44px" }}>
            The stack behind my builds
          </h2>
        </Reveal>
        <div className="skills-grid">
          {SKILLS.map((s, i) => <SkillCard key={s.title} skill={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROJECT MEDIA GALLERY (reusable)
   ============================================================ */
function ProjectMediaGallery({ media, folder }) {
  const [active, setActive] = useState(() => {
    const idx = media.findIndex((m) => m.featured);
    return idx >= 0 ? idx : 0;
  });
  const current = media[active];

  const go = useCallback((dir) => {
    setActive((a) => (a + dir + media.length) % media.length);
  }, [media.length]);

  return (
    <div className="media-gallery">
      <div className="media-featured">
        {current.type === "video" ? <Video size={30} strokeWidth={1.3} color={T.mutedDim} /> : <ImageIcon size={30} strokeWidth={1.3} color={T.mutedDim} />}
        <span className="mono media-label">
          {current.type === "video" ? "ADD DEMO VIDEO HERE" : "ADD PROJECT IMAGE HERE"}
        </span>
        <span className="mono media-sublabel">{current.label}</span>

        {media.length > 1 && (
          <>
            <button className="media-nav media-nav-left" onClick={() => go(-1)} aria-label="Previous media">
              <ChevronLeft size={16} />
            </button>
            <button className="media-nav media-nav-right" onClick={() => go(1)} aria-label="Next media">
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      <div className="media-thumbs">
        {media.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`media-thumb ${i === active ? "media-thumb-active" : ""}`}
            aria-label={`Show ${m.label}`}
            title={m.label}
          >
            {m.type === "video" ? <Video size={14} color={T.mutedDim} /> : <ImageIcon size={14} color={T.mutedDim} />}
          </button>
        ))}
      </div>
      <p className="mono" style={{ fontSize: 10.5, color: T.mutedDim, marginTop: 8, letterSpacing: "0.03em" }}>
        media source: {folder}
      </p>
    </div>
  );
}

/* ============================================================
   PROJECT CARD
   ============================================================ */
function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = project.icon;
  const reversed = index % 2 === 1;

  return (
    <Reveal delay={80}>
      <article className="project-card">
        <div className="project-grid" style={{ direction: reversed ? "rtl" : "ltr" }}>
          <div style={{ direction: "ltr" }}>
            <ProjectMediaGallery media={project.media} folder={project.folder} />
          </div>

          <div style={{ direction: "ltr" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div className="project-icon"><Icon size={16} color={T.cyan} strokeWidth={1.7} /></div>
              <span className="mono" style={{ fontSize: 11.5, color: T.mutedDim, letterSpacing: "0.08em" }}>{project.tag}</span>
              <span style={{ marginLeft: "auto" }} className="mono status-pill">{project.status}</span>
            </div>

            <h3 className="display" style={{ fontSize: "1.5rem", color: T.text, margin: "0 0 6px" }}>{project.title}</h3>
            <p style={{ fontSize: 14, color: T.cyan, margin: "0 0 14px", opacity: 0.85 }}>{project.subtitle}</p>
            <p style={{ fontSize: 14.5, color: T.muted, lineHeight: 1.75, margin: "0 0 16px" }}>{project.overview}</p>

            <button
              onClick={() => setExpanded((e) => !e)}
              className="mono"
              style={{ background: "none", border: "none", color: T.cyan, cursor: "pointer", fontSize: 12.5, padding: 0, display: "flex", alignItems: "center", gap: 6, marginBottom: expanded ? 14 : 20 }}
            >
              {expanded ? "Hide details" : "View details"}
              <ChevronRight size={13} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
            </button>

            {expanded && (
              <ul style={{ margin: "0 0 20px", paddingLeft: 18, color: T.muted, fontSize: 13.5, lineHeight: 1.9 }}>
                {project.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
              {project.tech.map((t) => <Badge key={t}>{t}</Badge>)}
            </div>

            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-small">
                View Repository <ExternalLink size={14} />
              </a>
            ) : (
              <span className="mono repo-soon">Repository Coming Soon</span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "110px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 50 }}>
            <div>
              <Eyebrow>Featured Projects</Eyebrow>
              <h2 className="display" style={{ fontSize: "clamp(1.7rem, 3vw, 2.3rem)", color: T.text, margin: 0 }}>
                Hardware I've built, software I've paired it with
              </h2>
            </div>
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-small">
              Explore My GitHub <ArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ACHIEVEMENTS
   ============================================================ */
function Achievements() {
  return (
    <section id="achievements" style={{ padding: "110px 24px", background: T.bgAlt, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal>
          <Eyebrow>Extracurriculars &amp; Achievements</Eyebrow>
          <h2 className="display" style={{ fontSize: "clamp(1.7rem, 3vw, 2.3rem)", color: T.text, margin: "0 0 44px" }}>
            Beyond the lab bench
          </h2>
        </Reveal>

        <div className="achieve-grid">
          {LEADERSHIP.map((l, i) => {
            const Icon = l.icon;
            return (
              <Reveal key={l.role} delay={i * 100}>
                <div className="achieve-card">
                  <div className="skill-icon"><Icon size={18} color={T.violet} strokeWidth={1.6} /></div>
                  <h3 style={{ fontSize: 15.5, color: T.text, margin: "14px 0 3px", fontWeight: 600 }}>{l.role}</h3>
                  <p className="mono" style={{ fontSize: 12, color: T.mutedDim, margin: "0 0 12px" }}>{l.org}</p>
                  <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.7, margin: 0 }}>{l.desc}</p>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={200}>
            <div className="achieve-card">
              <div className="skill-icon"><Award size={18} color={T.violet} strokeWidth={1.6} /></div>
              <h3 style={{ fontSize: 15.5, color: T.text, margin: "14px 0 3px", fontWeight: 600 }}>Certified Yoga Practitioner</h3>
              <p className="mono" style={{ fontSize: 12, color: T.mutedDim, margin: "0 0 12px" }}>Yog Parichay Examination</p>
              <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.7, margin: 0 }}>Certification</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'validated'

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (validate()) {
      // No backend is connected yet — this is intentionally not sending anything.
      // Wire up an email service (e.g. Formspree, EmailJS, or a custom API route) here.
      setStatus("validated");
    } else {
      setStatus(null);
    }
  };

  const field = (key, label, type = "text") => (
    <div style={{ marginBottom: 18 }}>
      <label htmlFor={key} className="mono" style={{ display: "block", fontSize: 11.5, color: T.muted, letterSpacing: "0.06em", marginBottom: 7, textTransform: "uppercase" }}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={key}
          rows={5}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className="input"
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-err` : undefined}
        />
      ) : (
        <input
          id={key}
          type={type}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className="input"
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-err` : undefined}
        />
      )}
      {errors[key] && (
        <p id={`${key}-err`} className="mono" style={{ color: "#f87171", fontSize: 11.5, marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}>
          <AlertCircle size={12} /> {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <section id="contact" style={{ padding: "110px 24px 130px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56 }}>
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
          <h2 className="display" style={{ fontSize: "clamp(1.7rem, 3vw, 2.3rem)", color: T.text, margin: "0 0 18px" }}>
            Let's Build Something Together
          </h2>
          <p style={{ color: T.muted, fontSize: 15.5, lineHeight: 1.8, marginBottom: 32, maxWidth: 440 }}>
            I am always interested in connecting with people who enjoy building practical technology and
            exploring new ideas. If you would like to discuss a project, collaboration, or opportunity, feel
            free to reach out.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <a href={`mailto:${SOCIALS.email}`} className="icon-link"><Mail size={17} /> <span className="mono" style={{ fontSize: 13.5 }}>{SOCIALS.email}</span></a>
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="icon-link"><GithubIcon size={17} /> <span className="mono" style={{ fontSize: 13.5 }}>github.com/mitalichatap</span></a>
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="icon-link"><LinkedinIcon size={17} /> <span className="mono" style={{ fontSize: 13.5 }}>LinkedIn Profile</span></a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={handleSubmit} noValidate className="contact-form">
            {field("name", "Name")}
            {field("email", "Email", "email")}
            {field("message", "Message", "textarea")}

            <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Send Message <Send size={15} />
            </button>

            {status === "validated" && (
              <p className="mono" style={{ marginTop: 14, fontSize: 12.5, color: T.cyan, display: "flex", alignItems: "center", gap: 7, lineHeight: 1.6 }}>
                <CheckCircle2 size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                This form isn't connected to a backend yet — reach me directly at {SOCIALS.email} in the meantime.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${T.border}`, padding: "28px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span className="mono" style={{ fontSize: 12, color: T.mutedDim }}>© {new Date().getFullYear()} Mitali Chatap</span>
        <div style={{ display: "flex", gap: 16 }}>
          <a href={`mailto:${SOCIALS.email}`} className="footer-icon" aria-label="Email"><Mail size={15} /></a>
          <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="GitHub"><GithubIcon size={15} /></a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="LinkedIn"><LinkedinIcon size={15} /></a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [active, setActive] = useState("home");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: "100vh", fontFamily: "'Inter', sans-serif", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .display { font-family: 'Space Grotesk', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        a { text-decoration: none; }
        button { font-family: inherit; }

        .circuit-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(${T.border} 1px, transparent 1px),
            linear-gradient(90deg, ${T.border} 1px, transparent 1px);
          background-size: 42px 42px;
          opacity: 0.35;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 10%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 10%, transparent 75%);
        }
        .scan-line {
          position: absolute; left: 0; right: 0; height: 120px;
          background: linear-gradient(180deg, transparent, ${T.cyanDim}, transparent);
          animation: scan 9s linear infinite;
          opacity: 0.5;
        }
        @keyframes scan { 0% { top: -120px; } 100% { top: 100%; } }

        .hero-visual { position: relative; aspect-ratio: 1/1; max-width: 400px; margin: 0 auto; }
        .trace { stroke-dasharray: 6 6; animation: dash 3.5s linear infinite; opacity: 0.6; }
        @keyframes dash { to { stroke-dashoffset: -100; } }
        .node-pulse { animation: nodepulse 2.4s ease-in-out infinite; transform-origin: center; }
        @keyframes nodepulse { 0%,100% { opacity: 0.5; r: 3.5; } 50% { opacity: 1; r: 5; } }

        .profile-frame {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 148px; height: 148px;
        }
        .profile-frame-inner {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1.5px dashed ${T.border};
          background: ${T.panel};
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .ring { position: absolute; inset: 0; border-radius: 50%; border: 1px solid ${T.borderBright}; }
        .ring-1 { animation: ringpulse 3s ease-out infinite; }
        .ring-2 { animation: ringpulse 3s ease-out infinite 1.5s; }
        @keyframes ringpulse { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(1.55); opacity: 0; } }

        .float-chip {
          position: absolute; font-size: 11px; padding: 5px 10px; border-radius: 6px;
          border: 1px solid ${T.border}; background: rgba(15,21,36,0.85); color: ${T.cyan};
          backdrop-filter: blur(6px); animation: float 6s ease-in-out infinite;
          box-shadow: 0 0 14px rgba(34,211,238,0.08);
        }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }

        .scroll-cue {
          position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
          background: none; border: 1px solid ${T.border}; border-radius: 50%;
          width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;
          color: ${T.muted}; cursor: pointer; animation: bob 2.2s ease-in-out infinite;
        }
        @keyframes bob { 0%,100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, 6px); } }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          background: ${T.cyan}; color: #06181c; border: none; border-radius: 9px;
          padding: 13px 22px; font-size: 14px; font-weight: 600; cursor: pointer;
          transition: all 0.2s ease; box-shadow: 0 0 0 rgba(34,211,238,0);
        }
        .btn-primary:hover { box-shadow: 0 0 22px rgba(34,211,238,0.4); transform: translateY(-1px); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: ${T.text}; border: 1px solid ${T.border}; border-radius: 9px;
          padding: 13px 22px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s ease;
        }
        .btn-ghost:hover { border-color: ${T.borderBright}; color: ${T.cyan}; }
        .btn-small { padding: 9px 16px; font-size: 13px; }

        .icon-link { display: inline-flex; align-items: center; gap: 8px; color: ${T.muted}; transition: color 0.2s ease; }
        .icon-link:hover { color: ${T.cyan}; }
        .footer-icon { color: ${T.mutedDim}; display: inline-flex; transition: color 0.2s ease; }
        .footer-icon:hover { color: ${T.cyan}; }
        .navlink:hover { color: ${T.text} !important; }

        .edu-card {
          background: ${T.panel}; border: 1px solid ${T.border}; border-radius: 12px; padding: 16px 18px;
          transition: border-color 0.25s ease;
        }
        .edu-card:hover { border-color: ${T.borderBright}; }

        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .skill-card {
          background: ${T.panel}; border: 1px solid ${T.border}; border-radius: 14px; padding: 24px;
          transition: all 0.3s ease; height: 100%;
        }
        .skill-card:hover { border-color: ${T.borderBright}; box-shadow: 0 0 26px rgba(34,211,238,0.06); transform: translateY(-2px); }
        .skill-icon {
          width: 38px; height: 38px; border-radius: 10px; background: ${T.cyanDim};
          border: 1px solid ${T.borderBright}; display: flex; align-items: center; justify-content: center;
        }

        .achieve-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .achieve-card { background: ${T.panel}; border: 1px solid ${T.border}; border-radius: 14px; padding: 24px; transition: all 0.3s ease; }
        .achieve-card:hover { border-color: rgba(167,139,250,0.4); transform: translateY(-2px); }

        .project-card {
          background: ${T.panel}; border: 1px solid ${T.border}; border-radius: 18px; padding: 28px;
          transition: border-color 0.3s ease;
        }
        .project-card:hover { border-color: ${T.borderBright}; }
        .project-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 34px; align-items: start; }
        .project-icon { width: 30px; height: 30px; border-radius: 8px; background: ${T.cyanDim}; border: 1px solid ${T.borderBright}; display: flex; align-items: center; justify-content: center; }
        .status-pill { font-size: 11px; color: ${T.violet}; border: 1px solid rgba(167,139,250,0.35); padding: 3px 10px; border-radius: 20px; }
        .repo-soon { display: inline-block; font-size: 12px; color: ${T.mutedDim}; border: 1px dashed ${T.border}; padding: 10px 16px; border-radius: 9px; }

        .media-gallery { width: 100%; }
        .media-featured {
          position: relative; aspect-ratio: 16/10; border-radius: 12px; border: 1.5px dashed ${T.border};
          background: ${T.panel2}; display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 6px; text-align: center; padding: 20px;
        }
        .media-label { font-size: 11.5px; color: ${T.mutedDim}; letter-spacing: 0.08em; margin-top: 6px; }
        .media-sublabel { font-size: 10.5px; color: ${T.mutedDim}; opacity: 0.65; }
        .media-nav {
          position: absolute; top: 50%; transform: translateY(-50%); background: rgba(10,14,22,0.7);
          border: 1px solid ${T.border}; color: ${T.text}; width: 30px; height: 30px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
        }
        .media-nav-left { left: 10px; } .media-nav-right { right: 10px; }
        .media-nav:hover { border-color: ${T.borderBright}; }
        .media-thumbs { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
        .media-thumb {
          width: 34px; height: 34px; border-radius: 7px; background: ${T.panel2}; border: 1px solid ${T.border};
          display: flex; align-items: center; justify-content: center; cursor: pointer;
        }
        .media-thumb-active { border-color: ${T.cyan}; box-shadow: 0 0 8px rgba(34,211,238,0.25); }

        .contact-form { background: ${T.panel}; border: 1px solid ${T.border}; border-radius: 16px; padding: 28px; }
        .input {
          width: 100%; background: ${T.panel2}; border: 1px solid ${T.border}; border-radius: 9px;
          padding: 11px 13px; color: ${T.text}; font-size: 14px; font-family: 'Inter', sans-serif; resize: vertical;
        }
        .input:focus { outline: none; border-color: ${T.cyan}; box-shadow: 0 0 0 3px ${T.cyanDim}; }

        .reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal-in { opacity: 1; transform: translateY(0); }

        .hide-desktop { display: none; }
        @media (max-width: 880px) {
          .hide-mobile { display: none !important; }
          .hide-desktop { display: inline-flex; }
          .about-grid, .project-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .achieve-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 880px) {
          section > div[style*="grid-template-columns: 1fr 1.15fr"],
          section > div[style*="grid-template-columns: 1.15fr 0.85fr"],
          section > div[style*="grid-template-columns: 0.9fr 1.1fr"] {
            grid-template-columns: 1fr !important;
          }
          .project-grid[style] { direction: ltr !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      <Navbar active={active} onNavigate={scrollTo} />
      <Hero onNavigate={scrollTo} />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}
