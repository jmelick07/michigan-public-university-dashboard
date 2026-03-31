const performanceTab = document.getElementById("performanceTab");
const appropriationsTab = document.getElementById("appropriationsTab");
const performancePanel = document.getElementById("performancePanel");
const appropriationsPanel = document.getElementById("appropriationsPanel");

const metricGroupLabel = document.getElementById("metricGroupLabel");
const metricLabel = document.getElementById("metricLabel");
const metricGroupSelect = document.getElementById("metricGroupSelect");
const metricSelect = document.getElementById("metricSelect");
const performanceViewModeSelect = document.getElementById("performanceViewModeSelect");
const compareMetricsCard = document.getElementById("compareMetricsCard");
const compareMetricList = document.getElementById("compareMetricList");
const compareMetricSummary = document.getElementById("compareMetricSummary");
const institutionList = document.getElementById("institutionList");
const performanceYearList = document.getElementById("performanceYearList");
const perfSelectAll = document.getElementById("perfSelectAll");
const perfSelectNone = document.getElementById("perfSelectNone");
const perfYearsAll = document.getElementById("perfYearsAll");
const perfYearsNone = document.getElementById("perfYearsNone");
const definitionTitle = document.getElementById("definitionTitle");
const definitionBody = document.getElementById("definitionBody");
const definitionSource = document.getElementById("definitionSource");
const definitionVariable = document.getElementById("definitionVariable");
const definitionAssumption = document.getElementById("definitionAssumption");
const performanceChartTitle = document.getElementById("performanceChartTitle");
const performanceChartSubtitle = document.getElementById("performanceChartSubtitle");
const performanceChart = document.getElementById("performanceChart");
const performanceTooltip = document.getElementById("performanceTooltip");
const performanceTable = document.getElementById("performanceTable");
const singleMetricChartCard = document.getElementById("singleMetricChartCard");
const definitionCard = document.getElementById("definitionCard");
const singleMetricTableCard = document.getElementById("singleMetricTableCard");
const compareChartsCard = document.getElementById("compareChartsCard");
const compareChartsSubtitle = document.getElementById("compareChartsSubtitle");
const compareMetricGrid = document.getElementById("compareMetricGrid");
const compareTableCard = document.getElementById("compareTableCard");
const compareMetricTable = document.getElementById("compareMetricTable");

const appropriationDatasetSelect = document.getElementById("appropriationDatasetSelect");
const appropriationInstitutionList = document.getElementById("appropriationInstitutionList");
const appropriationYearList = document.getElementById("appropriationYearList");
const appSelectAll = document.getElementById("appSelectAll");
const appSelectNone = document.getElementById("appSelectNone");
const appYearsAll = document.getElementById("appYearsAll");
const appYearsNone = document.getElementById("appYearsNone");
const appropriationDefinitionTitle = document.getElementById("appropriationDefinitionTitle");
const appropriationDefinitionBody = document.getElementById("appropriationDefinitionBody");
const appropriationDefinitionSource = document.getElementById("appropriationDefinitionSource");
const appropriationChartTitle = document.getElementById("appropriationChartTitle");
const appropriationChartSubtitle = document.getElementById("appropriationChartSubtitle");
const appropriationChart = document.getElementById("appropriationChart");
const appropriationTooltip = document.getElementById("appropriationTooltip");
const appropriationTable = document.getElementById("appropriationTable");

const SCHOOL_COLORS = {
  "Central Michigan University": "#6a0032",
  "Eastern Michigan University": "#046a38",
  "Ferris State University": "#ba0c2f",
  "Grand Valley State University": "#0032a0",
  "Lake Superior State University": "#6d6e71",
  "Michigan State University": "#18453b",
  "Michigan Technological University": "#ffcd00",
  "Northern Michigan University": "#095339",
  "Oakland University": "#b59a57",
  "Saginaw Valley State University": "#7a2230",
  "University of Michigan-Ann Arbor": "#00274c",
  "University of Michigan-Dearborn": "#ffcb05",
  "University of Michigan-Flint": "#005c8f",
  "Wayne State University": "#0c5449",
  "Western Michigan University": "#532e1f",
};

const FALLBACK_COLORS = ["#1d7f7a", "#7b4cc9", "#a44a3f", "#0e6db6", "#8b6f3c"];

const INSTITUTION_ALIASES = {
  CMU: "Central Michigan University",
  EMU: "Eastern Michigan University",
  Ferris: "Ferris State University",
  GVSU: "Grand Valley State University",
  LSSU: "Lake Superior State University",
  MSU: "Michigan State University",
  MTU: "Michigan Technological University",
  NMU: "Northern Michigan University",
  OU: "Oakland University",
  SVSU: "Saginaw Valley State University",
  "UM A": "University of Michigan-Ann Arbor",
  "UM-AA": "University of Michigan-Ann Arbor",
  "UM D": "University of Michigan-Dearborn",
  "UM-D": "University of Michigan-Dearborn",
  "UM F": "University of Michigan-Flint",
  "UM-F": "University of Michigan-Flint",
  WSU: "Wayne State University",
  WMU: "Western Michigan University",
};

const SCHOOL_CODES = {
  "Central Michigan University": "CMU",
  "Eastern Michigan University": "EMU",
  "Ferris State University": "Ferris",
  "Grand Valley State University": "GVSU",
  "Lake Superior State University": "LSSU",
  "Michigan State University": "MSU",
  "Michigan Technological University": "MTU",
  "Northern Michigan University": "NMU",
  "Oakland University": "OU",
  "Saginaw Valley State University": "SVSU",
  "University of Michigan-Ann Arbor": "UM-AA",
  "University of Michigan-Dearborn": "UM-D",
  "University of Michigan-Flint": "UM-F",
  "Wayne State University": "WSU",
  "Western Michigan University": "WMU",
};

const APPROPRIATION_META = [
  {
    key: "appropriations",
    label: "State appropriations",
    definition: "Annual state appropriation amounts for each Michigan public university.",
    source: "Michigan historical appropriation file",
    format: "currency",
  },
  {
    key: "appropriationPerFyes",
    label: "Appropriation per FYES",
    definition: "State appropriations divided by fiscal-year-equated students, showing support per FYES.",
    source: "Michigan historical appropriation file",
    format: "currency",
  },
  {
    key: "fyes",
    label: "FYES",
    definition: "Fiscal-year-equated students used in the state appropriation framework.",
    source: "Michigan historical appropriation file",
    format: "number",
  },
  {
    key: "percentOfStateAverage",
    label: "% of state average",
    definition: "Institution appropriation per FYES expressed as a percentage of the statewide average.",
    source: "Michigan historical appropriation file",
    format: "percent",
  },
];

const TOPIC_ORDER = ["Students", "Cost", "Outcomes", "Other"];

const appState = {
  performanceRows: [],
  definitionByMetric: new Map(),
  institutions: [],
  metrics: [],
  metricGroups: [],
  performanceViewMode: "single",
  selectedMetricGroup: "",
  selectedMetric: "",
  selectedCompareMetrics: new Set(),
  compareTopicOpen: new Map(),
  selectedInstitutions: new Set(),
  selectedYears: new Set(),
  performanceHover: null,
  performanceChartCache: null,
  appropriationDatasets: new Map(),
  selectedAppropriationDataset: "appropriationPerFyes",
  selectedAppropriationInstitutions: new Set(),
  selectedAppropriationYears: new Set(),
  appropriationHover: null,
  appropriationChartCache: null,
};

