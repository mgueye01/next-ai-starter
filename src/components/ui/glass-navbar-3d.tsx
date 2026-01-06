/* eslint-disable react/no-unknown-property */
"use client";
import * as THREE from 'three';
import { useRef, useState, useEffect, memo, ReactNode } from 'react';
import { Canvas, createPortal, useFrame, useThree, ThreeElements } from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  useScroll,
  Image,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text
} from '@react-three/drei';
import { easing } from 'maath';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface NavItem {
  label: string;
  link: string;
}

export function GlassNavbar3D() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isHomepage && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isHomepage, hasAnimated]);

  const navItems: NavItem[] = [
    { label: 'Features', link: '/demo' },
    { label: 'Components', link: '/navbar-demo' },
    { label: 'Scroll', link: '/scroll-expansion' },
    ...(session ? [
      { label: 'Profile', link: '/profile' },
      { label: 'Settings', link: '/settings' },
      { label: 'Sign Out', link: '/auth/signout' }
    ] : [
      { label: 'Sign In', link: '/auth/signin' },
      { label: 'Sign Up', link: '/auth/signup' }
    ])
  ];

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-32 z-50 pointer-events-none"
      initial={isHomepage ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={
        isHomepage 
          ? hasAnimated 
            ? { y: 0, opacity: 1 } 
            : { y: -100, opacity: 0 }
          : { y: 0, opacity: 1 }
      }
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }}
    >
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 15 }} 
        gl={{ alpha: true }}
        className="pointer-events-auto"
      >
        <Bar navItems={navItems} />
        <Preload />
      </Canvas>
    </motion.div>
  );
}

type MeshProps = ThreeElements['mesh'];

interface ModeWrapperProps extends MeshProps {
  children?: ReactNode;
  lockToBottom?: boolean;
  followPointer?: boolean;
  navItems: NavItem[];
}

interface ZoomMaterial extends THREE.Material {
  zoom: number;
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  lockToBottom = false,
  followPointer = true,
  navItems,
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());
  const geoWidthRef = useRef<number>(4); // Default bar width

  // Create bar geometry directly - much larger
  const barGeometry = new THREE.BoxGeometry(8, 0.8, 1);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 4 : 0; // Reduced movement
    const destY = lockToBottom ? -v.height / 2 + 0.3 : followPointer ? (pointer.y * v.height) / 4 : 0;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    // Scale to fit navbar width - much larger scale
    const maxWorld = v.width * 0.8;
    const desired = maxWorld / geoWidthRef.current;
    ref.current.scale.setScalar(Math.min(0.4, desired));

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 0);
  });

  const defaultMaterial = {
    transmission: 1,
    roughness: 0.1,
    thickness: 8,
    ior: 1.2,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.3,
    chromaticAberration: 0.05
  };

  return (
    <>
      {createPortal(<NavItems items={navItems} />, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={0.4}
        rotation-x={Math.PI / 2}
        geometry={barGeometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          {...defaultMaterial}
        />
      </mesh>
    </>
  );
});

function Bar({ navItems }: { navItems: NavItem[] }) {
  return (
    <ModeWrapper
      lockToBottom
      followPointer={false}
      navItems={navItems}
    />
  );
}

function NavItems({ items }: { items: NavItem[] }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();

  const DEVICE = {
    mobile: { max: 639, spacing: 0.4, fontSize: 0.08 },
    tablet: { max: 1023, spacing: 0.5, fontSize: 0.1 },
    desktop: { max: Infinity, spacing: 0.6, fontSize: 0.12 }
  };
  
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState<keyof typeof DEVICE>('desktop');

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    onResize(); // Set initial device
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { spacing, fontSize } = DEVICE[device];

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, -v.height / 2 + 0.3, 15.1);

    group.current.children.forEach((child, i) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = (link: string) => {
    if (!link) return;
    if (link.startsWith('#')) {
      window.location.hash = link;
    } else {
      window.location.href = link;
    }
  };

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.002}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.8}
          renderOrder={10}
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate(link);
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

// No external models needed - using built-in Three.js geometries