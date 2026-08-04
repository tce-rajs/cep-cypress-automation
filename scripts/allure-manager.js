const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const projectRoot = path.join(__dirname, '..');
const resultsDir = path.join(projectRoot, 'allure-results');
const reportDir = path.join(projectRoot, 'allure-report');
const historyInReport = path.join(reportDir, 'history');
const historyInResults = path.join(resultsDir, 'history');
const tempHistoryDir = path.join(projectRoot, '.allure-history-temp');

const command = process.argv[2];

/**
 * Preserve history before test run
 */
function beforeTest() {
  console.log('--- Preserving Allure History & Cleaning Old Results ---');
  
  // 1. Save history from existing allure-report if present
  if (fs.existsSync(historyInReport)) {
    console.log('Found existing report history. Backing up history...');
    if (fs.existsSync(tempHistoryDir)) {
      fs.rmSync(tempHistoryDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempHistoryDir, { recursive: true });
    fs.cpSync(historyInReport, tempHistoryDir, { recursive: true });
  } else if (fs.existsSync(historyInResults)) {
    console.log('Found results history. Backing up history...');
    if (fs.existsSync(tempHistoryDir)) {
      fs.rmSync(tempHistoryDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempHistoryDir, { recursive: true });
    fs.cpSync(historyInResults, tempHistoryDir, { recursive: true });
  }

  // 2. Clean allure-results
  if (fs.existsSync(resultsDir)) {
    fs.rmSync(resultsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(resultsDir, { recursive: true });

  // 3. Restore history into allure-results/history
  if (fs.existsSync(tempHistoryDir)) {
    fs.cpSync(tempHistoryDir, historyInResults, { recursive: true });
    fs.rmSync(tempHistoryDir, { recursive: true, force: true });
    console.log('✔ History restored to allure-results/history successfully.');
  } else {
    console.log('ℹ No previous history found. Starting fresh history tracking.');
  }
}

/**
 * Add environment and executor metadata to allure-results
 */
function addMetaData() {
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  // Custom Environment Information for Report Overview Header
  const envContent = [
    `Project=CEP V2 Automation`,
    `Application=CEP V2 Whiteboard & Playlist`,
    `Environment=QA / Staging`,
    `Framework=Cypress 13 (Page Object Model)`,
    `Browser=Google Chrome (Headless)`,
    `BaseURL=https://ce-qa-school.devstudi.com/teach/whiteboard`,
    `Total Scenarios=60 Automated Scenarios`
  ].join('\n');

  fs.writeFileSync(path.join(resultsDir, 'environment.properties'), envContent);

  // Custom Executor Information
  const executorInfo = {
    name: "CEP V2 Cypress Automation Engine",
    type: "cypress",
    url: "https://ce-qa-school.devstudi.com/teach/whiteboard",
    buildOrder: Date.now(),
    buildName: `CEP V2 Execution @ ${new Date().toLocaleString()}`,
    buildUrl: ""
  };
  fs.writeFileSync(path.join(resultsDir, 'executor.json'), JSON.stringify(executorInfo, null, 2));
}

/**
 * Customize report HTML and Summary JSON widget heading title
 */
function customizeReportMetadata() {
  const summaryPath = path.join(reportDir, 'widgets', 'summary.json');
  if (fs.existsSync(summaryPath)) {
    try {
      const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));
      summary.reportName = "CEP V2 Test Automation Report";
      fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
      console.log('✔ Custom Allure Report Title updated to: "CEP V2 Test Automation Report"');
    } catch (e) {
      console.error('Failed to update summary.json reportName:', e.message);
    }
  }

  const indexPath = path.join(reportDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    try {
      let html = fs.readFileSync(indexPath, 'utf-8');
      html = html.replace(/<title>.*<\/title>/i, '<title>CEP V2 Test Automation Report</title>');
      fs.writeFileSync(indexPath, html);
    } catch (e) {
      console.error('Failed to update index.html title:', e.message);
    }
  }
}

/**
 * Generate Allure Report
 */
function generateReport() {
  console.log('--- Generating Custom Allure Report ---');
  addMetaData();

  // Ensure history folder is copied if present
  if (!fs.existsSync(historyInResults) && fs.existsSync(historyInReport)) {
    fs.cpSync(historyInReport, historyInResults, { recursive: true });
  }

  try {
    execSync('npx allure generate allure-results --clean -o allure-report', {
      cwd: projectRoot,
      stdio: 'inherit'
    });
    customizeReportMetadata();
    console.log('✔ Allure report generated successfully at allure-report/');
  } catch (err) {
    console.error('❌ Failed to generate Allure report:', err.message);
  }
}

/**
 * Open Allure Report (interactive or detached)
 */
function openReport(detached = false) {
  console.log('--- Opening Allure Report in browser ---');
  if (detached) {
    try {
      const p = spawn('npx', ['allure', 'open', 'allure-report'], {
        cwd: projectRoot,
        shell: true,
        detached: true,
        stdio: 'ignore'
      });
      p.unref();
      console.log('✔ Report web server launched in background. Opening browser...');
    } catch (err) {
      console.error('❌ Failed to launch Allure report:', err.message);
    }
  } else {
    try {
      execSync('npx allure open allure-report', {
        cwd: projectRoot,
        stdio: 'inherit'
      });
    } catch (err) {
      console.error('❌ Failed to open Allure report:', err.message);
    }
  }
}

/**
 * Complete test suite execution flow
 */
function runAll() {
  beforeTest();

  console.log('--- Executing Cypress Tests ---');
  try {
    execSync('npx cypress run --browser chrome --env allure=true', {
      cwd: projectRoot,
      stdio: 'inherit'
    });
  } catch (err) {
    console.log('⚠️ Cypress test run finished with failures or warnings.');
  }

  generateReport();
  openReport(true);
}

// Execute based on CLI argument
switch (command) {
  case 'before':
    beforeTest();
    break;
  case 'generate':
    generateReport();
    break;
  case 'open':
    openReport(false);
    break;
  case 'run':
  default:
    runAll();
    break;
}
