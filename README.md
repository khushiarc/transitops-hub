# 🚛 TransitOps - Core Backend API

![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.0+-lightgrey.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)

TransitOps is a centralized, high-performance logistics platform designed to manage the complete lifecycle of transport operations. This repository contains the backend engine powering the platform.

## 🚀 The Business Value

Managing a fleet requires absolute data accuracy. This backend replaces chaotic manual spreadsheets with a robust relational database and a secure REST API.

**Key Technical Achievements:**

- **ACID-Compliant Transactions:** The dispatch engine safely executes multi-table updates. If a vehicle is dispatched but the driver update fails, the entire transaction rolls back, preventing "ghost" assignments.
- **Real-Time Aggregation:** The analytics engine processes fleet utilization, maintenance costs, and fuel logs into a single, highly-optimized master payload for the frontend dashboard.
- **State Management:** Enforces strict business rules (e.g., a vehicle cannot be dispatched if its status is 'In Shop').

## 🔌 API Reference

| Endpoint               | Method | Description                                                                                              |
| ---------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| `/api/vehicles`        | `GET`  | Fetches all fleet assets and current availability status.                                                |
| `/api/drivers`         | `GET`  | Fetches all registered drivers.                                                                          |
| `/api/trips/dispatch`  | `POST` | **[Core Engine]** Validates cargo limits and dispatches a trip, updating asset statuses transactionally. |
| `/api/maintenance`     | `POST` | Logs repair costs and automatically routes vehicle to 'In Shop'.                                         |
| `/api/fuel`            | `POST` | Records fuel consumption for ROI calculations.                                                           |
| `/api/dashboard/stats` | `GET`  | **[Analytics]** Aggregates KPIs, fleet utilization %, and total operational costs per vehicle.           |

## 🛠️ Local Development Setup

1. Ensure MySQL is running and execute the provided schema.
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
