const yaml = require("js-yaml");
const fs = require("node:fs");
const path = require("node:path");

module.exports = function () {
  const file = path.join(__dirname, "..", "..", "data", "eudi-documents-map.yaml");
  const raw = yaml.load(fs.readFileSync(file, "utf8"));

  const documents = raw.flat_documents || [];
  const groups = raw.logical_groups || [];
  const routes = raw.recommended_reading_routes || [];

  // Build lookup by ID
  const byId = {};
  const typeCounts = {};
  for (const doc of documents) {
    if (byId[doc.id]) {
      throw new Error(`Duplicate document ID: ${doc.id}`);
    }
    byId[doc.id] = doc;

    // Derive audience tags from type
    if (!doc.audience) {
      doc.audience = [];
      const legalTypes = ["regulation", "implementing_regulation", "implementing_decision", "directive", "consolidated_regulation", "recommendation"];
      const techTypes = ["architecture_reference_framework", "project_working_documentation"];
      if (legalTypes.includes(doc.type)) {
        doc.audience.push("Legal");
      }
      if (techTypes.includes(doc.type)) {
        doc.audience.push("Engineering");
      }
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
    byId,
    docGroups,
    docRoutes,
    typeCounts,
    recentDocuments,
    totalCount: documents.length,
    version: raw.version,
    name: raw.name,
    description: raw.description,
  };
};
