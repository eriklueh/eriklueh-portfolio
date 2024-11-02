"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      padding: "10px",
    },
  },
  options: {
    reverse: true,
    depth: 0.8,
    wheelZoom: false,
    imageScale: 1.5,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 400,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.03,
    minSpeed: 0.01,
  },
};

const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 32,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

export type TechIconCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export function TechIconCloudComponent({ iconSlugs }: TechIconCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) =>
        renderCustomIcon(icon, theme ?? "light")
    );
  }, [data, theme]);

  return (
      <div className="relative flex size-full items-center justify-center overflow-hidden">
        <Cloud {...cloudProps}>{renderedIcons}</Cloud>
      </div>
  );
}

// Uso del componente
export function TechIconCloudDemo() {
  const techIcons = [
    "amazonaws",
    "amazonec2",
    "awslambda",
    "amazons3",
    "amazonrds",
    "aceternityui",
    "antdesign",
    "chakraui",
    "drizzle",
    "framer",
    "gitlab",
    "go",
    "javascript",
    "langchain",
    "materialui",
    "nextdotjs",
    "openai",
    "python",
    "radixui",
    "react",
    "seo",
    "supabase",
    "tailwindcss",
    "threedotjs",
    "typescript",
    "vercel",
  ];

  return <TechIconCloudComponent iconSlugs={techIcons} />;
}