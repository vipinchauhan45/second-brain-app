import React from "react";
// import Header from "../components/Header";
import Footer from "../components/Footer";

const FEATURES = [
  {
    title: "Capture Anything",
    desc: "Save videos, links, images, notes, and files instantly so your ideas never get lost.",
  },
  {
    title: "Smart Organization",
    desc: "Tag and categorize your content effortlessly to find exactly what you need, when you need it.",
  },
  {
    title: "Sync Across Devices",
    desc: "Access your second brain anytime, anywhere — whether on desktop, tablet, or mobile.",
  },
];

const Button = ({ href, children, className = "", ...props }) => (
  <a
    href={href}
    className={`inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full px-8 py-3 transition-shadow shadow-md text-center ${className}`}
    {...props}
  >
    {children}
  </a>
);

const FeatureCard = ({ title, desc }) => (
  <article className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-shadow text-teal-900 border border-teal-100">
    <h3 className="text-xl sm:text-2xl font-semibold mb-3">{title}</h3>
    <p className="text-sm sm:text-base">{desc}</p>
  </article>
);

export default function HomePage() {
  return (
    <>
      {/* <Header /> */}
      <main className="min-h-screen font-sans bg-white text-gray-900 pt-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section
          className="flex flex-col justify-center items-center py-16 sm:py-24 px-4 sm:px-6 text-center max-w-4xl mx-auto rounded-xl"
          style={{
            background: `linear-gradient(to bottom right, #e0f2f1, #80cbc4)`,
          }}
          aria-label="Hero section"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-teal-700">
            Unlock Your <span className="text-teal-900">Second Brain</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-xl mb-10 leading-relaxed text-teal-800">
            Capture, organize, and revisit your important ideas, links, videos,
            images, and notes — all in one seamless, intuitive place.
          </p>
          <Button href="/signup" className="max-w-xs w-full sm:w-auto">
            Get Started
          </Button>
        </section>

        {/* Features Section */}
        <section
          className="py-12 sm:py-16 px-2 sm:px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10"
          aria-label="Features section"
        >
          {FEATURES.map(({ title, desc }, i) => (
            <FeatureCard key={i} title={title} desc={desc} />
          ))}
        </section>

        {/* Call to Action */}
        <section
          className="bg-teal-600 py-12 sm:py-16 px-6 text-center rounded-xl max-w-4xl mx-auto my-12 sm:my-16 shadow-md text-white"
          aria-label="Call to action section"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Ready to Organize Your Thoughts?
          </h2>
          <p className="mb-6 max-w-lg mx-auto text-sm sm:text-base">
            Join thousands of users transforming their productivity with the Second Brain App.
          </p>
          <Button href="/signup" className="bg-teal-500 hover:bg-teal-700 px-8 sm:px-10 py-2 sm:py-3 shadow-md">
            Start Your Journey
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
