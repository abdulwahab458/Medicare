"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CalendarDays, Stethoscope, ShieldCheck, BellRing,  ArrowRight, HeartPulse, Pill, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  
  const handleAppointmentClick = () => {
    router.push('/Home');
  };

  const handleLoginClick = () => {
    router.push('/Home');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 right-1/3 w-96 h-96 bg-teal-900/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-emerald-800/30 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <Stethoscope className="text-emerald-400 h-8 w-8" />
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Medicare
          </span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex space-x-4"
        >
          <Button 
            variant="outline" 
            className="border-emerald-400 text-emerald-400 hover:bg-emerald-900/50 hover:text-emerald-300 transition-all group"
            onClick={handleLoginClick}
          >
            <span>Patient Login</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-32 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-emerald-300 to-teal-400 bg-clip-text text-transparent">
              Revolutionizing
            </span> <br />
            <span className="text-emerald-400">Healthcare</span> Management
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Medicare provides seamless patient management with instant notifications, 
            easy appointment booking, and secure medical records - all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }}>
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg shadow-lg shadow-emerald-900/50 transition-all"
                onClick={handleAppointmentClick}
              >
                <CalendarDays className="mr-2 h-5 w-5" />
                Book Appointment Now
              </Button>
            </motion.div>
            
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-28 bg-gradient-to-b from-gray-900 to-gray-800/50 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-20"
          >
            Our <span className="text-emerald-400">Features</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-800 p-8 rounded-2xl border border-emerald-800/30 hover:border-emerald-400/50 transition-all hover:shadow-lg hover:shadow-emerald-900/20"
            >
              <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 p-4 rounded-full w-fit mb-6">
                <CalendarDays className="text-emerald-300 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Appointment Booking</h3>
              <p className="text-gray-300 mb-4">
                Book appointments with your preferred doctors in just a few clicks. 
                Real-time availability and instant confirmation.
              </p>
              <div className="flex justify-end">
                <ArrowRight className="text-emerald-400 h-5 w-5" />
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-800 p-8 rounded-2xl border border-emerald-800/30 hover:border-emerald-400/50 transition-all hover:shadow-lg hover:shadow-emerald-900/20"
            >
              <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 p-4 rounded-full w-fit mb-6">
                <BellRing className="text-emerald-300 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">SMS Notifications</h3>
              <p className="text-gray-300 mb-4">
                Receive instant SMS reminders for appointments, medication schedules, 
                and important health updates.
              </p>
              <div className="flex justify-end">
                <ArrowRight className="text-emerald-400 h-5 w-5" />
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-800 p-8 rounded-2xl border border-emerald-800/30 hover:border-emerald-400/50 transition-all hover:shadow-lg hover:shadow-emerald-900/20"
            >
              <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 p-4 rounded-full w-fit mb-6">
                <ShieldCheck className="text-emerald-300 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Health Records</h3>
              <p className="text-gray-300 mb-4">
                Your medical history is stored securely with end-to-end encryption. 
                Access your records anytime, anywhere.
              </p>
              <div className="flex justify-end">
                <ArrowRight className="text-emerald-400 h-5 w-5" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 bg-gray-800/30 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center p-6 bg-gray-800/50 rounded-xl border border-emerald-800/30"
          >
            <HeartPulse className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-emerald-400 mb-2">10K+</div>
            <div className="text-gray-300">Patients Served</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center p-6 bg-gray-800/50 rounded-xl border border-emerald-800/30"
          >
            <Stethoscope className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-emerald-400 mb-2">500+</div>
            <div className="text-gray-300">Qualified Doctors</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center p-6 bg-gray-800/50 rounded-xl border border-emerald-800/30"
          >
            <Pill className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-emerald-400 mb-2">99%</div>
            <div className="text-gray-300">Satisfaction Rate</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center p-6 bg-gray-800/50 rounded-xl border border-emerald-800/30"
          >
            <BadgeCheck className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-emerald-400 mb-2">24/7</div>
            <div className="text-gray-300">Support Available</div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-28 relative">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-20"
          >
            How It <span className="text-emerald-400">Works</span>
          </motion.h2>
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-8 md:left-1/2 h-full w-0.5 bg-emerald-900/50 transform -translate-x-1/2"></div>
            
            <div className="space-y-16">
              {/* Step 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col md:flex-row items-center"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-900 to-emerald-800 border border-emerald-700/50 z-10 mb-4 md:mb-0">
                  <span className="text-emerald-300 text-xl font-bold">1</span>
                </div>
                <div className="md:ml-8 md:w-1/2 md:pl-8">
                  <h3 className="text-2xl font-semibold mb-3 text-emerald-400">Create Your Profile</h3>
                  <p className="text-gray-300">
                    Sign up and complete your medical profile in minutes. Your information 
                    is kept secure and confidential with our advanced encryption.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative flex flex-col md:flex-row items-center"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-900 to-emerald-800 border border-emerald-700/50 z-10 mb-4 md:mb-0 order-1 md:order-none">
                  <span className="text-emerald-300 text-xl font-bold">2</span>
                </div>
                <div className="md:mr-8 md:w-1/2 md:text-right md:pr-8">
                  <h3 className="text-2xl font-semibold mb-3 text-emerald-400">Find Your Doctor</h3>
                  <p className="text-gray-300">
                    Browse our network of qualified healthcare professionals and 
                    select your preferred specialist based on reviews and availability.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative flex flex-col md:flex-row items-center"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-900 to-emerald-800 border border-emerald-700/50 z-10 mb-4 md:mb-0">
                  <span className="text-emerald-300 text-xl font-bold">3</span>
                </div>
                <div className="md:ml-8 md:w-1/2 md:pl-8">
                  <h3 className="text-2xl font-semibold mb-3 text-emerald-400">Book Appointment</h3>
                  <p className="text-gray-300">
                    Choose an available time slot that works for you and confirm 
                    your appointment with instant SMS and email confirmation.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-28 bg-gray-800/30 relative">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-20"
          >
            What Our <span className="text-emerald-400">Patients Say</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800/50 p-8 rounded-2xl border border-emerald-800/30"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-900/50 flex items-center justify-center mr-4">
                  <span className="text-emerald-300 text-xl">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">John D.</h4>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 italic">
                Medicare has transformed how I manage my healthcare. Booking appointments is so easy, 
                and the SMS reminders ensure I never miss a visit. Highly recommended!
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800/50 p-8 rounded-2xl border border-emerald-800/30"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-900/50 flex items-center justify-center mr-4">
                  <span className="text-emerald-300 text-xl">SM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah M.</h4>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 italic">
                As someone with chronic conditions, having all my medical records in one secure place 
                is a game-changer. The interface is beautiful and so easy to use.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,white_10%,transparent_70%)] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6"
          >
            Ready to Experience <span className="text-emerald-400">Better Healthcare</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Join thousands of patients who are managing their healthcare 
            effortlessly with Medicare.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-7 text-lg shadow-lg shadow-emerald-900/50 transition-all group"
              onClick={handleAppointmentClick}
            >
              <span>Get Started Today</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 bg-gray-900 border-t border-emerald-800/30 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Stethoscope className="text-emerald-400 h-7 w-7" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Medicare
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering patients and doctors through innovative healthcare technology.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-emerald-400">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Doctors</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-emerald-400">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Appointments</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Medical Records</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Prescriptions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Telemedicine</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Health Tips</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-emerald-400">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-emerald-400 mr-3 mt-0.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="text-gray-400">info@medicare.com</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-emerald-400 mr-3 mt-0.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-emerald-400 mr-3 mt-0.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-gray-400">123 Health St, Medical City</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-emerald-800/30">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Medicare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}