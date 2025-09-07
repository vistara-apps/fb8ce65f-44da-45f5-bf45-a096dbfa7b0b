'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Zap, Shield, Brain, Clock, Users } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: MessageCircle,
      title: 'Chat with Intelligent Bot',
      description: 'Engage in natural language conversations with our intelligent chatbot for quick and accurate answers to your legal questions.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Zap,
      title: 'AI Legal Assistance',
      description: 'Our AI-powered platform provides instant legal assistance, making complex legal matters easy to understand and manage.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: Shield,
      title: 'UK Legal Compliance',
      description: 'Built in collaboration with UK lawyers and advisors, ensuring compliance with UK legal standards and regulations.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Brain,
      title: 'Machine Learning Powered',
      description: 'Embracing the latest innovations in machine learning to provide comprehensive coverage of most legal issues.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Get legal assistance whenever you need it. Our AI assistant is available around the clock to help with your legal queries.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      icon: Users,
      title: 'Accessible to Everyone',
      description: 'We believe legal assistance should be accessible to everyone. Our platform democratizes legal knowledge for all.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container-width section-padding">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-legal-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Legalo?
          </motion.h2>
          <motion.p
            className="text-xl text-legal-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our AI-powered legal assistant combines cutting-edge technology with expert legal knowledge 
            to provide you with reliable, accessible legal guidance.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group card hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`${feature.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-legal-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-legal-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-lg text-legal-600 mb-6">
            Ready to experience the future of legal assistance?
          </p>
          <motion.button
            className="btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Legalo Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
