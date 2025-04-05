import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-accent text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About LexInsight */}
          <div>
            <h5 className="text-lg font-semibold text-background mb-3">
              LexInsight
            </h5>
            <p className="text-sm">
              Empowering legal awareness across India through reliable information
              and ethical practices.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-background mb-3">
              Quick Links
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articles" className="hover:text-background">
                  Articles & Blogs
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-background">
                  Video Library
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-background">
                  Q&A Forum
                </Link>
              </li>
              <li>
                <Link href="/directory" className="hover:text-background">
                  Lawyer Directory
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h5 className="text-lg font-semibold text-background mb-3">
              Resources
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-background">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-background">
                  Events & Webinars
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-background">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-background">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h5 className="text-lg font-semibold text-background mb-3">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/disclaimer"
                  className="hover:text-background font-semibold"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-background">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-background">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-accent pt-6 text-center text-sm text-background/70">
          <p>&copy; {new Date().getFullYear()} LexInsight. All Rights Reserved.</p>
          <p className="mt-1">Promoting Legal Awareness Ethically.</p>
        </div>
      </div>
    </footer>
  );
}