performanceTab.addEventListener("click", () => setTab("performance"));
appropriationsTab.addEventListener("click", () => setTab("appropriations"));
performanceViewModeSelect.addEventListener("change", onPerformanceViewModeChange);
metricGroupSelect.addEventListener("change", onMetricGroupChange);
metricSelect.addEventListener("change", onMetricChange);
perfSelectAll.addEventListener("click", () => {
  appState.selectedInstitutions = new Set(appState.institutions);
  renderInstitutionList();
  renderPerformance();
});
perfSelectNone.addEventListener("click", () => {
  appState.selectedInstitutions.clear();
  renderInstitutionList();
  renderPerformance();
});
perfYearsAll.addEventListener("click", () => {
  appState.selectedYears = new Set(getPerformanceYearsForCurrentView());
  renderPerformanceYears();
  renderPerformance();
});
perfYearsNone.addEventListener("click", () => {
  appState.selectedYears.clear();
  renderPerformanceYears();
  renderPerformance();
});

appropriationDatasetSelect.addEventListener("change", onAppropriationDatasetChange);
appSelectAll.addEventListener("click", () => {
  const dataset = getAppropriationDataset();
  appState.selectedAppropriationInstitutions = new Set(dataset.institutions);
  renderAppropriationInstitutions();
  renderAppropriations();
});
appSelectNone.addEventListener("click", () => {
  appState.selectedAppropriationInstitutions.clear();
  renderAppropriationInstitutions();
  renderAppropriations();
});
appYearsAll.addEventListener("click", () => {
  const dataset = getAppropriationDataset();
  appState.selectedAppropriationYears = new Set(dataset.years);
  renderAppropriationYears();
  renderAppropriations();
});
appYearsNone.addEventListener("click", () => {
  appState.selectedAppropriationYears.clear();
  renderAppropriationYears();
  renderAppropriations();
});

performanceChart.addEventListener("mousemove", throttle((event) => onChartHover(event, "performance"), 24));
performanceChart.addEventListener("mouseleave", () => {
  appState.performanceHover = null;
  performanceTooltip.style.display = "none";
  renderPerformanceChart();
});
appropriationChart.addEventListener("mousemove", throttle((event) => onChartHover(event, "appropriation"), 24));
appropriationChart.addEventListener("mouseleave", () => {
  appState.appropriationHover = null;
  appropriationTooltip.style.display = "none";
  renderAppropriationChart();
});
window.addEventListener("resize", throttle(() => {
  renderPerformance();
  renderAppropriationChart();
}, 100));

initialize();

function initialize() {
  hydratePerformance();
  hydrateAppropriations();
  renderPerformanceControls();
  renderPerformance();
  renderAppropriations();
}

function hydratePerformance() {
  const data = parseCSV(window.BUNDLED_DATA.performanceData);
  const definitions = parseCSV(window.BUNDLED_DATA.performanceDefinitions);

  appState.performanceRows = data.map((row) => ({
    ...row,
    institution_name: resolveInstitutionName(row.institution_name),
    source: row.source,
    value_num: parseNumeric(row.value),
  })).filter((row) => row.metric_id !== "pct_first_time_undergrads_foreign");

  appState.institutions = Array.from(
    new Set(appState.performanceRows.map((row) => row.institution_name).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));
  appState.selectedInstitutions = new Set(appState.institutions);

  definitions.forEach((row) => {
    appState.definitionByMetric.set(`${row.source}::${row.metric_id}`, row);
  });

  const allMetricMap = new Map();
  appState.performanceRows.forEach((row) => {
    const key = `${row.source}::${row.metric_id}`;
    if (!allMetricMap.has(key)) {
      const definition = appState.definitionByMetric.get(key);
      allMetricMap.set(key, {
        source: row.source,
        metric_id: row.metric_id,
        metric_name: row.metric_name,
        metric_group: normalizeTopic(definition?.metric_group || inferMetricGroup(row.metric_name, row.source)),
        value_unit: definition?.value_unit || inferMetricUnit(row.metric_name),
        format: inferMetricFormat(row.metric_name, definition?.value_unit || ""),
      });
    }
  });

  const allMetrics = Array.from(allMetricMap.values()).sort((a, b) => {
    if (a.metric_group === b.metric_group) {
      return compareMetricsWithinGroup(a, b);
    }
    return compareTopicGroups(a.metric_group, b.metric_group);
  });

  appState.metrics = allMetrics;
  appState.metricGroups = Array.from(new Set(allMetrics.map((metric) => metric.metric_group))).sort(compareTopicGroups);
  const firstGroup = appState.metricGroups[0];
  const firstMetric = allMetrics
    .filter((metric) => metric.metric_group === firstGroup)
    .sort(compareMetricsWithinGroup)[0];
  appState.selectedMetricGroup = firstMetric.metric_group;
  appState.selectedMetric = `${firstMetric.source}::${firstMetric.metric_id}`;
  appState.selectedYears = new Set(getPerformanceYearsForMetric());
}

function hydrateAppropriations() {
  APPROPRIATION_META.forEach((meta) => {
    const rows = parseCSV(window.BUNDLED_DATA[meta.key]);
    const cleanRows = rows
      .map((row) => {
        const institution = resolveInstitutionName(row.Institution || row.institution || row.INSTNM);
        if (!institution || institution === "MI avg") return null;
        const values = {};
        const years = [];
        Object.entries(row).forEach(([key, value]) => {
          if (/^\d{4}-\d{2}$/.test(key)) {
            years.push(key);
            values[key] = parseNumeric(value);
          }
        });
        return {
          institution,
          values,
          years: years.sort(),
        };
      })
      .filter(Boolean);

    const yearSet = new Set();
    cleanRows.forEach((row) => row.years.forEach((year) => yearSet.add(year)));
    const institutions = Array.from(new Set(cleanRows.map((row) => row.institution))).sort((a, b) =>
      a.localeCompare(b)
    );
    appState.appropriationDatasets.set(meta.key, {
      ...meta,
      rows: cleanRows,
      years: Array.from(yearSet).sort(),
      institutions,
    });
  });

  if (!appState.appropriationDatasets.has(appState.selectedAppropriationDataset)) {
    appState.selectedAppropriationDataset = APPROPRIATION_META[0]?.key || "";
  }
  const initial = getAppropriationDataset();
  appState.selectedAppropriationInstitutions = new Set(initial.institutions);
  appState.selectedAppropriationYears = new Set(initial.years);
}

function renderPerformanceControls() {
  performanceViewModeSelect.value = appState.performanceViewMode;
  metricGroupLabel.hidden = appState.performanceViewMode === "compare";
  metricGroupLabel.style.display = appState.performanceViewMode === "compare" ? "none" : "";
  metricLabel.hidden = appState.performanceViewMode === "compare";
  metricLabel.style.display = appState.performanceViewMode === "compare" ? "none" : "";
  renderMetricGroupOptions();
  renderMetricOptions();
  renderCompareMetricList();
  compareMetricsCard.hidden = appState.performanceViewMode !== "compare";
  renderInstitutionList();
  renderPerformanceYears();
}

function renderMetricGroupOptions() {
  metricGroupSelect.innerHTML = (appState.metricGroups || [])
    .map((group) => `<option value="${escapeHtml(group)}">${escapeHtml(group)}</option>`)
    .join("");
  metricGroupSelect.value = appState.selectedMetricGroup;
}

function getMetricsForSelectedGroup() {
  return (appState.metrics || []).filter(
    (metric) => metric.metric_group === appState.selectedMetricGroup
  );
}

