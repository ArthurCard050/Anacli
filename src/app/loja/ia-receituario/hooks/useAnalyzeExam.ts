'use client';

import { useState } from 'react';
import axios from 'axios';

export interface DetectedExam {
  id: string;
  name: string;
  price: number;
}

interface AnalyzeResult {
  exams: string[];
  raw: string;
}

export function useAnalyzeExam() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeExam = async (file: File): Promise<string[]> => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const apiUrl = process.env.NEXT_PUBLIC_VARIAVEL_API_URL;
      const response = await axios.post<AnalyzeResult>(
        `${apiUrl}/ai/analyze-exam`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      return response.data.exams ?? [];
    } catch (err) {
      console.error('Erro ao analisar receita:', err);
      setError('Não foi possível analisar a receita. Tente novamente.');
      return [];
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analyzeExam, isAnalyzing, error };
}
