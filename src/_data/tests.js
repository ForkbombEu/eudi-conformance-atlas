module.exports = function() {
  return {
    tests: [
  {
    "id": 1,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can receive a PID credential offer",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI credential offer + Maestro openLink",
    "notes": "Requires `credential_metadata.credential_profile = PID`.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 2,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can receive an EAA credential offer",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI credential offer + Maestro openLink",
    "notes": "Requires EAA metadata.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 3,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can receive a QEAA/QEEA credential offer",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "StepCI + Maestro + trust-helper",
    "notes": "Receiving is observable; qualification/entitlement requires trust-list resolution.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 4,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can receive a credential offer using authorization code flow",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI metadata extraction + Maestro issuance",
    "notes": "Grant type recorded in `credential_metadata`.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 5,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can receive a credential offer using pre-authorized code flow",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI metadata extraction + Maestro issuance",
    "notes": "Requires issuer fixture supporting pre-auth code.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 6,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can receive PID as SD-JWT",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI metadata extraction + Maestro issuance",
    "notes": "Metadata must identify PID + SD-JWT.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 7,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can receive PID as mdoc",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI metadata extraction + Maestro issuance",
    "notes": "Requires mdoc PID issuer fixture.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 8,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can receive EAA as SD-JWT",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI metadata extraction + Maestro issuance",
    "notes": "Metadata must identify EAA + SD-JWT.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 9,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can receive EAA as mdoc",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI metadata extraction + Maestro issuance",
    "notes": "Requires mdoc EAA fixture.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 10,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can complete issuance for a credential signed with RSA-2048",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI metadata extraction + Maestro issuance",
    "notes": "Definitive for observable completion under that profile, not internal crypto correctness.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2977",
      "EU-2024-2979",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 11,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can complete issuance for a credential signed with ES256 / P-256",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI metadata extraction + Maestro issuance",
    "notes": "Same pattern as RSA-2048.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2977",
      "EU-2024-2979",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 12,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can complete issuance for a credential signed with EdDSA / Ed25519",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI metadata extraction + Maestro issuance",
    "notes": "If profile and issuer support it.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2977",
      "EU-2024-2979",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 13,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can complete issuance using X.509 / x5c issuer binding",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI metadata extraction + Maestro issuance",
    "notes": "Proves black-box interoperability with this issuer metadata profile.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2977",
      "EU-2024-2979",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 14,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can complete issuance using JWK issuer metadata",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI metadata extraction + Maestro issuance",
    "notes": "Requires issuer fixture.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2977",
      "EU-2024-2979",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 15,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can complete issuance using DID-based issuer metadata",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI metadata extraction + Maestro issuance",
    "notes": "Requires issuer fixture/profile.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2977",
      "EU-2024-2979",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 16,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet displays the issued credential after issuance",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Maestro assertion + screenshot",
    "notes": "User-visible display evidence.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2977",
      "EU-2024-2979",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 17,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet stores the issued credential for later use",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "Issuance followed by later presentation",
    "notes": "Stronger if Wallet is restarted before presentation.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2977",
      "EU-2024-2979",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 18,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet persists credential after app restart",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Issue \u2192 force stop/relaunch \u2192 present/assert visible",
    "notes": "Observable persistence.",
    "refs": []
  },
  {
    "id": 19,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet persists credential after device reboot",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Issue \u2192 reboot \u2192 present/assert visible",
    "notes": "Strong black-box storage evidence.",
    "refs": []
  },
  {
    "id": 20,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet verifies issuer signature during issuance",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "Positive issuance + invalid-signature negative fixture",
    "notes": "Positive flow alone is insufficient.",
    "refs": []
  },
  {
    "id": 21,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet rejects invalid issuer signature during issuance",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Negative issuer fixture + expected Wallet warning/failure",
    "notes": "Requires invalid-signature fixture.",
    "refs": []
  },
  {
    "id": 22,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet rejects expired issuer certificate",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Negative issuer certificate fixture",
    "notes": "Requires certificate fixture.",
    "refs": []
  },
  {
    "id": 23,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet rejects revoked issuer certificate",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Negative revocation fixture + trust-helper",
    "notes": "Requires revocation/list fixture.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "AS-MS-27-017",
      "EW-DM-44-002"
    ]
  },
  {
    "id": 24,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet warns/rejects untrusted issuer",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Untrusted issuer fixture + Maestro expected failure",
    "notes": "Strong black-box trust test.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "EW-PIO-01-020",
      "EW-PIO-01-021"
    ]
  },
  {
    "id": 25,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet accepts trusted issuer",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trusted issuer fixture + successful issuance",
    "notes": "Requires trust source or sandbox fixture.",
    "refs": []
  },
  {
    "id": 26,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet presents Wallet Unit Attestation to issuer when requested",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "Headless Wallet / OpenID / WE BUILD test",
    "notes": "Real Wallet UI usually cannot expose WUA payload.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2982",
      "AS-AP-10-028",
      "AS-AP-10-045"
    ]
  },
  {
    "id": 27,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet Unit Attestation is valid and correctly bound",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "Headless crypto/protocol test",
    "notes": "Not observable by Maestro alone.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2982",
      "AS-AP-10-028",
      "AS-AP-10-045"
    ]
  },
  {
    "id": 28,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet receives a remote presentation request",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI presentation request + Maestro openLink",
    "notes": "Request metadata recorded.",
    "refs": [
      "EU-2024-2982",
      "EW-PIO-01-001",
      "EW-PIO-01-004",
      "EW-PIO-01-007"
    ]
  },
  {
    "id": 29,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet processes OpenID4VP presentation request",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI + Maestro + verifier callback",
    "notes": "Observable interop evidence.",
    "refs": [
      "EU-2024-2982",
      "EW-PIO-01-001",
      "EW-PIO-01-004",
      "EW-PIO-01-007"
    ]
  },
  {
    "id": 30,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet processes same-device presentation request",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI + Maestro",
    "notes": "If same-device request is used.",
    "refs": [
      "EU-2024-2982",
      "EW-PIO-01-001",
      "EW-PIO-01-004",
      "EW-PIO-01-007"
    ]
  },
  {
    "id": 31,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet processes cross-device QR presentation request",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "QR fixture + real device automation",
    "notes": "Depends on lab setup.",
    "refs": [
      "EU-2024-2982",
      "EW-PIO-01-001",
      "EW-PIO-01-004",
      "EW-PIO-01-007"
    ]
  },
  {
    "id": 32,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet displays Relying Party identity before disclosure",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Maestro assertion + screenshot",
    "notes": "Expected RP identity comes from metadata/certificate/register.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2982",
      "EW-PIO-01-009",
      "AS-WP-06-009"
    ]
  },
  {
    "id": 33,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet displays requested attributes before disclosure",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Maestro assertion + screenshot",
    "notes": "Expected attribute list parsed from request.",
    "refs": [
      "EU-2024-2982",
      "EU-2025-848",
      "EW-PIO-01-008",
      "EW-DM-44-014"
    ]
  },
  {
    "id": 34,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet displays RP certificate or registration information",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Maestro assertion + screenshot",
    "notes": "Requires RP certificate/register fixture and Wallet UI support.",
    "refs": [
      "EU-2024-2982",
      "EU-2025-848",
      "EW-PIO-01-008",
      "EW-DM-44-014"
    ]
  },
  {
    "id": 35,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet does not disclose attributes before user approval",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Verifier state before approval + Maestro approval + verifier callback after",
    "notes": "Strong black-box test.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2982",
      "EW-PIO-01-009",
      "AS-WP-06-009"
    ]
  },
  {
    "id": 36,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet does not call verifier callback before approval",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/verifier polling before approval",
    "notes": "Negative precondition test.",
    "refs": []
  },
  {
    "id": 37,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can approve full disclosure",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Maestro approve + verifier callback inspection",
    "notes": "Verifier confirms all requested attributes received.",
    "refs": []
  },
  {
    "id": 38,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can deny/cancel presentation",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Maestro deny + verifier no credential result",
    "notes": "Requires Wallet exposes denial flow.",
    "refs": []
  },
  {
    "id": 39,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet supports selective disclosure",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "Maestro selection + verifier-side claim inspection",
    "notes": "Definitive if verifier confirms undisclosed claims absent.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2979",
      "EW-PIO-01-010",
      "ETSI-TR-119-476-V1-2-1"
    ]
  },
  {
    "id": 40,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet presents only requested SD-JWT disclosures",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Verifier-side inspection",
    "notes": "Requires verifier/helper to inspect SD-JWT disclosures.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2979",
      "EW-PIO-01-010",
      "ETSI-TR-119-476-V1-2-1"
    ]
  },
  {
    "id": 41,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet rejects/warns when RP asks for unauthorized attributes",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Negative RP entitlement fixture + Maestro expected warning/failure",
    "notes": "Requires RP entitlement/register fixture.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2982",
      "EU-2025-848",
      "EW-DM-44-017"
    ]
  },
  {
    "id": 42,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet warns user when RP authentication fails",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "RP cert negative fixture + screenshot",
    "notes": "Requires RP cert/trust fixture.",
    "refs": []
  },
  {
    "id": 43,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet accepts valid RP access certificate",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Valid RP cert fixture + successful presentation",
    "notes": "Depends on final profile.",
    "refs": [
      "EU-2025-848",
      "EU-2025-848",
      "AS-WP-06-005",
      "AS-WP-06-006"
    ]
  },
  {
    "id": 44,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet rejects expired RP access certificate",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Expired RP cert fixture",
    "notes": "Requires fixture.",
    "refs": [
      "EU-2025-848",
      "EU-2025-848",
      "AS-WP-06-005",
      "AS-WP-06-006"
    ]
  },
  {
    "id": 45,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet rejects revoked RP access certificate",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Revoked RP cert fixture + revocation check",
    "notes": "Requires revocation infrastructure.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "AS-MS-27-017",
      "EW-DM-44-002"
    ]
  },
  {
    "id": 46,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet rejects RP registration certificate with mismatched attributes",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Negative registration cert fixture",
    "notes": "Requires profile/fixture.",
    "refs": [
      "EU-2025-848",
      "EU-2025-848",
      "EU-2025-848",
      "EW-DM-44-014"
    ]
  },
  {
    "id": 47,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet displays result of RP registration verification",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Maestro assertVisible/screenshot + assert_visible_result",
    "notes": "Requires Wallet support.",
    "refs": [
      "EU-2025-848",
      "EU-2025-848",
      "EU-2025-848",
      "EW-DM-44-014"
    ]
  },
  {
    "id": 48,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet exposes transaction history/log view",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Maestro navigate to history + screenshot",
    "notes": "Proves visible UI, not internal log integrity.",
    "refs": [
      "EU-2024-2979"
    ]
  },
  {
    "id": 49,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet transaction history includes issuance event",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Issue credential + inspect history",
    "notes": "Depends on Wallet UI.",
    "refs": [
      "EU-2024-2979"
    ]
  },
  {
    "id": 50,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet transaction history includes presentation event",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Present credential + inspect history",
    "notes": "Depends on Wallet UI.",
    "refs": [
      "EU-2024-2979"
    ]
  },
  {
    "id": 51,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet supports credential deletion",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Maestro delete + assert absent",
    "notes": "User-facing deletion evidence.",
    "refs": []
  },
  {
    "id": 52,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Deleted credential cannot be presented",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Delete + presentation request expected failure",
    "notes": "Stronger than UI-only deletion.",
    "refs": []
  },
  {
    "id": 53,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet supports export / portability UI",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Maestro export/assert artifact",
    "notes": "If export is available.",
    "refs": [
      "EU-2024-2979"
    ]
  },
  {
    "id": 54,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Export preserves security/assurance properties",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "Certification/manual review",
    "notes": "Not provable by UI automation alone.",
    "refs": [
      "EU-2024-2979"
    ]
  },
  {
    "id": 55,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet supports RP-specific pseudonyms",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "Two RP fixtures + verifier-side comparison",
    "notes": "Definitive if pseudonym values are captured and compared.",
    "refs": [
      "EU-2024-2979"
    ]
  },
  {
    "id": 56,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Same RP receives stable pseudonym across sessions",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Repeat presentation to same RP + compare verifier result",
    "notes": "Requires pseudonym profile.",
    "refs": [
      "EU-2024-2979"
    ]
  },
  {
    "id": 57,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Different RPs receive different pseudonyms",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Present to RP1/RP2 + compare verifier result",
    "notes": "Requires pseudonym profile.",
    "refs": [
      "EU-2024-2979"
    ]
  },
  {
    "id": 58,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet supports erasure request interface to RP",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "Maestro UI + mock RP endpoint",
    "notes": "Definitive if mock RP receives payload.",
    "refs": [
      "EU-2024-2982"
    ]
  },
  {
    "id": 59,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet records submitted erasure request",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Submit request + inspect Wallet UI/history",
    "notes": "Depends on Wallet support.",
    "refs": [
      "EU-2024-2982"
    ]
  },
  {
    "id": 60,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet supports reporting RP to supervisory authority",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "Maestro UI + mock/report endpoint",
    "notes": "National procedure/profile likely needed.",
    "refs": [
      "EU-2024-2982"
    ]
  },
  {
    "id": 61,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can run on physical Android device",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Runner/device metadata + successful flow",
    "notes": "Environment evidence.",
    "refs": []
  },
  {
    "id": 62,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet can run on emulator/Redroid",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Runner/device metadata + successful flow",
    "notes": "Not equivalent to physical-device assurance.",
    "refs": []
  },
  {
    "id": 63,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet meets accessibility requirements",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "Accessibility audit/tools",
    "notes": "Maestro can assist, not fully prove.",
    "refs": [
      "EU-2016-2102",
      "EU-2019-882"
    ]
  },
  {
    "id": 64,
    "actor": "Wallet",
    "actorKey": "wallet",
    "test": "Wallet meets cybersecurity/integrity certification requirements",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "Certification/CAB/lab evidence",
    "notes": "Credimi can attach evidence, not certify.",
    "refs": [
      "EU-2024-2981",
      "EU-2024-2981",
      "EU-2024-2981",
      "ETSI-EN-319-403-1-V2-3-1"
    ]
  },
  {
    "id": 65,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer exposes OpenID Credential Issuer metadata",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI GET `.well-known`",
    "notes": "Direct protocol evidence.",
    "refs": [
      "EU-2024-2977",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-029",
      "UC-TE-02"
    ]
  },
  {
    "id": 66,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer metadata is schema-valid",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper JSON schema validation",
    "notes": "Need correct schema/profile.",
    "refs": [
      "EU-2024-2977",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-029",
      "UC-TE-02"
    ]
  },
  {
    "id": 67,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer metadata advertises PID configuration",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Metadata parser",
    "notes": "Direct metadata evidence.",
    "refs": [
      "EU-2024-2977",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-029",
      "UC-TE-02"
    ]
  },
  {
    "id": 68,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer metadata advertises EAA configuration",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Metadata parser",
    "notes": "Direct metadata evidence.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-048"
    ]
  },
  {
    "id": 69,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer metadata advertises SD-JWT format",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Metadata parser",
    "notes": "Direct metadata evidence.",
    "refs": [
      "EU-2024-2977",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-029",
      "UC-TE-02"
    ]
  },
  {
    "id": 70,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer metadata advertises mdoc format",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Metadata parser",
    "notes": "Direct metadata evidence.",
    "refs": [
      "EU-2024-2977",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-029",
      "UC-TE-02"
    ]
  },
  {
    "id": 71,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer metadata advertises supported signing algorithms",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Metadata parser",
    "notes": "Direct metadata evidence.",
    "refs": [
      "EU-2024-2977",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-029",
      "UC-TE-02"
    ]
  },
  {
    "id": 72,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer metadata advertises X.509 / x5c issuer binding",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Metadata parser",
    "notes": "Direct metadata evidence.",
    "refs": [
      "EU-2024-2977",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-029",
      "UC-TE-02"
    ]
  },
  {
    "id": 73,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer metadata advertises JWK/DID issuer binding",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Metadata parser",
    "notes": "Direct metadata evidence.",
    "refs": [
      "EU-2024-2977",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-029",
      "UC-TE-02"
    ]
  },
  {
    "id": 74,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Credential offer is syntactically valid",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper validation",
    "notes": "Direct offer validation.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 75,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Credential offer issuer URL matches metadata issuer",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper comparison",
    "notes": "Good consistency check.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 76,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Credential offer configuration ID exists in metadata",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper comparison",
    "notes": "Critical for `credential_metadata`.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 77,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Credential offer grant type is authorization code",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper parser",
    "notes": "Direct evidence.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 78,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Credential offer grant type is pre-authorized code",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper parser",
    "notes": "Direct evidence.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 79,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Two generated credential offers are equivalent profile offers",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Compare issuer/configuration/grant/metadata hash",
    "notes": "Supports Offer A / Offer B pattern.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2977",
      "EU-2024-2977",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 80,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer can issue PID to a real Wallet",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI credential offer + Maestro issuance",
    "notes": "Black-box interop.",
    "refs": [
      "EU-2024-2977",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-029",
      "UC-TE-02"
    ]
  },
  {
    "id": 81,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer can issue EAA to a real Wallet",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI credential offer + Maestro issuance",
    "notes": "Black-box interop.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-048"
    ]
  },
  {
    "id": 82,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer can issue QEAA/QEEA to a real Wallet",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "StepCI + Maestro + trust-helper",
    "notes": "Issuance observable; qualification external/trust-list.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-048"
    ]
  },
  {
    "id": 83,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer actually signs credential with RSA-2048",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "Credential inspection / verifier-side validation",
    "notes": "Metadata alone may only advertise capability.",
    "refs": []
  },
  {
    "id": 84,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer actually signs credential with ES256",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "Credential inspection / verifier-side validation",
    "notes": "Same.",
    "refs": []
  },
  {
    "id": 85,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer actually signs credential with EdDSA",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "Credential inspection / verifier-side validation",
    "notes": "Same.",
    "refs": []
  },
  {
    "id": 86,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer binds issued credential to Wallet/key",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "Headless protocol test / verifier-side crypto inspection",
    "notes": "Real Wallet UI usually cannot expose binding.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2977",
      "EU-2024-2979",
      "EW-PIO-01-003"
    ]
  },
  {
    "id": 87,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer validates Wallet Unit Attestation before issuance",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "Headless Wallet / negative WUA fixtures",
    "notes": "Use OpenID/WE BUILD style tests.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2982",
      "AS-AP-10-028",
      "AS-AP-10-045"
    ]
  },
  {
    "id": 88,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer rejects missing WUA",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Headless negative fixture",
    "notes": "Not Maestro real-Wallet UI.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2982",
      "AS-AP-10-028",
      "AS-AP-10-045"
    ]
  },
  {
    "id": 89,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer rejects expired WUA",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Headless negative fixture",
    "notes": "Requires WUA fixture.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2982",
      "AS-AP-10-028",
      "AS-AP-10-045"
    ]
  },
  {
    "id": 90,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer rejects revoked WUA",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Headless negative fixture + trust/status",
    "notes": "Requires WUA revocation fixture.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2982",
      "AS-AP-10-028",
      "AS-AP-10-045"
    ]
  },
  {
    "id": 91,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer rejects WUA from untrusted Wallet Provider",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Headless negative fixture",
    "notes": "Requires Wallet Provider trust fixture.",
    "refs": [
      "EU-2024-2977",
      "EU-2024-2982",
      "AS-AP-10-028",
      "AS-AP-10-045"
    ]
  },
  {
    "id": 92,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer exposes credential status endpoint",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper fetch",
    "notes": "Direct protocol evidence.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "AS-MS-27-017",
      "EW-DM-44-002"
    ]
  },
  {
    "id": 93,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer exposes revocation/status policy",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper fetch",
    "notes": "Direct policy evidence.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "AS-MS-27-017",
      "EW-DM-44-002"
    ]
  },
  {
    "id": 94,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer revokes credential and updates status",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Issue \u2192 revoke \u2192 status check",
    "notes": "Requires revocation-capable fixture.",
    "refs": []
  },
  {
    "id": 95,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Revoked issuer credential is rejected by verifier",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Revoked credential fixture + verifier test",
    "notes": "Strong end-to-end negative evidence.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "AS-MS-27-017",
      "EW-DM-44-002"
    ]
  },
  {
    "id": 96,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer is present in Trusted List / registry",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper lookup",
    "notes": "Once lists exist.",
    "refs": [
      "EU-2025-848",
      "EU-2024-2977",
      "AS-MS-31-005",
      "UC-TE-06"
    ]
  },
  {
    "id": 97,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer status is valid/not suspended/not revoked",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper actor status resolution",
    "notes": "Depends on list semantics.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "AS-MS-27-017",
      "EW-DM-44-002"
    ]
  },
  {
    "id": 98,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer is entitled to issue requested PID/EAA/QEAA",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper entitlement resolution",
    "notes": "Depends on registry/list schemas.",
    "refs": [
      "EU-2024-2977",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-029",
      "UC-TE-02"
    ]
  },
  {
    "id": 99,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer is qualified for QEAA/QEEA issuance",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "Trusted Lists + QTSP/supervisory evidence",
    "notes": "Credimi can resolve/attach, not grant qualification.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-048"
    ]
  },
  {
    "id": 100,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuer conforms to ETSI TS 119 471 EAA provider policy/security requirements",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "Policy/conformity review",
    "notes": "Runtime tests cover only fragments.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "EW-PIO-01-003",
      "ECCG Agreed Cryptographic Mechanisms<br>[AS-AP-10-048"
    ]
  },
  {
    "id": 101,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Issuance profile conforms to ETSI TS 119 472-3",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "StepCI/helper profile validation",
    "notes": "Definitive for metadata/profile syntax, not full provider compliance.",
    "refs": [
      "ETSI-TS-119-472-3-V1-1-1",
      "ETSI-TS-119-471-V1-1-1",
      "ETSI-TS-119-478-V1-1-1",
      "ETSI-TR-119-479-1-V1-1-1"
    ]
  },
  {
    "id": 102,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Authentic-source interface conforms to ETSI TS 119 478",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "StepCI/helper authentic-source tests",
    "notes": "Depends on interface/profile.",
    "refs": []
  },
  {
    "id": 103,
    "actor": "Issuer",
    "actorKey": "issuer",
    "test": "Identity/attribute verification before issuance follows required standards",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "Audit/CAB/QTSP evidence",
    "notes": "Credimi can attach results.",
    "refs": []
  },
  {
    "id": 104,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier exposes presentation request endpoint/API",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI GET/POST",
    "notes": "Direct protocol evidence.",
    "refs": [
      "EU-2024-2982",
      "EW-PIO-01-001",
      "EW-PIO-01-004",
      "EW-PIO-01-007"
    ]
  },
  {
    "id": 105,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Presentation request is syntactically valid",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper validation",
    "notes": "Direct validation.",
    "refs": [
      "EU-2024-2982",
      "EW-PIO-01-001",
      "EW-PIO-01-004",
      "EW-PIO-01-007"
    ]
  },
  {
    "id": 106,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Presentation request uses expected OpenID4VP parameters",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper validation",
    "notes": "Direct protocol evidence.",
    "refs": [
      "EU-2024-2982",
      "EW-PIO-01-001",
      "EW-PIO-01-004",
      "EW-PIO-01-007"
    ]
  },
  {
    "id": 107,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Presentation request declares requested attributes",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper parser",
    "notes": "Direct evidence.",
    "refs": [
      "EU-2024-2982",
      "EW-PIO-01-001",
      "EW-PIO-01-004",
      "EW-PIO-01-007"
    ]
  },
  {
    "id": 108,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Presentation request includes RP identifier",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper parser",
    "notes": "Direct evidence.",
    "refs": [
      "EU-2024-2982",
      "EW-PIO-01-001",
      "EW-PIO-01-004",
      "EW-PIO-01-007"
    ]
  },
  {
    "id": 109,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Presentation request includes RP access certificate",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper parser",
    "notes": "Direct evidence.",
    "refs": [
      "EU-2024-2982",
      "EW-PIO-01-001",
      "EW-PIO-01-004",
      "EW-PIO-01-007"
    ]
  },
  {
    "id": 110,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Presentation request includes RP registration certificate where applicable",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper parser",
    "notes": "Direct evidence.",
    "refs": [
      "EU-2024-2982",
      "EW-PIO-01-001",
      "EW-PIO-01-004",
      "EW-PIO-01-007"
    ]
  },
  {
    "id": 111,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "RP registration information is available in register",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper lookup",
    "notes": "Requires register/list source.",
    "refs": [
      "EU-2024-2982",
      "EU-2025-848",
      "EW-PIO-01-008",
      "EW-DM-44-014"
    ]
  },
  {
    "id": 112,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "RP access certificate chains to trusted anchor",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper certificate validation",
    "notes": "Direct helper evidence.",
    "refs": [
      "EU-2025-848",
      "EU-2025-848",
      "AS-WP-06-005",
      "AS-WP-06-006"
    ]
  },
  {
    "id": 113,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "RP access certificate is not expired",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper certificate validation",
    "notes": "Direct helper evidence.",
    "refs": [
      "EU-2025-848",
      "EU-2025-848",
      "AS-WP-06-005",
      "AS-WP-06-006"
    ]
  },
  {
    "id": 114,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "RP access certificate is not revoked",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper revocation check",
    "notes": "Requires revocation mechanism.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "AS-MS-27-017",
      "EW-DM-44-002"
    ]
  },
  {
    "id": 115,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "RP access certificate matches RP register identity",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper comparison",
    "notes": "Requires register schema.",
    "refs": [
      "EU-2025-848",
      "EU-2025-848",
      "EU-2025-848",
      "EW-DM-44-014"
    ]
  },
  {
    "id": 116,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "RP registration certificate lists requested attributes",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper certificate/registry parser",
    "notes": "Direct entitlement evidence.",
    "refs": [
      "EU-2024-2982",
      "EU-2025-848",
      "EW-PIO-01-008",
      "EW-DM-44-014"
    ]
  },
  {
    "id": 117,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Requested attributes are within RP entitlement",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI parser + trust-helper comparison",
    "notes": "One of the strongest RP tests.",
    "refs": [
      "EU-2024-2982",
      "EU-2025-848",
      "EW-PIO-01-008",
      "EW-DM-44-014"
    ]
  },
  {
    "id": 118,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "RP request exceeds registered entitlement",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Negative RP fixture + helper expected fail",
    "notes": "Good negative test.",
    "refs": [
      "EU-2025-848",
      "EU-2025-848",
      "EU-2025-848",
      "EW-DM-44-014"
    ]
  },
  {
    "id": 119,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier receives valid presentation callback",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/verifier callback",
    "notes": "Direct interop evidence.",
    "refs": [
      "EU-2024-2982",
      "EW-PIO-01-001",
      "EW-PIO-01-004",
      "EW-PIO-01-007"
    ]
  },
  {
    "id": 120,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier accepts valid PID presentation",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Real Wallet + verifier result",
    "notes": "Verifier-side result is direct.",
    "refs": []
  },
  {
    "id": 121,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier accepts valid EAA presentation",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Real Wallet + verifier result",
    "notes": "Verifier-side result is direct.",
    "refs": []
  },
  {
    "id": 122,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier validates SD-JWT disclosures",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Verifier-side inspection",
    "notes": "Direct if verifier exposes claim inspection.",
    "refs": [
      "EU-2024-2982",
      "EU-2024-2979",
      "EW-PIO-01-010",
      "ETSI-TR-119-476-V1-2-1"
    ]
  },
  {
    "id": 123,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier validates mdoc presentation",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Verifier-side inspection",
    "notes": "Direct if verifier exposes inspection.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "EW-PIO-01-020",
      "EW-PIO-01-021"
    ]
  },
  {
    "id": 124,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier rejects invalid signature",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Negative credential fixture",
    "notes": "Crucial crypto rejection test.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "EW-PIO-01-020",
      "EW-PIO-01-021"
    ]
  },
  {
    "id": 125,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier rejects expired credential",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Negative credential fixture",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "EW-PIO-01-020",
      "EW-PIO-01-021"
    ]
  },
  {
    "id": 126,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier rejects not-yet-valid credential",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Negative credential fixture",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "EW-PIO-01-020",
      "EW-PIO-01-021"
    ]
  },
  {
    "id": 127,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier rejects revoked credential",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Revoked fixture + status check",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "AS-MS-27-017",
      "EW-DM-44-002"
    ]
  },
  {
    "id": 128,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier rejects credential from untrusted issuer",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Untrusted issuer fixture",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "EW-PIO-01-020",
      "EW-PIO-01-021"
    ]
  },
  {
    "id": 129,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier validates issuer trust anchor through Trusted List",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper + verifier result",
    "notes": "Requires lists.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "EW-PIO-01-020",
      "EW-PIO-01-021"
    ]
  },
  {
    "id": 130,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier validates PID Provider LoTE trust anchor",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper + credential fixture",
    "notes": "Depends on final LoTE/list semantics.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "EW-PIO-01-020",
      "EW-PIO-01-021"
    ]
  },
  {
    "id": 131,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier validates QEAA qualified signature/trust",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "Qualified validation service / trust-helper / CAB evidence",
    "notes": "Credimi can integrate or ingest.",
    "refs": [
      "EU-2025-848",
      "EU-2024-2977",
      "AS-MS-31-005",
      "UC-TE-06"
    ]
  },
  {
    "id": 132,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier validates non-qualified EAA according to rulebook trust anchor",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "Trust-helper + verifier test",
    "notes": "Depends on rulebook/list finalization.",
    "refs": [
      "EU-2025-848",
      "EU-2024-2977",
      "AS-MS-31-005",
      "UC-TE-06"
    ]
  },
  {
    "id": 133,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Verifier conforms to ETSI TS 119 472-2 presentation profile",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "StepCI/helper profile validation",
    "notes": "Protocol evidence, not whole organizational compliance.",
    "refs": [
      "ETSI-TS-119-472-2-V1-2-1",
      "ETSI-TS-119-475-V1-2-1",
      "ETSI-TR-119-476-V1-2-1",
      "ETSI-TR-119-476-1-V1-3-1"
    ]
  },
  {
    "id": 134,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "RP attributes conform to ETSI TS 119 475",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "Trust-helper/StepCI attribute validation",
    "notes": "Candidate for `credimi-upcoming`.",
    "refs": [
      "ETSI-TS-119-475-V1-2-1",
      "ETSI-TS-119-472-2-V1-2-1"
    ]
  },
  {
    "id": 135,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Certificate profile conforms to ETSI EN 319 412 family",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper certificate profile validator",
    "notes": "Direct for certificate content.",
    "refs": [
      "ETSI-EN-319-411-1-V1-5-1",
      "ETSI-EN-319-411-2-V2-6-1",
      "ETSI-EN-319-412-1-V1-7-1",
      "ETSI-EN-319-412-2-V2-5-0"
    ]
  },
  {
    "id": 136,
    "actor": "Verifier/RP",
    "actorKey": "verifier",
    "test": "Signature/seal validation follows ETSI TS 119 441/442",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "Qualified validation service or specialized validator",
    "notes": "Internal helper gives technical evidence; qualified validation is external.",
    "refs": [
      "ETSI-TS-119-441-V1-3-1",
      "ETSI-TS-119-442-V1-1-1",
      "EU-2025-1945",
      "ETSI-EN-319-412-5-V2-6-1"
    ]
  },
  {
    "id": 137,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "LoTL can be fetched",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/trust-helper fetch",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2980",
      "EW-DM-31-003",
      "UC-TE-06",
      "WE-BUILD-WP4"
    ]
  },
  {
    "id": 138,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Trusted Lists can be discovered from LoTL",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper discovery",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2980",
      "EW-DM-31-003",
      "UC-TE-06",
      "WE-BUILD-WP4"
    ]
  },
  {
    "id": 139,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Trusted List schema is valid",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper schema validation",
    "notes": "Direct once schema known.",
    "refs": [
      "EU-2024-2980",
      "EW-DM-31-003",
      "UC-TE-06",
      "WE-BUILD-WP4"
    ]
  },
  {
    "id": 140,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Trusted List signature/seal validates",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper signature validation",
    "notes": "Direct technical evidence.",
    "refs": [
      "EU-2024-2980",
      "EW-DM-31-003",
      "UC-TE-06",
      "WE-BUILD-WP4"
    ]
  },
  {
    "id": 141,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Trusted List freshness is acceptable",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper freshness check",
    "notes": "Requires freshness policy.",
    "refs": [
      "EU-2024-2980",
      "EW-DM-31-003",
      "UC-TE-06",
      "WE-BUILD-WP4"
    ]
  },
  {
    "id": 142,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Actor can be resolved from Trusted List/register",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper actor lookup",
    "notes": "Direct.",
    "refs": [
      "EU-2025-848",
      "EU-2025-848",
      "EU-2025-848",
      "EW-DM-44-014"
    ]
  },
  {
    "id": 143,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Actor status is valid/suspended/revoked/expired",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper status normalization",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "AS-MS-27-017",
      "EW-DM-44-002"
    ]
  },
  {
    "id": 144,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Trust anchor can be resolved",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper resolver",
    "notes": "Direct.",
    "refs": [
      "EU-2025-848",
      "EU-2024-2977",
      "AS-MS-31-005",
      "UC-TE-06"
    ]
  },
  {
    "id": 145,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Certificate chain validates to configured trust anchor",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper X.509 validation",
    "notes": "Direct.",
    "refs": [
      "EU-2025-848",
      "EU-2024-2977",
      "AS-MS-31-005",
      "UC-TE-06"
    ]
  },
  {
    "id": 146,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Certificate revocation status can be checked via CRL",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper CRL check",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "AS-MS-27-017",
      "EW-DM-44-002"
    ]
  },
  {
    "id": 147,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Certificate revocation status can be checked via OCSP",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper OCSP check",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "AS-MS-27-017",
      "EW-DM-44-002"
    ]
  },
  {
    "id": 148,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Credential status can be checked through status list/status endpoint",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper status check",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2977",
      "EU-2025-1569",
      "AS-MS-27-017",
      "EW-DM-44-002"
    ]
  },
  {
    "id": 149,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Trust mode is labelled production/pilot/sandbox/mock",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper output policy",
    "notes": "Important report hygiene.",
    "refs": []
  },
  {
    "id": 150,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Evidence bundle includes raw Temporal inputs/outputs",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Temporal export + report generator",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2981",
      "EU-2024-2981",
      "EU-2024-2981",
      "ETSI-EN-319-403-1-V2-3-1"
    ]
  },
  {
    "id": 151,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Evidence bundle includes step input/output",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Pipeline artifact export",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2981",
      "EU-2024-2981",
      "EU-2024-2981",
      "ETSI-EN-319-403-1-V2-3-1"
    ]
  },
  {
    "id": 152,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Evidence bundle includes screenshots/videos",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Maestro artifacts",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2981",
      "EU-2024-2981",
      "EU-2024-2981",
      "ETSI-EN-319-403-1-V2-3-1"
    ]
  },
  {
    "id": 153,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Evidence bundle includes normalized conformance_result.json",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Report generator",
    "notes": "Direct.",
    "refs": [
      "EU-2024-2981",
      "EU-2024-2981",
      "EU-2024-2981",
      "ETSI-EN-319-403-1-V2-3-1"
    ]
  },
  {
    "id": 154,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Evidence bundle artifacts are hashed",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Hash manifest",
    "notes": "Direct bundle integrity.",
    "refs": [
      "EU-2024-2981",
      "EU-2024-2981",
      "EU-2024-2981",
      "ETSI-EN-319-403-1-V2-3-1"
    ]
  },
  {
    "id": 155,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Evidence bundle is signed by Credimi/Forkbomb",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "Non-qualified signature",
    "notes": "Provenance, not legal notarization.",
    "refs": [
      "EU-2024-2981",
      "EU-2024-2981",
      "EU-2024-2981",
      "ETSI-EN-319-403-1-V2-3-1"
    ]
  },
  {
    "id": 156,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Evidence bundle has qualified timestamp",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "QTSP timestamp API",
    "notes": "Optional Level 3 assurance.",
    "refs": [
      "EU-2025-848",
      "EU-2024-2977",
      "AS-MS-31-005",
      "UC-TE-06"
    ]
  },
  {
    "id": 157,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Evidence bundle is preserved through qualified preservation service",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "QTSP/Q preservation provider",
    "notes": "Future/advanced.",
    "refs": [
      "EU-2025-848",
      "EU-2024-2977",
      "AS-MS-31-005",
      "UC-TE-06"
    ]
  },
  {
    "id": 158,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "Evidence bundle is delivered through QERDS",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "QERDS provider",
    "notes": "Future/advanced, not MVP.",
    "refs": [
      "EU-2024-2981",
      "EU-2024-2981",
      "EU-2024-2981",
      "ETSI-EN-319-403-1-V2-3-1"
    ]
  },
  {
    "id": 159,
    "actor": "External/Conformance",
    "actorKey": "external",
    "test": "OpenID Foundation issuer test passes",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "OpenID conformance suite",
    "notes": "Credimi can ingest/map result.",
    "refs": []
  },
  {
    "id": 160,
    "actor": "External/Conformance",
    "actorKey": "external",
    "test": "OpenID Foundation verifier test passes",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "OpenID conformance suite",
    "notes": "Credimi can ingest/map result.",
    "refs": []
  },
  {
    "id": 161,
    "actor": "External/Conformance",
    "actorKey": "external",
    "test": "OpenID Foundation wallet/headless test passes",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "OpenID conformance suite",
    "notes": "Credimi can ingest/map result.",
    "refs": []
  },
  {
    "id": 162,
    "actor": "External/Conformance",
    "actorKey": "external",
    "test": "WE BUILD Wallet conformance test passes",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "WE BUILD test suite",
    "notes": "Credimi can integrate/ingest.",
    "refs": []
  },
  {
    "id": 163,
    "actor": "External/Conformance",
    "actorKey": "external",
    "test": "WE BUILD issuer trust evaluation passes",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "WE BUILD test suite",
    "notes": "Credimi can integrate/ingest.",
    "refs": []
  },
  {
    "id": 164,
    "actor": "External/Conformance",
    "actorKey": "external",
    "test": "WE BUILD RP trust evaluation passes",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "WE BUILD test suite",
    "notes": "Credimi can integrate/ingest.",
    "refs": []
  },
  {
    "id": 165,
    "actor": "External/Conformance",
    "actorKey": "external",
    "test": "Qualified validation service validates signature/seal",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "QTSP/QVal service",
    "notes": "Optional Level 3 evidence.",
    "refs": [
      "EU-2025-848",
      "EU-2024-2977",
      "AS-MS-31-005",
      "UC-TE-06"
    ]
  },
  {
    "id": 166,
    "actor": "External/Conformance",
    "actorKey": "external",
    "test": "CAB confirms Wallet certification evidence adequacy",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "CAB/manual review",
    "notes": "Credimi produces supporting evidence only.",
    "refs": [
      "EU-2024-2981",
      "EU-2024-2981",
      "EU-2024-2981",
      "ETSI-EN-319-403-1-V2-3-1"
    ]
  },
  {
    "id": 167,
    "actor": "External/Conformance",
    "actorKey": "external",
    "test": "Accessibility audit passes",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "Accessibility tooling/manual audit",
    "notes": "Credimi can attach result.",
    "refs": [
      "EU-2016-2102",
      "EU-2019-882"
    ]
  },
  {
    "id": 168,
    "actor": "External/Conformance",
    "actorKey": "external",
    "test": "Security/cybersecurity certification evidence passes",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "EUCC/CAB/lab review",
    "notes": "Credimi can attach result.",
    "refs": [
      "EU-2024-2981",
      "EU-2024-2981",
      "EU-2024-2981",
      "ETSI-EN-319-403-1-V2-3-1"
    ]
  },
  {
    "id": 169,
    "actor": "External/Conformance",
    "actorKey": "external",
    "test": "QTSP conformity assessment evidence is available",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "CAB/QTSP docs",
    "notes": "Relevant for QEEA/QTSP actors.",
    "refs": []
  },
  {
    "id": 171,
    "actor": "Wallet/RP",
    "actorKey": "verifier",
    "test": "Wallet can process SIOPv2 same-device request",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI SIOPv2 request + Maestro openLink + RP callback",
    "notes": "Requires SIOPv2 fixture.",
    "refs": [
      "OPENID-SIOPV2-DRAFT13"
    ]
  },
  {
    "id": 172,
    "actor": "Wallet/RP",
    "actorKey": "verifier",
    "test": "Wallet can process SIOPv2 cross-device request",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "QR/request_uri fixture + Maestro + RP direct_post callback",
    "notes": "Requires cross-device/QR test harness.",
    "refs": [
      "OPENID-SIOPV2-DRAFT13"
    ]
  },
  {
    "id": 173,
    "actor": "RP",
    "actorKey": "verifier",
    "test": "RP validates Self-Issued ID Token issuer/subject/audience/signature",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper ID Token validation",
    "notes": "Verifier-side/helper test.",
    "refs": [
      "OPENID-SIOPV2-DRAFT13"
    ]
  },
  {
    "id": 174,
    "actor": "RP",
    "actorKey": "verifier",
    "test": "RP validates SIOPv2 client metadata / RP metadata integrity",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "StepCI/helper validation + negative fixtures",
    "notes": "Definitive with negative metadata fixtures.",
    "refs": [
      "OPENID-SIOPV2-DRAFT13"
    ]
  },
  {
    "id": 175,
    "actor": "Wallet/RP",
    "actorKey": "verifier",
    "test": "Wallet/SIOP supports verifiable presentation support path",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "SIOPv2 + OpenID4VP presentation + verifier inspection",
    "notes": "Needs verifier-side inspection.",
    "refs": [
      "OPENID-SIOPV2-DRAFT13"
    ]
  },
  {
    "id": 176,
    "actor": "Wallet/Reader",
    "actorKey": "other",
    "test": "mDL/mdoc device engagement is valid",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "mdoc helper/reader + Maestro where UI observable",
    "notes": "Usually needs mdoc reader/helper.",
    "refs": [
      "ISO-IEC-DIS-18013-5-2020"
    ]
  },
  {
    "id": 177,
    "actor": "Wallet/Reader",
    "actorKey": "other",
    "test": "mDL/mdoc data retrieval method works",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "mdoc helper/reader + verifier inspection",
    "notes": "Stronger with reader-side parsed response.",
    "refs": [
      "ISO-IEC-DIS-18013-5-2020"
    ]
  },
  {
    "id": 178,
    "actor": "Wallet/Reader",
    "actorKey": "other",
    "test": "mDL/mdoc session encryption validates",
    "strength": "requires external testing",
    "strengthKey": "external",
    "execution": "mdoc security helper / protocol inspection",
    "notes": "Not provable from UI alone.",
    "refs": [
      "ISO-IEC-DIS-18013-5-2020"
    ]
  },
  {
    "id": 179,
    "actor": "Verifier/Reader",
    "actorKey": "verifier",
    "test": "mDL/mdoc issuer data authentication validates",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "mdoc verifier/helper inspection",
    "notes": "Verifier-side direct evidence.",
    "refs": [
      "ISO-IEC-DIS-18013-5-2020"
    ]
  },
  {
    "id": 180,
    "actor": "Verifier/Reader",
    "actorKey": "verifier",
    "test": "mDL authentication validates",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "mdoc verifier/helper inspection",
    "notes": "Verifier-side direct evidence.",
    "refs": [
      "ISO-IEC-DIS-18013-5-2020"
    ]
  },
  {
    "id": 181,
    "actor": "Wallet/Reader",
    "actorKey": "other",
    "test": "mDL Reader authentication is enforced",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "valid/invalid reader fixtures + Wallet/reader result",
    "notes": "Definitive with negative reader fixture and expected rejection.",
    "refs": [
      "ISO-IEC-DIS-18013-5-2020"
    ]
  },
  {
    "id": 182,
    "actor": "Verifier/Reader",
    "actorKey": "verifier",
    "test": "mDL online retrieval uses TLS/JWS as expected",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "StepCI/helper inspection",
    "notes": "Helper/protocol inspection.",
    "refs": [
      "ISO-IEC-DIS-18013-5-2020"
    ]
  },
  {
    "id": 183,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "OpenID Federation entity configuration validates",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper fetch + JWT validation",
    "notes": "Good trust-helper test.",
    "refs": [
      "OPENID-FEDERATION-1.0"
    ]
  },
  {
    "id": 184,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "OpenID Federation trust chain resolves to trust anchor",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper trust-chain resolver",
    "notes": "Good trust-helper test.",
    "refs": [
      "OPENID-FEDERATION-1.0"
    ]
  },
  {
    "id": 185,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "OpenID Federation metadata policy is applied",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper policy evaluation",
    "notes": "Needs policy fixtures.",
    "refs": [
      "OPENID-FEDERATION-1.0"
    ]
  },
  {
    "id": 186,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "OpenID Federation trust marks validate",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper trust-mark validation",
    "notes": "Needs trust-mark fixtures.",
    "refs": [
      "OPENID-FEDERATION-1.0"
    ]
  },
  {
    "id": 187,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "OpenID Federation subordinate statement fetch works",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper federation endpoint call",
    "notes": "Direct API evidence.",
    "refs": [
      "OPENID-FEDERATION-1.0"
    ]
  },
  {
    "id": 188,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "OpenID Federation resolve endpoint works",
    "strength": "definitive evidence",
    "strengthKey": "definitive",
    "execution": "Trust-helper resolve request",
    "notes": "Direct API evidence.",
    "refs": [
      "OPENID-FEDERATION-1.0"
    ]
  },
  {
    "id": 189,
    "actor": "Trust infrastructure",
    "actorKey": "trust",
    "test": "OpenID Federation key rollover / revocation is handled",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "trust-helper rollover/revocation fixtures",
    "notes": "Definitive with negative/rollover fixtures.",
    "refs": [
      "OPENID-FEDERATION-1.0"
    ]
  },
  {
    "id": 190,
    "actor": "RP/OP",
    "actorKey": "verifier",
    "test": "OpenID Federation automatic registration works",
    "strength": "conditional evidence",
    "strengthKey": "conditional",
    "execution": "StepCI/helper federation registration flow",
    "notes": "Depends on actual federation setup.",
    "refs": [
      "OPENID-FEDERATION-1.0"
    ]
  }
],
    totalCount: 189,
    definitiveCount: 138,
    conditionalCount: 24,
    externalCount: 27,
    chartByActor: {
      labels: ["Wallet", "Issuer", "Verifier / RP", "Trust Infra", "External / CAB"],
      values: [64, 39, 42, 29, 11]
    }
  };
};
