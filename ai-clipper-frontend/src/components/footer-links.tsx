import Link from "next/link";

export default function FooterLinks() {
  return (
    <>
      <div>
        <h4 className="mb-4 font-semibold">Product</h4>
        <ul className="space-y-2 text-zinc-600">
          <li>
            <Link href="/blog" className="transition-colors hover:text-cyan-400">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/careers" className="transition-colors hover:text-cyan-400">
              Careers
            </Link>
          </li>
          <li>
            <Link href="/api" className="transition-colors hover:text-cyan-400">
              API
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 font-semibold">Support</h4>
        <ul className="space-y-2 text-zinc-600">
          <li>
            <Link href="/help" className="transition-colors hover:text-cyan-400">
              Help Center
            </Link>
          </li>
          <li>
            <Link href="/contact" className="transition-colors hover:text-cyan-400">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/status" className="transition-colors hover:text-cyan-400">
              Status
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 font-semibold">Legal</h4>
        <ul className="space-y-2 text-zinc-600">
          <li>
            <Link href="/privacy" className="transition-colors hover:text-cyan-400">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="transition-colors hover:text-cyan-400">
              Terms
            </Link>
          </li>
          <li>
            <Link href="/cookie-policy" className="transition-colors hover:text-cyan-400">
              Cookie Policy
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
