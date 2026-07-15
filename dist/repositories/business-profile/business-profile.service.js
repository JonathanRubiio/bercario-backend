"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessProfileService = void 0;
const common_1 = require("@nestjs/common");
const business_profile_repository_1 = require("./repositories/business-profile.repository");
let BusinessProfileService = class BusinessProfileService {
    profileRepo;
    constructor(profileRepo) {
        this.profileRepo = profileRepo;
    }
    async getProfileBySlug(slug) {
        const profile = await this.profileRepo.findById({ slug });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil de negocio no encontrado');
        }
        return profile;
    }
    async getProfileByUserId(userId) {
        const profile = await this.profileRepo.findById({ userId });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil de negocio no encontrado para este usuario');
        }
        return profile;
    }
    async updateProfile(userId, updateData) {
        const profile = await this.profileRepo.findById({ userId });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil de negocio no encontrado');
        }
        const allowedFields = [
            'name', 'tagline', 'description', 'phone', 'email', 'address',
            'banner', 'logo', 'slug', 'products', 'testimonials', 'faqs', 'gallery', 'sections'
        ];
        const cleanUpdateData = {};
        for (const key of allowedFields) {
            if (updateData[key] !== undefined) {
                cleanUpdateData[key] = updateData[key];
            }
        }
        await this.profileRepo.update({ id: profile.id }, cleanUpdateData);
        const updated = await this.profileRepo.findById({ id: profile.id });
        if (!updated) {
            throw new common_1.NotFoundException('Error al recuperar perfil actualizado');
        }
        return updated;
    }
    async updateSections(userId, sections) {
        const profile = await this.profileRepo.findById({ userId });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil de negocio no encontrado');
        }
        await this.profileRepo.update({ id: profile.id }, { sections });
        const updated = await this.profileRepo.findById({ id: profile.id });
        if (!updated) {
            throw new common_1.NotFoundException('Error al recuperar perfil actualizado');
        }
        return updated;
    }
    STATIC_TEMPLATES = [
        {
            id: 'minimalist_dark',
            name: 'Servicios Profesionales (Oscuro)',
            niche: 'Servicios Profesionales',
            globalStyles: { paletteId: 'pizarra', fontPairId: 'modern_serif', buttonStyle: 'rounded' },
            landingConfig: [
                {
                    id: 'sec_hero_default',
                    type: 'HERO_BANNER',
                    order: 1,
                    visible: true,
                    label: 'Banner principal (Héroe)',
                    description: 'Imagen destacada, logo y propuesta de valor.',
                    content: {
                        title: 'Asesoría Profesional',
                        subtitle: 'Impulsamos el crecimiento y desarrollo de tu negocio.',
                        ctaText: 'Agendar Cita',
                        ctaUrl: '#form',
                        layoutDirection: 'left-to-right',
                        align: 'center',
                    },
                },
                {
                    id: 'sec_empathy_default',
                    type: 'EMPATHY_SECTION',
                    order: 2,
                    visible: true,
                    label: 'Empatía (Problema)',
                    description: 'Sección para conectar con los dolores del cliente.',
                    content: {
                        title: '¿Sientes que tu negocio está estancado?',
                        description: 'Sabemos lo difícil que es escalar procesos sin la guía correcta. Te acompañamos en cada etapa de crecimiento.',
                        align: 'center',
                    },
                },
                {
                    id: 'sec_solution_default',
                    type: 'SOLUTION_OFFER',
                    order: 3,
                    visible: true,
                    label: 'Oferta de Solución',
                    description: 'Presenta tu producto o servicio estrella.',
                    content: {
                        title: 'Soluciones de Negocio Estratégicas',
                        description: 'Ayudamos a pymes y profesionales a reestructurar sus finanzas y operaciones para maximizar rentabilidad.',
                        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
                        ctaText: 'Quiero una Asesoría',
                        ctaUrl: '#form',
                        layoutDirection: 'left-to-right',
                        align: 'left',
                    },
                },
                {
                    id: 'sec_value_default',
                    type: 'VALUE_PROP',
                    order: 4,
                    visible: true,
                    label: 'Propuesta de Valor (Beneficios)',
                    description: 'Grid modular para explicar los beneficios clave de tu oferta.',
                    content: {
                        title: 'Nuestros Pilares de Trabajo',
                        columns: 3,
                        items: [
                            { title: 'Enfoque Práctico', description: 'Metodologías accionables desde el primer día.' },
                            { title: 'Experiencia Probada', description: 'Consultores con más de 10 años en el sector.' },
                            { title: 'Resultados Medibles', description: 'Establecemos KPIs claros para tu tranquilidad.' }
                        ],
                        align: 'center',
                    },
                },
                {
                    id: 'sec_how_default',
                    type: 'HOW_IT_WORKS',
                    order: 5,
                    visible: true,
                    label: 'Cómo Funciona (Proceso)',
                    description: 'Timeline interactivo explicando los pasos de adquisición.',
                    content: {
                        title: 'Nuestra Metodología en 3 Pasos',
                        items: [
                            { step: '1', title: 'Diagnóstico Inicial', description: 'Analizamos el estado actual de tu negocio.' },
                            { step: '2', title: 'Plan de Acción', description: 'Diseñamos una estrategia a tu medida.' },
                            { step: '3', title: 'Implementación', description: 'Ejecutamos y medimos resultados juntos.' }
                        ],
                        align: 'center',
                    },
                },
                {
                    id: 'sec_about_default',
                    type: 'ABOUT_US',
                    order: 6,
                    visible: true,
                    label: 'Quiénes somos (Autoridad)',
                    description: 'Biografía, trayectoria y marcas que respaldan.',
                    content: {
                        title: 'Sobre el Director',
                        description: 'Consultor especializado en estructuración financiera y de negocios con una amplia cartera de clientes a nivel nacional.',
                        signature: 'Socio Fundador',
                        align: 'left',
                    },
                },
                {
                    id: 'sec_testimonials_default',
                    type: 'TESTIMONIALS',
                    order: 7,
                    visible: true,
                    label: 'Testimonios (Prueba Social)',
                    description: 'Carrusel o grilla de comentarios de clientes reales.',
                    content: {
                        title: 'Casos de Éxito',
                        columns: 3,
                        items: [
                            { name: 'Liliana Rojas', role: 'Gerente · Inmobiliaria R', comment: 'Gracias a la consultoría reorganizamos nuestro departamento comercial y crecimos un 40%.', rating: 5, avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
                            { name: 'Ricardo Silva', role: 'Fundador · Tech Corp', comment: 'El diagnóstico financiero nos salvó de tomar malas decisiones de inversión.', rating: 5, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' }
                        ],
                        align: 'center',
                    },
                },
                {
                    id: 'sec_form_default',
                    type: 'CONVERSION_FORM',
                    order: 8,
                    visible: true,
                    label: 'Formulario de Registro (CRM)',
                    description: 'Caja dedicada para capturar leads y correos.',
                    content: {
                        title: 'Solicita una sesión de diagnóstico gratuita',
                        subtitle: 'Completa el formulario y te contactaremos en menos de 24 horas.',
                        ctaText: 'Reservar Diagnóstico Gratis',
                        align: 'center',
                    },
                },
                {
                    id: 'sec_reversal_default',
                    type: 'RISK_REVERSAL',
                    order: 9,
                    visible: true,
                    label: 'Reducción de Riesgo (Garantía)',
                    description: 'Bloque con sello de confianza para romper objeciones.',
                    content: {
                        title: 'Garantía de Devolución de Inversión',
                        description: 'Si tras el primer mes no ves un avance concreto en las metas trazadas, te devolvemos el total de tus honorarios consultivos.',
                        days: 30,
                        align: 'center',
                    },
                },
                {
                    id: 'sec_faq_default',
                    type: 'FAQ_ACCORDION',
                    order: 10,
                    visible: true,
                    label: 'Preguntas Frecuentes',
                    description: 'Componente colapsable de preguntas y respuestas.',
                    content: {
                        title: 'Dudas Comunes',
                        items: [
                            { question: '¿La asesoría es presencial o virtual?', answer: 'Ambos formatos. Nos adaptamos a tus necesidades y ubicación.' },
                            { question: '¿Cómo garantizan la confidencialidad?', answer: 'Firmamos un acuerdo de confidencialidad estricto (NDA) antes de iniciar.' }
                        ],
                        align: 'center',
                    },
                },
                {
                    id: 'sec_footer_default',
                    type: 'FOOTER_SECTION',
                    order: 11,
                    visible: true,
                    label: 'Pie de Página (Legal)',
                    description: 'Enlaces a políticas legales, copyright y redes.',
                    content: {
                        copyright: '© 2026 Asesores Asociados. Todos los derechos reservados.',
                        align: 'center',
                    },
                },
            ],
        },
        {
            id: 'corporate_blue',
            name: 'Corporativo Clásico (Azul)',
            niche: 'Corporativo',
            globalStyles: { paletteId: 'bosque', fontPairId: 'classic_sans', buttonStyle: 'square' },
            landingConfig: [
                {
                    id: 'sec_hero_default',
                    type: 'HERO_BANNER',
                    order: 1,
                    visible: true,
                    label: 'Banner principal (Héroe)',
                    description: 'Imagen destacada, logo y propuesta de valor.',
                    content: {
                        title: 'Soluciones Corporativas',
                        subtitle: 'Infraestructura y consultoría para grandes empresas.',
                        ctaText: 'Solicitar Demo',
                        ctaUrl: '#form',
                        layoutDirection: 'left-to-right',
                        align: 'left',
                    },
                },
                {
                    id: 'sec_empathy_default',
                    type: 'EMPATHY_SECTION',
                    order: 2,
                    visible: true,
                    label: 'Empatía (Problema)',
                    description: 'Sección para conectar con los dolores del cliente.',
                    content: {
                        title: '¿Buscando optimizar la eficiencia corporativa?',
                        description: 'Las empresas medianas y grandes pierden hasta un 25% de eficiencia por procesos y software desconectados. Es hora de integrar.',
                        align: 'center',
                    },
                },
                {
                    id: 'sec_solution_default',
                    type: 'SOLUTION_OFFER',
                    order: 3,
                    visible: true,
                    label: 'Oferta de Solución',
                    description: 'Presenta tu producto o servicio estrella.',
                    content: {
                        title: 'Integración y Consultoría IT de Gran Escala',
                        description: 'Conectamos tus sistemas heredados con modernas APIs en la nube, automatizando flujos de trabajo redundantes.',
                        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
                        ctaText: 'Agendar Demo Técnica',
                        ctaUrl: '#form',
                        layoutDirection: 'right-to-left',
                        align: 'left',
                    },
                },
                {
                    id: 'sec_value_default',
                    type: 'VALUE_PROP',
                    order: 4,
                    visible: true,
                    label: 'Propuesta de Valor (Beneficios)',
                    description: 'Grid modular para explicar los beneficios clave de tu oferta.',
                    content: {
                        title: 'Nuestros Valores Clave',
                        columns: 3,
                        items: [
                            { title: 'Seguridad Empresarial', description: 'Cumplimos con estrictas normativas ISO 27001.' },
                            { title: 'Soporte VIP Dedicado', description: 'Ingenieros disponibles con SLA de respuesta de 1 hora.' },
                            { title: 'Escalabilidad Cloud', description: 'Infraestructura diseñada para absorber grandes tráficos.' }
                        ],
                        align: 'center',
                    },
                },
                {
                    id: 'sec_how_default',
                    type: 'HOW_IT_WORKS',
                    order: 5,
                    visible: true,
                    label: 'Cómo Funciona (Proceso)',
                    description: 'Timeline interactivo explicando los pasos de adquisición.',
                    content: {
                        title: 'Nuestra Hoja de Ruta de Integración',
                        items: [
                            { step: '1', title: 'Consultoría Técnica', description: 'Levantamiento de sistemas y base de datos.' },
                            { step: '2', title: 'Planificación de API', description: 'Esquematización del flujo integrado.' },
                            { step: '3', title: 'Puesta en Marcha', description: 'Implementación coordinada con tu equipo técnico.' }
                        ],
                        align: 'center',
                    },
                },
                {
                    id: 'sec_about_default',
                    type: 'ABOUT_US',
                    order: 6,
                    visible: true,
                    label: 'Quiénes somos (Autoridad)',
                    description: 'Biografía, trayectoria y marcas que respaldan.',
                    content: {
                        title: 'Trayectoria Corporativa',
                        description: 'Con más de 20 años liderando integraciones de sistemas en corporaciones de toda América Latina.',
                        signature: 'Comité de Dirección',
                        align: 'left',
                    },
                },
                {
                    id: 'sec_testimonials_default',
                    type: 'TESTIMONIALS',
                    order: 7,
                    visible: true,
                    label: 'Testimonios (Prueba Social)',
                    description: 'Carrusel o grilla de comentarios de clientes reales.',
                    content: {
                        title: 'Opiniones Corporativas',
                        columns: 3,
                        items: [
                            { name: 'Humberto Díaz', role: 'CIO · Banco Nacional', comment: 'La integración redujo los tiempos de conciliación bancaria de 4 días a minutos.', rating: 5, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' }
                        ],
                        align: 'center',
                    },
                },
                {
                    id: 'sec_form_default',
                    type: 'CONVERSION_FORM',
                    order: 8,
                    visible: true,
                    label: 'Formulario de Registro (CRM)',
                    description: 'Caja dedicada para capturar leads y correos.',
                    content: {
                        title: 'Solicita una evaluación de sistemas gratis',
                        subtitle: 'Un arquitecto de soluciones revisará tu infraestructura y preparará un borrador inicial de API sin costo.',
                        ctaText: 'Solicitar Evaluación Técnica',
                        align: 'center',
                    },
                },
                {
                    id: 'sec_reversal_default',
                    type: 'RISK_REVERSAL',
                    order: 9,
                    visible: true,
                    label: 'Reducción de Riesgo (Garantía)',
                    description: 'Bloque con sello de confianza para romper objeciones.',
                    content: {
                        title: 'Garantía de Tiempo de Operación',
                        description: 'Garantizamos por contrato un SLA de 99.9% de uptime para todos los microservicios desplegados.',
                        days: 30,
                        align: 'center',
                    },
                },
                {
                    id: 'sec_faq_default',
                    type: 'FAQ_ACCORDION',
                    order: 10,
                    visible: true,
                    label: 'Preguntas Frecuentes',
                    description: 'Componente colapsable de preguntas y respuestas.',
                    content: {
                        title: 'Preguntas Técnicas Frecuentes',
                        items: [
                            { question: '¿Soportan bases de datos On-Premise?', answer: 'Sí, podemos estructurar conexiones híbridas seguras mediante VPN dedicadas.' },
                            { question: '¿Cuánto dura un proyecto promedio?', answer: 'Las integraciones iniciales toman de 3 a 6 semanas.' }
                        ],
                        align: 'center',
                    },
                },
                {
                    id: 'sec_footer_default',
                    type: 'FOOTER_SECTION',
                    order: 11,
                    visible: true,
                    label: 'Pie de Página (Legal)',
                    description: 'Enlaces a políticas legales, copyright y redes.',
                    content: {
                        copyright: '© 2026 Corporación IT S.A.S. Todos los derechos reservados.',
                        align: 'center',
                    },
                },
            ]
        },
        {
            id: 'retail_orange',
            name: 'Tienda Moderna (Naranja)',
            niche: 'Comercio',
            globalStyles: { paletteId: 'arena', fontPairId: 'playful_sans', buttonStyle: 'pill' },
            landingConfig: [
                {
                    id: 'sec_hero_default',
                    type: 'HERO_BANNER',
                    order: 1,
                    visible: true,
                    label: 'Banner principal (Héroe)',
                    description: 'Imagen destacada, logo y propuesta de valor.',
                    content: {
                        title: 'Novedades y Estilo',
                        subtitle: 'Los mejores productos con despacho directo a tu puerta.',
                        ctaText: 'Ver Colección',
                        ctaUrl: '#catalog',
                        layoutDirection: 'left-to-right',
                        align: 'center',
                    },
                },
                {
                    id: 'sec_empathy_default',
                    type: 'EMPATHY_SECTION',
                    order: 2,
                    visible: true,
                    label: 'Empatía (Problema)',
                    description: 'Sección para conectar con los dolores del cliente.',
                    content: {
                        title: '¿Cansado de productos aburridos y de mala calidad?',
                        description: 'Encontrar diseños modernos, resistentes y a buen precio mayorista para surtir tu negocio no debería ser un dolor de cabeza constante.',
                        align: 'center',
                    },
                },
                {
                    id: 'sec_solution_default',
                    type: 'SOLUTION_OFFER',
                    order: 3,
                    visible: true,
                    label: 'Oferta de Solución',
                    description: 'Presenta tu producto o servicio estrella.',
                    content: {
                        title: 'Colecciones de Temporada con Calidad Premium',
                        description: 'Surtimos tu negocio con los modelos más vendidos en calzado y moda, elaborados con materiales garantizados.',
                        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
                        ctaText: 'Ver Catálogo Digital',
                        ctaUrl: '#catalog',
                        layoutDirection: 'left-to-right',
                        align: 'center',
                    },
                },
                {
                    id: 'sec_value_default',
                    type: 'VALUE_PROP',
                    order: 4,
                    visible: true,
                    label: 'Propuesta de Valor (Beneficios)',
                    description: 'Grid modular para explicar los beneficios clave de tu oferta.',
                    content: {
                        title: '¿Por qué comprar con nosotros?',
                        columns: 3,
                        items: [
                            { title: 'Docenas Surtidas', description: 'Combina tallas y colores libremente en tu pedido.' },
                            { title: 'Cambios sin Costo', description: 'Cambia los modelos que no se vendan en 30 días.' },
                            { title: 'Envío Asegurado', description: 'Garantizamos la entrega de tu mercancía en perfectas condiciones.' }
                        ],
                        align: 'center',
                    },
                },
                {
                    id: 'sec_how_default',
                    type: 'HOW_IT_WORKS',
                    order: 5,
                    visible: true,
                    label: 'Cómo Funciona (Proceso)',
                    description: 'Timeline interactivo explicando los pasos de adquisición.',
                    content: {
                        title: 'Pasos para Realizar tu Pedido',
                        items: [
                            { step: '1', title: 'Selecciona tus Modelos', description: 'Explora y agrega las referencias al carrito digital.' },
                            { step: '2', title: 'Asesoría y Validación', description: 'Un asesor valida la disponibilidad y despacho.' },
                            { step: '3', title: 'Recibe y Vende', description: 'Te despachamos tu calzado listo para poner en vitrina.' }
                        ],
                        align: 'center',
                    },
                },
                {
                    id: 'sec_about_default',
                    type: 'ABOUT_US',
                    order: 6,
                    visible: true,
                    label: 'Quiénes somos (Autoridad)',
                    description: 'Biografía, trayectoria y marcas que respaldan.',
                    content: {
                        title: 'Sobre Nuestra Fábrica',
                        description: 'Con más de 15 años confeccionando calzado y accesorios premium de forma artesanal para comerciantes y emprendedores de todo el país.',
                        signature: 'Fundadora & Diseñadora Líder',
                        align: 'left',
                    },
                },
                {
                    id: 'sec_testimonials_default',
                    type: 'TESTIMONIALS',
                    order: 7,
                    visible: true,
                    label: 'Testimonios (Prueba Social)',
                    description: 'Carrusel o grilla de comentarios de clientes reales.',
                    content: {
                        title: 'Emprendedores que confían en nosotros',
                        columns: 3,
                        items: [
                            { name: 'Diana Peña', role: 'Boutique Stella · Cúcuta', comment: 'El mejor proveedor mayorista. Despachos rápidos y excelente calidad de zapatos.', rating: 5, avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
                            { name: 'Carlos Gomez', role: 'Distribuidora CG · Bucaramanga', comment: 'Precios competitivos y atención muy amable. 100% recomendados.', rating: 5, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' }
                        ],
                        align: 'center',
                    },
                },
                {
                    id: 'sec_form_default',
                    type: 'CONVERSION_FORM',
                    order: 8,
                    visible: true,
                    label: 'Formulario de Registro (CRM)',
                    description: 'Caja dedicada para capturar leads y correos.',
                    content: {
                        title: '¿Quieres descargar el catálogo en PDF?',
                        subtitle: 'Ingresa tu número de WhatsApp y te enviaremos el catálogo completo con precios mayoristas de inmediato.',
                        ctaText: 'Descargar Catálogo PDF',
                        align: 'center',
                    },
                },
                {
                    id: 'sec_reversal_default',
                    type: 'RISK_REVERSAL',
                    order: 9,
                    visible: true,
                    label: 'Reducción de Riesgo (Garantía)',
                    description: 'Bloque con sello de confianza para romper objeciones.',
                    content: {
                        title: 'Garantía total de cambios',
                        description: '¿No se vendió algún modelo? No te preocupes, tienes 30 días para cambiarlo por referencias que tengan más rotación en tu local.',
                        days: 30,
                        align: 'center',
                    },
                },
                {
                    id: 'sec_faq_default',
                    type: 'FAQ_ACCORDION',
                    order: 10,
                    visible: true,
                    label: 'Preguntas Frecuentes',
                    description: 'Componente colapsable de preguntas y respuestas.',
                    content: {
                        title: 'Preguntas de Compras',
                        items: [
                            { question: '¿Cuál es el monto mínimo de compra?', answer: 'El pedido mínimo es de una docena de calzado, surtida como prefieras.' },
                            { question: '¿Hacen envíos contra entrega?', answer: 'Sí, manejamos despachos contra entrega a las principales ciudades del país.' }
                        ],
                        align: 'center',
                    },
                },
                {
                    id: 'sec_footer_default',
                    type: 'FOOTER_SECTION',
                    order: 11,
                    visible: true,
                    label: 'Pie de Página (Legal)',
                    description: 'Enlaces a políticas legales, copyright y redes.',
                    content: {
                        copyright: '© 2026 Tienda y Calzado La Frontera. Todos los derechos reservados.',
                        align: 'center',
                    },
                },
            ]
        }
    ];
    parseNiche(profile) {
        if (profile.niche && profile.niche !== 'Servicios Profesionales') {
            return profile.niche;
        }
        const text = ((profile.name || '') + ' ' + (profile.tagline || '') + ' ' + (profile.description || '')).toLowerCase();
        if (text.includes('calzado') ||
            text.includes('ropa') ||
            text.includes('moda') ||
            text.includes('tienda') ||
            text.includes('catalogo') ||
            text.includes('mayorista') ||
            text.includes('producto') ||
            text.includes('comercio')) {
            return 'Comercio';
        }
        if (text.includes('corporativo') ||
            text.includes('empresa') ||
            text.includes('soluciones') ||
            text.includes('consultoría') ||
            text.includes('asesoría')) {
            return 'Corporativo';
        }
        return 'Servicios Profesionales';
    }
    async getLandingConfig(userId) {
        const profile = await this.profileRepo.findById({ userId });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil de negocio no encontrado');
        }
        if (!profile.landingConfig || profile.landingConfig.length === 0) {
            const niche = this.parseNiche(profile);
            const matchedTemplate = this.STATIC_TEMPLATES.find(t => t.niche === niche) || this.STATIC_TEMPLATES[0];
            const dynamicConfig = matchedTemplate.landingConfig.map(s => {
                const sectionCopy = JSON.parse(JSON.stringify(s));
                if (sectionCopy.type === 'HERO_BANNER') {
                    sectionCopy.content.title = profile.name || sectionCopy.content.title;
                    sectionCopy.content.subtitle = profile.tagline || sectionCopy.content.subtitle;
                }
                else if (sectionCopy.type === 'ABOUT_US') {
                    sectionCopy.content.description = profile.description || sectionCopy.content.description;
                }
                else if (sectionCopy.type === 'CONTACT_INFO') {
                    sectionCopy.content.phone = profile.phone || sectionCopy.content.phone;
                    sectionCopy.content.email = profile.email || sectionCopy.content.email;
                    sectionCopy.content.address = profile.address || sectionCopy.content.address;
                }
                return sectionCopy;
            });
            profile.templateId = matchedTemplate.id;
            profile.globalStyles = matchedTemplate.globalStyles;
            profile.landingConfig = dynamicConfig;
            profile.niche = niche;
            await this.profileRepo.update({ id: profile.id }, {
                templateId: profile.templateId,
                globalStyles: profile.globalStyles,
                landingConfig: profile.landingConfig,
                niche: profile.niche,
            });
        }
        const sortedConfig = profile.landingConfig.sort((a, b) => a.order - b.order);
        return {
            templateId: profile.templateId || 'minimalist_dark',
            landingConfig: sortedConfig,
            globalStyles: profile.globalStyles || { paletteId: 'nido', fontPairId: 'classic_sans', buttonStyle: 'rounded' },
        };
    }
    async updateLandingConfig(userId, data) {
        const profile = await this.profileRepo.findById({ userId });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil de negocio no encontrado');
        }
        const sortedConfig = (data.landingConfig || []).sort((a, b) => a.order - b.order);
        await this.profileRepo.update({ id: profile.id }, {
            templateId: data.templateId || profile.templateId || 'minimalist_dark',
            landingConfig: sortedConfig,
            globalStyles: data.globalStyles,
        });
        return {
            templateId: data.templateId || profile.templateId || 'minimalist_dark',
            landingConfig: sortedConfig,
            globalStyles: data.globalStyles,
        };
    }
    async getTemplates() {
        return this.STATIC_TEMPLATES;
    }
};
exports.BusinessProfileService = BusinessProfileService;
exports.BusinessProfileService = BusinessProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [business_profile_repository_1.BusinessProfileRepository])
], BusinessProfileService);
//# sourceMappingURL=business-profile.service.js.map