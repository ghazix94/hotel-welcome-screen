import { useEffect, useState, useRef } from "react";
import "./hotel.css";

// ─── EDITABLE GUEST CONFIG ─────────────────────────────────────────────────
const GUEST_NAME = "Our Distinguished Guest"; 
const HOTEL_NAME = "Ghazix Homes"; // تم التحديث هنا
[span_12](start_span)const HOTEL_TAGLINE = "A Collection of Extraordinary Moments";[span_12](end_span)
const ROOM_NUMBER = "Premium Apartment"; // تم التحديث لتناسب الشقق الفاخرة
const WIFI_NAME = "Ghazix_Homes_Guest"; // تم التحديث
const WIFI_PASSWORD = "Welcome✨2026"; // تم التحديث
const SUPPORT_NUMBER = "Contact Host"; // تم التحديث
const CHECK_OUT_DATE = "11:00 AM on Departure Day"; // تم التحديث
[span_13](start_span)const SERVICES = [[span_13](end_span)
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
    [span_14](start_span)lines: ["Daily service available", "Request via this screen"],[span_14](end_span)
  },
  {
    icon: "✦",
    title: "Fine Dining",
    lines: ["Local Guide Highlights", "In-room dining guides available"],
  },
  {
    icon: "✦",
    title: "Spa & Wellness",
    lines: ["Premium Relaxation", "Book via host support"],
  },
[span_15](start_span)];[span_15](end_span)

// ─── Types ─────────────────────────────────────────────────────────────────
type View = "welcome" | "services" | [span_16](start_span)"room-status";[span_16](end_span)
type RoomStatus = null | "dnd" | [span_17](start_span)"makeup";[span_17](end_span)

// ─── Helpers ───────────────────────────────────────────────────────────────
[span_18](start_span)function useClock() {[span_18](end_span)
  [span_19](start_span)const [time, setTime] = useState(new Date());[span_19](end_span)
  [span_20](start_span)useEffect(() => {[span_20](end_span)
    [span_21](start_span)const id = setInterval(() => setTime(new Date()), 1000);[span_21](end_span)
    [span_22](start_span)return () => clearInterval(id);[span_22](end_span)
  [span_23](start_span)}, []);[span_23](end_span)
  [span_24](start_span)return time;[span_24](end_span)
}

[span_25](start_span)function formatTime(d: Date) {[span_25](end_span)
  [span_26](start_span)return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });[span_26](end_span)
}

[span_27](start_span)function formatDate(d: Date) {[span_27](end_span)
  [span_28](start_span)return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });[span_28](end_span)
}

// ─── Background images (Ken Burns) ─────────────────────────────────────────
[span_29](start_span)const BG_IMAGES = [[span_29](end_span)
  [span_30](start_span)"https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=85",[span_30](end_span)
  [span_31](start_span)"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=85",[span_31](end_span)
  [span_32](start_span)"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=85",[span_32](end_span)
[span_33](start_span)];[span_33](end_span)