function getAvailableCompareMetrics() {
  return (appState.metrics || []).slice().sort((a, b) => {
    if (a.metric_group !== b.metric_group) {
      return compareTopicGroups(a.metric_group, b.metric_group);
    }
    return compareMetricsWithinGroup(a, b);
  });
}

function metricKey(metric) {
  return `${metric.source}::${metric.metric_id}`;
}

function ensureCompareMetricSelection() {
  const metrics = getAvailableCompareMetrics();
  const validKeys = new Set(metrics.map(metricKey));
  appState.selectedCompareMetrics = new Set(
    Array.from(appState.selectedCompareMetrics).filter((key) => validKeys.has(key))
  );
}

function getSelectedCompareMetrics() {
  ensureCompareMetricSelection();
  return getAvailableCompareMetrics()
    .filter((metric) => appState.selectedCompareMetrics.has(metricKey(metric)));
}

function renderMetricOptions() {
  const metrics = getMetricsForSelectedGroup();
  if (!metrics.some((metric) => metricKey(metric) === appState.selectedMetric)) {
    const first = metrics[0];
    appState.selectedMetric = first ? metricKey(first) : "";
  }
  metricSelect.innerHTML = metrics
    .sort(compareMetricsWithinGroup)
    .map(
      (metric) =>
        `<option value="${escapeHtml(metricKey(metric))}">${escapeHtml(
          `${metric.metric_name} (${metric.source})`
        )}</option>`
    )
    .join("");
  metricSelect.value = appState.selectedMetric;
}

function renderCompareMetricList() {
  const metrics = getAvailableCompareMetrics();
  ensureCompareMetricSelection();
  compareMetricSummary.textContent = `${appState.selectedCompareMetrics.size} selected across all topics.`;
  compareMetricList.innerHTML = "";
  const grouped = new Map();
  metrics.forEach((metric) => {
    if (!grouped.has(metric.metric_group)) grouped.set(metric.metric_group, []);
    grouped.get(metric.metric_group).push(metric);
  });

  Array.from(grouped.entries()).forEach(([group, groupMetrics]) => {
    const details = document.createElement("details");
    details.className = "compare-topic-group";
    details.open = appState.compareTopicOpen.has(group) ? appState.compareTopicOpen.get(group) : false;
    details.innerHTML = `
      <summary class="compare-topic-summary">
        <span>${escapeHtml(group)}</span>
        <span class="compare-topic-count">${groupMetrics.length} metrics</span>
      </summary>
      <div class="compare-topic-body"></div>
    `;
    details.addEventListener("toggle", () => {
      appState.compareTopicOpen.set(group, details.open);
    });
    const body = details.querySelector(".compare-topic-body");

    groupMetrics.forEach((metric) => {
      const key = metricKey(metric);
      const selected = appState.selectedCompareMetrics.has(key);
      const label = document.createElement("label");
      label.className = `metric-chip${selected ? " selected" : ""}`;
      label.innerHTML = `
        <input type="checkbox" ${selected ? "checked" : ""} />
        <span class="metric-chip-copy">
          <span class="metric-chip-title">${escapeHtml(metric.metric_name)}</span>
          <span class="metric-chip-meta">${escapeHtml(metric.source)}</span>
        </span>
      `;
      label.querySelector("input").addEventListener("change", (event) => {
        if (event.target.checked) appState.selectedCompareMetrics.add(key);
        else appState.selectedCompareMetrics.delete(key);
        renderCompareMetricList();
        appState.selectedYears = new Set(getPerformanceYearsForCurrentView());
        renderPerformanceYears();
        renderPerformance();
      });
      body.appendChild(label);
    });

    compareMetricList.appendChild(details);
  });
}

function renderInstitutionList() {
  institutionList.innerHTML = "";
  appState.institutions.forEach((institution) => {
    const selected = appState.selectedInstitutions.has(institution);
    const label = document.createElement("label");
    label.className = `pill${selected ? " selected" : ""}`;
    label.title = institution;
    label.innerHTML = `
      <input type="checkbox" ${selected ? "checked" : ""} />
      <span class="swatch" style="background:${colorForInstitution(institution)}"></span>
      <span>${escapeHtml(shortLabel(institution))}</span>
    `;
    label.querySelector("input").addEventListener("change", (event) => {
      if (event.target.checked) appState.selectedInstitutions.add(institution);
      else appState.selectedInstitutions.delete(institution);
      renderInstitutionList();
      renderPerformance();
    });
    institutionList.appendChild(label);
  });
}

function renderPerformanceYears() {
  performanceYearList.innerHTML = "";
  const years = getPerformanceYearsForCurrentView();
  years.forEach((year) => {
    const selected = appState.selectedYears.has(year);
    const label = document.createElement("label");
    label.className = `year-pill${selected ? " selected" : ""}`;
    label.innerHTML = `<input type="checkbox" ${selected ? "checked" : ""} /><span>${escapeHtml(year)}</span>`;
    label.querySelector("input").addEventListener("change", (event) => {
      if (event.target.checked) appState.selectedYears.add(year);
      else appState.selectedYears.delete(year);
      renderPerformanceYears();
      renderPerformance();
    });
    performanceYearList.appendChild(label);
  });
}

function renderPerformance() {
  const compareMode = appState.performanceViewMode === "compare";
  singleMetricChartCard.hidden = compareMode;
  definitionCard.hidden = compareMode;
  singleMetricTableCard.hidden = compareMode;
  compareChartsCard.hidden = !compareMode;
  compareTableCard.hidden = !compareMode;
  compareMetricsCard.hidden = !compareMode;

  if (compareMode) {
    renderComparePerformance();
    return;
  }

  renderDefinition();
  renderPerformanceChart();
  renderPerformanceTable();
}

function renderDefinition() {
  const metric = getSelectedMetricMeta();
  if (!metric) return;
  const definition = appState.definitionByMetric.get(appState.selectedMetric);
  definitionTitle.textContent = metric.metric_name;
  definitionBody.textContent = definition?.definition || "Definition unavailable.";
  definitionSource.textContent = metric.source;
  definitionVariable.textContent = definition?.source_variable_name || metric.metric_id;
  if (definition?.assumption_note) {
    definitionAssumption.textContent = definition.assumption_note;
    definitionAssumption.classList.remove("hidden");
  } else {
    definitionAssumption.textContent = "";
    definitionAssumption.classList.add("hidden");
  }
}

function renderPerformanceChart() {
  const metric = getSelectedMetricMeta();
  if (!metric) return;
  const rows = getPerformanceSeries();
  const years = getVisibleYears(
    getPerformanceYearsForMetric().filter((year) => appState.selectedYears.has(year)),
    rows
  );
  performanceChartTitle.textContent = metric.metric_name;
  performanceChartSubtitle.textContent = `${rows.length} institutions • ${years.length} years • ${metric.source}`;
  appState.performanceChartCache = { years, rows, metric };
  if (getMetricDisplayMode(metric) === "bar") {
    drawBarChart(performanceChart, performanceTooltip, years, rows, metric, "performance");
  } else {
    drawLineChart(performanceChart, performanceTooltip, years, rows, metric, "performance");
  }
}

