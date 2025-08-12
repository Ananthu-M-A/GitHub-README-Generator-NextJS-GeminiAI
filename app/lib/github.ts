// app/lib/github.ts
interface RepositoryData {
  name: string;
  description: string;
  language: string;
  languages: Record<string, number>;
  dependencies: any;
  fileStructure: any[];
  readme?: string;
}

export async function analyzeRepository(repoUrl: string): Promise<RepositoryData> {
  const [, , , owner, repo] = repoUrl.split('/');
  const baseUrl = 'https://api.github.com/repos';

  const headers = {
    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  };

  try {
    // Get repository info
    const repoResponse = await fetch(`${baseUrl}/${owner}/${repo}`, { headers });
    const repoData = await repoResponse.json();

    // Get languages
    const languagesResponse = await fetch(`${baseUrl}/${owner}/${repo}/languages`, { headers });
    const languages = await languagesResponse.json();

    // Get file contents for dependency analysis
    const dependencies = await analyzeDependencies(owner, repo, headers);
    
    // Get file structure
    const fileStructure = await getFileStructure(owner, repo, headers);

    return {
      name: repoData.name,
      description: repoData.description,
      language: repoData.language,
      languages,
      dependencies,
      fileStructure
    };
  } catch (error) {
    throw new Error('Failed to analyze repository');
  }
}

async function analyzeDependencies(owner: string, repo: string, headers: any) {
  const depFiles = ['package.json', 'requirements.txt', 'Cargo.toml', 'go.mod'];
  const dependencies = {};

  for (const file of depFiles) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${file}`,
        { headers }
      );
      
      if (response.ok) {
        const data = await response.json();
        const content = Buffer.from(data.content, 'base64').toString();
        dependencies[file] = JSON.parse(content);
      }
    } catch (error) {
      // File doesn't exist or isn't parseable
      continue;
    }
  }

  return dependencies;
}