// ─── Components ────────────────────────────────────────────────────────────
[span_34](start_span)function KenBurnsBackground() {[span_34](end_span)
  [span_35](start_span)const [current, setCurrent] = useState(0);[span_35](end_span)
  [span_36](start_span)const [next, setNext] = useState(1);[span_36](end_span)
  [span_37](start_span)const [transitioning, setTransitioning] = useState(false);[span_37](end_span)

  [span_38](start_span)useEffect(() => {[span_38](end_span)
    [span_39](start_span)const interval = setInterval(() => {[span_39](end_span)
      [span_40](start_span)setTransitioning(true);[span_40](end_span)
      [span_41](start_span)setTimeout(() => {[span_41](end_span)
        [span_42](start_span)setCurrent((c) => (c + 1) % BG_IMAGES.length);[span_42](end_span)
        [span_43](start_span)setNext((n) => (n + 1) % BG_IMAGES.length);[span_43](end_span)
        [span_44](start_span)setTransitioning(false);[span_44](end_span)
      [span_45](start_span)}, 2000);[span_45](end_span)
    [span_46](start_span)}, 8000);[span_46](end_span)
    [span_47](start_span)return () => clearInterval(interval);[span_47](end_span)
  [span_48](start_span)}, []);[span_48](end_span)

  [span_49](start_span)return ([span_49](end_span)
    [span_50](start_span)<div className="bg-layer">[span_50](end_span)
      [span_51](start_span)<div[span_51](end_span)
        className={`bg-img bg-img--a ${!transitioning ? [span_52](start_span)"kb-animate" : "kb-animate fade-out"}`}[span_52](end_span)
        [span_53](start_span)style={{ backgroundImage: `url(${BG_IMAGES[current]})` }}[span_53](end_span)
      [span_54](start_span)/>[span_54](end_span)
      [span_55](start_span)<div[span_55](end_span)
        className={`bg-img bg-img--b ${transitioning ? [span_56](start_span)"kb-animate fade-in" : ""}`}[span_56](end_span)
        [span_57](start_span)style={{ backgroundImage: `url(${BG_IMAGES[next]})` }}[span_57](end_span)
      [span_58](start_span)/>[span_58](end_span)
      [span_59](start_span)<div className="bg-overlay" />[span_59](end_span)
    [span_60](start_span)</div>[span_60](end_span)
  [span_61](start_span));[span_61](end_span)
}

[span_62](start_span)function RoomStatusBadge({ status, onClick }: { status: RoomStatus; onClick: () => void }) {[span_62](end_span)
  [span_63](start_span)if (!status) return null;[span_63](end_span)
  [span_64](start_span)const isDnd = status === "dnd";[span_64](end_span)
  [span_65](start_span)return ([span_65](end_span)
    [span_66](start_span)<button[span_66](end_span)
      [span_67](start_span)className={`status-badge status-badge--${status}`}[span_67](end_span)
      onClick={(e) => { e.stopPropagation(); onClick(); [span_68](start_span)}}[span_68](end_span)
      [span_69](start_span)aria-label="Room status"[span_69](end_span)
    > [span_70](start_span)
      <span className="status-badge-icon">{isDnd ? "⊘" : "✦"}</span>[span_70](end_span)
      <span className="status-badge-text">{isDnd ? [span_71](start_span)"Do Not Disturb" : "Make Up Room"}</span>[span_71](end_span)
    [span_72](start_span)</button>[span_72](end_span)
  [span_73](start_span));[span_73](end_span)
}

[span_74](start_span)function WelcomeSection({[span_74](end_span)
  [span_75](start_span)visible,[span_75](end_span)
  [span_76](start_span)roomStatus,[span_76](end_span)
  [span_77](start_span)onStatusClick,[span_77](end_span)
[span_78](start_span)}: {[span_78](end_span)
  [span_79](start_span)visible: boolean;[span_79](end_span)
  [span_80](start_span)roomStatus: RoomStatus;[span_80](end_span)
  [span_81](start_span)onStatusClick: () => void;[span_81](end_span)
[span_82](start_span)}) {[span_82](end_span)
  [span_83](start_span)const now = useClock();[span_83](end_span)
  [span_84](start_span)return ([span_84](end_span)
    <section className={`section welcome-section${visible ? [span_85](start_span)" section--active" : ""}`}>[span_85](end_span)
      [span_86](start_span)<KenBurnsBackground />[span_86](end_span)
      [span_87](start_span)<div className="welcome-content">[span_87](end_span)
        [span_88](start_span)<div className="hotel-logo fade-up delay-0">[span_88](end_span)
          [span_89](start_span)<div className="logo-ornament">❧</div>[span_89](end_span)
          [span_90](start_span)<h1 className="hotel-name">{HOTEL_NAME}</h1>[span_90](end_span)
          [span_91](start_span)<div className="hotel-tagline">{HOTEL_TAGLINE}</div>[span_91](end_span)
          [span_92](start_span)<div className="gold-divider" />[span_92](end_span)
        [span_93](start_span)</div>[span_93](end_span)

        [span_94](start_span)<div className="welcome-text fade-up delay-1">[span_94](end_span)
          [span_95](start_span)<p className="welcome-label">Welcome</p>[span_95](end_span)
          [span_96](start_span)<h2 className="guest-name">{GUEST_NAME}</h2>[span_96](end_span)
          [span_97](start_span)<p className="room-label">{ROOM_NUMBER}</p>[span_97](end_span)
        [span_98](start_span)</div>[span_98](end_span)

        [span_99](start_span)<div className="clock-block fade-up delay-2">[span_99](end_span)
          [span_100](start_span)<div className="clock-time">{formatTime(now)}</div>[span_100](end_span)
          [span_101](start_span)<div className="clock-date">{formatDate(now)}</div>[span_101](end_span)
          [span_102](start_span)<div className="checkout">Check-out · {CHECK_OUT_DATE}</div>[span_102](end_span)
        [span_103](start_span)</div>[span_103](end_span)
      [span_104](start_span)</div>[span_104](end_span)

      [span_105](start_span)<button className="scroll-cue fade-up delay-3" aria-label="View services">[span_105](end_span)
        <span>Services &amp; [span_106](start_span)Amenities</span>[span_106](end_span)
        [span_107](start_span)<svg width="20" height="12" viewBox="0 0 20 12" fill="none">[span_107](end_span)
          [span_108](start_span)<path d="M1 1L10 10L19 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />[span_108](end_span)
        [span_109](start_span)</svg>[span_109](end_span)
      [span_110](start_span)</button>[span_110](end_span)

      [span_111](start_span)<RoomStatusBadge status={roomStatus} onClick={onStatusClick} />[span_111](end_span)
    [span_112](start_span)</section>[span_112](end_span)
  [span_113](start_span));[span_113](end_span)
}

