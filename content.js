(function () {
  if (document.getElementById("fc-root")) return;

  // ============================================================
  // SHADOW ROOT
  // ============================================================
  const root = document.createElement("div");
  root.id = "fc-root";
  root.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;z-index:2147483647;";
  document.documentElement.appendChild(root);
  const shadow = root.attachShadow({ mode: "open" });

  // ============================================================
  // ICONS (Elegant, thin-stroke, refined)
  // ============================================================
  const I = {
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" fill="currentColor" fill-opacity="0.1"/><path d="M8 12H16M8 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M18 16L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m10 9 5 3-5 3V9z"/></svg>`,
    groups: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    shares: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    tools: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
    send: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.4 20.4 20.85 12 3.4 3.6l.01 6.53L15 12 3.41 13.87z"/></svg>`,
    snippet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V4h5M18 9V4h-5M6 15v5h5M18 15v5h-5"/></svg>`,
    notes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>`,
    color: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.9-.1 2.9-.3.4-.1.6-.4.6-.8 0-.2-.1-.4-.2-.6-.2-.4-.3-.8-.3-1.2 0-1.7 1.3-3.1 3-3.1h1.9c1.7 0 3.1-1.4 3.1-3.1C22 6.9 17.5 2 12 2z"/></svg>`,
    camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
    link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>`,
    copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>`,
    image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`,
    drag: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>`,
    // --- NEW ICON FOR HIGHLIGHT ---
    highlight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>`
  };

  // ============================================================
  // CSS (Classy, Sophisticated Light Theme)
  // ============================================================
  const style = document.createElement("style");
  style.textContent = `
    :host {
      all: initial;
      --fc-bg: #ffffff;
      --fc-surface: rgba(250, 250, 250, 0.85);
      --fc-surface-solid: #ffffff;
      --fc-surface-hover: #f4f4f5;
      --fc-border: #e4e4e7;
      --fc-border-hover: #d4d4d8;
      --fc-text: #18181b;
      --fc-text-soft: #52525b;
      --fc-text-mute: #a1a1aa;
      --fc-accent: #18181b; 
      --fc-accent-soft: #f4f4f5;
      --fc-success: #10b981;
      --fc-danger: #ef4444;
      --fc-radius-lg: 16px;
      --fc-radius: 12px;
      --fc-radius-sm: 8px;
      --fc-shadow-lg: 0 10px 40px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.03);
      --fc-shadow-md: 0 4px 12px -4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02);
      --fc-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
      --fc-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
      --fc-mono: ui-monospace, "SF Mono", Menlo, monospace;
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
      border: 1px solid rgba(0,0,0,0.08);
      background: var(--fc-accent); 
      color: #fff; cursor: grab;
      z-index: 2147483646;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.25s var(--fc-spring), box-shadow 0.25s var(--fc-ease), background 0.2s;
      user-select: none; touch-action: none; padding: 0;
    }
    #fc-fab svg { width: 26px; height: 26px; }
    #fc-fab:hover {
      transform: translateY(-2px) scale(1.04);
      background: #000;
      box-shadow: 0 8px 20px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.1);
    }
    #fc-fab:active { cursor: grabbing; transform: scale(0.96); }
    #fc-fab.fc-dragging { transition: none; }

    /* ============================================================
       PANEL SHELL
       ============================================================ */
    #fc-panel {
      position: fixed;
      top: 100px; right: 24px;
      width: 500px; height: 600px;
      min-width: 400px; min-height: 450px;
      max-width: calc(100vw - 20px); max-height: calc(100vh - 20px);
      
      background: var(--fc-surface);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: var(--fc-radius-lg);
      box-shadow: var(--fc-shadow-lg);
      z-index: 2147483647;
      
      display: flex; flex-direction: column; overflow: hidden;
      color: var(--fc-text); font-size: 14px; line-height: 1.6;
      animation: fc-in 0.3s var(--fc-ease);
      isolation: isolate;
    }
    
    @keyframes fc-in {
      from { opacity: 0; transform: scale(0.98) translateY(8px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
    #fc-panel.fc-dragging, #fc-panel.fc-resizing { animation: none; }

    /* ============================================================
       HEADER
       ============================================================ */
    #fc-header {
      display: flex; align-items: center; gap: 14px;
      padding: 18px 24px;
      border-bottom: 1px solid var(--fc-border);
      flex-shrink: 0;
      cursor: grab; user-select: none; touch-action: none;
      background: var(--fc-surface-solid);
    }
    #fc-header:active { cursor: grabbing; }
    #fc-brand { display: flex; align-items: center; gap: 12px; pointer-events: none; flex: 1; min-width: 0; }
    
    #fc-brand-mark {
      width: 36px; height: 36px; border-radius: 10px;
      background: var(--fc-accent-soft);
      display: flex; align-items: center; justify-content: center; color: var(--fc-text);
      flex-shrink: 0;
    }
    #fc-brand-mark svg { width: 20px; height: 20px; }
    
    #fc-brand-copy { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
    #fc-brand-copy strong { font-size: 15px; font-weight: 600; letter-spacing: -0.2px; color: var(--fc-text); }
    #fc-brand-copy small { font-size: 11.5px; color: var(--fc-text-soft); display: flex; align-items: center; gap: 6px; font-weight: 500; }
    #fc-status { width: 6px; height: 6px; border-radius: 50%; background: var(--fc-success); }
    
    #fc-header-actions { display: flex; gap: 4px; }
    .fc-icon-btn {
      width: 32px; height: 32px; border-radius: 8px; background: transparent; border: 1px solid transparent;
      color: var(--fc-text-mute); display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; transition: all 0.2s var(--fc-ease); font-family: inherit;
    }
    .fc-icon-btn svg { width: 16px; height: 16px; }
    .fc-icon-btn:hover { background: var(--fc-surface-hover); color: var(--fc-text); }
    #fc-close-btn:hover { background: #fef2f2; color: var(--fc-danger); }
    #fc-mini-drag { cursor: grab; }
    #fc-mini-drag:active { cursor: grabbing; }

    /* ============================================================
       TABS (Elegant Top Navigation)
       ============================================================ */
    #fc-tabs {
      display: flex; gap: 2px; padding: 12px 24px;
      border-bottom: 1px solid var(--fc-border);
      background: var(--fc-surface-solid);
      flex-shrink: 0;
    }
    .fc-tab-btn {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 10px 12px; border-radius: 8px; border: none; background: transparent;
      color: var(--fc-text-soft); font-size: 12.5px; font-weight: 500;
      cursor: pointer; transition: all 0.2s var(--fc-ease); font-family: inherit;
    }
    .fc-tab-btn svg { width: 16px; height: 16px; opacity: 0.7; }
    .fc-tab-btn:hover { background: var(--fc-surface-hover); color: var(--fc-text); }
    .fc-tab-btn.active {
      background: var(--fc-accent-soft); color: var(--fc-text); font-weight: 600;
    }
    .fc-tab-btn.active svg { opacity: 1; }

    /* ============================================================
       CONTENT AREA
       ============================================================ */
    #fc-content {
      flex: 1; min-height: 0; display: flex; flex-direction: column; background: var(--fc-bg);
    }
    .fc-panel { display: none; height: 100%; flex-direction: column; min-height: 0; }
    .fc-panel.active { display: flex; }

    /* ============================================================
       CHAT MESSAGES
       ============================================================ */
    #fc-messages {
      flex: 1; overflow-y: auto; min-height: 0;
      padding: 24px;
      display: flex; flex-direction: column; gap: 20px;
      scroll-behavior: smooth;
    }
    #fc-messages::-webkit-scrollbar { width: 6px; }
    #fc-messages::-webkit-scrollbar-thumb { background: transparent; border-radius: 8px; }
    #fc-messages:hover::-webkit-scrollbar-thumb { background: var(--fc-border-hover); }

    .fc-msg {
      display: flex; flex-direction: column; gap: 6px; max-width: 80%;
      animation: fc-msg-in 0.3s var(--fc-spring);
    }
    @keyframes fc-msg-in {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fc-msg.user { align-self: flex-end; align-items: flex-end; }
    .fc-msg.bot  { align-self: flex-start; align-items: flex-start; }

    .fc-bubble {
      padding: 12px 18px; border-radius: 18px;
      font-size: 14px; line-height: 1.5;
      word-wrap: break-word; overflow-wrap: anywhere;
    }
    .fc-msg.user .fc-bubble {
      background: var(--fc-accent); color: #fff;
      border-bottom-right-radius: 4px;
    }
    .fc-msg.bot .fc-bubble {
      background: var(--fc-surface-hover); color: var(--fc-text);
      border: 1px solid var(--fc-border);
      border-bottom-left-radius: 4px;
    }
    .fc-meta {
      font-size: 11px; color: var(--fc-text-mute); padding: 0 4px; font-weight: 400;
    }

    /* ============================================================
       COMPOSER
       ============================================================ */
    #fc-composer {
      flex-shrink: 0; padding: 16px 24px 24px;
      background: var(--fc-bg);
    }
    #fc-composer-inner {
      display: flex; align-items: flex-end; gap: 12px;
      background: var(--fc-surface-solid);
      border: 1px solid var(--fc-border);
      border-radius: 16px; padding: 8px 8px 8px 18px;
      box-shadow: var(--fc-shadow-sm);
      transition: border-color 0.2s var(--fc-ease);
    }
    #fc-composer-inner:focus-within {
      border-color: var(--fc-text-soft);
    }
    #fc-input {
      flex: 1; min-width: 0; border: none; outline: none; resize: none;
      background: transparent; color: var(--fc-text);
      font-size: 14px; line-height: 1.5; font-family: inherit;
      padding: 8px 0; max-height: 120px; min-height: 24px;
    }
    #fc-input::placeholder { color: var(--fc-text-mute); }
    #fc-send {
      flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px;
      border: none; background: var(--fc-accent);
      color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center; padding: 0;
      transition: transform 0.2s var(--fc-spring), background 0.2s;
    }
    #fc-send svg { width: 16px; height: 16px; transform: translateX(-1px); }
    #fc-send:hover { background: #000; transform: scale(1.04); }
    #fc-send:active { transform: scale(0.94); }

    /* ============================================================
       DROP ZONES
       ============================================================ */
    .fc-drop {
      margin: 24px; padding: 36px 24px;
      border: 1.5px dashed var(--fc-border-hover);
      border-radius: 16px; background: var(--fc-surface-solid);
      text-align: center; color: var(--fc-text-soft);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      transition: all 0.2s var(--fc-ease);
    }
    .fc-drop:hover { border-color: var(--fc-text-soft); background: var(--fc-surface-hover); }
    .fc-drop-icon {
      width: 56px; height: 56px; border-radius: 16px;
      background: var(--fc-surface-hover); color: var(--fc-text-soft);
      border: 1px solid var(--fc-border);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 16px;
    }
    .fc-drop-icon svg { width: 24px; height: 24px; }
    .fc-drop h3 { margin: 0 0 8px; color: var(--fc-text); font-size: 15px; font-weight: 600; }
    .fc-drop p { margin: 0; font-size: 13px; line-height: 1.5; color: var(--fc-text-mute); max-width: 240px; }

    .fc-btn-ghost {
      margin-top: 20px; background: var(--fc-surface-solid); color: var(--fc-text);
      border: 1px solid var(--fc-border); border-radius: 8px; padding: 10px 18px;
      font-size: 13px; font-weight: 500; cursor: pointer;
      display: inline-flex; align-items: center; gap: 8px;
      transition: all 0.15s var(--fc-ease); font-family: inherit;
    }
    .fc-btn-ghost:hover { border-color: var(--fc-text-soft); background: var(--fc-surface-hover); }
    .fc-btn-ghost svg { width: 14px; height: 14px; }

    /* ============================================================
       SAVED ITEMS
       ============================================================ */
    .fc-list { padding: 0 24px 24px; display: flex; flex-direction: column; gap: 12px; }
    .fc-card {
      background: var(--fc-surface-solid); border: 1px solid var(--fc-border);
      border-radius: 12px; overflow: hidden;
      transition: all 0.2s var(--fc-ease); box-shadow: var(--fc-shadow-sm);
    }
    .fc-card:hover {
      border-color: var(--fc-border-hover); transform: translateY(-1px);
      box-shadow: var(--fc-shadow-md);
    }
    .fc-card-thumb {
      width: 100%; aspect-ratio: 16/9; display: block; border: none; object-fit: cover; background: #f4f4f5;
    }
    .fc-card-thumb-fallback {
      width: 100%; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center;
      background: var(--fc-surface-hover); color: var(--fc-text-mute);
    }
    .fc-card-thumb-fallback svg { width: 32px; height: 32px; }
    .fc-card-body { padding: 14px 16px; display: flex; align-items: center; gap: 12px; }
    .fc-badge {
      background: var(--fc-surface-hover); color: var(--fc-text-soft);
      border: 1px solid var(--fc-border);
      border-radius: 6px; padding: 2px 8px; font-size: 10px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.5px; flex-shrink: 0;
    }
    .fc-card-title {
      color: var(--fc-text); font-size: 13px; font-weight: 500;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0;
    }
    .fc-del {
      background: transparent; border: none; color: var(--fc-text-mute); cursor: pointer;
      padding: 6px; border-radius: 6px; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: all 0.15s var(--fc-ease);
    }
    .fc-del svg { width: 14px; height: 14px; }
    .fc-del:hover { color: var(--fc-danger); background: #fef2f2; }

    /* ============================================================
       EMPTY STATE
       ============================================================ */
    .fc-empty {
      flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; padding: 40px 30px; color: var(--fc-text-soft);
    }
    .fc-empty-icon {
      width: 64px; height: 64px; border-radius: 16px; background: var(--fc-surface-hover);
      border: 1px solid var(--fc-border); color: var(--fc-text-mute);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 16px;
    }
    .fc-empty-icon svg { width: 28px; height: 28px; }
    .fc-empty h3 { margin: 0 0 6px; color: var(--fc-text); font-size: 16px; font-weight: 600; }
    .fc-empty p { margin: 0; font-size: 13px; line-height: 1.5; max-width: 260px; }

    /* ============================================================
       TOOLS GRID
       ============================================================ */
    #fc-tools-scroll { flex: 1; overflow-y: auto; min-height: 0; }
    #fc-tools-scroll::-webkit-scrollbar { width: 6px; }
    #fc-tools-scroll::-webkit-scrollbar-thumb { background: transparent; border-radius: 8px; }
    #fc-tools-scroll:hover::-webkit-scrollbar-thumb { background: var(--fc-border-hover); }

    .fc-tools-wrap { padding: 24px; display: flex; flex-direction: column; gap: 12px; }
    .fc-tool {
      background: var(--fc-surface-solid); border: 1px solid var(--fc-border);
      border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 16px;
      transition: all 0.2s var(--fc-ease); box-shadow: var(--fc-shadow-sm);
    }
    .fc-tool:hover {
      border-color: var(--fc-border-hover); box-shadow: var(--fc-shadow-md);
    }
    .fc-tool-chip {
      width: 44px; height: 44px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      border: 1px solid var(--fc-border); background: var(--fc-surface-hover);
      color: var(--fc-text-soft); flex-shrink: 0;
    }
    .fc-tool-chip svg { width: 20px; height: 20px; }
    .fc-tool-info { flex: 1; min-width: 0; }
    .fc-tool-info h3 { margin: 0 0 4px; color: var(--fc-text); font-size: 14px; font-weight: 600; }
    .fc-tool-info p { margin: 0; color: var(--fc-text-mute); font-size: 12.5px; line-height: 1.4; }
    .fc-tool-action {
      border: 1px solid var(--fc-border); border-radius: 8px; padding: 8px 16px;
      background: var(--fc-surface-solid); color: var(--fc-text);
      font-size: 12.5px; font-weight: 500; cursor: pointer; flex-shrink: 0;
      display: inline-flex; align-items: center; gap: 6px;
      transition: all 0.15s var(--fc-ease); font-family: inherit; white-space: nowrap;
    }
    .fc-tool-action:hover:not(:disabled) { border-color: var(--fc-text-soft); background: var(--fc-surface-hover); }
    .fc-tool-action:disabled { opacity: 0.5; cursor: not-allowed; }

    /* ============================================================
       TOOL EXPAND PANELS
       ============================================================ */
    .fc-expand {
      display: none; background: var(--fc-surface-hover); border: 1px solid var(--fc-border);
      border-radius: 12px; padding: 16px; margin: -6px 0 4px;
      animation: fc-expand-in 0.25s var(--fc-ease);
    }
    @keyframes fc-expand-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
    
    .fc-expand-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 12px;
    }
    .fc-expand-title {
      font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--fc-text-soft);
    }
    .fc-expand-close {
      background: transparent; border: none; color: var(--fc-text-mute); cursor: pointer;
      padding: 4px; border-radius: 4px; display: flex; align-items: center; justify-content: center;
      transition: all 0.15s var(--fc-ease);
    }
    .fc-expand-close svg { width: 14px; height: 14px; }
    .fc-expand-close:hover { color: var(--fc-danger); background: #fef2f2; }

    /* Notes Specific */
    #fc-notes-input {
      width: 100%; height: 140px; border: 1px solid var(--fc-border); border-radius: 8px;
      padding: 12px; font-size: 13px; font-family: var(--fc-mono); resize: vertical; outline: none;
      background: var(--fc-surface-solid); color: var(--fc-text); line-height: 1.5;
      transition: border-color 0.2s var(--fc-ease);
    }
    #fc-notes-input:focus { border-color: var(--fc-text-soft); }
    .fc-notes-footer {
      display: flex; justify-content: space-between; align-items: center; margin-top: 12px;
    }
    .fc-save-status { font-size: 11.5px; color: var(--fc-text-mute); display: flex; align-items: center; gap: 6px; font-weight: 500; }
    .fc-save-status.saved { color: var(--fc-success); }
    .fc-save-btn {
      background: var(--fc-accent); color: #fff; border: none; border-radius: 6px;
      padding: 8px 16px; font-size: 12px; font-weight: 500; cursor: pointer;
      display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s var(--fc-ease);
    }
    .fc-save-btn:hover { background: #000; }
    .fc-save-btn svg { width: 14px; height: 14px; }

    /* Results */
    .fc-result { text-align: center; }
    .fc-result img { width: 100%; max-height: 180px; object-fit: contain; border-radius: 8px; border: 1px solid var(--fc-border); display: block; margin-bottom: 12px; background: #f4f4f5; }
    .fc-result-status { margin: 0 0 12px; font-weight: 600; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 6px; }
    .fc-result-status.ok { color: var(--fc-success); }
    .fc-result-status.err { color: var(--fc-danger); }

    .fc-download {
      display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
      padding: 10px 16px; border-radius: 8px; background: var(--fc-accent); color: #fff;
      font-weight: 500; font-size: 12.5px; transition: all 0.15s var(--fc-ease); justify-content: center;
    }
    .fc-download:hover { background: #000; }
    .fc-download svg { width: 14px; height: 14px; }

    /* Color Picker */
    .fc-color-hero { height: 100px; border-radius: 8px; border: 1px solid var(--fc-border); margin-bottom: 12px; }
    .fc-color-row { display: flex; align-items: center; gap: 12px; }
    .fc-color-hex { flex: 1; font-family: var(--fc-mono); font-size: 14px; font-weight: 500; color: var(--fc-text); background: var(--fc-surface-solid); border: 1px solid var(--fc-border); border-radius: 8px; padding: 10px 14px; }

    /* Progress */
    .fc-progress { width: 100%; height: 6px; border-radius: 4px; background: var(--fc-border); overflow: hidden; margin-top: 16px; }
    .fc-progress-bar { height: 100%; background: var(--fc-accent); width: 0%; transition: width 0.25s var(--fc-ease); }
    .fc-progress-label { font-size: 12px; color: var(--fc-text-soft); margin-top: 8px; text-align: center; font-weight: 500; }

    /* ============================================================
       RESIZE GRIP
       ============================================================ */
    #fc-grip {
      position: absolute; bottom: 0; right: 0; width: 24px; height: 24px;
      cursor: nwse-resize; z-index: 5; display: flex; align-items: flex-end; justify-content: flex-end;
      padding: 4px; touch-action: none;
    }
    #fc-grip::before {
      content: ""; width: 8px; height: 8px; border-right: 1.5px solid var(--fc-text-mute);
      border-bottom: 1.5px solid var(--fc-text-mute); border-radius: 0 0 3px 0;
      transition: border-color 0.2s;
    }
    #fc-grip:hover::before { border-color: var(--fc-accent); }

    /* ============================================================
       SCREENSHOT OVERLAY
       ============================================================ */
    #fc-shot-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(2px); z-index: 2147483647; cursor: crosshair; user-select: none; }
    #fc-shot-box {
      position: absolute; border: 1.5px solid #fff; background: rgba(255,255,255,0.1); display: none;
      box-shadow: 0 0 0 9999px rgba(0,0,0,0.4);
    }

    /* ============================================================
       DROP HINT
       ============================================================ */
    #fc-drop-hint {
      position: fixed; inset: 0; background: rgba(0,0,0,0.1); border: 3px dashed var(--fc-text);
      z-index: 2147483647; display: flex; align-items: center; justify-content: center;
      pointer-events: none; animation: fc-fade-in 0.2s var(--fc-ease);
    }
    @keyframes fc-fade-in { from { opacity: 0; } to { opacity: 1; } }
    #fc-drop-hint-inner {
      background: var(--fc-surface-solid); color: var(--fc-text); padding: 16px 28px; border-radius: 12px;
      font-size: 15px; font-weight: 600; border: 1px solid var(--fc-border); box-shadow: var(--fc-shadow-lg);
      display: flex; align-items: center; gap: 12px;
    }
    #fc-drop-hint-inner svg { width: 20px; height: 20px; }

    /* ============================================================
       SAVE DIALOG
       ============================================================ */
    #fc-save {
      position: absolute; inset: 0; background: rgba(0,0,0,0.3); backdrop-filter: blur(4px);
      z-index: 100; display: flex; align-items: center; justify-content: center;
      animation: fc-fade-in 0.2s var(--fc-ease);
    }
    .fc-save-card {
      background: var(--fc-surface-solid); border: 1px solid var(--fc-border); border-radius: 16px;
      padding: 24px; width: 85%; max-width: 320px; text-align: center;
      box-shadow: var(--fc-shadow-lg); animation: fc-in 0.3s var(--fc-spring);
    }
    .fc-save-card h3 { margin: 0 0 10px; font-size: 15px; color: var(--fc-text); font-weight: 600; }
    #fc-save-url { margin: 0 0 20px; font-size: 12px; color: var(--fc-text-mute); word-break: break-all; line-height: 1.5; }
    .fc-save-actions { display: flex; flex-direction: column; gap: 10px; }
    .fc-save-opt {
      padding: 12px 16px; border: 1px solid var(--fc-border); border-radius: 8px;
      background: var(--fc-surface-solid); color: var(--fc-text);
      font-size: 13px; font-weight: 500; cursor: pointer; font-family: inherit;
      display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.15s var(--fc-ease);
    }
    .fc-save-opt svg { width: 16px; height: 16px; }
    .fc-save-opt:hover { border-color: var(--fc-text-soft); background: var(--fc-surface-hover); }
    .fc-save-opt.primary { background: var(--fc-accent); border-color: transparent; color: #fff; }
    .fc-save-opt.primary:hover { background: #000; }
    .fc-save-cancel { background: transparent; border: none; color: var(--fc-text-mute); font-size: 12.5px; font-weight: 500; cursor: pointer; margin-top: 8px; padding: 8px; font-family: inherit; transition: color 0.15s; }
    .fc-save-cancel:hover { color: var(--fc-text); }

    /* ============================================================
       TOAST
       ============================================================ */
    .fc-toast {
      position: fixed; bottom: 96px; left: 50%; transform: translateX(-50%);
      background: var(--fc-text); color: #fff; padding: 12px 20px; border-radius: 10px;
      font-size: 13px; font-weight: 500; box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      z-index: 2147483647; display: flex; align-items: center; gap: 10px; max-width: calc(100vw - 40px);
      pointer-events: none; animation: fc-toast-in 0.3s var(--fc-spring);
    }
    .fc-toast-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--fc-bg); flex-shrink: 0; }
    @keyframes fc-toast-in { from { opacity: 0; transform: translateX(-50%) translateY(16px) scale(0.95); } to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); } }
    .fc-toast.out { animation: fc-toast-out 0.25s var(--fc-ease) forwards; }
    @keyframes fc-toast-out { to { opacity: 0; transform: translateX(-50%) translateY(12px) scale(0.96); } }

    @media (max-width: 520px) {
      #fc-panel { max-width: calc(100vw - 12px) !important; border-radius: 12px; }
      .fc-tab-btn { padding: 10px 4px; font-size: 11px; }
      .fc-tab-btn svg { display: none; }
    }
  `;
  shadow.appendChild(style);

  // ============================================================
  // HTML
  // ============================================================
  const el = document.createElement("div");
  el.innerHTML = `
    <button id="fc-fab" type="button" title="Chat Everywhere">
      ${I.logo}
    </button>

    <div id="fc-panel" style="display:none;">
      <div id="fc-header" title="Drag to move · Double-click to reset">
        <div id="fc-brand">
          <div id="fc-brand-mark">${I.logo}</div>
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

      <div id="fc-tabs">
        <button class="fc-tab-btn active" data-tab="chats">${I.chat} Chat</button>
        <button class="fc-tab-btn" data-tab="media">${I.media} Media</button>
        <button class="fc-tab-btn" data-tab="groups">${I.groups} Groups</button>
        <button class="fc-tab-btn" data-tab="shares">${I.shares} Share</button>
        <button class="fc-tab-btn" data-tab="tools">${I.tools} Tools</button>
      </div>

      <div id="fc-content">
        <!-- CHATS -->
        <div id="fc-chats" class="fc-panel active">
          <div id="fc-messages"></div>
          <div id="fc-composer">
            <div id="fc-composer-inner">
              <textarea id="fc-input" rows="1" placeholder="Type a message..."></textarea>
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
                  <p>Drag a rectangle on the page to crop.</p>
                </div>
                <button id="fc-snippet-btn" class="fc-tool-action">Capture</button>
              </div>
              <div id="fc-snippet-result" class="fc-expand fc-result">
                <div class="fc-expand-header">
                  <span class="fc-expand-title">Snippet Result</span>
                  <button class="fc-expand-close" data-close="fc-snippet-result">${I.close}</button>
                </div>
                <div id="fc-snippet-body"></div>
              </div>

              <div class="fc-tool">
                <div class="fc-tool-chip">${I.notes}</div>
                <div class="fc-tool-info">
                  <h3>Notes</h3>
                  <p>Scratchpad auto-saved per site.</p>
                </div>
                <button id="fc-notes-btn" class="fc-tool-action">Open</button>
              </div>
              <div id="fc-notes-area" class="fc-expand">
                <div class="fc-expand-header">
                  <span class="fc-expand-title">Notes</span>
                  <button class="fc-expand-close" id="fc-notes-close">${I.close}</button>
                </div>
                <textarea id="fc-notes-input" placeholder="Type your notes here..."></textarea>
                <div class="fc-notes-footer">
                  <span class="fc-save-status" id="fc-notes-status"><span class="fc-dot"></span><span id="fc-notes-status-text">Saved</span></span>
                  <button class="fc-save-btn" id="fc-notes-save">${I.notes} Save</button>
                </div>
              </div>

              <div class="fc-tool">
                <div class="fc-tool-chip">${I.color}</div>
                <div class="fc-tool-info">
                  <h3>Color Picker</h3>
                  <p>Sample any color on the page.</p>
                </div>
                <button id="fc-color-btn" class="fc-tool-action">Pick</button>
              </div>
              <div id="fc-color-result" class="fc-expand">
                <div class="fc-expand-header">
                  <span class="fc-expand-title">Picked Color</span>
                  <button class="fc-expand-close" data-close="fc-color-result">${I.close}</button>
                </div>
                <div id="fc-color-body"></div>
              </div>

              <div class="fc-tool">
                <div class="fc-tool-chip">${I.camera}</div>
                <div class="fc-tool-info">
                  <h3>Full Page Shot</h3>
                  <p>Scrolls and stitches the entire page.</p>
                </div>
                <button id="fc-fullshot-btn" class="fc-tool-action">Capture</button>
              </div>
              <div id="fc-fullshot-result" class="fc-expand fc-result">
                <div class="fc-expand-header">
                  <span class="fc-expand-title">Full Page Result</span>
                  <button class="fc-expand-close" data-close="fc-fullshot-result">${I.close}</button>
                </div>
                <div id="fc-fullshot-body"></div>
              </div>

              <!-- REPLACED: Highlight Text tool -->
              <div class="fc-tool">
                <div class="fc-tool-chip">${I.highlight}</div>
                <div class="fc-tool-info">
                  <h3>Highlight Text</h3>
                  <p>Wrap selected text on the page in bright yellow.</p>
                </div>
                <button id="fc-highlight-btn" class="fc-tool-action">Apply</button>
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
  const railBtns = shadow.querySelectorAll(".fc-tab-btn");
  const panelEls = shadow.querySelectorAll(".fc-panel");
  const pasteBtns = shadow.querySelectorAll(".fc-paste");

  const snippetBtn = $("#fc-snippet-btn");
  const snippetResult = $("#fc-snippet-result");
  
  const notesBtn = $("#fc-notes-btn");
  const notesArea = $("#fc-notes-area");
  const notesInput = $("#fc-notes-input");
  const notesCloseBtn = $("#fc-notes-close");
  const notesSaveBtn = $("#fc-notes-save");
  const notesStatus = $("#fc-notes-status");
  const notesStatusText = $("#fc-notes-status-text");

  const colorBtn = $("#fc-color-btn");
  const colorResult = $("#fc-color-result");
  const fullshotBtn = $("#fc-fullshot-btn");
  const fullshotResult = $("#fc-fullshot-result");
  
  // New highlight ref
  const highlightBtn = $("#fc-highlight-btn");

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

  const DEFAULT_SIZE = { width: 500, height: 600 };
  const MIN_W = 400, MIN_H = 450;

  // ============================================================
  // HELPERS
  // ============================================================
  const vp = () => ({
    w: window.innerWidth || document.documentElement.clientWidth,
    h: window.innerHeight || document.documentElement.clientHeight,
  });
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const host = () => {
    try { return new URL(location.href).hostname.replace("www.", ""); }
    catch { return location.href; }
  };
  const fmtTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ============================================================
  // STATE PERSISTENCE
  // ============================================================
  function saveState() {
    const r = panel.getBoundingClientRect();
    const f = fab.getBoundingClientRect();
    try {
      localStorage.setItem("fc_state_v6", JSON.stringify({
        left: r.left, top: r.top, width: r.width, height: r.height,
        fabLeft: f.left, fabTop: f.top,
      }));
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
        left: left + "px", top: top + "px", right: "auto", bottom: "auto",
        width: width + "px", height: height + "px",
      });
    }
    if (s.fabLeft != null && s.fabTop != null) {
      Object.assign(fab.style, {
        left: s.fabLeft + "px", top: s.fabTop + "px", right: "auto", bottom: "auto",
      });
    }
  }
  function loadState() {
    try { applyState(JSON.parse(localStorage.getItem("fc_state_v6") || "null")); } catch (e) {}
  }
  function resetState() {
    Object.assign(panel.style, {
      left: "", top: "100px", right: "24px", bottom: "auto",
      width: DEFAULT_SIZE.width + "px", height: DEFAULT_SIZE.height + "px",
    });
    Object.assign(fab.style, { left: "", top: "", right: "24px", bottom: "24px" });
    try { localStorage.removeItem("fc_state_v6"); } catch (e) {}
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
    }, 2200);
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
        width: width + "px", height: height + "px",
        left: clamp(r.left, 0, w - width) + "px",
        top: clamp(r.top, 0, h - height) + "px",
        right: "auto", bottom: "auto",
      });
    }
    setTimeout(() => input.focus(), 120);
  }
  function closePanel() {
    isOpen = false;
    panel.style.display = "none";
  }

  // ============================================================
  // DRAGGABLE & RESIZABLE
  // ============================================================
  function makeDraggable(target, handle, onEnd) {
    let down = false, sx = 0, sy = 0, sl = 0, st = 0;
    function start(cx, cy) {
      const r = target.getBoundingClientRect();
      Object.assign(target.style, { left: r.left + "px", top: r.top + "px", right: "auto", bottom: "auto" });
      sl = r.left; st = r.top; sx = cx; sy = cy; down = true;
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
      down = false; target.classList.remove("fc-dragging");
      document.removeEventListener("mousemove", mm, true);
      document.removeEventListener("mouseup", mu, true);
      document.removeEventListener("touchmove", tm, true);
      document.removeEventListener("touchend", te, true);
      if (onEnd) onEnd();
    }
    function mm(e) { move(e.clientX, e.clientY); }
    function mu() { end(); }
    function tm(e) { if (!down) return; e.preventDefault(); const t = e.touches[0]; move(t.clientX, t.clientY); }
    function te() { end(); }

    handle.addEventListener("mousedown", (e) => {
      if (e.target.closest("button, input, textarea, a")) return;
      e.preventDefault(); start(e.clientX, e.clientY);
      document.addEventListener("mousemove", mm, true);
      document.addEventListener("mouseup", mu, true);
    });
    handle.addEventListener("touchstart", (e) => {
      if (e.target.closest("button, input, textarea, a")) return;
      const t = e.touches[0]; start(t.clientX, t.clientY);
      document.addEventListener("touchmove", tm, { capture: true, passive: false });
      document.addEventListener("touchend", te, true);
    }, { passive: true });
  }

  makeDraggable(panel, headerEl, saveState);
  makeDraggable(fab, fab, saveState);

  let fabMoved = false;
  fab.addEventListener("mousedown", () => { fabMoved = false; });
  fab.addEventListener("mousemove", () => { fabMoved = true; });
  fab.addEventListener("touchstart", () => { fabMoved = false; }, { passive: true });
  fab.addEventListener("touchmove", () => { fabMoved = true; }, { passive: true });
  fab.addEventListener("click", (e) => {
    if (fabMoved) { e.preventDefault(); e.stopPropagation(); fabMoved = false; return; }
    isOpen ? closePanel() : openPanel();
  });

  (function makeResizable() {
    let on = false, sx = 0, sy = 0, sw = 0, sh = 0, sl = 0, st = 0;
    function start(cx, cy) {
      const r = panel.getBoundingClientRect();
      Object.assign(panel.style, {
        left: r.left + "px", top: r.top + "px", right: "auto", bottom: "auto",
        width: r.width + "px", height: r.height + "px",
      });
      sx = cx; sy = cy; sw = r.width; sh = r.height; sl = r.left; st = r.top; on = true;
      panel.classList.add("fc-resizing");
    }
    function move(cx, cy) {
      if (!on) return;
      const { w, h } = vp();
      panel.style.width = clamp(sw + (cx - sx), MIN_W, w - sl - 4) + "px";
      panel.style.height = clamp(sh + (cy - sy), MIN_H, h - st - 4) + "px";
    }
    function end() {
      if (!on) return; on = false; panel.classList.remove("fc-resizing");
      document.removeEventListener("mousemove", mm, true);
      document.removeEventListener("mouseup", mu, true);
      document.removeEventListener("touchmove", tm, true);
      document.removeEventListener("touchend", te, true);
      saveState();
    }
    function mm(e) { move(e.clientX, e.clientY); }
    function mu() { end(); }
    function tm(e) { if (!on) return; e.preventDefault(); const t = e.touches[0]; move(t.clientX, t.clientY); }
    function te() { end(); }

    grip.addEventListener("mousedown", (e) => {
      e.preventDefault(); e.stopPropagation(); start(e.clientX, e.clientY);
      document.addEventListener("mousemove", mm, true);
      document.addEventListener("mouseup", mu, true);
    });
    grip.addEventListener("touchstart", (e) => {
      e.preventDefault(); e.stopPropagation(); const t = e.touches[0]; start(t.clientX, t.clientY);
      document.addEventListener("touchmove", tm, { capture: true, passive: false });
      document.addEventListener("touchend", te, true);
    }, { passive: false });
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
    if (r.left + nw > w) { panel.style.left = clamp(r.left, 0, w - nw) + "px"; panel.style.right = "auto"; }
    if (r.top + nh > h) { panel.style.top = clamp(r.top, 0, h - nh) + "px"; panel.style.bottom = "auto"; }
    panel.style.width = nw + "px"; panel.style.height = nh + "px";
  });

  // ============================================================
  // CHAT
  // ============================================================
  function pushMsg(text, who) {
    const wrap = document.createElement("div");
    wrap.className = `fc-msg ${who}`;
    const b = document.createElement("div");
    b.className = "fc-bubble"; b.textContent = text;
    const m = document.createElement("div");
    m.className = "fc-meta";
    m.textContent = (who === "user" ? "You · " : "Bot · ") + fmtTime();
    wrap.appendChild(b); wrap.appendChild(m); messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }
  function send() {
    const text = input.value.trim();
    if (!text) return;
    pushMsg(text, "user");
    input.value = ""; autoGrow();
    setTimeout(() => pushMsg("Thanks! I'm a demo bot 👋", "bot"), 380);
  }
  function autoGrow() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 120) + "px";
  }
  input.addEventListener("input", autoGrow);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  });
  sendBtn.addEventListener("click", send);
  closeBtn.addEventListener("click", (e) => { e.stopPropagation(); closePanel(); });

  // ============================================================
  // TABS
  // ============================================================
  railBtns.forEach((b) => {
    b.addEventListener("click", () => {
      currentTab = b.dataset.tab;
      railBtns.forEach((x) => x.classList.toggle("active", x === b));
      panelEls.forEach((p) => p.classList.toggle("active", p.id === "fc-" + currentTab));
    });
  });

  // ============================================================
  // MEDIA HELPERS (Fixed CSP issue)
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
      return { thumb: v ? `https://img.youtube.com/vi/${v}/hqdefault.jpg` : "", embed: v ? `https://www.youtube.com/embed/${v}` : url };
    }
    if (type === "vimeo") {
      const m = url.match(/vimeo\.com\/(\d+)/);
      const v = m ? m[1] : "";
      return { thumb: "", embed: v ? `https://player.vimeo.com/video/${v}` : url };
    }
    if (type === "image") return { thumb: url, embed: url };
    return { thumb: "", embed: url };
  }
  function saveItems() {
    try {
      localStorage.setItem("fc_media_v6", JSON.stringify(Array.from(mediaList.children).map((x) => JSON.parse(x.dataset.item))));
      localStorage.setItem("fc_shares_v6", JSON.stringify(Array.from(sharesList.children).map((x) => JSON.parse(x.dataset.item))));
    } catch (e) {}
  }
  function loadItems() {
    try {
      JSON.parse(localStorage.getItem("fc_media_v6") || "[]").forEach((i) => renderCard(i, "media"));
      JSON.parse(localStorage.getItem("fc_shares_v6") || "[]").forEach((i) => renderCard(i, "shares"));
    } catch (e) {}
  }
  function renderCard(item, target) {
    const list = target === "media" ? mediaList : sharesList;
    const key = JSON.stringify(item);
    if (Array.from(list.children).some((c) => c.dataset.item === key)) return;

    const card = document.createElement("div");
    card.className = "fc-card"; card.dataset.item = key;

    const label = item.type === "youtube" ? "YouTube" : item.type === "vimeo" ? "Vimeo" : item.type === "image" ? "Image" : item.type === "video-file" ? "Video" : "Link";
    
    // Safely create the anchor to bypass CSP
    const anchor = document.createElement("a");
    anchor.href = item.url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.style.textDecoration = "none";
    anchor.style.display = "block";

    if (item.thumb) {
      const img = document.createElement("img");
      img.className = "fc-card-thumb";
      img.src = item.thumb;
      img.alt = "";
      img.addEventListener("error", () => {
        const fallback = document.createElement("div");
        fallback.className = "fc-card-thumb-fallback";
        fallback.innerHTML = I.image;
        img.replaceWith(fallback);
      });
      anchor.appendChild(img);
    } else {
      const ic = item.type === "video-file" ? I.media : item.type === "youtube" ? I.media : I.link;
      anchor.innerHTML = `<div class="fc-card-thumb-fallback">${ic}</div>`;
    }

    const body = document.createElement("div");
    body.className = "fc-card-body";
    body.innerHTML = `
      <span class="fc-badge">${label}</span>
      <span class="fc-card-title" title="${item.title}">${item.title}</span>
      <button class="fc-del" title="Remove">${I.trash}</button>
    `;

    card.appendChild(anchor);
    card.appendChild(body);

    body.querySelector(".fc-del").addEventListener("click", (e) => {
      e.preventDefault(); e.stopPropagation();
      card.remove(); saveItems(); toast("Removed");
    });
    list.appendChild(card);
  }
  function addItem(item, target) {
    renderCard(item, target); saveItems();
    railBtns.forEach((b) => { if (b.dataset.tab === target) b.click(); });
    toast(`Saved to ${target}`);
  }

  // ============================================================
  // SAVE DIALOG
  // ============================================================
  function showSave(item) {
    if (!isOpen) openPanel();
    pendingMedia = item;
    saveUrl.textContent = item.title.length > 60 ? item.title.slice(0, 60) + "…" : item.title;
    saveDlg.style.display = "flex";
  }
  function hideSave() { pendingMedia = null; saveDlg.style.display = "none"; }
  saveToMedia.addEventListener("click", () => { if (pendingMedia) addItem(pendingMedia, "media"); hideSave(); });
  saveToShares.addEventListener("click", () => { if (pendingMedia) addItem(pendingMedia, "shares"); hideSave(); });
  saveCancel.addEventListener("click", hideSave);

  // ============================================================
  // PASTE FROM CLIPBOARD
  // ============================================================
  pasteBtns.forEach((b) => {
    b.addEventListener("click", async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (!text || (!text.startsWith("http") && !text.startsWith("www"))) {
          toast("No valid link in clipboard"); return;
        }
        const url = text.startsWith("www") ? "https://" + text : text;
        const type = detectType(url);
        const { thumb, embed } = embedInfo(url, type);
        addItem({ url: embed || url, title: host(), type, thumb }, b.dataset.target);
      } catch { toast("Allow clipboard access"); }
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
    shadow.appendChild(h); dropActive = true;
  }
  function hideHint() {
    const h = shadow.querySelector("#fc-drop-hint");
    if (h) h.remove(); dropActive = false;
  }
  
  document.addEventListener("dragenter", (e) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    if (dt && (dt.types.includes("text/uri-list") || dt.types.includes("text/plain") || dt.types.includes("text/html") || dt.types.includes("Files"))) showHint();
  }, true);
  document.addEventListener("dragover", (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "copy"; showHint(); }, true);
  document.addEventListener("dragleave", (e) => { if (!e.relatedTarget) hideHint(); }, true);

  document.addEventListener("drop", (e) => {
    e.preventDefault(); hideHint();

    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const r = new FileReader();
        r.onload = (ev) => addItem({ url: ev.target.result, title: file.name, type: "image", thumb: ev.target.result }, currentTab === "shares" ? "shares" : "media");
        r.readAsDataURL(file); return;
      }
      if (file.type.startsWith("video/")) {
        addItem({ url: URL.createObjectURL(file), title: file.name, type: "video-file", thumb: "" }, currentTab === "shares" ? "shares" : "media");
        return;
      }
    }

    let url = "", html = "";
    try { url = e.dataTransfer.getData("text/uri-list"); } catch {}
    try { if (!url) url = e.dataTransfer.getData("text/plain"); } catch {}
    try { if (!url) url = e.dataTransfer.getData("URL"); } catch {}
    try { html = e.dataTransfer.getData("text/html"); } catch {}
    if (!url && html) { const m = html.match(/href="([^"]+)"/); if (m) url = m[1]; }

    let type = "", thumb = "", title = "";
    let node = e.target, d = 0;
    while (node && d < 6) {
      if (node.tagName === "A" && node.href && !url) { url = node.href; title = node.textContent?.trim() || ""; }
      if (node.tagName === "IMG" && node.src) {
        if (!url || !/youtube|video|watch|vimeo/.test(url)) { url = node.src; type = "image"; thumb = node.src; title = node.alt || node.title || "Image"; }
      }
      if (node.tagName === "VIDEO") {
        const poster = node.poster || "", src = node.currentSrc || node.src || "";
        if (src) { url = src; type = "video-file"; thumb = poster; title = node.title || "Video"; }
      }
      node = node.parentElement; d++;
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
  }, true);

  // ============================================================
  // CONTEXT MENU
  // ============================================================
  try {
    if (chrome.runtime?.id) {
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
    }
  } catch (e) {}

  // ============================================================
  // TOOLS
  // ============================================================
  function safeExtMessage(msg, cb) {
    if (!chrome.runtime?.id) { toast("Refresh page to use tools"); return; }
    chrome.runtime.sendMessage(msg, cb);
  }

  shadow.querySelectorAll(".fc-expand-close[data-close]").forEach(b => {
    b.addEventListener("click", () => {
      const target = shadow.getElementById(b.dataset.close);
      if (target) target.style.display = "none";
      if (b.dataset.close === "fc-snippet-result") snippetBtn.textContent = "Capture";
      if (b.dataset.close === "fc-color-result") colorBtn.textContent = "Pick";
      if (b.dataset.close === "fc-fullshot-result") fullshotBtn.textContent = "Capture";
    });
  });

  // 1. Snippet
  snippetBtn.addEventListener("click", () => {
    if (!chrome.runtime?.id) { toast("Refresh page to use tools"); return; }
    snippetBtn.textContent = "Working…"; snippetBtn.disabled = true;
    shadow.querySelector("#fc-snippet-body").innerHTML = "";
    
    safeExtMessage({ action: "takeScreenshot" }, (resp) => {
      snippetBtn.textContent = "Capture"; snippetBtn.disabled = false;
      if (chrome.runtime.lastError || !resp || !resp.success) {
        shadow.querySelector("#fc-snippet-body").innerHTML = `<p class="fc-result-status err">Screenshot failed</p>`;
        snippetResult.style.display = "block"; return;
      }
      const ov = document.createElement("div"); ov.id = "fc-shot-overlay"; shadow.appendChild(ov);
      const box = document.createElement("div"); box.id = "fc-shot-box"; ov.appendChild(box);

      let sx, sy, drawing = false;
      ov.addEventListener("mousedown", (e) => {
        drawing = true; sx = e.clientX; sy = e.clientY;
        Object.assign(box.style, { left: sx + "px", top: sy + "px", width: "0px", height: "0px", display: "block" });
      });
      ov.addEventListener("mousemove", (e) => {
        if (!drawing) return;
        const w = Math.abs(e.clientX - sx), h = Math.abs(e.clientY - sy);
        Object.assign(box.style, { left: Math.min(e.clientX, sx) + "px", top: Math.min(e.clientY, sy) + "px", width: w + "px", height: h + "px" });
      });
      ov.addEventListener("mouseup", (e) => {
        if (!drawing) return; drawing = false;
        const w = Math.abs(e.clientX - sx), h = Math.abs(e.clientY - sy);
        const left = Math.min(e.clientX, sx), top = Math.min(e.clientY, sy);
        ov.remove(); if (w < 10 || h < 10) return;
        
        const img = new Image(); img.src = resp.image;
        img.onload = () => {
          const cv = document.createElement("canvas"); const ctx = cv.getContext("2d");
          const dpr = window.devicePixelRatio || 1;
          cv.width = w * dpr; cv.height = h * dpr;
          ctx.drawImage(img, left * dpr, top * dpr, w * dpr, h * dpr, 0, 0, w * dpr, h * dpr);
          const url = cv.toDataURL("image/png");
          shadow.querySelector("#fc-snippet-body").innerHTML = `
            <p class="fc-result-status ok">Snippet captured</p>
            <img src="${url}" />
            <a class="fc-download" href="${url}" download="snippet-${Date.now()}.png">${I.download} Download</a>
          `;
          snippetResult.style.display = "block"; toast("Snippet captured");
        };
      });
      toast("Drag to select area");
    });
  });

  // 2. Notes
  function setNotesStatus(isSaved) {
    notesStatus.classList.toggle("saved", isSaved);
    notesStatusText.textContent = isSaved ? "Saved" : "Unsaved changes";
  }
  notesBtn.addEventListener("click", () => {
    const open = notesArea.style.display === "block";
    notesArea.style.display = open ? "none" : "block";
    notesBtn.textContent = open ? "Open" : "Close";
    if (!open) {
      notesInput.value = localStorage.getItem("fc_note_" + host()) || "";
      setNotesStatus(true); notesInput.focus();
    }
  });
  notesInput.addEventListener("input", () => setNotesStatus(false));
  notesSaveBtn.addEventListener("click", () => {
    localStorage.setItem("fc_note_" + host(), notesInput.value);
    setNotesStatus(true); toast("Notes saved");
  });
  notesCloseBtn.addEventListener("click", () => {
    notesArea.style.display = "none"; notesBtn.textContent = "Open";
  });

  // 3. Color Picker
  colorBtn.addEventListener("click", async () => {
    if (!window.EyeDropper) { toast("Not supported in this browser"); return; }
    try {
      const dropper = new window.EyeDropper();
      const r = await dropper.open();
      const hex = r.sRGBHex;
      const cbody = shadow.querySelector("#fc-color-body");
      cbody.innerHTML = `
        <div class="fc-color-hero" style="background:${hex};"></div>
        <div class="fc-color-row">
          <div class="fc-color-hex">${hex}</div>
          <button class="fc-download" id="fc-copy-color">${I.copy} Copy</button>
        </div>
      `;
      colorResult.style.display = "block";
      const copyBtn = cbody.querySelector("#fc-copy-color");
      copyBtn.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(hex); toast("Copied " + hex); } catch { toast("Copy failed"); }
      });
      try { await navigator.clipboard.writeText(hex); toast("Picked " + hex); } catch {}
    } catch {}
  });

  // 4. Full page shot
  fullshotBtn.addEventListener("click", async () => {
    if (!chrome.runtime?.id) { toast("Refresh page to use tools"); return; }
    fullshotBtn.disabled = true; fullshotBtn.textContent = "Working…";
    const fbody = shadow.querySelector("#fc-fullshot-body");
    fbody.innerHTML = `
      <div class="fc-progress"><div class="fc-progress-bar" id="fc-fs-bar"></div></div>
      <div class="fc-progress-label" id="fc-fs-label">Starting…</div>
    `;
    fullshotResult.style.display = "block";
    const bar = shadow.querySelector("#fc-fs-bar");
    const label = shadow.querySelector("#fc-fs-label");
    
    try {
      const orig = { x: window.scrollX, y: window.scrollY };
      const total = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      const vh = window.innerHeight, vw = window.innerWidth, dpr = window.devicePixelRatio || 1;
      const cv = document.createElement("canvas");
      cv.width = vw * dpr; cv.height = total * dpr;
      const ctx = cv.getContext("2d"); const count = Math.ceil(total / vh);

      for (let i = 0; i < count; i++) {
        const y = i * vh; window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 220));
        const resp = await new Promise((res) => safeExtMessage({ action: "takeScreenshot" }, res));
        if (!resp || !resp.success) throw new Error("capture failed");
        await new Promise((resolve) => {
          const im = new Image();
          im.onload = () => {
            const maxH = Math.min(im.height, (total - y) * dpr);
            ctx.drawImage(im, 0, 0, im.width, maxH, 0, y * dpr, im.width, maxH); resolve();
          };
          im.onerror = resolve; im.src = resp.image;
        });
        const pct = Math.round(((i + 1) / count) * 100);
        if (bar) bar.style.width = pct + "%";
        if (label) label.textContent = `Captured ${i + 1} / ${count} (${pct}%)`;
      }
      window.scrollTo(orig.x, orig.y);
      const url = cv.toDataURL("image/png");
      fbody.innerHTML = `
        <p class="fc-result-status ok">Full page captured</p>
        <img src="${url}" style="max-height:150px;object-fit:cover;" />
        <a class="fc-download" href="${url}" download="fullpage-${Date.now()}.png">${I.download} Download</a>
      `;
      toast("Full page captured");
    } catch (err) {
      fbody.innerHTML = `<p class="fc-result-status err">Failed: ${err.message}</p>`;
    } finally {
      fullshotBtn.disabled = false; fullshotBtn.textContent = "Capture";
    }
  });

  // 5. Highlight Text (Replaced Markdown)
  highlightBtn.addEventListener("click", () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.toString().trim() === "") {
      toast("Please select some text on the page first");
      return;
    }
    try {
      const range = sel.getRangeAt(0);
      // Keep it simple: wrap the range
      const mark = document.createElement("mark");
      mark.style.backgroundColor = "#fef08a";
      mark.style.color = "#000";
      mark.style.borderRadius = "2px";
      mark.style.padding = "0 2px";
      range.surroundContents(mark);
      sel.removeAllRanges();
      toast("Text highlighted");
    } catch (e) {
      toast("Cannot highlight across multiple blocks");
    }
  });

  // ============================================================
  // INIT
  // ============================================================
  loadState();
  loadItems();
  pushMsg("Hey!", "bot");
})();