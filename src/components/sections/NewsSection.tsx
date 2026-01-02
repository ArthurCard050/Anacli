'use client';

import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";
import OptimizedImage from "@/components/ui/OptimizedImage";

const news = [
  {
    title: "Anacli amplia portfólio de exames genéticos",
    date: "15 de Janeiro, 2025",
    summary: "Novos testes moleculares disponíveis para diagnóstico de doenças hereditárias com tecnologia de ponta.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
    category: "Inovação",
    readTime: "3 min"
  },
  {
    title: "Novo horário de atendimento aos sábados",
    date: "10 de Janeiro, 2025",
    summary: "Estendemos nosso horário para oferecer mais conveniência aos pacientes que precisam de flexibilidade.",
    image: "https://images.unsplash.com/photo-1600373240065-4572ee4a9a8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    category: "Atendimento",
    readTime: "2 min"
  },
  {
    title: "Certificação PALC renovada",
    date: "05 de Janeiro, 2025",
    summary: "Anacli renova certificação de excelência em análises clínicas, reafirmando nosso compromisso com a qualidade.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop&crop=center",
    category: "Qualidade",
    readTime: "4 min"
  },
];

const NewsSection = () => {
  return (
    <section className="relative py-16 md:py-20 bg-gray-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #A6C022 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #FF0068 2px, transparent 2px)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Notícias e &nbsp;
            <span className="text-accent">
              Atualizações
            </span>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-accent mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Fique por dentro das últimas novidades, inovações e melhorias em nossos serviços
          </motion.p>
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {news.map((item, index) => (
            <motion.div
              key={index}
              className="group h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full flex flex-col overflow-hidden border border-gray-200 hover:border-accent transition-all duration-300 bg-white">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      width={640}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800 border border-white/20">
                        {item.category}
                      </span>
                    </div>

                    {/* Read Time */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-black/20 backdrop-blur-sm text-white">
                        <Clock className="h-3 w-3" />
                        {item.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 text-primary" />
                      {item.date}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 leading-tight mb-4">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-600 leading-relaxed flex-grow mb-6">
                      {item.summary}
                    </p>

                    {/* Read More Button */}
                    <div className="mt-auto">
                      <HierarchicalButton
                        hierarchy="ghost"
                        size="sm"
                        icon={<ArrowRight className="h-4 w-4" />}
                        iconPosition="right"
                      >
                        Ler mais
                      </HierarchicalButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="flex justify-center mt-12 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <HierarchicalButton
            hierarchy="tertiary"
            size="lg"
            icon={<ArrowRight className="h-5 w-5" />}
            iconPosition="right"
          >
            Ver todas as notícias
          </HierarchicalButton>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
