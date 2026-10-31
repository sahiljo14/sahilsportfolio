// Strict status vocabulary: a project's state never blurs between these.
export type State =
  | "Alpha, not publicly released"
  | "In use internally"
  | "Public release"
  | "Public code"
  | "In progress"
  | "Closed testing on Google Play";

export type Figure = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type Video = {
  id: string;
  url: string;
  title: string;
  poster: string;
  note: string;
  moments: { at: string; title: string; text: string }[];
};

export type Project = {
  slug: string;
  name: string;
  dek: string;
  state: State;
  role: string;
  stack: string[];
  links: { label: string; url: string }[];
  origin: string[];
  pipeline: { label: string; note: string }[];
  figures: Figure[];
  video?: Video;
  decisions: { title: string; text: string }[];
  evidence?: string;
  unfinished: string;
  learned: string;
};

export const projects: Project[] = [
  {
    slug: "agent-orchestrator",
    name: "Agent Orchestrator",
    dek: "One conversation, several AI coding agents, and a person who stays in charge.",
    state: "Alpha, not publicly released",
    role: "I started it in July 2026 and have written most of its commits since. I designed the orchestration layer and wrote all of its architecture decision records. Two collaborators joined in September and October.",
    stack: ["Electron", "React", "TypeScript", "SQLite", "xterm.js", "Git worktrees"],
    links: [],
    origin: [
      "While planning a software agency, I wanted to run several AI coding agents on one project at once: split a goal into pieces, let different agents work in parallel, and keep control of what actually changed. I looked for a tool that worked the way I had in mind and couldn’t find one. So I started building it for myself.",
      "As I worked on it, it became obvious the problem wasn’t specific to my agency. Anyone running more than one coding agent ends up as a human scheduler, juggling terminals, branches and the question of whether anything actually worked. That changed how I thought about it. It stopped being an internal tool and became a product.",
      "The project started from an existing open-source desktop app that already handled terminals and a canvas. My work is the orchestration system built on top of it, and the product it has turned into.",
    ],
    pipeline: [
      { label: "Conversation", note: "You describe the goal once." },
      { label: "Planner", note: "Splits it into tasks and dependencies." },
      { label: "Your approval", note: "Nothing runs until you approve or revise." },
      { label: "Scheduler", note: "Starts each task when what it waits for is done." },
      { label: "Agents", note: "Claude Code, Codex, OpenCode, Antigravity, each in its own worktree and real terminal." },
      { label: "Evidence", note: "Results reach the SQLite event log only with proof." },
    ],
    figures: [
      {
        src: "/images/ao-agents.webp",
        width: 1800,
        height: 600,
        alt: "Agent Orchestrator running one request as five tasks. The agents panel lists Claude Code, Codex, Antigravity and Kimi Code working, and one task waiting.",
        caption:
          "Real capture. One request split into five tasks, four running in parallel on four different coding agents. Demo build of 30 October 2026, sample project, scripted agents, cropped.",
      },
      {
        src: "/images/ao-needs-you.webp",
        width: 760,
        height: 1073,
        alt: "The Agents panel sorted by what needs a person: Claude Code waiting on a question, a plan change waiting for review, one task that went wrong with exit code 1, and OpenCode still working.",
        caption:
          "Real capture. The Agents panel puts what needs you first: a question from Claude Code, a plan change to review, a failure with its exit code. Demo build of 30 October 2026, scripted agents, cropped to the panel.",
      },
      {
        src: "/images/ao-plan.webp",
        width: 1400,
        height: 453,
        alt: "A two-part plan waiting for approval: sign-in assigned to Claude Code and orders assigned to Codex, with the note “Nothing starts until you press Start” and buttons to start, review or discard.",
        caption:
          "Real capture. A plan waiting for approval, with each part assigned to a different agent. Nothing starts until you press Start. Demo build of 30 October 2026, sample project, cropped to the plan.",
      },
    ],
    decisions: [
      {
        title: "Nothing runs before you’ve seen the plan.",
        text: "Every request becomes a plan first. You approve it, change it by replying, or throw it away; only an approved plan reaches the scheduler. Coding agents run fast and unsandboxed with your permissions, so the cheapest place to catch a bad idea is before it starts.",
      },
      {
        title: "One agent, one worktree.",
        text: "Two agents writing in the same folder don’t cause a merge conflict. They silently overwrite each other. So each task gets its own git worktree, held through a lease in SQLite with a time limit, and a unique index guarantees one holder at a time. A crashed process can’t lock a worktree forever.",
      },
      {
        title: "“Done” needs evidence.",
        text: "An agent saying it finished proves nothing. Signals are ranked: a process exit, a verification command or a real git change can mark a task as succeeded; transcript messages and file activity cannot; output going quiet is only a hint. The interface follows one rule: never claim something there is no evidence for.",
      },
      {
        title: "Be honest about what’s enforced.",
        text: "Coding CLIs disagree wildly about permissions. Codex has real sandbox modes, Claude Code has a single switch, OpenCode has none. Instead of pretending to one safety level, the policy layer records for each agent whether a rule is enforced by the CLI, only prompted, or not enforced at all.",
      },
      {
        title: "One conversation is the interface.",
        text: "Early on it was a launcher: pick an agent, get a terminal. I moved it to a single chat. Every request becomes a command that passes through planning, approval, scheduling and an event log. The chat never touches an agent process directly, so nothing can skip those checks.",
      },
      {
        title: "Work survives a reload.",
        text: "Orchestration runs in a background worker process, not the window, and chats, plans, runs and events are stored in SQLite. If the interface reloads, the agents and their history are still there.",
      },
    ],
    evidence:
      "The project has unit tests and end-to-end tests that drive the real Electron app. The latest demo build passed its unit tests, but its full end-to-end run still had a failure, and lint and an architecture check carry known issues. So it is a tested demo, not a validated release, and I’d rather say that than round it up. These suites cover the whole project, not only code I wrote.",
    unfinished:
      "There’s no public release yet. Collaboration on a shared workspace is in an early form. Attaching files in the chat is designed but not built. I’m also experimenting with a native Rust core on a separate branch; it is not part of the demo build.",
    learned:
      "Most of the hard problems weren’t about AI. They were about trust: how a person knows what several processes are doing, what actually changed, and what is safe to merge. Writing the big decisions down as architecture records, thirteen so far, forced me to answer those questions before the code did.",
  },
  {
    slug: "lead-finder",
    name: "Lead Finder",
    dek: "Finding clients for an agency, with a person approving every email.",
    state: "In use internally",
    role: "I wrote nearly all of it. It’s an internal tool for Kramiva.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "n8n", "Docker"],
    links: [],
    origin: [
      "Thinking about the agency raised the obvious next question: where do the clients come from? Finding leads by hand means searching for businesses, reading their websites, judging whether they’re a fit and writing emails one at a time.",
      "It was the same pattern as before. I had a goal, ran into a slow, repetitive process, and started thinking about how to automate it.",
    ],
    pipeline: [
      { label: "Search", note: "Google Places finds businesses for a campaign." },
      { label: "Read", note: "Their public websites are read." },
      { label: "Score", note: "Each lead is scored for fit." },
      { label: "Draft", note: "An AI model drafts the email." },
      { label: "Approve", note: "A person approves every email." },
      { label: "Send & watch", note: "Gmail sends; follow-ups stop when someone replies." },
    ],
    figures: [],
    decisions: [
      {
        title: "A person approves every email.",
        text: "Automated outreach is easy to abuse. The tool researches and drafts; a person decides. Every prospect email waits in an approval queue.",
      },
      {
        title: "Dry run by default.",
        text: "New campaigns and the global sending switch start in dry run, and finishing setup never turns it off. Someone has to switch it off on purpose, and each campaign also needs its own permission to send live.",
      },
      {
        title: "Stop when they reply.",
        text: "Follow-ups end as soon as a reply arrives, read from the same Gmail account that sent the email.",
      },
      {
        title: "Self-hosted, with real access control.",
        text: "It runs on our own server under Docker: the app, PostgreSQL, n8n for schedules, and nightly backups. Provider keys stay in the app, not in n8n. There are five roles, invitations only, passkeys, and two-factor authentication required for owners and administrators.",
      },
    ],
    unfinished:
      "It’s an internal tool, not a product for sale, and the repository is private, so there are no screenshots or public demo here.",
    learned:
      "Building something that sends email on your behalf is mostly about restraint: defaults that fail safe, and a person in the loop wherever a mistake would be public.",
  },
  {
    slug: "kairyo",
    name: "Kairyo",
    dek: "From a folder of low-resolution manga to an AI-upscaled archive you can actually read.",
    state: "Public release",
    role: "Personal project. I built the app and its workflow; the upscaling models are existing open-source work.",
    stack: ["Python", "PyQt6", "PyTorch"],
    links: [
      { label: "Source on GitHub", url: "https://github.com/sahiljo14/Kairyo" },
      { label: "Project site", url: "https://sahiljo14.github.io/Kairyo/" },
    ],
    origin: [
      "A super-resolution model isn’t a reading workflow. Comic archives have to be unpacked, every page processed, the output collected and the archive packed back up, on whatever hardware someone actually owns.",
    ],
    pipeline: [
      { label: "Archive", note: "A comic archive goes into the queue." },
      { label: "Extract", note: "Pages are unpacked; originals are not overwritten." },
      { label: "Upscale", note: "Tiled inference on CUDA, or the CPU." },
      { label: "Repack", note: "A new archive comes out the other side." },
    ],
    figures: [
      {
        src: "/images/kairyo.webp",
        width: 1280,
        height: 710,
        alt: "Kairyo’s desktop interface with model selection, archive controls and the upscaling queue.",
        caption:
          "Real capture of Kairyo, cropped from the public project screenshot to leave out local file paths.",
      },
    ],
    decisions: [
      {
        title: "Keep the interface responsive.",
        text: "Long-running inference stays off the UI thread. A non-blocking job queue shows progress and supports cancel and retry.",
      },
      {
        title: "Work with the hardware people have.",
        text: "Tiled inference splits large pages into pieces that fit in memory, CUDA is optional, and the CPU fallback keeps it usable without an NVIDIA GPU.",
      },
      {
        title: "Finish the whole job.",
        text: "Extract, upscale and repack are one workflow. Downloaded models are checked for integrity instead of being trusted blindly.",
      },
    ],
    unfinished:
      "The desktop app, CLI and documentation are public. The models themselves are other people’s open-source work.",
    learned:
      "The model is a small part of an AI product. Queues, memory limits and recoverable failures decide whether anyone can use it.",
  },
  {
    slug: "envirosense",
    name: "EnviroSense",
    dek: "Environmental sensor readings, followed all the way to a web dashboard.",
    state: "Public code",
    role: "Built with a teammate. I worked across the sensor-data path, storage and the dashboard.",
    stack: ["MQTT", "Node.js", "Express", "PostgreSQL", "React"],
    links: [
      { label: "Source on GitHub", url: "https://github.com/sahiljo14/Envirosense" },
      { label: "Dashboard", url: "https://fullstack-iot-environment-monitorin.vercel.app/" },
    ],
    origin: [
      "A sensor reading is only useful if it gets somewhere. EnviroSense connects the hardware side of environmental monitoring to a database and a browser, so readings can be looked at over time.",
    ],
    pipeline: [
      { label: "Sensor", note: "The device publishes JSON readings." },
      { label: "MQTT", note: "Messages travel through a broker." },
      { label: "Subscriber", note: "Node.js writes each reading to PostgreSQL." },
      { label: "REST API", note: "Express serves the history." },
      { label: "Dashboard", note: "React polls the API and charts it." },
    ],
    figures: [],
    decisions: [
      {
        title: "Separate collection from presentation.",
        text: "The device publishes over MQTT, a subscriber persists readings, and a REST API serves the dashboard. Each layer has one job.",
      },
      {
        title: "Keep the history.",
        text: "Storing every reading makes time-series views and CSV export possible. The dashboard refreshes by polling; there is no WebSocket.",
      },
    ],
    unfinished:
      "The code and frontend are public. A public frontend URL is no promise that live sensor data is flowing.",
    learned:
      "The boundary between hardware and software is where assumptions show. A dashboard has to explain missing data as clearly as it shows a reading.",
  },
  {
    slug: "nudge",
    name: "Nudge",
    dek: "The deadline buried in a group-chat message, turned into a task you can keep.",
    state: "Closed testing on Google Play",
    role: "Built with a teammate. Rule-based parsing, date resolution and local storage.",
    stack: ["Flutter", "Dart", "SQLite"],
    links: [{ label: "Source on GitHub", url: "https://github.com/sahiljo14/nudge-app" }],
    origin: [
      "Student deadlines arrive in messy messages that switch between English, Hindi and Marathi. A to-do app doesn’t help much if you have to translate and reformat every message first.",
    ],
    pipeline: [
      { label: "Message", note: "“kal submit karna hai”" },
      { label: "Parser", note: "Rules for English, Hinglish and Marathi." },
      { label: "Dates", note: "A resolver turns “kal” into a date." },
      { label: "Task", note: "Stored locally in SQLite." },
    ],
    figures: [],
    video: {
      id: "wadkYV90MEw",
      url: "https://www.youtube.com/shorts/wadkYV90MEw",
      title: "Nudge Android app demo",
      poster: "/images/nudge-demo.webp",
      note: "Published in May 2026. The Android app is in closed testing on Google Play, so it isn’t publicly available yet.",
      moments: [
        {
          at: "0:04",
          title: "Type it the way you’d say it.",
          text: "“Os assignment kal 5 baje urgent” becomes an urgent assignment, due the next day at 17:00.",
        },
        {
          at: "0:22",
          title: "One message, two tasks.",
          text: "“Maths test kal, physics test parso” splits into two exams on different days, with reminders.",
        },
        {
          at: "0:48",
          title: "See it on a calendar.",
          text: "Tasks land on the day they’re due.",
        },
        {
          at: "0:58",
          title: "Scan an image.",
          text: "A deadline list shared from a chat goes through OCR and comes out as three tasks linked to that image.",
        },
      ],
    },
    decisions: [
      {
        title: "Meet the message where it is.",
        text: "The parser handles English, Hinglish and Marathi phrasing, so a sentence like ‘kal submit karna hai’ becomes a deadline without a form.",
      },
      {
        title: "Keep it on the device.",
        text: "Parsing in Dart and storage in SQLite keep the core offline. Recognising a familiar deadline doesn’t need a hosted language model.",
      },
    ],
    unfinished:
      "Nudge is still in closed testing on Google Play, so it hasn’t had a public release.",
    learned:
      "Small products can ask good questions. What if the interface adapted to how people already talk?",
  },
];

