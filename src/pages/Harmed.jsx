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
        image={
          <div className="flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center">
            <img
              src="/images/3d-legal-shield.svg"
              alt="3D Citizen Legal Protection Shield"
              referrerPolicy="no-referrer"
              className="h-full w-full object-contain drop-shadow-xl"
            />
          </div>
        }
      />

      <section className="container-content max-w-2xl py-12 sm:py-16">
        <SituationForm />
      </section>
    </>
  )
}
