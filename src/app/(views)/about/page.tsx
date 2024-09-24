import { AboutMeTimeline } from '@/components/about/about-me-timeline'

export const metadata = {
    title: 'About Me | Erik Estrada Herrera',
    description: 'Learn about Erik Estrada Herrera\'s life journey and experiences as a Full-Stack Developer and Creative Technologist.',
}

export default function AboutPage() {
    return (
        <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <AboutMeTimeline />
        </main>
    )
}