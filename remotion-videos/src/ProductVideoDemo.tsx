import React from "react";
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

const COLORS = {
  bg: "#f5f0eb",
  accent: "#D4793A",
  text: "#1a1a1a",
  white: "#ffffff",
  gray: "#888888",
  dimGray: "#aaaaaa",
  card: "#ffffff",
  cardBorder: "rgba(0,0,0,0.08)",
};

// ─── Utility Components ────────────────────────────────

const GlowOrb: React.FC<{
  x: string;
  y: string;
  size: number;
  color: string;
  delay: number;
}> = ({ x, y, size, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const breathe = Math.sin(frame * 0.02 + delay) * 0.12 + 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        transform: `translate(-50%, -50%) scale(${appear * breathe})`,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}20 0%, ${color}08 40%, transparent 70%)`,
        filter: "blur(60px)",
        opacity: appear * 0.7,
      }}
    />
  );
};

const DotGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const dots: React.ReactNode[] = [];
  const cols = 24;
  const rows = 14;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c / (cols - 1)) * 100;
      const y = (r / (rows - 1)) * 100;
      const dist = Math.sqrt(
        Math.pow(x - 50, 2) + Math.pow(y - 50, 2)
      );
      const wave = Math.sin(frame * 0.03 - dist * 0.06) * 0.5 + 0.5;
      const opacity = 0.03 + wave * 0.06;

      dots.push(
        <div
          key={`${r}-${c}`}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: COLORS.text,
            opacity,
          }}
        />
      );
    }
  }

  return <AbsoluteFill>{dots}</AbsoluteFill>;
};

// ─── Scene 1: Hero Title ───────────────────────────────

const AnimatedWord: React.FC<{
  text: string;
  delay: number;
  color?: string;
  fontSize?: number;
}> = ({ text, delay, color = COLORS.text, fontSize = 96 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const y = interpolate(progress, [0, 1], [80, 0]);
  const opacity = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });
  const blur = interpolate(progress, [0, 1], [8, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontSize,
        fontWeight: 700,
        color,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        letterSpacing: -3,
        transform: `translateY(${y}px)`,
        opacity,
        filter: `blur(${blur}px)`,
        lineHeight: 1.1,
      }}
    >
      {text}
    </div>
  );
};

const Subtitle: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const y = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div
      style={{
        fontSize: 28,
        color: COLORS.gray,
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontWeight: 400,
        letterSpacing: 0.3,
        transform: `translateY(${y}px)`,
        opacity: progress,
        marginTop: 24,
      }}
    >
      AI-powered media generation, inside Claude.
    </div>
  );
};

const SceneHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Exit fade
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      <DotGrid />

      <GlowOrb x="30%" y="35%" size={700} color={COLORS.accent} delay={0} />
      <GlowOrb x="70%" y="65%" size={600} color="#c084fc" delay={10} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", gap: 24 }}>
          <AnimatedWord text="Create." delay={8} />
          <AnimatedWord
            text="Generate."
            delay={18}
            color={COLORS.accent}
          />
          <AnimatedWord text="Ship." delay={28} />
        </div>
        <Subtitle delay={42} />
      </div>

      {/* Soft edge vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(245,240,235,0.6) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Scene 2: Claude UI Demo ───────────────────────────

const TypewriterText: React.FC<{
  text: string;
  startFrame: number;
  charFrames?: number;
}> = ({ text, startFrame, charFrames = 1.5 }) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const chars = Math.min(Math.floor(elapsed / charFrames), text.length);
  const showCursor = elapsed % 12 < 7;

  return (
    <span>
      {text.slice(0, chars)}
      {chars < text.length && showCursor && (
        <span style={{ color: COLORS.accent, opacity: 0.8 }}>|</span>
      )}
    </span>
  );
};

const ProgressBar: React.FC<{ delay: number; duration: number }> = ({
  delay,
  duration,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, duration], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const opacity = interpolate(frame - delay, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          color: COLORS.gray,
          fontFamily: "system-ui, sans-serif",
          marginBottom: 8,
        }}
      >
        <span>Generating with Runway Gen-3...</span>
        <span>{Math.floor(progress)}%</span>
      </div>
      <div
        style={{
          width: "100%",
          height: 3,
          borderRadius: 2,
          background: "rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            borderRadius: 2,
            background: `linear-gradient(90deg, ${COLORS.accent}, #e8a06a)`,
          }}
        />
      </div>
    </div>
  );
};

