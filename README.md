# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🚛 TransitOps - Core Backend API
<img width="626" height="478" alt="image" src="https://github.com/user-attachments/assets/662cf529-7ef3-4262-bb16-4e0b7c4fc30d" />

<img width="827" height="426" alt="image" src="https://github.com/user-attachments/assets/2ca5fc6e-36cd-40bb-9599-ac94efe39adc" />

<img width="802" height="422" alt="image" src="https://github.com/user-attachments/assets/8a9d7697-f411-4f1b-8244-4cf7ef906a3a" />

<img width="827" height="491" alt="image" src="https://github.com/user-attachments/assets/fc897167-9753-4cfa-8286-f5421506450b" />




![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.0+-lightgrey.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)

TransitOps is a centralized, high-performance logistics platform designed to manage the complete lifecycle of transport operations. This repository contains the backend engine powering the platform.

## 🚀 The Business Value
Managing a fleet requires absolute data accuracy. This backend replaces chaotic manual spreadsheets with a robust relational database and a secure REST API. 

**Key Technical Achievements:**
* **ACID-Compliant Transactions:** The dispatch engine safely executes multi-table updates. If a vehicle is dispatched but the driver update fails, the entire transaction rolls back, preventing "ghost" assignments.
* **Real-Time Aggregation:** The analytics engine processes fleet utilization, maintenance costs, and fuel logs into a single, highly-optimized master payload for the frontend dashboard.
* **State Management:** Enforces strict business rules (e.g., a vehicle cannot be dispatched if its status is 'In Shop').

## 🔌 API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/vehicles` | `GET` | Fetches all fleet assets and current availability status. |
| `/api/drivers` | `GET` | Fetches all registered drivers. |
| `/api/trips/dispatch` | `POST` | **[Core Engine]** Validates cargo limits and dispatches a trip, updating asset statuses transactionally. |
| `/api/maintenance` | `POST` | Logs repair costs and automatically routes vehicle to 'In Shop'. |
| `/api/fuel` | `POST` | Records fuel consumption for ROI calculations. |
| `/api/dashboard/stats` | `GET` | **[Analytics]** Aggregates KPIs, fleet utilization %, and total operational costs per vehicle. |

## 🛠️ Local Development Setup

1. Ensure MySQL is running and execute the provided schema.
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate



