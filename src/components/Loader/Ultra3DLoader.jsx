import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Ultra3DLoader.css';

const Ultra3DLoader = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Initialize Three.js Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Create Main Torus for Outer Circle with Gradient Shader Material
    const torusGeometry = new THREE.TorusGeometry(5, 0.3, 16, 100);

    // Custom shader for smooth color cycling on torus
    const torusMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;

        void main() {
          float r = 0.5 + 0.5 * sin(time + vUv.x * 10.0);
          float g = 0.5 + 0.5 * sin(time + vUv.y * 10.0 + 2.0);
          float b = 0.5 + 0.5 * sin(time + (vUv.x + vUv.y) * 10.0 + 4.0);
          gl_FragColor = vec4(r, g, b, 0.8);
        }
      `,
      transparent: true
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Create Fitness Icons
    const icons = createFitnessIcons();
    icons.forEach(icon => scene.add(icon));

    // Add Point Lights for Neon Effect
    const lights = [
      new THREE.PointLight(0xff00ff, 1, 10), // Pink
      new THREE.PointLight(0x00ffff, 1, 10), // Blue
      new THREE.PointLight(0x39ff14, 1, 10), // Green
      new THREE.PointLight(0xff9300, 1, 10)  // Orange
    ];

    lights[0].position.set(0, 0, 2);
    lights[1].position.set(2, 2, 2);
    lights[2].position.set(-2, 2, 2);
    lights[3].position.set(0, -2, 2);

    lights.forEach(light => scene.add(light));

    // Position Camera
    camera.position.z = 10;

    // Create Particles for Background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      torusMaterial.uniforms.time.value = time;

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;

      // Animate icons with dynamic color change
      icons.forEach((icon, index) => {
        icon.position.x = Math.sin(time + index) * 4;
        icon.position.y = Math.cos(time + index) * 4;
        icon.rotation.z += 0.01;

        // Animate icon colors (for MeshStandardMaterials inside groups)
        icon.traverse(child => {
          if (child.material && child.material.color) {
            const c = child.material.color;
            c.r = 0.5 + 0.5 * Math.sin(time * 2 + index);
            c.g = 0.5 + 0.5 * Math.sin(time * 2 + index + 2);
            c.b = 0.5 + 0.5 * Math.sin(time * 2 + index + 4);
          }
        });
      });

      // Animate particles
      particlesMesh.rotation.y += 0.0005;

      // Animate lights
      lights.forEach((light, index) => {
        light.position.x = Math.sin(time * 0.7 + index) * 3;
        light.position.y = Math.cos(time * 0.5 + index) * 3;
        light.intensity = 1 + Math.sin(time * 2) * 0.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Create 3D Fitness Icons
  const createFitnessIcons = () => {
    const icons = [];
    const iconCount = 5;
  
    const colors = [0xff00ff, 0x00ffff, 0x39ff14, 0xff9300, 0xff6f61];
  
    for (let i = 0; i < iconCount; i++) {
      const randomScale = 0.5 + Math.random() * 0.3;
      const initialX = (Math.random() - 0.5) * 8;
      const initialY = (Math.random() - 0.5) * 8;
      const color = new THREE.Color(colors[i % colors.length]);
  
      if (i % 3 === 0) {
        // 💪 Dumbbell
        const dumbbellGroup = new THREE.Group();
  
        const barGeometry = new THREE.CylinderGeometry(0.15, 0.15, 3.5, 32);
        const barMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.7, roughness: 0.2 });
        const bar = new THREE.Mesh(barGeometry, barMaterial);
        bar.rotation.z = Math.PI / 2;
        dumbbellGroup.add(bar);
  
        const weightGeometry = new THREE.TorusGeometry(0.45, 0.2, 16, 100);
        const weightMaterial = new THREE.MeshStandardMaterial({ color, metalness: 0.8, roughness: 0.3 });
  
        const leftWeight = new THREE.Mesh(weightGeometry, weightMaterial);
        leftWeight.position.x = -1.7;
  
        const rightWeight = new THREE.Mesh(weightGeometry, weightMaterial);
        rightWeight.position.x = 1.7;
  
        dumbbellGroup.add(leftWeight);
        dumbbellGroup.add(rightWeight);
  
        dumbbellGroup.scale.set(randomScale, randomScale, randomScale);
        dumbbellGroup.position.set(initialX, initialY, 0);
        icons.push(dumbbellGroup);
      } else if (i % 3 === 1) {
        // 🧃 Protein Circle
        const proteinGroup = new THREE.Group();
  
        const baseGeometry = new THREE.CircleGeometry(1, 64);
        const baseMaterial = new THREE.MeshStandardMaterial({
          color: 0x0d0d0d,
          roughness: 0.8,
          metalness: 0.2
        });
        const circle = new THREE.Mesh(baseGeometry, baseMaterial);
        proteinGroup.add(circle);
  
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 256, 256);
        ctx.font = 'bold 80px Orbitron, sans-serif';
        ctx.fillStyle = '#' + color.getHexString();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('PRO', 128, 128);
  
        const texture = new THREE.CanvasTexture(canvas);
        const textMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const textPlane = new THREE.Mesh(new THREE.CircleGeometry(1, 64), textMat);
        textPlane.position.z = 0.01;
  
        proteinGroup.add(textPlane);
        proteinGroup.scale.set(randomScale, randomScale, randomScale);
        proteinGroup.position.set(initialX, initialY, 0);
        icons.push(proteinGroup);
      } else {
        // 🥕 Carrot
        const carrotGroup = new THREE.Group();
  
        const carrotGeometry = new THREE.ConeGeometry(0.4, 2.2, 32);
        const carrotMaterial = new THREE.MeshStandardMaterial({ color: 0xff6f00, roughness: 0.5 });
        const carrot = new THREE.Mesh(carrotGeometry, carrotMaterial);
        carrot.rotation.x = Math.PI;
        carrotGroup.add(carrot);
  
        const leafGeometry = new THREE.SphereGeometry(0.2, 12, 12);
        const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff66 });
  
        const positions = [
          [0.2, 1.2, 0],
          [-0.2, 1.2, 0],
          [0, 1.4, 0],
          [0.15, 1.1, 0.15],
        ];
  
        positions.forEach(pos => {
          const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
          leaf.position.set(...pos);
          carrotGroup.add(leaf);
        });
  
        carrotGroup.scale.set(randomScale, randomScale, randomScale);
        carrotGroup.position.set(initialX, initialY, 0);
        icons.push(carrotGroup);
      }
    }
  
    return icons;
  };

  return (
    <div className="ultra-3d-loader-container">
      <div ref={mountRef} className="canvas-container"></div>
      {/* Overlay HTML elements for better 2D UI */}
      <div className="overlay-container">
        <div className="loading-text">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>

        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default Ultra3DLoader;
