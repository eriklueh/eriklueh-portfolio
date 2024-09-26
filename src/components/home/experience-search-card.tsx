import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimelineItem } from "./time-line-item";
import { timelineData } from "./data";

interface ExperienceSearchCardProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const ExperienceSearchCard: React.FC<ExperienceSearchCardProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const [activeTab, setActiveTab] = useState<"work" | "projects">("work");
  const contentRef = useRef<HTMLDivElement>(null);

  const filteredData = timelineData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const workData = filteredData.filter((item) => item.type === "work");
  const projectData = filteredData.filter((item) => item.type === "project");

  const scrollToItem = (index: number) => {
    if (contentRef.current) {
      const items = contentRef.current.children;
      if (items[index]) {
        items[index].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <Card className="flex w-full flex-col">
      <CardContent className="flex-shrink-0 p-4">
        <div className="relative w-full">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por habilidad, título o descripción..."
            className="pl-8 text-sm"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </CardContent>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "work" | "projects")}
        className="mx-4 flex flex-grow flex-col overflow-y-auto"
      >
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger value="work" className="text-sm">
            Experiencia Laboral
          </TabsTrigger>
          <TabsTrigger value="projects" className="text-sm">
            Proyectos
          </TabsTrigger>
        </TabsList>
        <div className="flex-grow overflow-y-auto">
          <TabsContent value="work" className="mt-0">
            <div ref={contentRef} className="h-full">
              <AnimatePresence>
                {workData.map((item, index) => (
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
              {workData.length === 0 && (
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  No se encontraron resultados para experiencia laboral.
                </p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="projects" className="mt-0">
            <div ref={contentRef} className="h-full pr-2">
              <AnimatePresence>
                {projectData.map((item, index) => (
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
              {projectData.length === 0 && (
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  No se encontraron resultados para proyectos.
                </p>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};
