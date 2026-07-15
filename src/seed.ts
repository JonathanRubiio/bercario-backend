import { DataSource } from 'typeorm';
import { UserEntity } from './repositories/user/entities/user.entity';
import { BusinessProfileEntity } from './repositories/business-profile/entities/business-profile.entity';
import { LeadEntity } from './repositories/lead/entities/lead.entity';
import { MembershipPackageEntity } from './repositories/membership-package/entities/membership-package.entity';
import { SuccessStoryEntity } from './repositories/marketing/entities/success-story.entity';
import { BlogPostEntity } from './repositories/marketing/entities/blog-post.entity';
import * as bcrypt from 'bcryptjs';

const AppDataSource = new DataSource({
  type: 'mysql',
  url: process.env.DATABASE_URL || 'mysql://bercario_user:bercario_pass@localhost:3306/bercario',
  entities: [UserEntity, BusinessProfileEntity, LeadEntity, MembershipPackageEntity, SuccessStoryEntity, BlogPostEntity],
  synchronize: true,
});

async function main() {
  console.log('Iniciando semilla de base de datos con TypeORM...');
  await AppDataSource.initialize();

  // Limpiar tablas
  await AppDataSource.query('DELETE FROM success_stories');
  await AppDataSource.query('DELETE FROM blog_posts');
  await AppDataSource.query('DELETE FROM lead');
  await AppDataSource.query('DELETE FROM business_profile');
  await AppDataSource.query('DELETE FROM user');
  await AppDataSource.query('DELETE FROM membership_package');

  // Crear paquete de membresía Free
  const freePackage = await AppDataSource.getRepository(MembershipPackageEntity).save({
    id: 'de305d54-75b4-431b-adb2-eb6b9e546014',
    name: 'Free',
    maxCatalogImages: 5,
  });

  // Crear usuario mayorista
  const mayoristaPass = await bcrypt.hash('demo1234', 10);
  const mayorista = await AppDataSource.getRepository(UserEntity).save({
    email: 'mayorista@demo.co',
    password: mayoristaPass,
    name: 'Calzado La Frontera User',
    role: 'mayorista',
    membershipPackageId: freePackage.id,
  });

  // Crear perfil comercial demo
  await AppDataSource.getRepository(BusinessProfileEntity).save({
    userId: mayorista.id,
    name: 'Calzado La Frontera',
    tagline: 'Zapatos de calidad directamente de Cúcuta',
    description: 'Somos fabricantes líderes en calzado para dama y caballero. Diseños exclusivos y envíos nacionales desde Norte de Santander.',
    phone: '+57 312 456 7890',
    email: 'contacto@lafrontera.co',
    address: 'Calle 10 #5-20, Barrio El Centro, Cúcuta',
    banner: '/images/company-banner.png',
    logo: '/images/company-logo.png',
    slug: 'calzado-la-frontera',
    products: [
      {
        id: 'p1',
        title: 'Mocasines Cuero Clásico',
        price: '89.900',
        image: '/images/product-sneakers.png',
        description: 'Mocasines elegantes 100% cuero genuino, suela antideslizante.',
      },
      {
        id: 'p2',
        title: 'Tenis Deportivos Urban',
        price: '110.000',
        image: '/images/product-boots.png',
        description: 'Tenis cómodos para el uso diario, materiales transpirables.',
      },
      {
        id: 'p3',
        title: 'Botas de Cuero Frontier',
        price: '145.000',
        image: '/images/product-handbag.png',
        description: 'Botas resistentes de alta durabilidad, ideales para todo terreno.',
      },
    ],
    testimonials: [
      {
        id: 't1',
        text: 'Excelente calidad y puntualidad en los envíos al por mayor. Muy recomendados.',
        author: 'Distribuidora Medellín',
      },
    ],
    faqs: [
      {
        id: 'f1',
        q: '¿Cuál es el pedido mínimo para mayoristas?',
        a: 'El pedido mínimo es de una docena de calzado (pueden ser surtidos en tallas y modelos).',
      },
    ],
    gallery: [
      '/images/gallery/g1.png',
      '/images/gallery/g2.png',
    ],
    sections: [
      {
        id: 'banner',
        type: 'banner',
        label: 'Banner principal',
        description: 'Imagen destacada, logo y nombre del negocio.',
      },
      {
        id: 'about',
        type: 'about',
        label: 'Quiénes somos',
        description: 'Descripción y propuesta de valor del negocio.',
      },
      {
        id: 'catalog',
        type: 'catalog',
        label: 'Catálogo de productos',
        description: 'Muestra de productos con precios y descripciones.',
      },
      {
        id: 'testimonials',
        type: 'testimonials',
        label: 'Testimonios',
        description: 'Opiniones y reseñas de tus clientes.',
      },
      {
        id: 'faq',
        type: 'faq',
        label: 'Preguntas frecuentes',
        description: 'Preguntas habituales sobre envíos, pagos y pedidos.',
      },
      {
        id: 'contact',
        type: 'contact',
        label: 'Contacto',
        description: 'Formulario de contacto y datos de dirección.',
      },
    ],
  });

  // Crear usuario administrador
  const adminPass = await bcrypt.hash('admin1234', 10);
  await AppDataSource.getRepository(UserEntity).save({
    email: 'admin@bercario.co',
    password: adminPass,
    name: 'Administrador Berçário',
    role: 'admin',
    membershipPackageId: freePackage.id,
  });

  // Sembrar Casos de Éxito
  console.log('Sembrando casos de éxito...');
  await AppDataSource.getRepository(SuccessStoryEntity).save([
    {
      merchant: 'Calzado La Frontera',
      location: 'Cúcuta',
      owner: 'Héctor Delgado',
      niche: 'Zapatos y Marroquinería',
      metric: '12.000+',
      metricLabel: 'Visitas mensuales al catálogo',
      growth: '+38%',
      growthLabel: 'en pedidos recibidos',
      quote: 'Publicar nuestro catálogo de calzado mayorista en Berçário nos permitió conectar con 500+ tenderos de Pamplona, Ocaña y Bucaramanga sin pagar costosos desarrolladores.',
      avatar: 'CF',
    },
    {
      merchant: 'Modas El Progreso',
      location: 'Atalaya, Cúcuta',
      owner: 'Rosaura Beltrán',
      niche: 'Confección y Ropa Femenina',
      metric: '4.800+',
      metricLabel: 'Interacciones de WhatsApp',
      growth: '2.5x',
      growthLabel: 'ahorro de tiempo de atención',
      quote: 'Mis clientas de Arauca y Arauquita solían demorarse horas preguntándome precios por WhatsApp. Ahora ven mi link de Berçário y me envían el pedido listo.',
      avatar: 'MP',
    },
    {
      merchant: 'Marroquinería Santander',
      location: 'Villa del Rosario',
      owner: 'Camilo Jaimes',
      niche: 'Bolsos y Accesorios de Cuero',
      metric: '850+',
      metricLabel: 'Mayoristas registrados',
      growth: '+22%',
      growthLabel: 'de incremento en ticket promedio',
      quote: 'La landing es súper rápida y se ve impecable en móviles. En esta región con señal inestable, la velocidad de carga es crucial para cerrar ventas.',
      avatar: 'MS',
    },
  ]);

  // Sembrar Blog Posts
  console.log('Sembrando artículos de blog...');
  await AppDataSource.getRepository(BlogPostEntity).save([
    {
      title: 'Cómo digitalizar tu catálogo mayorista sin perder el trato humano',
      excerpt: 'Aprende a estructurar tus categorías de productos y precios al por mayor para facilitar la compra digital manteniendo el contacto directo por WhatsApp.',
      date: 'Julio 10, 2026',
      author: 'Jonathan Rubio',
      readTime: '5 min de lectura',
      category: 'Estrategia',
    },
    {
      title: '5 claves de SEO Local para que tenderos de todo el país te encuentren en Google',
      excerpt: 'Guía práctica para posicionar tu bodega o fábrica mayorista en Cúcuta en las búsquedas locales. Trucos de palabras clave y optimización técnica.',
      date: 'Julio 02, 2026',
      author: 'Valeria Solano',
      readTime: '7 min de lectura',
      category: 'SEO',
    },
    {
      title: 'El poder de las Landings Modulares: Por qué no necesitas una web compleja',
      excerpt: 'Descubre por qué las páginas de aterrizaje sencillas y rápidas convierten un 40% más que las tiendas virtuales tradicionales llenas de opciones confusas.',
      date: 'Junio 26, 2026',
      author: 'Mateo Cárdenas',
      readTime: '4 min de lectura',
      category: 'Diseño UX',
    },
  ]);

  console.log('Semilla de base de datos completada exitosamente con TypeORM.');
  await AppDataSource.destroy();
}

main().catch((err) => {
  console.error('Error durante la siembra de base de datos:', err);
  process.exit(1);
});
