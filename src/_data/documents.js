const yaml = require("js-yaml");
const fs = require("node:fs");
const path = require("node:path");

module.exports = function () {
  const file = path.join(__dirname, "..", "..", "data", "eudi-documents-map.yaml");
  const raw = yaml.load(fs.readFileSync(file, "utf8"));

  const documents = raw.flat_documents || [];
  const groups = raw.logical_groups || [];
  const routes = raw.recommended_reading_routes || [];

  // Role definitions with which document IDs are highlighted per role
  const roles = [
    {
      key: "wallet-builder",
      label: "Wallet Builder",
      icon: "🔐",
      description: "Building or certifying an EUDI Wallet",
      highlightDocs: ["EU-2024-2979","EU-2024-2981","EU-2024-2982","EUDI-ARF","OID4VCI","OID4VP","HAIP","SD-JWT","SD-JWT-VC","ISO-18013-5","EU-2024-2977","WE-BUILD-WP4"],
      highlightLayers: ["legal","protocol","credential_format"],
      readingRoute: "mvp-credimi-conformance-evidence"
    },
    {
      key: "issuer",
      label: "Issuer / Provider",
      icon: "🏛️",
      description: "Issuing PID, EAA, or QEAA credentials",
      highlightDocs: ["EU-2024-2977","EU-2025-1569","EU-2024-2982","OID4VCI","HAIP","ETSI-TS-119-471","ETSI-TS-119-472-1","ETSI-TS-119-472-3","ETSI-TS-119-478","EUDI-ARF"],
      highlightLayers: ["legal","protocol","etsi"],
      readingRoute: "mvp-credimi-conformance-evidence"
    },
    {
      key: "verifier",
      label: "Verifier / Relying Party",
      icon: "✅",
      description: "Accepting and verifying EUDI credentials",
      highlightDocs: ["EU-2025-848","EU-2024-2982","OID4VP","HAIP","ETSI-TS-119-475","ETSI-TS-119-472-2","OPENID-FEDERATION","OAUTH-STATUS-LIST","EUDI-ARF"],
      highlightLayers: ["legal","protocol","etsi"],
      readingRoute: "trust-helper-mvp"
    },
    {
      key: "member-state",
      label: "Member State",
      icon: "🇪🇺",
      description: "Notification, registration, and supervisory obligations",
      highlightDocs: ["EU-2024-2980","EU-2025-848","EU-2025-849","EU-2025-1568","EU-2025-1571","EU-2015-1505","EU-2025-2164","EU-2024-2981","EU-2025-2162"],
      highlightLayers: ["legal"],
      readingRoute: "certification-and-assurance"
    },
    {
      key: "cab-nab",
      label: "CAB / NAB / Auditor",
      icon: "🔍",
      description: "Conformity assessment, certification, and audit",
      highlightDocs: ["EU-2024-2981","EU-2025-2162","EU-2015-1502","EU-2025-849","ETSI-EN-319-403-1","ETSI-EN-319-401","EU-2025-1566"],
      highlightLayers: ["legal","etsi"],
      readingRoute: "certification-and-assurance"
    }
  ];

  // Layer definitions for the layered map
  const layers = [
    {
      key: "legal",
      label: "Legal Foundation",
      color: "badge-legal",
      description: "EU Regulations, Directives, and Implementing Acts",
      types: ["regulation","implementing_regulation","implementing_decision","directive","consolidated_regulation","recommendation"]
    },
    {
      key: "architecture",
      label: "Architecture & Framework",
      color: "badge-technical",
      description: "ARF, WE BUILD, and working documentation",
      types: ["architecture_reference_framework","project_working_documentation"]
    },
    {
      key: "protocol",
      label: "OpenID4VC / OAuth Protocols",
      color: "badge-protocol",
      description: "OID4VCI, OID4VP, HAIP, SD-JWT, OAuth Status List",
      types: ["openid_spec"]
    },
    {
      key: "credential_format",
      label: "Credential Formats",
      color: "badge-credential",
      description: "SD-JWT, SD-JWT VC, ISO 18013-5/7",
      types: ["iso_standard"]
    },
    {
      key: "etsi",
      label: "ETSI Standards",
      color: "badge-trust",
      description: "Trust services, certificates, validation, EAA/PID profiles",
      types: ["etsi_standard"]
    }
  ];

  // Build lookup by ID
  const byId = {};
  const typeCounts = {};
  for (const doc of documents) {
    if (byId[doc.id]) {
      throw new Error(`Duplicate document ID: ${doc.id}`);
    }
    byId[doc.id] = doc;

    // Determine layer
    if (!doc.layer) {
      const legalTypes = ["regulation","implementing_regulation","implementing_decision","directive","consolidated_regulation","recommendation"];
      const techTypes = ["architecture_reference_framework","project_working_documentation"];
      if (legalTypes.includes(doc.type)) doc.layer = "legal";
      else if (techTypes.includes(doc.type)) doc.layer = "architecture";
      else doc.layer = "other";
    }

    // Derive audience tags from type
    if (!doc.audience) {
      doc.audience = [];
      const legalTypes = ["regulation","implementing_regulation","implementing_decision","directive","consolidated_regulation","recommendation"];
      const techTypes = ["architecture_reference_framework","project_working_documentation"];
      if (legalTypes.includes(doc.type)) doc.audience.push("Legal");
      if (techTypes.includes(doc.type)) doc.audience.push("Engineering");
      if (doc.type === "etsi_standard") doc.audience.push("Engineering");
      if (doc.type === "openid_spec") doc.audience.push("Engineering");
      if (doc.type === "iso_standard") doc.audience.push("Engineering");
    }

    typeCounts[doc.type] = (typeCounts[doc.type] || 0) + 1;
  }

  // Build document-to-groups index
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

  // Build document-to-routes index
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

  // Recent documents (last 6, reversed)
  const recentDocuments = documents.slice(-6).reverse();

  return {
    documents,
    groups,
    routes,
    roles,
    layers,
    byId,
    docGroups,
    docRoutes,
    typeCounts,
    recentDocuments,
    totalCount: documents.length,
    version: raw.version,
    name: raw.name,
    description: raw.description,
    // Pre-computed chart data
    chartBySource: {
      labels: ["EU Regulations & Acts", "ETSI Standards", "OpenID / OAuth", "ISO Standards", "Architecture / ARF"],
      values: [
        documents.filter(d => d.layer === "legal").length,
        documents.filter(d => d.layer === "etsi").length,
        documents.filter(d => d.type === "openid_spec").length,
        documents.filter(d => d.type === "iso_standard").length,
        documents.filter(d => d.layer === "architecture").length,
      ]
    },
  };
};

// Note: chartData is appended below in module.exports return — see below