[span_114](start_span)function ServicesSection({[span_114](end_span)
  [span_115](start_span)visible,[span_115](end_span)
  [span_116](start_span)roomStatus,[span_116](end_span)
  [span_117](start_span)onStatusClick,[span_117](end_span)
[span_118](start_span)}: {[span_118](end_span)
  [span_119](start_span)visible: boolean;[span_119](end_span)
  [span_120](start_span)roomStatus: RoomStatus;[span_120](end_span)
  [span_121](start_span)onStatusClick: () => void;[span_121](end_span)
[span_122](start_span)}) {[span_122](end_span)
  [span_123](start_span)return ([span_123](end_span)
    <section className={`section services-section${visible ? [span_124](start_span)" section--active" : ""}`}>[span_124](end_span)
      [span_125](start_span)<div className="services-bg" />[span_125](end_span)
      [span_126](start_span)<div className="services-inner">[span_126](end_span)
        [span_127](start_span)<div className="services-header">[span_127](end_span)
          [span_128](start_span)<div className="logo-ornament-sm">❧</div>[span_128](end_span)
          <h2 className="services-title">Services &amp; [span_129](start_span)Amenities</h2>[span_129](end_span)
          [span_130](start_span)<div className="gold-divider gold-divider--sm" />[span_130](end_span)
          [span_131](start_span)<p className="services-sub">{HOTEL_NAME} · {ROOM_NUMBER}</p>[span_131](end_span)
        [span_132](start_span)</div>[span_132](end_span)

        [span_133](start_span)<div className="services-grid">[span_133](end_span)
          [span_134](start_span){SERVICES.map((s, i) => ([span_134](end_span)
            [span_135](start_span)<div className="service-card fade-up" style={{ animationDelay: `${0.1 + i * 0.12}s` }} key={i}>[span_135](end_span)
              [span_136](start_span)<div className="service-icon">{s.icon}</div>[span_136](end_span)
              [span_137](start_span)<h3 className="service-card-title">{s.title}</h3>[span_137](end_span)
              [span_138](start_span)<div className="service-divider" />[span_138](end_span)
              [span_139](start_span){s.lines.map((l, j) => ([span_139](end_span)
                [span_140](start_span)<p className="service-line" key={j}>{l}</p>[span_140](end_span)
              [span_141](start_span)))}[span_141](end_span)
            [span_142](start_span)</div>[span_142](end_span)
          [span_143](start_span)))}[span_143](end_span)
        [span_144](start_span)</div>[span_144](end_span)

        [span_145](start_span)<div className="services-footer">[span_145](end_span)
          [span_146](start_span)<p>We wish you a most pleasurable stay.</p>[span_146](end_span)
        [span_147](start_span)</div>[span_147](end_span)
      [span_148](start_span)</div>[span_148](end_span)

      [span_149](start_span)<RoomStatusBadge status={roomStatus} onClick={onStatusClick} />[span_149](end_span)
    [span_150](start_span)</section>[span_150](end_span)
  [span_151](start_span));[span_151](end_span)
}

