import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ViralTrendingMemes",
  description:
    "Read our comprehensive privacy policy to understand how ViralTrendingMemes collects, uses, and protects your data. GDPR & CCPA compliant.",
  alternates: {
    canonical: "https://viraltrendingmemes.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] text-gray-900 pb-20">
      <header className="bg-white/80 backdrop-blur-xl border-b-2 border-black sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-gray-900 font-bold flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-xl border-2 border-transparent hover:border-black text-sm transition-all"
          >
            <span className="text-lg">←</span> Back Home
          </Link>
          <span className="text-2xl font-black tracking-tight">
            ViralTrending
            <span className="text-purple-600">Memes</span>
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-16 animate-in fade-in slide-in-from-bottom-5 duration-500">
        <h1 className="text-5xl font-black mb-4 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-gray-500 font-medium mb-8">
          Last updated: March 16, 2026
        </p>

        <div className="bg-white p-8 md:p-12 rounded-4xl shadow-sm border-2 border-black space-y-10">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              1. Introduction
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              At ViralTrendingMemes (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;), accessible from{" "}
              <strong>viraltrendingmemes.com</strong>, one of our main
              priorities is the privacy of our visitors. This Privacy Policy
              document explains what information we collect, how we use it, and
              what choices you have in relation to it. This policy applies to all
              information collected through our website.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              2. Information We Collect
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-4">
              We collect information in the following ways:
            </p>
            <ul className="list-disc list-inside text-gray-600 font-medium space-y-2 pl-2">
              <li>
                <strong>Information you provide:</strong> When you use our
                contact form, we collect your name, email address, and message
                content.
              </li>
              <li>
                <strong>Automatically collected information:</strong> We
                automatically receive your IP address, browser type, device
                type, referring URLs, and pages visited through our analytics
                tools (Vercel Analytics).
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies and similar tracking
                technologies to improve your browsing experience and to serve
                personalized advertisements. See Section 4 below for details.
              </li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-600 font-medium space-y-2 pl-2">
              <li>To operate and maintain our website</li>
              <li>To respond to your inquiries and support requests</li>
              <li>
                To analyze usage patterns and improve our website&apos;s
                performance
              </li>
              <li>
                To serve relevant advertisements through Google AdSense
              </li>
              <li>To detect and prevent abuse, spam, or security threats</li>
            </ul>
          </section>

          {/* 4. Cookies & Advertising */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              4. Cookies & Third-Party Advertising
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-600 font-medium space-y-2 pl-2 mb-4">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to
                function properly (e.g., admin authentication).
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Used by Vercel Analytics to
                understand how visitors interact with our website.
              </li>
              <li>
                <strong>Advertising Cookies:</strong> Google AdSense uses DART
                cookies to serve personalized ads based on your visit to our
                site and other sites on the internet.
              </li>
            </ul>

            <div className="bg-purple-50 p-6 rounded-2xl border-2 border-black">
              <h3 className="font-black text-xl mb-2 text-purple-900">
                Google AdSense
              </h3>
              <p className="text-purple-700 font-medium text-sm mb-3">
                Google, as a third-party vendor, uses cookies to serve ads on
                our site. Google&apos;s use of the DART cookie enables it to
                serve ads based on your visits to this site and other sites on
                the internet.
              </p>
              <p className="text-purple-700 font-medium text-sm">
                You may opt out of the use of the DART cookie by visiting the{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold hover:text-purple-900"
                >
                  Google Ads Settings page
                </a>
                .
              </p>
            </div>
          </section>

          {/* 5. Your Rights (GDPR & CCPA) */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              5. Your Rights (GDPR & CCPA)
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding
              your personal data:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                <h3 className="font-black text-lg mb-2 text-gray-900">
                  🇪🇺 GDPR Rights (EU/UK)
                </h3>
                <ul className="text-gray-600 text-sm font-medium space-y-1">
                  <li>• Right to access your data</li>
                  <li>• Right to rectification</li>
                  <li>• Right to erasure (&quot;right to be forgotten&quot;)</li>
                  <li>• Right to restrict processing</li>
                  <li>• Right to data portability</li>
                  <li>• Right to object to processing</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                <h3 className="font-black text-lg mb-2 text-gray-900">
                  🇺🇸 CCPA Rights (California)
                </h3>
                <ul className="text-gray-600 text-sm font-medium space-y-1">
                  <li>• Right to know what data is collected</li>
                  <li>• Right to delete personal data</li>
                  <li>• Right to opt-out of data sale</li>
                  <li>• Right to non-discrimination</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-600 font-medium leading-relaxed mt-4">
              To exercise any of these rights, please contact us using our{" "}
              <Link
                href="/contact"
                className="text-purple-600 font-bold underline hover:text-purple-800"
              >
                Contact Form
              </Link>
              .
            </p>
          </section>

          {/* 6. Data Retention */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              6. Data Retention
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              We retain your personal data only for as long as necessary to
              fulfill the purposes described in this policy. Contact form
              messages are retained for up to 12 months unless you request
              earlier deletion.
            </p>
          </section>

          {/* 7. Third-Party Services */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              7. Third-Party Services
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-4">
              We use the following third-party services that may collect data:
            </p>
            <ul className="list-disc list-inside text-gray-600 font-medium space-y-2 pl-2">
              <li>
                <strong>Google AdSense</strong> — for displaying advertisements
              </li>
              <li>
                <strong>Vercel Analytics</strong> — for website performance
                monitoring
              </li>
              <li>
                <strong>Cloudinary</strong> — for hosting and optimizing media
                content
              </li>
            </ul>
            <p className="text-gray-600 font-medium leading-relaxed mt-4">
              Each of these services has its own privacy policy governing the
              data they collect. We encourage you to review their policies.
            </p>
          </section>

          {/* 8. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              8. Children&apos;s Privacy
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              Our website is not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you believe we have collected information from a child
              under 13, please{" "}
              <Link
                href="/contact"
                className="text-purple-600 font-bold underline hover:text-purple-800"
              >
                contact us
              </Link>{" "}
              immediately and we will take steps to remove that information.
            </p>
          </section>

          {/* 9. Data Protection */}
          <div className="bg-purple-50 p-6 rounded-2xl border-2 border-black">
            <h3 className="font-black text-xl mb-2 text-purple-900">
              🔒 Data Protection Commitment
            </h3>
            <p className="text-purple-700 font-medium text-sm">
              We do not sell or share your personal data with third parties for
              their direct marketing purposes. We use industry-standard security
              measures to protect your information from unauthorized access,
              alteration, or destruction.
            </p>
          </div>

          {/* 10. Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              9. Changes to This Policy
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date. We
              encourage you to review this policy periodically.
            </p>
          </section>

          {/* 11. Contact Us */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              10. Contact Us
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              If you have any questions about this Privacy Policy or wish to
              exercise your data rights, please contact us through our{" "}
              <Link
                href="/contact"
                className="text-purple-600 font-bold underline hover:text-purple-800"
              >
                Contact Page
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}