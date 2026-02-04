export const urls = {
  dashboard: process.env.BASE_URL || "http://localhost:3000",
  login: process.env.LOGIN_URL || "http://localhost:3000/Account/Login",
  process: process.env.PROCESS_URL || "http://localhost:3000/processDashboard",
  processCreate:
    process.env.PROCESS_CREATE_URL || "http://localhost:3000/processDesigner",
} as const;
