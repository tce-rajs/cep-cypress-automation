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

  // Environment Information
  const envContent = [
    `Browser=Chrome`,
    `OS=${process.platform} ${process.arch}`,
    `Node.js=${process.version}`,
    `Cypress=v13.17.0`,
    `Framework=Page Object Model (POM)`,
    `BaseURL=https://ce-qa-school.devstudi.com/teach/whiteboard`,
    `Environment=QA`
  ].join('\n');

  fs.writeFileSync(path.join(resultsDir, 'environment.properties'), envContent);

  // Executor Information
  const executorInfo = {
    name: "Cypress Allure Runner",
    type: "cypress",
    url: "https://ce-qa-school.devstudi.com",
    buildOrder: Date.now(),
    buildName: `Execution @ ${new Date().toLocaleString()}`,
    buildUrl: ""
  };
  fs.writeFileSync(path.join(resultsDir, 'executor.json'), JSON.stringify(executorInfo, null, 2));
}

/**
 * Generate Allure Report
 */
function generateReport() {
  console.log('--- Generating Allure Report ---');
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
 * Complete test suite execution flow (cross-platform, windows safe)
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
