import { createFileRoute } from "@tanstack/react-router";
import { SendaApp } from "@/components/senda/SendaApp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SendaApp />;
}
