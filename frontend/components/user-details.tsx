"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import AppLayout from '@/app/appLayout';

interface UserInfo {
  name: string
  email: string
}
const UserDetails: React.FC<any> = ({ epics, events, mode }) => {
  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState({
    name: localStorage.getItem("userName") || "",
    email: localStorage.getItem("userEmail") || "",
  });

  return (<>
    <div className="text-right">
      <Button className="inline-block bg-gray-900 border-gray-800" variant="outline" onClick={() => window.location.assign("/editUser")}>
        {userData?.name || "Anonymous"}
      </Button>
    </div >

  </>)
}

export default UserDetails
