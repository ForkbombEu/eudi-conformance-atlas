// Single source for document type, stack and status presentation.
// Used by documents.js (page data), .eleventy.js (filters) and, through the
// serialized documents data, by the client-side map tree.

const stacks = [
  {
    key: "legal",
    label: "Law & implementing acts",
    description:
      "eIDAS, the EUDI amendment, implementing regulations and decisions, horizontal EU law and pending proposals",
    badge: "badge-legal",
  },
  {
    key: "architecture",
    label: "Architecture & EC specifications",
    description:
      "ARF, EC technical specifications, attestation rulebooks, FCAF and pilot working documentation",
    badge: "badge-technical",
  },
  {
    key: "standards",
    label: "Standards",
    description:
      "ETSI, CEN and ISO/IEC standards, standardisation roadmaps and cybersecurity guidance",
    badge: "badge-etsi",
  },
  {
    key: "protocols",
    label: "Protocols & platform specs",
    description:
      "OpenID4VC, IETF, W3C and FIDO specifications used by Wallets, Issuers and Relying Parties",
    badge: "badge-protocol",
  },
];

const types = {
  regulation: { label: "Regulation", badge: "badge-legal", stack: "legal" },
  implementing_regulation: {
    label: "Implementing Regulation",
    badge: "badge-legal",
    stack: "legal",
  },
  implementing_decision: {
    label: "Implementing Decision",
    badge: "badge-legal",
    stack: "legal",
  },
  delegated_regulation: {
    label: "Delegated Regulation",
    badge: "badge-legal",
    stack: "legal",
  },
  directive: { label: "Directive", badge: "badge-legal", stack: "legal" },
  consolidated_regulation: {
    label: "Consolidated Regulation",
    badge: "badge-legal",
    stack: "legal",
  },
  recommendation: {
    label: "Recommendation",
    badge: "badge-legal",
    stack: "legal",
  },
  legislative_proposal: {
    label: "Legislative Proposal",
    badge: "badge-legal",
    stack: "legal",
  },
  commission_guidance: {
    label: "Commission Guidance / OJ Notice",
    badge: "badge-legal",
    stack: "legal",
  },
  architecture_reference_framework: {
    label: "ARF",
    badge: "badge-architecture",
    stack: "architecture",
  },
  architecture_requirements_dataset: {
    label: "ARF Dataset",
    badge: "badge-architecture",
    stack: "architecture",
  },
  project_working_documentation: {
    label: "Working Documentation",
    badge: "badge-architecture",
    stack: "architecture",
  },
  ec_technical_specification: {
    label: "EC Technical Specification",
    badge: "badge-technical",
    stack: "architecture",
  },
  conformance_framework: {
    label: "Conformance Framework",
    badge: "badge-assurance",
    stack: "architecture",
  },
  attestation_rulebook_catalog: {
    label: "Rulebook Catalogue",
    badge: "badge-credential",
    stack: "architecture",
  },
  attestation_rulebook: {
    label: "Attestation Rulebook",
    badge: "badge-credential",
    stack: "architecture",
  },
  etsi_standard: {
    label: "ETSI Standard",
    badge: "badge-etsi",
    stack: "standards",
  },
  cen_standard: {
    label: "CEN Standard",
    badge: "badge-trust",
    stack: "standards",
  },
  iso_standard: {
    label: "ISO Standard",
    badge: "badge-iso",
    stack: "standards",
  },
  standards_roadmap: {
    label: "Standards Roadmap",
    badge: "badge-neutral",
    stack: "standards",
  },
  cybersecurity_guidance: {
    label: "Cybersecurity Guidance",
    badge: "badge-assurance",
    stack: "standards",
  },
  certification_scheme: {
    label: "Certification Scheme",
    badge: "badge-assurance",
    stack: "standards",
  },
  openid_spec: {
    label: "OpenID / OAuth",
    badge: "badge-protocol",
    stack: "protocols",
  },
  ietf_spec: { label: "IETF", badge: "badge-protocol", stack: "protocols" },
  w3c_spec: { label: "W3C", badge: "badge-protocol", stack: "protocols" },
  fido_spec: { label: "FIDO", badge: "badge-protocol", stack: "protocols" },
  protocol_spec_industry: {
    label: "Industry Specification",
    badge: "badge-protocol",
    stack: "protocols",
  },
};

// Every status carries a glyph and a label so it never depends on colour alone.
const statuses = {
  in_force: {
    label: "In force",
    glyph: "●",
    tone: "success",
    phase: "current",
  },
  adopted: { label: "Adopted", glyph: "◉", tone: "info", phase: "current" },
  published: {
    label: "Published",
    glyph: "●",
    tone: "success",
    phase: "current",
  },
  final: { label: "Final", glyph: "●", tone: "success", phase: "current" },
  draft: {
    label: "Draft",
    plural: "Drafts",
    glyph: "◐",
    tone: "warning",
    phase: "pipeline",
  },
  in_development: {
    label: "In development",
    glyph: "◌",
    tone: "warning",
    phase: "pipeline",
  },
  proposal: {
    label: "Proposal",
    plural: "Proposals",
    glyph: "◇",
    tone: "proposal",
    phase: "pipeline",
  },
  superseded: {
    label: "Superseded",
    glyph: "✕",
    tone: "muted",
    phase: "retired",
  },
};

module.exports = { stacks, types, statuses };
