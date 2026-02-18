import Link from "next/link";
import LegalLayout from "../../components/LegalLayout";

const LAST_UPDATED = "February 2026";

const SECTIONS = [
  { id: "intro", title: "Introduction" },
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "cookies", title: "Cookies" },
  { id: "third-party-services", title: "Third-Party Services" },
  { id: "data-storage", title: "Data Storage" },
  { id: "children", title: "Children’s Privacy" },
  { id: "rights", title: "GDPR & CCPA Rights" },
  { id: "security", title: "Security" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Information" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="This Privacy Policy explains how Text Tool collects, uses, and protects information when you use our website and tools."
      lastUpdated={LAST_UPDATED}
    >
      <nav aria-label="Privacy policy sections">
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
        <section id="intro">
          <h2 className="text-lg font-semibold text-zinc-900">Introduction</h2>
          <p className="mt-2">
            Welcome to Text Tool. Your privacy is important to us. This Privacy
            Policy explains how we collect, use, and protect information when you
            use our website and tools.
          </p>
        </section>

        <section id="information-we-collect">
          <h2 className="text-lg font-semibold text-zinc-900">
            Information We Collect
          </h2>
          <h3 className="mt-4 text-sm font-semibold text-zinc-900">
            A. Text You Enter Into Tools
          </h3>
          <p className="mt-2">
            The text you enter into Word Counter, Case Converter, Remove Duplicate
            Lines, and Text-to-Speech is processed locally in your browser whenever
            possible. We do not store, save, or log your text content on our
            servers.
          </p>
          <h3 className="mt-4 text-sm font-semibold text-zinc-900">
            B. Automatically Collected Information
          </h3>
          <p className="mt-2">
            We may collect limited non-personal information such as browser type,
            device type, pages visited, time spent on pages, and IP address
            (anonymized where applicable). This information may be collected via
            analytics services in the future.
          </p>
        </section>

        <section id="cookies">
          <h2 className="text-lg font-semibold text-zinc-900">Cookies</h2>
          <p className="mt-2">
            We may use cookies to improve user experience, analyze traffic, and
            support advertising services. You can disable cookies in your browser
            settings.
          </p>
        </section>

        <section id="third-party-services">
          <h2 className="text-lg font-semibold text-zinc-900">
            Third-Party Services
          </h2>
          <p className="mt-2">
            In the future, we may use Google Analytics, Google AdSense, or cloud
            hosting providers. These third parties may collect information
            according to their own privacy policies. We do not sell your personal
            data.
          </p>
        </section>

        <section id="data-storage">
          <h2 className="text-lg font-semibold text-zinc-900">Data Storage</h2>
          <p className="mt-2">
            We do not require user accounts, store user text input, or maintain
            user databases. All processing is intended to be temporary and
            session-based.
          </p>
        </section>

        <section id="children">
          <h2 className="text-lg font-semibold text-zinc-900">
            Children’s Privacy
          </h2>
          <p className="mt-2">
            This website is not directed to children under 13. We do not knowingly
            collect personal data from children.
          </p>
        </section>

        <section id="rights">
          <h2 className="text-lg font-semibold text-zinc-900">
            GDPR & CCPA Rights
          </h2>
          <p className="mt-2">
            Depending on your location, you may have rights to access personal
            data, request deletion, object to processing, or request data
            portability. Since we do not store personal data, most of these rights
            may not apply in practice.
          </p>
        </section>

        <section id="security">
          <h2 className="text-lg font-semibold text-zinc-900">Security</h2>
          <p className="mt-2">
            We implement reasonable safeguards to protect the site. However, no
            method of transmission or storage is completely secure.
          </p>
        </section>

        <section id="changes">
          <h2 className="text-lg font-semibold text-zinc-900">
            Changes to This Policy
          </h2>
          <p className="mt-2">
            We may update this Privacy Policy periodically. Updates will be posted
            on this page.
          </p>
        </section>

        <section id="contact">
          <h2 className="text-lg font-semibold text-zinc-900">
            Contact Information
          </h2>
          <p className="mt-2">
            Contact information will be updated soon.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
