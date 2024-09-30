"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import { Copy, Check } from 'lucide-react'

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
    language?: string;
}

const Pre = React.forwardRef<HTMLPreElement, PreProps>(({ className, children, language = 'javascript', ...props }, ref) => {
    const textContent = React.Children.toArray(children).find(
        child => typeof child === 'string'
    )!

    const [isCopied, setIsCopied] = React.useState(false)

    const getLanguage = (lang: string): Prism.Grammar => {
        return (Prism.languages[lang]!) || Prism.languages.plain
    }

    const grammar = getLanguage(language)

    const highlightedCode = Prism.highlight(
        textContent,
        grammar,
        language
    )

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(textContent)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <div className="relative">
            <pre
                ref={ref}
                className={cn(
                    "mb-4 mt-2 rounded-lg border bg-muted p-2 sm:p-4 text-xs sm:text-sm whitespace-pre-wrap break-words",
                    className
                )}
                {...props}
            >
                <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
            <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 rounded-md bg-muted-foreground/20 hover:bg-muted-foreground/30 transition-colors"
                aria-label={isCopied ? "Copied!" : "Copy code"}
            >
                {isCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                )}
            </button>
        </div>
    )
})

Pre.displayName = "Pre"

export { Pre }