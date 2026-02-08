import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  RefreshCcw, 
  AlertCircle, 
  ChevronRight, 
  Award, 
  User, 
  BookOpen, 
  Lock, 
  Cpu,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const questionBank = [
  // --- UNIT 1 QUESTIONS ---
  { q: "What does the CIA Triad in cybersecurity stand for?", a: ["Cybersecurity, Integrity, Access", "Confidentiality, Integrity, Availability", "Control, Investigation, Authentication", "Compliance, Information, Assurance"], c: 1 },
  { q: "Which of the following is an example of a cyber threat to confidentiality?", a: ["Unauthorized data access", "Data modification", "System downtime", "Network congestion"], c: 0 },
  { q: "Which type of attack focuses on making a service unavailable to its users?", a: ["Phishing", "Man-in-the-middle", "Denial of Service (DoS)", "Ransomware"], c: 2 },
  { q: "A vulnerability in cybersecurity is best described as:", a: ["A weakness that can be exploited by threats", "A security feature that prevents attacks", "A type of cyberattack", "An antivirus program"], c: 0 },
  { q: "Which of the following is NOT considered a cyber-attack surface?", a: ["Network devices", "Operating systems", "Antivirus software", "Web applications"], c: 2 },
  { q: "A hacker sends fake emails to steal sensitive user data. This attack is known as:", a: ["Phishing", "Malware", "Ransomware", "Keylogging"], c: 0 },
  { q: "Which of these is a recent example of a high-profile cybersecurity incident?", a: ["Facebook data breach", "SolarWinds attack", "WannaCry ransomware", "All of the above"], c: 3 },
  { q: "The primary goal of the Availability principle in the CIA triad is to:", a: ["Ensure only authorized users can access data", "Prevent data from being modified", "Make sure data and systems are accessible when needed", "Encrypt all sensitive data"], c: 2 },
  { q: "What is the difference between a threat and a vulnerability?", a: ["Threats are external, while vulnerabilities are internal weaknesses", "A threat is a weakness in a system, while a vulnerability is an attack", "A vulnerability is an attacker, while a threat is a defensive measure", "Threats only exist in physical security, not in cybersecurity"], c: 0 },
  { q: "Which of the following is NOT a basic cybersecurity principle?", a: ["Least Privilege", "Multi-Factor Authentication", "Open Access to All", "Regular Patching"], c: 2 },
  { q: "Which cybersecurity attack exploits a vulnerability in software before the vendor releases a fix?", a: ["Zero-day attack", "Brute-force attack", "SQL injection", "Trojan horse"], c: 0 },
  { q: "What is an attack vector in cybersecurity?", a: ["A method used to gain unauthorized access", "A software that fixes security issues", "A process of encrypting data", "A type of firewall"], c: 0 },
  { q: "Which of the following is a preventive security measure?", a: ["Using strong passwords", "Recovering data after a breach", "Investigating a cybercrime", "Analyzing an attack post-event"], c: 0 },
  { q: "Which type of malware locks a user’s data and demands payment for its release?", a: ["Spyware", "Adware", "Ransomware", "Rootkit"], c: 2 },
  { q: "What is the first step in securing a computer system?", a: ["Installing software updates and patches", "Ignoring security alerts", "Disabling firewalls", "Sharing passwords with others"], c: 0 },
  { q: "Which attack modifies data before it is processed by a computer system?", a: ["Phishing", "Data Diddling", "Keylogging", "Spyware"], c: 1 },
  { q: "Which malware secretly gathers user data without their knowledge?", a: ["Spyware", "Ransomware", "Trojan Horse", "Rootkit"], c: 0 },
  { q: "Which cyber attack triggers malicious code under specific conditions?", a: ["Trojan Horse", "Logic Bomb", "Spyware", "Ransomware"], c: 1 },
  { q: "A DoS (Denial-of-Service) attack is used to:", a: ["Gain unauthorized access", "Steal user credentials", "Make a system unavailable", "Encrypt files"], c: 2 },
  { q: "What is the key difference between DoS and DDoS?", a: ["DoS is manual, DDoS is automated", "DDoS uses multiple systems", "DoS is more powerful", "DoS only affects networks"], c: 1 },

  // --- UNIT 2 QUESTIONS ---
  { q: "Which organization in India is responsible for handling cybercrimes?", a: ["CERT-In", "RBI", "ISRO", "TRAI"], c: 0 },
  { q: "Which of the following is considered an insider threat?", a: ["A hacker breaking into a system", "An employee leaking company data", "A DDoS attack from external sources", "A phishing attack on company employees"], c: 1 },
  { q: "CERT-In stands for:", a: ["Computer Emergency Response Team - India", "Cyber Emergency Recovery Taskforce - India", "Cybersecurity Emergency Response Task - India", "Computerized Emergency Readiness Team - India"], c: 0 },
  { q: "Which law in India primarily deals with cybercrimes?", a: ["Indian Penal Code", "Information Technology Act, 2000", "Copyright Act, 1957", "Consumer Protection Act"], c: 1 },
  { q: "A strong measure to prevent cyber crimes is:", a: ["Using strong passwords", "Ignoring security warnings", "Disabling firewalls", "Using the same password for all accounts"], c: 0 },
  { q: "Which Indian law governs cybercrime and digital transactions?", a: ["Indian Penal Code (IPC)", "Information Technology Act, 2000", "Consumer Protection Act", "Data Protection Act"], c: 1 },
  { q: "What is the key purpose of the IT Act, 2000?", a: ["To regulate banking transactions", "To provide legal recognition for electronic records and digital signatures", "To track physical crimes", "To regulate traditional paper-based contracts"], c: 1 },
  { q: "Under which section of the IT Act, 2000 is hacking punishable?", a: ["Section 43", "Section 66", "Section 72", "Section 80"], c: 1 },
  { q: "Which section of the IT Act deals with publishing obscene content online?", a: ["Section 65", "Section 66C", "Section 67", "Section 69A"], c: 2 },
  { q: "Which government body handles cybercrime in India?", a: ["RBI", "CERT-In", "TRAI", "ISRO"], c: 1 },
  { q: "Which Indian act focuses on privacy and data protection?", a: ["Right to Information Act", "Information Technology Act", "Indian Penal Code", "Personal Data Protection Bill"], c: 3 },
  { q: "What is the punishment for identity theft under the IT Act, 2000?", a: ["₹10,000 fine", "Up to 3 years imprisonment and/or fine up to ₹1 lakh", "Only a warning for first-time offenders", "Lifetime ban from using the internet"], c: 1 },
  { q: "What does Section 69 of the IT Act allow the government to do?", a: ["Monitor and decrypt any information", "Block physical transactions", "Grant licenses for cyber businesses", "Track cash-based transactions"], c: 0 },
  { q: "Which section of the IT Act gives the power to block public access to certain websites?", a: ["Section 66C", "Section 67", "Section 69A", "Section 72"], c: 2 },
  { q: "Which Indian organization is responsible for handling cyber law enforcement?", a: ["NITI Aayog", "Cyber Crime Investigation Cell", "Ministry of Health", "Indian Space Research Organization"], c: 1 },

  // --- UNIT 3 QUESTIONS ---
  { q: "Which law in the US regulates cybersecurity and hacking offenses?", a: ["Computer Fraud and Abuse Act (CFAA)", "IT Act, 2000", "Cybersecurity Protection Act", "Personal Data Protection Bill"], c: 0 },
  { q: "Which of the following is a cyber law in China?", a: ["Data Protection Bill", "Digital Millennium Copyright Act (DMCA)", "Chinese Cybersecurity Law (CSL)", "Right to Information Act"], c: 2 },
  { q: "What is the main focus of GDPR?", a: ["Regulating cryptocurrency", "Protecting personal data privacy in the EU", "Stopping online gaming frauds", "Preventing IoT hacks"], c: 1 },
  { q: "The UK's Computer Misuse Act was introduced in which year?", a: ["1985", "1990", "2000", "2015"], c: 1 },
  { q: "Which of the following laws governs digital copyright protection in the US?", a: ["GDPR", "Digital Millennium Copyright Act (DMCA)", "IT Act, 2000", "Cyber Espionage Act"], c: 1 },
  { q: "Which country has the strictest internet censorship and cyber laws?", a: ["Canada", "North Korea", "Germany", "India"], c: 1 },
  { q: "Which of the following best defines authentication?", a: ["Controlling access to resources", "Verifying the identity of a user or system", "Encrypting network traffic", "Scanning for vulnerabilities"], c: 1 },
  { q: "What is the primary purpose of authorization in web security?", a: ["To verify a user's identity", "To grant or deny access to resources based on permissions", "To encrypt passwords", "To monitor network activity"], c: 1 },
  { q: "Which of the following is an example of multi-factor authentication (MFA)?", a: ["Username and password", "Password and CAPTCHA", "Password and OTP (One-Time Password)", "Only biometric authentication"], c: 2 },
  { q: "Which encryption algorithm is commonly used for securing web communication?", a: ["AES", "RSA", "DES", "MD5"], c: 1 },
  { q: "Which cryptographic technique ensures data integrity?", a: ["Hashing", "Symmetric encryption", "Asymmetric encryption", "Key exchange"], c: 0 },
  { q: "Which of the following is NOT a type of cryptographic attack?", a: ["Brute force attack", "SQL Injection", "Man-in-the-middle attack", "Dictionary attack"], c: 1 },
  { q: "What is the key difference between symmetric and asymmetric encryption?", a: ["Symmetric uses same key for both, asymmetric uses different keys", "Asymmetric is faster than symmetric", "Symmetric is more secure than asymmetric", "Asymmetric does not require keys"], c: 0 },
  { q: "What is SQL Injection?", a: ["A method used for encrypting SQL databases", "A technique to inject malicious SQL queries into a database", "A security protocol to prevent cyber attacks", "A firewall configuration error"], c: 1 },
  { q: "Which security measure can help prevent SQL injection attacks?", a: ["Disabling the internet connection", "Using parameterized queries and prepared statements", "Enabling cookies", "Using a strong password only"], c: 1 }
];

