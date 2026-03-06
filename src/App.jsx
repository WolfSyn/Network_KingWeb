import React, { useMemo, useState } from "react";
import { NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";


const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Button = ({ variant = "primary", className = "", ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles = {
    primary:
      "bg-black text-white hover:bg-neutral-800 focus:ring-neutral-900",
    ghost:
      "bg-white/0 text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-400",
    soft:
      "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-400",
  };
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
};

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs font-semibold text-neutral-700 backdrop-blur">
    {children}
  </span>
);

const SectionTitle = ({ kicker, title, desc }) => (
  <div className="max-w-2xl">
    {kicker ? <div className="mb-3"><Badge>{kicker}</Badge></div> : null}
    <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">{title}</h2>
    {desc ? <p className="mt-3 text-neutral-600">{desc}</p> : null}
  </div>
);

const Card = ({ className = "", children }) => (
  <div className={`rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ${className}`}>
    {children}
  </div>
);

const Divider = () => <div className="h-px w-full bg-neutral-200" />;

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

const navItems = [
  { label: "Home", to: "/" },
  { label: "WAN", to: "/wan" },
  { label: "LAN", to: "/lan" },
  { label: "Wireless", to: "/wireless" },
  { label: "Cameras", to: "/cameras" },
  { label: "Support", to: "/support" },
  { label: "About Us", to: "/about" },
  { label: "Request Quote", to: "/request-quote", cta: true },
];

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Premium mesh background (Readymode-ish) */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-neutral-200/60 blur-3xl" />
        <div className="absolute top-20 left-10 h-[420px] w-[420px] rounded-full bg-neutral-200/40 blur-3xl" />
        <div className="absolute top-40 right-10 h-[420px] w-[420px] rounded-full bg-neutral-200/40 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-neutral-50/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
            <img
              src="Network_Kingdom_logo.png"
              alt="Network Kingdom Logo"
             className="h-20 w-auto"
            />

         <div className="leading-tight">
          <div className="text-sm font-extrabold tracking-tight">
              Network Kingdom
          </div>
          <div className="text-xs text-neutral-500">
               Networks • Wireless • Security
            </div>
          </div>
        </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <Button variant="soft" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
              {open ? "Close" : "Menu"}
            </Button>
          </div>
        </Container>

        {open ? (
          <div className="border-t border-neutral-200 bg-neutral-50 lg:hidden">
            <Container className="py-3">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <MobileNavItem key={item.to} {...item} onNavigate={() => setOpen(false)} />
                ))}
              </div>
            </Container>
          </div>
        ) : null}
      </header>

      <main className="relative">{children}</main>

      <footer className="border-t border-neutral-200 bg-white">
        <Container className="py-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="text-sm font-extrabold">Network Kingdom</div>
              <p className="mt-2 text-sm text-neutral-600">
                Modern IT services for growing businesses: structured networking, wireless deployments,
                and physical security solutions.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold">Services</div>
              <ul className="mt-2 space-y-1 text-sm text-neutral-600">
                <li>WAN/LAN Networking</li>
                <li>Wireless & Wi-Fi</li>
                <li>Cameras & Surveillance</li>
                <li>Managed IT Support</li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold">Contact</div>
              <ul className="mt-2 space-y-1 text-sm text-neutral-600">
                <li>(555) 555-5555</li>
                <li>support@[client].com</li>
                <li>Mon–Fri 9am–5pm</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()} Network Kingdom. All rights reserved.
            </p>
            <div className="flex gap-2">
              <a className="text-xs text-neutral-500 hover:text-neutral-900" href="#!">Privacy</a>
              <span className="text-xs text-neutral-300">•</span>
              <a className="text-xs text-neutral-500 hover:text-neutral-900" href="#!">Terms</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

/**
 * Updated NavItem:
 * - Active state underline (premium, clean)
 * - No "pill background" on active (more Readymode-like)
 */
const NavItem = ({ label, to, cta }) => (
  <NavLink
    to={to}
    className={({ isActive }) => {
      const base = "relative rounded-2xl px-3 py-2 text-sm font-semibold transition";
      if (cta) return `${base} bg-black text-white hover:bg-neutral-800`;
      return isActive
        ? `${base} text-neutral-900`
        : `${base} text-neutral-700 hover:text-neutral-900`;
    }}
  >
    {({ isActive }) => (
      <span className="relative">
        {label}
        {!cta && isActive ? (
          <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-neutral-900" />
        ) : null}
      </span>
    )}
  </NavLink>
);

