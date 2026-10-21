---
title: "Navigating the EUDI Wallet Rulebook — Expanded Regulatory Map"
description: "A practical map of the legal, technical, certification, trust-list and qualified trust-service documents shaping the European Digital Identity Wallet ecosystem."
tags:
  - Documentation
  - Guide
  - Compliance
  - Architecture
  - EUDI Wallet
  - Conformance
last_updated: 2026-10-21
---

# Navigating the EUDI Wallet Rulebook — Expanded Regulatory Map

A practical guide to the legal, technical, certification and trust-infrastructure documents behind the European Digital Identity Wallet ecosystem.

This document is written for mixed teams: product people, developers, legal/compliance stakeholders, Member State representatives, certification-adjacent actors, Wallet implementers, Issuers and Relying Parties.

The goal is not to make everyone read every regulation. The goal is to show which documents matter for which part of the EUDI Wallet ecosystem, and how they connect to Credimi-style conformance and interoperability evidence.

---

> **Legend**
>
> 🟦 **Legal / Regulation** — primarily useful for legal, policy, compliance, CAB, and Member State audiences.  
> 🟧 **Technical / Protocol / Implementation** — primarily useful for engineers, architects, wallet/issuer/verifier developers, and test implementers.  
> 🟩 **Assurance / Certification / Audit** — primarily useful for certification, conformity assessment, evidence review, and supervisory discussions.  
> 🟪 **Trust Infrastructure / Qualified Trust Services** — primarily useful for Trusted Lists, QTSPs, certificates, revocation, validation services, and advanced trust-service integrations.  
> 🟦🟧 **Legal + Technical** — directly bridges legal obligations and implementable technical behaviour.  
> 🟦🟩 **Legal + Assurance** — legal basis for evidence, certification, audit, or supervisory reporting.  
> 🟧🟪 **Technical + Trust Infrastructure** — implementation-heavy trust, certificate, list, revocation, or validation material.

## 🧭 How to read the colors

The colours are not legal categories. They are a reading aid for mixed legal/technical teams.  
A document can appear under more than one logical area, and the same document can be both legal and technical depending on how Credimi uses it.

## 🆕 October 2026 update

This review (21 October 2026) checked the EUR-Lex/Publications Office records, the ARF essential-standards list, the FCAF draft references, the EC technical specifications repository and the ETSI, CEN, ISO, OpenID, IETF, W3C and ENISA publication pages. The full status of every document is on the atlas Radar page.

### Amended Wallet acts (July 2026 package)

| Document                                                                                          | Link                                             | What changed                                                                                                                                  |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Commission Implementing Regulation (EU) 2026/1730 — Wallet-relying-party registration amendments  | https://data.europa.eu/eli/reg_impl/2026/1730/oj | Published in the OJ on 2026-07-22; entered into force on 2026-08-11.                                                                          |
| Commission Implementing Regulation (EU) 2026/1731 — Wallet technical framework amendments         | https://data.europa.eu/eli/reg_impl/2026/1731/oj | Published in the OJ on 2026-07-22; entered into force on 2026-08-11.                                                                          |
| Commission Implementing Regulation (EU) 2026/1735 — Qualified and public-sector EAA amendments    | https://data.europa.eu/eli/reg_impl/2026/1735/oj | Published in the OJ on 2026-07-22; entered into force on 2026-08-11, with application from 2027-01-01.                                        |
| Commission Implementing Regulation (EU) 2024/2977 — PID and electronic attestations of attributes | https://data.europa.eu/eli/reg_impl/2024/2977/oj | Amended by Implementing Regulation (EU) 2026/1731, applicable from 2026-08-11; consolidated version 02024R2977-20260811 available.            |
| Commission Implementing Regulation (EU) 2024/2982 — Protocols and interfaces                      | https://data.europa.eu/eli/reg_impl/2024/2982/oj | Amended by Implementing Regulation (EU) 2026/1731; consolidated version 02024R2982-20260811 available. Some provisions apply from 2028-08-11. |
| Commission Implementing Regulation (EU) 2025/848 — Registration of Wallet-relying parties         | https://data.europa.eu/eli/reg_impl/2025/848/oj  | Amended by Implementing Regulation (EU) 2026/1730; consolidated version 02025R0848-20260811 available. Parts apply from 2026-12-24.           |
| Commission Implementing Regulation (EU) 2025/1569 — QEAA and public-sector authentic-source EAAs  | https://data.europa.eu/eli/reg_impl/2025/1569/oj | Amended by Implementing Regulation (EU) 2026/1735; consolidated version 02025R1569-20260811 available.                                        |

### Specifications that reached final or a new version

