import React, { useEffect, useRef, useContext, useState } from 'react';
import { BufferAttribute, Clock, PerspectiveCamera, PlaneGeometry, Points, Scene, ShaderMaterial, WebGLRenderer } from 'three';
import { ThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

const Ai = () => {
    const canvasRef = useRef(null);
    const { darkMode } = useContext(ThemeContext);
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    const clock = new Clock();
    let renderer;
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [canSendMessage, setCanSendMessage] = useState(true);
    const typingRef = useRef(null); // Reference to track typing interval

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
                        'gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);' // black color in light theme
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
                canvasRef.current.style.height = '80vh';
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const handleSendMessage = () => {
        if (input.trim() !== '' && canSendMessage) {
            setMessages([...messages, { text: input, sender: 'User' }]);
            setInput('');
            setCanSendMessage(false);

            // Simulate AI response after a delay
            setTimeout(() => {
                const response = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor semper nisl, vel consequat velit varius ac. Aliquam auctor leo non sapien vehicula, in finibus eros fermentum. Nullam suscipit velit in est sollicitudin, eu hendrerit neque ultrices. Mauris in ligula eu nisi fermentum tempus. Duis consequat dolor sed est suscipit, et tincidunt sapien rutrum. Morbi semper nunc at eros dictum, in eleifend sapien scelerisque. Sed vel lobortis justo. Nulla eleifend, urna vitae ultrices bibendum, dui augue tincidunt risus, vel euismod nulla augue et tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque nec sapien id risus posuere suscipit. Mauris at velit quam. Ut tempor ligula a libero auctor dignissim. Integer laoreet, mi ut tempor rutrum, risus urna placerat lectus, non bibendum ex libero vel nisi. Vivamus pulvinar eleifend sem, eget bibendum libero tincidunt nec. Vivamus ultricies, dui vel tristique congue, nisl mauris malesuada orci, at aliquam magna metus a leo.'; // Replace with your actual AI response logic
                typeMessage(response);
            }, 1000); // Simulate a 1-second response time
        }
    };
  
    const typeMessage = (message) => {
        let index = 0;
        if (typingRef.current) {
            clearInterval(typingRef.current); // Clear previous typing animation if exists
        }
        typingRef.current = setInterval(() => {
            setMessages(prevMessages => {
                const lastMessage = prevMessages[prevMessages.length - 1];
                const updatedMessages = [...prevMessages];
                if (lastMessage && lastMessage.sender === 'ZPAI') {
                    updatedMessages[updatedMessages.length - 1] = {
                        ...lastMessage,
                        text: message.slice(0, index + 1)
                    };
                } else {
                    updatedMessages.push({ text: message.slice(0, index + 1), sender: 'ZPAI' });
                }
                return updatedMessages;
            });
            index++;
            if (index === message.length) {
                clearInterval(typingRef.current);
                setCanSendMessage(true);
            }
        }, 10); // Adjust typing speed here
    };

    return (
        <div className={`relative pt-20 md:pt-40 ${darkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}>
            <canvas ref={canvasRef} className="webgl" />
            <div className="absolute top-0 left-0 w-full md:mt-52 mt-40 flex flex-col items-center justify-center">
                <div className="flex-grow overflow-y-auto mb-4 w-full max-w-2xl mx-auto p-4" style={{ maxHeight: 'calc(100% - 50px)' }}>
                    {messages.map((msg, index) => (
                        <div key={index} className="p-3 break-words flex items-start">
                            <div className={`text-primary mr-4`}>{msg.sender}</div>
                            <div className="flex-grow text-white text-left">
                                <span className={`${darkMode ? 'text-white' : 'text-dark'}`}>{msg.text}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full max-w-2xl p-4 flex flex-col md:flex-row items-stretch space-y-4 md:space-y-0 md:space-x-4">
                    <input
                        className={`flex-grow placeholder-gray-600 p-4 md:rounded-none !mr-0 ${darkMode ? 'border-gray-700 bg-glass text-white' : 'border-gray-300 bg-glass text-black'} rounded md:rounded-l-lg`}
                        type="text"
                        placeholder='Your Business Niche (Nail)'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={!canSendMessage}
                    />
                    <button
                        className={`w-full md:w-auto p-2 px-10 md:rounded-none !ml-0 rounded md:rounded-r-lg ${darkMode ? 'text-white bg-glass border-none' : 'bg-primary text-white'} ${!canSendMessage ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleSendMessage}
                        disabled={!canSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ai;
