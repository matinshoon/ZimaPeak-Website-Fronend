import React, { useEffect, useRef, useContext } from 'react';
import { BufferAttribute, Clock, PerspectiveCamera, PlaneGeometry, Points, Scene, ShaderMaterial, WebGLRenderer } from 'three';
import { ThemeContext } from '../../ThemeContext';

const ParticleWaves = () => {
    const canvasRef = useRef(null);
    const { darkMode } = useContext(ThemeContext);
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    const clock = new Clock();
    let renderer;

    useEffect(() => {
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // Setup camera
        camera.position.z = 5; // Adjust camera position
        camera.position.y = 1.1;
        camera.position.x = 0;
        scene.add(camera);

        // Setup plane geometry
        const planeGeometry = new PlaneGeometry(20, 20, 100, 100); // Adjust plane geometry
        const planeMaterial = new ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uElevation: { value: 0.482 }
            },
            vertexShader: `
                uniform float uTime;
                uniform float uElevation;

                attribute float aSize;

                varying float vPositionY;
                varying float vPositionZ;

                void main() {
                    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                    modelPosition.y = sin(modelPosition.x - uTime) * sin(modelPosition.z * 0.6 + uTime) * uElevation;

                    vec4 viewPosition = viewMatrix * modelPosition;
                    gl_Position = projectionMatrix * viewPosition;

                    gl_PointSize = 2.0 * aSize;
                    gl_PointSize *= ( 1.0 / - viewPosition.z );

                    vPositionY = modelPosition.y;
                    vPositionZ = modelPosition.z;
                }
            `,
            fragmentShader: `
                varying float vPositionY;
                varying float vPositionZ;

                void main() {
                    ${
                        darkMode ?
                        'float strength = (vPositionY + 0.25) * 0.3;\n gl_FragColor = vec4(1.0, 1.0, 1.0, strength);' :
                        'gl_FragColor = vec4(0.478, 0.749, 1.0, 1.0);' // #7ABFFF in light theme
                    }
                }
            `,
            transparent: true,
        });

        const planeSizesArray = new Float32Array(planeGeometry.attributes.position.count);
        for (let i = 0; i < planeSizesArray.length; i++) {
            planeSizesArray[i] = Math.random() * 4.0;
        }
        planeGeometry.setAttribute('aSize', new BufferAttribute(planeSizesArray, 1));

        const plane = new Points(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI * 0.4;
        scene.add(plane);

        // Setup renderer
        renderer = new WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0xffffff, 0); // Set clear color to white, with opacity 0

        // Resize handling
        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        // Animation loop
        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            planeMaterial.uniforms.uTime.value = elapsedTime;

            renderer.render(scene, camera);

            requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            scene.remove(plane);
            renderer.dispose();
        };
    }, [darkMode]);

    // Set canvas size based on container or viewport size
    useEffect(() => {
        const resizeCanvas = () => {
            if (canvasRef.current) {
                canvasRef.current.style.width = '100%';
                canvasRef.current.style.height = '100%';
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    return <canvas ref={canvasRef} className="webgl" />;
};

export default ParticleWaves;
