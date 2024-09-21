import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-6">Bienvenido a Mi Portfolio</h1>
            <p className="text-xl mb-8 text-center max-w-2xl">
                Soy un desarrollador apasionado por crear soluciones innovadoras.
                Explora mi trabajo y conoce más sobre mí.
            </p>
            <Link
                href="/projects"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
                Ver mis proyectos
                <ArrowRight className="ml-2" size={20} />
            </Link>
        </div>
    )
}