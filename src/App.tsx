import { useState, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  BookOpen, 
  FileText, 
  Landmark, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  ChevronDown, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calculator, 
  Copy, 
  Send, 
  Check, 
  Search, 
  Trash2, 
  ArrowRight, 
  Menu, 
  X, 
  Plus, 
  Info, 
  FileCheck, 
  Users, 
  Award,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { SERVICES_DATA, WORK_METHODOLOGY, AUDIENCE_DATA, FAQ_DATA, PROFESSIONAL_BIO } from './data';
import { FeeService, SelectedService } from './types';

// Import local generated images as ESM modules so Vite processes and resolves them in all environments
import legalDeskImg from './assets/images/legal_desk_illustration_1784418725126.jpg';
import erickPortraitImg from './assets/images/erick_cruz_portrait_1784418736607.jpg.jpeg';

export default function App() {
  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'demandas_solicitudes' | 'contestaciones_defensas' | 'impugnaciones_recursos' | 'diligencias_otros'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Calculator / Selected Services State
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [clientName, setClientName] = useState('');
  const [clientFirm, setClientFirm] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  // Interaction Alerts / Visual State
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: 'Asesoría Jurídica'
  });

  // Filters services based on category tab and search input
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter(service => {
      const matchesTab = activeTab === 'all' || service.category === activeTab;
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (service.lawReference && service.lawReference.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  // Handle adding service to dynamic quotation list
  const handleAddService = (service: FeeService) => {
    const exists = selectedServices.some(item => item.service.id === service.id);
    if (!exists) {
      setSelectedServices([...selectedServices, {
        service,
        hasBono: false,
        bonoPercent: 10,
        variablePrice: service.basePrice,
        customNotes: ''
      }]);
    }
  };

  // Handle removing service
  const handleRemoveService = (serviceId: string) => {
    setSelectedServices(selectedServices.filter(item => item.service.id !== serviceId));
  };

  // Update specific selection properties
  const handleUpdateSelection = (serviceId: string, updates: Partial<SelectedService>) => {
    setSelectedServices(selectedServices.map(item => {
      if (item.service.id === serviceId) {
        return { ...item, ...updates };
      }
      return item;
    }));
  };

  // Calculate totals
  const calculatorTotals = useMemo(() => {
    let baseTotal = 0;
    selectedServices.forEach(item => {
      baseTotal += item.variablePrice ?? item.service.basePrice;
    });
    return {
      baseTotal,
      hasBonoChecked: selectedServices.some(item => item.hasBono)
    };
  }, [selectedServices]);

  // Generate formal proposal text block
  const proposalText = useMemo(() => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    let text = `========================================================\n`;
    text += `PROPUESTA DE SERVICIOS JURÍDICOS Y HONORARIOS PROFESIONALES\n`;
    text += `========================================================\n\n`;
    text += `Fecha: ${today}\n`;
    text += `De: Mtr. Erick Cruz - Consultor Jurídico Senior\n`;
    text += `Para: ${clientFirm || 'Estimada Firma / Abogado'} - ${clientName || 'Colega Litigante'}\n`;
    text += `Contacto del Cliente: ${clientEmail || 'N/D'} | ${clientPhone || 'N/D'}\n`;
    text += `--------------------------------------------------------\n\n`;
    text += `Estimado(a) colega,\n\n`;
    text += `En respuesta a sus requerimientos de soporte legal especializado, presento la propuesta técnica para los siguientes encargos procesales:\n\n`;
    
    selectedServices.forEach((item, index) => {
      text += `${index + 1}. ${item.service.name}\n`;
      text += `   - Referencia Legal: ${item.service.lawReference || 'CPCM'}\n`;
      text += `   - Descripción: ${item.service.description}\n`;
      text += `   - Honorario Base Estipulado: $${(item.variablePrice ?? item.service.basePrice).toFixed(2)}\n`;
      if (item.hasBono) {
        text += `   - Gratificación Adicional (Bono por Éxito): ${item.bonoPercent}% sobre el resultado favorable obtenido.\n`;
      }
      if (item.customNotes) {
        text += `   - Notas del Expediente: ${item.customNotes}\n`;
      }
      text += `\n`;
    });

    text += `--------------------------------------------------------\n`;
    text += `RESUMEN ECONÓMICO:\n`;
    text += `- Total de Honorarios de Redacción: $${calculatorTotals.baseTotal.toFixed(2)}\n`;
    if (calculatorTotals.hasBonoChecked) {
      text += `- Nota de Bonificación: Incluye pactos adicionales de cuota litis / bonificación por éxito procesal favorable.\n`;
    }
    text += `--------------------------------------------------------\n\n`;
    text += `CONDICIONES DEL ENCARGO PROFESIONAL:\n`;
    text += `1. MODALIDAD: Trabajo remoto e interactivo. Sesiones virtuales programadas.\n`;
    text += `2. CONFIDENCIALIDAD: Se garantiza estricto secreto profesional bajo la suscripción de un Acuerdo de Confidencialidad (NDA) antes de acceder a la documentación del caso.\n`;
    text += `3. FORMA DE PAGO: 50% de anticipo al inicio del análisis técnico de viabilidad y 50% contra entrega conforme del borrador editable de la pieza procesal.\n`;
    text += `4. EXCLUSIONES: El honorario comprende exclusivamente la producción intelectual jurídica del escrito. Excluye costas, tasas de tramitación judicial, timbres o traslados presenciales para audiencias (los cuales se cotizan por separado si se requieren).\n\n`;
    if (additionalNotes) {
      text += `NOTAS PARTICULARES DE LA SOLICITUD:\n${additionalNotes}\n\n`;
    }
    text += `Sin más por el momento, quedo a su entera disposición para iniciar de inmediato el análisis de su caso.\n\n`;
    text += `Atentamente,\n`;
    text += `Mtr. Erick Cruz\n`;
    text += `Consultor Jurídico Senior\n`;
    text += `Correo: ${PROFESSIONAL_BIO.email} | Teléfono: ${PROFESSIONAL_BIO.phone}\n`;
    
    return text;
  }, [selectedServices, clientName, clientFirm, clientEmail, clientPhone, additionalNotes, calculatorTotals]);

  // Handle copying proposal
  const handleCopyProposal = () => {
    navigator.clipboard.writeText(proposalText);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 3000);
  };

  // Generate mailto link
  const mailtoLink = useMemo(() => {
    const subject = encodeURIComponent(`Solicitud de Cotización Jurídica - ${clientFirm || clientName || 'Despacho Abogados'}`);
    const body = encodeURIComponent(proposalText);
    return `mailto:${PROFESSIONAL_BIO.email}?subject=${subject}&body=${body}`;
  }, [proposalText, clientName, clientFirm]);

  // Handle contact submit
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', phone: '', message: '', subject: 'Asesoría Jurídica' });
    }, 4000);
  };

  // Handle proposal submission
  const handleProposalSubmit = (e: FormEvent) => {
    e.preventDefault();
    setProposalSubmitted(true);
    setTimeout(() => {
      setProposalSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e2a38] selection:bg-accent-200 selection:text-brand-900 font-sans">
      
      {/* HEADER SECTION */}
      <header id="header_section" className="sticky top-0 z-50 bg-[#111c24]/95 backdrop-blur-md border-b border-[#233543] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Brand */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent-500 rounded-lg text-brand-950">
                <Scale id="header_scale_icon" className="h-6 w-6" />
              </div>
              <div>
                <span className="font-serif text-lg sm:text-xl tracking-wider font-semibold block text-accent-100 uppercase">
                  Estudio Procesal
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#9ab2c5] font-mono block">
                  Civil y Mercantil
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav id="desktop_nav" className="hidden lg:flex space-x-8 items-center">
              <a href="#inicio" className="text-[#bfd3e1] hover:text-accent-300 text-sm font-medium transition-colors">Inicio</a>
              <a href="#servicios" className="text-[#bfd3e1] hover:text-accent-300 text-sm font-medium transition-colors">Servicios y Tarifas</a>
              <a href="#cotizador" className="text-accent-300 hover:text-accent-400 text-sm font-medium transition-colors flex items-center gap-1.5 bg-accent-950/40 px-3 py-1.5 rounded-full border border-accent-900/50">
                <Calculator className="h-4 w-4" /> Cotizador Express
              </a>
              <a href="#metodologia" className="text-[#bfd3e1] hover:text-accent-300 text-sm font-medium transition-colors">Metodología</a>
              <a href="#perfil" className="text-[#bfd3e1] hover:text-accent-300 text-sm font-medium transition-colors">Perfil Profesional</a>
              <a href="#faq" className="text-[#bfd3e1] hover:text-accent-300 text-sm font-medium transition-colors">Preguntas</a>
            </nav>

            {/* Contact quick actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a 
                href={`https://wa.me/50371769999?text=${encodeURIComponent("Hola Mtr. Erick Cruz, vengo de su sitio web y deseo realizar una consulta jurídica especializada.")}`}
                target="_blank"
                rel="noopener noreferrer"
                id="header_whatsapp_btn"
                className="flex items-center gap-1.5 text-xs font-mono text-[#bfd3e1] hover:text-accent-300 transition-colors border-r border-[#233543] pr-3"
              >
                <MessageSquare className="h-3.5 w-3.5 text-green-400" />
                WhatsApp: (503) 7176-9999
              </a>
              <a 
                href="mailto:cruzsalguerocerick@gmail.com" 
                id="header_email_btn"
                className="flex items-center gap-1.5 text-xs font-mono text-[#bfd3e1] hover:text-accent-300 transition-colors border-r border-[#233543] pr-3"
              >
                <Mail className="h-3.5 w-3.5 text-accent-400" />
                cruzsalguerocerick@gmail.com
              </a>
              <a 
                href="#contacto" 
                id="header_cta_btn"
                className="bg-accent-500 hover:bg-accent-600 text-brand-950 px-3 py-1.5 rounded text-xs font-semibold tracking-wide uppercase transition-all duration-300 shadow-lg shadow-accent-500/10 hover:shadow-accent-500/20"
              >
                Agendar Reunión
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                id="mobile_menu_trigger"
                className="text-[#bfd3e1] hover:text-accent-300 p-2 focus:outline-none"
                aria-label="Abrir Menú"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              id="mobile_nav_container"
              className="lg:hidden bg-[#111c24] border-t border-[#233543] overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                <a 
                  href="#inicio" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded text-[#bfd3e1] hover:bg-brand-900 hover:text-accent-300 text-base font-medium"
                >
                  Inicio
                </a>
                <a 
                  href="#servicios" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded text-[#bfd3e1] hover:bg-brand-900 hover:text-accent-300 text-base font-medium"
                >
                  Servicios y Tarifas
                </a>
                <a 
                  href="#cotizador" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded text-accent-300 bg-accent-950/30 border border-accent-900/30 hover:bg-brand-900 text-base font-medium"
                >
                  Cotizador Express
                </a>
                <a 
                  href="#metodologia" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded text-[#bfd3e1] hover:bg-brand-900 hover:text-accent-300 text-base font-medium"
                >
                  Metodología
                </a>
                <a 
                  href="#perfil" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded text-[#bfd3e1] hover:bg-brand-900 hover:text-accent-300 text-base font-medium"
                >
                  Perfil Profesional
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded text-[#bfd3e1] hover:bg-brand-900 hover:text-accent-300 text-base font-medium"
                >
                  Preguntas Frecuentes
                </a>
                
                <div className="pt-4 border-t border-[#233543] flex flex-col gap-3">
                  <a 
                    href={`https://wa.me/50371769999?text=${encodeURIComponent("Hola Mtr. Erick Cruz, vengo de su sitio web y deseo realizar una consulta jurídica especializada.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-mono text-[#bfd3e1] px-3 py-1"
                  >
                    <MessageSquare className="h-4 w-4 text-green-400" />
                    WhatsApp: (503) 7176-9999
                  </a>
                  <a 
                    href="mailto:cruzsalguerocerick@gmail.com"
                    className="flex items-center gap-2 text-sm font-mono text-[#bfd3e1] px-3 py-1"
                  >
                    <Mail className="h-4 w-4 text-accent-400" />
                    cruzsalguerocerick@gmail.com
                  </a>
                  <a 
                    href="#contacto" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full bg-accent-500 hover:bg-accent-600 text-brand-950 text-center py-2.5 rounded font-semibold tracking-wide uppercase text-sm block"
                  >
                    Agendar Reunión
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative bg-[#0d161d] text-white overflow-hidden py-24 lg:py-32">
        {/* Visual Background Pattern with Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img 
            src={legalDeskImg} 
            alt="Fondo Estudio Procesal" 
            className="w-full h-full object-cover object-center filter grayscale brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d161d] via-[#0d161d]/80 to-[#0d161d]/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-[#1b2f3e]/90 border border-brand-700/50 px-3 py-1 rounded-full text-xs font-mono text-accent-300 uppercase tracking-widest">
                <Landmark className="h-3.5 w-3.5 text-accent-400" /> Back-Office Procesal Premium para Despachos
              </div>
              
              <h1 id="hero_title" className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
                Soporte jurídico especializado para <span className="text-accent-300 italic">firmas y abogados.</span>
              </h1>
              
              <p id="hero_subtitle" className="text-base sm:text-lg text-[#b1c7d8] font-sans leading-relaxed max-w-2xl">
                Servicio externo, confidencial y técnico para despachos que requieren escritos sólidos, análisis jurídico riguroso y apoyo procesal de alta precisión en materia civil, mercantil y laboral.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="#cotizador" 
                  id="hero_primary_cta"
                  className="bg-accent-500 hover:bg-accent-600 text-brand-950 font-semibold px-6 py-3.5 rounded shadow-lg shadow-accent-500/10 hover:shadow-accent-500/20 text-center transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Calculator className="h-5 w-5" />
                  Presupuestar Escrito Procesal
                </a>
                <a 
                  href="#servicios" 
                  id="hero_secondary_cta"
                  className="bg-transparent border border-brand-600 hover:border-accent-300 text-[#d4e4ef] hover:text-white px-6 py-3.5 rounded text-center transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Ver Servicios y Honorarios
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Trust markers */}
              <div id="hero_trust_markers" className="grid grid-cols-3 gap-4 pt-10 border-t border-[#1b2f3e] max-w-lg">
                <div>
                  <span className="block text-2xl font-serif text-accent-300 font-semibold">15+ Años</span>
                  <span className="block text-xs text-[#95adbe] tracking-wider uppercase font-mono">Trayectoria Judicial</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif text-accent-300 font-semibold">CPCM</span>
                  <span className="block text-xs text-[#95adbe] tracking-wider uppercase font-mono">Alta Especialización</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif text-accent-300 font-semibold">100%</span>
                  <span className="block text-xs text-[#95adbe] tracking-wider uppercase font-mono">Confidencial</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-accent-500 rounded-2xl filter blur-3xl opacity-10"></div>
              
              <div id="hero_featured_card" className="relative bg-[#121f29] border border-[#233847] rounded-2xl p-6 sm:p-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent-500/10 to-transparent rounded-tr-2xl"></div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-brand-900 rounded-lg text-accent-400">
                    <FileCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-white font-medium">Solidez de Argumentación</h3>
                    <p className="text-xs text-[#90a8bb]">Técnica jurídica desde el interior judicial</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#0b1319] p-4 rounded-lg border border-[#1b2d39]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-mono text-accent-400 uppercase tracking-widest">Enfoque Técnico</span>
                      <span className="text-[10px] bg-brand-800 text-[#bfd3e1] px-2 py-0.5 rounded uppercase font-semibold">Garantizado</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      "Un escrito con mala fundamentación procesal arruina la viabilidad de toda una demanda civil. Diseñamos estructuras que neutralizan las prevenciones de forma anticipada."
                    </p>
                  </div>

                  <div className="border-t border-[#1b2d39] pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-[#b1c7d8] font-mono">Consultas en línea activas</span>
                    </div>
                    <a href="#contacto" className="text-xs text-accent-300 hover:text-accent-400 font-semibold flex items-center gap-1 transition-colors">
                      Enviar caso <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* AUDIENCE / VALUE PROP SECTION */}
      <section id="audiencia_section" className="py-20 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono text-accent-600 uppercase tracking-widest font-semibold block">
              Aliado Estratégico Externo
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111c24] tracking-tight">
              Optimice la capacidad productiva de su despacho
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Evite los costos fijos de contratación permanente. Colabore de forma flexible y bajo demanda con un especialista senior procesal civil y mercantil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AUDIENCE_DATA.map((audience, idx) => (
              <div 
                key={idx} 
                id={`audience_card_${idx}`}
                className="bg-[#f8fafc] border border-gray-200/80 p-8 rounded-xl text-left hover:shadow-xl hover:bg-white hover:border-[#cbd5e1] transition-all duration-300 relative group"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-xl"></div>
                <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-6 group-hover:bg-accent-50 group-hover:text-accent-600 transition-colors">
                  {idx === 0 && <Landmark className="h-6 w-6" />}
                  {idx === 1 && <Scale className="h-6 w-6" />}
                  {idx === 2 && <Users className="h-6 w-6" />}
                </div>
                <h3 className="font-serif text-xl text-[#111c24] font-medium mb-3">{audience.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES & FEE CATALOG SECTION */}
      <section id="servicios" className="py-24 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono text-accent-600 uppercase tracking-widest font-semibold block">
              Catálogo Profesional de Servicios
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111c24] tracking-tight">
              Especialidad en Redacción y Estrategia Procesal
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Servicios jurídicos calificados bajo un esquema de tarifas claras y predecibles. Seleccione el encargo legal específico para ver sus detalles procesales o agréguelo directamente al Cotizador Express.
            </p>
          </div>

          {/* Category Tabs & Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              
              {/* Tabs */}
              <div className="flex flex-wrap gap-1.5" id="services_category_tabs">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 text-xs font-semibold rounded transition-colors ${
                    activeTab === 'all' 
                      ? 'bg-brand-900 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Todos ({SERVICES_DATA.length})
                </button>
                <button
                  onClick={() => setActiveTab('demandas_solicitudes')}
                  className={`px-4 py-2 text-xs font-semibold rounded transition-colors ${
                    activeTab === 'demandas_solicitudes' 
                      ? 'bg-brand-900 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Demandas y Solicitudes
                </button>
                <button
                  onClick={() => setActiveTab('contestaciones_defensas')}
                  className={`px-4 py-2 text-xs font-semibold rounded transition-colors ${
                    activeTab === 'contestaciones_defensas' 
                      ? 'bg-brand-900 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Contestaciones y Defensas
                </button>
                <button
                  onClick={() => setActiveTab('impugnaciones_recursos')}
                  className={`px-4 py-2 text-xs font-semibold rounded transition-colors ${
                    activeTab === 'impugnaciones_recursos' 
                      ? 'bg-brand-900 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Impugnaciones y Recursos
                </button>
                <button
                  onClick={() => setActiveTab('diligencias_otros')}
                  className={`px-4 py-2 text-xs font-semibold rounded transition-colors ${
                    activeTab === 'diligencias_otros' 
                      ? 'bg-brand-900 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Diligencias y Otros
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md w-full md:w-80">
                <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar servicio procesal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600"
                  >
                    Borrar
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services_catalog_grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => {
                const isSelected = selectedServices.some(item => item.service.id === service.id);
                return (
                  <div 
                    key={service.id} 
                    id={`service_item_${service.id}`}
                    className="bg-white border border-gray-200 hover:border-brand-300 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Legal Reference Tag */}
                      {service.lawReference && (
                        <div className="inline-flex items-center gap-1 bg-[#f1f5f9] text-brand-700 px-2.5 py-1 rounded text-xs font-mono font-medium">
                          <BookOpen className="h-3 w-3" />
                          {service.lawReference}
                        </div>
                      )}
                      
                      <h3 className="font-serif text-lg text-[#111c24] font-medium tracking-tight">
                        {service.name}
                      </h3>
                      
                      <p className="text-xs text-gray-600 line-clamp-3">
                        {service.description}
                      </p>
                      
                      {service.priceNote && (
                        <div className="flex items-start gap-1 bg-amber-50 border border-amber-200/50 p-2.5 rounded text-[11px] text-amber-800 font-sans">
                          <Info className="h-3.5 w-3.5 mt-0.5 text-amber-600 shrink-0" />
                          <span>{service.priceNote}</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-100 pt-4 mt-5 flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-mono">Honorario Ref.</span>
                        <span className="text-xl font-serif text-brand-900 font-semibold">${service.basePrice.toFixed(2)}</span>
                      </div>
                      
                      <button
                        onClick={() => handleAddService(service)}
                        disabled={isSelected}
                        id={`btn_add_service_${service.id}`}
                        className={`px-3 py-2 rounded text-xs font-semibold tracking-wider uppercase transition-all duration-150 flex items-center gap-1.5 ${
                          isSelected 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-brand-900 hover:bg-brand-800 text-white shadow-sm hover:shadow'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Agregado
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5" />
                            Cotizar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <Search className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No se encontraron servicios que coincidan con los criterios de búsqueda.</p>
                <button 
                  onClick={() => { setActiveTab('all'); setSearchTerm(''); }}
                  className="mt-3 text-brand-700 hover:text-brand-900 text-xs font-semibold underline"
                >
                  Restaurar filtros
                </button>
              </div>
            )}
          </div>

          {/* Quick Notice */}
          <div className="mt-12 bg-brand-50/50 border border-brand-100 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-medium text-sm text-brand-900">¿Requiere un servicio personalizado no listado?</h4>
              <p className="text-xs text-gray-600">Analizamos requerimientos especiales de apelación, casación, dictámenes jurídicos o representación técnica en juicios mercantiles complejos.</p>
            </div>
            <a 
              href="#contacto" 
              className="bg-brand-900 hover:bg-brand-800 text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider block shrink-0"
            >
              Consultar Directamente
            </a>
          </div>

        </div>
      </section>

      {/* INTERACTIVE COTIZADOR DE HONORARIOS (FEE CALCULATOR & PROPOSAL GENERATOR) */}
      <section id="cotizador" className="py-24 bg-[#111c24] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Title */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-accent-950 px-3 py-1 rounded-full text-xs font-mono text-accent-300 uppercase tracking-widest border border-accent-900">
              <Calculator className="h-3.5 w-3.5 text-accent-400" /> Tecnología de Negociación de Servicios
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-accent-100 tracking-tight">
              Cotizador Express y Generador de Propuestas
            </h2>
            <p className="text-sm sm:text-base text-[#b1c7d8] max-w-2xl mx-auto">
              Diseñe un encargo profesional integral. Agregue escritos del catálogo, configure las particularidades de precio o bonificación, complete los datos y obtenga un borrador de contrato/propuesta formal listo para su envío.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* CALCULATOR CONFIGURATION */}
            <div className="space-y-6">
              
              <div className="bg-[#162530] border border-[#233847] rounded-xl p-6 shadow-xl">
                <h3 className="font-serif text-lg text-accent-300 font-medium mb-4 flex items-center gap-2 border-b border-[#233847] pb-3">
                  <Calculator className="h-5 w-5" /> 1. Estructura de la Propuesta
                </h3>

                {selectedServices.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <FileText className="h-10 w-10 text-gray-500 mx-auto" />
                    <p className="text-sm text-[#9ab2c5]">No hay servicios seleccionados para la propuesta.</p>
                    <a 
                      href="#servicios" 
                      className="inline-block bg-accent-500 hover:bg-accent-600 text-brand-950 px-4 py-2 rounded text-xs font-semibold tracking-wide uppercase transition-colors"
                    >
                      Explorar y Agregar Servicios
                    </a>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                      {selectedServices.map((item, index) => (
                        <div 
                          key={item.service.id} 
                          id={`selected_item_${item.service.id}`}
                          className="bg-[#0e171f] p-4 rounded-lg border border-[#233847] space-y-3 relative"
                        >
                          {/* Close/Remove Button */}
                          <button
                            onClick={() => handleRemoveService(item.service.id)}
                            id={`btn_remove_selected_${item.service.id}`}
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-400 transition-colors p-1"
                            title="Quitar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <div className="pr-6">
                            <span className="inline-block text-[10px] bg-brand-900 text-accent-300 px-2 py-0.5 rounded font-mono font-medium mb-1">
                              Art. Ref: {item.service.lawReference || 'CPCM'}
                            </span>
                            <h4 className="font-medium text-sm text-white line-clamp-1">
                              {item.service.name}
                            </h4>
                          </div>

                          {/* Dynamic Values Fields */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {/* Price adjustment */}
                            <div>
                              <label className="block text-[10px] text-[#90a8bb] font-mono uppercase tracking-wider mb-1">
                                Honorario Base (Ajustable)
                              </label>
                              <div className="relative">
                                <span className="absolute left-2.5 top-2 text-xs text-accent-400 font-semibold">$</span>
                                <input
                                  type="number"
                                  value={item.variablePrice ?? item.service.basePrice}
                                  onChange={(e) => handleUpdateSelection(item.service.id, { variablePrice: parseFloat(e.target.value) || 0 })}
                                  className="w-full bg-[#121e27] border border-[#233847] rounded pl-6 pr-2 py-1 text-xs text-white focus:outline-none focus:border-accent-500 font-mono"
                                />
                              </div>
                            </div>

                            {/* Success bonus toggle */}
                            <div className="flex flex-col justify-end">
                              <label className="flex items-center gap-2 cursor-pointer bg-[#121e27] hover:bg-[#1a2b37] border border-[#233847] rounded px-3 py-1.5 transition-colors">
                                <input
                                  type="checkbox"
                                  checked={item.hasBono || false}
                                  onChange={(e) => handleUpdateSelection(item.service.id, { hasBono: e.target.checked })}
                                  className="rounded text-accent-500 focus:ring-0 focus:ring-offset-0 bg-transparent border-gray-600"
                                />
                                <span className="text-[11px] text-[#90a8bb] font-sans">
                                  Bono por éxito (+%)
                                </span>
                              </label>
                            </div>
                          </div>

                          {/* Conditional success bonus settings */}
                          {item.hasBono && (
                            <div className="bg-[#121e27] p-2.5 rounded border border-[#233847]/40 text-xs flex items-center justify-between gap-2">
                              <span className="text-[#90a8bb] text-[10px]">Gratificación por resultado favorable:</span>
                              <div className="flex items-center gap-1.5">
                                <button 
                                  onClick={() => handleUpdateSelection(item.service.id, { bonoPercent: Math.max(5, (item.bonoPercent || 10) - 5) })}
                                  className="w-5 h-5 bg-brand-900 hover:bg-brand-800 rounded flex items-center justify-center font-bold text-xs"
                                >
                                  -
                                </button>
                                <span className="font-mono font-bold text-accent-300 w-10 text-center">{item.bonoPercent}%</span>
                                <button 
                                  onClick={() => handleUpdateSelection(item.service.id, { bonoPercent: Math.min(30, (item.bonoPercent || 10) + 5) })}
                                  className="w-5 h-5 bg-brand-900 hover:bg-brand-800 rounded flex items-center justify-center font-bold text-xs"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Case Notes */}
                          <div>
                            <input
                              type="text"
                              placeholder="Escribir nota específica del expediente (ej. Juzgado de Paz de Soyapango)..."
                              value={item.customNotes || ''}
                              onChange={(e) => handleUpdateSelection(item.service.id, { customNotes: e.target.value })}
                              className="w-full bg-[#121e27] border border-[#233847]/70 rounded px-2.5 py-1 text-[11px] text-[#b1c7d8] focus:outline-none focus:border-accent-500 placeholder-gray-600"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total Sum Display */}
                    <div className="border-t border-[#233847] pt-4 flex justify-between items-center bg-[#0e171f] -mx-6 -mb-6 p-6 rounded-b-xl">
                      <div>
                        <span className="text-xs text-[#90a8bb] block uppercase tracking-wider font-mono">Honorario Base Estimado</span>
                        <span className="text-xs text-[#90a8bb]">(No incluye tasas ni aranceles)</span>
                      </div>
                      <span className="text-3xl font-serif text-accent-300 font-semibold">
                        ${calculatorTotals.baseTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* CLIENT PROFILE DETAILS FORM */}
              {selectedServices.length > 0 && (
                <div className="bg-[#162530] border border-[#233847] rounded-xl p-6 shadow-xl">
                  <h3 className="font-serif text-lg text-accent-300 font-medium mb-4 flex items-center gap-2 border-b border-[#233847] pb-3">
                    <User className="h-5 w-5" /> 2. Datos del Colega o Despacho Solicitante
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#90a8bb] mb-1">Nombre del Abogado / Contacto *</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Ej. Lic. Carlos Mendoza"
                        className="w-full bg-[#121e27] border border-[#233847] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-500 placeholder-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#90a8bb] mb-1">Firma / Despacho Jurídico</label>
                      <input
                        type="text"
                        value={clientFirm}
                        onChange={(e) => setClientFirm(e.target.value)}
                        placeholder="Ej. Mendoza & Asociados"
                        className="w-full bg-[#121e27] border border-[#233847] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-500 placeholder-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#90a8bb] mb-1">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        className="w-full bg-[#121e27] border border-[#233847] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-500 placeholder-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#90a8bb] mb-1">Teléfono Móvil (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Ej. (503) 7000-0000"
                        className="w-full bg-[#121e27] border border-[#233847] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-500 placeholder-gray-600"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-[#90a8bb] mb-1">Instrucciones Especiales o Resumen del Expediente</label>
                      <textarea
                        rows={3}
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        placeholder="Describa brevemente los plazos perentorios, la materia, prevenciones previas o particularidades del caso..."
                        className="w-full bg-[#121e27] border border-[#233847] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-500 placeholder-gray-600 resize-none"
                      />
                    </div>

                    {/* Form Action Controls Integrated Directly inside the step 2 container */}
                    <div className="sm:col-span-2 pt-6 border-t border-[#233847]/40 space-y-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        {/* Direct Mailto CTA */}
                        <a
                          href={(!clientName || !clientEmail || !clientPhone) ? '#cotizador' : mailtoLink}
                          onClick={(e) => {
                            if (!clientName || !clientEmail || !clientPhone) {
                              e.preventDefault();
                              alert("Por favor complete los datos del Despacho Solicitante (Nombre, Correo, Teléfono) antes de enviar.");
                            }
                          }}
                          id="btn_send_email_proposal"
                          className={`flex-1 text-center py-3 rounded font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                            (!clientName || !clientEmail || !clientPhone) 
                              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                              : 'bg-accent-500 hover:bg-accent-600 text-brand-950 shadow shadow-accent-500/20'
                          }`}
                        >
                          <Send className="h-4 w-4" />
                          Enviar por Correo a Mtr. Erick Cruz
                        </a>

                        {/* Direct WhatsApp Call */}
                        <a
                          href={`https://wa.me/50371769999?text=${encodeURIComponent(`Hola Mtr. Erick Cruz, acabo de cotizar unos servicios en su portal para el Despacho ${clientFirm || 'Mío'} de parte de ${clientName || 'mi persona'}. Me gustaría conversar de un encargo por un monto estimado de $${calculatorTotals.baseTotal.toFixed(2)}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          id="btn_whatsapp_proposal"
                          className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded font-semibold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5"
                        >
                          WhatsApp Directo
                        </a>
                      </div>

                      {(!clientName || !clientEmail || !clientPhone) ? (
                        <p className="text-[10px] text-amber-500 text-center font-sans">
                          * Ingrese su Nombre, Correo y Teléfono en el paso 2 para habilitar las opciones de envío directo.
                        </p>
                      ) : (
                        <p className="text-[10px] text-[#90a8bb] text-center font-sans">
                          Al hacer clic, se estructurará de inmediato un correo detallado o un chat de WhatsApp con los servicios seleccionados y montos correspondientes para el Mtr. Erick Cruz.
                        </p>
                      )}
                    </div>

                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* METHODOLOGY SECTION */}
      <section id="metodologia" className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono text-accent-600 uppercase tracking-widest font-semibold block">¿Cómo Trabajo?</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111c24] tracking-tight">Metodología Ágil y Rigor Técnico</h2>
            <p className="text-sm sm:text-base text-gray-600">
              La experiencia de litigar en sede judicial nos permite conocer con precisión qué busca el juzgador en los escritos de demanda y recursos. Nuestro proceso operativo está estructurado para maximizar las posibilidades de admisión:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORK_METHODOLOGY.map((step, idx) => (
              <div 
                key={idx} 
                id={`methodology_step_${step.step}`}
                className="p-6 rounded-xl border border-gray-200/80 hover:border-brand-200 hover:bg-slate-50/50 transition-all duration-150 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-widest text-accent-600 bg-accent-50 px-2.5 py-1 rounded">
                      PASO {step.step}
                    </span>
                  </div>
                  <h3 className="font-serif text-base text-[#111c24] font-medium">{step.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROFESSIONAL PROFILE SECTION */}
      <section id="perfil" className="py-24 bg-gradient-to-b from-white to-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Profile Left: Graphic Portrait */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute inset-0 bg-accent-100 rounded-2xl filter blur-2xl opacity-40"></div>
              
              <div id="attorney_portrait_wrapper" className="relative bg-white p-4 rounded-2xl border border-gray-200 shadow-xl max-w-sm">
                <img 
                  src={erickPortraitImg} 
                  alt="Mtr. Erick Cruz" 
                  className="w-full h-auto object-contain rounded-xl transition-all duration-300 hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-4 text-center">
                  <h4 className="font-serif text-lg text-brand-950 font-bold">Mtr. Erick Cruz</h4>
                  <p className="text-xs text-accent-700 font-mono font-medium uppercase tracking-widest mt-0.5">Consultor Jurídico Senior</p>
                </div>
              </div>
            </div>

            {/* Profile Right: Biographical Data */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-accent-600 uppercase tracking-widest font-semibold block">Perfil Profesional de Élite</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#111c24] tracking-tight">Especialización de Alto Nivel Procesal</h2>
              </div>

              {/* Bio Summary */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {PROFESSIONAL_BIO.experienceSummary}
              </p>

              {/* Academics & Focus areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 text-brand-900 font-serif font-semibold text-sm border-b border-gray-100 pb-2">
                    <Award className="h-4.5 w-4.5 text-accent-600" />
                    Credenciales Académicas
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside">
                    {PROFESSIONAL_BIO.education.map((edu, idx) => (
                      <li key={idx}>{edu}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 text-brand-900 font-serif font-semibold text-sm border-b border-gray-100 pb-2">
                    <BookOpen className="h-4.5 w-4.5 text-accent-600" />
                    Áreas de Alta Especialidad
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside">
                    <li>Derecho Procesal Civil y Mercantil</li>
                    <li>Litigios y Recursos en materia Laboral</li>
                    <li>Argumentación Jurídica Judicial</li>
                    <li>Análisis y Redacción de Casaciones</li>
                  </ul>
                </div>
              </div>

              {/* Contact direct credentials */}
              <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 text-xs font-mono text-gray-600">
                <a 
                  href="mailto:cruzsalguerocerick@gmail.com" 
                  className="flex items-center gap-2 hover:text-accent-700 transition-colors"
                >
                  <Mail className="h-4 w-4 text-accent-600" />
                  <span>cruzsalguerocerick@gmail.com</span>
                </a>
                <a 
                  href={`https://wa.me/50371769999?text=${encodeURIComponent("Hola Mtr. Erick Cruz, vengo de su sitio web y deseo realizar una consulta jurídica especializada.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent-700 transition-colors"
                >
                  <MessageSquare className="h-4 w-4 text-green-500" />
                  <span>(503) 7176-9999 (WhatsApp Directo)</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) SECTION */}
      <section id="faq" className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-mono text-accent-600 uppercase tracking-widest font-semibold block">Preguntas de Colegas y Firmas</span>
            <h2 className="font-serif text-3xl text-[#111c24] tracking-tight">Preguntas Frecuentes del Servicio</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Respuestas directas sobre la metodología de soporte externo, las garantías de confidencialidad y los esquemas de pago.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4" id="faq_accordion_wrapper">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div 
                  key={index} 
                  id={`faq_item_${index}`}
                  className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:border-brand-200 transition-colors bg-white"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    id={`faq_trigger_${index}`}
                    className="w-full flex justify-between items-center p-5 text-left text-brand-950 hover:text-brand-700 transition-colors font-serif font-medium text-sm sm:text-base"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 text-accent-600 transform transition-transform duration-250 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 text-xs sm:text-sm text-gray-600 border-t border-gray-100 bg-[#f8fafc]/50 leading-relaxed" id={`faq_answer_${index}`}>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CONTACT & APPOINTMENT BOOKING SECTION */}
      <section id="contacto" className="py-24 bg-[#0d161d] text-white relative overflow-hidden">
        
        {/* Abstract background decorative patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full filter blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/5 rounded-full filter blur-3xl opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details (Left) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono text-accent-400 uppercase tracking-widest font-semibold block">Inicie la Colaboración</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">Agende una Sesión de Trabajo Virtual</h2>
                <p className="text-sm text-[#b1c7d8] leading-relaxed">
                  ¿Tiene un plazo perentorio corriendo en el tribunal? Remita la información preliminar para agilizar el análisis y recibir una estimación formal de plazos de entrega.
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-[#1b2f3e]">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#162530] border border-[#233847] rounded-lg text-accent-400 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-[#90a8bb] tracking-widest">Correo Profesional</span>
                    <a href={`mailto:${PROFESSIONAL_BIO.email}`} className="text-sm sm:text-base text-white hover:text-accent-300 font-semibold transition-colors block mt-0.5">
                      cruzsalguerocerick@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#162530] border border-[#233847] rounded-lg text-accent-400 shrink-0">
                    <MessageSquare className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-[#90a8bb] tracking-widest">WhatsApp Directo</span>
                    <a 
                      href={`https://wa.me/50371769999?text=${encodeURIComponent("Hola Mtr. Erick Cruz, vengo de su sitio web y deseo realizar una consulta jurídica especializada.")}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm sm:text-base text-white hover:text-accent-300 font-semibold transition-colors block mt-0.5"
                    >
                      (503) 7176-9999
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#162530] border border-[#233847] rounded-lg text-accent-400 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-[#90a8bb] tracking-widest">Ubicación y Cobertura</span>
                    <p className="text-sm text-white font-medium block mt-0.5">
                      El Salvador, C.A. — Cobertura a nivel nacional para audiencias judiciales.
                    </p>
                  </div>
                </div>
              </div>

              {/* Working hours card */}
              <div className="bg-[#121e27] border border-[#233847] p-5 rounded-xl space-y-2 max-w-sm">
                <div className="flex items-center gap-2 text-xs font-mono text-accent-300 uppercase tracking-wider">
                  <Clock className="h-4 w-4 text-accent-400" /> Horarios de Atención
                </div>
                <p className="text-xs text-gray-300">
                  Lunes a Viernes: 8:00 AM - 5:00 PM<br />
                  Sábado: 8:00 AM - 12:00 MD<br />
                  <span className="text-accent-400 text-[10px] font-semibold block mt-1">Canales en línea abiertos 24/7 para recepción de solicitudes urgentes.</span>
                </p>
              </div>
            </div>

            {/* Interactive Contact Form (Right) */}
            <div className="lg:col-span-7">
              <div id="contact_form_container" className="bg-[#162530] border border-[#233847] p-6 sm:p-8 rounded-2xl shadow-2xl">
                <h3 className="font-serif text-xl text-white font-medium mb-6">Formulario de Requerimiento de Servicios</h3>
                
                {contactSubmitted ? (
                  <div className="bg-green-950/40 border border-green-800 text-green-300 p-6 rounded-lg text-center space-y-3">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                    <h4 className="font-serif text-lg font-semibold">¡Mensaje Enviado con Éxito!</h4>
                    <p className="text-xs max-w-md mx-auto leading-relaxed">
                      Gracias por ponerse en contacto. Se ha estructurado una notificación preliminar para el <strong>Mtr. Erick Cruz</strong>. Él o su equipo de apoyo se comunicarán con usted en breve por teléfono o correo electrónico.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4" id="legal_contact_form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#90a8bb] mb-1">Nombre Completo *</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Ej. Lic. Claudia Quintanilla"
                          className="w-full bg-[#121e27] border border-[#233847] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-500 placeholder-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#90a8bb] mb-1">Correo Electrónico *</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="ejemplo@correo.com"
                          className="w-full bg-[#121e27] border border-[#233847] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-500 placeholder-gray-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#90a8bb] mb-1">Teléfono Móvil (WhatsApp) *</label>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="Ej. (503) 7111-2222"
                          className="w-full bg-[#121e27] border border-[#233847] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-500 placeholder-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#90a8bb] mb-1">Asunto del Encargo</label>
                        <select
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full bg-[#121e27] border border-[#233847] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-500"
                        >
                          <option value="Asesoría Jurídica">Asesoría Jurídica y Viabilidad</option>
                          <option value="Redacción de Demanda">Redacción de Demanda</option>
                          <option value="Contestación de Demanda">Contestación de Demanda</option>
                          <option value="Recurso de Apelación">Recurso de Apelación / Casación</option>
                          <option value="Apoyo en Audiencia">Asistencia en Audiencia Judicial</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#90a8bb] mb-1">Descripción de los Hechos o Plazos *</label>
                      <textarea
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Por favor describa brevemente las pretensiones, los plazos judiciales vencidos o por vencer, o las dudas que requiera esclarecer..."
                        className="w-full bg-[#121e27] border border-[#233847] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-500 placeholder-gray-600 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      id="btn_submit_contact_form"
                      className="w-full bg-accent-500 hover:bg-accent-600 text-brand-950 font-semibold py-3 rounded text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-accent-500/10"
                    >
                      Enviar Solicitud de Reunión
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    
                    <p className="text-[10px] text-gray-500 text-center">
                      * Toda la información ingresada está estrictamente sujeta a los lineamientos de secreto profesional de la consultoría.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer id="footer_section" className="bg-[#080d12] text-gray-400 py-12 border-t border-[#111c24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-[#111c24] pb-8">
            
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent-500 rounded-lg text-brand-950">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <span className="font-serif text-base tracking-wider font-semibold block text-accent-100 uppercase">
                  Estudio Procesal
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#9ab2c5] font-mono block">
                  Civil y Mercantil
                </span>
              </div>
            </div>

            {/* Middle Copyright */}
            <div className="text-center text-xs text-gray-500">
              © {new Date().getFullYear()} Estudio Procesal Civil & Mercantil. Todos los derechos reservados.<br />
              Servicio de Consultoría y Producción Jurídica Premium para El Salvador.
            </div>

            {/* Right Contact details */}
            <div className="text-left md:text-right text-xs font-mono space-y-0.5 text-gray-500">
              <div>Consultor Senior: Mtr. Erick Cruz</div>
              <div>Correo: <a href={`mailto:${PROFESSIONAL_BIO.email}`} className="text-gray-400 hover:text-accent-300">{PROFESSIONAL_BIO.email}</a></div>
              <div>Teléfono: <a href="https://wa.me/50371769999" className="text-gray-400 hover:text-accent-300">{PROFESSIONAL_BIO.phone}</a></div>
            </div>

          </div>

          <div className="pt-8 text-center text-[10px] text-gray-600">
            Aviso de Exclusiones de Responsabilidad: Los análisis de viabilidad técnica y redacción de borradores procesales se ejecutan bajo los principios de debida diligencia y máxima especialización legal. Sin embargo, los resultados de los litigios judiciales están sujetos de forma exclusiva al criterio del juzgador y la valoración de pruebas de los tribunales correspondientes del Órgano Judicial de El Salvador.
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href={`https://wa.me/50371769999?text=${encodeURIComponent("Hola Mtr. Erick Cruz, vengo de su sitio web y deseo realizar una consulta jurídica especializada.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        id="floating_whatsapp_widget"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group font-sans text-xs font-semibold"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-100"></span>
        </span>
        <MessageSquare className="h-4.5 w-4.5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap">
          ¿Consultar Caso?
        </span>
        <span>WhatsApp</span>
      </a>

    </div>
  );
}