| Document                                                                         | Link                                                                                                                                                                                                | What changed                                                                                                                                                                    |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OpenID4VC High Assurance Interoperability Profile 1.0                            | https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html                                                                                                                 | Version 1.0 is Final (published 24 Dec 2025). It pins SD-JWT VC draft-13 and Token Status List draft-14, and mandates FAPI 2.0 Security Profile provisions and DPoP (RFC 9449). |
| OpenID Federation 1.0                                                            | https://openid.net/specs/openid-federation-1_0.html                                                                                                                                                 | 1.0 is now Final (published 17 Feb 2026) and is normatively referenced by OID4VP 1.0. A Final 1.1 split into a protocol-independent core and OIDC binding followed in May 2026. |
| EC TS05 V1.5 — Common formats and API for relying-party registration information | https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts5-common-formats-and-api-for-rp-registration-information.md | Updated from v1.3 to v1.5. v1.4 (15.07.2026) added the WalletRelyingPartyService data class; v1.5 (20.08.2026) aligns with EU 2026/1730 and fixes cardinality and UML issues.   |
| EC TS06 V1.2.2 — Common set of relying-party information to be registered        | https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts6-common-set-of-rp-information-to-be-registered.md          | Updated from v1.0.1 to v1.2.2. v1.2 (2026-08-04) aligns with CIR (EU) 2026/1730; v1.2.1 and v1.2.2 fix attribute naming and restore the providedAttestation attribute.          |
| EC TS07 V1.0 — Common interface for data deletion requests                       | https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts7-common-interface-for-data-deletion-request.md             | Moved from draft v0.11 to v1.0 (Final Version), dated 2026-07-12.                                                                                                               |
| EC TS08 V1.0 — Common interface for reporting relying parties to DPAs            | https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts8-common-interface-for-reporting-of-wrp-to-dpa.md           | Moved from draft v0.11 to v1.0 (Final Version), dated 2026-08-12. Titled "Common Interface for reporting of Relying Parties to Data Protection Authorities".                    |
| ETSI TS 119 472-2 V1.3.1 — EAA/PID Presentation Profiles                         | https://www.etsi.org/deliver/etsi_ts/119400_119499/11947202/01.03.01_60/ts_11947202v010301p.pdf                                                                                                     | V1.3.1 (2026-07) supersedes V1.2.1 (2026-03). Conversion to EN 319 472-2 is in progress (early draft v1.3.2, 2026-09-02).                                                       |
| W3C Web Authentication Level 3 (Recommendation)                                  | https://www.w3.org/TR/webauthn-3/                                                                                                                                                                   | WebAuthn Level 3 became a W3C Recommendation on 25 Aug 2026. ARF 3.0.0 still cites WebAuthn Level 2.                                                                            |

### Still drafts: track the pinned version

| Document                                                           | Link                                                                        | Status                                                                                                                                                                                                                      |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SD-JWT-based Verifiable Digital Credentials (SD-JWT VC) — draft 19 | https://datatracker.ietf.org/doc/html/draft-ietf-oauth-sd-jwt-vc-19         | Moved from draft-16 to draft-19 (2026-08-31) and renamed "Verifiable Digital Credentials". Submitted to IESG for publication; no RFC number yet. HAIP 1.0 pins draft-13.                                                    |
| Token Status List (TSL) — draft 21                                 | https://datatracker.ietf.org/doc/html/draft-ietf-oauth-status-list-21       | draft-21 (2026-06-21) remains the latest; approved by IESG and in the RFC Editor queue, no RFC number yet. HAIP 1.0 pins draft-14.                                                                                          |
| ETSI TS 119 476-3 (draft) — EUDI Wallet Unit Attestation (WUA)     | https://portal.etsi.org/webapp/WorkProgram/Report_WorkItem.asp?WKI_ID=74932 | Not yet published. Final draft v0.0.11 reached on 2026-09-25, following public draft v0.0.9 (2026-06). Publication planned for 2027-02-28.                                                                                  |
| EUDI Functional Conformance Assessment Framework (FCAF)            | https://conformance.eudi.dev/latest/                                        | All test-case content remains at the rolling draft stage. The release candidate is targeted for Q1 2027, followed by v1.0.0 as the first full-scope baseline suitable for certification.                                    |
| ISO/IEC DIS 18013-5 (edition 2) — mDL/mdoc                         | https://www.iso.org/standard/91081.html                                     | Second edition of the mDL/mdoc standard, under enquiry; per the EC tracker it adds attestation revocation mechanisms (Attestation Status List based on IETF Token Status List, and Attestation Revocation/Identifier List). |

### Proposals to watch

