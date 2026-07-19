import { FeeService, FAQItem } from './types';

export const SERVICES_DATA: FeeService[] = [
  {
    id: 'dec_comun',
    name: 'Demanda de Proceso Declarativo Común',
    category: 'demandas_solicitudes',
    basePrice: 275.00,
    lawReference: 'Arts. 276 y ss. CPCM',
    description: 'Elaboración técnica y estructuración legal de demandas para procesos civiles y mercantiles complejos que exigen fundamentación doctrinal, jurisprudencial y estratégica de alto nivel.'
  },
  {
    id: 'dec_abreviado',
    name: 'Demanda de Proceso Declarativo Abreviado',
    category: 'demandas_solicitudes',
    basePrice: 175.00,
    lawReference: 'Arts. 418 y ss. CPCM',
    description: 'Redacción y fundamentación de pretensiones que deban sustanciarse en proceso abreviado, garantizando la celeridad y la precisión técnica exigida por la normativa.'
  },
  {
    id: 'proc_especiales',
    name: 'Procesos Especiales (Ejecutivo, Inquilinato, Posesorio, Monitorio)',
    category: 'demandas_solicitudes',
    basePrice: 225.00,
    priceNote: 'El honorario para procesos ejecutivos varía según la cuantía del saldo de capital e intereses que se pretenda recuperar.',
    lawReference: 'Arts. 457 y ss. CPCM',
    description: 'Formulación de demandas ejecutivas, reclamos de inquilinato o posesorios, estructurando la prueba documental preconstituida para un despacho judicial favorable.'
  },
  {
    id: 'desalojo_paz',
    name: 'Solicitud de Desalojo de Inmueble (Juzgado de Paz)',
    category: 'demandas_solicitudes',
    basePrice: 175.00,
    lawReference: 'Ley Especial para la Garantía de la Propiedad o Posesión Regular de Inmuebles',
    description: 'Estructuración de solicitud de desalojo ágil para propietarios despojados o perturbados en su posesión, tramitada bajo la ley especial ante el Juzgado de Paz correspondiente.'
  },
  {
    id: 'dilig_preliminares',
    name: 'Diligencias Preliminares',
    category: 'diligencias_otros',
    basePrice: 125.00,
    lawReference: 'Art. 255 CPCM',
    description: 'Redacción de solicitudes judiciales orientadas a la obtención de datos, documentos, exhibición de cosas o declaraciones indispensables para preparar adecuadamente un futuro litigio.'
  },
  {
    id: 'aceptacion_herencia',
    name: 'Solicitud de Aceptación de Herencia',
    category: 'diligencias_otros',
    basePrice: 125.00,
    lawReference: 'Código Civil y CPCM',
    description: 'Diligencias de aceptación de herencia (vía judicial), estructurando la legitimación de los herederos y los escritos iniciales para la declaratoria de herederos interinos y definitivos.'
  },
  {
    id: 'conciliacion_paz',
    name: 'Solicitud de Conciliación (Juzgado de Paz)',
    category: 'diligencias_otros',
    basePrice: 175.00,
    lawReference: 'Arts. 246 y ss. CPCM',
    description: 'Preparación de solicitud formal de conciliación ante el Juzgado de Paz, delimitando de forma clara los puntos de avenimiento estratégico antes de iniciar la vía litigiosa ordinaria.'
  },
  {
    id: 'subsanacion_prevenciones',
    name: 'Subsanación de Prevenciones Judiciales',
    category: 'contestaciones_defensas',
    basePrice: 100.00,
    priceNote: 'Varía según la complejidad del requerimiento del tribunal y la urgencia (días restantes del plazo perentorio).',
    lawReference: 'Art. 278 CPCM',
    description: 'Análisis y redacción oportuna de escritos de subsanación de prevenciones de admisibilidad o procedencia de demandas, resguardando la vigencia del proceso.'
  },
  {
    id: 'contestacion_declarativo',
    name: 'Contestación de Demanda en Proceso Declarativo Común',
    category: 'contestaciones_defensas',
    basePrice: 175.00,
    priceNote: 'Sujeto a variación por urgencia legal o plazos remanentes perentorios.',
    lawReference: 'Art. 284 CPCM',
    description: 'Estructuración formal de la oposición, articulación de excepciones procesales y materiales, y planteamiento estratégico de la defensa técnica frente a pretensiones adversas.'
  },
  {
    id: 'contestacion_reconvencion',
    name: 'Contestación y Reconvención de Demanda (Declarativo Común)',
    category: 'contestaciones_defensas',
    basePrice: 275.00,
    priceNote: 'Sujeto a ajuste técnico según los plazos procesales disponibles.',
    lawReference: 'Arts. 284 y 285 CPCM',
    description: 'Defensa integral que incluye tanto la contestación de la demanda principal como la formulación de una contrademanda técnica (reconvención) para tomar la ofensiva procesal.'
  },
  {
    id: 'contestacion_especiales',
    name: 'Contestación en Procesos Especiales (Ejecutivo, Inquilinato, etc.)',
    category: 'contestaciones_defensas',
    basePrice: 225.00,
    priceNote: 'En procesos ejecutivos, el alcance depende del volumen de excepciones materiales u oposición documental.',
    lawReference: 'Arts. 462 y ss. CPCM',
    description: 'Preparación de escritos de oposición basados en motivos taxativos de ley, como el pago, la pluspetición, la prescripción o la falsedad del título ejecutivo.'
  },
  {
    id: 'impugnaciones_recursos',
    name: 'Recursos e Impugnaciones (Apelación, Casación, Revocatoria)',
    category: 'impugnaciones_recursos',
    basePrice: 275.00,
    lawReference: 'Arts. 501 y ss. CPCM',
    description: 'Elaboración técnica de recursos de apelación y casación civiles y mercantiles, estructurando de manera rigurosa la infracción de ley, el error en la valoración de prueba y las normas infringidas.'
  }
];