const MobileNavItem = ({ label, to, cta, onNavigate }) => (
  <NavLink
    to={to}
    onClick={onNavigate}
    className={({ isActive }) => {
      const base = "rounded-2xl px-3 py-3 text-sm font-semibold transition";
      if (cta) return `${base} bg-black text-white hover:bg-neutral-800`;
      return isActive
        ? `${base} bg-neutral-100 text-neutral-900`
        : `${base} text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900`;
    }}
  >
    {label}
  </NavLink>
);

// ---------- Pages ----------
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero
        kicker="Reliable IT for modern teams"
        title={
          <>
            Make Technology Work For You | If it has an IP Address we support it<br className="hidden sm:block" />
          </>
        }
        subtitle="Hire professionals with years of experience getting technology to work, Achieve perfect results."
        primaryAction={{ label: "Request a Quote", onClick: () => navigate("/request-quote") }}
        secondaryAction={{ label: "Explore Services", onClick: () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }) }}
      />

      <Container className="py-12 sm:py-16" id="services">
        <SectionTitle
          kicker="What we do"
          title="IT services built for real businesses"
          desc="Clear scopes, clean installs, and support that doesn’t disappear after launch."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <ServiceCard
            title="WAN"
            desc="Internet circuits, firewall migrations, VPNs, and resilience planning."
            to="/wan"
          />
          <ServiceCard
            title="LAN"
            desc="Switching, cabling, IDF/MDF wiring, monitoring, and endpoint support."
            to="/lan"
          />
          <ServiceCard
            title="Wireless"
            desc="Design, install, and optimize Wi-Fi for coverage, capacity, and security."
            to="/wireless"
          />
          <ServiceCard
            title="Cameras"
            desc="Surveillance systems, NVR setups, remote access, and retention policies."
            to="/cameras"
          />
          <ServiceCard
            title="Support"
            desc="On-call and managed IT plans: monitoring, patching, and helpdesk."
            to="/support"
          />
        </div>
      </Container>

      <div className="bg-white">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTitle
                kicker="Why teams choose us"
                title="Simple, transparent, professional"
                desc="We focus on outcomes: stable networks, strong Wi-Fi, clear video coverage, and responsive support."
              />
              <ul className="mt-6 space-y-3 text-sm text-neutral-700">
                <li className="flex gap-3">
                  <CheckIcon />
                  <span><b>Clean installs:</b> labeled cabling, tidy racks, documented handoff.</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon />
                  <span><b>Security-first:</b> least privilege, segmented networks, hardened configs.</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon />
                  <span><b>Support that answers:</b> realistic SLAs and clear escalation paths.</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Badge>Fast turnaround</Badge>
                <Badge>Modern stack</Badge>
                <Badge>Documentation included</Badge>
                <Badge>Scalable for growth</Badge>
              </div>
            </div>

            <Card className="relative overflow-hidden">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-neutral-200/70 blur-2xl" />
              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-neutral-200/70 blur-2xl" />
              <div className="relative">
                <div className="text-sm font-semibold text-neutral-900">Typical engagement</div>
                <p className="mt-2 text-sm text-neutral-600">
                  A lightweight process that feels “agency-level” without the agency overhead.
                </p>

                <div className="mt-6 space-y-4">
                  <TimelineItem n="01" title="Discovery" desc="Quick call + site notes + goals and constraints." />
                  <TimelineItem n="02" title="Plan" desc="Network/Wi-Fi/Cameras scope, parts list, and schedule." />
                  <TimelineItem n="03" title="Install" desc="Implementation with testing, labeling, and cleanup." />
                  <TimelineItem n="04" title="Support" desc="Monitoring + maintenance + on-demand help." />
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <SectionTitle
          kicker="FAQ"
          title="Questions, answered"
          desc="Have any questions? refer to other customers frequent quesions!"
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <FaqItem q="Do you work after hours?" a="Yes. We can schedule installs to minimize downtime, including evenings and weekends." />
          <FaqItem q="Can you support multiple locations?" a="Absolutely. We can design standardized setups and manage them across sites." />
          <FaqItem q="Do you sell hardware?" a="We can provide a recommended parts list or procure approved equipment depending on your preference." />
          <FaqItem q="How do quotes work?" a="Tell us what you need. We’ll confirm requirements and send a clear scope with pricing and timeline." />
        </div>

        <div className="mt-10">
          <CTA />
        </div>
      </Container>
    </>
  );
};

