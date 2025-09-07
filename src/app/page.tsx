'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Scale, 
  MessageCircle, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Star
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Hero from '@/components/layout/Hero'
import Features from '@/components/layout/Features'
import ChatInterface from '@/components/ui/ChatInterface'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <main className="flex-1">
      <Header />
      <Hero onStartChat={() => setIsChatOpen(true)} />
      <Features />
      
      {/* Trust Section */}
      <section className="py-16 bg-legal-50">
        <div className="container-width section-padding">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-legal-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Trusted by Legal Professionals
            </motion.h2>
            <motion.p 
              className="text-lg text-legal-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Created in collaboration with UK lawyers and advisors, covering most legal issues
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'UK Legal Compliance', desc: 'Built with UK legal standards' },
              { icon: Users, title: 'Expert Collaboration', desc: 'Developed with legal professionals' },
              { icon: CheckCircle, title: 'Comprehensive Coverage', desc: 'Handles most legal scenarios' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="card text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-legal-900 mb-2">{item.title}</h3>
                <p className="text-legal-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-width section-padding text-center">
          <motion.h2 
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Get Legal Assistance?
          </motion.h2>
          <motion.p 
            className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Start chatting with our AI legal assistant and get instant, reliable legal guidance
          </motion.p>
          <motion.button
            className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            onClick={() => setIsChatOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Consultation
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      <Footer />
      
      {/* Chat Interface */}
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </main>
  )
}