const FloatingChip: React.FC<{
  label: string;
  value: string;
  delay: number;
  x: number;
  y: number;
  rotation: number;
}> = ({ label, value, delay, x, y, rotation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const float = Math.sin((frame - delay) * 0.035) * 5;
  const rotFloat = Math.sin((frame - delay) * 0.02) * 1;
  const translateY = interpolate(enter, [0, 1], [50, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + translateY + float,
        transform: `rotate(${rotation + rotFloat}deg)`,
        opacity: enter,
        background: COLORS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        borderRadius: 14,
        padding: "12px 18px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: COLORS.gray,
          fontFamily: "system-ui, sans-serif",
          textTransform: "uppercase",
          letterSpacing: 1,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: COLORS.text,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {value}
      </div>
    </div>
  );
};

const SceneUI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEnter = spring({
    frame: frame - 5,
    fps,
    config: { damping: 18, stiffness: 70 },
  });

  const cardScale = interpolate(cardEnter, [0, 1], [0.92, 1]);
  const cardY = interpolate(cardEnter, [0, 1], [60, 0]);
  const cardOpacity = interpolate(cardEnter, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const PROMPT =
    "Generate a product launch video for our new headphones with cinematic lighting and dynamic camera angles";

  const typingEndFrame = 15 + PROMPT.length * 1.5;
  const progressStartFrame = typingEndFrame + 10;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DotGrid />

      <GlowOrb x="50%" y="45%" size={800} color={COLORS.accent} delay={0} />
      <GlowOrb x="25%" y="70%" size={500} color="#c084fc" delay={10} />

      {/* Main Claude card */}
      <div
        style={{
          width: 700,
          background: COLORS.card,
          borderRadius: 24,
          border: `1px solid ${COLORS.cardBorder}`,
          padding: 32,
          transform: `scale(${cardScale}) translateY(${cardY}px)`,
          opacity: cardOpacity,
          boxShadow: `0 25px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)`,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          zIndex: 10,
        }}
      >
        {/* Prompt area */}
        <div
          style={{
            background: "rgba(0,0,0,0.03)",
            borderRadius: 16,
            padding: "20px 24px",
            fontSize: 17,
            color: COLORS.text,
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: 1.5,
            minHeight: 60,
          }}
        >
          <TypewriterText text={PROMPT} startFrame={15} charFrames={1.5} />
        </div>

        {/* Progress bar */}
        <Sequence from={Math.ceil(progressStartFrame)} premountFor={10}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <ProgressBar delay={0} duration={70} />
          </div>
        </Sequence>
      </div>

      {/* Floating chips */}
      <Sequence from={20} premountFor={10}>
        <FloatingChip
          label="Model"
          value="Runway Gen-3"
          delay={15}
          x={90}
          y={240}
          rotation={-6}
        />
        <FloatingChip
          label="Resolution"
          value="1920 x 1080"
          delay={30}
          x={1580}
          y={220}
          rotation={5}
        />
        <FloatingChip
          label="Voice"
          value="ElevenLabs"
          delay={45}
          x={110}
          y={680}
          rotation={4}
        />
        <FloatingChip
          label="Music"
          value="AI Generated"
          delay={60}
          x={1600}
          y={700}
          rotation={-3}
        />
      </Sequence>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(245,240,235,0.5) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Scene 3: Output Reveal ────────────────────────────

const SceneOutput: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEnter = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const cardScale = interpolate(cardEnter, [0, 1], [0.9, 1]);
  const cardY = interpolate(cardEnter, [0, 1], [40, 0]);

  // Badge pop
  const badgeEnter = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Glow pulse
  const glowPulse = Math.sin(frame * 0.06) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DotGrid />

      <GlowOrb x="50%" y="50%" size={900} color={COLORS.accent} delay={0} />
      <GlowOrb x="30%" y="30%" size={500} color="#c084fc" delay={5} />
      <GlowOrb x="70%" y="70%" size={500} color="#34d399" delay={10} />

      {/* Output card */}
      <div
        style={{
          width: 720,
          background: COLORS.card,
          borderRadius: 24,
          border: `1px solid ${COLORS.cardBorder}`,
          padding: 32,
          transform: `scale(${cardScale}) translateY(${cardY}px)`,
          opacity: cardEnter,
          boxShadow: `0 25px 80px rgba(0,0,0,0.08), 0 0 ${40 * glowPulse}px rgba(212,121,58,${0.06 * glowPulse})`,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          zIndex: 10,
        }}
      >
        {/* Video preview area */}
        <div
          style={{
            width: "100%",
            height: 320,
            borderRadius: 16,
            background: `linear-gradient(135deg, rgba(212,121,58,0.1) 0%, rgba(192,132,252,0.1) 50%, rgba(52,211,153,0.08) 100%)`,
            border: `1px solid rgba(0,0,0,0.06)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer effect */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 55%, transparent 60%)`,
              transform: `translateX(${interpolate(frame, [0, 120], [-100, 200], { extrapolateRight: "clamp" })}%)`,
            }}
          />

          {/* Play button */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: `rgba(255,255,255,${0.6 + glowPulse * 0.2})`,
              backdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 20px rgba(0,0,0,0.1)`,
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `18px solid ${COLORS.text}`,
                borderTop: "11px solid transparent",
                borderBottom: "11px solid transparent",
                marginLeft: 4,
              }}
            />
          </div>

          {/* Duration badge */}
          <div
            style={{
              position: "absolute",
              bottom: 14,
              right: 14,
              fontSize: 12,
              color: COLORS.text,
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(10px)",
              padding: "4px 10px",
              borderRadius: 8,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            0:30
          </div>

          {/* HD badge */}
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              fontSize: 11,
              fontWeight: 600,
              color: COLORS.white,
              background: "rgba(212,121,58,0.8)",
              border: "1px solid rgba(212,121,58,0.9)",
              backdropFilter: "blur(10px)",
              padding: "3px 8px",
              borderRadius: 6,
              fontFamily: "system-ui, sans-serif",
              letterSpacing: 1,
            }}
          >
            1080p
          </div>
        </div>

        {/* Bottom info row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: COLORS.text,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Product Launch — Headphones
            </div>
            <div
              style={{
                fontSize: 13,
                color: COLORS.gray,
                fontFamily: "system-ui, sans-serif",
                marginTop: 4,
              }}
            >
              Runway Gen-3 · 1920x1080 · MP4
            </div>
          </div>

          {/* Ready badge */}
          <div
            style={{
              transform: `scale(${badgeEnter})`,
              opacity: badgeEnter,
              background: `linear-gradient(135deg, ${COLORS.accent}, #e8a06a)`,
              color: COLORS.white,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "system-ui, sans-serif",
              padding: "10px 24px",
              borderRadius: 12,
              boxShadow: `0 4px 20px rgba(212,121,58,0.3)`,
            }}
          >
            Ready ✓
          </div>
        </div>
      </div>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(245,240,235,0.6) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Main Composition ──────────────────────────────────

export const ProductVideoDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg, overflow: "hidden" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={100}>
          <SceneHero />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={130}>
          <SceneUI />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={130}>
          <SceneOutput />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