const PageShell = ({ kicker, title, subtitle, children }) => (
  <>
    <div className="bg-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="mb-3"><Badge>{kicker}</Badge></div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
            <p className="mt-3 text-neutral-600">{subtitle}</p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <NavLink to="/request-quote" className="inline-flex">
              <span className="inline-flex items-center justify-center rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800">
                Request Quote
              </span>
            </NavLink>
          </div>
        </div>
      </Container>
      <Divider />
    </div>

    <Container className="py-12 sm:py-16">{children}</Container>
  </>
);

/* ===========================
   PREMIUM SERVICE UI HELPERS
=========================== */
const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700">
    {children}
  </span>
);

const FeatureRow = ({ title, desc }) => (
  <div className="group flex gap-4 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-2xl bg-black text-white text-sm">
      ✓
    </div>
    <div className="min-w-0">
      <div className="text-sm font-semibold text-neutral-900">{title}</div>
      {desc ? <div className="mt-1 text-sm text-neutral-600">{desc}</div> : null}
    </div>
  </div>
);

const OutcomeCard = ({ title, desc }) => (
  <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
    <div className="text-sm font-semibold text-neutral-900">{title}</div>
    <p className="mt-1 text-sm text-neutral-600">{desc}</p>
  </div>
);

const ServiceCTA = ({ label, to = "/request-quote" }) => (
  <div className="mt-10 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
    <div className="px-6 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-lg font-extrabold tracking-tight text-neutral-900">
            Ready to improve your {label}?
          </div>
          <p className="mt-2 text-sm text-neutral-600">
            Tell us a few details and we’ll respond with a clear scope, timeline, and estimate.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
        <NavLink to={`${to}?service=${encodeURIComponent(label)}`} className="inline-flex">
            <span className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800">
              Request Quote
            </span>
          </NavLink>
          <NavLink to="/" className="inline-flex">
            <span className="inline-flex items-center justify-center rounded-2xl bg-neutral-100 px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-200">
              Back to Home
            </span>
          </NavLink>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Pill>Clean installs</Pill>
        <Pill>Documentation</Pill>
        <Pill>Security-first</Pill>
        <Pill>Fast turnaround</Pill>
      </div>
    </div>
  </div>
);

/* ===========================
   PREMIUM WAN / LAN PAGES
=========================== */
const Wan = () => (
  <PageShell
    kicker="WAN"
    title="Internet, security, and resilient connectivity."
    subtitle="We harden your edge, improve uptime, and secure remote access—without complexity."
  >
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <Pill>Firewalls</Pill>
          <Pill>VPN</Pill>
          <Pill>Redundant circuits</Pill>
          <Pill>Router upgrades</Pill>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FeatureRow
            title="Router upgrades and maintenance"
            desc="Keep firmware, configs, and throughput aligned with your business needs."
          />
          <FeatureRow
            title="Increase bandwidth + resiliency"
            desc="Add a second internet circuit for failover and higher performance."
          />
          <FeatureRow
            title="Circuit turnups and migrations"
            desc="Plan cutovers carefully to minimize downtime and surprises."
          />
          <FeatureRow
            title="Edge security hardening"
            desc="Reduce exposure from misconfigurations that invite cyber attacks."
          />
          <FeatureRow
            title="Firewall acquisition + implementation"
            desc="Select and deploy a firewall appliance that fits your environment."
          />
          <FeatureRow
            title="Firewall migrations & maintenance"
            desc="We specialize in clean migrations and long-term support."
          />
          <FeatureRow
            title="Secure remote access (VPN)"
            desc="Protect remote sessions with proper authentication and encryption."
          />
          <FeatureRow
            title="Close the door on cyber criminals"
            desc="Security-first practices: segmentation, least privilege, and monitoring."
          />
        </div>
      </div>

      <div className="lg:col-span-4">
        <Card className="sticky top-24">
          <div className="text-sm font-semibold text-neutral-900">What you get</div>
          <p className="mt-2 text-sm text-neutral-600">
            A hardened, documented WAN edge that supports growth and reduces risk.
          </p>

          <div className="mt-5 space-y-3">
            <OutcomeCard title="Higher uptime" desc="Redundancy + clean configs that recover fast." />
            <OutcomeCard title="Stronger security" desc="Firewall + VPN best practices and safer remote access." />
            <OutcomeCard title="Clear documentation" desc="Easy handoff, easier audits, easier maintenance." />
          </div>

          <div className="mt-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="text-xs font-semibold text-neutral-700">Typical timeline</div>
            <div className="mt-2 text-sm text-neutral-600">
              Discovery → Plan → Install → Validate → Support
            </div>
          </div>
        </Card>
      </div>
    </div>

    <ServiceCTA label="WAN" />
  </PageShell>
);

