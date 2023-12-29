import { createPartyScreen } from "@/components/create-party-screen"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {createPartyScreen()}
    </main >
  )
}
