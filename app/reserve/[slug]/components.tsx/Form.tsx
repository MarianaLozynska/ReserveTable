"use client";
import { useEffect, useState } from "react";
import useReservation from "../../../../hooks/useReservation";
import { CircularProgress } from "@mui/material";

export default function Form({
  slug,
  partySize,
  date,
}: {
  slug: string;
  partySize: string;
  date: string;
}) {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequests: "",
  });
  const [day, time] = date.split("T");
  const [disabled, setDisabled] = useState(true);
  const { error, loading, createReservation } = useReservation();
  const [didBook, setDidBook] = useState(false);
  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone &&
      inputs.bookerEmail
    ) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [inputs]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const inputFields = [
    { name: "bookerFirstName", placeholder: "First name" },
    { name: "bookerLastName", placeholder: "Last name" },
    { name: "bookerPhone", placeholder: "Phone number" },
    { name: "bookerEmail", placeholder: "Email" },
    { name: "bookerOccasion", placeholder: "Occasion (optional)" },
    { name: "bookerRequests", placeholder: "Requests (optional)" },
  ];
  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      day,
      time,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerPhone: inputs.bookerPhone,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequests: inputs.bookerRequests,
      setDidBook,
    });
    return booking;
  };

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px] bg-white">
      {didBook ? (
        <div>
          <h1>You are all booked up</h1>
          <p>Enjoy your reservation</p>
        </div>
      ) : (
        <>
          {inputFields.map((field) => (
            <input
              key={field.name}
              type="text"
              className="border rounded p-3 w-80 mb-4 bg-white"
              placeholder={field.placeholder}
              name={field.name}
              onChange={handleChangeInput}
              value={inputs[field.name as keyof typeof inputs]}
            />
          ))}
          <button
            disabled={disabled || loading}
            onClick={handleClick}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the Reserve Table
            Terms of Use and Privacy Policy. Standard text message rates may
            apply. You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
}
