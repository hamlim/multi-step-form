import { Form } from "./form";
import type { State } from "./types";

export default function Home() {
  async function incrementalSendAction(
    prevState: State,
    formData: FormData,
  ): Promise<State> {
    "use server";

    console.log(Object.fromEntries(formData.entries()));

    switch (prevState.status) {
      case "name": {
        if (formData.get("back") === "true") {
          return { status: "name", formData };
        }
        return { status: "email", formData };
      }
      case "email": {
        if (formData.get("back") === "true") {
          return { status: "name", formData };
        }
        return { status: "note", formData };
      }
      case "note": {
        if (formData.get("back") === "true") {
          return { status: "email", formData };
        }
        // regular submission after filling out all the fields
        // validate the form data
        let { name, email, note } = Object.fromEntries(formData.entries());
        if (!name || !email || !note) {
          return { status: "error", formData };
        }
        // do something with the form data
        // success!
        return { status: "complete", formData };
      }
      default:
        return prevState;
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Form incrementalSendAction={incrementalSendAction} />
    </div>
  );
}