| Document                                                                                                             | Link                                                                  | Why it matters                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Proposal for a Regulation on the establishment of European Business Wallets — COM(2025) 838, 2025/0358(COD)          | https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025PC0838 | Builds on and extends the EUDI framework with guaranteed interoperability with EUDI Wallets; future legal-person wallet, issuer and RP conformance surface.           |
| Digital Omnibus proposal — COM(2025) 837, 2025/0360(COD) (GDPR, ePrivacy, NIS2, eIDAS incident reporting)            | https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025PC0837 | Would route eIDAS trust-service/wallet security notifications through the NIS2 single-entry point and mentions the EUDI Wallet as a means to express consent choices. |
| Proposal for a Cybersecurity Act 2 (ENISA, certification framework, ICT supply chain) — COM(2026) 11, 2026/0011(COD) | https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52026PC0011 | Would replace the legal basis of EUCC and the candidate EUDIW certification scheme; provides for cybersecurity skills attestations issued to EUDI Wallets.            |
| Proposal for a Payment Services Regulation (PSR) — COM(2023) 367                                                     | https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52023PC0367 | Recital 111 and SCA RTS mandate reference EUDI Wallets as identification/authentication tools for financial services — payment SCA with wallet scenarios.             |

### New in the atlas

Certification and standardisation work that did not exist or was not tracked before: the ENISA draft candidate EUDI Wallet certification scheme, ECCG Agreed Cryptographic Mechanisms v3 draft, the EU age verification technical specification 1.1.0, CEN/TS 18098 PID onboarding, the ISO/IEC 23220 series, ETSI TR 119 704 on conformance and interoperability testing, and the OpenID Foundation OID4VCI/OID4VP + HAIP conformance programmes.

---

## 1. The short mental model

The EUDI Wallet rulebook is easier to understand as a layered system:

```text
Legal foundation
  eIDAS + EUDI amendment

Binding operational rules
  Commission Implementing Regulations and Decisions

Technical architecture
  EUDI Architecture and Reference Framework (ARF)

Pilot / ecosystem interpretation
  WE BUILD WP4 trust-registry and conformance work

Executable evidence
  Credimi pipelines: StepCI + Maestro + Temporal + third-party conformance tests + trust-helper checks
```

For Credimi, the practical question is:

> Which part of this rulebook can be turned into reproducible evidence?

Examples:

- A Wallet receives and completes a PID issuance flow.
- A Wallet opens a presentation request and waits for user approval.
- A Verifier generates a valid presentation request.
- A Relying Party only requests attributes it is registered or entitled to request.
- An Issuer is present in the relevant trusted list or registry.
- A run produces a reproducible evidence bundle: logs, screenshots, video, protocol traces, metadata snapshots, hashes and external conformance results.

---

## 2. Legend

```text
Legal foundation
  Core regulations defining the legal framework.

Binding implementing rule
  Commission Implementing Regulations / Decisions.

Technical reference
  ARF, standards, project documentation or implementation guidance.

Operational evidence target
  Something Credimi can test, observe, validate or attach to a report.

Advanced assurance / QTSP
  Relevant for qualified trust services, qualified validation, timestamping or high-assurance bundles.
```

---

## 🟦 3. The legal foundation

### eIDAS and the EUDI amendment

The original eIDAS Regulation created the EU framework for electronic identification and trust services. The 2024 EUDI amendment introduced the European Digital Identity Wallet framework and expanded the role of Wallets, Issuers, Relying Parties and trust services.

| Document                                                        | Link                                               | Why it matters                                        |
| --------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------- |
| Regulation (EU) No 910/2014 — eIDAS                             | https://data.europa.eu/eli/reg/2014/910/oj         | Original legal foundation for eID and trust services. |
| Consolidated eIDAS after EUDI amendments                        | https://data.europa.eu/eli/reg/2014/910/2024-10-18 | Current working legal baseline after amendments.      |
| Regulation (EU) 2024/1183 — European Digital Identity Framework | https://data.europa.eu/eli/reg/2024/1183/oj        | Establishes the EUDI Wallet framework.                |
| Commission Recommendation (EU) 2021/946 — Common Union Toolbox  | https://data.europa.eu/eli/reco/2021/946/oj        | Procedural origin of the ARF / toolbox work.          |

**Credimi angle:** these documents are the legal source of the ecosystem. They do not directly define a StepCI or Maestro test, but they explain why Wallet certification, interoperability, Relying Party registration and trust-service supervision exist.

---

## 🟧🟪 4. The technical blueprint: ARF and WE BUILD

### 🟦🟧 EUDI Architecture and Reference Framework

