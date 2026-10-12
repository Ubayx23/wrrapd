export const INTRO_KEY = "wrrapd.untangled";
export const REPLAY_EVENT = "wrrapd:untangle";

/** Runs before first paint so returning visitors never see the intro flash. */
export const introGateScript = `(function(){var r=document.documentElement;try{if(!localStorage.getItem("${INTRO_KEY}"))r.setAttribute("data-intro","")}catch(e){r.setAttribute("data-intro","")}})();`;
