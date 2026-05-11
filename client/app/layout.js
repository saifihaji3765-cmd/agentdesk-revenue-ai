export const metadata = {
  title: "AgentDesk Revenue AI",
  description: "AI Sales Employee SaaS Platform"
};

export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0
        }}
      >
        {children}
      </body>
    </html>
  );
}