function renderPerformanceTable() {
  const rows = getPerformanceSeries().sort((a, b) => a.institution.localeCompare(b.institution));
  const years = getVisibleYears(
    getPerformanceYearsForMetric().filter((year) => appState.selectedYears.has(year)),
    rows
  );
  const thead = performanceTable.querySelector("thead");
  const tbody = performanceTable.querySelector("tbody");
  thead.innerHTML = "";
  tbody.innerHTML = "";

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `<th>Institution</th>${years.map((year) => `<th>${escapeHtml(year)}</th>`).join("")}`;
  thead.appendChild(headerRow);

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${escapeHtml(row.institution)}</td>${years
      .map((year) => `<td>${formatMetricValue(row.values[year], row.metric)}</td>`)
      .join("")}`;
    tbody.appendChild(tr);
  });
}

function renderComparePerformance() {
  const metrics = getSelectedCompareMetrics();
  compareChartsSubtitle.textContent = `${metrics.length} metrics • ${appState.selectedInstitutions.size} institutions`;
  renderCompareMetricCharts(metrics);
  renderCompareMetricTable(metrics);
}

function renderCompareMetricCharts(metrics) {
  compareMetricGrid.innerHTML = "";
  if (!metrics.length) {
    compareMetricGrid.innerHTML = '<p class="muted">Select at least one metric to compare.</p>';
    return;
  }

  metrics.forEach((metric) => {
    const rows = getPerformanceSeriesForMetric(metric);
    const years = getVisibleYears(
      getPerformanceYearsForMetricMeta(metric).filter((year) => appState.selectedYears.has(year)),
      rows
    );

    const card = document.createElement("article");
    card.className = "mini-chart-card";
    card.innerHTML = `
      <div class="mini-chart-head">
        <div>
          <h3>${escapeHtml(metric.metric_name)}</h3>
          <p>${escapeHtml(metric.source)}</p>
        </div>
      </div>
      <div class="chart-wrap mini-chart-wrap">
        <canvas class="mini-chart-canvas"></canvas>
        <div class="chart-tooltip mini-chart-tooltip"></div>
      </div>
    `;
    compareMetricGrid.appendChild(card);
    const canvas = card.querySelector("canvas");
    const tooltip = card.querySelector(".mini-chart-tooltip");
    if (getMetricDisplayMode(metric) === "bar") {
      drawBarChart(canvas, null, years, rows, metric, "compare");
    } else {
      drawLineChart(canvas, null, years, rows, metric, "compare");
    }
    canvas.addEventListener("mousemove", (event) => onMiniChartHover(event, canvas, tooltip));
    canvas.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  });
}

function renderCompareMetricTable(metrics) {
  const thead = compareMetricTable.querySelector("thead");
  const tbody = compareMetricTable.querySelector("tbody");
  thead.innerHTML = "";
  tbody.innerHTML = "";

  if (!metrics.length) return;

  const metricContexts = metrics.map((metric) => {
    const rows = getPerformanceSeriesForMetric(metric);
    const years = getVisibleYears(
      getPerformanceYearsForMetricMeta(metric).filter((year) => appState.selectedYears.has(year)),
      rows
    );
    return {
      metric,
      rows,
      latestYear: years.at(-1) || "",
      valueByInstitution: new Map(
        rows.map((row) => [row.institution, years.length ? row.values[years.at(-1)] : undefined])
      ),
    };
  });

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `<th>Institution</th>${metricContexts
    .map(
      ({ metric, latestYear }) =>
        `<th title="${escapeHtml(metric.metric_name)}">${escapeHtml(metric.metric_name)}${latestYear ? ` (${escapeHtml(latestYear)})` : ""}</th>`
    )
    .join("")}`;
  thead.appendChild(headerRow);

  Array.from(appState.selectedInstitutions)
    .sort((a, b) => a.localeCompare(b))
    .forEach((institution) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${escapeHtml(institution)}</td>${metricContexts
        .map(({ metric, valueByInstitution }) => `<td>${formatMetricValue(valueByInstitution.get(institution), metric)}</td>`)
        .join("")}`;
      tbody.appendChild(tr);
    });
}

function onMetricGroupChange() {
  appState.selectedMetricGroup = metricGroupSelect.value;
  renderMetricOptions();
  ensureCompareMetricSelection();
  renderCompareMetricList();
  appState.selectedYears = new Set(getPerformanceYearsForCurrentView());
  renderPerformanceYears();
  renderPerformance();
}

function onMetricChange() {
  appState.selectedMetric = metricSelect.value;
  appState.selectedYears = new Set(getPerformanceYearsForCurrentView());
  renderPerformanceYears();
  renderPerformance();
}

function onPerformanceViewModeChange() {
  appState.performanceViewMode = performanceViewModeSelect.value;
  ensureCompareMetricSelection();
  appState.selectedYears = new Set(getPerformanceYearsForCurrentView());
  renderPerformanceControls();
  renderPerformance();
}

function getSelectedMetricMeta() {
  const [source, metric_id] = appState.selectedMetric.split("::");
  const metrics = getMetricsForSelectedGroup();
  return metrics.find((metric) => metric.source === source && metric.metric_id === metric_id) || null;
}

function getPerformanceYearsForMetric() {
  const metric = getSelectedMetricMeta();
  return getPerformanceYearsForMetricMeta(metric);
}

function getPerformanceYearsForMetricMeta(metric) {
  if (!metric) return [];
  const yearSet = new Set();
  const populatedYears = new Set();
  appState.performanceRows.forEach((row) => {
    if (row.source === metric.source && row.metric_id === metric.metric_id) {
      yearSet.add(row.year);
      if (Number.isFinite(row.value_num)) populatedYears.add(row.year);
    }
  });
  const years = Array.from(yearSet).sort();
  if (getMetricDisplayMode(metric) === "bar" && populatedYears.size) {
    return [Array.from(populatedYears).sort().at(-1)];
  }
  return years;
}

function getPerformanceYearsForCurrentView() {
  if (appState.performanceViewMode !== "compare") {
    return getPerformanceYearsForMetric();
  }
  const yearSet = new Set();
  getSelectedCompareMetrics().forEach((metric) => {
    getPerformanceYearsForMetricMeta(metric).forEach((year) => yearSet.add(year));
  });
  return Array.from(yearSet).sort();
}

function getPerformanceSeries() {
  const metric = getSelectedMetricMeta();
  return getPerformanceSeriesForMetric(metric);
}

function getPerformanceSeriesForMetric(metric) {
  if (!metric) return [];
  const grouped = new Map();
  appState.performanceRows.forEach((row) => {
    if (row.source !== metric.source || row.metric_id !== metric.metric_id) return;
    if (!appState.selectedInstitutions.has(row.institution_name)) return;
    if (!grouped.has(row.institution_name)) {
      grouped.set(row.institution_name, {
        institution: row.institution_name,
        metric,
        values: {},
      });
    }
    grouped.get(row.institution_name).values[row.year] = row.value_num;
  });
  return Array.from(grouped.values());
}

function onAppropriationDatasetChange() {
  appState.selectedAppropriationDataset = appropriationDatasetSelect.value;
  const dataset = getAppropriationDataset();
  appState.selectedAppropriationInstitutions = new Set(dataset.institutions);
  appState.selectedAppropriationYears = new Set(dataset.years);
  renderAppropriationInstitutions();
  renderAppropriationYears();
  renderAppropriations();
}

function getAppropriationDataset() {
  return appState.appropriationDatasets.get(appState.selectedAppropriationDataset);
}

function renderAppropriations() {
  renderAppropriationControls();
  renderAppropriationDefinition();
  renderAppropriationChart();
  renderAppropriationTable();
}

function renderAppropriationControls() {
  appropriationDatasetSelect.innerHTML = APPROPRIATION_META.map(
    (dataset) => `<option value="${escapeHtml(dataset.key)}">${escapeHtml(dataset.label)}</option>`
  ).join("");
  appropriationDatasetSelect.value = appState.selectedAppropriationDataset;
  renderAppropriationInstitutions();
  renderAppropriationYears();
}

