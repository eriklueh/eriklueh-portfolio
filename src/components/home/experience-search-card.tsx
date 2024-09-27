"use client"

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimelineItem } from "./time-line-item";
import { timelineData } from "./data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExperienceSearchCardProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const ExperienceSearchCard: React.FC<ExperienceSearchCardProps> = ({
                                                                            searchTerm,
                                                                            onSearchChange,
                                                                          }) => {
  const [activeTab, setActiveTab] = useState<"all" | "work" | "projects">("all");
  const contentRef = useRef<HTMLDivElement>(null);

  const filteredData = timelineData.filter(
      (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.skills.some((skill) =>
              skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
  );

  const workData = filteredData.filter((item) => item.type === "work");
  const projectData = filteredData.filter((item) => item.type === "project");
  const allData = filteredData;

  const scrollToItem = (index: number) => {
    if (contentRef.current) {
      const items = contentRef.current.children;
      if (items[index]) {
        items[index].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const clearSearch = () => {
    onSearchChange("");
  };

  const tabOptions = [
    { value: "all", label: "Todos" },
    { value: "work", label: "Experiencia Laboral" },
    { value: "projects", label: "Proyectos" },
  ];

  return (
      <Card className="flex w-full flex-col">
        <CardContent className="flex-shrink-0 p-4">
          <div className="relative w-full mb-4">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
                type="text"
                placeholder="Buscar por habilidad, título o descripción..."
                className="pl-8 pr-8 text-sm"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                    onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
            )}
          </div>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {tabOptions.find((tab) => tab.value === activeTab)?.label}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {tabOptions.map((tab) => (
                    <DropdownMenuItem
                        key={tab.value}
                        onSelect={() => setActiveTab(tab.value as typeof activeTab)}
                    >
                      {tab.label}
                    </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
        <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as typeof activeTab)}
            className="mx-4 flex flex-grow flex-col overflow-y-auto"
        >
          <TabsList className="mb-4 hidden md:grid w-full grid-cols-3">
            {tabOptions.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="text-sm">
                  {tab.label}
                </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex-grow overflow-y-auto">
            {tabOptions.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-0">
                  <div ref={contentRef} className="h-full">
                    <AnimatePresence>
                      {(tab.value === "all" ? allData : tab.value === "work" ? workData : projectData).map((item, index) => (
                          <motion.div
                              key={item.title}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                          >
                            <TimelineItem
                                item={item}
                                onClick={() => scrollToItem(index)}
                            />
                          </motion.div>
                      ))}
                    </AnimatePresence>
                    {(tab.value === "all" ? allData : tab.value === "work" ? workData : projectData).length === 0 && (
                        <p className="my-20 text-center text-sm text-muted-foreground">
                          No se encontraron resultados para {tab.label.toLowerCase()}.
                        </p>
                    )}
                  </div>
                </TabsContent>
            ))}
          </div>
        </Tabs>
      </Card>
  );
};