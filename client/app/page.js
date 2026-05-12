"use client";

import { useState } from "react";

export default function Home() {

  const [businessName, setBusinessName] =
    useState("");

  const [businessType, setBusinessType] =
    useState("");

  const [services, setServices] =
    useState("");

  const [pricing, setPricing] =
    useState("");

  const [faq, setFaq] =
    useState("");

  const [message, setMessage] =
    useState("");

  const saveTraining = async () => {

    try {

      const response = await fetch(
        "https://agentdesk-revenue-ai.onrender.com/api/training",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            businessName,
            businessType,
            services,
            pricing,
            faq
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(
          "AI Training Saved Successfully"
        );
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #020617, #0f172a)",
        color: "white",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >

        <h1
          style={{
            fontSize: "52px",
            marginBottom: "15px"
          }}
        >
          Setup Your AI Employee
        </h1>

        <p
          style={{
            opacity: 0.7,
            fontSize: "20px",
            marginBottom: "40px",
            lineHeight: "1.6"
          }}
        >
          Train your AI to automatically reply to
          customers on WhatsApp.
        </p>

        <div
          style={{
            background:
              "rgba(255,255,255,0.05)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "30px",
            backdropFilter: "blur(12px)"
          }}
        >

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}
          >

            <input
              placeholder="Business Name"
              value={businessName}
              onChange={(e) =>
                setBusinessName(e.target.value)
              }
              style={inputStyle}
            />

            <input
              placeholder="Business Type"
              value={businessType}
              onChange={(e) =>
                setBusinessType(e.target.value)
              }
              style={inputStyle}
            />

            <textarea
              placeholder="What services do you offer?"
              value={services}
              onChange={(e) =>
                setServices(e.target.value)
              }
              style={textareaStyle}
            />

            <textarea
              placeholder="Pricing details"
              value={pricing}
              onChange={(e) =>
                setPricing(e.target.value)
              }
              style={textareaStyle}
            />

            <textarea
              placeholder="Frequently asked questions"
              value={faq}
              onChange={(e) =>
                setFaq(e.target.value)
              }
              style={textareaStyle}
            />

            <button
              style={buttonStyle}
              onClick={saveTraining}
            >
              Save AI Training
            </button>

            {
              message && (
                <p
                  style={{
                    marginTop: "10px",
                    color: "#4ade80",
                    fontSize: "18px"
                  }}
                >
                  {message}
                </p>
              )
            }

          </div>

        </div>

      </div>

    </main>
  );
}

const inputStyle = {
  padding: "18px",
  borderRadius: "14px",
  border:
    "1px solid rgba(255,255,255,0.1)",
  background:
    "rgba(255,255,255,0.06)",
  color: "white",
  fontSize: "16px",
  outline: "none"
};

const textareaStyle = {
  minHeight: "130px",
  padding: "18px",
  borderRadius: "14px",
  border:
    "1px solid rgba(255,255,255,0.1)",
  background:
    "rgba(255,255,255,0.06)",
  color: "white",
  fontSize: "16px",
  outline: "none"
};

const buttonStyle = {
  padding: "18px",
  borderRadius: "14px",
  border: "none",
  background:
    "linear-gradient(to right, #2563eb, #7c3aed)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer"
};
