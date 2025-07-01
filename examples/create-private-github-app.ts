import { CoolifyClient, CreatePrivateGithubAppApplicationRequest } from '../src';

// Example usage of createPrivateGithubAppApplication
async function createPrivateGithubApp() {
  const client = new CoolifyClient({
    apiUrl: 'https://your-coolify-instance.com',
    apiToken: 'your-api-token',
  });

  const applicationData: CreatePrivateGithubAppApplicationRequest = {
    project_uuid: 'your-project-uuid',
    server_uuid: 'your-server-uuid',
    github_app_uuid: 'your-github-app-uuid',
    git_repository: 'https://github.com/yourusername/your-private-repo',
    git_branch: 'main',
    name: 'My Private GitHub App',
    domains: 'app.example.com',
    build_pack: 'nixpacks',
    ports_exposes: '3000',
    instant_deploy: true,
  };

  try {
    const response = await client.createPrivateGithubAppApplication(applicationData);
    console.log('Application created successfully!');
    console.log('Application UUID:', response.data?.uuid);
  } catch (error) {
    console.error('Error creating application:', error);
  }
}

// Run the example
createPrivateGithubApp();