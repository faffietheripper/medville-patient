"use client";

import React, { useState } from "react";
import { Check, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DoctorRequests({ incomingDoctorRequests, sessionId }) {
  const [doctorRequests, setDoctorRequests] = useState(incomingDoctorRequests);

  const router = useRouter();

  const acceptDoctor = async (senderId) => {
    await axios.post("/api/doctors/accept", { id: senderId });

    setDoctorRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );
    alert("request accepted");
    router.refresh();
  };

  const denyDoctor = async (senderId) => {
    await axios.post("/api/doctors/deny", { id: senderId });

    setDoctorRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );
    alert("request denied");
    router.refresh();
  };

  return (
    <>
      {doctorRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing to show here...</p>
      ) : (
        doctorRequests.map((request) => (
          <div key={request.senderId} className="flex gap-4 items-center">
            <UserPlus className="text-black" />
            <p className="font-medium text-lg">{request.senderEmail}</p>
            <button
              onClick={() => acceptDoctor(request.senderId)}
              aria-label="accept friend"
              className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
            >
              <Check className="font-semibold text-white w-3/4 h-3/4" />
            </button>

            <button
              onClick={() => denyDoctor(request.senderId)}
              aria-label="deny friend"
              className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
            >
              <X className="font-semibold text-white w-3/4 h-3/4" />
            </button>
          </div>
        ))
      )}
    </>
  );
}