export default function App() {
  const [gameState, setGameState] = useState('home'); // home, quiz, result
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const startQuiz = () => {
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setGameState('quiz');
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (idx) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    if (idx === shuffledQuestions[currentIdx].c) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < shuffledQuestions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setGameState('result');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* Navigation Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm">
              <Shield size={22} className="text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-800">
              Cyber<span className="text-indigo-600 underline decoration-indigo-200 decoration-2">Shield</span> Hub
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="hover:text-indigo-600 cursor-pointer">Curriculum</span>
            <span className="hover:text-indigo-600 cursor-pointer">Legal Framework</span>
            <span className="hover:text-indigo-600 cursor-pointer underline decoration-indigo-400 decoration-2 underline-offset-4 text-indigo-600">Exam Prep</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
             <User size={14} className="text-indigo-600" />
             <span className="text-xs font-bold text-indigo-700">Amit Prajapati</span>
          </div>
        </div>
      </nav>

      {/* Hero / Main Area */}
      <main className="flex-grow flex items-center justify-center p-4 py-8">
        
        {gameState === 'home' && (
          <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
                <Lock size={12} /> Secure Learning Portal
              </div>
              <h1 className="text-5xl font-black text-slate-900 leading-tight">
                Mastering <span className="text-indigo-600">Cyber Security</span> Through Practice.
              </h1>
              <p className="text-lg text-slate-600">
                A professional assessment dashboard developed by Amit Prajapati for Vidhyadeep University. 
                Focusing on CIA Triad, IT Act 2000, and Cryptography.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={startQuiz}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 group"
                >
                  Launch Full Assessment <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                    <BookOpen size={20} className="text-indigo-500" />
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase">Modules</div>
                      <div className="text-sm font-bold">Units 1, 2, 3</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                    <Cpu size={20} className="text-indigo-500" />
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase">Questions</div>
                      <div className="text-sm font-bold">50 Interactive</div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Shield size={200} />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User size={20} className="text-indigo-600" /> Developer Profile
              </h3>
              <div className="space-y-4 relative z-10">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Name</span>
                  <span className="text-xl font-bold text-slate-800">Amit Prajapati</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Department</span>
                  <span className="text-lg font-medium text-slate-700">Computer Engineering</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Institution</span>
                  <span className="text-lg font-medium text-slate-700">Vidhyadeep University</span>
                </div>
                <div className="pt-4 flex gap-4">
                  <div className="text-xs py-1.5 px-3 bg-slate-100 rounded-lg text-slate-600 font-semibold border border-slate-200">Student ID: 4th Sem</div>
                  <div className="text-xs py-1.5 px-3 bg-slate-100 rounded-lg text-slate-600 font-semibold border border-slate-200">Subject: 002391403</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {gameState === 'quiz' && (
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500 p-1 rounded-lg">
                  <Lock size={18} className="text-white" />
                </div>
                <span className="font-bold text-sm tracking-wide">ACTIVE ASSESSMENT</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold opacity-60 block uppercase tracking-tighter">Current Question</span>
                <span className="text-xl font-black">{currentIdx + 1}<span className="text-slate-500 text-sm">/{shuffledQuestions.length}</span></span>
              </div>
            </div>

            <div className="p-8">
              <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentIdx + 1) / shuffledQuestions.length) * 100}%` }}
                />
              </div>

              <h3 className="text-2xl font-bold mb-8 leading-tight text-slate-800">
                {shuffledQuestions[currentIdx].q}
              </h3>

              <div className="space-y-4 mb-8">
                {shuffledQuestions[currentIdx].a.map((option, idx) => {
                  let styles = "border-2 border-slate-100 bg-slate-50";
                  let Icon = null;

                  if (isAnswered) {
                    if (idx === shuffledQuestions[currentIdx].c) {
                      styles = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold ring-2 ring-emerald-200";
                      Icon = CheckCircle;
                    } else if (idx === selectedAnswer) {
                      styles = "border-rose-500 bg-rose-50 text-rose-800 font-bold ring-2 ring-rose-200";
                      Icon = XCircle;
                    } else {
                      styles = "border-slate-100 opacity-40 grayscale";
                    }
                  } else {
                    styles = "border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-lg transition-all cursor-pointer";
                  }

                  return (
                    <div 
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      className={`p-5 rounded-2xl flex items-center justify-between gap-4 group ${styles}`}
                    >
                      <span className="flex-1 text-base">{option}</span>
                      {Icon && <Icon size={24} />}
                    </div>
                  );
                })}
              </div>

              {isAnswered && (
                <button 
                  onClick={nextQuestion}
                  className="w-full py-5 px-6 bg-slate-900 hover:bg-black text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-slate-200"
                >
                  {currentIdx + 1 === shuffledQuestions.length ? "VIEW FINAL SCORE" : "PROCEED TO NEXT"}
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>
        )}

        {gameState === 'result' && (
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
            
            <div className="mb-6">
              <div className="bg-amber-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 border-2 border-amber-100 transform rotate-12">
                <Award size={64} className="text-amber-500 -rotate-12" />
              </div>
              <h2 className="text-3xl font-black text-slate-900">Academic Merit Achieved</h2>
              <p className="text-slate-500 mt-2 font-medium">Session Certified for <span className="text-indigo-600 font-bold">Amit Prajapati</span></p>
            </div>

            <div className="bg-indigo-600 p-8 rounded-3xl text-white mb-8 shadow-2xl shadow-indigo-100 relative">
               <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Final Result Score</div>
               <div className="text-7xl font-black mb-1">{Math.round((score / shuffledQuestions.length) * 100)}%</div>
               <div className="text-indigo-200 text-sm font-semibold">{score * 2} Points out of 100 Total</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 text-left">
               <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                 <div className="text-[10px] text-emerald-600 font-black uppercase tracking-tighter mb-1">Answered Correctly</div>
                 <div className="text-2xl font-bold text-emerald-700">{score} Items</div>
               </div>
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                 <div className="text-[10px] text-slate-400 font-black uppercase tracking-tighter mb-1">Academic Level</div>
                 <div className="text-2xl font-bold text-slate-800">
                   {score > 45 ? 'Expert' : score > 35 ? 'Advanced' : 'Learner'}
                 </div>
               </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={startQuiz}
                className="flex-1 py-4 border-2 border-slate-200 hover:border-slate-400 font-bold rounded-2xl text-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCcw size={18} /> Re-try
              </button>
              <button 
                onClick={() => setGameState('home')}
                className="flex-1 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl transition-all"
              >
                Return Home
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Modern Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Faculty Presentation Version</div>
            <div className="text-sm font-bold text-slate-800">Cyber Security Management System</div>
            <p className="text-xs text-slate-500 mt-1">© 2025 Amit Prajapati • All Rights Reserved</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Prepared by</span>
              <span className="text-sm font-black text-indigo-600">Amit Prajapati</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
               <User size={20} className="text-slate-400" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}