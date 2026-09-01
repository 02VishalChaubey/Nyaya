import Hero from '../components/Hero.jsx'
import SituationForm from '../components/SituationForm.jsx'

export default function Harmed() {
  return (
    <>
      <Hero
        eyebrow="Describe your situation"
        title="Something happened to you?"
        subtitle="Tell us what happened. You don't need to know the legal terminology — plain, everyday language is fine."
        size="md"
      />

      <section className="container-content max-w-2xl py-12 sm:py-16">
        <SituationForm />
      </section>
    </>
  )
}