export const built = [
  { name: "Kairyo", line: "Desktop AI manga upscaler with a job queue and CPU fallback.", stack: "Python · PyQt6 · PyTorch", state: "Public release", href: "/work/kairyo/" },
  { name: "EnviroSense", line: "Sensors to MQTT to PostgreSQL to a React dashboard. With a teammate.", stack: "MQTT · Node.js · PostgreSQL · React", state: "Public code", href: "/work/envirosense/" },
  { name: "Nudge", line: "Finds deadlines in English, Hinglish and Marathi messages. With a teammate.", stack: "Flutter · Dart · SQLite", state: "Closed testing on Google Play", href: "/work/nudge/" },
  { name: "RISC-V processor", line: "A single-cycle 32-bit datapath in Verilog, for a subset of the instruction set.", stack: "Verilog · testbenches", state: "Public code", href: "https://github.com/sahiljo14/riscv-single-cycle-processor" },
  { name: "ESP8266 weather station", line: "Temperature, humidity and pressure from the sensor up.", stack: "ESP8266 · DHT22 · BMP180", state: "Public code", href: "https://github.com/sahiljo14/esp8266-weather-station" },
  { name: "URL shortener", line: "Short links with stored click analytics.", stack: "Node.js · Express · MongoDB", state: "Public code", href: "https://github.com/sahiljo14/url-shortener" },
] satisfies { name: string; line: string; stack: string; state: State; href: string }[];