function renderAppropriationInstitutions() {
  appropriationInstitutionList.innerHTML = "";
  const dataset = getAppropriationDataset();
  dataset.institutions.forEach((institution) => {
    const selected = appState.selectedAppropriationInstitutions.has(institution);
    const label = document.createElement("label");
    label.className = `pill${selected ? " selected" : ""}`;
    label.title = institution;
    label.innerHTML = `
      <input type="checkbox" ${selected ? "checked" : ""} />
      <span class="swatch" style="background:${colorForInstitution(institution)}"></span>
      <span>${escapeHtml(shortLabel(institution))}</span>
    `;
    label.querySelector("input").addEventListener("change", (event) => {
      if (event.target.checked) appState.selectedAppropriationInstitutions.add(institution);
      else appState.selectedAppropriationInstitutions.delete(institution);
      renderAppropriationInstitutions();
      renderAppropriations();
    });
    appropriationInstitutionList.appendChild(label);
  });
}

function renderAppropriationYears() {
  appropriationYearList.innerHTML = "";
  const dataset = getAppropriationDataset();
  dataset.years.forEach((year) => {
    const selected = appState.selectedAppropriationYears.has(year);
    const label = document.createElement("label");
    label.className = `year-pill${selected ? " selected" : ""}`;
    label.innerHTML = `<input type="checkbox" ${selected ? "checked" : ""} /><span>${escapeHtml(year)}</span>`;
    label.querySelector("input").addEventListener("change", (event) => {
      if (event.target.checked) appState.selectedAppropriationYears.add(year);
      else appState.selectedAppropriationYears.delete(year);
      renderAppropriationYears();
      renderAppropriations();
    });
    appropriationYearList.appendChild(label);
  });
}

function renderAppropriationDefinition() {
  const dataset = getAppropriationDataset();
  appropriationDefinitionTitle.textContent = dataset.label;
  appropriationDefinitionBody.textContent = dataset.definition;
  appropriationDefinitionSource.textContent = dataset.source;
}

function renderAppropriationChart() {
  const dataset = getAppropriationDataset();
  const rows = dataset.rows
    .filter((row) => appState.selectedAppropriationInstitutions.has(row.institution))
    .map((row) => ({
      institution: row.institution,
      values: row.values,
      metric: dataset,
    }));
  const years = getVisibleYears(
    dataset.years.filter((year) => appState.selectedAppropriationYears.has(year)),
    rows
  );
  appropriationChartTitle.textContent = dataset.label;
  appropriationChartSubtitle.textContent = `${rows.length} institutions • ${years.length} years`;
  appState.appropriationChartCache = { years, rows, metric: dataset };
  drawLineChart(appropriationChart, appropriationTooltip, years, rows, dataset, "appropriation");
}