export const WORK_METHODOLOGY = [
  {
    step: '01',
    title: 'Análisis Técnico y Viabilidad',
    description: 'Estudio pormenorizado del expediente, los medios de prueba existentes y la jurisprudencia aplicable para determinar la mejor línea estratégica de acción.'
  },
  {
    step: '02',
    title: 'Estructuración y Redacción de Alta Precisión',
    description: 'Elaboración minuciosa de la pieza procesal (demanda, contestación o recurso) cuidando rigurosamente la ortografía, la técnica procesal y la solidez argumentativa.'
  },
  {
    step: '03',
    title: 'Revisión y Entrega Conforme',
    description: 'Sometimiento del borrador a revisión técnica conjunta, afinación de detalles procesales y entrega del documento final listo para firma y presentación en el tribunal.'
  },
  {
    step: '04',
    title: 'Apoyo Remoto y Acompañamiento',
    description: 'Asesoría continua durante el trámite de admisión y sustanciación de la pieza procesal redactada, incluyendo propuestas de escritos para subsanar prevenciones si ocurrieren.'
  }
];

export const AUDIENCE_DATA = [
  {
    title: 'Firmas y Despachos Jurídicos',
    description: 'Especialistas que necesitan delegar la producción de escritos procesales de alto rigor técnico para desahogar la carga laboral de su equipo permanente.'
  },
  {
    title: 'Abogados Litigantes',
    description: 'Profesionales independientes que buscan un respaldo de consultoría senior para diseñar la estrategia procesal y argumentación de casos civiles o mercantiles complejos.'
  },
  {
    title: 'Equipos Legales Corporativos',
    description: 'Departamentos jurídicos de empresas que requieren un dictamen o el planteamiento técnico de un conflicto procesal mercantil o laboral antes de iniciar la fase judicial.'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: '¿Cómo se garantiza la confidencialidad de la información?',
    answer: 'La confidencialidad es un pilar absoluto del servicio. Previo a la recepción de cualquier documento o expediente, se suscribe un Acuerdo de Confidencialidad (NDA) para garantizar que toda la información técnica, comercial o personal compartida sea tratada bajo el más estricto secreto profesional.'
  },
  {
    question: '¿Qué incluye la tarifa de honorarios detallada?',
    answer: 'La tarifa incluye el análisis exhaustivo del caso, la investigación jurisprudencial de soporte, la elaboración completa del escrito con técnica de alta precisión, y la asesoría inicial para su presentación en el tribunal. No incluye el pago de aranceles, tasas judiciales, copias u otros gastos operativos de tramitación.'
  },
  {
    question: '¿Cómo se maneja la modalidad de trabajo remota?',
    answer: 'Toda la interacción se realiza de forma digital mediante correo electrónico, llamadas telefónicas y reuniones virtuales de trabajo (Google Meet, Zoom, etc.). Los borradores y entregables finales se remiten en formatos de procesador de texto editables (.docx) y documentos firmados digitalmente (.pdf) listos para su uso.'
  },
  {
    question: '¿Ofrece asistencia en audiencias presenciales?',
    answer: 'Sí. Se ofrece cobertura a nivel nacional para la asistencia y apoyo técnico en audiencias judiciales en materia civil, mercantil y laboral, la cual incluye una preparación técnica previa exhaustiva y el seguimiento legal posterior correspondiente.'
  },
  {
    question: '¿Cómo se realiza el pago de los honorarios?',
    answer: 'El servicio opera bajo un modelo de encargo profesional o por proyecto. El esquema estándar requiere un anticipo del 50% al iniciar el análisis técnico y el 50% restante contra la entrega conforme de la pieza procesal redactada.'
  }
];

export const PROFESSIONAL_BIO = {
  name: 'Mtr. Erick Cruz',
  title: 'Consultor Jurídico Senior & Especialista en Derecho Procesal',
  email: 'cruzsalguerocerick@gmail.com',
  phone: '(503) 7176-9999',
  location: 'El Salvador (Cobertura Nacional y Soporte Remoto)',
  education: [
    'Maestría en Derecho Procesal Civil y Mercantil',
    'Licenciatura en Ciencias Jurídicas',
    'Especializaciones en Argumentación Jurídica y Técnica de Casación'
  ],
  experienceSummary: 'Especialista legal freelance con una sólida trayectoria que integra 15 años de experiencia acumulada en la sede judicial civil del Órgano Judicial de El Salvador. Esta trayectoria ofrece una perspectiva privilegiada desde el interior de los tribunales, con amplio dominio del Código Procesal Civil y Mercantil (CPCM), así como vasta experiencia en la estructuración de resoluciones, sentencias y fundamentaciones jurídicas complejas.'
};