The ARF is the main technical bridge between the legal framework and implementation. It describes roles, flows, technical architecture, high-level requirements, Wallet behaviour, Issuer/Verifier expectations, security and privacy considerations.

| Document                      | Link                                                                                        | Why it matters                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| EUDI ARF latest documentation | https://eudi.dev/latest/                                                                    | Primary technical and architectural reference.                       |
| EUDI ARF GitHub repository    | https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework | Source repository for ARF documentation and high-level requirements. |

### 🟧🟪 WE BUILD WP4

WE BUILD WP4 is more concrete around trust evaluation, trusted lists, participant certificates, onboarding and conformance/interoperability tests.

| Document                            | Link                                                  | Why it matters                                             |
| ----------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| WE BUILD WP4 Trust Group repository | https://github.com/webuild-consortium/wp4-trust-group | Practical trust-registry, trust-list and conformance work. |

**Credimi angle:** ARF and WE BUILD are the best sources for translating legal expectations into executable test/evidence claims.

---

## 🟦🟩 5. Wallet rules: identity data, functions, certification and protocols

These are the core Wallet-era implementing acts from 2024. They are the first documents to read for Wallet / Issuer / Verifier conformance evidence.

| Document      | Link                                             | Main topic                                                      | Credimi evidence angle                                                                                |
| ------------- | ------------------------------------------------ | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| CIR 2024/2977 | https://data.europa.eu/eli/reg_impl/2024/2977/oj | PID and electronic attestations of attributes issued to Wallets | Credential-offer, issuance, issuer metadata, validity status and revocation evidence.                 |
| CIR 2024/2979 | https://data.europa.eu/eli/reg_impl/2024/2979/oj | Wallet integrity and core functionalities                       | Wallet transaction logs, portability, pseudonyms and user-control evidence.                           |
| CIR 2024/2980 | https://data.europa.eu/eli/reg_impl/2024/2980/oj | Notifications to the Commission                                 | Machine-readable ecosystem information and future Wallet/provider list checks.                        |
| CIR 2024/2981 | https://data.europa.eu/eli/reg_impl/2024/2981/oj | Wallet certification                                            | Assurance documentation, certification support and dependency-analysis evidence.                      |
| CIR 2024/2982 | https://data.europa.eu/eli/reg_impl/2024/2982/oj | Protocols and interfaces                                        | Remote issuance, remote presentation, RP information display, user approval and selective disclosure. |

### Practical flow

```text
Issuer/Provider generates credential offer
  ↓
Wallet receives offer and starts issuance
  ↓
Wallet completes PID/EAA issuance
  ↓
Verifier/RP generates presentation request
  ↓
Wallet displays RP identity and requested attributes
  ↓
User approves disclosure
  ↓
Verifier receives and validates presentation
```

### Evidence Credimi can produce

- Credential offer captured by StepCI.
- Issuer metadata snapshot.
- Real Wallet interaction driven by Maestro.
- Screenshots and video.
- Verifier callback/result.
- Temporal workflow ID and run ID.
- Step input/output traces.
- Normalized conformance evidence report.

---

## 6. 2025 Wallet ecosystem rules

These acts govern the ecosystem around Wallets: identity matching, incident response, Relying Party registration and certified Wallet lists.

| Document     | Link                                            | Main topic                             | Credimi relevance                                                                    |
| ------------ | ----------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------ |
| CIR 2025/846 | https://data.europa.eu/eli/reg_impl/2025/846/oj | Cross-border identity matching         | Public-sector and PID matching scenarios.                                            |
| CIR 2025/847 | https://data.europa.eu/eli/reg_impl/2025/847/oj | Wallet security breach reactions       | Monitoring and operational assurance evidence.                                       |
| CIR 2025/848 | https://data.europa.eu/eli/reg_impl/2025/848/oj | Registration of Wallet-relying parties | RP register lookup, entitlements, access certificates and registration certificates. |
| CIR 2025/849 | https://data.europa.eu/eli/reg_impl/2025/849/oj | List of certified Wallets              | Checking Wallet certification metadata once lists are available.                     |

### Practical flow for RP registration and entitlement

```text
Relying Party creates a presentation request
  ↓
Credimi parses requested attributes
  ↓
Credimi resolves RP registration / certificate / entitlement
  ↓
Credimi compares request against registered entitlement
  ↓
Wallet behaviour and/or helper result becomes evidence
```

### Evidence Credimi can produce

- Presentation request snapshot.
- RP identifier and register lookup.
- RP access certificate / registration certificate snapshot.
- Attribute entitlement comparison.
- Negative tests where RP asks for unauthorized attributes.
- Wallet warning/rejection screenshot where applicable.

---

