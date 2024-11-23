const colorProfiles = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[41m',
  green: '\x1b[42m',
  yellow: '\x1b[43m',
  white: '\x1b[47m',
  blue: '\x1b[44m',
};

const SEVERITY: { [key: string]: number } = {
  DEBUG: 4,
  INFO: 3,
  WARN: 2,
  ERROR: 1,
  FATAL: 0,
};

class Logger {
  private readonly appName = process.env.npm_package_name as string;
  private readonly host = this.getDeviceHost();
  private readonly severity: number = SEVERITY.DEBUG;

  constructor(severity: string) {
    if (Object.keys(SEVERITY).includes(severity)) {
      this.severity = SEVERITY[severity] || SEVERITY.DEBUG;
    } else {
      this.warn(
        `Invalid Severity Type. Using Default Severity [${
          Object.keys(SEVERITY)[Object.values(SEVERITY).indexOf(this.severity)]
        }]`,
      );
    }
  }

  private getDeviceHost() {
    const interfaces = require('os').networkInterfaces();
    const addresses = interfaces.en0 || interfaces.eth0 || interfaces['Wi-Fi'];
    const address = addresses?.find(
      (addr: any) => addr.family === 'IPv4' && !addr.internal,
    );
    let ipAddress = address ? address.address : 'localhost';
    return ipAddress;
  }

  public debug(msg: string) {
    if (this.severity <= SEVERITY.DEBUG) {
      const profile = `${colorProfiles.white + colorProfiles.bright}[DEBUG]${
        colorProfiles.reset
      }`;
      const log = JSON.stringify({
        timestamp: new Date().toISOString(),
        name: this.appName,
        host: this.host,
        pid: process.pid,
        msg: msg,
      });
      console.debug(profile + log);
    }
  }

  public info(msg: string) {
    if (this.severity <= SEVERITY.INFO) {
      const profile = `${colorProfiles.green + colorProfiles.bright}[INFO]${
        colorProfiles.reset
      }`;
      const log = JSON.stringify({
        timestamp: new Date().toISOString(),
        name: this.appName,
        host: this.host,
        pid: process.pid,
        msg: msg,
      });
      console.info(profile + log);
    }
  }

  public warn(msg: string) {
    if (this.severity <= SEVERITY.WARN) {
      const profile = `${colorProfiles.yellow + colorProfiles.bright}[WARN]${
        colorProfiles.reset
      }`;
      const log = JSON.stringify({
        timestamp: new Date().toISOString(),
        name: this.appName,
        host: this.host,
        msg: msg,
      });
      console.warn(profile + log);
    }
  }

  public error(msg: string) {
    if (this.severity <= SEVERITY.ERROR) {
      const profile = `${colorProfiles.red + colorProfiles.bright}[ERROR]${
        colorProfiles.reset
      }`;
      const log = JSON.stringify({
        timestamp: new Date().toISOString(),
        name: this.appName,
        host: this.host,
        msg: msg,
      });
      console.error(profile + log);
    }
  }

  public fatal(msg: string) {
    if (this.severity >= SEVERITY.FATAL) {
      const profile = `${colorProfiles.blue + colorProfiles.bright}[FATAL]${
        colorProfiles.reset
      }`;
      const log = JSON.stringify({
        timestamp: new Date().toISOString(),
        name: this.appName,
        host: this.host,
        pid: process.pid,
        msg: msg,
      });
      console.debug(profile + log);
    }
  }
}

export default function () {
  const LOG_SEVERITY = process.env.LOG_SEVERITY as string;
  const logger = new Logger(LOG_SEVERITY);
  return logger;
}
