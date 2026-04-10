/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile Three.js + R3F + drei so Next compiles them with the rest
  // (fixes "undefined is not an object (evaluating 'x.S')" error)
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'fpjyfctwjiivusbzxmrg.supabase.co' },
    ],
  },
};

module.exports = nextConfig;
