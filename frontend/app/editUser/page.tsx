"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from "react"
import AppLayout from "../appLayout"

const EditUser: React.FC<{}> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    userName: localStorage.getItem("userName") || "",
    userEmail: localStorage.getItem("userEmail") || "",
  });

  // const displayDisclaimer = router.query.showInfo === 'true';
  const showInfo = searchParams?.get('showInfo')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
    localStorage.setItem("userEmail", formData.userEmail)
    localStorage.setItem("userName", formData.userName)
    // BUGBUG wont work if somebody deeplinked this
    router.back()
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AppLayout title="User" left={""} right={""}>
        {showInfo ? <div className="border-b border-gray-500 p-2"><div className="p-2 italic border bg-gray-800 rounded-lg">ℹ A Username and Email is needed for party creation</div></div> : undefined}
        <form onSubmit={(event) => submit(event)}>
          <div className="border-b border-gray-500 p-2">
            <div className="text-sm">Name:</div>
            <input
              name="userName"
              className="w-full text-sm bg-gray-800 px-2 rounded-sm"
              type="text"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          <div className="border-b border-gray-500 p-2">
            <div className="text-sm">Email:</div>
            <input
              name="userEmail"
              className="w-full text-sm bg-gray-800 px-2 rounded-sm"
              type="text"
              value={formData.userEmail}
              onChange={handleChange}
            />
          </div>
          <div className="p-2 my-1">
            <button className="w-full bg-blue-900 h-8" type="submit">
              Ok
            </button>
          </div>
        </form>
      </AppLayout>
    </main >
  )
}


export default EditUser
