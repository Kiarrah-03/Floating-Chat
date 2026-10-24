(function () {
  if (document.getElementById("fc-root")) return;

  // ============================================================
  // SHADOW ROOT
  // ============================================================
  const root = document.createElement("div");
  root.id = "fc-root";
  root.style.cssText =
    "position:fixed;top:0;left:0;width:0;height:0;z-index:2147483647;";
  document.documentElement.appendChild(root);
  const shadow = root.attachShadow({ mode: "open" });

  // ============================================================
  // ICON LIBRARY (inline SVG, monochrome)
  // ============================================================
  const I = {
    chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m10 9 5 3-5 3V9z"/></svg>`,
    groups: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    shares: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    tools: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
    send: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.4 20.4 20.85 12 3.4 3.6l.01 6.53L15 12 3.41 13.87z"/></svg>`,
    snippet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V4h5M18 9V4h-5M6 15v5h5M18 15v5h-5"/></svg>`,
    notes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>`,
    color: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.9-.1 2.9-.3.4-.1.6-.4.6-.8 0-.2-.1-.4-.2-.6-.2-.4-.3-.8-.3-1.2 0-1.7 1.3-3.1 3-3.1h1.9c1.7 0 3.1-1.4 3.1-3.1C22 6.9 17.5 2 12 2z"/></svg>`,
    camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
    link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>`,
    copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>`,
    image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`,
    drag: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>`,
  };

  // ============================================================
  // CSS
  // ============================================================
  const style = document.createElement("style");
  style.textContent = `
    :host {
      all: initial;

      /* ====== DESIGN TOKENS ====== */
      --fc-surface:        rgba(22, 24, 30, 0.82);
      --fc-surface-2:      rgba(32, 35, 44, 0.72);
      --fc-surface-3:      rgba(44, 48, 60, 0.55);
      --fc-elevated:       rgba(38, 42, 52, 0.94);
      --fc-border:         rgba(255, 255, 255, 0.08);
      --fc-border-strong:  rgba(255, 255, 255, 0.14);
      --fc-hairline:       rgba(255, 255, 255, 0.05);

      --fc-text:           #f2f4f8;
      --fc-text-soft:      #a9b0bd;
      --fc-text-mute:      #6a7180;

      --fc-accent-1:       #8b7cf6;
      --fc-accent-2:       #22d3ee;
      --fc-accent-glow:    rgba(139, 124, 246, 0.35);
      --fc-accent-soft:    rgba(139, 124, 246, 0.14);

      --fc-success:        #4ade80;
      --fc-danger:         #f87171;
      --fc-warning:        #fbbf24;

      --fc-radius-lg:      20px;
      --fc-radius:         14px;
      --fc-radius-sm:      10px;

      --fc-shadow-lg:      0 24px 60px -12px rgba(0,0,0,0.55), 0 8px 24px -8px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.06);
      --fc-shadow-md:      0 8px 24px -8px rgba(0,0,0,0.4);
      --fc-shadow-sm:      0 2px 6px rgba(0,0,0,0.25);

      --fc-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, "Helvetica Neue", sans-serif;
      --fc-mono: ui-monospace, "SF Mono", Menlo, "Cascadia Mono", monospace;

      --fc-ease: cubic-bezier(0.32, 0.72, 0, 1);
      --fc-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    * { box-sizing: border-box; font-family: var(--fc-font); -webkit-font-smoothing: antialiased; }

    /* ============================================================
       FLOATING BUTTON
       ============================================================ */
    #fc-fab {
      position: fixed; bottom: 24px; right: 24px;
      width: 56px; height: 56px; border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.16);
      background:
        radial-gradient(120% 120% at 30% 0%, rgba(255,255,255,0.28), transparent 50%),
        linear-gradient(135deg, var(--fc-accent-1), var(--fc-accent-2));
      color: #fff; cursor: grab;
      z-index: 2147483646;
      box-shadow:
        0 12px 32px -8px var(--fc-accent-glow),
        0 4px 12px rgba(0,0,0,0.35),
        inset 0 1px 0 rgba(255,255,255,0.35);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.25s var(--fc-spring), box-shadow 0.25s var(--fc-ease);
      user-select: none; touch-action: none;
      padding: 0;
    }
    #fc-fab svg { width: 24px; height: 24px; }
    #fc-fab:hover {
      transform: translateY(-3px) scale(1.06);
      box-shadow:
        0 18px 40px -8px var(--fc-accent-glow),
        0 6px 16px rgba(0,0,0,0.4),
        inset 0 1px 0 rgba(255,255,255,0.4);
    }
    #fc-fab:active { cursor: grabbing; transform: scale(0.96); }
    #fc-fab.fc-dragging { transition: none; }

    /* ============================================================
       PANEL SHELL
       ============================================================ */
    #fc-panel {
      position: fixed;
      top: 100px; right: 24px;
      width: 480px; height: 560px;
      min-width: 380px; min-height: 420px;
      max-width: calc(100vw - 20px); max-height: calc(100vh - 20px);

      background: var(--fc-surface);
      backdrop-filter: blur(24px) saturate(160%);
      -webkit-backdrop-filter: blur(24px) saturate(160%);

      border: 1px solid var(--fc-border);
      border-radius: var(--fc-radius-lg);
      box-shadow: var(--fc-shadow-lg);
      z-index: 2147483647;

      display: flex; flex-direction: column; overflow: hidden;
      color: var(--fc-text); font-size: 13px; line-height: 1.5;

      animation: fc-in 0.32s var(--fc-ease);
      isolation: isolate;
    }
    #fc-panel::before {
      content: "";
      position: absolute; inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: linear-gradient(180deg, rgba(255,255,255,0.04), transparent 30%);
      z-index: -1;
    }
    @keyframes fc-in {
      from { opacity: 0; transform: scale(0.96) translateY(8px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
    #fc-panel.fc-dragging,
    #fc-panel.fc-resizing { animation: none; }

    /* ============================================================
       HEADER
       ============================================================ */
    #fc-header {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px;
      border-bottom: 1px solid var(--fc-hairline);
      flex-shrink: 0;
      cursor: grab; user-select: none; touch-action: none;
      background: linear-gradient(180deg, rgba(255,255,255,0.03), transparent);
      position: relative;
    }
    #fc-header:active { cursor: grabbing; }

    #fc-brand {
      display: flex; align-items: center; gap: 10px;
      pointer-events: none; flex: 1; min-width: 0;
    }
    #fc-brand-mark {
      width: 34px; height: 34px; border-radius: 11px;
      background:
        radial-gradient(120% 120% at 30% 0%, rgba(255,255,255,0.3), transparent 55%),
        linear-gradient(135deg, var(--fc-accent-1), var(--fc-accent-2));
      display: flex; align-items: center; justify-content: center;
      color: #fff;
      box-shadow: 0 4px 14px -4px var(--fc-accent-glow), inset 0 1px 0 rgba(255,255,255,0.3);
      flex-shrink: 0;
    }
    #fc-brand-mark svg { width: 18px; height: 18px; }
    #fc-brand-copy { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
    #fc-brand-copy strong {
      font-size: 13px; font-weight: 600; letter-spacing: -0.1px;
      color: var(--fc-text);
    }
    #fc-brand-copy small {
      font-size: 11px; color: var(--fc-text-mute);
      display: flex; align-items: center; gap: 5px; font-weight: 500;
    }
    #fc-status {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--fc-success);
      box-shadow: 0 0 0 3px rgba(74,222,128,0.15);
    }

    #fc-header-actions { display: flex; gap: 4px; }
    .fc-icon-btn {
      width: 30px; height: 30px; border-radius: 9px;
      background: transparent; border: 1px solid transparent;
      color: var(--fc-text-mute);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0;
      transition: all 0.15s var(--fc-ease);
      font-family: inherit;
    }
    .fc-icon-btn svg { width: 15px; height: 15px; }
    .fc-icon-btn:hover {
      background: rgba(255,255,255,0.06);
      color: var(--fc-text);
      border-color: var(--fc-border);
    }
    #fc-close-btn:hover {
      background: rgba(248,113,113,0.12);
      color: var(--fc-danger);
      border-color: rgba(248,113,113,0.2);
    }
    #fc-mini-drag { cursor: grab; }
    #fc-mini-drag:active { cursor: grabbing; }

    /* ============================================================
       BODY: RAIL + CONTENT
       ============================================================ */
    #fc-body {
      flex: 1; min-height: 0;
      display: flex;
    }

    /* --- LEFT RAIL --- */
    #fc-rail {
      width: 62px; flex-shrink: 0;
      display: flex; flex-direction: column;
      gap: 4px; padding: 12px 8px;
      border-right: 1px solid var(--fc-hairline);
      background: rgba(0,0,0,0.15);
    }
    .fc-rail-btn {
      position: relative;
      width: 46px; height: 46px; border-radius: 12px;
      background: transparent; border: 1px solid transparent;
      color: var(--fc-text-mute);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 3px; cursor: pointer; padding: 0;
      transition: all 0.18s var(--fc-ease);
      font-family: inherit;
    }
    .fc-rail-btn svg { width: 18px; height: 18px; }
    .fc-rail-btn small {
      font-size: 9px; font-weight: 600; letter-spacing: 0.2px;
      text-transform: uppercase; opacity: 0.85;
    }
    .fc-rail-btn:hover {
      color: var(--fc-text-soft);
      background: rgba(255,255,255,0.05);
    }
    .fc-rail-btn.active {
      color: var(--fc-text);
      background: rgba(255,255,255,0.08);
      border-color: var(--fc-border);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
    }
    .fc-rail-btn.active::before {
      content: ""; position: absolute; left: -8px; top: 50%;
      transform: translateY(-50%);
      width: 3px; height: 22px; border-radius: 0 3px 3px 0;
      background: linear-gradient(180deg, var(--fc-accent-1), var(--fc-accent-2));
      box-shadow: 0 0 8px var(--fc-accent-glow);
    }

    /* --- CONTENT AREA --- */
    #fc-content {
      flex: 1; min-width: 0; min-height: 0;
      display: flex; flex-direction: column;
      background: var(--fc-surface-2);
    }
    .fc-panel { display: none; height: 100%; flex-direction: column; min-height: 0; }
    .fc-panel.active { display: flex; }

    /* ============================================================
       CHAT MESSAGES
       ============================================================ */
    #fc-messages {
      flex: 1; overflow-y: auto; min-height: 0;
      padding: 20px 20px 12px;
      display: flex; flex-direction: column; gap: 12px;
      scroll-behavior: smooth;
    }
    #fc-messages::-webkit-scrollbar { width: 10px; }
    #fc-messages::-webkit-scrollbar-thumb {
      background: transparent; border-radius: 8px;
      border: 3px solid transparent; background-clip: padding-box;
    }
    #fc-messages:hover::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.1);
      background-clip: padding-box;
    }

    .fc-msg {
      display: flex; flex-direction: column; gap: 4px;
      max-width: 82%;
      animation: fc-msg-in 0.32s var(--fc-spring);
    }
    @keyframes fc-msg-in {
      from { opacity: 0; transform: translateY(8px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .fc-msg.user { align-self: flex-end; align-items: flex-end; }
    .fc-msg.bot  { align-self: flex-start; align-items: flex-start; }

    .fc-bubble {
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 13.5px; line-height: 1.5;
      word-wrap: break-word; overflow-wrap: anywhere;
      border: 1px solid transparent;
    }
    .fc-msg.user .fc-bubble {
      background:
        radial-gradient(120% 120% at 30% 0%, rgba(255,255,255,0.24), transparent 55%),
        linear-gradient(135deg, var(--fc-accent-1), var(--fc-accent-2));
      color: #fff;
      border-color: rgba(255,255,255,0.14);
      border-bottom-right-radius: 5px;
      box-shadow: 0 6px 16px -6px var(--fc-accent-glow);
    }
    .fc-msg.bot .fc-bubble {
      background: rgba(255,255,255,0.055);
      color: var(--fc-text);
      border-color: var(--fc-border);
      border-bottom-left-radius: 5px;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
    }
    .fc-meta {
      font-size: 10.5px; color: var(--fc-text-mute);
      padding: 0 4px; font-weight: 500;
      letter-spacing: 0.1px;
    }

    /* ============================================================
       COMPOSER
       ============================================================ */
    #fc-composer {
      flex-shrink: 0;
      padding: 12px 14px 14px;
      border-top: 1px solid var(--fc-hairline);
      background: linear-gradient(180deg, transparent, rgba(0,0,0,0.1));
    }
    #fc-composer-inner {
      display: flex; align-items: flex-end; gap: 8px;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--fc-border);
      border-radius: 16px;
      padding: 6px 6px 6px 14px;
      transition: border-color 0.18s var(--fc-ease), box-shadow 0.18s var(--fc-ease), background 0.18s var(--fc-ease);
    }
    #fc-composer-inner:focus-within {
      border-color: rgba(139,124,246,0.5);
      background: rgba(255,255,255,0.07);
      box-shadow: 0 0 0 4px rgba(139,124,246,0.12);
    }
    #fc-input {
      flex: 1; min-width: 0;
      border: none; outline: none; resize: none;
      background: transparent;
      color: var(--fc-text);
      font-size: 13.5px; line-height: 1.5;
      font-family: inherit;
      padding: 9px 0;
      max-height: 120px;
      min-height: 20px;
    }
    #fc-input::placeholder { color: var(--fc-text-mute); }
    #fc-send {
      flex-shrink: 0;
      width: 38px; height: 38px; border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.14);
      background:
        radial-gradient(120% 120% at 30% 0%, rgba(255,255,255,0.26), transparent 55%),
        linear-gradient(135deg, var(--fc-accent-1), var(--fc-accent-2));
      color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      padding: 0;
      box-shadow: 0 6px 16px -6px var(--fc-accent-glow), inset 0 1px 0 rgba(255,255,255,0.3);
      transition: transform 0.18s var(--fc-spring), box-shadow 0.2s var(--fc-ease);
    }
    #fc-send svg { width: 16px; height: 16px; }
    #fc-send:hover { transform: translateY(-1px) scale(1.04); }
    #fc-send:active { transform: scale(0.94); }
    #fc-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

    /* ============================================================
       DROP ZONES
       ============================================================ */
    .fc-drop {
      margin: 16px; padding: 26px 20px;
      border: 1.5px dashed var(--fc-border-strong);
      border-radius: 16px;
      background: rgba(255,255,255,0.02);
      text-align: center; color: var(--fc-text-soft);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      transition: all 0.2s var(--fc-ease);
    }
    .fc-drop:hover {
      border-color: rgba(139,124,246,0.5);
      background: rgba(139,124,246,0.06);
    }
    .fc-drop-icon {
      width: 52px; height: 52px; border-radius: 15px;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--fc-border);
      color: var(--fc-text-soft);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 12px;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
    }
    .fc-drop-icon svg { width: 22px; height: 22px; }
    .fc-drop h3 {
      margin: 0 0 4px; color: var(--fc-text);
      font-size: 13.5px; font-weight: 600;
    }
    .fc-drop p { margin: 0; font-size: 12px; line-height: 1.5; color: var(--fc-text-mute); max-width: 240px; }

    .fc-btn-ghost {
      margin-top: 14px;
      background: rgba(255,255,255,0.05);
      color: var(--fc-text);
      border: 1px solid var(--fc-border);
      border-radius: 10px;
      padding: 8px 14px;
      font-size: 12px; font-weight: 600;
      cursor: pointer;
      display: inline-flex; align-items: center; gap: 6px;
      transition: all 0.15s var(--fc-ease);
      font-family: inherit;
    }
    .fc-btn-ghost:hover {
      border-color: rgba(139,124,246,0.5);
      background: rgba(139,124,246,0.1);
    }
    .fc-btn-ghost svg { width: 13px; height: 13px; }

    /* ============================================================
       SAVED ITEMS
       ============================================================ */
    .fc-list {
      padding: 0 16px 16px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .fc-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--fc-border);
      border-radius: 14px; overflow: hidden;
      transition: all 0.18s var(--fc-ease);
    }
    .fc-card:hover {
      border-color: var(--fc-border-strong);
      background: rgba(255,255,255,0.06);
      transform: translateY(-1px);
      box-shadow: var(--fc-shadow-md);
    }
    .fc-card-thumb {
      width: 100%; aspect-ratio: 16/9;
      display: block; border: none; object-fit: cover;
      background: rgba(0,0,0,0.35);
    }
    .fc-card-thumb-fallback {
      width: 100%; aspect-ratio: 16/9;
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, rgba(139,124,246,0.15), rgba(34,211,238,0.12));
      color: var(--fc-text-soft);
    }
    .fc-card-thumb-fallback svg { width: 38px; height: 38px; }
    .fc-card-body {
      padding: 10px 12px;
      display: flex; align-items: center; gap: 10px;
    }
    .fc-badge {
      background: rgba(139,124,246,0.16);
      color: #c9c0ff;
      border: 1px solid rgba(139,124,246,0.24);
      border-radius: 6px; padding: 2px 7px;
      font-size: 9px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.6px;
      flex-shrink: 0;
    }
    .fc-card-title {
      color: var(--fc-text); font-size: 12px; font-weight: 600;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      flex: 1; min-width: 0;
    }
    .fc-del {
      background: transparent; border: none;
      color: var(--fc-text-mute); cursor: pointer;
      padding: 4px; border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: all 0.15s var(--fc-ease);
    }
    .fc-del svg { width: 13px; height: 13px; }
    .fc-del:hover { color: var(--fc-danger); background: rgba(248,113,113,0.12); }

    /* ============================================================
       EMPTY STATE
       ============================================================ */
    .fc-empty {
      flex: 1;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      text-align: center; padding: 40px 30px;
      color: var(--fc-text-soft);
    }
    .fc-empty-icon {
      width: 64px; height: 64px; border-radius: 20px;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--fc-border);
      color: var(--fc-text-soft);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 16px;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
    }
    .fc-empty-icon svg { width: 28px; height: 28px; }
    .fc-empty h3 {
      margin: 0 0 6px; color: var(--fc-text);
      font-size: 15px; font-weight: 600;
    }
    .fc-empty p {
      margin: 0; font-size: 12.5px; line-height: 1.55;
      max-width: 260px;
    }

    /* ============================================================
       TOOLS GRID
       ============================================================ */
    #fc-tools-scroll { flex: 1; overflow-y: auto; min-height: 0; }
    #fc-tools-scroll::-webkit-scrollbar { width: 10px; }
    #fc-tools-scroll::-webkit-scrollbar-thumb {
      background: transparent; border-radius: 8px;
      border: 3px solid transparent; background-clip: padding-box;
    }
    #fc-tools-scroll:hover::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.1); background-clip: padding-box;
    }

    .fc-tools-wrap { padding: 16px; display: flex; flex-direction: column; gap: 10px; }

    .fc-tool {
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--fc-border);
      border-radius: 14px;
      padding: 13px;
      display: flex; align-items: center; gap: 12px;
      transition: all 0.18s var(--fc-ease);
    }
    .fc-tool:hover {
      border-color: var(--fc-border-strong);
      background: rgba(255,255,255,0.06);
      transform: translateY(-1px);
      box-shadow: var(--fc-shadow-md);
    }
    .fc-tool-chip {
      width: 40px; height: 40px; border-radius: 11px;
      display: flex; align-items: center; justify-content: center;
      border: 1px solid var(--fc-border);
      background: rgba(255,255,255,0.05);
      color: var(--fc-text-soft);
      flex-shrink: 0;
      transition: all 0.2s var(--fc-ease);
    }
    .fc-tool-chip svg { width: 18px; height: 18px; }
    .fc-tool:hover .fc-tool-chip {
      color: #c9c0ff;
      border-color: rgba(139,124,246,0.3);
      background: rgba(139,124,246,0.1);
    }
    .fc-tool-info { flex: 1; min-width: 0; }
    .fc-tool-info h3 {
      margin: 0 0 2px; color: var(--fc-text);
      font-size: 13px; font-weight: 600;
    }
    .fc-tool-info p {
      margin: 0; color: var(--fc-text-mute);
      font-size: 11.5px; line-height: 1.4;
    }
    .fc-tool-action {
      border: 1px solid var(--fc-border);
      border-radius: 9px;
      padding: 7px 13px;
      background: rgba(255,255,255,0.05);
      color: var(--fc-text);
      font-size: 11.5px; font-weight: 600;
      cursor: pointer; flex-shrink: 0;
      display: inline-flex; align-items: center; gap: 6px;
      transition: all 0.15s var(--fc-ease);
      font-family: inherit;
      white-space: nowrap;
    }
    .fc-tool-action svg { width: 12px; height: 12px; }
    .fc-tool-action:hover:not(:disabled) {
      border-color: rgba(139,124,246,0.5);
      background: rgba(139,124,246,0.12);
      color: #dcd6ff;
    }
    .fc-tool-action:disabled { opacity: 0.5; cursor: not-allowed; }

    .fc-expand {
      display: none;
      background: rgba(0,0,0,0.2);
      border: 1px solid var(--fc-border);
      border-radius: 12px;
      padding: 12px;
      margin: -6px 0 2px;
      font-size: 12px;
      color: var(--fc-text);
      animation: fc-expand 0.22s var(--fc-ease);
    }
    @keyframes fc-expand {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    #fc-notes-input {
      width: 100%; height: 110px;
      border: 1px solid var(--fc-border);
      border-radius: 10px; padding: 10px 12px;
      font-size: 12.5px; font-family: var(--fc-mono);
      resize: vertical; outline: none;
      background: rgba(0,0,0,0.2); color: var(--fc-text);
      line-height: 1.55;
      transition: border-color 0.15s var(--fc-ease), box-shadow 0.15s var(--fc-ease);
    }
    #fc-notes-input:focus {
      border-color: rgba(139,124,246,0.5);
      box-shadow: 0 0 0 4px rgba(139,124,246,0.12);
    }
    #fc-notes-input::placeholder { color: var(--fc-text-mute); }

    .fc-result { text-align: center; }
    .fc-result img {
      width: 100%; max-height: 180px; object-fit: contain;
      border-radius: 10px; border: 1px solid var(--fc-border);
      display: block; margin-bottom: 10px; background: #000;
    }
    .fc-result-status {
      margin: 0 0 8px; font-weight: 600; font-size: 12px;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .fc-result-status.ok { color: var(--fc-success); }
    .fc-result-status.err { color: var(--fc-danger); }

    .fc-download {
      display: inline-flex; align-items: center; gap: 6px;
      text-decoration: none;
      padding: 9px 14px; border-radius: 10px;
      background: rgba(139,124,246,0.15);
      border: 1px solid rgba(139,124,246,0.3);
      color: #dcd6ff;
      font-weight: 600; font-size: 12px;
      transition: all 0.15s var(--fc-ease);
      justify-content: center;
    }
    .fc-download:hover {
      background: rgba(139,124,246,0.22);
      transform: translateY(-1px);
    }
    .fc-download svg { width: 13px; height: 13px; }

    /* Color picker */
    .fc-color-hero {
      height: 74px; border-radius: 12px;
      border: 1px solid var(--fc-border);
      margin-bottom: 10px;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
    }
    .fc-color-row {
      display: flex; align-items: center; gap: 8px;
    }
    .fc-color-hex {
      flex: 1;
      font-family: var(--fc-mono);
      font-size: 13px; font-weight: 600;
      color: var(--fc-text); letter-spacing: 0.4px;
      background: rgba(0,0,0,0.2);
      border: 1px solid var(--fc-border);
      border-radius: 8px; padding: 8px 10px;
    }

    /* Progress */
    .fc-progress {
      width: 100%; height: 4px; border-radius: 3px;
      background: rgba(255,255,255,0.08);
      overflow: hidden; margin-top: 10px;
    }
    .fc-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--fc-accent-1), var(--fc-accent-2));
      width: 0%; transition: width 0.25s var(--fc-ease);
      box-shadow: 0 0 8px var(--fc-accent-glow);
    }
    .fc-progress-label {
      font-size: 11px; color: var(--fc-text-mute);
      margin-top: 6px; text-align: center;
    }

    /* ============================================================
       RESIZE GRIP
       ============================================================ */
    #fc-grip {
      position: absolute; bottom: 0; right: 0;
      width: 24px; height: 24px;
      cursor: nwse-resize; z-index: 5;
      display: flex; align-items: flex-end; justify-content: flex-end;
      padding: 4px; touch-action: none;
    }
    #fc-grip::before {
      content: "";
      width: 8px; height: 8px;
      border-right: 2px solid var(--fc-border-strong);
      border-bottom: 2px solid var(--fc-border-strong);
      border-radius: 0 0 3px 0;
      transition: border-color 0.15s;
    }
    #fc-grip:hover::before { border-color: var(--fc-accent-1); }

    /* ============================================================
       SCREENSHOT OVERLAY
       ============================================================ */
    #fc-shot-overlay {
      position: fixed; inset: 0;
      background: rgba(10,12,18,0.5);
      z-index: 2147483647;
      cursor: crosshair; user-select: none;
    }
    #fc-shot-box {
      position: absolute;
      border: 1.5px solid var(--fc-accent-2);
      background: rgba(34,211,238,0.1);
      display: none;
      box-shadow: 0 0 0 9999px rgba(10,12,18,0.55),
                  0 0 24px rgba(34,211,238,0.5);
    }

    /* ============================================================
       DROP HINT
       ============================================================ */
    #fc-drop-hint {
      position: fixed; inset: 0;
      background: rgba(139,124,246,0.06);
      border: 3px dashed rgba(139,124,246,0.6);
      z-index: 2147483647;
      display: flex; align-items: center; justify-content: center;
      pointer-events: none;
      animation: fc-fade-in 0.18s var(--fc-ease);
    }
    @keyframes fc-fade-in { from { opacity: 0; } to { opacity: 1; } }
    #fc-drop-hint-inner {
      background: var(--fc-elevated);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      color: var(--fc-text);
      padding: 16px 26px; border-radius: 14px;
      font-size: 14px; font-weight: 600;
      border: 1px solid var(--fc-border-strong);
      box-shadow: 0 24px 60px -12px rgba(0,0,0,0.6);
      display: flex; align-items: center; gap: 10px;
    }
    #fc-drop-hint-inner svg { width: 18px; height: 18px; color: var(--fc-accent-2); }

    /* ============================================================
       SAVE DIALOG
       ============================================================ */
    #fc-save {
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.45);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      z-index: 100;
      display: flex; align-items: center; justify-content: center;
      animation: fc-fade-in 0.15s var(--fc-ease);
    }
    .fc-save-card {
      background: var(--fc-elevated);
      border: 1px solid var(--fc-border-strong);
      border-radius: 16px;
      padding: 22px;
      width: 85%; max-width: 300px;
      text-align: center;
      box-shadow: 0 24px 60px -12px rgba(0,0,0,0.6);
      animation: fc-in 0.28s var(--fc-spring);
    }
    .fc-save-card h3 {
      margin: 0 0 8px; font-size: 14px;
      color: var(--fc-text); font-weight: 600;
    }
    #fc-save-url {
      margin: 0 0 16px; font-size: 11.5px;
      color: var(--fc-text-mute);
      word-break: break-all; line-height: 1.5;
    }
    .fc-save-actions { display: flex; flex-direction: column; gap: 8px; }
    .fc-save-opt {
      padding: 11px 14px;
      border: 1px solid var(--fc-border);
      border-radius: 11px;
      background: rgba(255,255,255,0.05);
      color: var(--fc-text);
      font-size: 13px; font-weight: 600;
      cursor: pointer; font-family: inherit;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      transition: all 0.15s var(--fc-ease);
    }
    .fc-save-opt svg { width: 14px; height: 14px; }
    .fc-save-opt:hover {
      border-color: rgba(139,124,246,0.5);
      background: rgba(139,124,246,0.12);
    }
    .fc-save-opt.primary {
      background: linear-gradient(135deg, var(--fc-accent-1), var(--fc-accent-2));
      border-color: rgba(255,255,255,0.14);
      color: #fff;
      box-shadow: 0 6px 16px -6px var(--fc-accent-glow);
    }
    .fc-save-opt.primary:hover { filter: brightness(1.08); }
    .fc-save-cancel {
      background: transparent; border: none;
      color: var(--fc-text-mute);
      font-size: 12px; cursor: pointer;
      margin-top: 4px; padding: 6px;
      font-family: inherit;
      transition: color 0.15s;
    }
    .fc-save-cancel:hover { color: var(--fc-text); }

    /* ============================================================
       TOAST
       ============================================================ */
    .fc-toast {
      position: fixed; bottom: 96px; left: 50%;
      transform: translateX(-50%);
      background: var(--fc-elevated);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      color: var(--fc-text);
      padding: 11px 16px; border-radius: 12px;
      font-size: 12.5px; font-weight: 500;
      border: 1px solid var(--fc-border-strong);
      box-shadow: 0 16px 40px -8px rgba(0,0,0,0.5);
      z-index: 2147483647;
      display: flex; align-items: center; gap: 10px;
      max-width: calc(100vw - 40px);
      pointer-events: none;
      animation: fc-toast-in 0.3s var(--fc-spring);
    }
    .fc-toast-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--fc-accent-2);
      box-shadow: 0 0 8px var(--fc-accent-2);
      flex-shrink: 0;
    }
    @keyframes fc-toast-in {
      from { opacity: 0; transform: translateX(-50%) translateY(16px) scale(0.95); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
    }
    .fc-toast.out { animation: fc-toast-out 0.25s var(--fc-ease) forwards; }
    @keyframes fc-toast-out {
      to { opacity: 0; transform: translateX(-50%) translateY(12px) scale(0.96); }
    }

    @media (max-width: 520px) {
      #fc-panel { max-width: calc(100vw - 12px) !important; border-radius: 16px; }
      #fc-rail { width: 54px; padding: 10px 6px; }
      .fc-rail-btn { width: 42px; height: 42px; }
      .fc-rail-btn small { display: none; }
    }
  `;
  shadow.appendChild(style);

  // ============================================================
  // HTML
  // ============================================================
  const el = document.createElement("div");
  el.innerHTML = `
    <button id="fc-fab" type="button" title="Chat Everywhere">
      ${I.chat}
    </button>

    <div id="fc-panel" style="display:none;">
      <div id="fc-header" title="Drag to move · Double-click to reset">
        <div id="fc-brand">
          <div id="fc-brand-mark">${I.chat}</div>
          <div id="fc-brand-copy">
            <strong>Chat Everywhere</strong>
            <small><span id="fc-status"></span> Active on this page</small>
          </div>
        </div>
        <div id="fc-header-actions">
          <button class="fc-icon-btn" id="fc-mini-drag" title="Drag" tabindex="-1">${I.drag}</button>
          <button class="fc-icon-btn" id="fc-close-btn" title="Close">${I.close}</button>
        </div>
      </div>

      <div id="fc-body">
        <nav id="fc-rail">
          <button class="fc-rail-btn active" data-tab="chats" title="Chats">${I.chat}<small>Chat</small></button>
          <button class="fc-rail-btn" data-tab="media" title="Media">${I.media}<small>Media</small></button>
          <button class="fc-rail-btn" data-tab="groups" title="Groups">${I.groups}<small>Group</small></button>
          <button class="fc-rail-btn" data-tab="shares" title="Shares">${I.shares}<small>Share</small></button>
          <button class="fc-rail-btn" data-tab="tools" title="Tools">${I.tools}<small>Tools</small></button>
        </nav>

        <div id="fc-content">
          <!-- CHATS -->
          <div id="fc-chats" class="fc-panel active">
            <div id="fc-messages"></div>
            <div id="fc-composer">
              <div id="fc-composer-inner">
                <textarea id="fc-input" rows="1" placeholder="Message…"></textarea>
                <button id="fc-send" title="Send">${I.send}</button>
              </div>
            </div>
          </div>

          <!-- MEDIA -->
          <div id="fc-media" class="fc-panel">
            <div style="flex:1;overflow-y:auto;min-height:0;">
              <div class="fc-drop">
                <div class="fc-drop-icon">${I.media}</div>
                <h3>Drop videos & images</h3>
                <p>Drag any video, image, or link here to save it as a card.</p>
                <button class="fc-btn-ghost fc-paste" data-target="media">${I.link} Paste Link</button>
              </div>
              <div id="fc-media-list" class="fc-list"></div>
            </div>
          </div>

          <!-- GROUPS -->
          <div id="fc-groups" class="fc-panel">
            <div class="fc-empty">
              <div class="fc-empty-icon">${I.groups}</div>
              <h3>Groups</h3>
              <p>Your group conversations will appear here. Nothing yet.</p>
            </div>
          </div>

          <!-- SHARES -->
          <div id="fc-shares" class="fc-panel">
            <div style="flex:1;overflow-y:auto;min-height:0;">
              <div class="fc-drop">
                <div class="fc-drop-icon">${I.shares}</div>
                <h3>Save links to share</h3>
                <p>Drag any link from the page or paste one from your clipboard.</p>
                <button class="fc-btn-ghost fc-paste" data-target="shares">${I.link} Paste Link</button>
              </div>
              <div id="fc-shares-list" class="fc-list"></div>
            </div>
          </div>

          <!-- TOOLS -->
          <div id="fc-tools" class="fc-panel">
            <div id="fc-tools-scroll">
              <div class="fc-tools-wrap">
                <div class="fc-tool">
                  <div class="fc-tool-chip">${I.snippet}</div>
                  <div class="fc-tool-info">
                    <h3>Snippet</h3>
                    <p>Drag a rectangle on the page to crop and save.</p>
                  </div>
                  <button id="fc-snippet-btn" class="fc-tool-action">Capture</button>
                </div>
                <div id="fc-snippet-result" class="fc-expand fc-result"></div>

                <div class="fc-tool">
                  <div class="fc-tool-chip">${I.notes}</div>
                  <div class="fc-tool-info">
                    <h3>Notes</h3>
                    <p>Auto-saved scratchpad, unique per site.</p>
                  </div>
                  <button id="fc-notes-btn" class="fc-tool-action">Open</button>
                </div>
                <div id="fc-notes-area" class="fc-expand">
                  <textarea id="fc-notes-input" placeholder="Type your notes here…"></textarea>
                </div>

                <div class="fc-tool">
                  <div class="fc-tool-chip">${I.color}</div>
                  <div class="fc-tool-info">
                    <h3>Color Picker</h3>
                    <p>Sample any color on the page.</p>
                  </div>
                  <button id="fc-color-btn" class="fc-tool-action">Pick</button>
                </div>
                <div id="fc-color-result" class="fc-expand"></div>

                <div class="fc-tool">
                  <div class="fc-tool-chip">${I.camera}</div>
                  <div class="fc-tool-info">
                    <h3>Full Page Shot</h3>
                    <p>Scrolls and stitches the entire page.</p>
                  </div>
                  <button id="fc-fullshot-btn" class="fc-tool-action">Capture</button>
                </div>
                <div id="fc-fullshot-result" class="fc-expand fc-result"></div>

                <div class="fc-tool">
                  <div class="fc-tool-chip">${I.link}</div>
                  <div class="fc-tool-info">
                    <h3>Copy as Markdown</h3>
                    <p>Copies <code>[title](url)</code> to clipboard.</p>
                  </div>
                  <button id="fc-md-btn" class="fc-tool-action">Copy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="fc-save" style="display:none;">
        <div class="fc-save-card">
          <h3>Where do you want to save this?</h3>
          <p id="fc-save-url"></p>
          <div class="fc-save-actions">
            <button class="fc-save-opt primary" id="fc-save-to-media">${I.media} Save to Media</button>
            <button class="fc-save-opt" id="fc-save-to-shares">${I.shares} Save to Shares</button>
            <button class="fc-save-cancel" id="fc-save-cancel">Cancel</button>
          </div>
        </div>
      </div>

      <div id="fc-grip" title="Drag to resize"></div>
    </div>
  `;
  shadow.appendChild(el);

  // ============================================================
  // REFS
  // ============================================================
  const $ = (s) => shadow.querySelector(s);
  const fab = $("#fc-fab");
  const panel = $("#fc-panel");
  const headerEl = $("#fc-header");
  const grip = $("#fc-grip");
  const messages = $("#fc-messages");
  const input = $("#fc-input");
  const sendBtn = $("#fc-send");
  const closeBtn = $("#fc-close-btn");
  const miniDrag = $("#fc-mini-drag");
  const railBtns = shadow.querySelectorAll(".fc-rail-btn");
  const panelEls = shadow.querySelectorAll(".fc-panel");
  const pasteBtns = shadow.querySelectorAll(".fc-paste");

  const snippetBtn = $("#fc-snippet-btn");
  const snippetResult = $("#fc-snippet-result");
  const notesBtn = $("#fc-notes-btn");
  const notesArea = $("#fc-notes-area");
  const notesInput = $("#fc-notes-input");
  const colorBtn = $("#fc-color-btn");
  const colorResult = $("#fc-color-result");
  const fullshotBtn = $("#fc-fullshot-btn");
  const fullshotResult = $("#fc-fullshot-result");
  const mdBtn = $("#fc-md-btn");

  const mediaList = $("#fc-media-list");
  const sharesList = $("#fc-shares-list");

  const saveDlg = $("#fc-save");
  const saveUrl = $("#fc-save-url");
  const saveToMedia = $("#fc-save-to-media");
  const saveToShares = $("#fc-save-to-shares");
  const saveCancel = $("#fc-save-cancel");

  let isOpen = false;
  let currentTab = "chats";
  let pendingMedia = null;

  const DEFAULT_SIZE = { width: 480, height: 560 };
  const MIN_W = 380,
    MIN_H = 420;

  // ============================================================
  // HELPERS
  // ============================================================
  const vp = () => ({
    w: window.innerWidth || document.documentElement.clientWidth,
    h: window.innerHeight || document.documentElement.clientHeight,
  });
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const host = () => {
    try {
      return new URL(location.href).hostname.replace("www.", "");
    } catch {
      return location.href;
    }
  };
  const fmtTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ============================================================
  // STATE PERSISTENCE (position + size)
  // ============================================================
  function saveState() {
    const r = panel.getBoundingClientRect();
    const f = fab.getBoundingClientRect();
    try {
      localStorage.setItem(
        "fc_state_v3",
        JSON.stringify({
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
          fabLeft: f.left,
          fabTop: f.top,
        }),
      );
    } catch (e) {}
  }
  function applyState(s) {
    if (!s) return;
    const { w, h } = vp();
    if (s.left != null && s.top != null) {
      const width = clamp(s.width || DEFAULT_SIZE.width, MIN_W, w - 10);
      const height = clamp(s.height || DEFAULT_SIZE.height, MIN_H, h - 10);
      const left = clamp(s.left, 0, w - width);
      const top = clamp(s.top, 0, h - height);
      Object.assign(panel.style, {
        left: left + "px",
        top: top + "px",
        right: "auto",
        bottom: "auto",
        width: width + "px",
        height: height + "px",
      });
    }
    if (s.fabLeft != null && s.fabTop != null) {
      Object.assign(fab.style, {
        left: s.fabLeft + "px",
        top: s.fabTop + "px",
        right: "auto",
        bottom: "auto",
      });
    }
  }
  function loadState() {
    try {
      applyState(JSON.parse(localStorage.getItem("fc_state_v3") || "null"));
    } catch (e) {}
  }
  function resetState() {
    Object.assign(panel.style, {
      left: "",
      top: "100px",
      right: "24px",
      bottom: "auto",
      width: DEFAULT_SIZE.width + "px",
      height: DEFAULT_SIZE.height + "px",
    });
    Object.assign(fab.style, {
      left: "",
      top: "",
      right: "24px",
      bottom: "24px",
    });
    try {
      localStorage.removeItem("fc_state_v3");
    } catch (e) {}
    toast("Reset position", "↺");
  }

  // ============================================================
  // TOAST
  // ============================================================
  function toast(msg) {
    shadow.querySelectorAll(".fc-toast").forEach((t) => t.remove());
    const t = document.createElement("div");
    t.className = "fc-toast";
    t.innerHTML = `<span class="fc-toast-dot"></span><span>${msg}</span>`;
    shadow.appendChild(t);
    setTimeout(() => {
      t.classList.add("out");
      setTimeout(() => t.remove(), 260);
    }, 2000);
  }

  // ============================================================
  // OPEN / CLOSE
  // ============================================================
  function openPanel() {
    isOpen = true;
    panel.style.display = "flex";
    const r = panel.getBoundingClientRect();
    const { w, h } = vp();
    if (r.right > w || r.bottom > h || r.left < 0 || r.top < 0) {
      const width = clamp(r.width, MIN_W, w - 10);
      const height = clamp(r.height, MIN_H, h - 10);
      Object.assign(panel.style, {
        width: width + "px",
        height: height + "px",
        left: clamp(r.left, 0, w - width) + "px",
        top: clamp(r.top, 0, h - height) + "px",
        right: "auto",
        bottom: "auto",
      });
    }
    setTimeout(() => input.focus(), 120);
  }
  function closePanel() {
    isOpen = false;
    panel.style.display = "none";
  }

  // ============================================================
  // DRAGGABLE
  // ============================================================
  function makeDraggable(target, handle, onEnd) {
    let down = false,
      sx = 0,
      sy = 0,
      sl = 0,
      st = 0;

    function start(cx, cy) {
      const r = target.getBoundingClientRect();
      Object.assign(target.style, {
        left: r.left + "px",
        top: r.top + "px",
        right: "auto",
        bottom: "auto",
      });
      sl = r.left;
      st = r.top;
      sx = cx;
      sy = cy;
      down = true;
      target.classList.add("fc-dragging");
    }
    function move(cx, cy) {
      if (!down) return;
      const { w, h } = vp();
      const r = target.getBoundingClientRect();
      target.style.left = clamp(sl + (cx - sx), 0, w - r.width) + "px";
      target.style.top = clamp(st + (cy - sy), 0, h - r.height) + "px";
    }
    function end() {
      if (!down) return;
      down = false;
      target.classList.remove("fc-dragging");
      document.removeEventListener("mousemove", mm, true);
      document.removeEventListener("mouseup", mu, true);
      document.removeEventListener("touchmove", tm, true);
      document.removeEventListener("touchend", te, true);
      if (onEnd) onEnd();
    }
    function mm(e) {
      move(e.clientX, e.clientY);
    }
    function mu() {
      end();
    }
    function tm(e) {
      if (!down) return;
      e.preventDefault();
      const t = e.touches[0];
      move(t.clientX, t.clientY);
    }
    function te() {
      end();
    }

    handle.addEventListener("mousedown", (e) => {
      if (e.target.closest("button, input, textarea, a")) return;
      e.preventDefault();
      start(e.clientX, e.clientY);
      document.addEventListener("mousemove", mm, true);
      document.addEventListener("mouseup", mu, true);
    });
    handle.addEventListener(
      "touchstart",
      (e) => {
        if (e.target.closest("button, input, textarea, a")) return;
        const t = e.touches[0];
        start(t.clientX, t.clientY);
        document.addEventListener("touchmove", tm, {
          capture: true,
          passive: false,
        });
        document.addEventListener("touchend", te, true);
      },
      { passive: true },
    );
  }

  makeDraggable(panel, headerEl, saveState);
  makeDraggable(fab, fab, saveState);

  // FAB click vs drag
  let fabMoved = false;
  fab.addEventListener("mousedown", () => {
    fabMoved = false;
  });
  fab.addEventListener("mousemove", () => {
    fabMoved = true;
  });
  fab.addEventListener(
    "touchstart",
    () => {
      fabMoved = false;
    },
    { passive: true },
  );
  fab.addEventListener(
    "touchmove",
    () => {
      fabMoved = true;
    },
    { passive: true },
  );
  fab.addEventListener("click", (e) => {
    if (fabMoved) {
      e.preventDefault();
      e.stopPropagation();
      fabMoved = false;
      return;
    }
    isOpen ? closePanel() : openPanel();
  });

  // ============================================================
  // RESIZABLE
  // ============================================================
  (function makeResizable() {
    let on = false,
      sx = 0,
      sy = 0,
      sw = 0,
      sh = 0,
      sl = 0,
      st = 0;

    function start(cx, cy) {
      const r = panel.getBoundingClientRect();
      Object.assign(panel.style, {
        left: r.left + "px",
        top: r.top + "px",
        right: "auto",
        bottom: "auto",
        width: r.width + "px",
        height: r.height + "px",
      });
      sx = cx;
      sy = cy;
      sw = r.width;
      sh = r.height;
      sl = r.left;
      st = r.top;
      on = true;
      panel.classList.add("fc-resizing");
    }
    function move(cx, cy) {
      if (!on) return;
      const { w, h } = vp();
      panel.style.width = clamp(sw + (cx - sx), MIN_W, w - sl - 4) + "px";
      panel.style.height = clamp(sh + (cy - sy), MIN_H, h - st - 4) + "px";
    }
    function end() {
      if (!on) return;
      on = false;
      panel.classList.remove("fc-resizing");
      document.removeEventListener("mousemove", mm, true);
      document.removeEventListener("mouseup", mu, true);
      document.removeEventListener("touchmove", tm, true);
      document.removeEventListener("touchend", te, true);
      saveState();
    }
    function mm(e) {
      move(e.clientX, e.clientY);
    }
    function mu() {
      end();
    }
    function tm(e) {
      if (!on) return;
      e.preventDefault();
      const t = e.touches[0];
      move(t.clientX, t.clientY);
    }
    function te() {
      end();
    }

    grip.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      start(e.clientX, e.clientY);
      document.addEventListener("mousemove", mm, true);
      document.addEventListener("mouseup", mu, true);
    });
    grip.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        const t = e.touches[0];
        start(t.clientX, t.clientY);
        document.addEventListener("touchmove", tm, {
          capture: true,
          passive: false,
        });
        document.addEventListener("touchend", te, true);
      },
      { passive: false },
    );
  })();

  headerEl.addEventListener("dblclick", (e) => {
    if (e.target.closest("button")) return;
    resetState();
  });

  window.addEventListener("resize", () => {
    const { w, h } = vp();
    const r = panel.getBoundingClientRect();
    const nw = clamp(r.width, MIN_W, w - 10);
    const nh = clamp(r.height, MIN_H, h - 10);
    if (r.left + nw > w) {
      panel.style.left = clamp(r.left, 0, w - nw) + "px";
      panel.style.right = "auto";
    }
    if (r.top + nh > h) {
      panel.style.top = clamp(r.top, 0, h - nh) + "px";
      panel.style.bottom = "auto";
    }
    panel.style.width = nw + "px";
    panel.style.height = nh + "px";
  });

  // ============================================================
  // CHAT
  // ============================================================
  function pushMsg(text, who) {
    const wrap = document.createElement("div");
    wrap.className = `fc-msg ${who}`;
    const b = document.createElement("div");
    b.className = "fc-bubble";
    b.textContent = text;
    const m = document.createElement("div");
    m.className = "fc-meta";
    m.textContent = (who === "user" ? "You · " : "Bot · ") + fmtTime();
    wrap.appendChild(b);
    wrap.appendChild(m);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }
  function send() {
    const text = input.value.trim();
    if (!text) return;
    pushMsg(text, "user");
    input.value = "";
    autoGrow();
    setTimeout(() => pushMsg("Thanks! I'm a demo bot 👋", "bot"), 380);
  }
  function autoGrow() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 120) + "px";
  }
  input.addEventListener("input", autoGrow);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });
  sendBtn.addEventListener("click", send);
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closePanel();
  });

  // ============================================================
  // TABS (rail)
  // ============================================================
  railBtns.forEach((b) => {
    b.addEventListener("click", () => {
      currentTab = b.dataset.tab;
      railBtns.forEach((x) => x.classList.toggle("active", x === b));
      panelEls.forEach((p) =>
        p.classList.toggle("active", p.id === "fc-" + currentTab),
      );
    });
  });

  // ============================================================
  // MEDIA HELPERS
  // ============================================================
  function detectType(url) {
    if (!url) return "link";
    const l = url.toLowerCase();
    if (/\.(mp4|webm|ogg|mov|m4v|avi|mkv)(\?|$)/i.test(l)) return "video-file";
    if (/\.(png|jpe?g|gif|webp|svg|bmp|avif)(\?|$)/i.test(l)) return "image";
    if (/youtube\.com\/watch|youtu\.be\//.test(l)) return "youtube";
    if (/vimeo\.com\//.test(l)) return "vimeo";
    return "link";
  }
  function embedInfo(url, type) {
    if (type === "youtube") {
      const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
      const v = m ? m[1] : "";
      return {
        thumb: v ? `https://img.youtube.com/vi/${v}/hqdefault.jpg` : "",
        embed: v ? `https://www.youtube.com/embed/${v}` : url,
      };
    }
    if (type === "vimeo") {
      const m = url.match(/vimeo\.com\/(\d+)/);
      const v = m ? m[1] : "";
      return {
        thumb: "",
        embed: v ? `https://player.vimeo.com/video/${v}` : url,
      };
    }
    if (type === "image") return { thumb: url, embed: url };
    return { thumb: "", embed: url };
  }
  function saveItems() {
    try {
      localStorage.setItem(
        "fc_media_v3",
        JSON.stringify(
          Array.from(mediaList.children).map((x) => JSON.parse(x.dataset.item)),
        ),
      );
      localStorage.setItem(
        "fc_shares_v3",
        JSON.stringify(
          Array.from(sharesList.children).map((x) =>
            JSON.parse(x.dataset.item),
          ),
        ),
      );
    } catch (e) {}
  }
  function loadItems() {
    try {
      JSON.parse(localStorage.getItem("fc_media_v3") || "[]").forEach((i) =>
        renderCard(i, "media"),
      );
      JSON.parse(localStorage.getItem("fc_shares_v3") || "[]").forEach((i) =>
        renderCard(i, "shares"),
      );
    } catch (e) {}
  }
  function renderCard(item, target) {
    const list = target === "media" ? mediaList : sharesList;
    const key = JSON.stringify(item);
    if (Array.from(list.children).some((c) => c.dataset.item === key)) return;

    const card = document.createElement("div");
    card.className = "fc-card";
    card.dataset.item = key;

    const label =
      item.type === "youtube"
        ? "YouTube"
        : item.type === "vimeo"
          ? "Vimeo"
          : item.type === "image"
            ? "Image"
            : item.type === "video-file"
              ? "Video"
              : "Link";

    let thumb;
    if (item.thumb) {
      thumb = `<img class="fc-card-thumb" src="${item.thumb}" alt="" onerror="this.outerHTML='<div class=\\'fc-card-thumb-fallback\\'>${I.image}</div>'"/>`;
    } else {
      const ic =
        item.type === "video-file"
          ? I.media
          : item.type === "youtube"
            ? I.media
            : I.link;
      thumb = `<div class="fc-card-thumb-fallback">${ic}</div>`;
    }

    card.innerHTML = `
      <a href="${item.url}" target="_blank" rel="noreferrer" style="text-decoration:none;display:block;">${thumb}</a>
      <div class="fc-card-body">
        <span class="fc-badge">${label}</span>
        <span class="fc-card-title" title="${item.title}">${item.title}</span>
        <button class="fc-del" title="Remove">${I.trash}</button>
      </div>
    `;
    card.querySelector(".fc-del").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      card.remove();
      saveItems();
      toast("Removed");
    });
    list.appendChild(card);
  }
  function addItem(item, target) {
    renderCard(item, target);
    saveItems();
    railBtns.forEach((b) => {
      if (b.dataset.tab === target) b.click();
    });
    toast(`Saved to ${target}`);
  }

  // ============================================================
  // SAVE DIALOG
  // ============================================================
  function showSave(item) {
    if (!isOpen) openPanel();
    pendingMedia = item;
    saveUrl.textContent =
      item.title.length > 60 ? item.title.slice(0, 60) + "…" : item.title;
    saveDlg.style.display = "flex";
  }
  function hideSave() {
    pendingMedia = null;
    saveDlg.style.display = "none";
  }
  saveToMedia.addEventListener("click", () => {
    if (pendingMedia) addItem(pendingMedia, "media");
    hideSave();
  });
  saveToShares.addEventListener("click", () => {
    if (pendingMedia) addItem(pendingMedia, "shares");
    hideSave();
  });
  saveCancel.addEventListener("click", hideSave);

  // ============================================================
  // PASTE FROM CLIPBOARD
  // ============================================================
  pasteBtns.forEach((b) => {
    b.addEventListener("click", async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (!text || (!text.startsWith("http") && !text.startsWith("www"))) {
          toast("No valid link in clipboard");
          return;
        }
        const url = text.startsWith("www") ? "https://" + text : text;
        const type = detectType(url);
        const { thumb, embed } = embedInfo(url, type);
        addItem(
          { url: embed || url, title: host(), type, thumb },
          b.dataset.target,
        );
      } catch {
        toast("Allow clipboard access");
      }
    });
  });

  // ============================================================
  // DRAG & DROP FROM PAGE
  // ============================================================
  let dropActive = false;
  function showHint() {
    if (dropActive || shadow.querySelector("#fc-drop-hint")) return;
    const h = document.createElement("div");
    h.id = "fc-drop-hint";
    h.innerHTML = `<div id="fc-drop-hint-inner">${I.download} Drop it anywhere to save</div>`;
    shadow.appendChild(h);
    dropActive = true;
  }
  function hideHint() {
    const h = shadow.querySelector("#fc-drop-hint");
    if (h) h.remove();
    dropActive = false;
  }
  document.addEventListener(
    "dragenter",
    (e) => {
      e.preventDefault();
      const dt = e.dataTransfer;
      if (
        dt &&
        (dt.types.includes("text/uri-list") ||
          dt.types.includes("text/plain") ||
          dt.types.includes("text/html") ||
          dt.types.includes("Files"))
      )
        showHint();
    },
    true,
  );
  document.addEventListener(
    "dragover",
    (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      showHint();
    },
    true,
  );
  document.addEventListener(
    "dragleave",
    (e) => {
      if (!e.relatedTarget) hideHint();
    },
    true,
  );

  document.addEventListener(
    "drop",
    (e) => {
      e.preventDefault();
      hideHint();

      // Files
      if (e.dataTransfer.files && e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          const r = new FileReader();
          r.onload = (ev) =>
            addItem(
              {
                url: ev.target.result,
                title: file.name,
                type: "image",
                thumb: ev.target.result,
              },
              currentTab === "shares" ? "shares" : "media",
            );
          r.readAsDataURL(file);
          return;
        }
        if (file.type.startsWith("video/")) {
          addItem(
            {
              url: URL.createObjectURL(file),
              title: file.name,
              type: "video-file",
              thumb: "",
            },
            currentTab === "shares" ? "shares" : "media",
          );
          return;
        }
      }

      // URL
      let url = "",
        html = "";
      try {
        url = e.dataTransfer.getData("text/uri-list");
      } catch {}
      try {
        if (!url) url = e.dataTransfer.getData("text/plain");
      } catch {}
      try {
        if (!url) url = e.dataTransfer.getData("URL");
      } catch {}
      try {
        html = e.dataTransfer.getData("text/html");
      } catch {}
      if (!url && html) {
        const m = html.match(/href="([^"]+)"/);
        if (m) url = m[1];
      }

      // DOM walk
      let type = "",
        thumb = "",
        title = "";
      let node = e.target,
        d = 0;
      while (node && d < 6) {
        if (node.tagName === "A" && node.href && !url) {
          url = node.href;
          title = node.textContent?.trim() || "";
        }
        if (node.tagName === "IMG" && node.src) {
          if (!url || !/youtube|video|watch|vimeo/.test(url)) {
            url = node.src;
            type = "image";
            thumb = node.src;
            title = node.alt || node.title || "Image";
          }
        }
        if (node.tagName === "VIDEO") {
          const poster = node.poster || "",
            src = node.currentSrc || node.src || "";
          if (src) {
            url = src;
            type = "video-file";
            thumb = poster;
            title = node.title || "Video";
          }
        }
        node = node.parentElement;
        d++;
      }
      if (!url) return;
      if (!/^(https?|blob|data):/.test(url)) return;

      if (!type) type = detectType(url);
      const ei = embedInfo(url, type);
      const finalThumb = thumb || ei.thumb;
      const finalUrl = ei.embed || url;

      if (!title) {
        if (type === "youtube") title = "YouTube video";
        else if (type === "vimeo") title = "Vimeo video";
        else if (type === "image") title = "Image";
        else if (type === "video-file") title = "Video";
        else title = host();
      }
      if (title.length > 60) title = title.slice(0, 60) + "…";

      const item = { url: finalUrl, title, type, thumb: finalThumb };
      if (currentTab === "media") addItem(item, "media");
      else if (currentTab === "shares") addItem(item, "shares");
      else showSave(item);
    },
    true,
  );

  // ============================================================
  // CONTEXT MENU
  // ============================================================
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "saveExternalLink") {
      const type = detectType(msg.url);
      const { thumb, embed } = embedInfo(msg.url, type);
      const item = { url: embed || msg.url, title: host(), type, thumb };
      if (currentTab === "media") addItem(item, "media");
      else if (currentTab === "shares") addItem(item, "shares");
      else showSave(item);
    }
  });

  // ============================================================
  // TOOLS
  // ============================================================

  // 1. Snippet
  snippetBtn.addEventListener("click", () => {
    snippetBtn.textContent = "Working…";
    snippetBtn.disabled = true;
    snippetResult.innerHTML = "";
    chrome.runtime.sendMessage({ action: "takeScreenshot" }, (resp) => {
      snippetBtn.textContent = "Capture";
      snippetBtn.disabled = false;
      if (chrome.runtime.lastError || !resp || !resp.success) {
        snippetResult.innerHTML = `<p class="fc-result-status err">Screenshot failed</p>`;
        return;
      }
      const ov = document.createElement("div");
      ov.id = "fc-shot-overlay";
      shadow.appendChild(ov);
      const box = document.createElement("div");
      box.id = "fc-shot-box";
      ov.appendChild(box);

      let sx,
        sy,
        drawing = false;
      ov.addEventListener("mousedown", (e) => {
        drawing = true;
        sx = e.clientX;
        sy = e.clientY;
        Object.assign(box.style, {
          left: sx + "px",
          top: sy + "px",
          width: "0px",
          height: "0px",
          display: "block",
        });
      });
      ov.addEventListener("mousemove", (e) => {
        if (!drawing) return;
        const w = Math.abs(e.clientX - sx),
          h = Math.abs(e.clientY - sy);
        Object.assign(box.style, {
          left: Math.min(e.clientX, sx) + "px",
          top: Math.min(e.clientY, sy) + "px",
          width: w + "px",
          height: h + "px",
        });
      });
      ov.addEventListener("mouseup", (e) => {
        if (!drawing) return;
        drawing = false;
        const w = Math.abs(e.clientX - sx),
          h = Math.abs(e.clientY - sy);
        const left = Math.min(e.clientX, sx),
          top = Math.min(e.clientY, sy);
        ov.remove();
        if (w < 10 || h < 10) return;
        const img = new Image();
        img.src = resp.image;
        img.onload = () => {
          const cv = document.createElement("canvas");
          const ctx = cv.getContext("2d");
          const dpr = window.devicePixelRatio || 1;
          cv.width = w * dpr;
          cv.height = h * dpr;
          ctx.drawImage(
            img,
            left * dpr,
            top * dpr,
            w * dpr,
            h * dpr,
            0,
            0,
            w * dpr,
            h * dpr,
          );
          const url = cv.toDataURL("image/png");
          snippetResult.style.display = "block";
          snippetResult.innerHTML = `
            <p class="fc-result-status ok">Snippet captured</p>
            <img src="${url}" />
            <a class="fc-download" href="${url}" download="snippet-${Date.now()}.png">${I.download} Download</a>
          `;
          toast("Snippet captured");
        };
      });
      toast("Drag to select area");
    });
  });

  // 2. Notes
  notesBtn.addEventListener("click", () => {
    const open = notesArea.style.display === "block";
    notesArea.style.display = open ? "none" : "block";
    notesBtn.textContent = open ? "Open" : "Close";
    if (!open) {
      notesInput.value = localStorage.getItem("fc_note_" + host()) || "";
      notesInput.focus();
    }
  });
  notesInput.addEventListener("input", () => {
    localStorage.setItem("fc_note_" + host(), notesInput.value);
  });

  // 3. Color Picker
  colorBtn.addEventListener("click", async () => {
    if (!window.EyeDropper) {
      toast("Not supported in this browser");
      return;
    }
    try {
      const dropper = new window.EyeDropper();
      const r = await dropper.open();
      const hex = r.sRGBHex;
      colorResult.style.display = "block";
      colorResult.innerHTML = `
        <div class="fc-color-hero" style="background:${hex};"></div>
        <div class="fc-color-row">
          <div class="fc-color-hex">${hex}</div>
          <button class="fc-download" id="fc-copy-color">${I.copy} Copy</button>
        </div>
      `;
      const copyBtn = colorResult.querySelector("#fc-copy-color");
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(hex);
          toast("Copied " + hex);
        } catch {
          toast("Copy failed");
        }
      });
      try {
        await navigator.clipboard.writeText(hex);
        toast("Picked " + hex);
      } catch {}
    } catch {}
  });

  // 4. Full page shot
  fullshotBtn.addEventListener("click", async () => {
    fullshotBtn.disabled = true;
    fullshotBtn.textContent = "Working…";
    fullshotResult.style.display = "block";
    fullshotResult.innerHTML = `
      <div class="fc-progress"><div class="fc-progress-bar" id="fc-fs-bar"></div></div>
      <div class="fc-progress-label" id="fc-fs-label">Starting…</div>
    `;
    const bar = shadow.querySelector("#fc-fs-bar");
    const label = shadow.querySelector("#fc-fs-label");
    try {
      const orig = { x: window.scrollX, y: window.scrollY };
      const total = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
      );
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const dpr = window.devicePixelRatio || 1;
      const cv = document.createElement("canvas");
      cv.width = vw * dpr;
      cv.height = total * dpr;
      const ctx = cv.getContext("2d");
      const count = Math.ceil(total / vh);

      for (let i = 0; i < count; i++) {
        const y = i * vh;
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 220));
        const resp = await new Promise((res) =>
          chrome.runtime.sendMessage({ action: "takeScreenshot" }, res),
        );
        if (!resp || !resp.success) throw new Error("capture failed");
        await new Promise((resolve) => {
          const im = new Image();
          im.onload = () => {
            const maxH = Math.min(im.height, (total - y) * dpr);
            ctx.drawImage(im, 0, 0, im.width, maxH, 0, y * dpr, im.width, maxH);
            resolve();
          };
          im.onerror = resolve;
          im.src = resp.image;
        });
        const pct = Math.round(((i + 1) / count) * 100);
        bar.style.width = pct + "%";
        label.textContent = `Captured ${i + 1} / ${count} (${pct}%)`;
      }
      window.scrollTo(orig.x, orig.y);
      const url = cv.toDataURL("image/png");
      fullshotResult.innerHTML = `
        <p class="fc-result-status ok">Full page captured</p>
        <img src="${url}" style="max-height:150px;object-fit:cover;" />
        <a class="fc-download" href="${url}" download="fullpage-${Date.now()}.png">${I.download} Download</a>
      `;
      toast("Full page captured");
    } catch (err) {
      fullshotResult.innerHTML = `<p class="fc-result-status err">Failed: ${err.message}</p>`;
    } finally {
      fullshotBtn.disabled = false;
      fullshotBtn.textContent = "Capture";
    }
  });

  // 5. Markdown
  mdBtn.addEventListener("click", async () => {
    const md = `[${document.title || "Untitled"}](${location.href})`;
    try {
      await navigator.clipboard.writeText(md);
      toast("Markdown copied");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = md;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        toast("Markdown copied");
      } catch {
        toast("Copy failed");
      }
      document.body.removeChild(ta);
    }
  });

  // ============================================================
  // INIT
  // ============================================================
  loadState();
  loadItems();
  pushMsg(
    "Hey! Drag the header to move, corner to resize. Everything saves automatically.",
    "bot",
  );
})();
