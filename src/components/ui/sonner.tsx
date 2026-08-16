"use client"

import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      } as React.CSSProperties}
      toastOptions={{
        style: {
          background: "#111118",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#fff",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
