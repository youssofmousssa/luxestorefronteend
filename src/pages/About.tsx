
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Award, Users, Globe, Heart, Target, Zap } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: '2018', title: 'Founded', description: 'LuxeStore was born from a vision to democratize luxury fashion' },
    { year: '2019', title: 'First Collection', description: 'Launched our debut evening wear collection to critical acclaim' },
    { year: '2020', title: 'Global Expansion', description: 'Extended our reach to serve customers in 25+ countries' },
    { year: '2021', title: 'Sustainability Initiative', description: 'Committed to carbon-neutral shipping and ethical sourcing' },
    { year: '2022', title: '1M+ Customers', description: 'Celebrated serving over one million satisfied customers worldwide' },
    { year: '2023', title: 'Innovation Award', description: 'Recognized as "Luxury Retailer of the Year" by Fashion Weekly' }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b60d5bb7?w=300&h=300&fit=crop&crop=face',
      bio: 'Former fashion director at Vogue with 15+ years in luxury retail'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Award-winning designer who previously worked with major fashion houses'
    },
    {
      name: 'Elena Petrov',
      role: 'Head of Curation',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Former buyer for luxury department stores with an eye for emerging trends'
    },
    {
      name: 'James Thompson',
      role: 'Customer Experience Lead',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Dedicated to ensuring every customer feels valued and heard'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Excellence',
      description: 'We believe luxury should be accessible without compromising on quality or craftsmanship.'
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'Our diverse team brings together talent and inspiration from around the world.'
    },
    {
      icon: Target,
      title: 'Customer First',
      description: 'Every decision we make is guided by what\'s best for our customers and their experience.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously evolve to meet the changing needs of modern luxury consumers.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/80 to-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-primary mr-3 animate-pulse" />
              <h1 className="hero-title text-gradient">
                About LuxeStore
              </h1>
            </div>
            <p className="hero-subtitle text-white/80 max-w-3xl mx-auto">
              Redefining luxury retail through curated excellence, exceptional service, 
              and a commitment to making premium fashion accessible to all.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mobile-padding lg:px-8 py-16">
        {/* Our Story */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-white/70">
                <p>
                  LuxeStore was founded on the belief that luxury fashion should be more than just 
                  expensive clothing—it should be an experience that elevates and inspires. 
                  Our journey began in 2018 when our founder, Sarah Chen, recognized a gap 
                  in the market for truly curated, accessible luxury.
                </p>
                <p>
                  What started as a small boutique operation has grown into a global platform 
                  serving discerning customers in over 30 countries. We've built our reputation 
                  on three core principles: exceptional curation, uncompromising quality, 
                  and personalized service that makes every customer feel valued.
                </p>
                <p>
                  Today, we're proud to partner with both established luxury brands and 
                  emerging designers, creating a diverse ecosystem where quality and 
                  creativity thrive together.
                </p>
              </div>
              <div className="mt-8 flex space-x-4">
                <Button size="lg" className="btn-primary">
                  Our Collections
                </Button>
                <Button variant="outline" size="lg" className="btn-secondary">
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Luxury fashion store interior"
                className="rounded-2xl shadow-2xl"
              />
              <div className="glass-card absolute -bottom-6 -right-6 p-6 rounded-xl">
                <div className="flex items-center space-x-4">
                  <Award className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold text-white">Award Winner</p>
                    <p className="text-sm text-white/70">Luxury Retailer 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={milestone.year} className="glass-card relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600" />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-lg px-3 py-1 badge-enhanced">
                      {milestone.year}
                    </Badge>
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white">{milestone.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    {milestone.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              These core values guide everything we do, from the partners we choose 
              to the experiences we create for our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="glass-card text-center p-6 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-white/70">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              The passionate individuals behind LuxeStore, working together to bring you 
              the finest in luxury fashion and exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="glass-card text-center group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="relative mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-transparent mx-auto" />
                  </div>
                  <CardTitle className="text-lg text-white">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/70">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-card bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-3xl p-12 text-center border border-primary/30">
          <h2 className="text-3xl font-bold mb-4 text-white">Join Our Story</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Be part of the LuxeStore community and discover what makes luxury fashion 
            truly exceptional. Your style journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary">
              <Users className="w-5 h-5 mr-2" />
              Explore Collections
            </Button>
            <Button size="lg" variant="outline" className="btn-secondary">
              Contact Our Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
