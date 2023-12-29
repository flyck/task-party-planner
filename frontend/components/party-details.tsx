"use client"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l6J3KeWghpZ
 */
import { Button } from "@/components/ui/button"
import UserDetails from "./user-details"
import AppLayout from "@/app/appLayout"

const PartyDetails: React.FC<any> = () => {
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
    <div className="p-2 my-1">
      <Button className="w-full bg-blue-900 h-8" disabled={true}>
        Create
      </Button>
    </div>
  </AppLayout>
  )
}

function checkUser() {
  const userName = localStorage.getItem("userName") || ""
  const userEmail = localStorage.getItem("userName") || ""

  if (!userName) {
    window.location.assign("/editUser?showInfo=true");
  }
}


export default PartyDetails