## 🟦🟧 7. Issuers, PID Providers, EAA Providers and QEAA/QEEA

Issuers are not only endpoints that issue credentials. Depending on the credential type, they may need to be recognised, registered, qualified or entitled to issue a certain attestation.

| Document      | Link                                             | Main topic                                                    | Credimi relevance                                                             |
| ------------- | ------------------------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| CIR 2024/2977 | https://data.europa.eu/eli/reg_impl/2024/2977/oj | PID/EAA issuance to Wallets                                   | Core issuance evidence.                                                       |
| CIR 2025/1566 | https://data.europa.eu/eli/reg_impl/2025/1566/oj | Identity and attribute verification standards                 | QTSP/QEAA issuer assurance.                                                   |
| CIR 2025/1569 | https://data.europa.eu/eli/reg_impl/2025/1569/oj | Qualified EAAs and public-sector authentic-source EAAs        | QEAA/QEEA issuer qualification, authentic-source attestations and revocation. |
| CIR 2025/2530 | https://data.europa.eu/eli/reg_impl/2025/2530/oj | Requirements for QTSPs                                        | Relevant where issuers are QTSPs or QTSP-like actors.                         |
| CIR 2025/1572 | https://data.europa.eu/eli/reg_impl/2025/1572/oj | Notification of intention to provide qualified trust services | Relevant for QTSP onboarding/conformity evidence.                             |
| CIR 2025/2162 | https://data.europa.eu/eli/reg_impl/2025/2162/oj | CAB accreditation and conformity assessment                   | Relevant to auditor/CAB-facing evidence.                                      |

### Practical sub-steps

```text
Issuer metadata is reachable
  ↓
Credential offer is valid
  ↓
Real Wallet or headless Wallet completes issuance
  ↓
Issuer status / entitlement is resolved
  ↓
Credential validity and revocation mechanism is checked
```

### Credimi MVP evidence

- Issuer metadata and credential offer.
- Real Wallet issuance flow.
- 🟧🟪 External OpenID / WE BUILD issuer conformance results.
- Revocation/status endpoint checks.

### Credimi Level 2 evidence

- Trusted List / registry lookup.
- Issuer qualification status.
- Issuer entitlement to issue a specific attestation type.
- Negative tests for revoked, suspended or untrusted issuers.

---

## 🟦🟧 8. Relying Parties and Verifiers

Relying Parties are central to the EUDI trust model because users must know who is asking for attributes and whether that actor is entitled to request them.

| Document      | Link                                                  | Main topic                               | Credimi relevance                                                    |
| ------------- | ----------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------- |
| CIR 2025/848  | https://data.europa.eu/eli/reg_impl/2025/848/oj       | RP registration and entitlements         | Core RP trust-helper work.                                           |
| CIR 2024/2982 | https://data.europa.eu/eli/reg_impl/2024/2982/oj      | Protocols/interfaces and RP info display | Wallet display of RP identity, requested attributes and approval.    |
| CIR 2025/1943 | https://data.europa.eu/eli/reg_impl/2025/1943/oj      | Qualified certificate standards          | Useful where RP certificates rely on qualified certificate profiles. |
| CIR 2025/1945 | https://data.europa.eu/eli/reg_impl/2025/1945/oj      | Signature/seal validation                | Useful for verifier-side validation evidence.                        |
| WE BUILD WP4  | https://github.com/webuild-consortium/wp4-trust-group | RP trust evaluation use cases            | Concrete pilot-style trust evaluation scenarios.                     |

### Practical sub-steps

```text
Verifier generates presentation request
  ↓
Request contains RP information / certificate / registration evidence
  ↓
Requested attributes are extracted
  ↓
RP registration and entitlement are resolved
  ↓
Wallet displays RP and requested attributes
  ↓
Verifier validates credential response
```

### Evidence Credimi can produce

- Presentation request capture.
- RP access certificate / registration certificate parsing.
- Requested-attribute vs entitlement comparison.
- Wallet screenshot showing RP identity and requested attributes.
- Verifier accepts valid presentation or rejects invalid/revoked/untrusted credentials.

---

## 🟧🟪 9. Trusted Lists, LoTL and trust infrastructure

Trusted Lists and Lists of Trusted Lists are the machine-readable trust fabric. They are needed to resolve actors, trust anchors, statuses, certificates and revocation information.

