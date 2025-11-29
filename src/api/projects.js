// // src/api/projects.js
// import api from './index'; // path relative to src/api/projects.js

// export async function createProject(projectData) {
//   // projectData can be an object or FormData
//   const options = {
//     method: 'POST'
//   };

//   // If it's FormData (e.g., uploading image), don't set Content-Type
//   if (projectData instanceof FormData) {
//     options.body = projectData;
//   } else {
//     options.body = JSON.stringify(projectData);
//   }

//   return api.request('/projects', options);
// }

// export async function updateProject(id, projectData) {
//   const options = { method: 'PUT' };
//   if (projectData instanceof FormData) {
//     options.body = projectData;
//   } else {
//     options.body = JSON.stringify(projectData);
//   }
//   return api.request(`/projects/${id}`, options);
// }

// export async function deleteProject(id) {
//   return api.request(`/projects/${id}`, { method: 'DELETE' });
// }

// src/api/projects.js
import api from './index'; // assumes src/api/index.js exists and exports request/getToken

export async function createProject(projectData) {
  const options = { method: 'POST' };
  if (projectData instanceof FormData) options.body = projectData;
  else options.body = JSON.stringify(projectData);
  return api.request('/projects', options);
}

export async function updateProject(id, projectData) {
  const options = { method: 'PUT' };
  if (projectData instanceof FormData) options.body = projectData;
  else options.body = JSON.stringify(projectData);
  return api.request(`/projects/${id}`, options);
}

export async function deleteProject(id) {
  return api.request(`/projects/${id}`, { method: 'DELETE' });
}

export async function deleteAllProjects() {
  // if your backend supports DELETE /projects to remove all
  return api.request('/projects', { method: 'DELETE' });
}
