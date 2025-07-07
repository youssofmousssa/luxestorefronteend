
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, MessageCircle, Heart, Headphones, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Contact form submitted:', data);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    form.reset();
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Showroom',
      details: ['123 Fashion Avenue', 'New York, NY 10001', 'United States'],
      action: 'Get Directions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', 'Mon - Fri: 9AM - 8PM EST', 'Sat - Sun: 10AM - 6PM EST'],
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: ['support@luxestore.com', 'partnerships@luxestore.com', 'press@luxestore.com'],
      action: 'Send Email'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      details: ['Available 24/7', 'Average response: 2 minutes', 'Multilingual support'],
      action: 'Start Chat'
    }
  ];

  const departments = [
    { name: 'General Inquiry', value: 'general', icon: MessageCircle },
    { name: 'Order Support', value: 'orders', icon: Headphones },
    { name: 'Partnership', value: 'partnership', icon: Heart },
    { name: 'Press & Media', value: 'press', icon: Globe }
  ];

  const faqs = [
    {
      question: 'What are your shipping options?',
      answer: 'We offer free standard shipping on orders over $200, with express and overnight options available.'
    },
    {
      question: 'What is your return policy?',
      answer: '30-day hassle-free returns with free return shipping for items in original condition.'
    },
    {
      question: 'Do you offer personal styling services?',
      answer: 'Yes! Our personal stylists are available for complimentary consultations via video call or in-store.'
    },
    {
      question: 'How can I track my order?',
      answer: 'You\'ll receive a tracking number via email once your order ships, with real-time updates.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/80 to-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="hero-title text-gradient mb-6">
              Get In Touch
            </h1>
            <p className="hero-subtitle text-white/80 max-w-3xl mx-auto">
              We're here to help with any questions about our products, services, or your shopping experience. 
              Reach out to our dedicated team of luxury fashion experts.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mobile-padding lg:px-8 py-16">
        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <Card key={index} className="glass-card text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-white">{info.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-white/70 text-sm">{detail}</p>
                  ))}
                  <Button variant="outline" size="sm" className="mt-4 w-full btn-secondary">
                    {info.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <Card className="glass-card shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center text-white">
                  <MessageCircle className="w-6 h-6 mr-2 text-primary" />
                  Send Us a Message
                </CardTitle>
                <CardDescription className="text-white/70">
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} className="glass-input-enhanced" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} className="glass-input-enhanced" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Subject</FormLabel>
                          <FormControl>
                            <select {...field} className="glass-input-enhanced w-full p-3 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent">
                              <option value="">Select a topic</option>
                              {departments.map((dept) => (
                                <option key={dept.value} value={dept.value} className="bg-gray-800 text-white">
                                  {dept.name}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us how we can help you..."
                              className="min-h-[120px] glass-input-enhanced"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full btn-primary">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-white/70">
                Find quick answers to common questions. Can't find what you're looking for? 
                Contact us directly.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="glass-card hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-white">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="glass-card text-center p-6 rounded-xl">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-sm text-white/70">Response Time</div>
              </div>
              <div className="glass-card text-center p-6 rounded-xl">
                <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-white/70">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="glass-card overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Visit Our Flagship Store</CardTitle>
              <CardDescription className="text-white/70">
                Experience our collections in person at our New York showroom, 
                featuring personal styling services and exclusive pieces.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-gray-800/50 h-64 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-white/80">Interactive Map</p>
                  <p className="text-sm text-white/60">123 Fashion Avenue, New York, NY 10001</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