const Lan = () => (
  <PageShell
    kicker="LAN"
    title="Clean switching, cabling, and performance."
    subtitle="We stabilize your local network and keep devices connected—reliably and visibly."
  >
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <Pill>Switching</Pill>
          <Pill>Cabling</Pill>
          <Pill>Monitoring</Pill>
          <Pill>Endpoint support</Pill>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FeatureRow
            title="Switch upgrades, recommendations, maintenance"
            desc="Right-size your switching for growth and performance."
          />
          <FeatureRow
            title="Alerts for down equipment"
            desc="Visibility and notifications before users feel it."
          />
          <FeatureRow
            title="Connectivity issue troubleshooting"
            desc="Root cause identification and permanent fixes."
          />
          <FeatureRow
            title="Add LAN equipment for proper monitoring"
            desc="Better insight into utilization, errors, and capacity."
          />
          <FeatureRow
            title="Optimize switch performance (C-Domains)"
            desc="Tune configs for maximum throughput and stability."
          />
          <FeatureRow
            title="Fiber, Cat7, and electrical installs"
            desc="Certified professionals for clean, compliant installation."
          />
          <FeatureRow
            title="IDF and C-Box wiring installations"
            desc="Labeling, tidy racks, and structured documentation."
          />
          <FeatureRow
            title="Configuration and endpoint support"
            desc="Servers, desktops, laptops, printers—kept connected and working."
          />
        </div>
      </div>

      <div className="lg:col-span-4">
        <Card className="sticky top-24">
          <div className="text-sm font-semibold text-neutral-900">What you get</div>
          <p className="mt-2 text-sm text-neutral-600">
            A LAN that’s organized, performant, and easier to support long-term.
          </p>

          <div className="mt-5 space-y-3">
            <OutcomeCard title="Fewer daily issues" desc="Cleaner switching + better physical infrastructure." />
            <OutcomeCard title="Better performance" desc="Optimized configs and improved utilization visibility." />
            <OutcomeCard title="Professional cabling" desc="Clean runs, labeling, and documentation that scales." />
          </div>

          <div className="mt-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="text-xs font-semibold text-neutral-700">Ideal for</div>
            <div className="mt-2 text-sm text-neutral-600">
              Offices, warehouses, retail, multi-site operations.
            </div>
          </div>
        </Card>
      </div>
    </div>

    <ServiceCTA label="LAN" />
  </PageShell>
);

