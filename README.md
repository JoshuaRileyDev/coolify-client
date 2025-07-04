# @joshuarileydev/coolify-client

A comprehensive TypeScript client library for interacting with the [Coolify](https://coolify.io) API. Coolify is an open-source & self-hostable Heroku / Netlify alternative that allows you to deploy applications, databases, and services with ease.

## Features

- 🔥 **Full TypeScript support** with complete type definitions
- 🛡️ **Type-safe API interactions** with Zod schema validation
- 🚀 **Comprehensive API coverage** for all Coolify endpoints
- 📦 **Modern ES6+ support** with both CommonJS and ESM builds
- 🎯 **Simple and intuitive API** design
- 📖 **Extensive documentation** and examples

## Installation

```bash
npm install @joshuarileydev/coolify-client
```

## Quick Start

```typescript
import { CoolifyClient } from '@joshuarileydev/coolify-client';

// Initialize the client
const coolify = new CoolifyClient({
  apiUrl: 'https://your-coolify-instance.com',
  apiToken: 'your-api-token',
  teamId: 'your-team-id' // optional
});

// Get Coolify version
const version = await coolify.getVersion();
console.log('Coolify version:', version.data?.version);

// List all applications
const applications = await coolify.listApplications();
console.log('Applications:', applications.data);

// Deploy an application
const deployment = await coolify.deployApplication('app-id', 'v1.0.0');
console.log('Deployment started:', deployment.data?.id);
```

## Configuration

The `CoolifyClient` accepts a configuration object with the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `apiUrl` | string | ✅ | Your Coolify instance URL (e.g., `https://coolify.example.com`) |
| `apiToken` | string | ✅ | Your Coolify API token |
| `teamId` | string | ❌ | Team ID for team-specific operations |

### Getting Your API Token

1. Log into your Coolify instance
2. Go to **Settings** → **API Tokens**
3. Create a new API token with the required permissions
4. Copy the token for use in your application

## Understanding Coolify Resources and Relationships

### Resource Hierarchy

Coolify organizes resources in a hierarchical structure:

```
Teams
└── Projects
    └── Servers
        └── Applications/Databases/Services
```

### Finding Required IDs and UUIDs

Many API endpoints require specific IDs or UUIDs. Here's how to find them:

#### 1. **Project UUID** (`project_uuid`)
```typescript
// List all projects to find project UUIDs
const projects = await coolify.listProjects();
projects.data.forEach(project => {
  console.log(`Project: ${project.name}, UUID: ${project.id}`);
});
```

#### 2. **Server UUID** (`server_uuid`)
```typescript
// List all servers to find server UUIDs
const servers = await coolify.listServers();
servers.data.forEach(server => {
  console.log(`Server: ${server.name}, UUID: ${server.id}`);
});
```

#### 3. **GitHub App UUID** (`github_app_uuid`)
To find GitHub App UUIDs:
1. In Coolify UI, go to **Settings** → **GitHub Apps**
2. The UUID is shown for each configured GitHub App
3. Or use the API to list GitHub Apps (if endpoint available)

#### 4. **Application ID**
```typescript
// List applications to find their IDs
const apps = await coolify.listApplications();
apps.data.forEach(app => {
  console.log(`App: ${app.name}, ID: ${app.id}`);
});
```

### Resource Relationships Example

```typescript
// Example: Creating a complete application setup

// 1. First, create or identify a project
const project = await coolify.createProject({
  name: 'my-production-project',
  description: 'Production environment'
});
const projectUuid = project.data?.id;

// 2. Create or identify a server
const server = await coolify.createServer({
  name: 'production-server',
  ip: '192.168.1.100',
  user: 'root'
});
const serverUuid = server.data?.id;

// 3. Now you can create an application using these relationships
const app = await coolify.createApplication({
  name: 'my-app',
  project_uuid: projectUuid,
  server_uuid: serverUuid,
  git_repository: 'https://github.com/user/repo',
  git_branch: 'main'
});
```

## API Reference

### Applications

```typescript
// List all applications
const apps = await coolify.listApplications();

// Get a specific application
const app = await coolify.getApplication('app-id');

// Create a new application
const newApp = await coolify.createApplication({
  name: 'my-app',
  git_repository: 'https://github.com/user/repo',
  git_branch: 'main'
});

// Update an application
const updatedApp = await coolify.updateApplication('app-id', {
  description: 'Updated description'
});

// Delete an application
await coolify.deleteApplication('app-id');

// Application lifecycle management
await coolify.startApplication('app-id');
await coolify.stopApplication('app-id');
await coolify.restartApplication('app-id');

// Deploy an application
const deployment = await coolify.deployApplication('app-id', 'v1.0.0');
```

#### Create Private GitHub App Application

This endpoint allows you to create an application from a private GitHub repository using a configured GitHub App.

```typescript
// Create an application from a private GitHub repository
const privateApp = await coolify.createPrivateGithubAppApplication({
  // Required fields
  project_uuid: 'your-project-uuid',      // Get from listProjects()
  server_uuid: 'your-server-uuid',        // Get from listServers()
  github_app_uuid: 'your-github-app-uuid',// From Coolify UI > Settings > GitHub Apps
  git_repository: 'https://github.com/org/private-repo',
  git_branch: 'main',
  name: 'my-private-app',
  
  // Optional fields
  domains: 'app.example.com,www.app.example.com',
  ports_exposes: '3000',
  ports_mappings: '3000:80',
  base_directory: '/app',
  build_pack: 'nixpacks', // or 'dockerfile', 'static', etc.
  install_command: 'npm install',
  build_command: 'npm run build',
  start_command: 'npm start',
  instant_deploy: true,
  
  // Docker-specific options
  dockerfile: './Dockerfile',
  docker_registry_image_name: 'myapp',
  docker_registry_image_tag: 'latest',
  
  // Environment configuration
  environment_name: 'production',
  
  // Advanced options
  custom_labels: 'traefik.enable=true',
  custom_docker_run_options: '--memory=2g',
  custom_nginx_configuration: 'client_max_body_size 100M;',
  watch_paths: './src,./public',
});

console.log('Private app created with UUID:', privateApp.data?.uuid);
```

**Important Notes:**
- You must have a GitHub App configured in Coolify before using this endpoint
- The repository must be accessible by the configured GitHub App
- The `github_app_uuid` can be found in Coolify UI under Settings → GitHub Apps

### Databases

```typescript
// List all databases
const databases = await coolify.listDatabases();

// Get a specific database
const db = await coolify.getDatabase('db-id');

// Create a new database
const newDb = await coolify.createDatabase({
  name: 'my-postgres-db',
  type: 'postgresql'
});

// Delete a database
await coolify.deleteDatabase('db-id');
```

### Servers

```typescript
// List all servers
const servers = await coolify.listServers();

// Get a specific server
const server = await coolify.getServer('server-id');

// Create a new server
const newServer = await coolify.createServer({
  name: 'production-server',
  ip: '192.168.1.100',
  user: 'root'
});

// Validate server connection
await coolify.validateServer('server-id');
```

### Projects

```typescript
// List all projects
const projects = await coolify.listProjects();

// Get a specific project
const project = await coolify.getProject('project-id');

// Create a new project
const newProject = await coolify.createProject({
  name: 'my-project',
  description: 'My awesome project'
});
```

### Deployments

```typescript
// List deployments for an application
const deployments = await coolify.listDeployments('app-id');

// Get a specific deployment
const deployment = await coolify.getDeployment('deployment-id');

// Deploy an application with optional tag
const newDeployment = await coolify.deployApplication('app-id', 'v1.2.0');
```

### Services

```typescript
// List all services
const services = await coolify.listServices();

// Get a specific service
const service = await coolify.getService('service-id');

// Create a new service
const newService = await coolify.createService({
  name: 'redis-service',
  docker_compose: 'version: "3.8"...'
});

// Service lifecycle management
await coolify.startService('service-id');
await coolify.stopService('service-id');
```

### Teams

```typescript
// List all teams
const teams = await coolify.listTeams();

// Get a specific team
const team = await coolify.getTeam('team-id');
```

## Error Handling

The client throws errors for failed API requests. You should wrap your calls in try-catch blocks:

```typescript
try {
  const app = await coolify.getApplication('non-existent-id');
} catch (error) {
  console.error('Failed to get application:', error.message);
}
```

## Response Format

All API responses follow the Coolify API format:

```typescript
interface CoolifyApiResponse<T> {
  data?: T;
  message?: string;
  success?: boolean;
}

interface ListResponse<T> {
  data: T[];
  links?: {
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
  };
  meta?: {
    current_page: number;
    from?: number;
    last_page: number;
    per_page: number;
    to?: number;
    total: number;
  };
}
```

## TypeScript Support

This library is written in TypeScript and provides comprehensive type definitions for all API endpoints and responses. You'll get full IntelliSense support and compile-time type checking.

```typescript
import type { 
  Application, 
  Database, 
  Server, 
  CoolifyConfig,
  CreatePrivateGithubAppApplicationRequest,
  CreatePrivateGithubAppApplicationResponse
} from '@joshuarileydev/coolify-client';

const config: CoolifyConfig = {
  apiUrl: 'https://coolify.example.com',
  apiToken: 'your-token'
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Coolify documentation](https://coolify.io/docs)
2. Open an issue on [GitHub](https://github.com/joshuarileydev/coolify-client/issues)
3. Join the [Coolify Discord](https://discord.gg/coolify) community

## Changelog

### 1.1.0
- Added `createPrivateGithubAppApplication` endpoint for creating applications from private GitHub repositories
- Improved documentation with resource relationship explanations
- Added examples for finding required UUIDs and IDs

### 1.0.1
- Bug fixes and improvements

### 1.0.0
- Initial release
- Full TypeScript support
- Complete API coverage for Coolify v4
- Support for applications, databases, servers, projects, deployments, services, and teams

---

Made with ❤️ for the Coolify community