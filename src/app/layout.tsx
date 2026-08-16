import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig, faqs } from "@/lib/data";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://uniqueengineering.online";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} – ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    siteConfig.description,
  keywords: [
    "crane erection",
    "EOT crane",
    "overhead crane",
    "tower crane",
    "gantry crane",
    "gearbox repair",
    "gearbox supply",
    "VFD installation",
    "variable frequency drive",
    "AMC service",
    "annual maintenance contract",
    "crane dismantling",
    "wire rope",
    "hoist assembly",
    "safety devices",
    "crane load testing",
    "engineering solutions",
    "mechanical engineering",
    "industrial crane",
    "crane commissioning",
    "Delhi NCR",
    "Uttar Pradesh",
    "Pan-India",
    "India",
    "Unique Engineering",
  ],
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} – ${siteConfig.tagline}`,
    description:
      "Expert crane erection, mechanical systems & maintenance solutions across Delhi NCR and Pan-India. 10+ years, 150+ projects, 75+ clients.",
    type: "website",
    siteName: siteConfig.name,
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} – ${siteConfig.tagline}`,
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} – ${siteConfig.tagline}`,
    description:
      "Expert crane erection, mechanical systems & maintenance solutions across Delhi NCR and Pan-India.",
    images: ["/og-image.png"],
  },
  other: {
    "theme-color": "#07070D",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: SITE_URL,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${SITE_URL}/og-image.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bisrakh Jalalpur",
      addressLocality: "Greater Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201310",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.4744,
      longitude: 77.5078,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
    priceRange: "₹₹",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "75",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    description: siteConfig.description,
    foundingDate: "2010",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      email: siteConfig.email,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.instagram.com/uniqueengineering",
      "https://www.linkedin.com/company/uniqueengineering",
      "https://www.youtube.com/@uniqueengineering",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/#about` },
      { "@type": "ListItem", position: 3, name: "Products", item: `${SITE_URL}/#products` },
      { "@type": "ListItem", position: 4, name: "Services", item: `${SITE_URL}/#services` },
      { "@type": "ListItem", position: 5, name: "Contact", item: `${SITE_URL}/#contact` },
    ],
  };

  const jsonLd = [
    localBusinessSchema,
    organizationSchema,
    faqSchema,
    breadcrumbSchema,
  ];

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#07070D" />
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
