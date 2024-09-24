'use client'

import { useEffect, useRef } from 'react'
import { createSwapy } from 'swapy'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const words = ['REACT', 'NEXTJS', 'SWAPY', 'VERCEL', 'TAILWIND']

export default function WordSortingBoard() {
    const boardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (boardRef.current) {
            createSwapy(boardRef.current, { animation: 'spring' })
        }
    }, [])

    const shuffleLetters = (word: string) => {
        return word.split('').sort(() => Math.random() - 0.5).join('')
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle className="text-center">Tablero de Ordenación de Palabras</CardTitle>
                </CardHeader>
                <CardContent>
                    <div ref={boardRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {words.map((word, wordIndex) => (
                            <div key={word} className="bg-secondary p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2 text-center">{word}</h3>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {shuffleLetters(word).split('').map((letter, letterIndex) => (
                                        <div
                                            key={`${word}-${letterIndex}`}
                                            data-swapy-slot={`${word}-${letterIndex}`}
                                            className="w-10 h-10"
                                        >
                                            <div
                                                data-swapy-item={`${letter}-${wordIndex}-${letterIndex}`}
                                                className="w-full h-full flex items-center justify-center text-xl text-primary border-2 border-dashed border-primary rounded cursor-move"
                                            >
                                                {letter}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}