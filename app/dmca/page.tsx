import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMCA / Copyright Policy | ViralTrendingMemes",
  description:
    "Submit a DMCA takedown request if your copyrighted content appears on ViralTrendingMemes without authorization. We respect intellectual property rights.",
  alternates: {
    canonical: "https://viraltrendingmemes.com/dmca",
  },
};

export default function DMCAPage() {
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
          DMCA / Copyright Policy
        </h1>
        <p className="text-gray-500 font-medium mb-8">
          Last updated: March 16, 2026
        </p>

        <div className="bg-white p-8 md:p-12 rounded-4xl shadow-sm border-2 border-black space-y-10">
          {/* 1. Respect for Copyright */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              1. Our Commitment
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              ViralTrendingMemes respects the intellectual property rights of
              others. We are committed to responding to any notices of alleged
              copyright infringement that comply with the Digital Millennium
              Copyright Act (DMCA). If you believe that your copyrighted work
              has been posted on our website without authorization, please follow
              the procedure below.
            </p>
          </section>

          {/* 2. How to File a DMCA Takedown */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              2. Filing a DMCA Takedown Notice
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-4">
              To file a DMCA takedown request, please send us the following
              information via our{" "}
              <Link
                href="/contact"
                className="text-purple-600 font-bold underline hover:text-purple-800"
              >
                Contact Form
              </Link>{" "}
              with the topic &quot;Content Removal Request&quot;:
            </p>
            <ol className="list-decimal list-inside text-gray-600 font-medium space-y-3 pl-2">
              <li>
                <strong>Your contact information:</strong> Full name, email
                address, and phone number (optional).
              </li>
              <li>
                <strong>Identification of the copyrighted work:</strong> A
                description of the copyrighted work you claim has been
                infringed.
              </li>
              <li>
                <strong>URL of the infringing content:</strong> The specific URL
                or URLs on ViralTrendingMemes where the infringing material is
                located.
              </li>
              <li>
                <strong>Statement of good faith:</strong> A statement that you
                have a good faith belief that the use of the material is not
                authorized by the copyright owner.
              </li>
              <li>
                <strong>Statement of accuracy:</strong> A statement, under
                penalty of perjury, that the information in your notice is
                accurate and that you are the copyright owner or authorized to
                act on behalf of the owner.
              </li>
              <li>
                <strong>Your signature:</strong> Your physical or electronic
                signature.
              </li>
            </ol>
          </section>

          {/* 3. What Happens Next */}
          <div className="bg-purple-50 p-6 rounded-2xl border-2 border-black">
            <h3 className="font-black text-xl mb-3 text-purple-900">
              What Happens After You Submit?
            </h3>
            <ul className="text-purple-700 font-medium text-sm space-y-2">
              <li>
                ✅ We will review your request within <strong>48 hours</strong>
              </li>
              <li>
                ✅ If the claim is valid, the infringing content will be{" "}
                <strong>removed promptly</strong>
              </li>
              <li>
                ✅ You will receive a confirmation once the content has been
                taken down
              </li>
            </ul>
          </div>

          {/* 4. Counter-Notice */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              3. Counter-Notice
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              If you believe that your content was removed by mistake or
              misidentification, you may submit a counter-notice through our{" "}
              <Link
                href="/contact"
                className="text-purple-600 font-bold underline hover:text-purple-800"
              >
                Contact Form
              </Link>
              . The counter-notice must include your contact information, the
              URL of the removed content, a statement under penalty of perjury
              that you have a good faith belief the content was removed in
              error, and your consent to the jurisdiction of a federal court.
            </p>
          </section>

          {/* 5. Repeat Infringers */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              4. Repeat Infringers
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              In accordance with the DMCA, we will terminate access for users
              who are repeat infringers in appropriate circumstances.
            </p>
          </section>

          {/* 6. Fair Use */}
          <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-black">
            <h3 className="font-black text-xl mb-2 text-yellow-900">
              📜 Note on Fair Use
            </h3>
            <p className="text-yellow-800 font-medium text-sm">
              Some content on our platform may qualify as fair use under
              copyright law (e.g., memes, parody, commentary). We consider fair
              use claims on a case-by-case basis. If you believe your takedown
              request was not honored due to a fair use determination, you may
              submit a counter-notice.
            </p>
          </div>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">
              5. Contact Us
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              To submit a DMCA takedown request or counter-notice, please use
              our{" "}
              <Link
                href="/contact"
                className="text-purple-600 font-bold underline hover:text-purple-800"
              >
                Contact Form
              </Link>{" "}
              and select &quot;Content Removal Request&quot; as the topic.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
