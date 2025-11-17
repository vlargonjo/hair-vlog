"use client";

import { create } from "zustand";
import { HairAnalysis, Product } from "@/types";

interface HairState {
  selectedHairType: string;
  selectedColor: string;
  selectedStyle: string;
  uploadedPhoto?: File;
  analysis?: HairAnalysis;
  favorites: Product[];
  setHairType: (type: string) => void;
  setColor: (color: string) => void;
  setStyle: (style: string) => void;
  setPhoto: (file?: File) => void;
  setAnalysis: (analysis?: HairAnalysis) => void;
  toggleFavorite: (product: Product) => void;
}

export const useHairStore = create<HairState>((set, get) => ({
  selectedHairType: "Wavy-2B",
  selectedColor: "#8C5B3F",
  selectedStyle: "long-layered",
  favorites: [],
  analysis: undefined,
  setHairType: (type) => set({ selectedHairType: type }),
  setColor: (color) => set({ selectedColor: color }),
  setStyle: (style) => set({ selectedStyle: style }),
  setPhoto: (file) => set({ uploadedPhoto: file }),
  setAnalysis: (analysis) => set({ analysis }),
  toggleFavorite: (product) => {
    const current = get().favorites;
    const exists = current.find((p) => p.id === product.id);
    set({
      favorites: exists ? current.filter((p) => p.id !== product.id) : [...current, product]
    });
  }
}));