const Wireless = () => (
  <PageShell
    kicker="Wireless"
    title="Wi-Fi that feels effortless."
    subtitle="A modern wireless setup that boosts speed, coverage, and reliability—indoors and outdoors."
  >
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT */}
      <div className="lg:col-span-8">
        {/* Chips (same vibe as LAN screenshot) */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Pill>System refresh</Pill>
          <Pill>Controller / Standalone</Pill>
          <Pill>Outdoor coverage</Pill>
          <Pill>Site surveys</Pill>
          <Pill>Performance tuning</Pill>
        </div>

        {/* Feature cards grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FeatureRow
            title="Complete wireless refresh"
            desc="Replace outdated gear and remove speed limitations with modern Wi-Fi technology."
          />
          <FeatureRow
            title="Controller-based or standalone installs"
            desc="We support both enterprise controller systems and high-performance standalone deployments."
          />
          <FeatureRow
            title="Outdoor Wi-Fi expansion"
            desc="Extend connectivity outside with external APs while keeping performance strong."
          />
          <FeatureRow
            title="Wireless site surveys for new installs"
            desc="Plan AP placement, density, interference, and roaming to achieve peak performance."
          />
          <FeatureRow
            title="Coverage troubleshooting"
            desc="Solve dead zones, drops, and inconsistent connectivity with a proper plan—not guesswork."
          />
          <FeatureRow
            title="Cabling & electrical support"
            desc="We assist with cabling and electrical work so APs can be installed where they actually need to be."
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="lg:col-span-4">
        <Card className="sticky top-24">
          <div className="text-sm font-semibold text-neutral-900">What you get</div>
          <p className="mt-2 text-sm text-neutral-600">
            A wireless network that’s fast, stable, and easier to support long-term.
          </p>

          <div className="mt-5 space-y-3">
            <OutcomeCard
              title="Better coverage"
              desc="Fewer dead zones with proper placement and tuned power/channel planning."
            />
            <OutcomeCard
              title="Higher performance"
              desc="Modern Wi-Fi improvements that feel immediate—especially in high-use areas."
            />
            <OutcomeCard
              title="More reliability"
              desc="Cleaner roaming and fewer drops for meetings, VoIP, and day-to-day work."
            />
          </div>

          <div className="mt-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="text-xs font-semibold text-neutral-700">Ideal for</div>
            <div className="mt-2 text-sm text-neutral-600">
              Offices, warehouses, retail, restaurants, multi-site operations, outdoor patios/yards.
            </div>
          </div>
        </Card>
      </div>
    </div>

    {/* Same premium bottom CTA style as WAN/LAN */}
    <ServiceCTA label="Wireless" />
  </PageShell>
);

const Cameras = () => (
  <PageShell
    kicker="Cameras"
    title="Commercial surveillance with clear coverage."
    subtitle="Professional camera systems designed for visibility, reliability, and secure remote access."
  >
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT */}
      <div className="lg:col-span-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <Pill>4K cameras</Pill>
          <Pill>Color night vision</Pill>
          <Pill>NVR / Server install</Pill>
          <Pill>Remote viewing</Pill>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FeatureRow
            title="Commercial-grade camera installation"
            desc="Deploy 4K-compatible surveillance systems with color night vision for clear, high-quality monitoring."
          />
          <FeatureRow
            title="Professional interior and exterior cabling"
            desc="Clean, dependable cabling installation for both indoor and outdoor camera deployments."
          />
          <FeatureRow
            title="Coverage assessments"
            desc="Evaluate camera placement to ensure proper visibility across all important areas."
          />
          <FeatureRow
            title="Server & NVR installation"
            desc="Install and configure recording systems with H.264 and H.265 compression support."
          />
          <FeatureRow
            title="Remote viewing software"
            desc="Set up workstation and mobile-compatible software so footage can be viewed securely from anywhere."
          />
          <FeatureRow
            title="System planning and expansion"
            desc="Build surveillance setups that can scale as your site, property, or business grows."
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="lg:col-span-4">
        <Card className="sticky top-24">
          <div className="text-sm font-semibold text-neutral-900">What you get</div>
          <p className="mt-2 text-sm text-neutral-600">
            A camera system that’s professionally installed, easy to monitor, and built for dependable coverage.
          </p>

          <div className="mt-5 space-y-3">
            <OutcomeCard
              title="Clearer visibility"
              desc="High-resolution coverage with better day and night image quality."
            />
            <OutcomeCard
              title="Smarter coverage"
              desc="Proper assessment and placement reduce blind spots and improve monitoring."
            />
            <OutcomeCard
              title="Remote access"
              desc="View live and recorded footage securely from mobile devices and workstations."
            />
          </div>

          <div className="mt-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="text-xs font-semibold text-neutral-700">Ideal for</div>
            <div className="mt-2 text-sm text-neutral-600">
              Offices, warehouses, storefronts, commercial properties, parking areas, and multi-site operations.
            </div>
          </div>
        </Card>
      </div>
    </div>

    <ServiceCTA label="Cameras" />
  </PageShell>
);

