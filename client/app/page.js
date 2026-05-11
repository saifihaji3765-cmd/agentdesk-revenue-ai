"use client";

import { useState } from "react";

export default function Home() {

  const [clientName, setClientName] =
    useState("");

  const [businessType, setBusinessType] =
    useState("");

  const [projectType, setProjectType] =
    useState("");

  const [budget, setBudget] =
    useState("");

  const [proposal, setProposal] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const generateProposal = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "https://your-render-url.onrender.com/api/proposal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            clientName,
            businessType,
            projectType,
            budget
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        setProposal(data.proposal);
      }

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
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
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >

        <div
          style={{
            marginBottom: "50px"
          }}
        >

          <h1
            style={{
              fontSize: "58px",
              fontWeight: "bold",
              marginBottom: "12px"
            }}
          >
            AgentDesk Revenue AI
          </h1>

          <p
            style={{
              fontSize: "22px",
              opacity: 0.75,
              maxWidth: "700px",
              lineHeight: "1.6"
            }}
          >
            AI-powered sales employee that automates
            proposals, lead qualification and business
            workflows.
          </p>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px"
          }}
        >

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "30px",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.35)"
            }}
          >

            <h2
              style={{
                fontSize: "30px",
                marginBottom: "25px"
              }}
            >
              Generate Proposal
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px"
              }}
            >

              <input
                placeholder="Client Name"
                value={clientName}
                onChange={(e) =>
                  setClientName(e.target.value)
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

              <input
                placeholder="Project Type"
                value={projectType}
                onChange={(e) =>
                  setProjectType(e.target.value)
                }
                style={inputStyle}
              />

              <input
                placeholder="Budget"
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
                style={inputStyle}
              />

              <button
                style={buttonStyle}
                onClick={generateProposal}
              >
                {
                  loading
                    ? "Generating..."
                    : "Generate AI Proposal"
                }
              </button>

            </div>

            {
              proposal && (
                <div
                  style={{
                    marginTop: "25px",
                    background:
                      "rgba(255,255,255,0.05)",
                    padding: "25px",
                    borderRadius: "18px",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.7"
                  }}
                >
                  {proposal}
                </div>
              )
            }

          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "30px",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.35)"
            }}
          >

            <h2
              style={{
                fontSize: "30px",
                marginBottom: "25px"
              }}
            >
              Platform Features
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px"
              }}
            >

              <FeatureCard
                title="AI Proposal Generator"
                text="Generate professional business proposals instantly."
              />

              <FeatureCard
                title="Lead Qualification"
                text="Automatically identify serious clients and opportunities."
              />

              <FeatureCard
                title="Sales Automation"
                text="Automate repetitive business workflows using AI."
              />

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        borderRadius: "18px",
        padding: "20px"
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          marginBottom: "10px"
        }}
      >
        {title}
      </h3>

      <p
        style={{
          opacity: 0.7,
          lineHeight: "1.6"
        }}
      >
        {text}
      </p>
    </div>
  );
}

const inputStyle = {
  padding: "16px",
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
  cursor: "pointer",
  marginTop: "10px"
};
