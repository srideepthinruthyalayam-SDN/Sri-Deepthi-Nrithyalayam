/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  Users, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Linkedin,
  Map,
  ChevronRight,
  Menu,
  X,
  Play,
  Award,
  GraduationCap,
  Clock,
  LayoutDashboard,
  LogOut,
  LogIn,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Download,
  Search,
  Plus
} from 'lucide-react';
import { DANCE_FORMS, INSTRUCTORS, BRANCHES, EVENTS, DanceForm, Instructor, Event } from './constants';
import { cn } from './lib/utils';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from './firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';

const Navbar = ({ onEnrollClick, onAdminLogin }: { onEnrollClick: () => void, onAdminLogin: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Dance Forms', href: '#dance-forms' },
    { name: 'Instructors', href: '#instructors' },
    { name: 'Events', href: '#events' },
    { name: 'Branches', href: '#branches' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-secondary font-serif text-xl font-bold">
            SDN
          </div>
          <span className={cn(
            "text-2xl font-serif font-bold tracking-tight",
            isScrolled ? "text-primary" : "text-white"
          )}>
            Sri Deepthi Nrithyalayam
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                isScrolled ? "text-gray-700" : "text-white/90"
              )}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={onEnrollClick}
            className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-red-900 transition-colors"
          >
            Enroll Now
          </button>
          <button 
            onClick={onAdminLogin}
            className={cn(
              "p-2 rounded-full transition-colors",
              isScrolled ? "text-gray-400 hover:text-primary" : "text-white/40 hover:text-white"
            )}
            title="Admin Login"
          >
            <LogIn size={18} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={isScrolled ? "text-primary" : "text-white"} /> : <Menu className={isScrolled ? "text-primary" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 font-medium py-2 border-b border-gray-100"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onEnrollClick();
              }}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold mt-2"
            >
              Enroll Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onEnrollClick }: { onEnrollClick: () => void }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1583000201356-07790938569c?auto=format&fit=crop&q=80&w=1920" 
          alt="Kuchipudi Dancer" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="text-secondary font-semibold tracking-widest uppercase text-sm mb-4 block">
            Preserving Tradition Through Movement
          </span>
          <h1 className="text-5xl md:text-7xl text-white font-serif font-bold leading-tight mb-6">
            Discover the Grace of <span className="text-secondary">Kuchipudi</span>
          </h1>
          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            Join Sri Deepthi Nrithyalayam to master the ancient classical dance forms of India. 
            From the rhythmic footwork of Kathak to the storytelling grace of Kuchipudi.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onEnrollClick}
              className="bg-primary text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-red-900 transition-all transform hover:scale-105"
            >
              Start Your Journey <ChevronRight size={20} />
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white/20 transition-all">
              <Play size={20} fill="white" /> Watch Performance
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-2 border-dashed border-secondary/30 rounded-full flex items-center justify-center"
        >
          <div className="w-24 h-24 border-2 border-secondary/50 rounded-full flex items-center justify-center">
            <Music className="text-secondary" size={32} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const DanceCard = ({ dance }: { dance: DanceForm }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg group"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={dance.image} 
          alt={dance.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {dance.origin}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-primary mb-2">{dance.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {dance.description}
        </p>
        <button className="text-accent font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
          Learn More <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const InstructorCard = ({ instructor }: { instructor: Instructor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col lg:flex-row gap-10 items-start bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="w-full lg:w-72 h-72 rounded-[2.5rem] overflow-hidden flex-shrink-0 border-8 border-secondary/10 relative">
        <img 
          src={instructor.image} 
          alt={instructor.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="flex-grow">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-accent font-bold text-xs uppercase tracking-widest mb-2 block">{instructor.role}</span>
            <h3 className="text-4xl font-serif font-bold text-gray-900">{instructor.name}</h3>
          </div>
          <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-2xl border border-primary/10">
            <Clock size={16} className="text-primary" />
            <span className="text-sm font-bold text-gray-700">{instructor.experience} Exp</span>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed italic mb-8 text-lg">"{instructor.bio}"</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <GraduationCap size={20} />
              <h4 className="font-bold uppercase tracking-wider text-xs">Education</h4>
            </div>
            <p className="text-gray-700 text-sm font-medium pl-8">{instructor.education}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <Award size={20} />
              <h4 className="font-bold uppercase tracking-wider text-xs">Key Awards</h4>
            </div>
            <ul className="pl-8 space-y-1">
              {instructor.awards.map((award, i) => (
                <li key={i} className="text-gray-700 text-sm font-medium list-disc">{award}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-50">
          {instructor.specialties.map((spec, i) => (
            <span key={i} className="bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-primary/10">
              {spec}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Footer = ({ onAdminLogin }: { onAdminLogin: () => void }) => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-secondary font-serif text-xl font-bold">
              SDN
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight">
              Sri Deepthi Nrithyalayam
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Dedicated to the preservation and promotion of Indian classical dance forms through rigorous training and artistic excellence.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <a href="https://www.instagram.com/srideepthi.nruthyalayam/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" title="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/SriDeepthi.Nrithyalayam" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" title="Facebook">
                <Facebook size={18} />
              </a>
              <a href="http://x.com/Nrithyalayam" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" title="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://www.youtube.com/@SriDeepthi.Nrithyalayam" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" title="YouTube">
                <Youtube size={18} />
              </a>
              <a href="https://www.linkedin.com/company/srideepthinrithyalayam" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" title="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://share.google/TpPcaE3pVM8NJ8S59" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" title="Google Maps">
                <Map size={18} />
              </a>
            </div>
            <button 
              onClick={onAdminLogin}
              className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1 mt-2"
            >
              <LogIn size={12} /> Admin Login
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-serif font-bold mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#dance-forms" className="hover:text-white transition-colors">Dance Forms</a></li>
            <li><a href="#instructors" className="hover:text-white transition-colors">Our Gurus</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">About Academy</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-serif font-bold mb-6">Dance Forms</h4>
          <ul className="flex flex-col gap-4 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Kuchipudi</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Bharatanatyam</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Kathak</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Odissi</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mohiniyattam</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-serif font-bold mb-6">Contact Info</h4>
          <ul className="flex flex-col gap-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-primary flex-shrink-0" />
              <span>123 Kala Marg, Cultural District, Hyderabad, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary flex-shrink-0" />
              <span>+91 99897 20020</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary flex-shrink-0" />
              <span>srideepthi.nruthyalayam@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 text-center text-gray-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Sri Deepthi Nrithyalayam. All rights reserved. | <a href="https://srideepthinrithyalayam.in" className="hover:text-white transition-colors">srideepthinrithyalayam.in</a></p>
      </div>
    </footer>
  );
};

const RegistrationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    danceForm: '',
    branch: BRANCHES[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addDoc(collection(db, 'students'), {
        ...formData,
        enrolledAt: Timestamp.now(),
        status: 'pending'
      });
      setIsSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'students');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-10">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Student Registration</h2>
                <p className="text-gray-500 text-sm">Join our academy and start your artistic journey today.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Contact Number</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="example@mail.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Desired Dance Form</label>
                  <select 
                    required
                    value={formData.danceForm}
                    onChange={(e) => setFormData({...formData, danceForm: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                  >
                    <option value="">Select a dance form</option>
                    {DANCE_FORMS.map(dance => (
                      <option key={dance.id} value={dance.id}>{dance.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Preferred Branch</label>
                  <select 
                    required
                    value={formData.branch}
                    onChange={(e) => setFormData({...formData, branch: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                  >
                    {BRANCHES.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:bg-red-900 transition-all transform hover:scale-[1.02] mt-4 shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {isLoading ? "Registering..." : "Register Now"}
                </button>
              </form>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ChevronRight size={40} className="rotate-[-90deg]" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Registration Successful!</h2>
              <p className="text-gray-600 mb-8">
                Thank you for choosing Sri Deepthi Nrithyalayam. Our team will contact you shortly to discuss the next steps.
              </p>
              <button 
                onClick={onClose}
                className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-red-900 transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const AdminDashboard = ({ user }: { user: User }) => {
  const [students, setStudents] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'students' | 'payments' | 'qr'>('students');

  useEffect(() => {
    const qStudents = query(collection(db, 'students'), orderBy('enrolledAt', 'desc'));
    const unsubscribeStudents = onSnapshot(qStudents, (snapshot) => {
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'students'));

    const qPayments = query(collection(db, 'payments'), orderBy('date', 'desc'));
    const unsubscribePayments = onSnapshot(qPayments, (snapshot) => {
      setPayments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'payments'));

    return () => {
      unsubscribeStudents();
      unsubscribePayments();
    };
  }, []);

  const updateStudentStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'students', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `students/${id}`);
    }
  };

  const addPayment = async (studentId: string, amount: number) => {
    try {
      await addDoc(collection(db, 'payments'), {
        studentId,
        amount,
        date: Timestamp.now(),
        status: 'paid',
        month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
        qrCodeUsed: true
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'payments');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-primary p-8 text-white flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <LayoutDashboard size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold">Admin Dashboard</h1>
                <p className="text-white/60 text-sm">Welcome back, {user.email}</p>
              </div>
            </div>
            <button 
              onClick={() => signOut(auth)}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => setActiveTab('students')}
              className={cn(
                "px-8 py-4 font-bold text-sm transition-all border-b-2",
                activeTab === 'students' ? "border-primary text-primary" : "border-transparent text-gray-400"
              )}
            >
              Students ({students.length})
            </button>
            <button 
              onClick={() => setActiveTab('payments')}
              className={cn(
                "px-8 py-4 font-bold text-sm transition-all border-b-2",
                activeTab === 'payments' ? "border-primary text-primary" : "border-transparent text-gray-400"
              )}
            >
              Payments ({payments.length})
            </button>
            <button 
              onClick={() => setActiveTab('qr')}
              className={cn(
                "px-8 py-4 font-bold text-sm transition-all border-b-2",
                activeTab === 'qr' ? "border-primary text-primary" : "border-transparent text-gray-400"
              )}
            >
              Payment QR Code
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === 'students' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-50">
                      <th className="pb-4 font-bold">Student</th>
                      <th className="pb-4 font-bold">Dance Form</th>
                      <th className="pb-4 font-bold">Branch</th>
                      <th className="pb-4 font-bold">Status</th>
                      <th className="pb-4 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {students.map((student) => (
                      <tr key={student.id} className="group">
                        <td className="py-4">
                          <div className="font-bold text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.email} | {student.phone}</div>
                        </td>
                        <td className="py-4 text-sm text-gray-600 capitalize">{student.danceForm}</td>
                        <td className="py-4 text-sm text-gray-600">{student.branch}</td>
                        <td className="py-4">
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                            student.status === 'active' ? "bg-green-100 text-green-700" : 
                            student.status === 'pending' ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                          )}>
                            {student.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            {student.status === 'pending' && (
                              <button 
                                onClick={() => updateStudentStatus(student.id, 'active')}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <CheckCircle2 size={18} />
                              </button>
                            )}
                            <button 
                              onClick={() => addPayment(student.id, 2000)}
                              className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                              title="Record Payment"
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-50">
                      <th className="pb-4 font-bold">Student ID</th>
                      <th className="pb-4 font-bold">Amount</th>
                      <th className="pb-4 font-bold">Month</th>
                      <th className="pb-4 font-bold">Date</th>
                      <th className="pb-4 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="py-4 font-mono text-xs text-gray-500">{payment.studentId}</td>
                        <td className="py-4 font-bold text-gray-900">₹{payment.amount}</td>
                        <td className="py-4 text-sm text-gray-600">{payment.month}</td>
                        <td className="py-4 text-sm text-gray-600">{payment.date?.toDate().toLocaleDateString()}</td>
                        <td className="py-4">
                          <span className="text-[10px] font-bold px-2 py-1 rounded-full uppercase bg-green-100 text-green-700">
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'qr' && (
              <div className="flex flex-col items-center py-12">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-sm w-full text-center">
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Official Payment QR</h3>
                  <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden mb-6 border-4 border-primary/10">
                    <img 
                      src="https://ais-dev-75fpc24l53go25kmdq7n27-13976124751.asia-southeast1.run.app/api/image-proxy?url=https%3A%2F%2Ffiles.oaiusercontent.com%2Ffile-S2G986f376m7986f376m7986f%3Fse%3D2026-04-02T18%253A34%253A48Z%26sp%3Dr%26sv%3D2024-08-04%26sr%3Db%26rscc%3Dmax-age%253D604800%252C%2520immutable%252C%2520private%26rscd%3Dattachment%253B%2520filename%253D17c5b967-17c5-4967-a967-a967c5b967c5.webp%26sig%3D17c5b967-17c5-4967-a967-a967c5b967c5"
                      alt="PhonePe QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-gray-500 text-sm mb-6">Scan using PhonePe or any UPI app to make payments to <strong>S BHAVANA DEEPTHI</strong></p>
                  <button className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-900 transition-colors">
                    <Download size={18} /> Download QR
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  const typeColors = {
    Workshop: 'bg-blue-100 text-blue-700 border-blue-200',
    Performance: 'bg-primary/10 text-primary border-primary/20',
    Holiday: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex-shrink-0 w-20 h-20 bg-background rounded-2xl flex flex-col items-center justify-center border border-gray-100">
        <span className="text-primary font-serif font-bold text-2xl">{new Date(event.date).getDate()}</span>
        <span className="text-gray-500 text-xs uppercase font-bold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
      </div>
      <div className="flex-grow">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border",
            typeColors[event.type]
          )}>
            {event.type}
          </span>
          <span className="text-gray-400 text-xs flex items-center gap-1">
            <Calendar size={12} /> {formatDate(event.date)}
          </span>
        </div>
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
      </div>
    </motion.div>
  );
};

const Stats = () => (
  <section className="py-12 bg-primary">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-4xl font-serif font-bold text-secondary mb-2">25+</div>
          <div className="text-white/70 text-sm uppercase tracking-widest">Years Experience</div>
        </div>
        <div>
          <div className="text-4xl font-serif font-bold text-secondary mb-2">500+</div>
          <div className="text-white/70 text-sm uppercase tracking-widest">Active Students</div>
        </div>
        <div>
          <div className="text-4xl font-serif font-bold text-secondary mb-2">15+</div>
          <div className="text-white/70 text-sm uppercase tracking-widest">Expert Gurus</div>
        </div>
        <div>
          <div className="text-4xl font-serif font-bold text-secondary mb-2">100+</div>
          <div className="text-white/70 text-sm uppercase tracking-widest">Performances</div>
        </div>
      </div>
    </div>
  </section>
);

const DanceForms = () => (
  <section id="dance-forms" className="py-24 px-6 bg-background">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Our Curriculum</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Classical Dance Forms</h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We offer comprehensive training in various Indian classical dance forms, 
          focusing on technique, expression, and the spiritual essence of each style.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {DANCE_FORMS.map((dance) => (
          <DanceCard key={dance.id} dance={dance} />
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 px-6 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
      <div className="lg:w-1/2 relative">
        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&q=80&w=1000" 
            alt="Dance Practice" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl -z-10" />
      </div>
      <div className="lg:w-1/2">
        <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">
          A Legacy of Rhythm and <span className="text-primary">Devotion</span>
        </h2>
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            Founded in 1998, Sri Deepthi Nrithyalayam was born from a passion to keep the rich heritage of Indian classical dance alive in the hearts of the younger generation.
          </p>
          <p>
            Our philosophy goes beyond teaching steps; we believe dance is a form of meditation and a way to connect with the divine. Every mudra, every glance, and every beat is taught with deep respect for its historical and spiritual significance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center text-primary">
                <Music size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Authentic Music</h4>
                <p className="text-xs">Live Carnatic & Hindustani</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center text-primary">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Small Batches</h4>
                <p className="text-xs">Personalized Attention</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Instructors = () => (
  <section id="instructors" className="py-24 px-6 bg-background">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Our Mentors</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Meet Our Gurus</h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Learn from the masters who have dedicated their lives to the art of classical dance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {INSTRUCTORS.map((instructor) => (
          <InstructorCard key={instructor.id} instructor={instructor} />
        ))}
      </div>
    </div>
  </section>
);

const Events = () => (
  <section id="events" className="py-24 px-6 bg-background">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Academy Schedule</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Upcoming Events</h2>
          <p className="text-gray-600 leading-relaxed">
            Stay updated with our latest workshops, grand performances, and academic schedule. 
            Join us for special sessions and witness our students' artistic growth.
          </p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center gap-2">
          View Full Calendar <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {EVENTS.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  </section>
);

const Branches = () => (
  <section id="branches" className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Our Presence</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Our Branches in Hyderabad</h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Find us at multiple convenient locations across Hyderabad, bringing classical dance closer to you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BRANCHES.map((branch, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 p-6 bg-background rounded-2xl border border-gray-100 hover:border-primary/30 transition-all group"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{branch}</h4>
              <p className="text-xs text-gray-500">Hyderabad, Telangana</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
      <div className="lg:w-1/2 p-12 lg:p-20">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Get in Touch</h2>
        <p className="text-gray-400 mb-12 leading-relaxed">
          Have questions about our classes or want to schedule a trial session? 
          Fill out the form and our team will get back to you shortly.
        </p>
        
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Our Location</h4>
              <p className="text-gray-400 text-sm">123 Kala Marg, Cultural District, Hyderabad, India</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Call Us</h4>
              <p className="text-gray-400 text-sm">+91 99897 20020</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
              <Mail size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Email Us</h4>
              <p className="text-gray-400 text-sm">srideepthi.nruthyalayam@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-white/10">
          <h4 className="text-white font-bold mb-6">Follow Our Journey</h4>
          <div className="flex flex-wrap gap-4">
            <a href="https://www.instagram.com/srideepthi.nruthyalayam/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary text-gray-400 hover:text-white transition-all transform hover:scale-110" title="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/SriDeepthi.Nrithyalayam" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary text-gray-400 hover:text-white transition-all transform hover:scale-110" title="Facebook">
              <Facebook size={20} />
            </a>
            <a href="http://x.com/Nrithyalayam" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary text-gray-400 hover:text-white transition-all transform hover:scale-110" title="Twitter">
              <Twitter size={20} />
            </a>
            <a href="https://www.youtube.com/@SriDeepthi.Nrithyalayam" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary text-gray-400 hover:text-white transition-all transform hover:scale-110" title="YouTube">
              <Youtube size={20} />
            </a>
            <a href="https://www.linkedin.com/company/srideepthinrithyalayam" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary text-gray-400 hover:text-white transition-all transform hover:scale-110" title="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://share.google/TpPcaE3pVM8NJ8S59" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary text-gray-400 hover:text-white transition-all transform hover:scale-110" title="Google Maps">
              <Map size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 bg-white/5 p-12 lg:p-20 backdrop-blur-sm">
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Interested In</label>
            <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
              <option className="bg-gray-900">Kuchipudi</option>
              <option className="bg-gray-900">Bharatanatyam</option>
              <option className="bg-gray-900">Kathak</option>
              <option className="bg-gray-900">Odissi</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Message</label>
            <textarea 
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="Tell us about your interest..."
            />
          </div>
          <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-red-900 transition-all transform hover:scale-[1.02]">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
      if (!currentUser) setIsAdminMode(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAdminLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsAdminMode(true);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAdminMode && user) {
    return <AdminDashboard user={user} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar onEnrollClick={() => setIsModalOpen(true)} onAdminLogin={handleAdminLogin} />
      
      <Hero onEnrollClick={() => setIsModalOpen(true)} />

      <main>
        <Stats />
        <DanceForms />
        <About />
        <Instructors />
        <Events />
        <Branches />
        <Contact />
      </main>

      <Footer onAdminLogin={handleAdminLogin} />

      <AnimatePresence>
        {isModalOpen && (
          <RegistrationModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