[span_152](start_span)function RoomStatusSection({[span_152](end_span)
  [span_153](start_span)visible,[span_153](end_span)
  [span_154](start_span)roomStatus,[span_154](end_span)
  [span_155](start_span)onSelect,[span_155](end_span)
[span_156](start_span)}: {[span_156](end_span)
  [span_157](start_span)visible: boolean;[span_157](end_span)
  [span_158](start_span)roomStatus: RoomStatus;[span_158](end_span)
  [span_159](start_span)onSelect: (s: RoomStatus) => void;[span_159](end_span)
[span_160](start_span)}) {[span_160](end_span)
  [span_161](start_span)const [confirmed, setConfirmed] = useState<RoomStatus>(null);[span_161](end_span)
  [span_162](start_span)function handleSelect(s: RoomStatus) {[span_162](end_span)
    [span_163](start_span)if (roomStatus === s) {[span_163](end_span)
      [span_164](start_span)onSelect(null);[span_164](end_span)
      [span_165](start_span)setConfirmed(null);[span_165](end_span)
    [span_166](start_span)} else {[span_166](end_span)
      [span_167](start_span)onSelect(s);[span_167](end_span)
      [span_168](start_span)setConfirmed(s);[span_168](end_span)
      [span_169](start_span)setTimeout(() => setConfirmed(null), 2200);[span_169](end_span)
    [span_170](start_span)}
  }[span_170](end_span)

  [span_171](start_span)return ([span_171](end_span)
    <section className={`section room-status-section${visible ? [span_172](start_span)" section--active" : ""}`}>[span_172](end_span)
      [span_173](start_span)<div className="rs-bg" />[span_173](end_span)
      [span_174](start_span)<div className="rs-inner">[span_174](end_span)
        [span_175](start_span)<div className="rs-header fade-up delay-0">[span_175](end_span)
          [span_176](start_span)<div className="logo-ornament-sm">❧</div>[span_176](end_span)
          [span_177](start_span)<h2 className="rs-title">Room Preference</h2>[span_177](end_span)
          [span_178](start_span)<div className="gold-divider gold-divider--sm" />[span_178](end_span)
          [span_179](start_span)<p className="rs-sub">{HOTEL_NAME} · {ROOM_NUMBER}</p>[span_179](end_span)
        [span_180](start_span)</div>[span_180](end_span)

        [span_181](start_span)<div className="rs-cards fade-up delay-1">[span_181](end_span)
          [span_182](start_span)<button[span_182](end_span)
            className={`rs-card rs-card--dnd${roomStatus === "dnd" ? [span_183](start_span)" rs-card--active" : ""}`}[span_183](end_span)
            onClick={(e) => { e.stopPropagation(); handleSelect("dnd"); [span_184](start_span)}}[span_184](end_span)
          > [span_185](start_span)
            <div className="rs-card-glow rs-card-glow--dnd" />[span_185](end_span)
            [span_186](start_span)<div className="rs-icon rs-icon--dnd">⊘</div>[span_186](end_span)
            [span_187](start_span)<h3 className="rs-card-title">Do Not Disturb</h3>[span_187](end_span)
            [span_188](start_span)<div className="rs-card-divider" />[span_188](end_span)
            [span_189](start_span)<p className="rs-card-desc">Privacy mode active.</p>[span_189](end_span)
            [span_190](start_span)<p className="rs-card-desc">Housekeeping will not enter your room.</p>[span_190](end_span)
            [span_191](start_span){roomStatus === "dnd" && ([span_191](end_span)
              [span_192](start_span)<div className="rs-active-pill">Active</div>[span_192](end_span)
            [span_193](start_span))}[span_193](end_span)
          [span_194](start_span)</button>[span_194](end_span)

          [span_195](start_span)<button[span_195](end_span)
            className={`rs-card rs-card--makeup${roomStatus === "makeup" ? [span_196](start_span)" rs-card--active" : ""}`}[span_196](end_span)
            onClick={(e) => { e.stopPropagation(); handleSelect("makeup"); [span_197](start_span)}}[span_197](end_span)
          > [span_198](start_span)
            <div className="rs-card-glow rs-card-glow--makeup" />[span_198](end_span)
            [span_199](start_span)<div className="rs-icon rs-icon--makeup">✦</div>[span_199](end_span)
            [span_200](start_span)<h3 className="rs-card-title">Make Up Room</h3>[span_200](end_span)
            [span_201](start_span)<div className="rs-card-divider" />[span_201](end_span)
            [span_202](start_span)<p className="rs-card-desc">Housekeeping has been notified</p>[span_202](end_span)
            [span_203](start_span)<p className="rs-card-desc">and will attend to your room shortly.</p>[span_203](end_span)
            [span_204](start_span){roomStatus === "makeup" && ([span_204](end_span)
              [span_205](start_span)<div className="rs-active-pill rs-active-pill--makeup">Active</div>[span_205](end_span)
            [span_206](start_span))}[span_206](end_span)
          [span_207](start_span)</button>[span_207](end_span)
        [span_208](start_span)</div>[span_208](end_span)

        <div className={`rs-confirm fade-up${confirmed ? [span_209](start_span)" rs-confirm--visible" : ""}`}>[span_209](end_span)
          [span_210](start_span){confirmed === "dnd" && "✓  Do Not Disturb is now active"}[span_210](end_span)
          [span_211](start_span){confirmed === "makeup" && "✓  Housekeeping has been notified"}[span_211](end_span)
        [span_212](start_span)</div>[span_212](end_span)

        [span_213](start_span)<p className="rs-hint fade-up delay-2">[span_213](end_span)
          [span_214](start_span)Select a preference above · Select again to cancel[span_214](end_span)
        [span_215](start_span)</p>[span_215](end_span)
      [span_216](start_span)</div>[span_216](end_span)
    [span_217](start_span)</section>[span_217](end_span)
  [span_218](start_span));[span_218](end_span)
}