| Document      | Link                                                  | Main topic                                     | Credimi relevance                       |
| ------------- | ----------------------------------------------------- | ---------------------------------------------- | --------------------------------------- |
| CID 2015/1505 | https://data.europa.eu/eli/dec_impl/2015/1505/oj      | Trusted List formats                           | Base for TL parsing and validation.     |
| CID 2025/2164 | https://data.europa.eu/eli/dec_impl/2025/2164/oj      | Common Trusted List template standard          | Newer TL template/versioning reference. |
| CIR 2024/2980 | https://data.europa.eu/eli/reg_impl/2024/2980/oj      | Notifications and machine-readable information | Ecosystem list publication context.     |
| CIR 2025/848  | https://data.europa.eu/eli/reg_impl/2025/848/oj       | RP registers and entitlement data              | RP trust and entitlement resolution.    |
| CIR 2025/1569 | https://data.europa.eu/eli/reg_impl/2025/1569/oj      | QEAA / public-sector EAAs                      | Issuer status and entitlement context.  |
| WE BUILD WP4  | https://github.com/webuild-consortium/wp4-trust-group | LoTL/TL integration and trust evaluation       | Pilot-facing trust infrastructure.      |

### Practical sub-steps

```text
Fetch LoTL
  ↓
Discover referenced Trusted Lists
  ↓
Validate schema and signature/seal
  ↓
Resolve actor entry
  ↓
Check actor status
  ↓
Check certificate / revocation / entitlement
```

### Evidence Credimi can produce

- LoTL/TL snapshots.
- Hash manifest.
- Schema validation result.
- Signature/seal validation result.
- Actor status result.
- Certificate chain and revocation result.
- Entitlement result.

---

## 🟦🟩 10. Assurance levels and eID schemes

The assurance-level framework predates the EUDI Wallet, but it remains important because Wallet/eID schemes and identity proofing refer back to low/substantial/high assurance levels.

| Document         | Link                                             | Main topic                                           | Credimi relevance                                       |
| ---------------- | ------------------------------------------------ | ---------------------------------------------------- | ------------------------------------------------------- |
| CIR 2015/1502    | https://data.europa.eu/eli/reg_impl/2015/1502/oj | Assurance levels for electronic identification means | Low/substantial/high assurance model.                   |
| eIDAS Regulation | https://data.europa.eu/eli/reg/2014/910/oj       | Legal basis for assurance levels                     | Source framework.                                       |
| CIR 2025/1568    | https://data.europa.eu/eli/reg_impl/2025/1568/oj | Peer reviews of eID schemes                          | Scheme-level assurance and Member State review context. |
| CIR 2024/2981    | https://data.europa.eu/eli/reg_impl/2024/2981/oj | Wallet certification                                 | Certification and dependency-analysis context.          |

### Practical sub-steps

```text
Understand claimed assurance level
  ↓
Map to enrolment, eID means management, authentication and organisation controls
  ↓
Attach evidence or certification material
  ↓
Treat as assurance documentation, not a normal Maestro UI test
```

---

## 🟦🟩 11. Certification, CABs, NABs and assurance evidence

Certification is where legal and technical requirements are assessed. Credimi should not claim to certify Wallets unless explicitly mandated/accredited. The right claim is that Credimi can generate reproducible assurance evidence.

| Document                    | Link                                             | Main topic                                  | Credimi relevance                           |
| --------------------------- | ------------------------------------------------ | ------------------------------------------- | ------------------------------------------- |
| CIR 2024/2981               | https://data.europa.eu/eli/reg_impl/2024/2981/oj | Wallet certification                        | Central for certification-support evidence. |
| CIR 2025/849                | https://data.europa.eu/eli/reg_impl/2025/849/oj  | Certified Wallet list                       | Certified Wallet metadata lookup.           |
| CIR 2025/2162               | https://data.europa.eu/eli/reg_impl/2025/2162/oj | CAB accreditation and conformity assessment | CAB-facing evidence and assessment process. |
| Regulation (EC) No 765/2008 | https://data.europa.eu/eli/reg/2008/765/oj       | Accreditation and market surveillance       | CAB/legal accreditation context.            |
| Cybersecurity Act           | https://data.europa.eu/eli/reg/2019/881/oj       | EU cybersecurity certification framework    | Cybersecurity certification context.        |
| EUCC Regulation 2024/482    | https://data.europa.eu/eli/reg_impl/2024/482/oj  | EUCC scheme                                 | Security/certification standards context.   |
| EUCC amendment 2024/3144    | https://data.europa.eu/eli/reg_impl/2024/3144/oj | EUCC amendments/corrections                 | Updated EUCC context.                       |

### Credimi evidence bundle

```text
Temporal workflow/run IDs
  + step input/output
  + protocol traces
  + screenshots/videos
  + external conformance test outputs
  + trust-helper results
  + hash manifest
  + normalized conformance_result.json
  + optional PDF report
```

### Important language

Use:

