import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | ViralTrendingMemes",
  description:
    "Read the Terms of Service for ViralTrendingMemes. By using our website, you agree to these terms governing content usage, downloads, and user conduct.",
  alternates: {
    canonical: "https://viraltrendingmemes.com/terms",
  },
};

export default function TermsPage() {
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
            ViralTrending<span className="text-purple-600">Memes</span>
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-16 animate-in fade-in slide-in-from-bottom-5 duration-500">
        <h1 className="text-5xl font-black mb-4 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-gray-500 font-medium mb-8">
          Last updated: March 16, 2026
        </p>

        <div className="bg-white p-8 md:p-12 rounded-4xl shadow-sm border-2 border-black space-y-10">
          {/* 1. Acceptance */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              By accessing and using ViralTrendingMemes
              (&quot;viraltrendingmemes.com&quot;), you accept and agree to be
              bound by these Terms of Service. If you do not agree to these
              terms, please do not use our website.
            </p>
          </section>

          {/* 2. Description of Service */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              2. Description of Service
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              ViralTrendingMemes is a free entertainment platform that curates
              and provides memes, funny videos, and images for personal,
              non-commercial use. We do not create all the content displayed;
              some content is submitted by users or curated from the internet.
            </p>
          </section>

          {/* 3. User Conduct */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              3. User Conduct
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-4">
              When using our website, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 font-medium space-y-2 pl-2">
              <li>Use the website only for lawful purposes</li>
              <li>Not attempt to disrupt or overload our servers</li>
              <li>
                Not upload or submit any content that is illegal, hateful, or
                infringes on intellectual property rights
              </li>
              <li>
                Not use automated tools or bots to scrape content from our
                website
              </li>
              <li>
                Respect the rights of other users and content creators
              </li>
            </ul>
          </section>

          {/* 4. Content & Downloads */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              4. Content & Downloads
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              Memes and media available for download on ViralTrendingMemes are
              provided for personal entertainment and non-commercial sharing.
              You may download and share content with friends and on social
              media. You may not use our content for commercial purposes,
              reselling, or redistribution on competing platforms without
              permission.
            </p>
          </section>

          {/* 5. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              5. Intellectual Property
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              If you believe that any content on our website infringes your
              copyright or intellectual property rights, please refer to our{" "}
              <Link
                href="/dmca"
                className="text-purple-600 font-bold underline hover:text-purple-800"
              >
                DMCA / Copyright Policy
              </Link>{" "}
              for information on how to submit a takedown request.
            </p>
          </section>

          {/* 6. Third-Party Advertising */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              6. Third-Party Advertising
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              Our website displays advertisements served by Google AdSense and
              potentially other third-party ad networks. These ads may use
              cookies to serve personalized content. We are not responsible for
              the content of third-party advertisements. Please review our{" "}
              <Link
                href="/privacy"
                className="text-purple-600 font-bold underline hover:text-purple-800"
              >
                Privacy Policy
              </Link>{" "}
              for details on cookies and data collection.
            </p>
          </section>

          {/* 7. Disclaimer */}
          <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-black">
            <h3 className="font-black text-xl mb-2 text-yellow-900">
              ⚠️ Disclaimer
            </h3>
            <p className="text-yellow-800 font-medium text-sm">
              ViralTrendingMemes is provided &quot;as is&quot; without
              warranties of any kind. We do not guarantee the accuracy,
              completeness, or availability of any content on our website. We
              are not liable for any damages arising from the use of our
              website.
            </p>
          </div>

          {/* 8. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              In no event shall ViralTrendingMemes be liable for any indirect,
              incidental, special, or consequential damages arising out of your
              use of the website. Our total liability for any claim shall not
              exceed the amount you paid to us (if any) in the preceding 12
              months.
            </p>
          </section>

          {/* 9. Changes */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              8. Changes to These Terms
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              We reserve the right to update these Terms of Service at any time.
              Changes will be posted on this page with an updated revision date.
              Your continued use of the website constitutes acceptance of the
              revised terms.
            </p>
          </section>

          {/* 10. Contact */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              9. Contact
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              If you have questions about these Terms of Service, please contact
              us through our{" "}
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
