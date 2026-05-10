# Nexus Job Board — Backend

REST API server for the Nexus Job Board application. Built with Node.js, Express, MongoDB, and JWT authentication.

![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=flat&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4-000000?style=flat&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat&logo=jsonwebtokens)

## 🔗 Links

- **Live API:** [job-board-server-zhlo.onrender.com](https://job-board-server-zhlo.onrender.com)
- **Frontend:** [nexus-jobboard-app.vercel.app](https://nexus-jobboard-app.vercel.app)
- **GitHub (Server):** [github.com/tomalkhan55/job-board-server](https://github.com/tomalkhan55/job-board-server)
- **GitHub (Client):** [github.com/tomalkhan55/job-board](https://github.com/tomalkhan55/job-board)

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Jobs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get all jobs (with filters) |
| GET | `/api/jobs/:id` | Get single job |
| POST | `/api/jobs` | Create job (employer only) |
| PUT | `/api/jobs/:id` | Update job (owner only) |
| DELETE | `/api/jobs/:id` | Delete job (owner only) |
| GET | `/api/jobs/my` | Get my posted jobs |

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js + Express | Server framework |
| MongoDB + Mongoose | Database |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| cors | Cross-origin requests |
| dotenv | Environment variables |

## Getting Started

```bash
git clone https://github.com/tomalkhan55/job-board-server.git
cd job-board-server
npm install
```

Create `.env` file:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
CLIENT_URL=http://localhost:5173
```

Run locally:
```bash
npm run dev
```

## Seed Demo Data

```bash
node seed.js
```

Creates 20 demo jobs and 2 demo users:
```
Employer  → employer@demo.com  / demo1234
Jobseeker → jobseeker@demo.com / demo1234
```

## Deploy to Render

1. Connect GitHub repo to Render
2. Set environment variables
3. Build Command: `npm install`
4. Start Command: `node index.js`

## License

MIT License — free to use for personal and commercial projects.

---

Built with Node.js + Express + MongoDB