> Credimi produces structured, reproducible conformance and interoperability evidence.

Avoid:

> Credimi certifies EUDI Wallet conformance.

---

## 🟧🟩 12. Third-party conformance suites

Third-party conformance suites are evidence sources, not replacements for real Wallet/RP/Issuer ecosystem testing.

| Source                              | Link                                                  | Role                                  |
| ----------------------------------- | ----------------------------------------------------- | ------------------------------------- |
| OpenID Foundation conformance tools | https://openid.net/certification/                     | Protocol conformance evidence.        |
| WE BUILD WP4 tests                  | https://github.com/webuild-consortium/wp4-trust-group | Trust and interoperability evidence.  |
| ARF                                 | https://eudi.dev/latest/                              | Requirement and architecture mapping. |

### Practical sub-steps

```text
Run external conformance suite
  ↓
Store raw external result
  ↓
Normalize result into Credimi evidence report
  ↓
Map assertions to evidence claims
  ↓
Show limitations clearly
```

---

## 🟪 13. Qualified trust services and advanced assurance

These documents matter, but they should not block Credimi's first conformance-evidence MVP. They are mainly for advanced assurance, QTSP integrations, qualified timestamps, qualified certificates, signature/seal validation, preservation, archiving, ledgers and QERDS.

| Document      | Link                                             | Main topic                                    | Credimi relevance                                    |
| ------------- | ------------------------------------------------ | --------------------------------------------- | ---------------------------------------------------- |
| CIR 2025/1567 | https://data.europa.eu/eli/reg_impl/2025/1567/oj | Remote QSCD/QSealCD management                | Advanced signature/seal trust-service evidence.      |
| CIR 2025/1570 | https://data.europa.eu/eli/reg_impl/2025/1570/oj | Certified QSCD/QSealCD notification           | Device notification evidence.                        |
| CIR 2025/1572 | https://data.europa.eu/eli/reg_impl/2025/1572/oj | QTSP notification of intention                | QTSP onboarding evidence.                            |
| CIR 2025/1929 | https://data.europa.eu/eli/reg_impl/2025/1929/oj | Qualified timestamps                          | Optional qualified timestamping of evidence bundles. |
| CIR 2025/1942 | https://data.europa.eu/eli/reg_impl/2025/1942/oj | Qualified validation services                 | Optional qualified validation service integration.   |
| CIR 2025/1943 | https://data.europa.eu/eli/reg_impl/2025/1943/oj | Qualified certificate standards               | Advanced certificate profile validation.             |
| CIR 2025/1944 | https://data.europa.eu/eli/reg_impl/2025/1944/oj | QERDS                                         | Future qualified delivery of evidence, not MVP.      |
| CIR 2025/1945 | https://data.europa.eu/eli/reg_impl/2025/1945/oj | Signature/seal validation                     | Advanced verifier/signature validation evidence.     |
| CIR 2025/1946 | https://data.europa.eu/eli/reg_impl/2025/1946/oj | Qualified preservation services               | Long-term qualified preservation evidence.           |
| CIR 2025/2527 | https://data.europa.eu/eli/reg_impl/2025/2527/oj | Qualified website authentication certificates | Advanced endpoint trust evidence.                    |
| CIR 2025/2530 | https://data.europa.eu/eli/reg_impl/2025/2530/oj | QTSP requirements                             | QTSP assurance and qualified services.               |
| CIR 2025/2531 | https://data.europa.eu/eli/reg_impl/2025/2531/oj | Qualified electronic ledgers                  | Future adjacent trust infrastructure.                |
| CIR 2025/2532 | https://data.europa.eu/eli/reg_impl/2025/2532/oj | Qualified electronic archiving                | Future long-term evidence archiving.                 |

### Recommended Credimi treatment

```text
Level 1 — Reproducible Credimi evidence
  Temporal + StepCI + Maestro + screenshots/videos + metadata + hash manifest

Level 2 — Trust-resolved evidence
  Level 1 + trusted lists + RP/issuer status + entitlement + revocation/cert validation

Level 3 — Qualified evidence add-ons
  Level 2 + QTSP timestamp + qualified validation service + preservation/archiving/QERDS if needed
```

Do not expose Level 3 in the normal Maestro Action editor. Keep it in advanced trust-helper / enterprise assurance settings.

---

## 🟦 14. Privacy, cybersecurity and accessibility context

These horizontal documents shape obligations around data protection, cybersecurity, operational security and accessibility.

