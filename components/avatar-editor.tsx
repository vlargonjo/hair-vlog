"use client";

import { useHairStore } from "@/hooks/useHairStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useMemo } from "react";

const styles = [
  { id: "long-layered", name: "Длинные слои" },
  { id: "bob", name: "Боб" },
  { id: "curly", name: "Кудри" }
];

const colors = ["#2F1B12", "#8C5B3F", "#C88965", "#F7E0C8", "#D73D6C"];

export function AvatarEditor() {
  const { selectedHairType, selectedColor, selectedStyle, setHairType, setColor, setStyle } = useHairStore();

  const previewStyle = useMemo(
    () => ({
      background: `linear-gradient(135deg, ${selectedColor}, #111111)`,
      height: 200
    }),
    [selectedColor]
  );

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Тип волос</p>
          <p className="text-lg font-semibold">{selectedHairType}</p>
        </div>
        <Badge variant="brand">{selectedStyle}</Badge>
      </div>
      <div className="rounded-2xl bg-slate-100/70" style={previewStyle} />
      <Tabs defaultValue="style" className="mt-4">
        <TabsList>
          <TabsTrigger value="style">Прическа</TabsTrigger>
          <TabsTrigger value="color">Цвет</TabsTrigger>
          <TabsTrigger value="type">Тип волос</TabsTrigger>
        </TabsList>
        <TabsContent value="style">
          <div className="flex flex-wrap gap-3">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => setStyle(style.id)}
                className={`rounded-2xl border px-4 py-2 text-sm ${
                  style.id === selectedStyle ? "border-brand bg-brand/10 text-brand-dark" : "border-slate-200"
                }`}
              >
                {style.name}
              </button>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="color">
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setColor(color)}
                className="h-10 w-10 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: color, outline: color === selectedColor ? "3px solid #ff6f91" : "none" }}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="type">
          <Input value={selectedHairType} onChange={(e) => setHairType(e.target.value)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