function renderAppropriationTable() {
  const dataset = getAppropriationDataset();
  const rows = dataset.rows
    .filter((row) => appState.selectedAppropriationInstitutions.has(row.institution))
    .sort((a, b) => a.institution.localeCompare(b.institution));
  const years = getVisibleYears(
    dataset.years.filter((year) => appState.selectedAppropriationYears.has(year)),
    rows
  );
  const thead = appropriationTable.querySelector("thead");
  const tbody = appropriationTable.querySelector("tbody");
  thead.innerHTML = "";
  tbody.innerHTML = "";
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `<th>Institution</th>${years.map((year) => `<th>${escapeHtml(year)}</th>`).join("")}`;
  thead.appendChild(headerRow);
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${escapeHtml(row.institution)}</td>${years
      .map((year) => `<td>${formatMetricValue(row.values[year], dataset)}</td>`)
      .join("")}`;
    tbody.appendChild(tr);
  });
}

function drawLineChart(canvas, tooltip, years, rows, metric, mode) {
  const ctx = canvas.getContext("2d");
  const cssWidth = canvas.clientWidth || 960;
  const cssHeight = canvas.clientHeight || 360;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(cssWidth * ratio);
  canvas.height = Math.floor(cssHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  if (!years.length || !rows.length) {
    ctx.fillStyle = "#5e6d84";
    ctx.font = "14px Inter, sans-serif";
    ctx.fillText("No data to display for the current selection.", 24, 40);
    return;
  }

  const padding = mode === "compare"
    ? { top: 20, right: 14, bottom: 14, left: 28 }
    : { top: 24, right: 18, bottom: 56, left: 82 };
  const chartWidth = cssWidth - padding.left - padding.right;
  const chartHeight = cssHeight - padding.top - padding.bottom;
  const axisFont = mode === "compare" ? "13px Inter, sans-serif" : "12px Inter, sans-serif";
  const values = rows.flatMap((row) => years.map((year) => row.values[year])).filter((value) => Number.isFinite(value));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const scale = niceScale(min, max, 5);

  ctx.strokeStyle = "rgba(16, 39, 78, 0.12)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= scale.steps; i += 1) {
    const value = scale.max - scale.step * i;
    const y = padding.top + (chartHeight * i) / scale.steps;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + chartWidth, y);
    ctx.stroke();
    if (mode !== "compare") {
      ctx.fillStyle = "#5e6d84";
      ctx.font = axisFont;
      ctx.textAlign = "right";
      ctx.fillText(formatAxisTickValue(value, metric, mode), padding.left - 10, y + 4);
      ctx.textAlign = "left";
    }
  }

  ctx.strokeStyle = "rgba(16, 39, 78, 0.18)";
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, padding.top + chartHeight);
  ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
  ctx.stroke();

  if (mode !== "compare") {
    ctx.fillStyle = "#5e6d84";
    ctx.font = axisFont;
    years.forEach((year, index) => {
      const x = padding.left + (chartWidth * index) / Math.max(years.length - 1, 1);
      const label = formatChartAxisLabel(year, mode);
      const textWidth = ctx.measureText(label).width;
      const minX = padding.left;
      const maxX = padding.left + chartWidth - textWidth;
      const labelX = Math.max(minX, Math.min(x - textWidth / 2, maxX));
      ctx.fillText(label, labelX, padding.top + chartHeight + 22);
    });
  }

  const hoverIndex =
    mode === "performance" ? appState.performanceHover :
    mode === "appropriation" ? appState.appropriationHover :
    null;

  rows.forEach((row, index) => {
    const color = colorForInstitution(row.institution);
    const isMuted = hoverIndex !== null && hoverIndex !== index;
    ctx.globalAlpha = isMuted ? 0.18 : 1;
    ctx.strokeStyle = color;
    ctx.lineWidth = hoverIndex === index ? 3 : 2;
    ctx.beginPath();
    let started = false;
    years.forEach((year, yearIndex) => {
      const value = row.values[year];
      if (!Number.isFinite(value)) return;
      const x = padding.left + (chartWidth * yearIndex) / Math.max(years.length - 1, 1);
      const y = padding.top + ((scale.max - value) / (scale.max - scale.min || 1)) * chartHeight;
      if (!started) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    years.forEach((year, yearIndex) => {
      const value = row.values[year];
      if (!Number.isFinite(value)) return;
      const x = padding.left + (chartWidth * yearIndex) / Math.max(years.length - 1, 1);
      const y = padding.top + ((scale.max - value) / (scale.max - scale.min || 1)) * chartHeight;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, hoverIndex === index ? 4.4 : 3.2, 0, Math.PI * 2);
      ctx.fill();
    });
  });
  ctx.globalAlpha = 1;

  canvas.dataset.chartState = JSON.stringify({
    chartType: "line",
    years,
    rows: rows.map((row) => ({ institution: row.institution, values: row.values })),
    metric,
    padding,
    width: chartWidth,
    height: chartHeight,
    scale,
    mode,
  });
}

function drawBarChart(canvas, tooltip, years, rows, metric, mode) {
  const ctx = canvas.getContext("2d");
  const cssWidth = canvas.clientWidth || 960;
  const cssHeight = canvas.clientHeight || 360;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(cssWidth * ratio);
  canvas.height = Math.floor(cssHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  const latestYear = years.at(-1);
  const bars = rows
    .map((row) => ({
      institution: row.institution,
      value: row.values[latestYear],
    }))
    .filter((row) => Number.isFinite(row.value))
    .sort((a, b) => b.value - a.value);

  if (!latestYear || !bars.length) {
    ctx.fillStyle = "#5e6d84";
    ctx.font = "14px Inter, sans-serif";
    ctx.fillText("No data to display for the current selection.", 24, 40);
    return;
  }

  const padding = mode === "compare"
    ? { top: 20, right: 14, bottom: 34, left: 28 }
    : { top: 24, right: 18, bottom: 84, left: 82 };
  const chartWidth = cssWidth - padding.left - padding.right;
  const chartHeight = cssHeight - padding.top - padding.bottom;
  const axisFont = mode === "compare" ? "13px Inter, sans-serif" : "12px Inter, sans-serif";
  const max = Math.max(...bars.map((bar) => bar.value));
  const scale = niceScale(0, max, 5);
  const stepWidth = chartWidth / bars.length;
  const barWidth = Math.max(14, Math.min(42, stepWidth * 0.62));
  const hoverIndex =
    mode === "performance" ? appState.performanceHover :
    mode === "appropriation" ? appState.appropriationHover :
    null;

  ctx.strokeStyle = "rgba(16, 39, 78, 0.12)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= scale.steps; i += 1) {
    const value = scale.max - scale.step * i;
    const y = padding.top + (chartHeight * i) / scale.steps;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + chartWidth, y);
    ctx.stroke();
    if (mode !== "compare") {
      ctx.fillStyle = "#5e6d84";
      ctx.font = axisFont;
      ctx.textAlign = "right";
      ctx.fillText(formatAxisTickValue(value, metric, mode), padding.left - 10, y + 4);
      ctx.textAlign = "left";
    }
  }

  ctx.strokeStyle = "rgba(16, 39, 78, 0.18)";
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, padding.top + chartHeight);
  ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
  ctx.stroke();

  bars.forEach((bar, index) => {
    const centerX = padding.left + stepWidth * index + stepWidth / 2;
    const barHeight = ((bar.value - scale.min) / (scale.max - scale.min || 1)) * chartHeight;
    const x = centerX - barWidth / 2;
    const y = padding.top + chartHeight - barHeight;
    const color = colorForInstitution(bar.institution);
    const isMuted = hoverIndex !== null && hoverIndex !== index;
    ctx.globalAlpha = isMuted ? 0.2 : 1;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.save();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#5e6d84";
    ctx.font = mode === "compare" ? "13px Inter, sans-serif" : "12px Inter, sans-serif";
    ctx.translate(centerX, padding.top + chartHeight + 16);
    ctx.rotate(mode === "compare" ? -Math.PI / 6 : -Math.PI / 4);
    ctx.textAlign = "right";
    ctx.fillText(formatChartInstitutionLabel(bar.institution, mode), 0, 0);
    ctx.restore();
  });
  ctx.globalAlpha = 1;

  canvas.dataset.chartState = JSON.stringify({
    chartType: "bar",
    years: [latestYear],
    rows: bars,
    metric,
    padding,
    width: chartWidth,
    height: chartHeight,
    scale,
    mode,
    barWidth,
    stepWidth,
  });
}

function getVisibleYears(years, rows) {
  return years.filter((year) => rows.some((row) => Number.isFinite(row.values[year])));
}

function onChartHover(event, mode) {
  const canvas = mode === "performance" ? performanceChart : appropriationChart;
  const tooltip = mode === "performance" ? performanceTooltip : appropriationTooltip;
  const stateKey = mode === "performance" ? "performanceHover" : "appropriationHover";
  const chartState = JSON.parse(canvas.dataset.chartState || "{}");
  if (!chartState.years?.length || !chartState.rows?.length) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const xScaled = x;
  const yScaled = y;

  if (chartState.chartType === "bar") {
    let best = null;
    chartState.rows.forEach((row, rowIndex) => {
      const centerX = chartState.padding.left + chartState.stepWidth * rowIndex + chartState.stepWidth / 2;
      const barHeight = ((row.value - chartState.scale.min) / (chartState.scale.max - chartState.scale.min || 1)) * chartState.height;
      const left = centerX - chartState.barWidth / 2;
      const top = chartState.padding.top + chartState.height - barHeight;
      const right = left + chartState.barWidth;
      const bottom = chartState.padding.top + chartState.height;
      const inside = xScaled >= left && xScaled <= right && yScaled >= top && yScaled <= bottom;
      const dist = inside ? 0 : Math.hypot(Math.max(left - xScaled, 0, xScaled - right), Math.max(top - yScaled, 0, yScaled - bottom));
      if (!best || dist < best.dist) {
        best = { dist, px: centerX, py: top, rowIndex, institution: row.institution, value: row.value, year: chartState.years[0] };
      }
    });

    if (!best || best.dist > 28) {
      appState[stateKey] = null;
      tooltip.style.display = "none";
      if (mode === "performance") renderPerformanceChart();
      else renderAppropriationChart();
      return;
    }

    appState[stateKey] = best.rowIndex;
    if (mode === "performance") renderPerformanceChart();
    else renderAppropriationChart();

    tooltip.textContent = `${shortLabel(best.institution)} • ${best.year}: ${formatMetricValue(best.value, chartState.metric, true)}`;
    tooltip.style.display = "block";
    tooltip.style.left = `${best.px}px`;
    tooltip.style.top = `${best.py}px`;
    tooltip.style.transform = "translate(-50%, calc(-100% - 12px))";

    const tooltipRect = tooltip.getBoundingClientRect();
    const minLeft = 8;
    const maxLeft = rect.width - tooltipRect.width - 8;
    let left = best.px - tooltipRect.width / 2;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    let top = best.py - tooltipRect.height - 12;
    if (top < 8) top = best.py + 12;

    tooltip.style.transform = `translate(${left - best.px}px, ${top - best.py}px)`;
    return;
  }

  let best = null;
  chartState.rows.forEach((row, rowIndex) => {
    chartState.years.forEach((year, yearIndex) => {
      const value = row.values[year];
      if (!Number.isFinite(value)) return;
      const px = chartState.padding.left + (chartState.width * yearIndex) / Math.max(chartState.years.length - 1, 1);
      const py =
        chartState.padding.top +
        ((chartState.scale.max - value) / (chartState.scale.max - chartState.scale.min || 1)) * chartState.height;
      const dist = Math.hypot(px - xScaled, py - yScaled);
      if (!best || dist < best.dist) {
        best = { dist, px, py, rowIndex, year, institution: row.institution, value };
      }
    });
  });

  if (!best || best.dist > 28) {
    appState[stateKey] = null;
    tooltip.style.display = "none";
    if (mode === "performance") renderPerformanceChart();
    else renderAppropriationChart();
    return;
  }

  appState[stateKey] = best.rowIndex;
  if (mode === "performance") renderPerformanceChart();
  else renderAppropriationChart();

  tooltip.textContent = `${shortLabel(best.institution)} • ${best.year}: ${formatMetricValue(best.value, chartState.metric, true)}`;
  tooltip.style.display = "block";
  tooltip.style.left = `${best.px}px`;
  tooltip.style.top = `${best.py}px`;
  tooltip.style.transform = "translate(-50%, calc(-100% - 12px))";

  const tooltipRect = tooltip.getBoundingClientRect();
  const minLeft = 8;
  const maxLeft = rect.width - tooltipRect.width - 8;
  let left = best.px - tooltipRect.width / 2;
  left = Math.max(minLeft, Math.min(left, maxLeft));

  let top = best.py - tooltipRect.height - 12;
  if (top < 8) top = best.py + 12;

  tooltip.style.transform = `translate(${left - best.px}px, ${top - best.py}px)`;
}

function onMiniChartHover(event, canvas, tooltip) {
  const chartState = JSON.parse(canvas.dataset.chartState || "{}");
  if (!chartState.years?.length || !chartState.rows?.length) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  let best = null;

  if (chartState.chartType === "bar") {
    chartState.rows.forEach((row, rowIndex) => {
      const centerX = chartState.padding.left + chartState.stepWidth * rowIndex + chartState.stepWidth / 2;
      const barHeight = ((row.value - chartState.scale.min) / (chartState.scale.max - chartState.scale.min || 1)) * chartState.height;
      const left = centerX - chartState.barWidth / 2;
      const top = chartState.padding.top + chartState.height - barHeight;
      const right = left + chartState.barWidth;
      const bottom = chartState.padding.top + chartState.height;
      const inside = x >= left && x <= right && y >= top && y <= bottom;
      const dist = inside ? 0 : Math.hypot(Math.max(left - x, 0, x - right), Math.max(top - y, 0, y - bottom));
      if (!best || dist < best.dist) {
        best = { dist, px: centerX, py: top, institution: row.institution, value: row.value, year: chartState.years[0] };
      }
    });
  } else {
    chartState.rows.forEach((row) => {
      chartState.years.forEach((year, yearIndex) => {
        const value = row.values[year];
        if (!Number.isFinite(value)) return;
        const px = chartState.padding.left + (chartState.width * yearIndex) / Math.max(chartState.years.length - 1, 1);
        const py =
          chartState.padding.top +
          ((chartState.scale.max - value) / (chartState.scale.max - chartState.scale.min || 1)) * chartState.height;
        const dist = Math.hypot(px - x, py - y);
        if (!best || dist < best.dist) {
          best = { dist, px, py, institution: row.institution, value, year };
        }
      });
    });
  }

  if (!best || best.dist > 28) {
    tooltip.style.display = "none";
    return;
  }

  tooltip.textContent = `${shortLabel(best.institution)} • ${best.year}: ${formatMetricValue(best.value, chartState.metric, true)}`;
  tooltip.style.display = "block";
  tooltip.style.left = `${best.px}px`;
  tooltip.style.top = `${best.py}px`;
  tooltip.style.transform = "translate(-50%, calc(-100% - 12px))";

  const tooltipRect = tooltip.getBoundingClientRect();
  const minLeft = 8;
  const maxLeft = rect.width - tooltipRect.width - 8;
  let left = best.px - tooltipRect.width / 2;
  left = Math.max(minLeft, Math.min(left, maxLeft));

  let top = best.py - tooltipRect.height - 12;
  if (top < 8) top = best.py + 12;

  tooltip.style.transform = `translate(${left - best.px}px, ${top - best.py}px)`;
}

function setTab(tab) {
  const isPerformance = tab === "performance";
  performanceTab.classList.toggle("active", isPerformance);
  appropriationsTab.classList.toggle("active", !isPerformance);
  performancePanel.hidden = !isPerformance;
  appropriationsPanel.hidden = isPerformance;
  performancePanel.classList.toggle("active", isPerformance);
  appropriationsPanel.classList.toggle("active", !isPerformance);
  performanceTab.setAttribute("aria-selected", String(isPerformance));
  appropriationsTab.setAttribute("aria-selected", String(!isPerformance));
}

function formatChartAxisLabel(label, mode) {
  const value = String(label ?? "");
  if (mode === "compare" && /^\d{4}-\d{2}$/.test(value)) {
    return value.slice(2);
  }
  return value;
}

function formatChartInstitutionLabel(institution, mode) {
  return mode === "compare" ? shortLabel(institution) : institution;
}

function getMetricDisplayMode(metric) {
  if (!metric) return "line";
  return metric.metric_name === "Median Earnings" ? "bar" : "line";
}

function formatMetricValue(value, metric, numericInput = false) {
  if (!Number.isFinite(value)) return "—";
  const format = metric.value_unit === "USD" || metric.format === "currency"
    ? "currency"
    : metric.value_unit === "pct" || metric.format === "percent"
      ? "percent"
      : metric.format || "number";
  const number = numericInput ? value : value;
  if (format === "currency") return `$${Math.round(number).toLocaleString()}`;
  if (format === "percent") {
    const percentValue = Math.abs(number) <= 1 ? number * 100 : number;
    return `${percentValue.toFixed(2)}%`;
  }
  if (Math.abs(number) >= 1000) return number.toLocaleString(undefined, { maximumFractionDigits: 0 });
  return number.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function formatAxisTickValue(value, metric, mode = "performance") {
  if (!Number.isFinite(value)) return "";
  const format = metric.value_unit === "USD" || metric.format === "currency"
    ? "currency"
    : metric.value_unit === "pct" || metric.format === "percent"
      ? "percent"
      : metric.format || "number";
  if (format === "currency") return `$${Math.round(value).toLocaleString()}`;
  if (format === "percent") {
    const percentValue = Math.abs(value) <= 1 ? value * 100 : value;
    return mode === "compare" ? `${Math.round(percentValue)}` : `${Math.round(percentValue)}%`;
  }
  return Math.round(value).toLocaleString();
}

function inferMetricUnit(metricName) {
  const lower = String(metricName || "").toLowerCase();
  if (lower.includes("percent") || lower.includes("rate")) return "pct";
  if (
    lower.includes("price") ||
    lower.includes("tuition") ||
    lower.includes("fees") ||
    lower.includes("aid") ||
    lower.includes("debt") ||
    lower.includes("loan") ||
    lower.includes("appropriation") ||
    lower.includes("earnings")
  ) {
    return "USD";
  }
  return "";
}

function inferMetricFormat(metricName, valueUnit) {
  if (valueUnit === "pct") return "percent";
  if (valueUnit === "USD") return "currency";
  const lower = String(metricName || "").toLowerCase();
  if (lower.includes("percent") || lower.includes("rate")) return "percent";
  if (
    lower.includes("price") ||
    lower.includes("tuition") ||
    lower.includes("fees") ||
    lower.includes("aid") ||
    lower.includes("debt") ||
    lower.includes("loan") ||
    lower.includes("appropriation") ||
    lower.includes("earnings")
  ) {
    return "currency";
  }
  return "number";
}

function inferMetricGroup(metricName, source) {
  const lower = String(metricName || "").toLowerCase();
  return normalizeTopicFromName(lower);
}

function normalizeTopic(topic) {
  const value = String(topic || "").trim().toLowerCase();
  if (!value) return "Other";
  if (value === "access") return "Students";
  return normalizeTopicFromName(value);
}

function normalizeTopicFromName(lower) {
  if (lower.includes("overall graduation rate within 150 percent of normal time")) return "Outcomes";
  if (lower.includes("admitted")) return "Students";
  if (lower.includes("price")) return "Cost";
  if (lower.includes("grant aid")) return "Cost";
  if (lower.includes("pell")) return "Cost";
  if (lower.includes("loan")) return "Cost";
  if (lower.includes("debt")) return "Cost";
  if (lower.includes("default")) return "Cost";
  if (lower.includes("earnings")) return "Outcomes";
  if (lower.includes("retention")) return "Outcomes";
  if (lower.includes("graduation")) return "Outcomes";
  if (lower.includes("distance education")) return "Students";
  if (lower.includes("first-time undergraduates")) return "Students";
  if (lower.includes("income band")) return "Students";
  return "Other";
}

function compareTopicGroups(a, b) {
  const aIndex = TOPIC_ORDER.indexOf(a);
  const bIndex = TOPIC_ORDER.indexOf(b);
  const safeA = aIndex === -1 ? TOPIC_ORDER.length : aIndex;
  const safeB = bIndex === -1 ? TOPIC_ORDER.length : bIndex;
  if (safeA !== safeB) return safeA - safeB;
  return String(a).localeCompare(String(b));
}

function compareMetricsWithinGroup(a, b) {
  const aKey = metricOrderKey(a.metric_name);
  const bKey = metricOrderKey(b.metric_name);
  if (aKey.group !== bKey.group) return aKey.group.localeCompare(bKey.group);
  if (aKey.rank !== bKey.rank) return aKey.rank - bKey.rank;
  if (a.metric_name !== b.metric_name) return a.metric_name.localeCompare(b.metric_name);
  return a.source.localeCompare(b.source);
}

function metricOrderKey(metricName) {
  const lower = String(metricName || "").toLowerCase();

  if (lower.includes("admitted")) {
    const rank =
      lower.includes("total") ? 0 :
      lower.includes("men") ? 1 :
      lower.includes("women") ? 2 : 3;
    return { group: "00_admissions", rank };
  }
  if (lower.includes("pell")) {
    return { group: "01_pell", rank: lower.includes("percent") ? 0 : 1 };
  }
  if (lower.includes("federal grant aid")) {
    return { group: "02_federal_grant", rank: lower.includes("percent") ? 0 : 1 };
  }
  if (lower.includes("institutional grant aid")) {
    return { group: "03_institutional_grant", rank: lower.includes("percent") ? 0 : 1 };
  }
  if (lower.includes("federal student loans")) {
    return { group: "04_federal_loans", rank: lower.includes("percent") ? 0 : 1 };
  }
  if (lower.includes("student loans")) {
    return { group: "05_student_loans", rank: lower.includes("percent") ? 0 : 1 };
  }
  if (lower.includes("in-state students living on campus")) {
    return { group: "06_price_instate_on", rank: 0 };
  }
  if (lower.includes("out-of-state students living on campus")) {
    return { group: "07_price_outstate_on", rank: 0 };
  }
  if (lower.includes("in-state students living off campus (not with family)")) {
    return { group: "08_price_instate_off", rank: 0 };
  }
  if (lower.includes("out-of-state students living off campus (not with family)")) {
    return { group: "09_price_outstate_off", rank: 0 };
  }
  if (lower.includes("in-state students living off campus (with family)")) {
    return { group: "10_price_instate_family", rank: 0 };
  }
  if (lower.includes("out-of-state students living off campus (with family)")) {
    return { group: "11_price_outstate_family", rank: 0 };
  }
  if (lower.includes("in-state")) {
    return { group: "12_residency_instate", rank: 0 };
  }
  if (lower.includes("out-of-state")) {
    return { group: "13_residency_outstate", rank: 0 };
  }
  if (lower.includes("foreign countries")) {
    return { group: "14_residency_foreign", rank: 0 };
  }
  if (lower.includes("income band")) {
    const match =
      lower.includes("$0-$30,000") ? 0 :
      lower.includes("$30,001-$48,000") ? 1 :
      lower.includes("$48,001-$75,000") ? 2 :
      lower.includes("$75,001-$110,000") ? 3 : 4;
    return { group: "15_income_band", rank: match };
  }
  if (lower.includes("graduation rate")) {
    const rank =
      lower.includes("within 4 years") ? 0 :
      lower.includes("within 5 years") ? 1 :
      lower.includes("within 6 years") ? 2 : 3;
    return { group: "16_graduation", rank };
  }
  if (lower.includes("median debt")) {
    return { group: "17_debt", rank: 0 };
  }
  if (lower.includes("default")) {
    return { group: "18_default", rank: 0 };
  }
  if (lower.includes("median earnings")) {
    return { group: "19_earnings", rank: 0 };
  }
  if (lower.includes("retention")) {
    return { group: "20_retention", rank: 0 };
  }
  if (lower.includes("distance education")) {
    const rank =
      lower.includes("exclusively") ? 0 :
      lower.includes("some but not all") ? 1 :
      lower.includes("not enrolled in any") ? 2 : 3;
    return { group: "22_distance", rank };
  }
  return { group: `99_${lower}`, rank: 0 };
}

function parseCSV(text) {
  const rows = [];
  let current = [];
  let value = "";
  let inQuotes = false;
  const pushValue = () => {
    current.push(value);
    value = "";
  };
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"') {
      if (inQuotes && next === '"') {
        value += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (!inQuotes && char === ",") {
      pushValue();
      continue;
    }
    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") i += 1;
      pushValue();
      if (current.some((cell) => String(cell).trim())) rows.push(current);
      current = [];
      continue;
    }
    value += char;
  }
  if (value.length || current.length) {
    pushValue();
    if (current.some((cell) => String(cell).trim())) rows.push(current);
  }
  const header = rows.shift() || [];
  return rows.map((row) => {
    const obj = {};
    header.forEach((key, index) => {
      obj[key] = row[index] ?? "";
    });
    return obj;
  });
}

function parseNumeric(value) {
  const cleaned = String(value ?? "")
    .replace(/[$,%\s]/g, "")
    .replace(/,/g, "")
    .trim();
  if (!cleaned || cleaned === "NA") return Number.NaN;
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : Number.NaN;
}

function resolveInstitutionName(value) {
  const cleaned = String(value || "").trim();
  return INSTITUTION_ALIASES[cleaned] || cleaned;
}

function colorForInstitution(institution) {
  return SCHOOL_COLORS[institution] || FALLBACK_COLORS[Math.abs(hashCode(institution)) % FALLBACK_COLORS.length];
}

function shortLabel(institution) {
  return SCHOOL_CODES[institution] || institution;
}

function hashCode(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) | 0;
  return hash;
}

function niceScale(min, max, steps) {
  if (min === max) {
    const pad = min === 0 ? 1 : Math.abs(min * 0.1);
    return { min: min - pad, max: max + pad, step: pad, steps: 2 };
  }
  const range = niceNum(max - min, false);
  const step = niceNum(range / (steps - 1), true);
  const niceMin = Math.floor(min / step) * step;
  const niceMax = Math.ceil(max / step) * step;
  return { min: niceMin, max: niceMax, step, steps: Math.round((niceMax - niceMin) / step) };
}

function niceNum(range, round) {
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / Math.pow(10, exponent);
  let niceFraction;
  if (round) {
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
  } else {
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;
  }
  return niceFraction * Math.pow(10, exponent);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function throttle(fn, wait) {
  let last = 0;
  let timeout = null;
  return (...args) => {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      last = now;
      fn(...args);
      return;
    }
    if (timeout) return;
    timeout = setTimeout(() => {
      last = Date.now();
      timeout = null;
      fn(...args);
    }, remaining);
  };
}
