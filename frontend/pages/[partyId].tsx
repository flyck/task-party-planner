import React from "react"
import AppLayout from "@/components/appLayout"
import SubmitButton from "@/components/ui/minis/submitButton";
import Input from "@/components/ui/minis/input";
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from "@apollo/client";
import { DeletePartyDocument, DeletePartyMutation, DeletePartyMutationVariables, GetPartyDocument, GetPartyQuery, GetPartyQueryVariables, UpdatePartyDocument, UpdatePartyMutation, UpdatePartyMutationVariables } from "@/lib/gql/graphql";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l6J3KeWghpZ
 */

const PartyDetails: React.FC<{}> = () => {
  const [hydrated, setHydrated] = React.useState(false);
  const router = useRouter();
  const id = router.query.partyId as string
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm();

  const [deleteParty] = useMutation<DeletePartyMutation, DeletePartyMutationVariables>(DeletePartyDocument);

  const { loading: loadingParty, error, data: getPartyData } = useQuery<GetPartyQuery, GetPartyQueryVariables>(GetPartyDocument, {
    variables: { id },
    onCompleted: (result) => {
      if (!result.getParty) {
        console.error(result)
        // TODO redirect to 404 page in certain conditions
        toast.error("Couldnt find party.")
      }
      const { date, description, location, title } = result.getParty!
      setValue("title", title)
      setValue("location", location)
      setValue("description", description)
      setValue("date", date)
    },
    onError: (result) => {
      console.error(result)
      // TODO redirect to 404 page in certain conditions
      toast.error("Couldnt retrieve party.")
    }
  });

  const [updateParty, { loading: updatePartyLoading }] = useMutation<UpdatePartyMutation, UpdatePartyMutationVariables>(UpdatePartyDocument, {
    variables: { id },
  });

  //https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(getValues());
    try {
      const { data, errors } = await updateParty({
        variables: { id, ...getValues() }
      })
      if (errors != undefined) { throw "Found an error: " + JSON.stringify(errors) }
    } catch (error) {
      toast.error("Couldnt update party.")
      console.error("Caught: " + error)
    }
  };

  const handleDelete = async () => {
    try {
      const { errors } = await deleteParty({
        variables: { id }
      })
      if (errors != undefined) { throw "Found an error: " + JSON.stringify(errors) }
    } catch (error) {
      toast.error("Couldnt delete party.")
      console.error("Caught: " + error)
    }
    window.location.assign("/")
  }

  return (<AppLayout title="Details" left={""} right={`${id}/participants`}>
    <form onSubmit={(event) => submit(event)}>
      <Input title="Title" props={{
        type: "text", onFocus: () => redirect(),
        required: true,
        ...register("title")
      }} />
      <Input title="Where" props={{
        type: "text", onFocus: () => redirect(),
        ...register("location")
      }} />
      <Input title="When" props={{
        type: "text", onFocus: () => redirect(),
        ...register("date")
      }} />
      <Input title="Description" props={{
        type: "text", onFocus: () => redirect(),
        ...register("description")
      }} />
      <div className="p-2">
        <button className="bg-red-800 text-gray-200 rounded-sm w-full" onClick={() => handleDelete()}>
          Delete
        </button>
      </div>
      <SubmitButton loading={updatePartyLoading} props={{ disabled: isUserSet() }} />
    </form>
  </AppLayout>
  )
}

function redirect() {
  isUserSet() ? window.location.assign("/editUser?showInfo=true") : undefined
}

function isUserSet() {
  const userName = window.localStorage.getItem("userName")
  const userEmail = window.localStorage.getItem("userEmail")

  return (!userName || !userEmail)
}


export default PartyDetails
