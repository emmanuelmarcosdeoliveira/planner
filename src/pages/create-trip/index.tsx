import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestModal } from './invite-guest-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from '../steps/destination-and-date-step'
import { InviteGuestsStep } from '../steps/invite-guests-step'

export function CreateTripPage() {
  const navigate = useNavigate()
  const [isGetInputOpen, setIsGetInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    'olive@gmail.com',
    'august@gmail.com'
  ])

  function openGestInput() {
    setIsGetInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGetInputOpen(false)
  }

  function openGuestModal() {
    setIsGuestModalOpen(true)
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false)
  }

  function openConfirmModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmModal() {
    setIsConfirmTripModalOpen(false)
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/trips/123')
  }

  function addNewEmailtoInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()
    if (!email) {
      return
    }
    if (emailsToInvite.includes(email)) {
      return
    }
    setEmailsToInvite([...emailsToInvite, email])
    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newemailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    )
    setEmailsToInvite(newemailList)
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-pattern bg-center">
        <div className="max-w-3xl w-full px-6 text-center space-y-10">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.svg" alt="plann.er" />
            <p className="text-zinc-300">
              Convide seus amigos e planeje sua proxima viagem!
            </p>
          </div>

          <div className="space-y-4">
            <DestinationAndDateStep
              closeGuestsInput={closeGuestsInput}
              isGetInputOpen={isGetInputOpen}
              openGestInput={openGestInput}
            />

            {isGetInputOpen && (
              <InviteGuestsStep
                emailsToInvite={emailsToInvite}
                openConfirmModal={openConfirmModal}
                openGuestModal={openGuestModal}
              />
            )}
          </div>

          <p className="text-sm text-zinc-500">
            Ao planejear a viagem pela plann.er você automaticamente concorda{' '}
            <br />
            com nosssos{' '}
            <a className="text-zinc-300 underline" href="#">
              termos de uso
            </a>{' '}
            e
            <a className="text-zinc-300 underline" href="#">
              {' '}
              poliíticas de privacidade
            </a>
          </p>
        </div>
        {isGuestModalOpen && (
          <InviteGuestModal
            emailsToInvite={emailsToInvite}
            addNewEmailtoInvite={addNewEmailtoInvite}
            closeGuestModal={closeGuestModal}
            removeEmailFromInvites={removeEmailFromInvites}
          />
        )}

        {isConfirmTripModalOpen && (
          <ConfirmTripModal
            createTrip={createTrip}
            closeConfirmModal={closeConfirmModal}
          />
        )}
      </div>
    </>
  )
}
