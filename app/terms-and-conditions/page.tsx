import Link from "next/link";
import LegalLayout from "../../components/LegalLayout";

const LAST_UPDATED = "February 2026";

const SECTIONS = [
  { id: "introduction", title: "Introduction" },
  { id: "use-of-services", title: "Use of Services" },
  { id: "accuracy", title: "No Guarantee of Accuracy" },
  { id: "responsibility", title: "User Responsibility" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "limitation", title: "Limitation of Liability" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "modifications", title: "Modifications" },
  { id: "changes", title: "Changes to Terms" },
  { id: "governing-law", title: "Governing Law" },
  { id: "contact", title: "Contact Information" },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalLayout
      title="Terms and Conditions"
      description="By accessing and using Text Tool, you agree to the following terms."
      lastUpdated={LAST_UPDATED}
    >
      <nav aria-label="Terms and conditions sections">
        <h2 className="text-sm font-semibold text-zinc-900">On this page</h2>
        <ul className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-600">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <Link className="underline" href={`#${section.id}`}>
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 space-y-8 text-sm leading-7 text-zinc-700">
        <section id="introduction">
          <h2 className="text-lg font-semibold text-zinc-900">Introduction</h2>
          <p className="mt-2">
            By accessing and using Text Tool, you agree to the following terms.
          </p>
        </section>

        <section id="use-of-services">
          <h2 className="text-lg font-semibold text-zinc-900">
            Use of Services
          </h2>
          <p className="mt-2">
            Text Tool provides free online text utilities including Word Counter,
            Case Converter, Remove Duplicate Lines, and Text-to-Speech. These tools
            are provided “as is” without warranties of any kind.
          </p>
        </section>

        <section id="accuracy">
          <h2 className="text-lg font-semibold text-zinc-900">
            No Guarantee of Accuracy
          </h2>
          <p className="mt-2">
            We do not guarantee accuracy of word counts, text conversions, or
            speech generation. You use the tools at your own risk.
          </p>
        </section>

        <section id="responsibility">
          <h2 className="text-lg font-semibold text-zinc-900">
            User Responsibility
          </h2>
          <p className="mt-2">
            You agree not to use the website for illegal activities, copyright
            infringement, harmful or malicious content, or uploading viruses or
            malware.
          </p>
        </section>

        <section id="intellectual-property">
          <h2 className="text-lg font-semibold text-zinc-900">
            Intellectual Property
          </h2>
          <p className="mt-2">
            All website design, branding, and tool logic are the property of Text
            Tool unless otherwise stated. You may not copy, reproduce, or
            redistribute the website content without permission.
          </p>
        </section>

        <section id="limitation">
          <h2 className="text-lg font-semibold text-zinc-900">
            Limitation of Liability
          </h2>
          <p className="mt-2">
            To the fullest extent permitted by law, Text Tool shall not be liable
            for any data loss, business interruption, errors in text output, or
            indirect or consequential damages.
          </p>
        </section>

        <section id="third-party">
          <h2 className="text-lg font-semibold text-zinc-900">
            Third-Party Services
          </h2>
          <p className="mt-2">
            We may integrate third-party services such as analytics or advertising
            providers. We are not responsible for their policies or practices.
          </p>
        </section>

        <section id="modifications">
          <h2 className="text-lg font-semibold text-zinc-900">Modifications</h2>
          <p className="mt-2">
            We may modify or discontinue the service at any time without notice.
          </p>
        </section>

        <section id="changes">
          <h2 className="text-lg font-semibold text-zinc-900">
            Changes to Terms
          </h2>
          <p className="mt-2">
            We may update these Terms and Conditions at any time. Continued use of
            the website constitutes acceptance of updated terms.
          </p>
        </section>

        <section id="governing-law">
          <h2 className="text-lg font-semibold text-zinc-900">Governing Law</h2>
          <p className="mt-2">
            These Terms shall be governed by applicable laws in the jurisdiction
            where the website operator resides.
          </p>
        </section>

        <section id="contact">
          <h2 className="text-lg font-semibold text-zinc-900">
            Contact Information
          </h2>
          <p className="mt-2">Contact information will be updated soon.</p>
        </section>
      </div>
    </LegalLayout>
  );
}