| Document                    | Link                                        | Main topic                             | Credimi relevance                                      |
| --------------------------- | ------------------------------------------- | -------------------------------------- | ------------------------------------------------------ |
| GDPR                        | https://data.europa.eu/eli/reg/2016/679/oj  | Personal data protection               | User data, RP requests, erasure, minimisation.         |
| ePrivacy Directive          | https://data.europa.eu/eli/dir/2002/58/oj   | Privacy in electronic communications   | Communications privacy context.                        |
| Regulation (EU) 2018/1725   | https://data.europa.eu/eli/reg/2018/1725/oj | EU-institution data protection         | Commission/list processing context.                    |
| NIS2 Directive              | https://data.europa.eu/eli/dir/2022/2555/oj | Cybersecurity                          | Operational/security evidence and supervisory context. |
| Cyber Resilience Act        | https://data.europa.eu/eli/reg/2024/2847/oj | Product cybersecurity                  | Wallet/software cybersecurity context.                 |
| Web Accessibility Directive | https://data.europa.eu/eli/dir/2016/2102/oj | Public-sector web/mobile accessibility | Public-sector Wallet/RP interfaces.                    |
| European Accessibility Act  | https://data.europa.eu/eli/dir/2019/882/oj  | Accessibility requirements             | Consumer-facing digital service accessibility.         |

---

## 🟦🟧 15. Recommended reading routes

### Route A — Fastest route for Credimi MVP

Read these first:

1. CIR 2024/2982 — protocols and interfaces
2. CIR 2024/2977 — PID and EAA issuance
3. CIR 2025/848 — RP registration and entitlements
4. CIR 2024/2981 — certification / assurance evidence
5. ARF latest
6. WE BUILD WP4 trust use cases

Why: this route covers real Wallet automation, Issuer/Verifier traces, RP trust checks and certification-support evidence.

### Route B — Trust-helper MVP

Read these first:

1. CIR 2025/848 — RP registration and entitlements
2. CID 2015/1505 — Trusted List formats
3. CID 2025/2164 — Trusted List template standard
4. CIR 2024/2980 — machine-readable ecosystem information
5. CIR 2025/1569 — QEAA / public-sector EAAs
6. WE BUILD WP4

Why: this route covers the actual data sources needed to resolve trust, status, entitlements and lists.

### 🟦🟩 Route C — Certification and assurance

Read these first:

1. CIR 2024/2981 — Wallet certification
2. CIR 2025/849 — certified Wallet list
3. CIR 2015/1502 — assurance levels
4. CIR 2025/2162 — CAB accreditation / conformity assessment
5. CIR 2025/1571 — supervisory reporting

Why: this route supports conversations with certification-adjacent people, Member States and auditors.

### Route D — Advanced QTSP / qualified evidence

Read these only when needed:

1. CIR 2025/1929 — qualified timestamps
2. CIR 2025/1942 — qualified validation services
3. CIR 2025/1943 — qualified certificates
4. CIR 2025/1945 — signature/seal validation
5. CIR 2025/2530 — QTSP requirements

Why: this route matters for QTSP partnerships and higher-assurance evidence bundles, but should not block the core Credimi conformance story.

---

## 16. Key takeaways

- The legal framework explains **why** EUDI Wallet actors must behave in specific ways.
- The CIRs define binding operational rules.
- 🟦🟧 ARF and WE BUILD help translate those rules into technical and trust-evaluation scenarios.
- Credimi should focus on producing reproducible evidence, not claiming to replace certification.
- The first valuable Credimi evidence layer is StepCI + Maestro + Temporal + screenshots/videos + normalized reports.
- The second, stronger layer is trust-helper validation: RP entitlements, issuer status, trusted lists, revocation and certificate checks.
- Qualified trust-service integrations are important later, but not MVP blockers.

---

## 17. Suggested product mapping

| Product area                | Primary documents               | Credimi feature                                           |
| --------------------------- | ------------------------------- | --------------------------------------------------------- |
| Wallet issuance             | 2024/2977, 2024/2982, ARF       | StepCI credential offer + Maestro Wallet flow             |
| Wallet presentation         | 2024/2982, 2025/848, ARF        | StepCI presentation request + Maestro approval flow       |
| Issuer conformance evidence | 2024/2977, 2025/1569, WE BUILD  | Issuer metadata, offer validation, headless tests         |
| RP trust evidence           | 2025/848, 2024/2982, WE BUILD   | RP register/cert/entitlement helper                       |
| Trusted Lists               | 2015/1505, 2025/2164, WE BUILD  | LoTL/TL fetch, validate, resolve actor                    |
| Certification support       | 2024/2981, 2025/849, 2015/1502  | Normalized evidence report + hash manifest                |
| Advanced assurance          | 2025/1929, 2025/1942, 2025/1945 | Optional QTSP timestamp / validation-service integrations |