const Support = () => (
  <PageShell
    kicker="Support"
    title="Reliable IT support when you need it."
    subtitle="Fast troubleshooting, proactive monitoring, and flexible support plans for businesses that depend on technology."
  >
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT SIDE */}
      <div className="lg:col-span-8">
        {/* Chips */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Pill>Remote support</Pill>
          <Pill>Onsite service</Pill>
          <Pill>Servers</Pill>
          <Pill>Workstations</Pill>
          <Pill>Network troubleshooting</Pill>
        </div>

        {/* Feature rows */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FeatureRow
            title="Remote support for workstations & servers"
            desc="Quick troubleshooting and assistance for desktops, laptops, and server environments."
          />

          <FeatureRow
            title="Onsite network troubleshooting"
            desc="Hands-on assistance for network failures, device outages, or connectivity problems."
          />

          <FeatureRow
            title="Block-hour support packages"
            desc="Purchase support hours in advance and use them whenever issues arise."
          />

          <FeatureRow
            title="Remote support plans"
            desc="Flexible plans for businesses that want dependable remote IT assistance."
          />

          <FeatureRow
            title="System monitoring & alerts"
            desc="Receive early warnings when equipment goes offline or network issues occur."
          />

          <FeatureRow
            title="Hardware & software troubleshooting"
            desc="Resolve issues with operating systems, business applications, and connected devices."
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:col-span-4">
        <Card className="sticky top-24">
          <div className="text-sm font-semibold text-neutral-900">What you get</div>
          <p className="mt-2 text-sm text-neutral-600">
            Responsive support that keeps your systems running and minimizes downtime.
          </p>

          <div className="mt-5 space-y-3">
            <OutcomeCard
              title="Faster problem resolution"
              desc="Remote tools allow us to diagnose and resolve many issues quickly."
            />

            <OutcomeCard
              title="Less downtime"
              desc="Immediate support helps restore systems before disruptions grow."
            />

            <OutcomeCard
              title="Dependable IT assistance"
              desc="A trusted technical partner for your infrastructure and daily operations."
            />
          </div>

          <div className="mt-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="text-xs font-semibold text-neutral-700">Ideal for</div>
            <div className="mt-2 text-sm text-neutral-600">
              Small businesses, offices, warehouses, and organizations without full-time IT staff.
            </div>
          </div>
        </Card>
      </div>
    </div>

    {/* Bottom CTA */}
    <ServiceCTA label="Support" />
  </PageShell>
);

const About = () => (
  <PageShell
    kicker="About Us"
    title="Built on experience. Focused on dependable results."
    subtitle="Over 15 years of solid deployments working with technology and helping small businesses stay connected, secure, and supported."
  >
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <Card>
          <div className="text-sm font-semibold">Who we are</div>
          <p className="mt-4 text-sm leading-7 text-neutral-700">
            Over 15 years of solid deployments working with technology, providing
            assistance for small businesses in need of technical support. We offer
            a broad portfolio of experience in various areas of networking,
            including router installation, network segmentations, wireless
            deployments and upgrades, and WAN &amp; LAN assessments for proper
            upgrade planning and system refresh.
          </p>
        </Card>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <FeatureRow
            title="Router installation"
            desc="Reliable setup and deployment tailored to your business environment."
          />
          <FeatureRow
            title="Network segmentation"
            desc="Smarter, safer network design for performance and security."
          />
          <FeatureRow
            title="Wireless deployments & upgrades"
            desc="Modern Wi-Fi solutions for better coverage, speed, and reliability."
          />
          <FeatureRow
            title="WAN & LAN assessments"
            desc="Evaluate your current setup and plan upgrades with confidence."
          />
        </div>
      </div>

      <div className="lg:col-span-4">
        <Card className="sticky top-24">
          <div className="text-sm font-semibold text-neutral-900">What we bring</div>
          <p className="mt-2 text-sm text-neutral-600">
            A practical, experienced approach to networking and technical support for growing businesses.
          </p>

          <div className="mt-5 space-y-3">
            <OutcomeCard
              title="15+ years of experience"
              desc="Hands-on work across installations, upgrades, and troubleshooting."
            />
            <OutcomeCard
              title="Small business support"
              desc="Technical help designed for real business needs, not overcomplicated solutions."
            />
            <OutcomeCard
              title="Broad networking expertise"
              desc="From routing and segmentation to wireless and infrastructure planning."
            />
          </div>

          <div className="mt-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="text-xs font-semibold text-neutral-700">Focus areas</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Pill>Routing</Pill>
              <Pill>Segmentation</Pill>
              <Pill>Wireless</Pill>
              <Pill>WAN</Pill>
              <Pill>LAN</Pill>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <ServiceCTA label="network" />
  </PageShell>
);

const RequestQuote = () => {
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  const [selectedService, setSelectedService] = useState("Multiple / Not sure");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");

    const allowedServices = [
      "WAN",
      "LAN",
      "Wireless",
      "Cameras",
      "Support",
      "Multiple / Not sure",
    ];

    if (service && allowedServices.includes(service)) {
      setSelectedService(service);
    }
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "loading", msg: "Sending your request..." });

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      location: formData.get("location"),
      details: formData.get("details"),
      _subject: `New Quote Request - ${formData.get("service") || "General"}`,
    };

    try {
      const response = await fetch("https://formspree.io/f/mkoqnvap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus({
          type: "success",
          msg: "Thanks! Your quote request was sent successfully.",
        });
        e.currentTarget.reset();
        setSelectedService("Multiple / Not sure");
      } else {
        const data = await response.json().catch(() => null);
        setStatus({
          type: "error",
          msg:
            data?.errors?.[0]?.message ||
            "Something went wrong while sending your request. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        msg: "Network error. Please try again in a moment.",
      });
    }
  }

  return (
    <PageShell
      kicker="Request Quote"
      title="Tell us what you need."
      subtitle="Fill this out and we’ll follow up with clarifying questions and a clear estimate."
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Card>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" placeholder="Jane Doe" required />
                <Field label="Company" name="company" placeholder="Acme LLC" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" placeholder="jane@acme.com" required />
                <Field label="Phone" name="phone" placeholder="(555) 555-5555" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Service"
                  name="service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  options={[
                    "WAN",
                    "LAN",
                    "Wireless",
                    "Cameras",
                    "Support",
                    "Multiple / Not sure",
                  ]}
                />
                <Field label="Location" name="location" placeholder="City, State" />
              </div>

              <TextArea
                label="Project details"
                name="details"
                placeholder="Tell us what you're trying to accomplish, timeline, number of sites, etc."
                rows={5}
              />

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button type="submit" disabled={status.type === "loading"}>
                  {status.type === "loading" ? "Sending..." : "Submit Request"}
                </Button>
                <span className="text-xs text-neutral-500">
                  Quote requests will be delivered to your email.
                </span>
              </div>

              {status.type === "success" ? (
                <p className="mt-3 rounded-2xl bg-neutral-100 px-4 py-3 text-sm text-neutral-700">
                  {status.msg}
                </p>
              ) : null}

              {status.type === "error" ? (
                <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {status.msg}
                </p>
              ) : null}
            </form>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card className="sticky top-24">
            <div className="text-sm font-semibold">What happens next</div>
            <div className="mt-4 space-y-3 text-sm text-neutral-700">
              <Step n="1" title="Quick follow-up" desc="We confirm requirements and any site constraints." />
              <Step n="2" title="Scope & estimate" desc="You get a clear plan, price, and schedule." />
              <Step n="3" title="Schedule work" desc="We coordinate install time and minimize downtime." />
            </div>

            <Divider />
            <div className="mt-5 text-sm">
              <div className="font-semibold">Prefer to talk?</div>
              <p className="mt-2 text-neutral-600">Call (555) 555-5555 or email support@[client].com</p>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
};

