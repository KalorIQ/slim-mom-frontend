#!/usr/bin/env node

// Development Setup Script for KalorIQ Frontend
// This script helps developers set up the project correctly

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('🚀 KalorIQ Frontend Development Setup\n');

// Check if backend is running
async function checkBackend() {
  console.log('🔍 Checking backend connection...');
  try {
    const response = await fetch('http://localhost:3000/');
    if (response.ok) {
      console.log('✅ Backend is running on http://localhost:3000');
      return true;
    } else {
      console.log('❌ Backend responded with status:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Backend is not running on http://localhost:3000');
    console.log('   Please start the backend server first');
    return false;
  }
}

// Check API endpoints
async function checkApiEndpoints() {
  console.log('\n🔍 Checking API endpoints...');
  
  const endpoints = [
    { name: 'API Docs', url: 'http://localhost:3000/api-docs' },
    { name: 'All Products', url: 'http://localhost:3000/api/products/allProducts' },
    { name: 'Search Products', url: 'http://localhost:3000/api/products/searchProducts?title=apple' },
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint.url);
      if (response.ok) {
        console.log(`✅ ${endpoint.name}: OK`);
      } else {
        console.log(`❌ ${endpoint.name}: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: Failed`);
    }
  }
}

// Create environment file if it doesn't exist
function createEnvFile() {
  const envPath = path.join(projectRoot, '.env');
  
  if (!fs.existsSync(envPath)) {
    console.log('\n📝 Creating .env file...');
    const envContent = `# KalorIQ Backend API Configuration
VITE_API_URL=http://localhost:3000

# Application Configuration
VITE_APP_NAME=KalorIQ
VITE_APP_VERSION=1.0.0

# Development Configuration
VITE_NODE_ENV=development
`;
    
    try {
      fs.writeFileSync(envPath, envContent);
      console.log('✅ .env file created successfully');
    } catch (error) {
      console.log('❌ Failed to create .env file:', error.message);
    }
  } else {
    console.log('✅ .env file already exists');
  }
}

// Check required dependencies
function checkDependencies() {
  console.log('\n🔍 Checking dependencies...');
  
  const packageJsonPath = path.join(projectRoot, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log('❌ package.json not found');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const requiredDeps = [
    'react',
    'react-dom',
    'react-router-dom',
    '@reduxjs/toolkit',
    'react-redux',
    'axios',
    'formik',
    'yup',
    'i18next',
    'react-i18next',
  ];
  
  const missingDeps = requiredDeps.filter(dep => 
    !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
  );
  
  if (missingDeps.length === 0) {
    console.log('✅ All required dependencies are installed');
    return true;
  } else {
    console.log('❌ Missing dependencies:', missingDeps.join(', '));
    return false;
  }
}

// Display configuration summary
function displaySummary() {
  console.log('\n📋 Configuration Summary:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔧 Backend URL: http://localhost:3000');
  console.log('📚 API Docs: http://localhost:3000/api-docs');
  console.log('🌐 Frontend: http://localhost:5173 (when running)');
  console.log('📁 Project: KalorIQ Frontend');
  console.log('⚡ Build Tool: Vite');
  console.log('⚛️  Framework: React 19.1.0');
  console.log('🗃️  State: Redux Toolkit');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

// Display development commands
function displayCommands() {
  console.log('\n🛠️  Development Commands:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('npm run dev          # Start development server');
  console.log('npm run build        # Build for production');
  console.log('npm run preview      # Preview production build');
  console.log('npm run lint         # Run ESLint');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

// Display API testing instructions
function displayApiTesting() {
  console.log('\n🧪 API Testing:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('// In browser console:');
  console.log('import apiTest from "./src/utils/apiTest.js";');
  console.log('apiTest.runAllTests();');
  console.log('');
  console.log('// Or test individual endpoints:');
  console.log('apiTest.testBackendConnection();');
  console.log('apiTest.testProductSearch("apple");');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

// Main setup function
async function main() {
  try {
    // Check dependencies
    const depsOk = checkDependencies();
    
    // Create env file
    createEnvFile();
    
    // Check backend
    const backendOk = await checkBackend();
    
    if (backendOk) {
      // Check API endpoints
      await checkApiEndpoints();
    }
    
    // Display summary and commands
    displaySummary();
    displayCommands();
    displayApiTesting();
    
    console.log('\n🎉 Setup completed!');
    
    if (!backendOk) {
      console.log('\n⚠️  Warning: Backend is not running');
      console.log('   Please start the backend server on http://localhost:3000');
      console.log('   before running the frontend application.');
    }
    
    if (!depsOk) {
      console.log('\n⚠️  Warning: Some dependencies are missing');
      console.log('   Please run "npm install" to install all dependencies.');
    }
    
    console.log('\n🚀 Ready to start development!');
    console.log('   Run "npm run dev" to start the development server.');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
main(); 