# Logger.init

A powerful and flexible Node.js logging module that provides:

- **Timestamped logs:** Logs are stamped with the current timestamp.
- **Process ID:** Logs include the process ID for easier debugging.
- **Application Name:** Logs are labeled with the application name.
- **System Hostname:** Logs include the system hostname.
- **Log Severity:** Logs can be categorized by severity (e.g., info, warn, error).

## How to use

## Install

```bash
npm install logger.init
```

## Use

```bash
import logger from "logger.init"

const consle = logger();
console.debug("This is a debug log");
console.warn("It's awarning message");
console.error("It's an error");

```

## Setup code in local

### Clone the Repository

```bash
git clone https://github.com/101yogeshsharma/logger.init.git
```

### Install Node Modules

```bash
npm install
```

### Build

```bash
npm run build
```
