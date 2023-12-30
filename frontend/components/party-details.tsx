import React from "react"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l6J3KeWghpZ
 */
import { Button } from "@/components/ui/button"
import AppLayout from "@/components/appLayout"
import SubmitButton from "./ui/minis/submitButton";

const PartyDetails: React.FC<{}> = () => {
  //https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (<AppLayout title="Details" left={""} right={""}>
    <div className="border-b border-gray-500 p-2">
      <div className="text-sm">Title:</div>
      <input className="w-full text-sm bg-gray-800 px-2 rounded-sm" type="text" defaultValue="Birthday Party" onFocus={() => checkUser()} />
    </div>
    <div className="border-b border-gray-500 p-2">
      <div className="text-sm">Where:</div>
      <input className="w-full text-sm bg-gray-800 px-2 rounded-sm" type="text" defaultValue="Musterstreet 12, New York" onFocus={() => checkUser()} />
    </div>
    <div className="border-b border-gray-500 p-2">
      <div className="text-sm">When:</div>
      <input className="w-full text-sm bg-gray-800 px-2 rounded-sm" type="text" defaultValue="June 10, 2023, 2:00 PM" onFocus={() => checkUser()} />
    </div>
    <div className="border-b border-gray-500 p-2">
      <div className="text-sm">Description:</div>
      <input className="w-full text-sm bg-gray-800 px-2 rounded-sm " type="text" defaultValue="" onFocus={() => checkUser()} />
    </div>
    <SubmitButton disabled={true} />
  </AppLayout>
  )
}

function checkUser() {
  const userName = window.localStorage.getItem("userName")
  const userEmail = window.localStorage.getItem("userEmail")

  if (!userName && !userEmail) {
    window.location.assign("/editUser?showInfo=true");
  }
}


export default PartyDetails
