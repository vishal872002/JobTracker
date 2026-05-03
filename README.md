# JobAppTracker

A full-stack kanban board to track job applications — built with the MERN stack and GraphQL, deployed on Microsoft Azure.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Apollo](https://img.shields.io/badge/Apollo-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)

## Live Demo

| Service | URL |
|---|---|
| Frontend | https://jobapptracker-frontend.azurestaticapps.net |
| GraphQL API | https://jobapptracker-api.azurewebsites.net/graphql |

---

## Overview

Job hunting is messy! — applications scattered across LinkedIn, Naukri, and company portals with no single view of where things stand. JobAppTracker brings everything into one place with a clean kanban board so you always know what's applied, what's in interview, and what's been offered or rejected.

---

## Features

- Kanban board with four stages — Applied, Interview, Offer, Rejected
- Drag and drop cards between columns to update status
- Add company name, role, JD link, and notes per application
- Stats dashboard — total applications, interview count, offer count, response rate
- Single GraphQL endpoint handling all queries and mutations
- Dark blue theme with fully responsive layout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Apollo Client, dnd-kit, Create React App |
| Backend | Node.js, Apollo Server, GraphQL |
| Database | MongoDB Atlas, Mongoose |
| Deployment | Azure Static Web Apps, Azure App Service |
| State Management | React Context API |

---

## Project Structure

```
JobAppTracker/
├── client/
│   ├── build/                          # Production build output
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Board/
│       │   │   └── Board.jsx           # DnD context and drag logic
│       │   ├── Column/
│       │   │   └── Column.jsx          # Droppable column
│       │   ├── Dashboard/
│       │   │   └── Stats.jsx           # Stats bar
│       │   ├── JobCard/
│       │   │   └── JobCard.jsx         # Draggable job card
│       │   └── JobModal/
│       │       └── JobModal.jsx        # Add job form
│       ├── context/
│       │   └── JobContext.jsx          # Apollo hooks + global state
│       ├── pages/
│       │   └── BoardPage.jsx
│       ├── services/
│       │   ├── apolloClient.js         # Apollo Client setup
│       │   └── queries.js              # All GQL queries & mutations
│       ├── App.js
│       ├── index.js
│       └── index.css
└── server/
    ├── graphql/
    │   ├── typeDefs.js                 # GraphQL schema
    │   └── resolvers.js                # Query & mutation resolvers
    ├── models/
    │   └── Job.js                      # Mongoose schema
    └── db/
        └── connect.js                  # MongoDB connection
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### 1. Clone the repo

```bash
git clone https://github.com/vishal-a-s/JobAppTracker.git
cd JobAppTracker
```

### 2. Setup backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/job-tracker
PORT=5000
```

```bash
npm run dev
```

GraphQL playground: `http://localhost:5000/graphql`

### 3. Setup frontend

```bash
cd client
npm install
npm start
```

App runs at: `http://localhost:3000`

---

## GraphQL API

### Query — get all jobs
```graphql
query {
  jobs {
    _id
    company
    role
    status
    jdLink
    notes
    appliedDate
  }
}
```

### Mutation — add job
```graphql
mutation {
  addJob(company: "Google", role: "SDE", status: "applied") {
    _id
    company
    role
    status
  }
}
```

### Mutation — update status (drag and drop)
```graphql
mutation {
  updateJob(id: "abc123", status: "interview") {
    _id
    status
  }
}
```

### Mutation — delete job
```graphql
mutation {
  deleteJob(id: "abc123")
}
```

---

## Deployment

### Architecture

```
Browser → Azure Static Web Apps (React)
               ↓
     Azure App Service (Apollo Server / GraphQL)
               ↓
        MongoDB Atlas (Database)
```

### Backend — Azure App Service

```bash
# Create resource group
az group create --name JobAppTracker-rg --location centralus

# Create App Service plan
az appservice plan create \
  --name JobAppTracker-plan \
  --resource-group JobAppTracker-rg \
  --sku B1 \
  --is-linux

# Create web app
az webapp create \
  --name jobapptracker-api \
  --resource-group JobAppTracker-rg \
  --plan JobAppTracker-plan \
  --runtime "NODE:22-lts"

# Set environment variables
az webapp config appsettings set \
  --name jobapptracker-api \
  --resource-group JobAppTracker-rg \
  --settings MONGO_URI="your_atlas_connection_string" \
             NODE_ENV="production" \
             SCM_DO_BUILD_DURING_DEPLOYMENT="true"

# Deploy
cd server
zip -r ../server.zip . -x "node_modules/*"
az webapp deployment source config-zip \
  --name jobapptracker-api \
  --resource-group JobAppTracker-rg \
  --src ../server.zip
```

### Frontend — Azure Static Web Apps

1. Go to [portal.azure.com](https://portal.azure.com)
2. Search **Static Web Apps** → **Create**
3. Connect your GitHub repo
4. Build settings:
   - App location: `/client`
   - Output location: `build`
5. Click **Review + Create**

Azure auto-generates a GitHub Actions workflow — every push to `main` triggers a new deployment.

### MongoDB Atlas — Network Access

Go to **Atlas → Network Access → Add IP Address** → add `0.0.0.0/0` to allow Azure connections.

---

## Response Rate Formula

```
Response Rate = (Interview + Offer) / Total Applied × 100
```

Rejections are excluded — only positive responses count.

---

## License

MIT
