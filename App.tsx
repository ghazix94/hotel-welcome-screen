import { useEffect, useState, useRef } from "react";
import "./hotel.css";

// ─── EDITABLE GUEST CONFIG ─────────────────────────────────────────────────
const GUEST_NAME = "Mr. & Mrs. Johnson";
const HOTEL_NAME = "THE GRAND ORÉA";
const HOTEL_TAGLINE = "A Collection of Extraordinary Moments";
const ROOM_NUMBER = "Suite 814";
const WIFI_NAME = "GrandOrea_Premium";
const WIFI_PASSWORD = "Welcome2024";
const SUPPORT_NUMBER = "Dial 0";
const CHECK_OUT_DATE = "Sunday, May 26";

const SERVICES = [
  {
    icon: "✦",
    title: "High-Speed Wi-Fi",
    lines: [`Network: ${WIFI_NAME}`, `Password: ${WIFI_PASSWORD}`],
  },
  {
    icon: "✦",
    title: "Concierge & Support",
    lines: [SUPPORT_NUMBER, "Available 24 hours"],
  },
  {
    icon: "✦",
    title: "Room Controls",
    lines: ["Climate · Lighting · Curtains", "Via the in-room panel"],
  },
  {
    icon: "✦",
    title: "Housekeeping",
    lines: ["Daily service: 10:00 – 14:00", "Request via this screen"],
  },
  {
    icon: "✦",
    title: "Fine Dining",
    lines: ["Le Jardin Restaurant · Level 2", "In-room dining: 06:00 – 01:00"],
  },
  {
    icon: "✦",
    title: "Spa & Wellness",
    lines: ["Oréa Spa · Level B1", "Book via concierge or Dial 3"],
  },
];

// ─── Types ─────────────────────────────────────────────────────────────────
type View = "welcome" | "services" | "room-status";
type RoomStatus = null | "dnd" | "makeup";

// ─── Helpers ───────────────────────────────────────────────────────────────
function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

// ─── Background images (Ken Burns) ─────────────────────────────────────────
const BG_IMAGES = [
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=85",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=85",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=85",
];

// ─── Components ────────────────────────────────────────────────────────────
function KenBurnsBackground() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % BG_IMAGES.length);
        setNext((n) => (n + 1) % BG_IMAGES.length);
        setTransitioning(false);
      }, 2000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-layer">
      <div
        className={`bg-img bg-img--a ${!transitioning ? "kb-animate" : "kb-animate fade-out"}`}
        style={{ backgroundImage: `url(${BG_IMAGES[current]})` }}
      />
      <div
        className={`bg-img bg-img--b ${transitioning ? "kb-animate fade-in" : ""}`}
        style={{ backgroundImage: `url(${BG_IMAGES[next]})` }}
      />
      <div className="bg-overlay" />
    </div>
  );
}

// ─── Room Status Badge (shown on welcome/services) ──────────────────────────
function RoomStatusBadge({ status, onClick }: { status: RoomStatus; onClick: () => void }) {
  if (!status) return null;
  const isDnd = status === "dnd";
  return (
    <button
      className={`status-badge status-badge--${status}`}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      aria-label="Room status"
    >
      <span className="status-badge-icon">{isDnd ? "⊘" : "✦"}</span>
      <span className="status-badge-text">{isDnd ? "Do Not Disturb" : "Make Up Room"}</span>
    </button>
  );
}

// ─── Welcome Section ────────────────────────────────────────────────────────
function WelcomeSection({
  visible,
  roomStatus,
  onStatusClick,
}: {
  visible: boolean;
  roomStatus: RoomStatus;
  onStatusClick: () => void;
}) {
  const now = useClock();
  return (
    <section className={`section welcome-section${visible ? " section--active" : ""}`}>
      <KenBurnsBackground />
      <div className="welcome-content">
        <div className="hotel-logo fade-up delay-0">
          <div className="logo-ornament">❧</div>
          <h1 className="hotel-name">{HOTEL_NAME}</h1>
          <div className="hotel-tagline">{HOTEL_TAGLINE}</div>
          <div className="gold-divider" />
        </div>

        <div className="welcome-text fade-up delay-1">
          <p className="welcome-label">Welcome</p>
          <h2 className="guest-name">{GUEST_NAME}</h2>
          <p className="room-label">{ROOM_NUMBER}</p>
        </div>

        <div className="clock-block fade-up delay-2">
          <div className="clock-time">{formatTime(now)}</div>
          <div className="clock-date">{formatDate(now)}</div>
          <div className="checkout">Check-out · {CHECK_OUT_DATE}</div>
        </div>
      </div>

      <button className="scroll-cue fade-up delay-3" aria-label="View services">
        <span>Services &amp; Amenities</span>
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <path d="M1 1L10 10L19 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <RoomStatusBadge status={roomStatus} onClick={onStatusClick} />
    </section>
  );
}

// ─── Services Section ───────────────────────────────────────────────────────
function ServicesSection({
  visible,
  roomStatus,
  onStatusClick,
}: {
  visible: boolean;
  roomStatus: RoomStatus;
  onStatusClick: () => void;
}) {
  return (
    <section className={`section services-section${visible ? " section--active" : ""}`}>
      <div className="services-bg" />
      <div className="services-inner">
        <div className="services-header">
          <div className="logo-ornament-sm">❧</div>
          <h2 className="services-title">Services &amp; Amenities</h2>
          <div className="gold-divider gold-divider--sm" />
          <p className="services-sub">{HOTEL_NAME} · {ROOM_NUMBER}</p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className="service-card fade-up" style={{ animationDelay: `${0.1 + i * 0.12}s` }} key={i}>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-card-title">{s.title}</h3>
              <div className="service-divider" />
              {s.lines.map((l, j) => (
                <p className="service-line" key={j}>{l}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="services-footer">
          <p>We wish you a most pleasurable stay.</p>
        </div>
      </div>

      <RoomStatusBadge status={roomStatus} onClick={onStatusClick} />
    </section>
  );
}

// ─── Room Status Section ────────────────────────────────────────────────────
function RoomStatusSection({
  visible,
  roomStatus,
  onSelect,
}: {
  visible: boolean;
  roomStatus: RoomStatus;
  onSelect: (s: RoomStatus) => void;
}) {
  const [confirmed, setConfirmed] = useState<RoomStatus>(null);

  // Show confirmation flash then settle
  function handleSelect(s: RoomStatus) {
    if (roomStatus === s) {
      onSelect(null);
      setConfirmed(null);
    } else {
      onSelect(s);
      setConfirmed(s);
      setTimeout(() => setConfirmed(null), 2200);
    }
  }

  return (
    <section className={`section room-status-section${visible ? " section--active" : ""}`}>
      <div className="rs-bg" />

      <div className="rs-inner">
        {/* Header */}
        <div className="rs-header fade-up delay-0">
          <div className="logo-ornament-sm">❧</div>
          <h2 className="rs-title">Room Preference</h2>
          <div className="gold-divider gold-divider--sm" />
          <p className="rs-sub">{HOTEL_NAME} · {ROOM_NUMBER}</p>
        </div>

        {/* Cards */}
        <div className="rs-cards fade-up delay-1">
          {/* Do Not Disturb */}
          <button
            className={`rs-card rs-card--dnd${roomStatus === "dnd" ? " rs-card--active" : ""}`}
            onClick={(e) => { e.stopPropagation(); handleSelect("dnd"); }}
          >
            <div className="rs-card-glow rs-card-glow--dnd" />
            <div className="rs-icon rs-icon--dnd">⊘</div>
            <h3 className="rs-card-title">Do Not Disturb</h3>
            <div className="rs-card-divider" />
            <p className="rs-card-desc">Privacy mode active.</p>
            <p className="rs-card-desc">Housekeeping will not enter your room.</p>
            {roomStatus === "dnd" && (
              <div className="rs-active-pill">Active</div>
            )}
          </button>

          {/* Make Up Room */}
          <button
            className={`rs-card rs-card--makeup${roomStatus === "makeup" ? " rs-card--active" : ""}`}
            onClick={(e) => { e.stopPropagation(); handleSelect("makeup"); }}
          >
            <div className="rs-card-glow rs-card-glow--makeup" />
            <div className="rs-icon rs-icon--makeup">✦</div>
            <h3 className="rs-card-title">Make Up Room</h3>
            <div className="rs-card-divider" />
            <p className="rs-card-desc">Housekeeping has been notified</p>
            <p className="rs-card-desc">and will attend to your room shortly.</p>
            {roomStatus === "makeup" && (
              <div className="rs-active-pill rs-active-pill--makeup">Active</div>
            )}
          </button>
        </div>

        {/* Confirmation toast */}
        <div className={`rs-confirm fade-up${confirmed ? " rs-confirm--visible" : ""}`}>
          {confirmed === "dnd" && "✓  Do Not Disturb is now active"}
          {confirmed === "makeup" && "✓  Housekeeping has been notified"}
        </div>

        {/* Hint */}
        <p className="rs-hint fade-up delay-2">
          Select a preference above · Select again to cancel
        </p>
      </div>
    </section>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState<View>("welcome");
  const [roomStatus, setRoomStatus] = useState<RoomStatus>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-cycle only between welcome ↔ services (never into room-status)
  useEffect(() => {
    const id = setInterval(() => {
      setView((v) => {
        if (v === "room-status") return v;
        return v === "welcome" ? "services" : "welcome";
      });
    }, 14000);
    return () => clearInterval(id);
  }, []);

  // Scroll to navigate welcome ↔ services; room-status is nav-only
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheel < 800) return;
      lastWheel = now;
      setView((v) => {
        if (v === "room-status") return v;
        if (e.deltaY > 20) return "services";
        if (e.deltaY < -20) return "welcome";
        return v;
      });
    };

    // Click anywhere on welcome/services (not on buttons) to cycle
    const onClick = () => {
      setView((v) => {
        if (v === "room-status") return v;
        return v === "welcome" ? "services" : "welcome";
      });
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("click", onClick);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="app">
      <WelcomeSection
        visible={view === "welcome"}
        roomStatus={roomStatus}
        onStatusClick={() => setView("room-status")}
      />
      <ServicesSection
        visible={view === "services"}
        roomStatus={roomStatus}
        onStatusClick={() => setView("room-status")}
      />
      <RoomStatusSection
        visible={view === "room-status"}
        roomStatus={roomStatus}
        onSelect={setRoomStatus}
      />

      {/* Dot nav — 3 dots */}
      <nav className="dot-nav">
        <button
          className={`dot${view === "welcome" ? " dot--active" : ""}`}
          onClick={(e) => { e.stopPropagation(); setView("welcome"); }}
          aria-label="Welcome"
        />
        <button
          className={`dot${view === "services" ? " dot--active" : ""}`}
          onClick={(e) => { e.stopPropagation(); setView("services"); }}
          aria-label="Services"
        />
        <button
          className={`dot dot--room${view === "room-status" ? " dot--active" : ""}${roomStatus ? " dot--status-on" : ""}`}
          onClick={(e) => { e.stopPropagation(); setView("room-status"); }}
          aria-label="Room Status"
        />
      </nav>
    </div>
  );
}
