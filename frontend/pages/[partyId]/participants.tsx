import React from "react"
import AppLayout from "@/components/appLayout"
import SubmitButton from "@/components/ui/minis/submitButton";
import { useQuery } from "@apollo/client";
import { GetParticipantsDocument, GetParticipantsQuery, GetParticipantsQueryVariables, Participant } from "@/lib/gql/graphql";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l6J3KeWghpZ
 */

const PartyDetails: React.FC<{}> = () => {
  const [hydrated, setHydrated] = React.useState(false);
  const router = useRouter();
  const partyId = router.query.partyId as string

  const { error, data: getParticipantData } = useQuery<GetParticipantsQuery, GetParticipantsQueryVariables>(GetParticipantsDocument, {
    variables: { partyId },
    onError: (result) => {
      console.error(result)
      toast.error("Couldnt retrieve participants.")
    }
  });

  //https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (<AppLayout title="Participants" left={`/${partyId}`} right={""}>
    {getParticipantData?.getParticipants?.items ?
      getParticipantData?.getParticipants?.items?.map((guy) => userElement(guy as Participant)) : undefined
    }
    <SubmitButton props={{ disabled: isUserSet(), onClick: () => window.location.assign(`/${partyId}/participants/create`) }} text="+" />
  </AppLayout>
  )
}

function isUserSet() {
  const userName = window.localStorage.getItem("userName")
  const userEmail = window.localStorage.getItem("userEmail")

  return (!userName || !userEmail)
}

function userElement(guy: Participant) {
  return <div className="border-b border-gray-500 p-2">
    <div className="text-sm">{guy.name || "?"} ({guy.email})</div>
  </div>
}

export default PartyDetails
