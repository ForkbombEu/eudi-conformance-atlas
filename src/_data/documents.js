const yaml = require("js-yaml");
const fs = require("node:fs");
const path = require("node:path");
const { stacks, types, statuses } = require("./docTypes");

module.exports = function () {
  const file = path.join(
    __dirname,
    "..",
    "..",
    "data",
    "eudi-documents-map.yaml",
  );
  const raw = yaml.load(fs.readFileSync(file, "utf8"));

  const documents = raw.flat_documents || [];
  const groups = raw.logical_groups || [];
  const routes = raw.recommended_reading_routes || [];
  const changelog = raw.changelog || [];

  // Role definitions with which document IDs are highlighted per role
  const roles = [
    {
      key: "wallet-builder",
      label: "Wallet Builder",
      description: "Building or certifying an EUDI Wallet",
      tagline:
        "Issuance, presentation, Wallet Unit Attestation and certification evidence.",
      testActors: ["wallet"],
      highlightDocs: [
        "EU-2024-2979",
        "EU-2024-2981",
        "EU-2024-2982",
        "EUDI-ARF",
        "OID4VCI",
        "OID4VP",
        "HAIP",
        "SD-JWT",
        "SD-JWT-VC",
        "ISO-18013-5",
        "EU-2024-2977",
        "WE-BUILD-WP4",
      ],
      highlightLayers: ["legal", "protocol", "credential_format"],
      readingRoute: "mvp-credimi-conformance-evidence",
    },
    {
      key: "issuer",
      label: "Issuer / Provider",
      description: "Issuing PID, EAA, or QEAA credentials",
      tagline:
        "Credential offers, issuer metadata, formats and revocation status.",
      testActors: ["issuer"],
      highlightDocs: [
        "EU-2024-2977",
        "EU-2025-1569",
        "EU-2024-2982",
        "OID4VCI",
        "HAIP",
        "ETSI-TS-119-471",
        "ETSI-TS-119-472-1",
        "ETSI-TS-119-472-3",
        "ETSI-TS-119-478",
        "EUDI-ARF",
      ],
      highlightLayers: ["legal", "protocol", "etsi"],
      readingRoute: "mvp-credimi-conformance-evidence",
    },
    {
      key: "verifier",
      label: "Verifier / Relying Party",
      description: "Accepting and verifying EUDI credentials",
      tagline:
        "Registration, access certificates, entitlements and trust checks.",
      testActors: ["verifier", "other"],
      highlightDocs: [
        "EU-2025-848",
        "EU-2024-2982",
        "OID4VP",
        "HAIP",
        "ETSI-TS-119-475",
        "ETSI-TS-119-472-2",
        "OPENID-FEDERATION",
        "OAUTH-STATUS-LIST",
        "EUDI-ARF",
      ],
      highlightLayers: ["legal", "protocol", "etsi"],
      readingRoute: "trust-helper-mvp",
    },
    {
      key: "member-state",
      label: "Member State",
      description: "Notification, registration, and supervisory obligations",
      tagline: "Notifications, registers, trusted lists and supervision.",
      testActors: ["trust"],
      highlightDocs: [
        "EU-2024-2980",
        "EU-2025-848",
        "EU-2025-849",
        "EU-2025-1568",
        "EU-2025-1571",
        "EU-2015-1505",
        "EU-2025-2164",
        "EU-2024-2981",
        "EU-2025-2162",
      ],
      highlightLayers: ["legal"],
      readingRoute: "certification-and-assurance",
    },
    {
      key: "cab-nab",
      label: "CAB / NAB / Auditor",
      description: "Conformity assessment, certification, and audit",
      tagline: "Certification schemes, assurance levels and audit standards.",
      testActors: ["trust", "external"],
      highlightDocs: [
        "EU-2024-2981",
        "EU-2025-2162",
        "EU-2015-1502",
        "EU-2025-849",
        "ETSI-EN-319-403-1",
        "ETSI-EN-319-401",
        "EU-2025-1566",
      ],
      highlightLayers: ["legal", "etsi"],
      readingRoute: "certification-and-assurance",
    },
  ];

  const byId = {};
  const typeCounts = {};
  for (const doc of documents) {
    if (byId[doc.id]) {
      throw new Error(`Duplicate document ID: ${doc.id}`);
    }
    const type = types[doc.type];
    if (!type)
      throw new Error(`Unknown document type for ${doc.id}: ${doc.type}`);
    const status = statuses[doc.status];
    if (!status)
      throw new Error(`Unknown document status for ${doc.id}: ${doc.status}`);
    byId[doc.id] = doc;

    doc.stack = type.stack;
    doc.typeLabel = type.label;
    doc.typeBadge = type.badge;
    doc.statusLabel = status.label;
    doc.statusGlyph = status.glyph;
    doc.statusTone = status.tone;
    doc.statusPhase = status.phase;
    if (doc.status_date) doc.statusYear = String(doc.status_date).slice(0, 4);

    // Topical layer used by role highlighting; legal acts have none in the YAML.
    if (!doc.layer) doc.layer = type.stack === "legal" ? "legal" : type.stack;

    if (!doc.audience) {
      doc.audience = [type.stack === "legal" ? "Legal" : "Engineering"];
    }

    typeCounts[doc.type] = (typeCounts[doc.type] || 0) + 1;
  }

  // Role cards: the first three highlighted documents, plus how many of the
  // role's documents are still drafts or proposals.
  for (const role of roles) {
    const missing = role.highlightDocs.filter((id) => !byId[id]);
    if (missing.length)
      throw new Error(
        `Role ${role.key} references unknown documents: ${missing.join(", ")}`,
      );
    const docs = role.highlightDocs.map((id) => byId[id]);
    role.keyDocs = docs.slice(0, 3).map((doc) => ({
      id: doc.id,
      name: doc.name,
      statusTone: doc.statusTone,
      statusGlyph: doc.statusGlyph,
      statusLabel: doc.statusLabel,
    }));
    role.docCount = docs.length;
    role.movingCount = docs.filter(
      (doc) => doc.statusPhase === "pipeline",
    ).length;
  }

  const docGroups = {};
  for (const group of groups) {
    for (const step of group.steps || []) {
      for (const docId of step.documents || []) {
        if (!docGroups[docId]) docGroups[docId] = [];
        docGroups[docId].push({
          groupSlug: group.group_slug,
          groupTitle: group.title,
          stepTitle: step.step,
        });
      }
    }
  }

  const docRoutes = {};
  for (const route of routes) {
    for (const docId of route.documents || []) {
      if (!docRoutes[docId]) docRoutes[docId] = [];
      docRoutes[docId].push({
        routeSlug: route.route_slug,
        routeTitle: route.title,
      });
    }
  }

  const stackSummary = stacks.map((stack) => {
    const docs = documents.filter((doc) => doc.stack === stack.key);
    return { ...stack, count: docs.length, docs };
  });

  const statusSummary = Object.entries(statuses)
    .map(([key, meta]) => ({
      key,
      ...meta,
      count: documents.filter((doc) => doc.status === key).length,
    }))
    .filter((entry) => entry.count > 0);

  const countPhase = (phase) =>
    documents.filter((doc) => doc.statusPhase === phase).length;

  // Newest dated documents first; status_date may be YYYY, YYYY-MM or YYYY-MM-DD.
  const timeline = documents
    .filter((doc) => doc.status_date)
    .slice()
    .sort((a, b) => String(b.status_date).localeCompare(String(a.status_date)));

  const latestRelease = changelog[0] || null;
  const releaseIds = latestRelease
    ? {
        added: new Set(latestRelease.added || []),
        updated: new Set(latestRelease.updated || []),
      }
    : { added: new Set(), updated: new Set() };
  for (const doc of documents) {
    doc.releaseChange = releaseIds.added.has(doc.id)
      ? "new"
      : releaseIds.updated.has(doc.id)
        ? "updated"
        : null;
  }

  // Radar: one quarter per stack, rings by status phase. Positions are fixed at
  // build time (golden-ratio spread inside each ring sector), so the SVG needs no JS.
  const RADAR = { size: 720, c: 360 };
  const rings = [
    { key: "current", label: "In force · published · final", r0: 34, r1: 178 },
    { key: "pipeline", label: "Draft · in development", r0: 178, r1: 262 },
    { key: "proposal", label: "Proposal", r0: 262, r1: 306 },
  ];
  const ringOf = (doc) =>
    doc.status === "proposal"
      ? 2
      : doc.statusPhase === "pipeline"
        ? 1
        : doc.statusPhase === "current"
          ? 0
          : -1;
  const sectorStart = [180, 270, 0, 90];
  const toXY = (r, deg) => {
    const rad = (deg * Math.PI) / 180;
    return [
      Math.round((RADAR.c + r * Math.cos(rad)) * 10) / 10,
      Math.round((RADAR.c + r * Math.sin(rad)) * 10) / 10,
    ];
  };
  const dots = [];
  stacks.forEach((stack, s) => {
    rings.forEach((ring, k) => {
      const cell = documents
        .filter((doc) => doc.stack === stack.key && ringOf(doc) === k)
        .sort(
          (a, b) =>
            String(b.status_date || "").localeCompare(
              String(a.status_date || ""),
            ) || a.id.localeCompare(b.id),
        );
      cell.forEach((doc, i) => {
        const t = (i + 0.5) / cell.length;
        const r = Math.sqrt(ring.r0 ** 2 + t * (ring.r1 ** 2 - ring.r0 ** 2));
        const deg = sectorStart[s] + 7 + ((i * 0.6180339887) % 1) * 76;
        const [x, y] = toXY(r, deg);
        dots.push({
          id: doc.id,
          name: doc.name,
          x,
          y,
          tone: doc.statusTone,
          statusLabel: doc.statusLabel,
          date: doc.status_date,
          change: doc.releaseChange,
        });
      });
    });
  });
  const corner = [
    [24, 40, "start"],
    [696, 40, "end"],
    [696, 692, "end"],
    [24, 692, "start"],
  ];
  const radar = {
    ...RADAR,
    rings: rings.map((ring) => ({
      ...ring,
      labelX: RADAR.c - (ring.r0 + ring.r1) / 2,
    })),
    sectors: stacks.map((stack, s) => {
      const [x0, y0] = toXY(306, sectorStart[s]);
      const [x1, y1] = toXY(306, sectorStart[s] + 90);
      return {
        key: stack.key,
        label: stack.label,
        count: documents.filter(
          (doc) => doc.stack === stack.key && ringOf(doc) >= 0,
        ).length,
        path: `M${RADAR.c},${RADAR.c} L${x0},${y0} A306,306 0 0 1 ${x1},${y1} Z`,
        labelX: corner[s][0],
        labelY: corner[s][1],
        anchor: corner[s][2],
      };
    }),
    dots,
    plotted: dots.length,
  };

  // Momentum: documents by the half-year of their latest status date.
  const halfOf = (date) => {
    const year = Number(String(date).slice(0, 4));
    if (year < 2024) return "Before 2024";
    const month = Number(String(date).slice(5, 7)) || 1;
    return `${year} H${month <= 6 ? 1 : 2}`;
  };
  const momentumOrder = [
    "Before 2024",
    "2024 H1",
    "2024 H2",
    "2025 H1",
    "2025 H2",
    "2026 H1",
    "2026 H2",
  ];
  const momentumBars = momentumOrder.map((label) => {
    const inBar = documents.filter(
      (doc) => doc.status_date && halfOf(doc.status_date) === label,
    );
    return {
      label,
      total: inBar.length,
    };
  });
  const momentum = {
    bars: momentumBars,
    max: Math.max(...momentumBars.map((bar) => bar.total)),
    width: 640,
    height: 260,
    padX: 30,
    padTop: 30,
    padBottom: 36,
  };
  // Line-plot points: one per half-year, x evenly spaced, y scaled to max.
  momentum.points = momentumBars.map((bar, i) => {
    const x =
      momentum.padX +
      (i * (momentum.width - 2 * momentum.padX)) / (momentumBars.length - 1);
    const y =
      momentum.height -
      momentum.padBottom -
      (bar.total / momentum.max) *
        (momentum.height - momentum.padTop - momentum.padBottom);
    return {
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      label: bar.label,
      total: bar.total,
    };
  });

  // Ecosystem web: who publishes the rules and which actors they address.
  // Publisher is derived from id/type; the actor links are a simplified reading aid.
  const W = "wallet",
    I = "issuer",
    R = "rp",
    T = "trust";
  const publishers = [
    {
      key: "eu-law",
      label: "EU legislator",
      match: (d) => d.stack === "legal",
      actors: [W, I, R, T],
    },
    {
      key: "ec",
      label: "European Commission",
      match: (d) =>
        d.stack === "architecture" && !/^(WE-BUILD|OIDF)/.test(d.id),
      actors: [W, I, R, T],
    },
    {
      key: "webuild",
      label: "WE BUILD pilots",
      match: (d) => /^WE-BUILD/.test(d.id),
      actors: [W, I, R, T],
    },
    {
      key: "enisa",
      label: "ENISA / ECCG",
      match: (d) => /^ENISA/.test(d.id),
      actors: [W, T],
    },
    {
      key: "etsi",
      label: "ETSI",
      match: (d) => /^ETSI/.test(d.id),
      actors: [I, R, T],
    },
    {
      key: "cen",
      label: "CEN",
      match: (d) => d.type === "cen_standard",
      actors: [W, I],
    },
    {
      key: "iso",
      label: "ISO/IEC",
      match: (d) => d.type === "iso_standard",
      actors: [W, I, R],
    },
    {
      key: "openid",
      label: "OpenID Foundation",
      match: (d) => d.type === "openid_spec" || /^OIDF/.test(d.id),
      actors: [W, I, R, T],
    },
    {
      key: "ietf",
      label: "IETF",
      match: (d) => d.type === "ietf_spec",
      actors: [W, I, R],
    },
    {
      key: "w3c",
      label: "W3C",
      match: (d) => d.type === "w3c_spec",
      actors: [W, R],
    },
    {
      key: "fido",
      label: "FIDO Alliance",
      match: (d) => d.type === "fido_spec",
      actors: [W],
    },
    {
      key: "csc",
      label: "Cloud Signature Consortium",
      match: (d) => d.type === "protocol_spec_industry",
      actors: [W, T],
    },
  ];
  const actorNodes = [
    { key: W, label: "Wallets", x: 400, y: 200 },
    { key: I, label: "Issuers & PID providers", x: 545, y: 280 },
    { key: R, label: "Relying parties", x: 400, y: 360 },
    { key: T, label: "Trust lists & registries", x: 255, y: 280 },
  ];
  const actorAt = Object.fromEntries(actorNodes.map((a) => [a.key, a]));
  const webNodes = publishers.map((p, i) => {
    const angle = (-90 + (i * 360) / publishers.length) * (Math.PI / 180);
    const x = Math.round(400 + 250 * Math.cos(angle));
    const y = Math.round(280 + 215 * Math.sin(angle));
    const count = documents.filter(p.match).length;
    return {
      key: p.key,
      label: p.label,
      count,
      x,
      y,
      r: Math.round(8 + Math.sqrt(count) * 2.6),
      anchor: x < 360 ? "end" : x > 440 ? "start" : "middle",
      links: p.actors.map((a) => ({
        x: actorAt[a].x,
        y: actorAt[a].y,
        cx: Math.round((x + actorAt[a].x * 2) / 3),
        cy: Math.round((y * 2 + actorAt[a].y) / 3),
      })),
    };
  });
  const unmatched = documents.filter(
    (d) => !publishers.some((p) => p.match(d)),
  );
  if (unmatched.length)
    throw new Error(
      `No publisher for: ${unmatched.map((d) => d.id).join(", ")}`,
    );
  const ecosystem = {
    publishers: webNodes,
    actors: actorNodes,
    linkCount: webNodes.reduce((n, p) => n + p.links.length, 0),
  };

  return {
    documents,
    groups,
    routes,
    roles,
    stacks: stackSummary,
    types,
    statuses,
    statusSummary,
    byId,
    docGroups,
    docRoutes,
    typeCounts,
    timeline,
    radar,
    momentum,
    ecosystem,
    pinnedDocuments: documents.filter((doc) => doc.pinned_versions),
    changelog,
    latestRelease,
    currentCount: countPhase("current"),
    pipelineCount: countPhase("pipeline"),
    totalCount: documents.length,
    version: raw.version,
    name: raw.name,
    description: raw.description,
  };
};