// ---------- Reusable UI ----------
const Hero = ({ kicker, title, subtitle, primaryAction, secondaryAction }) => (
  <section className="relative overflow-hidden">
    {/* Background video */}
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src={`${import.meta.env.BASE_URL}Network%20Kingdom%20Video.mp4`} type="video/mp4" />
    </video>

    {/* Overlay for readability (Cisco-ish) */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-neutral-50" />
    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

    {/* Content */}
    <Container className="relative py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          {/* Kicker badge */}
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {kicker}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-xl text-white/80">{subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {/* Primary */}
            <button
              onClick={primaryAction.onClick}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/40"
            >
              {primaryAction.label}
            </button>

            {/* Secondary */}
            <button
              onClick={secondaryAction.onClick}
              className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black/40"
            >
              {secondaryAction.label}
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-xs text-white/75">
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">
              Licensed & insured
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">
              Fast installs
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">
              Documentation included
            </span>
          </div>
        </div>

        {/* Right card (glass effect for video background) */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold text-white">Service snapshot</div>
            <p className="mt-2 text-sm text-white/80">
              This block is a “mock dashboard” style card—swap for screenshots, metrics, or a product-style visual.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                <div className="text-xs text-white/70">Network uptime (goal)</div>
                <div className="text-sm font-bold text-white">99.9%</div>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                <div className="text-xs text-white/70">Wi-Fi coverage</div>
                <div className="text-sm font-bold text-white">Full site</div>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                <div className="text-xs text-white/70">Camera retention</div>
                <div className="text-sm font-bold text-white">30 days</div>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                <div className="text-xs text-white/70">Support response</div>
                <div className="text-sm font-bold text-white">&lt; 2 hours</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4">
              <div className="text-xs font-semibold text-white">Next steps</div>
              <p className="mt-1 text-xs text-white/70">
                Replace with a real CTA list: site visit, plan, install, support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

const ServiceCard = ({ title, desc, to }) => (
  <NavLink to={to} className="group">
    <Card className="h-full transition group-hover:-translate-y-0.5 group-hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <p className="mt-2 text-sm text-neutral-600">{desc}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-100 text-neutral-900">
          →
        </div>
      </div>
    </Card>
  </NavLink>
);

const TimelineItem = ({ n, title, desc }) => (
  <div className="flex gap-3">
    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-100 text-sm font-bold">
      {n}
    </div>
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-sm text-neutral-600">{desc}</div>
    </div>
  </div>
);

const FaqItem = ({ q, a }) => (
  <Card>
    <div className="text-sm font-semibold">{q}</div>
    <p className="mt-2 text-sm text-neutral-600">{a}</p>
  </Card>
);

const CTA = () => (
  <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
    <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-8">
        <h3 className="text-xl font-bold tracking-tight">Ready to get a quote?</h3>
        <p className="mt-2 text-sm text-neutral-600">
          Send a few details and we’ll respond with questions + a clear estimate.
        </p>
      </div>
      <div className="lg:col-span-4 lg:text-right">
        <NavLink to="/request-quote" className="inline-flex">
          <span className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800">
            Request Quote
          </span>
        </NavLink>
      </div>
    </div>
  </div>
);

const MiniStat = ({ label, value }) => (
  <Card>
    <div className="text-xs text-neutral-500">{label}</div>
    <div className="mt-2 text-2xl font-extrabold tracking-tight">{value}</div>
  </Card>
);

const Step = ({ n, title, desc }) => (
  <div className="flex gap-3">
    <div className="grid h-9 w-9 place-items-center rounded-2xl bg-neutral-100 text-sm font-bold">{n}</div>
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-sm text-neutral-600">{desc}</div>
    </div>
  </div>
);

const Field = ({ label, ...props }) => (
  <label className="block">
    <span className="text-xs font-semibold text-neutral-700">{label}</span>
    <input
      className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-400"
      {...props}
    />
  </label>
);

const SelectField = ({ label, options, ...props }) => (
  <label className="block">
    <span className="text-xs font-semibold text-neutral-700">{label}</span>
    <select
      className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-400"
      {...props}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </label>
);

const TextArea = ({ label, ...props }) => (
  <label className="block">
    <span className="text-xs font-semibold text-neutral-700">{label}</span>
    <textarea
      className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-400"
      {...props}
    />
  </label>
);

const CheckIcon = () => (
  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-xs">
    ✓
  </span>
);

// ---------- App ----------
export default function App() {
  return (
    <>
      <ScrollToTopOnRouteChange />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wan" element={<Wan />} />
          <Route path="/lan" element={<Lan />} />
          <Route path="/wireless" element={<Wireless />} />
          <Route path="/cameras" element={<Cameras />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/request-quote" element={<RequestQuote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

const NotFound = () => (
  <PageShell
    kicker="404"
    title="Page not found"
    subtitle="This page doesn’t exist yet."
  >
    <NavLink to="/" className="inline-flex">
      <span className="inline-flex items-center justify-center rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800">
        Go home
      </span>
    </NavLink>
  </PageShell>
);
