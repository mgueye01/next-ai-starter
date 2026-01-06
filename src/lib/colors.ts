// elGato Photo - White Background with Warm Earthy Accents
export const colors = {
  // Background colors
  bgWhite: '#FFFFFF',    // Pure white background
  bgCream: '#ECEEDF',    // Warm off-white/cream for cards
  bgTeal: '#BBDCE5',     // Light blue/teal  
  bgBeige: '#D9C4B0',    // Warm beige
  bgBrown: '#CFAB8D',    // Warm brown/tan
  
  // Text colors
  textDark: '#6B5B47',   // Dark warm brown for text
  textMuted: '#8B7355',  // Muted warm brown
  
  // Brand colors
  primary: '#BBDCE5',    // Light teal
  secondary: '#D9C4B0',  // Beige
  accent: '#CFAB8D',     // Brown
  
  // Status colors
  danger: 'hsl(0 84% 60%)',
  warning: 'hsl(38 92% 50%)',
  success: 'hsl(142 76% 36%)',
  info: '#BBDCE5'
};

// Tailwind CSS classes using white background with warm accents
export const colorClasses = {
  // Text
  text: 'text-[#6B5B47]',
  textMuted: 'text-[#8B7355]',
  
  // Backgrounds
  bg: 'bg-white',           // Main background is white
  bgCream: 'bg-[#ECEEDF]',  // Cards use cream
  bgTeal: 'bg-[#BBDCE5]',
  bgBeige: 'bg-[#D9C4B0]',
  bgBrown: 'bg-[#CFAB8D]',
  
  // Borders
  border: 'border-[#D9C4B0]',
  borderMuted: 'border-[#ECEEDF]',
  
  // Primary button
  btnPrimary: 'bg-[#BBDCE5] text-[#6B5B47] hover:bg-[#A5C9D4]',
  btnSecondary: 'border-2 border-[#CFAB8D] text-[#CFAB8D] hover:bg-[#CFAB8D]/10',
  
  // Cards (use cream instead of white for subtle difference)
  card: 'bg-[#ECEEDF] border border-[#D9C4B0] hover:border-[#CFAB8D]',
  
  // Gradients
  gradientBg: 'bg-gradient-to-r from-[#BBDCE5] to-[#D9C4B0]'
};