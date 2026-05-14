"use client";

import {
  useState,
  useEffect
} from "react";

export default function Home() {

  const API_URL =
"https://agentdesk-revenue-ai-16.onrender.com";
    

  const [
    businessName,
    setBusinessName
  ] = useState("");

  const [
    businessType,
    setBusinessType
  ] = useState("");

  const [
    services,
    setServices
  ] = useState("");

  const [
    pricing,
    setPricing
  ] = useState("");

  const [
    faq,
    setFaq
  ] = useState("");

  const [
    message,
    setMessage
  ] = useState("");

  const [
    qrCode,
    setQrCode
  ] = useState("");

  const [
    leads,
    setLeads
  ] = useState([]);

  const [
    alerts,
    setAlerts
  ] = useState([]);

  const [
    loggedBusiness,
    setLoggedBusiness
  ] = useState(null);

  useEffect(() => {

    const savedBusiness =
      localStorage.getItem(
        "business"
      );

    if (savedBusiness) {

      const businessData =
        JSON.parse(
          savedBusiness
        );

      setLoggedBusiness(
        businessData
      );
    }

  }, []);

  useEffect(() => {

    if (!loggedBusiness) {
      return;
    }

    fetchLeads();

    fetchAlerts();

    const interval =
      setInterval(() => {

        fetchLeads();

        fetchAlerts();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, [loggedBusiness]);

  const fetchLeads =
    async () => {

      try {

        if (!loggedBusiness) {
          return;
        }

        const response =
          await fetch(
            `${API_URL}/api/leads`
          );

        const data =
          await response.json();

        if (data.success) {

          const filteredLeads =
            data.leads.filter(

              (lead) =>

                lead.businessId ===
                loggedBusiness.businessId

            );

          setLeads(
            filteredLeads
          );
        }

      } catch (error) {

        console.log(error);

      }
    };

  const fetchAlerts =
    async () => {

      try {

        if (!loggedBusiness) {
          return;
        }

        const response =
          await fetch(
            `${API_URL}/api/alerts`
          );

        const data =
          await response.json();

        if (data.success) {

          const filteredAlerts =
            data.alerts.filter(

              (alert) =>

                alert.businessId ===
                loggedBusiness.businessId

            );

          setAlerts(
            filteredAlerts
          );
        }

      } catch (error) {

        console.log(error);

      }
    };

  const connectWhatsApp =
    async () => {

      try {

        if (!loggedBusiness) {
          return;
        }

        const response =
          await fetch(
            `${API_URL}/api/connect-whatsapp`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                businessId:
                  loggedBusiness.businessId

              })

            }
          );

        const data =
          await response.json();

        if (data.success) {

          if (data.qr) {

            setQrCode(
              data.qr
            );

            setMessage(
              "Scan QR Code"
            );

          } else {

            setMessage(
              "WhatsApp Connected"
            );
          }
        }

      } catch (error) {

        console.log(error);

      }
    };

  const saveTraining =
    async () => {

      try {

        const response =
          await fetch(
            `${API_URL}/api/training`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
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

        const data =
          await response.json();

        if (data.success) {

          setMessage(
            "AI Employee Ready"
          );

          setLoggedBusiness(
            data.business
          );

          localStorage.setItem(

            "business",

            JSON.stringify(
              data.business
            )

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
          maxWidth: "1400px",

          margin: "0 auto"
        }}
      >

        <h1
          style={{
            fontSize: "52px",

            marginBottom: "15px"
          }}
        >
          AI Employee Dashboard
        </h1>

        <p
          style={{
            opacity: 0.7,

            fontSize: "20px",

            marginBottom: "40px"
          }}
        >
          WhatsApp AI automation
          platform for businesses.
        </p>

        {

          loggedBusiness && (

            <div
              style={{
                background:
                  "rgba(34,197,94,0.15)",

                border:
                  "1px solid rgba(34,197,94,0.3)",

                padding: "20px",

                borderRadius: "18px",

                marginBottom: "30px"
              }}
            >

              <h2>
                ✅ AI Employee Active
              </h2>

              <p>
                Business:
                {" "}
                {
                  loggedBusiness.businessName
                }
              </p>

              <p>
                Type:
                {" "}
                {
                  loggedBusiness.businessType
                }
              </p>

            </div>

          )
        }

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "1fr 1fr 1fr",

            gap: "30px"
          }}
        >

          <div style={cardStyle}>

            <h2 style={titleStyle}>
              Train AI Employee
            </h2>

            <div style={formStyle}>

              <input
                placeholder="Business Name"

                value={businessName}

                onChange={(e) =>
                  setBusinessName(
                    e.target.value
                  )
                }

                style={inputStyle}
              />

              <input
                placeholder="Business Type"

                value={businessType}

                onChange={(e) =>
                  setBusinessType(
                    e.target.value
                  )
                }

                style={inputStyle}
              />

              <textarea
                placeholder="Services"

                value={services}

                onChange={(e) =>
                  setServices(
                    e.target.value
                  )
                }

                style={textareaStyle}
              />

              <textarea
                placeholder="Pricing"

                value={pricing}

                onChange={(e) =>
                  setPricing(
                    e.target.value
                  )
                }

                style={textareaStyle}
              />

              <textarea
                placeholder="FAQ"

                value={faq}

                onChange={(e) =>
                  setFaq(
                    e.target.value
                  )
                }

                style={textareaStyle}
              />

              <button
                style={buttonStyle}

                onClick={
                  saveTraining
                }
              >
                Activate AI Employee
              </button>

              <button
                style={buttonStyle}

                onClick={
                  connectWhatsApp
                }
              >
                Connect WhatsApp
              </button>

              {

                qrCode && (

                  <img
                    src={qrCode}

                    alt="QR Code"

                    style={{
                      width: "260px",

                      borderRadius: "20px"
                    }}
                  />

                )
              }

              {

                message && (

                  <p
                    style={{
                      color:
                        "#4ade80"
                    }}
                  >
                    {message}
                  </p>

                )
              }

            </div>

          </div>

          <div style={cardStyle}>

            <h2 style={titleStyle}>
              Customer Leads
            </h2>

            <div
              style={{
                display: "flex",

                flexDirection:
                  "column",

                gap: "15px"
              }}
            >

              {

                leads.map(
                  (lead) => (

                    <div
                      key={lead.id}

                      style={leadBox}
                    >

                      <p>
                        📞 {lead.phone}
                      </p>

                      <p>
                        💬 {lead.message}
                      </p>

                    </div>
                  )
                )

              }

            </div>

          </div>

          <div style={cardStyle}>

            <h2 style={titleStyle}>
              Hot Lead Alerts
            </h2>

            <div
              style={{
                display: "flex",

                flexDirection:
                  "column",

                gap: "15px"
              }}
            >

              {

                alerts.map(
                  (alert) => (

                    <div
                      key={alert.id}

                      style={{
                        background:
                          "rgba(239,68,68,0.15)",

                        padding:
                          "18px",

                        borderRadius:
                          "14px",

                        border:
                          "1px solid rgba(239,68,68,0.3)"
                      }}
                    >

                      <p>
                        🚨 {alert.status}
                      </p>

                      <p>
                        📞 {alert.phone}
                      </p>

                      <p>
                        💬 {alert.message}
                      </p>

                    </div>
                  )
                )

              }

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

const cardStyle = {

  background:
    "rgba(255,255,255,0.05)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "24px",

  padding: "30px",

  backdropFilter:
    "blur(12px)"
};

const titleStyle = {

  fontSize: "28px",

  marginBottom: "25px"
};

const formStyle = {

  display: "flex",

  flexDirection: "column",

  gap: "20px"
};

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

  minHeight: "120px",

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

const leadBox = {

  background:
    "rgba(255,255,255,0.05)",

  padding: "18px",

  borderRadius: "14px"
};
