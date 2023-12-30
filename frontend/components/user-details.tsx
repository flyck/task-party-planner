import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button"

const UserDetails: React.FC<any> = () => {
  //https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  const [hydrated, setHydrated] = React.useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (<>
    <div className="text-right">
      <Button className="inline-block bg-gray-900 border-gray-800" onClick={() => window.location.assign("/editUser")}>
        {!hydrated ? null : getUserName()}
      </Button>
    </div >
  </>)
}

function getUserName() {
  const name = localStorage.getItem("userName")
  return name || "Anonymous"
}

export default UserDetails
