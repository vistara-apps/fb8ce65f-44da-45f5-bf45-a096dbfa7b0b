'use client'

import { motion } from 'framer-motion'
import { Scale, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#api' },
      { name: 'Documentation', href: '#docs' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blog', href: '#blog' },
      { name: 'Press', href: '#press' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'Disclaimer', href: '#disclaimer' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Status', href: '#status' },
      { name: 'Community', href: '#community' }
    ]
  }

  return (
    <footer className="bg-legal-900 text-white">
      <div className="container-width section-padding">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <motion.div
                className="flex items-center gap-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-primary-600 p-2 rounded-lg">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Legalo</span>
              </motion.div>
              
              <motion.p
                className="text-legal-300 mb-6 max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Empowering individuals with intelligent legal assistance. Created in collaboration 
                with UK lawyers and advisors to democratize legal knowledge.
              </motion.p>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 text-legal-300">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span>support@legalo.tech</span>
                </div>
                <div className="flex items-center gap-3 text-legal-300">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span>+44 20 7946 0958</span>
                </div>
                <div className="flex items-center gap-3 text-legal-300">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <span>London, United Kingdom</span>
                </div>
              </motion.div>
            </div>

            {/* Links sections */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              >
                <h3 className="text-white font-semibold mb-4 capitalize">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-legal-300 hover:text-primary-400 transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <motion.div
          className="border-t border-legal-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-legal-400 text-sm">
            © 2024 Legalo. All rights reserved. Built with ❤️ for accessible legal assistance.
          </p>
          
          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="text-legal-400 hover:text-primary-400 text-sm transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#terms"
              className="text-legal-400 hover:text-primary-400 text-sm transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="#cookies"
              className="text-legal-400 hover:text-primary-400 text-sm transition-colors duration-200"
            >
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