[span_219](start_span)export default function App() {[span_219](end_span)
  [span_220](start_span)const [view, setView] = useState<View>("welcome");[span_220](end_span)
  [span_221](start_span)const [roomStatus, setRoomStatus] = useState<RoomStatus>(null);[span_221](end_span)
  [span_222](start_span)const containerRef = useRef<HTMLDivElement>(null);[span_222](end_span)

  [span_223](start_span)useEffect(() => {[span_223](end_span)
    [span_224](start_span)const id = setInterval(() => {[span_224](end_span)
      [span_225](start_span)setView((v) => {[span_225](end_span)
        [span_226](start_span)if (v === "room-status") return v;[span_226](end_span)
        return v === "welcome" ? [span_227](start_span)"services" : "welcome";[span_227](end_span)
      [span_228](start_span)});[span_228](end_span)
    [span_229](start_span)}, 14000);[span_229](end_span)
    [span_230](start_span)return () => clearInterval(id);[span_230](end_span)
  [span_231](start_span)}, []);[span_231](end_span)

  [span_232](start_span)useEffect(() => {[span_232](end_span)
    [span_233](start_span)const el = containerRef.current;[span_233](end_span)
    [span_234](start_span)if (!el) return;[span_234](end_span)

    [span_235](start_span)let lastWheel = 0;[span_235](end_span)
    [span_236](start_span)const onWheel = (e: WheelEvent) => {[span_236](end_span)
      [span_237](start_span)const now = Date.now();[span_237](end_span)
      [span_238](start_span)if (now - lastWheel < 800) return;[span_238](end_span)
      [span_239](start_span)lastWheel = now;[span_239](end_span)
      [span_240](start_span)setView((v) => {[span_240](end_span)
        [span_241](start_span)if (v === "room-status") return v;[span_241](end_span)
        [span_242](start_span)if (e.deltaY > 20) return "services";[span_242](end_span)
        [span_243](start_span)if (e.deltaY < -20) return "welcome";[span_243](end_span)
        [span_244](start_span)return v;[span_244](end_span)
      [span_245](start_span)});[span_245](end_span)
    [span_246](start_span)};[span_246](end_span)

    [span_247](start_span)const onClick = () => {[span_247](end_span)
      [span_248](start_span)setView((v) => {[span_248](end_span)
        [span_249](start_span)if (v === "room-status") return v;[span_249](end_span)
        return v === "welcome" ? [span_250](start_span)"services" : "welcome";[span_250](end_span)
      [span_251](start_span)});[span_251](end_span)
    [span_252](start_span)};[span_252](end_span)

    [span_253](start_span)el.addEventListener("wheel", onWheel, { passive: true });[span_253](end_span)
    [span_254](start_span)el.addEventListener("click", onClick);[span_254](end_span)

    [span_255](start_span)return () => {[span_255](end_span)
      [span_256](start_span)el.removeEventListener("wheel", onWheel);[span_256](end_span)
      [span_257](start_span)el.removeEventListener("click", onClick);[span_257](end_span)
    [span_258](start_span)};[span_258](end_span)
  [span_259](start_span)}, []);[span_259](end_span)

  [span_260](start_span)return ([span_260](end_span)
    [span_261](start_span)<div ref={containerRef} className="app">[span_261](end_span)
      [span_262](start_span)<WelcomeSection[span_262](end_span)
        [span_263](start_span)visible={view === "welcome"}[span_263](end_span)
        [span_264](start_span)roomStatus={roomStatus}[span_264](end_span)
        [span_265](start_span)onStatusClick={() => setView("room-status")}[span_265](end_span)
      [span_266](start_span)/>[span_266](end_span)
      [span_267](start_span)<ServicesSection[span_267](end_span)
        [span_268](start_span)visible={view === "services"}[span_268](end_span)
        [span_269](start_span)roomStatus={roomStatus}[span_269](end_span)
        [span_270](start_span)onStatusClick={() => setView("room-status")}[span_270](end_span)
      [span_271](start_span)/>[span_271](end_span)
      [span_272](start_span)<RoomStatusSection[span_272](end_span)
        [span_273](start_span)visible={view === "room-status"}[span_273](end_span)
        [span_274](start_span)roomStatus={roomStatus}[span_274](end_span)
        [span_275](start_span)onSelect={setRoomStatus}[span_275](end_span)
      [span_276](start_span)/>[span_276](end_span)

      [span_277](start_span)<nav className="dot-nav">[span_277](end_span)
        [span_278](start_span)<button[span_278](end_span)
          className={`dot${view === "welcome" ? [span_279](start_span)" dot--active" : ""}`}[span_279](end_span)
          onClick={(e) => { e.stopPropagation(); setView("welcome"); [span_280](start_span)}}[span_280](end_span)
          [span_281](start_span)aria-label="Welcome"[span_281](end_span)
        [span_282](start_span)/>[span_282](end_span)
        [span_283](start_span)<button[span_283](end_span)
          className={`dot${view === "services" ? [span_284](start_span)" dot--active" : ""}`}[span_284](end_span)
          onClick={(e) => { e.stopPropagation(); setView("services"); [span_285](start_span)}}[span_285](end_span)
          [span_286](start_span)aria-label="Services"[span_286](end_span)
        [span_287](start_span)/>[span_287](end_span)
        [span_288](start_span)<button[span_288](end_span)
          className={`dot dot--room${view === "room-status" ? " dot--active" : ""}${roomStatus ? [span_289](start_span)" dot--status-on" : ""}`}[span_289](end_span)
          onClick={(e) => { e.stopPropagation(); setView("room-status"); [span_290](start_span)}}[span_290](end_span)
          [span_291](start_span)aria-label="Room Status"[span_291](end_span)
        [span_292](start_span)/>[span_292](end_span)
      [span_293](start_span)</nav>[span_293](end_span)
    [span_294](start_span)</div>[span_294](end_span)
  [span_295](start_span));[span_295](end_span)
}
