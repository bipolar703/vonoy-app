# HeroUI Implementation Guide (2025)

HeroUI (formerly NextUI) is a modern, fully responsive React UI library that provides automatic responsive design with minimal configuration. This guide will help you implement HeroUI in your project.

## Installation

```bash
npm install @heroui/react
```

## Setup with Tailwind CSS

HeroUI works with Tailwind CSS. Add the HeroUI plugin to your `tailwind.config.js`:

```js
// tailwind.config.js
const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    // ...
    "./node_modules/@heroui/react/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: "#3dd598",
          }
        },
        dark: {
          colors: {
            primary: "#3dd598",
          }
        },
      },
    }),
  ],
};
```

## Provider Setup

Wrap your application with the HeroUI provider:

```jsx
// _app.jsx or App.jsx
import { HeroUIProvider } from "@heroui/react";

function App({ Component, pageProps }) {
  return (
    <HeroUIProvider>
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}

export default App;
```

## Implementing the Stats Section with HeroUI

Here's how you could implement the Vonoy in Numbers section using HeroUI components:

```jsx
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardBody, CardHeader, Container, Divider, Grid, Text, useDisclosure } from "@heroui/react";

const HeroUIStatsSection = () => {
  // Animation logic (same as before)
  const costValueRef = useRef(null);
  const vehiclesValueRef = useRef(null);
  const efficiencyValueRef = useRef(null);
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animation function (same as before)
  const animateValue = (element, start, end, duration, suffix = '') => {
    // ... (same implementation)
  };

  // Intersection observer (same as before)
  useEffect(() => {
    // ... (same implementation)
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="bg-background py-16 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/10 blur-[60px] -top-[100px] left-[10%]"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/10 blur-[60px] -bottom-[50px] right-[10%]"></div>
        <div className="absolute w-[200px] h-[200px] rounded-full bg-primary/10 blur-[60px] top-[40%] right-[20%]"></div>
      </div>
      
      <Container>
        <div className="text-center mb-16 animate-fade-in">
          <Text h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
            Vonoy in Numbers
          </Text>
          <Text className="text-default-500 max-w-[800px] mx-auto">
            We plan to intensify our efforts to become pioneers in local and regional markets in
            this field, through the innovation and creativity that we have led from the beginning.
          </Text>
        </div>

        <Grid.Container gap={2} className="items-center">
          <Grid xs={12} md={7}>
            <Grid.Container gap={2}>
              {/* Cost Reduction Card */}
              <Grid xs={12} sm={6} md={4}>
                <div className="relative aspect-square w-full">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center z-10 border border-primary/20 shadow-lg shadow-primary/20 transition-all duration-500 group-hover:-translate-y-[60%]">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <Card className="w-full h-full mt-10 bg-white/10 backdrop-blur-md border-white/15">
                    <CardBody className="flex flex-col items-center justify-center">
                      <Text h3 ref={costValueRef} className="text-4xl font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                        0%
                      </Text>
                      <Text className="text-default-500">Cost Reduction</Text>
                    </CardBody>
                  </Card>
                </div>
              </Grid>

              {/* Fewer Vehicles Card */}
              <Grid xs={12} sm={6} md={4}>
                <div className="relative aspect-square w-full">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center z-10 border border-primary/20 shadow-lg shadow-primary/20 transition-all duration-500 group-hover:-translate-y-[60%]">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>
                  <Card className="w-full h-full mt-10 bg-white/10 backdrop-blur-md border-white/15">
                    <CardBody className="flex flex-col items-center justify-center">
                      <Text h3 ref={vehiclesValueRef} className="text-4xl font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                        0%
                      </Text>
                      <Text className="text-default-500">Fewer Vehicles Required</Text>
                    </CardBody>
                  </Card>
                </div>
              </Grid>

              {/* Efficiency Card */}
              <Grid xs={12} sm={6} md={4}>
                <div className="relative aspect-square w-full">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center z-10 border border-primary/20 shadow-lg shadow-primary/20 transition-all duration-500 group-hover:-translate-y-[60%]">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <Card className="w-full h-full mt-10 bg-white/10 backdrop-blur-md border-white/15">
                    <CardBody className="flex flex-col items-center justify-center">
                      <Text h3 ref={efficiencyValueRef} className="text-4xl font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                        0%
                      </Text>
                      <Text className="text-default-500">Increase in Fleet Efficiency</Text>
                    </CardBody>
                  </Card>
                </div>
              </Grid>
            </Grid.Container>
          </Grid>
          
          <Grid xs={12} md={5} className="flex justify-center">
            <div className="w-full max-w-md aspect-square relative">
              <div className="w-full h-full rounded-full bg-gradient-radial from-primary/20 to-transparent relative overflow-hidden">
                <div className="absolute w-[150%] h-[150%] top-[-25%] left-[-25%] animate-spin-slow bg-conic-gradient"></div>
              </div>
            </div>
          </Grid>
        </Grid.Container>
      </Container>
    </section>
  );
};

export default HeroUIStatsSection;
```

## Key Benefits of HeroUI

1. **Automatic Responsive Design**: Components automatically adapt to different screen sizes
2. **Built-in Accessibility**: All components follow WAI-ARIA guidelines
3. **Dark Mode Support**: Seamless light/dark mode switching
4. **Modern Design System**: Consistent, customizable design tokens
5. **Performance Optimized**: No runtime styles, only the classes you need
6. **TypeScript Support**: Fully typed API for better developer experience

## Customization

HeroUI allows for deep customization through its theming system:

```js
heroui({
  themes: {
    light: {
      layout: {
        spacingUnit: 4, // 4px
        disabledOpacity: 0.5,
        dividerWeight: 1,
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.125rem",
        },
        lineHeight: {
          tiny: "1rem",
          small: "1.25rem",
          medium: "1.5rem",
          large: "1.75rem",
        },
        radius: {
          small: "8px",
          medium: "12px",
          large: "14px",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
      colors: {
        // Custom colors
        primary: "#3dd598",
      }
    },
    // Dark theme configuration
    dark: {
      // ...
    }
  }
})
```

## Conclusion

HeroUI provides a modern, automatic responsive design system that eliminates the need for manual media queries and complex responsive logic. By using HeroUI, you can create beautiful, responsive interfaces with minimal effort while maintaining full control over the design.

For more information, visit the [HeroUI documentation](https://heroui.com/docs).
